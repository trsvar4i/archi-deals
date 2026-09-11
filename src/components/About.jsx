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
        <p className="eyebrow">Ваш персональный байер</p>
        <h2>Шопинг снова должен<br /><em>приносить радость.</em></h2>
        <p className="large-copy">Archi Deals — это персональный шопинг с вниманием, заботой и умением находить лучшее предложение.</p>
        <p>Никаких десятков вкладок и сомнений. Только живой человек, который поможет разобраться в вариантах и найти то, что подходит именно вам.</p>
        <a className="text-link" href="#contact">Давайте найдём что-то особенное <ArrowUpRight /></a>
      </div>
    </section>
  );
}

