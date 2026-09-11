import { Arrow, ArrowUpRight } from "./Icons";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner section-shell">
        <div>
          <p className="eyebrow">Archi Deals в Telegram</p>
          <h2>Следите за новыми<br /><em>находками.</em></h2>
        </div>
        <div className="contact-actions">
          <p>Подписывайтесь на канал: там появляются интересные товары, выгодные предложения и новые подборки.</p>
          <a className="contact-button" href="https://t.me/archi_deals" target="_blank" rel="noreferrer">Перейти в Telegram-канал <ArrowUpRight /></a>
          <small>@archi_deals</small>
        </div>
      </div>
      <Arrow className="contact-arrow" />
    </section>
  );
}

