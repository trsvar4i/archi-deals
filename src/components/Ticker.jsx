export default function Ticker() {
  const items = ["Умный поиск", "Личный подход", "Лучшие находки", "Шопинг по всему миру"];

  return (
    <section className="ticker" aria-label="Услуги Archi Deals">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div className="ticker-group" aria-hidden={group === 1} key={group}>
            {items.map((item) => (
              <span className="ticker-item" key={item}>
                <span>{item}</span><i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

