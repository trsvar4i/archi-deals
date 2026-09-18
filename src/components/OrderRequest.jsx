import { useState } from "react";

const initialForm = { item: "", budget: "", link: "" };

export default function OrderRequest() {
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setCopied(false);
  };

  const requestText = [
    "Заявка Archi Deals",
    `Что найти: ${form.item || "—"}`,
    `Бюджет: ${form.budget || "—"}`,
    `Ссылка или пример: ${form.link || "—"}`,
  ].join("\n");

  const copyRequest = async () => {
    if (!form.item.trim()) return;
    await navigator.clipboard.writeText(requestText);
    setCopied(true);
  };

  return (
    <section className="order-request section-shell" id="order">
      <div className="order-copy">
        <p className="eyebrow">Заявка в Telegram</p>
        <h2>Три строки —<br /><em>и поиск начат.</em></h2>
        <p>Форма собирает короткое сообщение для заказа. Сейчас текст можно скопировать и отправить в личный аккаунт; после запуска бота этот же сценарий станет автоматическим.</p>
        <div className="bot-status"><span /> Telegram-бот готовится к запуску</div>
      </div>

      <form className="order-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          <span>Что нужно найти *</span>
          <textarea name="item" value={form.item} onChange={updateField} placeholder="Название, описание, размер, цвет…" rows="3" required />
        </label>
        <div className="order-form-row">
          <label>
            <span>Бюджет</span>
            <input name="budget" value={form.budget} onChange={updateField} placeholder="Например, до 150 $" />
          </label>
          <label>
            <span>Ссылка или пример</span>
            <input name="link" value={form.link} onChange={updateField} placeholder="https://…" inputMode="url" />
          </label>
        </div>
        <button className="order-submit" type="button" onClick={copyRequest} disabled={!form.item.trim()}>
          {copied ? "Заявка скопирована ✓" : "Скопировать заявку"}
        </button>
        <small>{copied ? "Текст готов — осталось вставить его в личный Telegram-чат." : "Данные никуда не отправляются и остаются только в браузере."}</small>
      </form>
    </section>
  );
}

