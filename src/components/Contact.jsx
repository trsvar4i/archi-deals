import { Arrow, ArrowUpRight } from "./Icons";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner section-shell">
        <div>
          <p className="eyebrow">Можно начинать</p>
          <h2>Расскажите,<br />что вы <em>ищете.</em></h2>
        </div>
        <div className="contact-actions">
          <p>Ссылка, скриншот или вещь мечты — пришлите всё, что у вас есть, и мы начнём поиск.</p>
          <a className="contact-button" href="https://t.me/archi_deals" target="_blank" rel="noreferrer">Написать в Telegram <ArrowUpRight /></a>
          <small>Обычно всё начинается с короткого сообщения.</small>
        </div>
      </div>
      <Arrow className="contact-arrow" />
    </section>
  );
}

