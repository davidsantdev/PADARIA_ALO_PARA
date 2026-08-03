import crepiocaImg from '../public/crepioca.webp'
import salgados from '../public/salgados.webp'
import Psalgado from '../public/Psalgado.webp'
import Pdoce from '../public/Pdoce.webp'

export const products = [
  {
    name: 'Misto c/ Pão francês',
    desc: 'Queijo, presunto, ovos',
    bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)',
    icon: Psalgado,
  },
  {
    name: 'Misto c/ pão de forma',
    desc: 'Queijo, presunto, ovos',
    bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)',
    icon: Pdoce,
  },
  {
    name: 'Salgados',
    desc: 'Compras acima de 10UN.',
    bg: 'linear-gradient(160deg,#F3C349,#E9A93B)',
    icon: salgados,
  },
  {
    name: 'Crepioca de frango e catupiry / Crepioca de presunto e queijo',
    desc: 'Uma delicia para seu dia e ótimo para sua dieta',
    bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)',
    icon: crepiocaImg,
  },
]
