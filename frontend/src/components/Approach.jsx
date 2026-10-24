export default function Approach({ content }) {
  return (
    <section className="approach section-wrap" id="approach">
      <div className="section-kicker"><span>{content.kicker_number}</span> / {content.kicker}</div>
      <div className="approach-layout">
        <div><h2>{content.title_lines.map((line) => <span key={line}>{line}<br /></span>)}<em>{content.title_emphasis}</em></h2><p>{content.description}</p></div>
        <div className="steps">{content.steps.map((step, index) => <article className="step" key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><span className="step-plus">+</span></article>)}</div>
      </div>
    </section>
  )
}
