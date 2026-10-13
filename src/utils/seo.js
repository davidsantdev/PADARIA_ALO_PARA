import { site } from '../data/site'
import { contact, schedule, whatsappDigits } from '../data/contact'

const SCHEMA_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Procura a tag pelo seletor; se não existir no index.html, cria no <head>.
function ensure(selector, tag, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(tag)
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  return el
}

function setMeta(selector, attrs, content) {
  ensure(selector, 'meta', attrs).setAttribute('content', content)
}

// Atualiza título, descrição, canonical e Open Graph a cada troca de rota.
// O index.html já traz a versão estática da home (para quem não roda JS).
export function applyRouteMeta(to) {
  const title = to.meta.title || site.name
  const description = to.meta.description || site.defaultDescription
  const url = `${site.url}${to.path}`

  document.title = title
  setMeta('meta[name="description"]', { name: 'description' }, description)

  // página noindex (404): sem canonical apontando para uma URL que não existe
  if (to.meta.noindex) {
    document.head.querySelector('link[rel="canonical"]')?.remove()
  } else {
    ensure('link[rel="canonical"]', 'link', { rel: 'canonical' }).setAttribute('href', url)
  }

  setMeta('meta[property="og:url"]', { property: 'og:url' }, to.meta.noindex ? `${site.url}/` : url)
  setMeta('meta[property="og:title"]', { property: 'og:title' }, title)
  setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)

  // páginas que não devem aparecer no Google (ex: 404 — o servidor responde 200 por causa do SPA)
  const robots = document.head.querySelector('meta[name="robots"]')
  if (to.meta.noindex) {
    ensure('meta[name="robots"]', 'meta', { name: 'robots' }).setAttribute('content', 'noindex, follow')
  } else if (robots) {
    robots.remove()
  }
}

// Gera o JSON-LD a partir de src/data/contact.js: só inclui o que está preenchido,
// então nada de telefone/endereço placeholder indo para o Google.
export function applyStructuredData() {
  const el = document.querySelector('script[type="application/ld+json"]')
  if (!el) return

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: site.name,
    url: `${site.url}/`,
    image: `${site.url}${site.ogImage}`,
    servesCuisine: 'Panificação',
    priceRange: '$$',
    openingHoursSpecification: schedule.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days.map((d) => SCHEMA_DAYS[d]),
      opens: s.open,
      closes: s.close,
    })),
  }

  const phone = whatsappDigits()
  if (phone) data.telephone = `+${phone}`
  if (contact.email) data.email = contact.email
  if (contact.address) {
    data.address = { '@type': 'PostalAddress', streetAddress: contact.address, addressCountry: 'BR' }
  }
  if (contact.mapsUrl) data.hasMap = contact.mapsUrl
  if (contact.instagram) data.sameAs = [contact.instagram]

  el.textContent = JSON.stringify(data)
}
