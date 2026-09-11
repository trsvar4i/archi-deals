import { Arrow, InstagramIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer section-shell">
      <a className="footer-brand" href="#top"><span>ARCHI</span><Arrow /><small>DEALS</small></a>
      <p>Персональный шопинг с вниманием к деталям.</p>
      <div className="footer-links">
        <a href="https://instagram.com/archi_deals" target="_blank" rel="noreferrer" aria-label="Archi Deals в Instagram"><InstagramIcon /> Instagram</a>
        <a href="#top">Наверх ↑</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Archi Deals</span>
        <span>Создано для отличных находок.</span>
      </div>
    </footer>
  );
}

