// Some `icon` fields are real image imports (paths/URLs), others are inline
// SVG markup strings. This tells them apart so the template knows whether
// to render an <img> or v-html the SVG.
export function isSvgMarkup(value) {
  return typeof value === 'string' && value.trim().startsWith('<svg')
}
 