export default function About() {
  return (
    <section className="about section-shell" id="about">
      <div className="about-collage" aria-hidden="true">
        <div className="about-photo photo-main" />
        <div className="about-photo photo-small" />
        <div className="seal"><span>ЛИЧНО · ПРОДУМАННО · ЛЕГКО ·</span><strong>AD</strong></div>
      </div>
      <div className="about-copy">
        <h2>Поиск ведёт <mark>человек</mark>, а не алгоритм.</h2>
        <p className="large-copy">Archi Deals — персональный шопинг с вниманием к деталям и умением находить предложение, которое подходит именно вам.</p>
        <p>Я разбираюсь в вариантах, уточняю нюансы и остаюсь на связи от первого сообщения до покупки. Без десятков вкладок и ощущения, что выбирать приходится в одиночку.</p>
        <a className="text-link" href="#contact">Познакомиться с подборками</a>
      </div>
    </section>
  );
}

