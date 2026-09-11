import { Arrow, ArrowUpRight } from "./Icons";

export default function Hero() {
  return (
    <section className="hero section-shell">
      <div className="hero-copy">
        <p className="eyebrow reveal">Personal shopping · Curated for you</p>
        <h1 className="reveal reveal-delay-1">
          Your shortcut<br />
          to the <em>right</em> find.
        </h1>
        <p className="hero-intro reveal reveal-delay-2">
          From sold-out fashion to thoughtful gifts, I search, compare, and secure the pieces you want—without the endless scrolling.
        </p>
        <a className="primary-button reveal reveal-delay-3" href="#contact">
          Find it for me <ArrowUpRight />
        </a>
      </div>

      <div className="hero-visual reveal reveal-delay-2" aria-label="Curated fashion selection">
        <div className="hero-photo" />
        <div className="floating-note note-top">
          <span>Handpicked</span>
          <strong>Just for you</strong>
        </div>
        <div className="floating-note note-bottom">
          <span>One request</span>
          <strong>Better options</strong>
        </div>
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
      </div>

      <Arrow className="hero-arrow" />
      <p className="scroll-note">Scroll to discover <span>↓</span></p>
    </section>
  );
}

