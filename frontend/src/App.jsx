import { useEffect, useLayoutEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import TradeGallery from './components/TradeGallery'
import Portfolio from './components/Portfolio'
import Markets from './components/Markets'
import Approach from './components/Approach'
import Founders from './components/Founders'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TradeDetail from './components/TradeDetail'
import TradeInsightDetail from './components/TradeInsightDetail'
import { getTradeData } from './services/api'
import { Route, Routes, useLocation } from 'react-router-dom'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return undefined
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) target.scrollIntoView({ block: 'start', behavior: 'auto' })
      else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function HomePage({ tradeData, loadError, retry }) {
  if (!tradeData) {
    return (
      <main>
        <section className="data-status section-wrap" aria-live="polite">
          {loadError ? (
            <>
              <h2>{loadError}</h2>
              <button type="button" onClick={retry}>Try again</button>
            </>
          ) : (
            <p>Loading website content…</p>
          )}
        </section>
      </main>
    )
  }

  const { content } = tradeData
  return (
    <main>
      <Hero content={content.hero} />
      <Intro content={content.intro} />
      <TradeGallery insights={tradeData.trade_insights} content={content.trade_gallery} />
      <Portfolio categories={tradeData.categories} content={content.portfolio} />
      <Markets markets={tradeData.markets} content={content.markets} />
      <Approach content={content.approach} />
      <Founders founders={tradeData.founders} content={content.founders_note} />
      <Contact contact={tradeData.contact} content={content.contact} />
    </main>
  )
}

export default function App() {
  const [tradeData, setTradeData] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let active = true
    getTradeData()
      .then((data) => {
        if (active) {
          setTradeData(data)
          setLoadError('')
        }
      })
      .catch((error) => {
        console.error('Unable to load ABL trade data:', error)
        if (active) setLoadError('We could not load our trade information right now. Please check your connection and try again.')
      })
    return () => { active = false }
  }, [retryCount])

  useEffect(() => {
    if (!tradeData) return
    document.title = tradeData.content.site_title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', tradeData.content.meta_description)
  }, [tradeData])

  return (
    <div className="app-shell">
      <ScrollManager />
      {tradeData && <Header content={tradeData.content.navigation} />}
      <Routes>
        <Route path="/" element={<HomePage tradeData={tradeData} loadError={loadError} retry={() => { setLoadError(''); setRetryCount((count) => count + 1) }} />} />
        <Route path="/trade/:categoryId" element={<TradeDetail categories={tradeData?.categories} contact={tradeData?.contact} contactContent={tradeData?.content.contact} content={tradeData?.content.detail} status={tradeData?.content.status} loading={!tradeData && !loadError} loadError={loadError} />} />
        <Route path="/trade-insights/:insightId" element={<TradeInsightDetail insights={tradeData?.trade_insights} content={tradeData?.content.detail} status={tradeData?.content.status} loading={!tradeData && !loadError} loadError={loadError} />} />
        <Route path="*" element={<TradeDetail notFound content={tradeData?.content.detail} status={tradeData?.content.status} />} />
      </Routes>
      {tradeData && <Footer content={tradeData.content.footer} />}
    </div>
  )
}
