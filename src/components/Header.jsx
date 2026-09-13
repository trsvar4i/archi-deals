import { useEffect, useState } from "react";
import { ArrowUpRight, InstagramIcon, TelegramIcon } from "./Icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("archi-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("archi-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a className="wordmark" href="#top" aria-label="Archi Deals — на главную">
          <span>ARCHI</span>
          <small>DEALS</small>
        </a>

        <div className="header-actions">
          <nav className="nav desktop-nav" aria-label="Основная навигация">
            <a href="#services">Услуги</a>
            <a href="#process">Как это работает</a>
            <a href="#about">Обо мне</a>
            <a className="nav-cta" href="#contact">
              Telegram-канал <ArrowUpRight />
            </a>
          </nav>

          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            aria-pressed={theme === "dark"}
            onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
          >
            <span className="theme-toggle-icon">☀</span>
            <span className="theme-toggle-thumb" />
            <span className="theme-toggle-icon">☾</span>
          </button>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <button
        className={menuOpen ? "menu-backdrop is-open" : "menu-backdrop"}
        type="button"
        aria-label="Закрыть меню"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <aside
        id="mobile-navigation"
        className={menuOpen ? "mobile-menu is-open" : "mobile-menu"}
        aria-hidden={!menuOpen}
      >
        <p className="mobile-menu-label">Меню</p>
        <nav className="mobile-nav" aria-label="Мобильная навигация">
          <a href="#services" onClick={closeMenu}><span>01</span>Услуги</a>
          <a href="#process" onClick={closeMenu}><span>02</span>Как это работает</a>
          <a href="#about" onClick={closeMenu}><span>03</span>Обо мне</a>
        </nav>

        <div className="mobile-socials">
          <p>Мы в социальных сетях</p>
          <div>
            <a href="https://t.me/archi_deals" target="_blank" rel="noreferrer" aria-label="Telegram-канал Archi Deals">
              <TelegramIcon />
            </a>
            <a href="https://instagram.com/archi_deals" target="_blank" rel="noreferrer" aria-label="Instagram Archi Deals">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

