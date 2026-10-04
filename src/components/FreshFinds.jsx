import { finds } from "../data/finds";

export default function FreshFinds() {
  return (
    <section className="fresh-finds section-shell" id="finds">
      <div className="finds-heading">
        <div>
          <h2>Свежие находки.<br />Ничего случайного.</h2>
        </div>
        <p>Здесь будут появляться вещи, которые действительно стоят внимания: редкие позиции, удачные цены и небанальные подарки.</p>
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
        Смотреть актуальные находки в Telegram
      </a>
    </section>
  );
}

