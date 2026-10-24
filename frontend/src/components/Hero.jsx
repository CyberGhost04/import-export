import { ArrowUpRight, GlobeIcon } from './Icons'

export default function Hero({ content }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> {content.eyebrow}</div>
        <h1>{content.title_line_one}<br />{content.title_line_two} <em>{content.title_emphasis}</em> {content.title_after_emphasis}</h1>
        <p className="hero-intro">{content.description}</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#what-we-do">{content.primary_cta} <ArrowUpRight /></a>
          <a className="text-link" href="#about">{content.secondary_cta} <span>↓</span></a>
        </div>
        <div className="hero-footnote"><span className="hero-dot" /> {content.footnote}</div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo" role="img" aria-label={content.image_alt} />
        <div className="photo-shade" />
        <div className="photo-label"><GlobeIcon /><span>{content.image_badge.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</span></div>
        <div className="photo-caption"><span>{content.slide_number}</span><span>{content.image_caption}</span></div>
      </div>
      <div className="hero-bottom">
        <span>{content.slide_number.replace(' / ', ' — ')}</span><span>{content.scroll_label}</span><span>{content.footer_label}</span>
      </div>
    </section>
  )
}
