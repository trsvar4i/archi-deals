import { Arrow, ArrowUpRight } from "./Icons";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner section-shell">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Tell me what<br />you’re <em>looking for.</em></h2>
        </div>
        <div className="contact-actions">
          <p>A link, a screenshot, a dream item—send whatever you have and we’ll start there.</p>
          <a className="contact-button" href="mailto:YOUR_EMAIL@example.com?subject=Personal%20shopping%20request%20for%20Archi%20Deals">Start your request <ArrowUpRight /></a>
          <small>Usually starts with a quick message.</small>
        </div>
      </div>
      <Arrow className="contact-arrow" />
    </section>
  );
}

