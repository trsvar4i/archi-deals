import { Arrow } from "./Icons";

const steps = [
  ["01", "Tell me what you want", "Send a link, screenshot, mood, or simply an idea."],
  ["02", "I find the best deal", "I compare options, availability, and the details that matter."],
  ["03", "You approve", "You get a clear quote before anything is purchased."],
  ["04", "It comes to you", "Your find is secured, prepared, and sent your way."],
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-inner section-shell">
        <div className="process-heading">
          <p className="eyebrow">Simple by design</p>
          <h2>From “I want it”<br />to <em>“it’s mine.”</em></h2>
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

