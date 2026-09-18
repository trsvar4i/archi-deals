# Archi Deals Telegram Bot

Бот принимает заявки по шагам, показывает итог перед отправкой и пересылает заказ владельцу Archi Deals. Незавершённый черновик хранится в D1 не более суток и удаляется после отправки.

## Что уже реализовано

- `/start`, `/cancel` и `/help`;
- пошаговый сценарий из шести вопросов;
- приём текста, ссылок и фотографий;
- проверка заявки перед отправкой;
- пересылка заявки в личный Telegram владельца;
- статусы «Принять», «Уточнить» и «Завершить»;
- проверка секретного заголовка Telegram webhook;
- автоматическое удаление старых черновиков.

## Что понадобится для запуска

1. Аккаунт Cloudflare.
2. Токен бота от BotFather. Он добавляется только как зашифрованный секрет.
3. Числовой Telegram ID владельца.
4. Случайная длинная строка для `WEBHOOK_SECRET`.

## Развёртывание

Команды выполняются из папки `bot`.

```powershell
npm install
npx wrangler login
npx wrangler d1 create archi-deals-bot
```

После создания базы нужно вставить выданный `database_id` в `wrangler.jsonc`, затем создать таблицу:

```powershell
npm run db:remote
```

Добавить три секрета. Wrangler запросит каждое значение в терминале и не запишет его в GitHub:

```powershell
npx wrangler secret put BOT_TOKEN
npx wrangler secret put WEBHOOK_SECRET
npx wrangler secret put ADMIN_CHAT_ID
```

Опубликовать Worker:

```powershell
npm run deploy
```

Последний шаг — зарегистрировать HTTPS-адрес Worker в Telegram. Для этого локально задаются `BOT_TOKEN`, `WEBHOOK_SECRET` и `WEBHOOK_URL`, затем запускается:

```powershell
npm run webhook
```

Токен, webhook-секрет и Telegram ID не должны попадать в исходный код, сообщения коммитов или GitHub.

