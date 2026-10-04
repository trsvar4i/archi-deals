const categories = [
  // TODO: заменить Unsplash на реальные фотографии и хранить их локально в src/assets или public.
  { title: "Мода", note: "Находки для гардероба и лимитированные вещи", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85" },
  { title: "Красота", note: "Культовые средства и новые открытия", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85" },
  { title: "Для жизни", note: "Красивые и полезные вещи для дома", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85" },
];

export default function Categories() {
  return (
    <section className="services section-shell" id="services">
      <div className="section-heading">
        <p className="eyebrow">Что можно найти</p>
        <h2>Ищем не похожее,<br />а <span className="headline-underline">то самое.</span></h2>
        <p>Одна категория не ограничивает поиск. Можно прийти с названием, фотографией или просто ощущением того, что хочется найти.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <article className="category-card" key={category.title}>
            <div className="category-image-wrap">
              <img src={category.image} alt={`Персональный шопинг: ${category.title}`} loading="lazy" />
            </div>
            <h3>{category.title}</h3>
            <p>{category.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

