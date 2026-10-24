export default function Founders({ founders, content }) {
  return (
    <section className="founders section-wrap">
      <div className="section-kicker"><span>{content.kicker_number}</span> / {content.kicker}</div>
      <div className="founders-layout">
        <div className="founders-art"><div className="founders-art-circle"><span>{content.brand_mark}</span><i>{content.stamp_lines.map((line) => <span key={line}>{line}<br /></span>)}</i></div><span className="founders-art-caption">{content.stamp_caption}</span></div>
        <div className="founders-copy">
          <span className="quote-mark">“</span>
          <blockquote>{content.quote}</blockquote>
          <p>{content.body}</p>
          <div className="founder-signatures">{founders.map((founder) => <div key={founder.name}><strong>{founder.name}</strong><span>{founder.title}</span></div>)}</div>
        </div>
      </div>
    </section>
  )
}
