import { GlobeIcon } from './Icons'

export default function Intro({ content }) {
  return (
    <section className="intro section-wrap" id="about">
      <div className="section-kicker"><span>{content.kicker_number}</span> / {content.kicker}</div>
      <div className="intro-main">
        <h2>{content.title_line_one}<br />{content.title_line_two} <em>{content.title_emphasis}</em></h2>
        <div className="intro-copy">
          <p>{content.description}</p>
          <div className="intro-signoff"><GlobeIcon /><span>{content.signoff_lines.map((line) => <span key={line}>{line}<br /></span>)}</span></div>
        </div>
      </div>
      <div className="stats-row">
        {content.stats.map((stat) => <div key={stat.label}><strong>{stat.value}{stat.suffix && <span>{stat.suffix}</span>}</strong><span>{stat.label}</span></div>)}
        <p>{content.closing_note_lines.map((line) => <span key={line}>{line}<br /></span>)}</p>
      </div>
    </section>
  )
}
