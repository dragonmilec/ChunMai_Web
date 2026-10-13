<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Mail, Phone, MapPin, ArrowUpRight, Copy, Check, Send } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { contact, services } from '../data/site'
import { useReveal } from '../composables/useReveal'
import PageIntro from '../components/PageIntro.vue'
const root = ref<HTMLElement | null>(null)
useReveal(root)
const route = useRoute()
const form = reactive({ name: '', email: '', company: '', service: String(route.query.service || ''), budget: '', message: '' })
const selectedService = String(route.query.service || '')
const options = computed(() => [...new Set([...services.map(s => s.title), ...(selectedService ? [selectedService] : []), '其他'])])
const budgetRanges = ['10萬以下', '10–30萬', '30–50萬', '50–100萬', '100萬以上', '待討論']
const { copy, copied } = useClipboard()
const status = ref('')
const send = () => {
  const body = `姓名：${form.name}\n電子郵件：${form.email}\n公司名稱：${form.company || '未填寫'}\n服務項目：${form.service}\n預算範圍：${form.budget || '待討論'}\n\n專案需求：\n${form.message}`
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`專案諮詢｜${form.service}｜${form.name}`)}&body=${encodeURIComponent(body)}`
  status.value = '已請求開啟您的郵件軟體。請在郵件軟體中確認並寄出；若未開啟，可複製下方電子郵件直接聯絡。'
}
const faq = [
  { q: '專案開發週期多長？', a: '依專案複雜度而定，一般網站 2–4 週，企業系統 2–6 個月。' },
  { q: '如何收費？', a: '我們提供透明的報價，依功能需求和開發時程計算。' },
  { q: '提供後續維護嗎？', a: '是的，我們提供完整的維護和技術支援服務。' },
]
</script>
<template><div ref="root">
  <PageIntro label="GET IN TOUCH" title="讓我們聊聊您的想法" description="有任何問題或專案需求，歡迎與我們聯絡，我們將竭誠為您服務。" number="04" />
  <section class="section"><div class="shell contact-layout"><aside class="contact-information" data-reveal><p class="eyebrow">CONTACT / 聯絡資訊</p><h2>每個專案，<br />從一次對話開始<span class="title-dot">.</span></h2><div class="contact-item"><Mail :size="20" /><div><span>電子郵件</span><a :href="`mailto:${contact.email}`">{{ contact.email }}</a><small>我們會盡快回覆</small></div><button @click="copy(contact.email)" :aria-label="copied ? '已複製電子郵件' : '複製電子郵件'"><Check v-if="copied" :size="17" /><Copy v-else :size="17" /></button></div><div class="contact-item"><Phone :size="20" /><div><span>電話</span><a :href="contact.phoneHref">{{ contact.phone }}</a><small>{{ contact.hours }}<br />週末及國定假日休息</small></div></div><div class="contact-item"><MapPin :size="20" /><div><span>地址</span><a :href="contact.mapUrl" target="_blank" rel="noopener noreferrer">{{ contact.address }}<ArrowUpRight :size="15" /></a><small>歡迎預約拜訪</small></div></div><div class="contact-map"><iframe title="醇邁辦公室位置：高雄市鼓山區明華路251號" :src="`https://maps.google.com/maps?q=${encodeURIComponent('高雄市鼓山區明華路251號')}&z=16&output=embed`" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a :href="contact.mapUrl" target="_blank" rel="noopener noreferrer">在 Google 地圖中查看<ArrowUpRight :size="16" /></a></div></aside>
    <div class="contact-form-wrap" data-reveal><p class="eyebrow">TELL US ABOUT YOUR PROJECT</p><h2>發送訊息給我們</h2><p class="form-note">填寫您的需求，我們期待進一步了解您的專案。</p><form @submit.prevent="send"><div class="form-grid"><label>姓名 <span>*</span><input v-model="form.name" name="name" autocomplete="name" placeholder="您的姓名" required maxlength="100" /></label><label>電子郵件 <span>*</span><input v-model="form.email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required maxlength="254" /></label><label>公司名稱<input v-model="form.company" name="company" autocomplete="organization" placeholder="公司名稱（選填）" maxlength="200" /></label><label>服務項目 <span>*</span><select v-model="form.service" name="service" required><option disabled value="">請選擇服務項目</option><option v-for="option in options" :key="option">{{ option }}</option></select></label></div><label>預算範圍<select v-model="form.budget" name="budget"><option value="">請選擇預算範圍（選填）</option><option v-for="budget in budgetRanges" :key="budget">{{ budget }}</option></select></label><label>專案描述 <span>*</span><textarea v-model="form.message" name="message" rows="6" placeholder="請分享您的專案目標、功能需求或想法…" required maxlength="5000"></textarea></label><p class="mail-notice"><Mail :size="15" />表單會開啟您的郵件軟體，由您確認後寄出。</p><button type="submit" class="button button-primary submit-button">撰寫諮詢郵件<Send :size="17" /></button><p v-if="status" role="status" class="form-status">{{ status }}</p></form></div></div></section>
  <section class="section tinted"><div class="shell faq-layout"><div><p class="eyebrow">GOOD TO KNOW</p><h2>常見問題<span class="title-dot">.</span></h2><p>關於合作，您可能想先了解的事。</p></div><div><details v-for="item in faq" :key="item.q"><summary>{{ item.q }}<span>+</span></summary><p>{{ item.a }}</p></details></div></div></section>
</div></template>
