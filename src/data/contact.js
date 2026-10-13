// TODO: substitua pelos dados reais da padaria antes de publicar o site.
// `whatsapp` deve conter apenas dígitos, no formato DDI+DDD+número (ex: 5583999999999).
// `whatsappDisplay` é opcional: se ficar vazio, o número é formatado a partir de `whatsapp`.
// `address`, `mapsUrl` e `instagram`: cole o texto/link completo
// (ex: https://maps.app.goo.gl/..., https://instagram.com/seuperfil).
// Qualquer campo vazio fica oculto no site — nada de texto placeholder para o cliente.
export const contact = {
  whatsapp: '',
  whatsappDisplay: '',
  address: '',
  mapsUrl: '',
  instagram: '',
  email: 'supermercadoalopara@gmail.com',
}

// Fuso usado para calcular "aberto agora" (independe do fuso do visitante).
export const timezone = 'America/Sao_Paulo'

// Horário de funcionamento. `days` usa a numeração do JS (0 = domingo ... 6 = sábado).
export const schedule = [
  { label: 'Segunda a Sábado', days: [1, 2, 3, 4, 5, 6], open: '06:00', close: '20:00' },
  { label: 'Domingo', days: [0], open: '06:00', close: '12:00' },
]

// Formato de exibição usado no rodapé e na página de contato.
export const hours = schedule.map((s) => ({ day: s.label, time: `${s.open} – ${s.close}` }))

export function whatsappDigits() {
  return contact.whatsapp.replace(/\D/g, '')
}

export function hasWhatsapp() {
  return whatsappDigits().length > 0
}

export function whatsappLink(message = 'Olá! Vim pelo site da Padaria Alô Pará 🥐') {
  const digits = whatsappDigits()
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

// Número para exibir: usa `whatsappDisplay` se existir, senão formata `whatsapp`.
export function phoneDisplay() {
  if (contact.whatsappDisplay) return contact.whatsappDisplay
  const digits = whatsappDigits()
  const local = digits.startsWith('55') ? digits.slice(2) : digits
  if (local.length === 11) return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`
  if (local.length === 10) return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`
  return digits ? `+${digits}` : ''
}
