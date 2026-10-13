// Lista do cardápio SEM imagens — leve o bastante para ser usada em qualquer página
// (ex: contador "Mais de 80 opções" na Home). As fotos são ligadas em cardapio.js.

// Categorias exibidas como filtro na página de Cardápio (na ordem dos botões).
// `tint` é a cor do chip (classes completas, para o Tailwind enxergar).
export const categories = [
  { id: 'paes', label: 'Pães', tint: 'bg-sun' },
  { id: 'salgados', label: 'Salgados e lanches', tint: 'bg-blush' },
  { id: 'bolos', label: 'Bolos', tint: 'bg-sky' },
  { id: 'tortas', label: 'Tortas', tint: 'bg-lilac' },
  { id: 'doces', label: 'Doces e sobremesas', tint: 'bg-peach' },
  { id: 'biscoitos', label: 'Biscoitos', tint: 'bg-sand' },
  { id: 'bebidas', label: 'Bebidas', tint: 'bg-mint' },
  { id: 'outros', label: 'Outros', tint: 'bg-white' },
]

const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]))

// nome | código | categoria — na mesma ordem numérica das imagens (1.webp a 85.webp).
// Para mudar um item de categoria, troque o último campo (ids acima).
const cardapioRaw = [
  'Bisc. Cebola|545|biscoitos',
  'Bisc. Cookies|28|biscoitos',
  'Bisc. Cupcakes|63035|biscoitos',
  'Bisc. da Vovó|526|biscoitos',
  'Bisc. Cocada|554|biscoitos',
  'Bisc. Maizena|553|biscoitos',
  'Bisc. Nhoque|553|biscoitos',
  'Bisc. Olho de Boi|520|biscoitos',
  'Bisc. Polvinho Trad.|82441|biscoitos',
  'Bisc. Quebrador|123|biscoitos',
  'Bolo de Milho|650|bolos',
  'Bolo de Tapioca c/ Coco|638|bolos',
  'Bolo Fatia|7058|bolos',
  'Bolo Gelado|651|bolos',
  'Bolo Gelado Red Velvet|7720|bolos',
  'Bolo no Pote G|55776|bolos',
  'Bolo no Pote P|102347|bolos',
  'Bolo Pudim|76|bolos',
  'Bolo Seco de Abacaxi|1517|bolos',
  'Bolo Seco de Coco|578|bolos',
  'Bolo Seco de Laranja|569|bolos',
  'Bolo Seco de Macaxeira|1530|bolos',
  'Bolo Seco de Milho|579|bolos',
  'Bolo Seco Formigueiro|596|bolos',
  'Bolo Seco Mesclado|600|bolos',
  'Buffet|496|outros',
  'Café c/ Leite|5426|bebidas',
  'Café Simples|40102|bebidas',
  'Doce Sírio Mantecal|56|doces',
  'Farinha de Rosca|1230|outros',
  'Bisc. Donuts|42|biscoitos',
  'Pudim Fatia|59336|doces',
  'Pão Sovado|5926|paes',
  'Suco Natural Abacaxi e Morango|25521|bebidas',
  'Suco Natural Laranja ou Maracujá|60686|bebidas',
  'Copo da Felicidade|65993|doces',
  'Mono Poção|56151|doces',
  'Bala Banana|59090|doces',
  'Combo|21010 + 64729|outros',
  'Bisc. Cueca Virada|520|biscoitos',
  'Cápsulas 3 Corações|32649|bebidas',
  'Sonho|56151|doces',
  'Bix Mini Bolo|28670|bolos',
  'Centro Salgado|51436|salgados',
  'Pavê|102387|doces',
  'Fatia Húngara|704|doces',
  'Leite Líquido|12229|bebidas',
  'Massas de Queijo|498|salgados',
  'Massas Doces Especiais|4039|doces',
  'Mousse c/ Biscoito|96164|doces',
  'Mousse Diversos|2499|doces',
  'Pão de Batata|879|paes',
  'Pão de Milho|701|paes',
  'Pão de Queijo|508|paes',
  'Pão Francês Gratinado|871|paes',
  'Pão Francês Trad.|500|paes',
  'Pão de Hambúrguer|506|paes',
  'Pão Hot-Dog|715|paes',
  'Pão Massa Fina|504|paes',
  'Pizza Tradicional|9144|salgados',
  'Pudim Inteiro|721|doces',
  'Pudim P|55778|doces',
  'Quindim|722|doces',
  'Rocambole Doce|723|doces',
  'Rosca Doce|519|paes',
  'Salada de Frutas|3894|doces',
  'Sanduíche Natural|743|salgados',
  'Suco de Laranja|60686|bebidas',
  'Suspiro Caseiro|753|doces',
  'Taça da Felicidade|72221|doces',
  'Torrada Trad.|755|paes',
  'Torta Conf. Abacaxi|119|tortas',
  'Torta Conf. Bombom|605|tortas',
  'Torta Conf. Chocolate Amargo/Branco|624|tortas',
  'Torta Conf. Doce de Leite|633|tortas',
  'Torta Conf. Lacta Cremosa|632|tortas',
  'Torta Conf. Marta Rocha|619|tortas',
  'Torta Conf. Morango|612|tortas',
  'Torta Conf. Ninho|603|tortas',
  'Torta Conf. Nutella|625|tortas',
  'Torta Conf. Prestígio|78|tortas',
  'Torta Conf. Sonho de Valsa|611|tortas',
  'Amanhecido|275|outros',
  'Bisc. Brownie|611|biscoitos',
  'Bisc. Casadinho|523|biscoitos',
]

// minúsculas e sem acentos — "pao" encontra "Pão", "cafe" encontra "Café"
export function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

// itens sem foto; `id` = posição na lista = número do arquivo em src/public/cardapio/
export const cardapioBase = cardapioRaw.map((entry, i) => {
  const [name, code, category] = entry.split('|')
  return {
    id: i + 1,
    name,
    code,
    category,
    // texto pesquisável: nome + código + nome da categoria
    haystack: normalizeText(`${name} ${code} ${categoryLabel[category] || ''}`),
  }
})

// "Mais de 80" — acompanha o tamanho real do cardápio, sem número fixo no texto.
export const cardapioCountLabel = `Mais de ${Math.floor((cardapioBase.length - 1) / 10) * 10}`
