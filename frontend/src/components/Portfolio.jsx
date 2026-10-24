import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from './Icons'

const icons = {
  electronics: '⌁',
  materials: '◈',
  mobility: '↗',
  health: '+',
  harvest: '❋',
  industry: '⌘',
  essentials: '◇',
  textiles: '▤',
  gems: '✧',
  services: '⌘',
}

export default function Portfolio({ categories, content }) {
  const carouselRef = useRef(null)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [canScrollForward, setCanScrollForward] = useState(false)

  const updateScrollControls = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    setCanScrollBack(carousel.scrollLeft > 1)
    setCanScrollForward(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1)
  }, [])

  useEffect(() => {
    updateScrollControls()
    const carousel = carouselRef.current
    if (!carousel) return undefined
    const resizeObserver = new ResizeObserver(updateScrollControls)
    resizeObserver.observe(carousel)
    return () => resizeObserver.disconnect()
  }, [categories, updateScrollControls])

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current
    if (carousel) carousel.scrollBy({ left: direction * carousel.clientWidth, behavior: 'smooth' })
  }

  const scrollCarouselOnWheel = (event) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const maxScroll = carousel.scrollWidth - carousel.clientWidth
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    const nextScroll = carousel.scrollLeft + delta
    if (maxScroll > 0 && nextScroll >= 0 && nextScroll <= maxScroll) {
      event.preventDefault()
      carousel.scrollLeft = nextScroll
    }
  }

  return (
    <section className="portfolio section-wrap" id="what-we-do">
      <div className="section-kicker"><span>{content.kicker_number}</span> / {content.kicker}</div>
      <div className="section-heading">
        <h2>{content.title_line_one}<br /><em>{content.title_emphasis}</em></h2>
        <p>{content.description}</p>
      </div>
      <div className="portfolio-controls">
        <span>{categories.length} {content.category_count_label}</span>
        <div>
          <button type="button" onClick={() => scrollCarousel(-1)} disabled={!canScrollBack} aria-label={content.previous_label}><ChevronLeft /></button>
          <button type="button" onClick={() => scrollCarousel(1)} disabled={!canScrollForward} aria-label={content.next_label}><ChevronRight /></button>
        </div>
      </div>
      <div className="portfolio-carousel" ref={carouselRef} onScroll={updateScrollControls} onWheel={scrollCarouselOnWheel} aria-label={content.carousel_aria_label}>
        <div className="portfolio-track">
          {categories.map((category, index) => (
            <Link className="portfolio-card" key={category.id} to={`/trade/${category.id}`} aria-label={`${content.card_action_prefix} ${category.name}`}>
              <div className="card-top"><span className="card-number">{String(index + 1).padStart(2, '0')}</span><span className="card-icon">{icons[category.id] || '◌'}</span></div>
              <h3>{category.name}</h3>
              <span className="trade-direction">{category.direction}</span>
              <p>{category.description}</p>
              <div className="product-list">{category.products.map((product) => <span key={product}>{product}</span>)}</div>
              <span className="card-arrow"><ArrowUpRight /></span>
            </Link>
          ))}
        </div>
      </div>
      <div className="portfolio-note"><span>*</span> {content.disclaimer}</div>
    </section>
  )
}
