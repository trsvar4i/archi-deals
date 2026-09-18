import { ArrowUpRight } from "./Icons";
import { finds } from "../data/finds";

export default function FreshFinds() {
  return (
    <section className="fresh-finds section-shell" id="finds">
      <div className="finds-heading">
        <div>
          <p className="eyebrow">Новая витрина</p>
          <h2>Свежие<br /><em>находки.</em></h2>
        </div>
        <p>Будущая витрина уже собрана по направлениям. Реальные товары и цены появятся здесь без переделки сайта.</p>
      </div>

      <div className="finds-grid">
        {finds.map((find) => (
          <article className="find-card" key={find.id}>
            <div className="find-card-image">
              <img src={find.image} alt={find.title} loading="lazy" />
              <span>{find.label}</span>
            </div>
            <div className="find-card-copy">
              <p>{find.note}</p>
              <h3>{find.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <a className="finds-channel-link" href="https://t.me/archi_deals" target="_blank" rel="noreferrer">
        Актуальные находки уже выходят в Telegram <ArrowUpRight />
      </a>
    </section>
  );
}

