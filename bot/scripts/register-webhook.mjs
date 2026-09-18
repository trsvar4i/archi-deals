const required = ["BOT_TOKEN", "WEBHOOK_URL", "WEBHOOK_SECRET"];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Не заданы переменные: ${missing.join(", ")}`);
  process.exit(1);
}

const endpoint = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`;
const webhookUrl = `${process.env.WEBHOOK_URL.replace(/\/$/, "")}/webhook`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    url: webhookUrl,
    secret_token: process.env.WEBHOOK_SECRET,
    allowed_updates: ["message", "callback_query"],
    drop_pending_updates: true,
  }),
});

const result = await response.json();

if (!response.ok || !result.ok) {
  console.error("Webhook не подключён:", result.description || response.statusText);
  process.exit(1);
}

console.log(`Webhook подключён: ${webhookUrl}`);

