import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Categories from "./components/Categories";
import Process from "./components/Process";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Ticker />
        <Categories />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

