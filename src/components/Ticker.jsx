export default function Ticker() {
  const items = ["Умный поиск", "Личный подход", "Лучшие находки", "Шопинг по всему миру"];
  const loopItems = [...items, ...items];

  return (
    <section className="ticker" aria-label="Услуги Archi Deals">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div className="ticker-group" aria-hidden={group === 1} key={group}>
            {loopItems.map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>
                <i>•</i><span>{item}</span><i>•</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

