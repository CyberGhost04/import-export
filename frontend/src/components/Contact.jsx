import { ArrowUpRight } from './Icons'

export default function Contact({ contact, content }) {
  const enquiryLink = `mailto:${contact.email}?subject=${encodeURIComponent(content.email_subject)}`
  const secondaryEnquiryLink = `mailto:${contact.secondary_email}?subject=${encodeURIComponent(content.email_subject)}`
  const allEnquiryLink = `mailto:${contact.email},${contact.secondary_email}?subject=${encodeURIComponent(content.email_subject)}`
  return (
    <section className="contact section-wrap" id="contact">
      <div className="contact-copy"><div className="section-kicker"><span>{content.kicker_number}</span> / {content.kicker}</div><h2>{content.title_line_one}<br />{content.title_line_two} <em>{content.title_emphasis}</em></h2><p>{content.description}</p></div>
      <div className="contact-card"><span>{content.conversation_label}</span><a href={enquiryLink} className="contact-email">{contact.email}<ArrowUpRight /></a><a href={secondaryEnquiryLink} className="contact-email">{contact.secondary_email}<ArrowUpRight /></a><div className="contact-divider" /><span>{content.location_label}</span><a className="contact-cta" href={allEnquiryLink}>{content.cta_label} <ArrowUpRight /></a></div>
    </section>
  )
}
