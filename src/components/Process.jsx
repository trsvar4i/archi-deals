import { Arrow } from "./Icons";

const steps = [
  ["01", "Расскажите, что ищете", "Пришлите ссылку, скриншот, пример или просто опишите идею."],
  ["02", "Я найду лучший вариант", "Сравню предложения, наличие, цену и важные для вас детали."],
  ["03", "Вы подтверждаете", "До покупки вы получите понятный расчёт без сюрпризов."],
  ["04", "Заказ едет к вам", "Я выкуплю находку, подготовлю её и организую доставку."],
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-inner section-shell">
        <div className="process-heading">
          <p className="eyebrow">Всё очень просто</p>
          <h2>От «я это хочу»<br />до <em>«это моё».</em></h2>
          <Arrow className="process-arrow" />
        </div>
        <div className="steps">
          {steps.map(([number, title, description]) => (
            <article className="step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

