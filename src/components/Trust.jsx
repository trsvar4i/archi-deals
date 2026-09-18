const trustItems = [
  { number: "01", title: "Сравнение вариантов", text: "Цена, наличие, условия покупки и доставки собираются в одну понятную картину." },
  { number: "02", title: "Проверка деталей", text: "Размер, цвет, состав и важные нюансы уточняются до оформления заказа." },
  { number: "03", title: "Понятный расчёт", text: "Стоимость покупки и доставки согласовывается заранее — без неожиданных дополнений." },
  { number: "04", title: "Один человек на связи", text: "Заказ не теряется между менеджерами: весь путь ведёт персональный байер." },
];

export default function Trust() {
  return (
    <section className="trust section-shell" aria-labelledby="trust-title">
      <div className="trust-heading">
        <p className="eyebrow">Внимание к деталям</p>
        <h2 id="trust-title">Спокойно на каждом<br /><em>этапе поиска.</em></h2>
      </div>
      <div className="trust-grid">
        {trustItems.map((item) => (
          <article className="trust-card" key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

