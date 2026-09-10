import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const Arrow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 520 95" aria-hidden="true">
    <path d="M12 78C125 1 338 13 492 44" />
    <path d="m452 17 46 28-51 18" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle className="icon-dot" cx="17.4" cy="6.7" r="1" />
  </svg>
);

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const categories = [
  {
    number: "01",
    title: "Fashion",
    note: "Wardrobe finds & limited pieces",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "02",
    title: "Beauty",
    note: "Cult favorites & new discoveries",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "03",
    title: "Lifestyle",
    note: "Objects worth bringing home",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
  },
];

const steps = [
  ["01", "Tell me what you want", "Send a link, screenshot, mood, or simply an idea."],
  ["02", "I find the best deal", "I compare options, availability, and the details that matter."],
  ["03", "You approve", "You get a clear quote before anything is purchased."],
  ["04", "It comes to you", "Your find is secured, prepared, and sent your way."],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a className="wordmark" href="#top" aria-label="Archi Deals home">
          <span>ARCHI</span>
          <small>DEALS</small>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav id="main-navigation" className={menuOpen ? "nav is-open" : "nav"}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#process" onClick={closeMenu}>How it works</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Start a request <ArrowUpRight />
          </a>
        </nav>
      </header>

      <main id="top">
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

        <section className="ticker" aria-label="Archi Deals services">
          <div className="ticker-track">
            <span>Smart sourcing</span><i>✦</i><span>Personal attention</span><i>✦</i><span>Better finds</span><i>✦</i><span>Global shopping</span><i>✦</i>
            <span>Smart sourcing</span><i>✦</i><span>Personal attention</span><i>✦</i><span>Better finds</span><i>✦</i><span>Global shopping</span><i>✦</i>
          </div>
        </section>

        <section className="services section-shell" id="services">
          <div className="section-heading">
            <p className="eyebrow">What can I find?</p>
            <h2>The good stuff,<br /><em>minus the search.</em></h2>
            <p>Consider me your eyes, taste, and time saver. If it can be found, I’ll help you get closer to it.</p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.title}>
                <div className="category-image-wrap">
                  <img src={category.image} alt={`${category.title} personal shopping`} />
                  <span className="category-number">{category.number}</span>
                  <a href="#contact" aria-label={`Request help with ${category.title}`}>
                    <ArrowUpRight />
                  </a>
                </div>
                <h3>{category.title}</h3>
                <p>{category.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process" id="process">
          <div className="process-inner section-shell">
            <div className="process-heading">
              <p className="eyebrow">Simple by design</p>
              <h2>From “I want it”<br />to <em>“it’s mine.”</em></h2>
              <Arrow className="process-arrow" />
            </div>
            <div className="steps">
              {steps.map(([number, title, description]) => (
                <article className="step" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about section-shell" id="about">
          <div className="about-collage" aria-hidden="true">
            <div className="about-photo photo-main" />
            <div className="about-photo photo-small" />
            <div className="seal">
              <span>PERSONAL · THOUGHTFUL · EASY ·</span>
              <strong>AD</strong>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Your personal buyer</p>
            <h2>Shopping should feel<br /><em>exciting again.</em></h2>
            <p className="large-copy">
              Archi Deals is personal shopping with curiosity, care, and a sharp eye for value.
            </p>
            <p>
              No crowded tabs. No second-guessing. Just one real person helping you navigate choices and find what feels right for you.
            </p>
            <a className="text-link" href="#contact">Let’s find something good <ArrowUpRight /></a>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-inner section-shell">
            <div>
              <p className="eyebrow">Ready when you are</p>
              <h2>Tell me what<br />you’re <em>looking for.</em></h2>
            </div>
            <div className="contact-actions">
              <p>A link, a screenshot, a dream item—send whatever you have and we’ll start there.</p>
              <a className="contact-button" href="mailto:YOUR_EMAIL@example.com?subject=Personal%20shopping%20request%20for%20Archi%20Deals">
                Start your request <ArrowUpRight />
              </a>
              <small>Usually starts with a quick message.</small>
            </div>
          </div>
          <Arrow className="contact-arrow" />
        </section>
      </main>

      <footer className="footer section-shell">
        <a className="footer-brand" href="#top">
          <span>ARCHI</span>
          <Arrow />
          <small>DEALS</small>
        </a>
        <p>Personal shopping, thoughtfully sourced.</p>
        <div className="footer-links">
          <a href="https://instagram.com/YOUR_HANDLE" aria-label="Archi Deals on Instagram">
            <InstagramIcon /> Instagram
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Archi Deals</span>
          <span>Made for good finds.</span>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

