const fs = require('node:fs')
const vm = require('node:vm')
const parser = require('@babel/parser')
const live = fs.readFileSync('.reference/live-site.js', 'utf8')
const ast = parser.parse(live, { sourceType: 'module' })
const objects = []
function walk(node, fn) {
  if (!node || typeof node !== 'object') return
  fn(node)
  for (const [key, value] of Object.entries(node)) {
    if (key === 'loc' || key === 'extra') continue
    if (Array.isArray(value)) value.forEach(n => walk(n, fn))
    else if (value && typeof value === 'object') walk(value, fn)
  }
}
walk(ast, node => {
  if (node.type !== 'ObjectExpression') return
  const keys = node.properties.map(p => p.key?.name || p.key?.value)
  if (keys.includes('title') && (keys.includes('coreFeatures') || keys.includes('features') && keys.includes('price'))) {
    const clean = node.properties.filter(p => p.key?.name !== 'icon')
    const source = '{' + clean.map(p => live.slice(p.start, p.end)).join(',') + '}'
    try { objects.push(vm.runInNewContext('(' + source + ')', {}, { timeout: 1000 })) } catch {}
  }
})
const products = objects.filter(p => p.category && p.image)
const details = objects.filter(p => p.category && p.images)
const services = objects.filter(p => p.price)
if (products.length !== 4 || details.length !== 4 || services.length !== 7) throw new Error('Unexpected source content counts')
// Preserve the published product explanations. Only extract text verified in the live bundle.
const original = fs.readFileSync('src/pages/ProjectDetail.tsx', 'utf8')
const originalAst = parser.parse(original, { sourceType: 'module', plugins: ['typescript', 'jsx'] })
const detailNames = ['OralHealthAppDetails', 'LanguageTherapyDetails', 'TongueTrainerGameDetails', 'IoTJetInjectDetails']
const sections = {}
const plain = n => n.type === 'JSXText' ? n.value.replace(/\s+/g, ' ').trim() : n.type === 'JSXElement' ? n.children.map(plain).filter(Boolean).join('') : n.type === 'JSXExpressionContainer' && n.expression.type === 'StringLiteral' ? n.expression.value : ''
const compactLive = live.replace(/\s+/g, '')
const verified = text => live.includes(text) || compactLive.includes(text.replace(/\s+/g, ''))
walk(originalAst, node => {
  if (node.type !== 'VariableDeclarator' || !detailNames.includes(node.id?.name)) return
  const blocks = []
  const captured = []
  const images = new Set()
  walk(node.init, el => {
    const image = el.type === 'StringLiteral' ? el.value : el.type === 'TemplateElement' ? el.value.raw : ''
    if (/^images\/[\w.-]+\.(png|jpg)$/.test(image) && live.includes(image) && !images.has(image)) {
      images.add(image)
      const previous = blocks[blocks.length - 1]
      if (previous?.tag === 'gallery') { previous.images.push(image); previous.text += ' ' + image }
      else blocks.push({ tag: 'gallery', text: image, images: [image] })
    }
    if (el.type !== 'JSXElement') return
    const tag = el.openingElement.name.name
    if (!['h2', 'h3', 'h4', 'p', 'li', 'span'].includes(tag)) return
    if (captured.some(range => el.start >= range.start && el.end <= range.end)) return
    if (tag === 'span' && !el.openingElement.attributes.some(a => a.name?.name === 'className' && /text-gray/.test(a.value?.value))) return
    const parts = el.children.map(plain).filter(Boolean)
    const text = parts.join(' ').trim()
    const leaves = []
    walk(el, n => { if (n.type === 'JSXText' && n.value.trim()) leaves.push(n.value.replace(/\s+/g, ' ').trim()) })
    if (text && leaves.every(verified)) { blocks.push({ tag: tag === 'span' ? 'p' : tag, text }); captured.push({ start: el.start, end: el.end }) }
  })
  sections[node.id.name] = blocks
})
const merged = products.map(p => ({ ...p, ...details.find(d => d.id === p.id), description: p.description, sections: sections[detailNames[p.id - 1]] || [] }))
fs.mkdirSync('src/data', { recursive: true })
fs.writeFileSync('src/data/content.json', JSON.stringify({ source: 'https://dragonmile.dev/', verified: '2026-10-12', services, products: merged }, null, 2))
console.log(JSON.stringify({ services: services.length, products: merged.map(p => ({ id: p.id, sections: p.sections.length })) }))
