// Custom directive: adds `data-reveal` + toggles `is-visible` when the
// element enters the viewport. Use as v-reveal or v-reveal="'left' | 'right'"
export const vReveal = {
  mounted(el, binding) {
    el.setAttribute('data-reveal', binding.value && typeof binding.value === 'string' ? binding.value : '')

    const reveal = () => {
      el.classList.add('is-visible')
      el.__reveal_io__?.disconnect()
    }

    // Content already in (or near) the initial viewport reveals on the next
    // frame instead of waiting on the observer — avoids a flash of
    // translated/offset content (and the horizontal scroll it can cause)
    // on first paint.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > -200) {
      requestAnimationFrame(reveal)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal()
        })
      },
      { threshold: 0.18 }
    )

    io.observe(el)
    el.__reveal_io__ = io
  },
  unmounted(el) {
    el.__reveal_io__?.disconnect()
  },
}
