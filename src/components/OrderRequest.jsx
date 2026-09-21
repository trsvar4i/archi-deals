import { ArrowUpRight } from "./Icons";

export default function OrderRequest() {
  return (
    <section className="order-request section-shell" id="order">
      <div className="order-copy">
        <p className="eyebrow">Заявка в Telegram</p>
        <h2>Несколько шагов —<br /><em>и поиск начат.</em></h2>
        <p>Откройте мини-приложение внутри Telegram, расскажите, что нужно найти, добавьте фото или ссылку — заявка сразу попадёт в работу.</p>
        <div className="bot-status"><span /> Telegram-бот работает</div>
      </div>

      <div className="order-form order-launch-card">
        <span className="order-launch-number">01—04</span>
        <h3>Заказ — без длинной переписки</h3>
        <p>Удобная форма запомнит детали, покажет итог и отправит заявку Archi Deals прямо из Telegram.</p>
        <ul>
          <li>Что найти и важные детали</li>
          <li>Бюджет и город доставки</li>
          <li>Фото или ссылка на пример</li>
        </ul>
        <a className="order-submit" href="https://t.me/ArchiDeals_bot?start=order" target="_blank" rel="noreferrer">
          <span>Открыть мини-приложение</span><ArrowUpRight />
        </a>
        <small>Бот откроется в Telegram. Там же будут приходить статусы и найденные варианты.</small>
      </div>
    </section>
  );
}
