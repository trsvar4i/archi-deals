const STEPS = ["item", "reference", "details", "city", "comment"];
const WEB_APP_URL = "https://trsvar4i.github.io/archi-deals/?app=order";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://trsvar4i.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const PROMPTS = {
  item: {
    text: "Что нужно найти? Можно отправить название или короткое описание.",
    optional: false,
  },
  reference: {
    text: "Есть фотография или ссылка на пример? Отправьте её следующим сообщением.",
    optional: true,
  },
  details: {
    text: "Какие детали важны: размер, цвет, материал, состояние или бренд?",
    optional: true,
  },
  city: {
    text: "В какой город потребуется доставка?",
    optional: false,
  },
  comment: {
    text: "Остались дополнительные пожелания?",
    optional: true,
  },
};

const STATUS_MESSAGES = {
  accepted: "Заявка принята в работу. Статус и найденные варианты появятся в этом чате.",
  clarify: "Для продолжения нужны дополнительные детали. Скоро в чате появится уточняющий вопрос.",
  completed: "Работа по заявке завершена. Спасибо, что выбрали Archi Deals.",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS" && url.pathname === "/api/orders") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ ok: true, service: "archi-deals-bot" });
    }

    if (request.method === "POST" && url.pathname === "/register-webhook") {
      const authorization = request.headers.get("Authorization");
      if (authorization !== `Bearer ${env.WEBHOOK_SECRET}`) {
        return new Response("Forbidden", { status: 403 });
      }

      const webhookUrl = `${url.origin}/webhook`;
      const result = await telegram(env, "setWebhook", {
        url: webhookUrl,
        secret_token: env.WEBHOOK_SECRET,
        drop_pending_updates: true,
      });

      await telegram(env, "setChatMenuButton", {
        menu_button: {
          type: "web_app",
          text: "Оформить заказ",
          web_app: { url: WEB_APP_URL },
        },
      });

      return Response.json({ ok: true, result, webhookUrl });
    }

    if (request.method === "POST" && url.pathname === "/api/orders") {
      try {
        return await handleWebAppOrder(request, env);
      } catch (error) {
        console.error("Web app order failed", error);
        return jsonWithCors({ ok: false, error: error.message || "Не удалось отправить заявку" }, 400);
      }
    }

    if (request.method !== "POST" || url.pathname !== "/webhook") {
      return new Response("Not found", { status: 404 });
    }

    const secret = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
    if (!secret || secret !== env.WEBHOOK_SECRET) {
      return new Response("Forbidden", { status: 403 });
    }

    try {
      const update = await request.json();
      ctx.waitUntil(cleanExpiredSessions(env));
      await handleUpdate(update, env);
      return new Response("OK");
    } catch (error) {
      console.error("Telegram update failed", error);
      return new Response("Temporary error", { status: 500 });
    }
  },
};

async function handleWebAppOrder(request, env) {
  const form = await request.formData();
  const initData = String(form.get("initData") || "");
  const user = await validateTelegramInitData(initData, env.BOT_TOKEN);
  const order = JSON.parse(String(form.get("order") || "{}"));
  const reference = form.get("reference");

  const item = cleanText(order.item, 500);
  const city = cleanText(order.city, 120);
  if (item.length < 3 || city.length < 2) throw new Error("Заполните запрос и город доставки.");

  if (reference instanceof File && reference.size > 8 * 1024 * 1024) {
    throw new Error("Фотография должна быть меньше 8 МБ.");
  }

  const normalized = {
    item,
    category: cleanText(order.category, 80),
    details: cleanText(order.details, 400),
    city,
    referenceUrl: cleanText(order.referenceUrl, 500),
    comment: cleanText(order.comment, 400),
  };

  const orderId = `AD-${Date.now().toString().slice(-6)}`;
  const customer = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const contact = await getCustomerContact(user.id, env);
  if (!contact) throw new Error("Сначала поделитесь номером с ботом через команду /start.");

  const text = [
    `<b>Новая заявка ${orderId}</b> · Mini App`,
    "",
    `<b>Клиент:</b> ${escapeHtml(customer || "Без имени")}`,
    `<b>Связаться:</b> ${formatCustomerContact(user, contact)}`,
    `<b>Telegram ID:</b> <code>${user.id}</code>`,
    "",
    `<b>Что найти:</b> ${formatValue(normalized.item)}`,
    `<b>Категория:</b> ${formatValue(normalized.category)}`,
    `<b>Детали:</b> ${formatValue(normalized.details)}`,
    `<b>Город:</b> ${formatValue(normalized.city)}`,
    `<b>Ссылка:</b> ${formatValue(normalized.referenceUrl)}`,
    `<b>Комментарий:</b> ${formatValue(normalized.comment)}`,
  ].join("\n");

  await sendMessage(env, env.ADMIN_CHAT_ID, text, adminStatusKeyboard(user, contact));

  if (reference instanceof File && reference.size > 0) {
    const photoForm = new FormData();
    photoForm.set("chat_id", env.ADMIN_CHAT_ID);
    photoForm.set("caption", `Референс к заявке ${orderId}`);
    photoForm.set("photo", reference, reference.name || "reference.jpg");

    try {
      await telegramMultipart(env, "sendPhoto", photoForm);
    } catch {
      await sendMessage(env, env.ADMIN_CHAT_ID, `⚠️ Не удалось загрузить референс к заявке <b>${orderId}</b>.`);
    }
  }

  await sendMessage(
    env,
    user.id,
    `Заявка <b>${orderId}</b> отправлена ✓\nЯ сообщу здесь, когда Archi Deals возьмёт её в работу.`,
    startKeyboard(),
  );

  return jsonWithCors({ ok: true, orderId });
}

async function validateTelegramInitData(initData, botToken) {
  if (!initData) throw new Error("Откройте форму через Telegram-бота.");

  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash") || "";
  params.delete("hash");

  const authDate = Number(params.get("auth_date"));
  if (!authDate || Date.now() / 1000 - authDate > 86400) {
    throw new Error("Сессия Telegram устарела. Откройте форму заново.");
  }

  const dataCheckString = [...params.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = await hmacSha256(new TextEncoder().encode("WebAppData"), botToken);
  const calculatedHash = bytesToHex(await hmacSha256(secretKey, dataCheckString));
  if (!safeEqual(calculatedHash, receivedHash)) throw new Error("Не удалось подтвердить сессию Telegram.");

  const user = JSON.parse(params.get("user") || "null");
  if (!user?.id) throw new Error("Telegram не передал данные пользователя.");
  return user;
}

async function hmacSha256(key, value) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    typeof key === "string" ? new TextEncoder().encode(key) : key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(value)));
}

function bytesToHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(left, right) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return result === 0;
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function jsonWithCors(payload, status = 200) {
  return Response.json(payload, { status, headers: CORS_HEADERS });
}

async function handleUpdate(update, env) {
  if (update.callback_query) {
    await handleCallback(update.callback_query, env);
    return;
  }

  const message = update.message;
  if (!message || message.from?.is_bot) return;

  const text = message.text?.trim() || "";

  if (message.contact) {
    if (String(message.contact.user_id || "") !== String(message.from.id)) {
      await sendMessage(env, message.chat.id, "Пожалуйста, отправьте именно свой номер кнопкой ниже.", contactRequestKeyboard());
      return;
    }

    await saveCustomerContact(message.from.id, message.contact, env);
    await sendMessage(env, message.chat.id, "Спасибо, номер сохранён ✓", {
      reply_markup: { remove_keyboard: true },
    });
    await sendWelcome(message.chat.id, env);
    return;
  }

  if (text.startsWith("/start")) {
    await deleteSession(message.from.id, env);
    const contact = await getCustomerContact(message.from.id, env);
    if (!contact) {
      await requestPhoneNumber(message.chat.id, env);
      return;
    }

    await sendWelcome(message.chat.id, env);
    return;
  }

  if (text === "/cancel") {
    await deleteSession(message.from.id, env);
    await sendMessage(env, message.chat.id, "Заявка отменена. Новую можно начать в любой момент командой /start.", startKeyboard());
    return;
  }

  if (text === "/help") {
    await sendMessage(
      env,
      message.chat.id,
      "Бот помогает оформить запрос для персонального поиска. Команды:\n/start — новая заявка\n/cancel — отменить текущую заявку\n/help — подсказка",
      startKeyboard(),
    );
    return;
  }

  const session = await getSession(message.from.id, env);
  if (!session) {
    const contact = await getCustomerContact(message.from.id, env);
    if (!contact) {
      await requestPhoneNumber(message.chat.id, env);
      return;
    }
    await sendMessage(env, message.chat.id, "Чтобы оформить запрос, нажмите кнопку ниже.", startKeyboard());
    return;
  }

  await receiveStep(message, session, env);
}

async function handleCallback(callback, env) {
  const data = callback.data || "";
  const chatId = callback.message?.chat?.id;
  const userId = callback.from.id;

  if (data.startsWith("admin:")) {
    await handleAdminAction(callback, env);
    return;
  }

  await telegram(env, "answerCallbackQuery", { callback_query_id: callback.id });

  if (data === "order:start") {
    const contact = await getCustomerContact(userId, env);
    if (!contact) {
      await requestPhoneNumber(chatId, env);
      return;
    }
    await startOrder(chatId, userId, env);
    return;
  }

  if (data === "order:cancel") {
    await deleteSession(userId, env);
    await sendMessage(env, chatId, "Заявка отменена.", startKeyboard());
    return;
  }

  if (data === "order:edit") {
    await startOrder(chatId, userId, env);
    return;
  }

  if (data === "order:confirm") {
    const session = await getSession(userId, env);
    if (!session) {
      await sendMessage(env, chatId, "Черновик заявки уже закрыт. Можно начать новую заявку.", startKeyboard());
      return;
    }

    await forwardOrder(callback.from, session, env);
    await deleteSession(userId, env);
    await sendMessage(env, chatId, "Заявка отправлена ✓\nОтвет и дальнейшие статусы появятся в этом чате.", startKeyboard());
    return;
  }

  if (data.startsWith("skip:")) {
    const step = data.slice(5);
    const session = await getSession(userId, env);
    if (!session || session.step !== step || !PROMPTS[step]?.optional) return;

    const nextData = { ...session.data, [step]: "Не указано" };
    await advanceSession(session, nextData, env);
    return;
  }

}

async function receiveStep(message, session, env) {
  const step = session.step;
  const prompt = PROMPTS[step];
  if (!prompt) {
    await showSummary(message.chat.id, session.data, env);
    return;
  }

  let value;
  if (step === "reference" && message.photo?.length) {
    value = {
      type: "photo",
      fileId: message.photo.at(-1).file_id,
      caption: message.caption?.trim() || "",
    };
  } else if (message.text?.trim()) {
    value = message.text.trim().slice(0, 500);
  } else {
    await sendPrompt(env, message.chat.id, step, "Нужен текст, ссылка или фотография.");
    return;
  }

  const nextData = { ...session.data, [step]: value };
  await advanceSession(session, nextData, env);
}

async function advanceSession(session, data, env) {
  const currentIndex = STEPS.indexOf(session.step);
  const nextStep = STEPS[currentIndex + 1];

  if (!nextStep) {
    await saveSession(session.userId, session.chatId, "confirm", data, env);
    await showSummary(session.chatId, data, env);
    return;
  }

  await saveSession(session.userId, session.chatId, nextStep, data, env);
  await sendPrompt(env, session.chatId, nextStep);
}

async function startOrder(chatId, userId, env) {
  await saveSession(userId, chatId, STEPS[0], {}, env);
  await sendMessage(
    env,
    chatId,
    "<b>Новая заявка Archi Deals</b>\n\nНужно ответить на несколько коротких вопросов. Заявку можно отменить командой /cancel.",
  );
  await sendPrompt(env, chatId, STEPS[0]);
}

async function sendPrompt(env, chatId, step, prefix = "") {
  const prompt = PROMPTS[step];
  const keyboard = prompt.optional
    ? { reply_markup: { inline_keyboard: [[{ text: "Пропустить", callback_data: `skip:${step}` }]] } }
    : {};

  const text = `${prefix ? `${prefix}\n\n` : ""}<b>${STEPS.indexOf(step) + 1}/${STEPS.length}</b> · ${escapeHtml(prompt.text)}`;
  await sendMessage(env, chatId, text, keyboard);
}

async function showSummary(chatId, data, env) {
  const text = [
    "<b>Проверка заявки</b>",
    "",
    `<b>Что найти:</b> ${formatValue(data.item)}`,
    `<b>Фото или ссылка:</b> ${formatReference(data.reference)}`,
    `<b>Детали:</b> ${formatValue(data.details)}`,
    `<b>Город:</b> ${formatValue(data.city)}`,
    `<b>Комментарий:</b> ${formatValue(data.comment)}`,
  ].join("\n");

  await sendMessage(env, chatId, text, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Отправить заявку", callback_data: "order:confirm" }],
        [
          { text: "Заполнить заново", callback_data: "order:edit" },
          { text: "Отменить", callback_data: "order:cancel" },
        ],
      ],
    },
  });
}

async function forwardOrder(user, session, env) {
  const orderId = `AD-${Date.now().toString().slice(-6)}`;
  const customer = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const data = session.data;
  const contact = await getCustomerContact(user.id, env);
  const text = [
    `<b>Новая заявка ${orderId}</b>`,
    "",
    `<b>Клиент:</b> ${escapeHtml(customer || "Без имени")}`,
    `<b>Связаться:</b> ${formatCustomerContact(user, contact)}`,
    `<b>Telegram ID:</b> <code>${user.id}</code>`,
    "",
    `<b>Что найти:</b> ${formatValue(data.item)}`,
    `<b>Фото или ссылка:</b> ${formatReference(data.reference)}`,
    `<b>Детали:</b> ${formatValue(data.details)}`,
    `<b>Город:</b> ${formatValue(data.city)}`,
    `<b>Комментарий:</b> ${formatValue(data.comment)}`,
  ].join("\n");

  const options = adminStatusKeyboard(user, contact);

  await sendMessage(env, env.ADMIN_CHAT_ID, text, options);

  if (data.reference?.type === "photo") {
    try {
      await telegram(env, "sendPhoto", {
        chat_id: env.ADMIN_CHAT_ID,
        photo: data.reference.fileId,
        caption: `Референс к заявке ${orderId}`,
      });
    } catch {
      await sendMessage(env, env.ADMIN_CHAT_ID, `⚠️ Не удалось загрузить референс к заявке <b>${orderId}</b>.`);
    }
  }
}

async function handleAdminAction(callback, env) {
  if (String(callback.from.id) !== String(env.ADMIN_CHAT_ID)) {
    await telegram(env, "answerCallbackQuery", {
      callback_query_id: callback.id,
      text: "Эта кнопка доступна только владельцу.",
      show_alert: true,
    });
    return;
  }

  const [, status, customerId] = callback.data.split(":");
  const customerMessage = STATUS_MESSAGES[status];
  if (!customerMessage || !customerId) return;

  await sendMessage(env, customerId, customerMessage);
  await telegram(env, "editMessageReplyMarkup", {
    chat_id: callback.message.chat.id,
    message_id: callback.message.message_id,
    reply_markup: { inline_keyboard: [] },
  });
  await telegram(env, "answerCallbackQuery", {
    callback_query_id: callback.id,
    text: "Статус отправлен клиенту.",
  });
}

async function telegram(env, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(`${method}: ${result.description || response.statusText}`);
  }

  return result.result;
}

async function telegramMultipart(env, method, body) {
  const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: "POST",
    body,
  });
  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(`${method}: ${result.description || response.statusText}`);
  }

  return result.result;
}

function sendMessage(env, chatId, text, options = {}) {
  return telegram(env, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...options,
  });
}

function startKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Оформить заказ", web_app: { url: WEB_APP_URL } }],
        [{ text: "Заполнить в чате", callback_data: "order:start" }],
      ],
    },
  };
}

function contactRequestKeyboard() {
  return {
    reply_markup: {
      keyboard: [[{ text: "Поделиться номером", request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true,
      input_field_placeholder: "Нажмите кнопку ниже",
    },
  };
}

function requestPhoneNumber(chatId, env) {
  return sendMessage(
    env,
    chatId,
    "<b>Поделиться вашим номером?</b>\n\nОн нужен только для связи по заявке. Telegram отправит номер после нажатия на кнопку ниже.",
    contactRequestKeyboard(),
  );
}

function sendWelcome(chatId, env) {
  return sendMessage(
    env,
    chatId,
    "<b>Archi Deals</b>\n\nНайдём нужную вещь, сравним варианты и поможем с покупкой. Быстрее всего оформить заказ в мини-приложении.",
    startKeyboard(),
  );
}

function adminStatusKeyboard(user, contact) {
  const customerId = String(user?.id || "").replaceAll(/\D/g, "");
  const username = String(user?.username || "").replace(/^@/, "");
  const phoneUrl = contactProfileUrl(contact?.phoneNumber);
  const rows = [];

  if (username) {
    rows.push([{ text: "Открыть профиль клиента", url: `https://t.me/${username}` }]);
  } else if (phoneUrl) {
    rows.push([{ text: "Открыть профиль клиента", url: phoneUrl }]);
  }

  rows.push(
    [{ text: "Принять", callback_data: `admin:accepted:${customerId}` }],
    [
      { text: "Уточнить", callback_data: `admin:clarify:${customerId}` },
      { text: "Завершить", callback_data: `admin:completed:${customerId}` },
    ],
  );

  return {
    reply_markup: {
      inline_keyboard: rows,
    },
  };
}

async function getSession(userId, env) {
  const row = await env.DB.prepare(
    "SELECT user_id, chat_id, step, data FROM sessions WHERE user_id = ?1",
  ).bind(userId).first();

  if (!row) return null;

  return {
    userId: Number(row.user_id),
    chatId: Number(row.chat_id),
    step: row.step,
    data: JSON.parse(row.data || "{}"),
  };
}

function saveSession(userId, chatId, step, data, env) {
  return env.DB.prepare(
    `INSERT INTO sessions (user_id, chat_id, step, data, updated_at)
     VALUES (?1, ?2, ?3, ?4, CURRENT_TIMESTAMP)
     ON CONFLICT(user_id) DO UPDATE SET
       chat_id = excluded.chat_id,
       step = excluded.step,
       data = excluded.data,
       updated_at = CURRENT_TIMESTAMP`,
  ).bind(userId, chatId, step, JSON.stringify(data)).run();
}

function deleteSession(userId, env) {
  return env.DB.prepare("DELETE FROM sessions WHERE user_id = ?1").bind(userId).run();
}

async function getCustomerContact(userId, env) {
  const row = await env.DB.prepare(
    "SELECT user_id, phone_number, first_name, last_name FROM customer_contacts WHERE user_id = ?1",
  ).bind(userId).first();

  if (!row) return null;
  return {
    userId: Number(row.user_id),
    phoneNumber: row.phone_number,
    firstName: row.first_name || "",
    lastName: row.last_name || "",
  };
}

function saveCustomerContact(userId, contact, env) {
  const phoneNumber = String(contact.phone_number || "").replaceAll(/[^\d+]/g, "");
  return env.DB.prepare(
    `INSERT INTO customer_contacts (user_id, phone_number, first_name, last_name, updated_at)
     VALUES (?1, ?2, ?3, ?4, CURRENT_TIMESTAMP)
     ON CONFLICT(user_id) DO UPDATE SET
       phone_number = excluded.phone_number,
       first_name = excluded.first_name,
       last_name = excluded.last_name,
       updated_at = CURRENT_TIMESTAMP`,
  ).bind(userId, phoneNumber, contact.first_name || "", contact.last_name || "").run();
}

function cleanExpiredSessions(env) {
  return env.DB.prepare(
    "DELETE FROM sessions WHERE datetime(updated_at) < datetime('now', '-1 day')",
  ).run();
}

function formatValue(value) {
  if (!value || typeof value !== "string") return "Не указано";
  return escapeHtml(value);
}

function formatReference(reference) {
  if (!reference) return "Не указано";
  if (typeof reference === "string") return escapeHtml(reference);
  if (reference.type === "photo") {
    return reference.caption ? `Фотография · ${escapeHtml(reference.caption)}` : "Фотография";
  }
  return "Не указано";
}

function formatCustomerContact(user, contact) {
  const username = String(user?.username || "").replace(/^@/, "");
  if (username) return `<a href="https://t.me/${username}">@${escapeHtml(username)}</a>`;

  const phoneUrl = contactProfileUrl(contact?.phoneNumber);
  if (!phoneUrl) return "Контакт не указан";
  return `<a href="${phoneUrl}">${escapeHtml(formatPhone(contact.phoneNumber))}</a>`;
}

function contactProfileUrl(phoneNumber) {
  const digits = String(phoneNumber || "").replaceAll(/\D/g, "");
  return digits ? `https://t.me/+${digits}?profile` : "";
}

function formatPhone(phoneNumber) {
  const digits = String(phoneNumber || "").replaceAll(/\D/g, "");
  return digits ? `+${digits}` : "Номер не указан";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
