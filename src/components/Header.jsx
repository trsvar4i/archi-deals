import { useEffect, useState } from "react";
import { ArrowUpRight } from "./Icons";

export default function Header() {
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
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <a className="wordmark" href="#top" aria-label="Archi Deals — на главную">
        <span>ARCHI</span>
        <small>DEALS</small>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label="Открыть меню"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav id="main-navigation" className={menuOpen ? "nav is-open" : "nav"}>
        <a href="#services" onClick={closeMenu}>Услуги</a>
        <a href="#process" onClick={closeMenu}>Как это работает</a>
        <a href="#about" onClick={closeMenu}>Обо мне</a>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Telegram-канал <ArrowUpRight />
        </a>
      </nav>
    </header>
  );
}

