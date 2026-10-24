import { ArrowRight, GlobeIcon } from './Icons'

export default function Markets({ markets, content }) {
  return (
    <section className="markets" id="markets">
      <div className="section-wrap markets-inner">
        <div className="section-kicker section-kicker-light"><span>{content.kicker_number}</span> / {content.kicker}</div>
        <div className="markets-heading">
          <h2>{content.title_line_one}<br /><em>{content.title_emphasis}</em></h2>
          <div><p>{content.description}</p><span className="market-globe"><GlobeIcon /> {content.globe_label}</span></div>
        </div>
        <div className="markets-list">
          {markets.map((market, index) => (
            <article className="market-row" key={market.id}>
              <span className="market-index">0{index + 1}</span>
              <h3>{market.name}</h3>
              <p>{market.summary}</p>
              <div className="market-tags">{market.focus.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
        <div className="markets-foot"><span>{content.footer_prompt}</span><a href="#contact">{content.footer_cta} <ArrowRight /></a></div>
      </div>
    </section>
  )
}
