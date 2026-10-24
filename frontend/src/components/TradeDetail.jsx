import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from './Icons'

function DetailImage({ image, label, index, placeholderLabel, placeholderAriaPrefix, brandMark }) {
  return (
    <figure className="detail-image">
      {image ? (
        <img src={image} alt={label} />
      ) : (
        <div className="detail-image-placeholder" role="img" aria-label={`${placeholderAriaPrefix} ${label}`}>
          <span className="detail-image-mark">{brandMark}</span>
          <span>{placeholderLabel}</span>
          <strong>{label}</strong>
        </div>
      )}
      <span className="detail-image-number">{String(index + 1).padStart(2, '0')}</span>
      <figcaption>{label}</figcaption>
    </figure>
  )
}

export default function TradeDetail({ categories, contact, contactContent, content, status, loading, loadError, notFound = false }) {
  const { categoryId } = useParams()
  const category = categories?.find((item) => item.id === categoryId)

  if (!content || !status) {
    return <main className="detail-status section-wrap" aria-live="polite"><p>{loadError || 'Loading trade details…'}</p></main>
  }

  if (notFound || (!loading && !loadError && !category)) {
    return (
      <main className="detail-status section-wrap">
        <span className="section-kicker">{content.brand_label} / {content.category_breadcrumb}</span>
        <h1>{content.category_not_found_title}</h1>
        <p>{content.category_not_found_description}</p>
        <Link className="button button-dark" to="/#what-we-do">{content.back_to_categories} <ArrowRight /></Link>
      </main>
    )
  }

  if (loading || !category) {
    return <main className="detail-status section-wrap" aria-live="polite"><p>{loadError ? status.unavailable_description : status.loading_detail}</p></main>
  }

  const enquiryHref = contact
    ? `mailto:${contact.email},${contact.secondary_email}?subject=${encodeURIComponent(`${contactContent.email_subject}: ${category.name}`)}`
    : undefined

  return (
    <main className="trade-detail">
      <section className="detail-hero section-wrap">
        <Link className="detail-back" to="/#what-we-do"><ArrowRight /> {content.back_to_categories}</Link>
        <span className="section-kicker">{content.brand_label} / {content.category_breadcrumb} / {category.direction.toUpperCase()}</span>
        <h1>{category.name}</h1>
        <p>{category.overview}</p>
        <div className="detail-products">{category.products.map((product) => <span key={product}>{product}</span>)}</div>
      </section>

      <section className="detail-gallery section-wrap" data-count={category.gallery.length} aria-label={`${category.name} photo gallery`}>
        {category.gallery.map((image, index) => <DetailImage image={image.image} label={image.label} index={index} placeholderLabel={content.photo_placeholder_label} placeholderAriaPrefix={content.photo_placeholder_aria_prefix} brandMark={content.brand_mark} key={image.label} />)}
      </section>

      <section className="detail-routes section-wrap">
        <div className="section-kicker"><span>{content.route_kicker_number}</span> / {content.route_kicker}</div>
        <div className="detail-section-heading">
          <h2>{content.route_title_line_one}<br />{content.route_title_line_two} <em>{content.route_title_emphasis}</em></h2>
          <p>{content.route_description}</p>
        </div>
        <div className="route-list">
          {category.routes.map((route, index) => (
            <article className="route-card" key={`${route.origin}-${route.destination}-${index}`}>
              <span className="route-index">0{index + 1} / {route.direction.toUpperCase()}</span>
              <div className="route-point"><span>{content.origin_label}</span><strong>{route.origin}</strong></div>
              <ArrowRight />
              <div className="route-point"><span>{content.destination_label}</span><strong>{route.destination}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-logistics">
        <div className="section-wrap logistics-layout">
          <div>
            <div className="section-kicker"><span>{content.logistics_kicker_number}</span> / {content.logistics_kicker}</div>
            <h2>{content.logistics_title_line_one}<br />{content.logistics_title_line_two} <em>{content.logistics_title_emphasis}</em></h2>
            <p className="logistics-intro">{content.logistics_description}</p>
          </div>
          <div className="logistics-content">
            <div className="logistics-block">
              <h3>{content.transport_heading}</h3>
              <div className="transport-tags">{category.transport_modes.map((mode) => <span key={mode}>{mode}</span>)}</div>
            </div>
            <div className="logistics-block">
              <h3>{content.handling_heading}</h3>
              <ul>{category.handling_notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-enquiry section-wrap">
        <div>
          <span className="section-kicker"><span>{content.enquiry_kicker_number}</span> / {content.enquiry_kicker}</span>
          <h2>{content.enquiry_title_line_one}<br />{content.enquiry_title_line_two}<em>{category.name.toLowerCase()}{content.enquiry_title_suffix}</em></h2>
        </div>
        <a className="button button-dark" href={enquiryHref}>
          {content.discuss_category} <ArrowUpRight />
        </a>
      </section>
    </main>
  )
}
