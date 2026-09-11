import { ArrowUpRight } from "./Icons";

export default function About() {
  return (
    <section className="about section-shell" id="about">
      <div className="about-collage" aria-hidden="true">
        <div className="about-photo photo-main" />
        <div className="about-photo photo-small" />
        <div className="seal"><span>PERSONAL · THOUGHTFUL · EASY ·</span><strong>AD</strong></div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">Your personal buyer</p>
        <h2>Shopping should feel<br /><em>exciting again.</em></h2>
        <p className="large-copy">Archi Deals is personal shopping with curiosity, care, and a sharp eye for value.</p>
        <p>No crowded tabs. No second-guessing. Just one real person helping you navigate choices and find what feels right for you.</p>
        <a className="text-link" href="#contact">Let’s find something good <ArrowUpRight /></a>
      </div>
    </section>
  );
}

