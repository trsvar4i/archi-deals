import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import FreshFinds from "./components/FreshFinds";
import Categories from "./components/Categories";
import Trust from "./components/Trust";
import Process from "./components/Process";
import About from "./components/About";
import OrderRequest from "./components/OrderRequest";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Ticker />
        <FreshFinds />
        <Categories />
        <Trust />
        <Process />
        <About />
        <OrderRequest />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

