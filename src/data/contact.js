// TODO: substitua pelos dados reais da padaria antes de publicar o site.
// `whatsapp` deve conter apenas dígitos, no formato DDI+DDD+número (ex: 5583999999999).
// `mapsUrl` e `instagram`: cole o link completo (ex: https://maps.app.goo.gl/...,
// https://instagram.com/seuperfil) — ficam ocultos no site enquanto vazios.
export const contact = {
  whatsapp: '',
  whatsappDisplay: '(00) 00000-0000',
  address: 'Endereço a confirmar',
  mapsUrl: '',
  instagram: '',
  email: 'contato@aloparapadaria.com.br',
  hours: [
    { day: 'Segunda a Sábado', time: '06:00 – 20:00' },
    { day: 'Domingo', time: '06:00 – 12:00' },
  ],
}

export function whatsappLink(message = 'Olá! Vim pelo site da Padaria Alô Pará 🥐') {
  const digits = contact.whatsapp.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
