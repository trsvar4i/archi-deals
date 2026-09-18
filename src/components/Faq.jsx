import { useState } from "react";
import { ArrowUpRight } from "./Icons";

const questions = [
  {
    question: "Что можно заказать?",
    answer: "Одежду, обувь, косметику, аксессуары, подарки и вещи для дома. Если нужной категории нет на сайте, запрос всё равно можно описать в заявке.",
  },
  {
    question: "Как рассчитывается стоимость?",
    answer: "До покупки формируется понятный расчёт: цена товара, расходы на выкуп и доставка. Итог согласовывается заранее.",
  },
  {
    question: "Можно ли найти вещь по фотографии?",
    answer: "Да. Подойдёт скриншот, фотография, ссылка на похожую вещь или обычное текстовое описание.",
  },
  {
    question: "Сколько занимает поиск и доставка?",
    answer: "Срок зависит от товара, страны и способа доставки. Ориентир по времени появляется после проверки конкретного запроса.",
  },
  {
    question: "Где появляются новые находки?",
    answer: "Самые свежие подборки и интересные предложения публикуются в Telegram-канале Archi Deals.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq section-shell" id="faq">
      <div className="faq-heading">
        <p className="eyebrow">Коротко о главном</p>
        <h2>Частые<br /><em>вопросы.</em></h2>
        <a href="https://t.me/archi_deals" target="_blank" rel="noreferrer">
          Больше информации в Telegram <ArrowUpRight />
        </a>
      </div>

      <div className="faq-list">
        {questions.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <article className={isOpen ? "faq-item is-open" : "faq-item"} key={item.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.question}
                  <i aria-hidden="true">+</i>
                </button>
              </h3>
              <div className="faq-answer" id={`faq-answer-${index}`} hidden={!isOpen}>
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

