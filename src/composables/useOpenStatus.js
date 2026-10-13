import { ref, onMounted, onBeforeUnmount } from 'vue'
import { schedule, timezone } from '../data/contact'
import { getOpenStatus } from '../utils/hours'

// Status "aberto agora" reativo — recalcula a cada minuto enquanto montado.
export function useOpenStatus() {
  const compute = () => getOpenStatus(schedule, { timeZone: timezone })
  const status = ref(compute())
  let timer

  onMounted(() => {
    timer = setInterval(() => {
      status.value = compute()
    }, 60_000)
  })
  onBeforeUnmount(() => clearInterval(timer))

  return status
}
