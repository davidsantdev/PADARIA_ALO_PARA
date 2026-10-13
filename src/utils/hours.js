const DAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Dia da semana e minutos desde 00:00 no fuso informado (e não no do visitante).
function zonedNow(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const pick = (type) => parts.find((p) => p.type === type)?.value
  return {
    day: WEEKDAY_INDEX[pick('weekday')],
    minutes: Number(pick('hour')) * 60 + Number(pick('minute')),
  }
}

// Retorna { open: boolean, text: string } — ex: "Aberto agora · fecha às 20:00".
export function getOpenStatus(schedule, { now = new Date(), timeZone = 'America/Sao_Paulo' } = {}) {
  const { day, minutes } = zonedNow(now, timeZone)

  const today = schedule.find((s) => s.days.includes(day))
  if (today) {
    const open = toMinutes(today.open)
    const close = toMinutes(today.close)
    if (minutes >= open && minutes < close) {
      return { open: true, text: `Aberto agora · fecha às ${today.close}` }
    }
    if (minutes < open) {
      return { open: false, text: `Fechado · abre hoje às ${today.open}` }
    }
  }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const entry = schedule.find((s) => s.days.includes(d))
    if (entry) {
      const when = i === 1 ? 'amanhã' : DAY_NAMES[d]
      return { open: false, text: `Fechado · abre ${when} às ${entry.open}` }
    }
  }

  return { open: false, text: 'Fechado' }
}
