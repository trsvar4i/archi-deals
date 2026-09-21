import { useEffect, useMemo, useState } from "react";

const API_URL = "https://archi-deals-bot.tarasovarseniy0303.workers.dev/api/orders";
const BOT_URL = "https://t.me/ArchiDeals_bot";

const steps = [
  { id: "request", label: "Запрос" },
  { id: "details", label: "Детали" },
  { id: "delivery", label: "Доставка" },
  { id: "review", label: "Проверка" },
];

const categories = ["Одежда", "Обувь", "Аксессуары", "Красота", "Для дома", "Другое"];

const initialOrder = {
  item: "",
  category: "",
  details: "",
  budget: "",
  city: "",
  referenceUrl: "",
  comment: "",
};

function ArrowLeft() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>;
}

function ArrowRight() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

function Check() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.5" /></svg>;
}

function Upload() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v5h14v-5" /></svg>;
}

export default function TelegramMiniApp() {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState(initialOrder);
  const [referenceFile, setReferenceFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const telegram = window.Telegram?.WebApp;
  const telegramUser = telegram?.initDataUnsafe?.user;
  const firstName = telegramUser?.first_name;
  const isTelegram = Boolean(telegram?.initData);

  useEffect(() => {
    if (!telegram) return;
    telegram.ready();
    telegram.expand();
    telegram.setHeaderColor?.("#f6f8f2");
    telegram.setBackgroundColor?.("#f6f8f2");
    document.documentElement.dataset.telegramTheme = telegram.colorScheme || "light";
  }, [telegram]);

  const canContinue = useMemo(() => {
    if (step === 0) return order.item.trim().length >= 3;
    if (step === 1) return Boolean(order.category);
    if (step === 2) return order.city.trim().length >= 2;
    return true;
  }, [step, order]);

  const update = (field) => (event) => {
    setOrder((current) => ({ ...current, [field]: event.target.value }));
    setError("");
  };

  const selectCategory = (category) => {
    setOrder((current) => ({ ...current, category }));
    telegram?.HapticFeedback?.selectionChanged?.();
  };

  const next = () => {
    if (!canContinue) return;
    telegram?.HapticFeedback?.impactOccurred?.("light");
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((current) => Math.max(current - 1, 0));
    setError("");
  };

  const submit = async () => {
    if (!isTelegram) {
      setError("Откройте форму через кнопку «Заказать» в Telegram-боте — так мы безопасно определим, кому отправить ответ.");
      return;
    }

    setStatus("sending");
    setError("");

    const body = new FormData();
    body.set("initData", telegram.initData);
    body.set("order", JSON.stringify(order));
    if (referenceFile) body.set("reference", referenceFile);

    try {
      const response = await fetch(API_URL, { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Не удалось отправить заявку");
      setStatus("success");
      telegram.HapticFeedback?.notificationOccurred?.("success");
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message || "Что-то пошло не так. Попробуйте ещё раз.");
      telegram?.HapticFeedback?.notificationOccurred?.("error");
    }
  };

  if (status === "success") {
    return (
      <main className="tg-app tg-success">
        <div className="tg-success-mark"><Check /></div>
        <p className="tg-kicker">Заявка отправлена</p>
        <h1>Начинаем<br /><span>поиск.</span></h1>
        <p>Заявка уже у Archi Deals. Ответ и найденные варианты придут в этот Telegram-чат.</p>
        <button type="button" onClick={() => telegram?.close?.()}>Вернуться в Telegram</button>
        <div className="tg-orbit tg-orbit-one" />
        <div className="tg-orbit tg-orbit-two" />
      </main>
    );
  }

  return (
    <main className="tg-app">
      <header className="tg-header">
        <div className="tg-brand"><strong>ARCHI</strong><span>ORDERS</span></div>
        <div className="tg-step-count">{String(step + 1).padStart(2, "0")} / 04</div>
      </header>

      <div className="tg-progress" aria-label={`Шаг ${step + 1} из ${steps.length}`}>
        {steps.map((item, index) => <i key={item.id} className={index <= step ? "is-active" : ""} />)}
      </div>

      <section className="tg-stage">
        {step === 0 && (
          <div className="tg-screen tg-screen-request">
            <p className="tg-kicker">{firstName ? `${firstName}, начнём` : "Начнём с главного"}</p>
            <h1>Что будем<br /><span>искать?</span></h1>
            <p className="tg-lead">Опишите вещь своими словами — коротко или подробно.</p>
            <label className="tg-field tg-main-field">
              <span>Ваш запрос</span>
              <textarea value={order.item} onChange={update("item")} rows="5" maxLength="500" placeholder="Например: винтажная кожаная куртка шоколадного цвета…" autoFocus />
              <small>{order.item.length} / 500</small>
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="tg-screen">
            <p className="tg-kicker">Добавим контекст</p>
            <h1>Немного<br /><span>деталей.</span></h1>
            <div className="tg-categories">
              {categories.map((category) => (
                <button key={category} type="button" className={order.category === category ? "is-selected" : ""} onClick={() => selectCategory(category)}>
                  {order.category === category && <Check />}{category}
                </button>
              ))}
            </div>
            <label className="tg-field">
              <span>Размер, цвет, бренд — если важно</span>
              <textarea value={order.details} onChange={update("details")} rows="3" maxLength="400" placeholder="Например: размер M, натуральная кожа, без крупных логотипов" />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="tg-screen">
            <p className="tg-kicker">Последние штрихи</p>
            <h1>Бюджет и<br /><span>доставка.</span></h1>
            <div className="tg-two-fields">
              <label className="tg-field">
                <span>Бюджет</span>
                <input value={order.budget} onChange={update("budget")} placeholder="Например, до 150 $" />
              </label>
              <label className="tg-field">
                <span>Город *</span>
                <input value={order.city} onChange={update("city")} placeholder="Куда доставлять?" />
              </label>
            </div>
            <label className="tg-upload">
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setReferenceFile(event.target.files?.[0] || null)} />
              <Upload />
              <span>{referenceFile ? referenceFile.name : "Добавить фото-пример"}</span>
              <small>{referenceFile ? "Нажмите, чтобы заменить" : "JPG, PNG или WEBP до 8 МБ"}</small>
            </label>
            <label className="tg-field">
              <span>Или ссылка на пример</span>
              <input value={order.referenceUrl} onChange={update("referenceUrl")} inputMode="url" placeholder="https://…" />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="tg-screen">
            <p className="tg-kicker">Всё верно?</p>
            <h1>Проверим<br /><span>заявку.</span></h1>
            <div className="tg-review">
              <button type="button" onClick={() => setStep(0)}><span>Что найти</span><strong>{order.item}</strong><em>Изменить</em></button>
              <button type="button" onClick={() => setStep(1)}><span>Категория и детали</span><strong>{order.category}{order.details ? ` · ${order.details}` : ""}</strong><em>Изменить</em></button>
              <button type="button" onClick={() => setStep(2)}><span>Бюджет и город</span><strong>{order.budget || "Бюджет не указан"} · {order.city}</strong><em>Изменить</em></button>
              {(referenceFile || order.referenceUrl) && <div><span>Референс</span><strong>{referenceFile?.name || order.referenceUrl}</strong></div>}
            </div>
            <label className="tg-field">
              <span>Комментарий для Archi Deals</span>
              <textarea value={order.comment} onChange={update("comment")} rows="3" maxLength="400" placeholder="Любые дополнительные пожелания" />
            </label>
            {!isTelegram && <a className="tg-preview-note" href={BOT_URL}>Это предпросмотр. Откройте бота, чтобы отправить заявку →</a>}
          </div>
        )}

        {error && <div className="tg-error" role="alert">{error}</div>}
      </section>

      <footer className="tg-actions">
        {step > 0 && <button className="tg-back" type="button" onClick={back} aria-label="Назад"><ArrowLeft /></button>}
        <button className="tg-next" type="button" disabled={!canContinue || status === "sending"} onClick={step === steps.length - 1 ? submit : next}>
          <span>{status === "sending" ? "Отправляем…" : step === steps.length - 1 ? "Отправить заявку" : "Продолжить"}</span>
          {status !== "sending" && <ArrowRight />}
        </button>
      </footer>
    </main>
  );
}
