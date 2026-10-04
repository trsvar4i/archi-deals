const trustItems = [
  { title: "Сравнение вариантов", text: "Цена, наличие, условия покупки и доставки собираются в одну понятную картину." },
  { title: "Проверка деталей", text: "Размер, цвет, состав и важные нюансы уточняются до оформления заказа." },
  { title: "Понятный расчёт", text: "Стоимость покупки и доставки согласовывается заранее — без неожиданных дополнений." },
  { title: "Один человек на связи", text: "Заказ не теряется между менеджерами: весь путь ведёт персональный байер." },
];

export default function Trust() {
  return (
    <section className="trust section-shell" aria-labelledby="trust-title">
      <div className="trust-heading">
        <p className="trust-kicker">Не обещания, а рабочий подход</p>
        <h2 id="trust-title">Проверяем то, что обычно остаётся за кадром.</h2>
      </div>
      <div className="trust-grid">
        {trustItems.map((item) => (
          <article className="trust-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

