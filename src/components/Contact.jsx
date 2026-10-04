import { Arrow } from "./Icons";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner section-shell">
        <div>
          <p className="contact-label">Archi Deals · Telegram</p>
          <h2>Новые находки появляются там первыми.</h2>
        </div>
        <div className="contact-actions">
          <p>В канале появляются интересные товары, выгодные предложения и новые подборки.</p>
          <a className="contact-button" href="https://t.me/archi_deals" target="_blank" rel="noreferrer">Перейти в Telegram-канал</a>
          <small>@archi_deals</small>
        </div>
      </div>
      <Arrow className="contact-arrow" />
    </section>
  );
}

