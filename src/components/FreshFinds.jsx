import { ArrowUpRight } from "./Icons";

export default function FreshFinds() {
  return (
    <section className="fresh-finds section-shell" id="finds">
      <div className="finds-heading">
        <div>
          <p className="eyebrow">Новая витрина</p>
          <h2>Свежие<br /><em>находки.</em></h2>
        </div>
        <p>Здесь скоро появятся первые товары, цены и подборки от Archi Deals.</p>
      </div>

      <div className="finds-placeholder">
        <div className="finds-orb finds-orb-one" />
        <div className="finds-orb finds-orb-two" />
        <div className="placeholder-copy">
          <span>Скоро</span>
          <h3>Собираем первую подборку</h3>
          <p>А пока все актуальные находки уже ждут вас в Telegram-канале.</p>
          <a href="https://t.me/archi_deals" target="_blank" rel="noreferrer">
            Открыть канал <ArrowUpRight />
          </a>
        </div>
        <div className="placeholder-cards" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>
    </section>
  );
}

