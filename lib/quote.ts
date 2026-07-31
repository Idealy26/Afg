export const QUOTE_EVENT = 'afg:request-quote'

export function requestQuote(productName?: string) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent<string | undefined>(QUOTE_EVENT, { detail: productName }),
  )
  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
