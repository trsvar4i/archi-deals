import { Arrow, InstagramIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer section-shell">
      <a className="footer-brand" href="#top"><span>ARCHI</span><Arrow /><small>DEALS</small></a>
      <p>Personal shopping, thoughtfully sourced.</p>
      <div className="footer-links">
        <a href="https://instagram.com/YOUR_HANDLE" aria-label="Archi Deals on Instagram"><InstagramIcon /> Instagram</a>
        <a href="#top">Back to top ↑</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Archi Deals</span>
        <span>Made for good finds.</span>
      </div>
    </footer>
  );
}

