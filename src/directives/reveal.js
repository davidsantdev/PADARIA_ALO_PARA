// Custom directive: adds `data-reveal` + toggles `is-visible` when the
// element enters the viewport. Use as v-reveal or v-reveal="'left' | 'right'"
export const vReveal = {
  mounted(el, binding) {
    el.setAttribute('data-reveal', binding.value && typeof binding.value === 'string' ? binding.value : '')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    io.observe(el)
    el.__reveal_io__ = io
  },
  unmounted(el) {
    if (el.__reveal_io__) el.__reveal_io__.disconnect()
  },
}
