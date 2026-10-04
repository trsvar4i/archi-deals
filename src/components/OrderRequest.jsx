import { ArrowUpRight } from "./Icons";

export default function OrderRequest() {
  return (
    <section className="order-request section-shell" id="order">
      <div className="order-copy">
        <p className="eyebrow">Заявка в Telegram</p>
        <h2>Вы описываете вещь.<br /><span className="headline-soft">Мы начинаем искать.</span></h2>
        <p>Можно написать пару слов или подробно описать задачу, добавить фотографию либо ссылку. Всё остальное уточним уже в Telegram.</p>
        <div className="bot-status"><span /> Telegram-бот работает</div>
      </div>

      <div className="order-form order-launch-card">
        <h3>Заказ — без длинной переписки</h3>
        <p>Удобная форма запомнит детали, покажет итог и отправит заявку Archi Deals прямо из Telegram.</p>
        <ul>
          <li>Что найти и важные детали</li>
          <li>Город доставки</li>
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
