import { ArrowUpRight } from "./Icons";

const categories = [
  { number: "01", title: "Fashion", note: "Wardrobe finds & limited pieces", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85" },
  { number: "02", title: "Beauty", note: "Cult favorites & new discoveries", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85" },
  { number: "03", title: "Lifestyle", note: "Objects worth bringing home", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85" },
];

export default function Categories() {
  return (
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
              <a href="#contact" aria-label={`Request help with ${category.title}`}><ArrowUpRight /></a>
            </div>
            <h3>{category.title}</h3>
            <p>{category.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

