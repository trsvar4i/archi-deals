import { ArrowUpRight } from "./Icons";

const categories = [
  { number: "01", title: "Мода", note: "Находки для гардероба и лимитированные вещи", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85" },
  { number: "02", title: "Красота", note: "Культовые средства и новые открытия", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85" },
  { number: "03", title: "Для жизни", note: "Красивые и полезные вещи для дома", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85" },
];

export default function Categories() {
  return (
    <section className="services section-shell" id="services">
      <div className="section-heading">
        <p className="eyebrow">Что я могу найти?</p>
        <h2>Лучшие вещи —<br /><em>без долгих поисков.</em></h2>
        <p>Я стану вашими глазами, вкусом и помощником. Если вещь можно найти, я помогу сделать её вашей.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <article className="category-card" key={category.title}>
            <div className="category-image-wrap">
              <img src={category.image} alt={`Персональный шопинг: ${category.title}`} />
              <span className="category-number">{category.number}</span>
              <a href="#contact" aria-label={`Оставить заявку: ${category.title}`}><ArrowUpRight /></a>
            </div>
            <h3>{category.title}</h3>
            <p>{category.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

