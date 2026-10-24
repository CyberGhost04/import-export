import { Link } from 'react-router-dom'

export default function TradeGallery({ insights, content }) {
  return (
    <section className="trade-gallery section-wrap" aria-labelledby="trade-gallery-title">
      <div className="trade-gallery-heading">
        <div>
          <div className="section-kicker">{content.kicker}</div>
          <h2 id="trade-gallery-title">{content.title_line_one}<br />{content.title_line_two} <em>{content.title_emphasis}</em></h2>
        </div>
        <p>{content.description}</p>
      </div>
      <div className="trade-gallery-grid">
        {insights.map((insight, index) => (
          <Link className="trade-gallery-card" key={insight.id} to={`/trade-insights/${insight.id}`} aria-label={`${content.card_action_prefix}: ${insight.title}`}>
            <img src={insight.image} alt={insight.alt} loading="lazy" decoding="async" />
            <figcaption>
              <span>0{index + 1} / {content.card_label}</span>
              <strong>{insight.title}</strong>
              <span>{insight.detail}</span>
            </figcaption>
          </Link>
        ))}
      </div>
    </section>
  )
}
