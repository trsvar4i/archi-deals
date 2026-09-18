import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Запрос",
    short: "Идея или ссылка",
    description: "Достаточно фотографии, ссылки, названия вещи или простого описания задумки.",
    example: "Нужна редкая пара кроссовок в конкретном размере и спокойной расцветке.",
  },
  {
    number: "02",
    title: "Поиск",
    short: "Подбор вариантов",
    description: "Предложения сравниваются по цене, наличию, состоянию и надёжности площадки.",
    example: "Найдены три подходящих варианта на разных площадках с понятной разницей в цене.",
  },
  {
    number: "03",
    title: "Согласование",
    short: "Расчёт до покупки",
    description: "Перед оформлением фиксируются итоговый вариант, стоимость и условия доставки.",
    example: "Выбран оптимальный вариант, проверены размер и комплектация, согласован расчёт.",
  },
  {
    number: "04",
    title: "Доставка",
    short: "Заказ в пути",
    description: "После выкупа остаётся только следить за статусом — всё остальное уже организовано.",
    example: "Покупка оформлена, статус передан, посылка направлена по согласованному адресу.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];

  return (
    <section className="process" id="process">
      <div className="process-inner section-shell">
        <div className="process-heading">
          <p className="eyebrow">Один реальный сценарий</p>
          <h2>От запроса<br />до <em>доставки.</em></h2>
          <p className="process-intro">Небольшой пример показывает весь путь заказа без лишних деталей.</p>
        </div>

        <div className="process-demo">
          <div className="process-tabs" role="tablist" aria-label="Этапы заказа">
            {steps.map((step, index) => (
              <button
                className={index === activeStep ? "process-tab is-active" : "process-tab"}
                type="button"
                role="tab"
                aria-selected={index === activeStep}
                aria-controls="process-panel"
                key={step.number}
                onClick={() => setActiveStep(index)}
              >
                <span>{step.number}</span>
                <strong>{step.title}</strong>
              </button>
            ))}
          </div>

          <div className="process-panel" id="process-panel" role="tabpanel" aria-live="polite">
            <div className="process-panel-meta">
              <span>Этап {active.number}</span>
              <span>{active.short}</span>
            </div>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <blockquote>{active.example}</blockquote>
            <div className="process-progress" aria-hidden="true">
              <span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

