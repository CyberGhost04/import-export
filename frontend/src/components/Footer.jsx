import { Link } from 'react-router-dom'

export default function Footer({ content }) {
  return <footer className="site-footer"><Link className="footer-brand" to="/#top">{content.brand_mark}<span>.</span></Link><span>{content.company_name}</span><span>{content.tagline}</span><span>© {new Date().getFullYear()} {content.brand_mark}</span></footer>
}
