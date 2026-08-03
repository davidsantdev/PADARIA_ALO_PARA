import biscoito from '../public/bisc.webp'
import boloImg2 from '../public/bolo2.webp'
import biscoito2 from '../public/retang.webp'
import { cardapioItemById } from './cardapio'

// fotos de "making of" em destaque na página de Galeria
export const featured = [
  { title: 'Cesta de Croissants', bg: 'linear-gradient(160deg,#EFAF56,#E08A3B)', icon: biscoito },
  { title: 'Moldando a Massa', bg: 'linear-gradient(160deg,#E7A15E,#CD8340)', icon: boloImg2 },
  { title: 'Farinha, Manteiga e Ovos', bg: 'linear-gradient(160deg,#E9CFA0,#D9B27A)', icon: biscoito2 },
]

// mosaico com uma seleção variada do cardápio (pães, bolos, tortas e doces)
const curatedIds = [13, 15, 16, 54, 60, 63, 65, 66, 72, 80, 81, 84]
export const mosaic = curatedIds.map((id) => cardapioItemById(id)).filter(Boolean)
