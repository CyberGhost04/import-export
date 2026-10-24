import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon } from './Icons'

export default function Header({ content }) {
  const [menuOpen, setMenuOpen] = useState(false)
  if (!content) return null

  return (
    <header className="site-header">
      <Link className="brand" to="/#top" aria-label={content.brand_aria_label}>
        <span className="brand-mark">{content.brand_mark}<span>.</span></span>
        <span className="brand-name">{content.company_name}</span>
      </Link>
      <button className="menu-toggle" type="button" aria-label={content.menu_label} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon open={menuOpen} />
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label={content.nav_aria_label}>
        {content.links.map(({ label, href }) => <Link key={href} to={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
        <Link className="nav-contact" to="/#contact" onClick={() => setMenuOpen(false)}>{content.contact_label} <span>↗</span></Link>
      </nav>
    </header>
  )
}
