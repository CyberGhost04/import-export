import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from './Icons'

export default function TradeInsightDetail({ insights, content, status, loading, loadError }) {
  const { insightId } = useParams()
  const insight = insights?.find((item) => item.id === insightId)

  if (!content || !status) {
    return <main className="detail-status section-wrap" aria-live="polite"><p>{loadError || 'Loading website content…'}</p></main>
  }

  if (loading || (!insight && !loadError)) {
    return <main className="detail-status section-wrap" aria-live="polite"><p>{status.loading_detail}</p></main>
  }

  if (!insight) {
    return (
      <main className="detail-status section-wrap">
        <span className="section-kicker">{content.brand_label} / {content.insight_breadcrumb}</span>
        <h1>{loadError ? status.unavailable_title : content.insight_not_found_title}</h1>
        <p>{loadError ? status.unavailable_description : content.insight_not_found_description}</p>
        <Link className="button button-dark" to="/#trade-gallery-title">{content.back_to_stories} <ArrowRight /></Link>
      </main>
    )
  }

  return (
    <main className="trade-detail">
      <section className="detail-hero section-wrap">
        <Link className="detail-back" to="/#trade-gallery-title"><ArrowRight /> {content.back_to_stories}</Link>
        <span className="section-kicker">{content.brand_label} / {content.insight_breadcrumb} / {insight.id.replaceAll('-', ' ').toUpperCase()}</span>
        <h1>{insight.title}</h1>
        <p>{insight.overview}</p>
      </section>

      <section className="insight-image section-wrap">
        <img src={insight.image} alt={insight.alt} />
        <p>{insight.detail}</p>
      </section>

      <section className="detail-routes section-wrap">
        <div className="section-kicker"><span>{content.insight_route_kicker_number}</span> / {content.insight_route_kicker}</div>
        <div className="detail-section-heading">
          <h2>{content.insight_route_title_line_one}<br />{content.insight_route_title_line_two} <em>{content.insight_route_title_emphasis}</em></h2>
          <p>{content.insight_route_description}</p>
        </div>
        <div className="route-list">
          <article className="route-card">
            <span className="route-index">{content.insight_route_label}</span>
            <div className="route-point"><span>{content.origin_label}</span><strong>{insight.origin}</strong></div>
            <ArrowRight />
            <div className="route-point"><span>{content.destination_label}</span><strong>{insight.destination}</strong></div>
          </article>
        </div>
      </section>

      <section className="detail-logistics">
        <div className="section-wrap logistics-layout">
          <div>
            <div className="section-kicker"><span>{content.insight_logistics_kicker_number}</span> / {content.insight_logistics_kicker}</div>
            <h2>{content.insight_logistics_title_line_one}<br />{content.insight_logistics_title_line_two} <em>{content.insight_logistics_title_emphasis}</em></h2>
            <p className="logistics-intro">{content.insight_logistics_description}</p>
          </div>
          <div className="logistics-content">
            <div className="logistics-block">
              <h3>{content.insight_transport_heading}</h3>
              <div className="transport-tags">{insight.transport_modes.map((mode) => <span key={mode}>{mode}</span>)}</div>
            </div>
            <div className="logistics-block">
              <h3>{content.insight_handling_heading}</h3>
              <ul>{insight.handling_notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-enquiry section-wrap">
        <div>
          <span className="section-kicker"><span>{content.insight_enquiry_kicker_number}</span> / {content.insight_enquiry_kicker}</span>
          <h2>{content.insight_enquiry_title_line_one}<br />{content.insight_enquiry_title_line_two}<em>{content.insight_enquiry_title_emphasis}</em></h2>
        </div>
        <Link className="button button-dark" to="/#what-we-do">{content.explore_categories} <ArrowRight /></Link>
      </section>
    </main>
  )
}
