import { cardapioBase } from './cardapioBase'

// Carrega automaticamente todas as imagens de src/public/cardapio/ (1.webp ... 85.webp)
const cardapioImages = import.meta.glob('../public/cardapio/*.webp', { eager: true, import: 'default' })

function getCardapioImg(n) {
  return cardapioImages[`../public/cardapio/${n}.webp`] || ''
}

export { categories, normalizeText, cardapioCountLabel } from './cardapioBase'

export const cardapioItems = cardapioBase.map((item) => ({ ...item, img: getCardapioImg(item.id) }))

export function cardapioItemById(id) {
  return cardapioItems.find((item) => item.id === id)
}
