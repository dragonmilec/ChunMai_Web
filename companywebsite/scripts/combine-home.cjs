const fs = require('node:fs')
const path = 'src/views/Home.vue'
let home = fs.readFileSync(path, 'utf8')
home = home.replace('Users, Plus }', 'Users, Plus, MousePointer2 }')
home = home.replace('features, teamImage', 'features')
home = home.replace("import ContactCTA from '../components/ContactCTA.vue'", "import ContactCTA from '../components/ContactCTA.vue'\nimport InteractiveSphere from '../components/InteractiveSphere.vue'")
home = home.replace('    <section class="home-hero">', '    <div class="home-sphere-flow">\n    <section class="home-hero sphere-hero">')
home = home.replace('class="shell hero-layout"', 'class="shell hero-layout sphere-hero__layout"')
const start = home.indexOf('        <motion.div class="hero-visual"')
const end = home.indexOf('</motion.div>', start) + '</motion.div>'.length
if (start < 0 || end < start) throw new Error('Hero visual not found')
home = home.slice(0, start) + `        <div class="sphere-hero__visual">
          <div class="sphere-stage-label"><span class="mono">INTERACTIVE EXPLORATION</span><Plus :size="16" :stroke-width="1" /></div>
          <InteractiveSphere />
          <span class="sphere-coordinate mono">DRAGON MILE / PARTICLE FIELD</span>
          <div class="sphere-interaction-hint"><MousePointer2 :size="14" :stroke-width="1.5" /><span>{{ reduced === 'reduce' ? '粒子球體' : '移動游標，或輕觸探索球體' }}</span></div>
        </div>` + home.slice(end)
const servicesStart = home.indexOf('    <section id="services-preview"')
const servicesEnd = home.indexOf('</section>', servicesStart) + '</section>'.length
const serviceSection = home.slice(servicesStart, servicesEnd).replace('section-number">01', 'section-number">02')
home = home.slice(0, servicesStart) + home.slice(servicesEnd)
home = home.replace('<section class="section featured-section">', '<section class="section featured-section home-content-two" data-sphere-content="2">')
home = home.replace('section-number">02</span>SELECTED', 'section-number">01</span>SELECTED')
home = home.replace('    <section class="section about-preview">', '    </div>\n\n' + serviceSection + '\n\n    <section class="section about-preview">')
fs.writeFileSync(path, home)
