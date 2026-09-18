import { Arrow, ArrowUpRight } from "./Icons";

export default function Hero() {
  return (
    <section className="hero section-shell">
      <div className="hero-copy">
        <p className="eyebrow reveal">Персональный шопинг · Точный поиск</p>
        <h1 className="reveal reveal-delay-1">
          Короткий путь<br />
          к <em>идеальной</em> находке.
        </h1>
        <p className="hero-intro reveal reveal-delay-2">
          От редких вещей до особенных подарков — поиск, сравнение и помощь с покупкой без десятков вкладок.
        </p>
        <a className="primary-button reveal reveal-delay-3" href="#finds">
          Перейти к находкам <ArrowUpRight />
        </a>
      </div>

      <div className="hero-visual reveal reveal-delay-2" aria-label="Персональная подборка товаров">
        <div className="hero-photo" />
        <div className="floating-note note-top">
          <span>Отобрано вручную</span>
          <strong>Точный выбор</strong>
        </div>
        <div className="floating-note note-bottom">
          <span>Один запрос</span>
          <strong>Лучшие варианты</strong>
        </div>
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
      </div>

      <Arrow className="hero-arrow" />
    </section>
  );
}

