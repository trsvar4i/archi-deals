import { ArrowUpRight } from "./Icons";

export default function About() {
  return (
    <section className="about section-shell" id="about">
      <div className="about-collage" aria-hidden="true">
        <div className="about-photo photo-main" />
        <div className="about-photo photo-small" />
        <div className="seal"><span>ЛИЧНО · ПРОДУМАННО · ЛЕГКО ·</span><strong>AD</strong></div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">Персональный байер</p>
        <h2>Шопинг снова может<br /><em>приносить радость.</em></h2>
        <p className="large-copy">Archi Deals — персональный шопинг с вниманием к деталям и умением находить лучшее предложение.</p>
        <p>Без десятков вкладок и лишних сомнений. За каждым заказом стоит живой человек, который разбирается в вариантах и остаётся на связи.</p>
        <a className="text-link" href="#contact">Больше находок в Telegram <ArrowUpRight /></a>
      </div>
    </section>
  );
}

