<template>
  <section id="contact" class="contact" ref="elementRef">
  <div class="section-label" :class="{ revealed: revealed }">// 05 — Contact</div>
  <h2 class="section-title" :class="{ revealed: revealed }">Let's Connect</h2>

  <div class="contact-grid">
    <div class="contact-left slide-left" :class="{ revealed: revealed }">
      <p class="contact-desc">
        Open to freelance projects, full-time roles, and interesting
        collaborations. Reach out anytime and I'll get back to you.
      </p>
      <div class="contact-links">
        <a
          v-for="(item, index) in contactLinks"
          :key="index"
          :href="item.href"
          target="_blank"
          class="contact-link"
        >
          <div class="contact-dot"></div>
          <div>
            <div class="link-label">{{ item.label }}</div>
            <div class="link-value">{{ item.value }}</div>
          </div>
          <span class="link-arrow">→</span>
        </a>
      </div>
    </div>

    <div class="contact-right slide-right" :class="{ revealed: revealed }">
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Your name"
            required
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea
            v-model="form.message"
            rows="4"
            placeholder="Tell me about your project..."
            required
          ></textarea>
        </div>
        <button type="submit" class="btn-submit" :disabled="submitted">
          {{ submitted ? 'Message Sent ✓' : 'Send Message' }}
        </button>
      </form>
    </div>
  </div>
</section>

  <footer class="footer">
    <div class="footer-text">© 2026 — Designed & built with Vue.js</div>
    <div class="footer-dot"></div>
  </footer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

interface ContactLink {
  label: string
  value: string
  href: string
}

const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'johnkennethdgreside@gmail.com',
    href: 'mailto:johnkennethdgreside@gmail.com'
  },
  {
    label: 'GitHub',
    value: 'Saintzycode',
    href: 'https://github.com/Saintzycode'
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourname',
    href: 'https://linkedin.com/in/yourname'
  }
]

interface Form {
  name: string
  email: string
  message: string
}

const form = reactive<Form>({
  name: '',
  email: '',
  message: ''
})

const { revealed, elementRef } = useScrollReveal()

const submitted = ref<boolean>(false)

const handleSubmit = (): void => {
  console.log('Form submitted:', form)
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    form.name = ''
    form.email = ''
    form.message = ''
  }, 3000)
}
</script>

<style scoped>
.contact {
  background: transparent;
  padding: clamp(48px, 8vw, 64px) clamp(16px, 5vw, 40px);
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #00f5c4;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section-title {
  font-size: clamp(24px, 5vw, 28px);
  font-weight: 800;
  margin-bottom: 32px;
  letter-spacing: 0;
  color: #e8e8f0;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 48px);
  align-items: start;
}

.contact-desc {
  font-size: 14px;
  color: #666680;
  line-height: 1.8;
  margin-bottom: 32px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 0.5px solid rgba(255,255,255,0.07);
  background: #14141e;
  text-decoration: none;
  transition: border-color 0.2s;
  min-width: 0;
}

.contact-link:hover {
  border-color: #00f5c4;
}

.contact-link:hover .link-arrow {
  color: #00f5c4;
}

.contact-dot {
  width: 8px;
  height: 8px;
  background: #00f5c4;
  border-radius: 50%;
  flex-shrink: 0;
}

.link-label {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  color: #666680;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.link-value {
  font-size: 13px;
  color: #e8e8f0;
  overflow-wrap: anywhere;
}

.link-arrow {
  margin-left: auto;
  color: #666680;
  transition: color 0.2s;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #666680;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.form-group input,
.form-group textarea {
  background: #14141e;
  border: 0.5px solid rgba(255,255,255,0.07);
  color: #e8e8f0;
  padding: 12px 16px;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  resize: none;
  width: 100%;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #00f5c4;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #666680;
}

.btn-submit {
  padding: 14px 28px;
  background: #00f5c4;
  color: #000;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: opacity 0.2s;
  align-self: flex-start;
}

.btn-submit:hover {
  opacity: 0.85;
}

.btn-submit:disabled {
  background: #1a1a24;
  color: #00f5c4;
  border: 0.5px solid #00f5c4;
  cursor: default;
  opacity: 1;
}

.footer {
  padding: 20px clamp(16px, 5vw, 40px);
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  background: #111118;
}

.footer-text {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #666680;
  letter-spacing: 2px;
}

.footer-dot {
  width: 6px;
  height: 6px;
  background: #00f5c4;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.section-label,
.section-title {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-label.revealed,
.section-title.revealed {
  opacity: 1;
  transform: translateY(0);
}

.slide-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.slide-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: 0.15s;
}

.slide-left.revealed,
.slide-right.revealed {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 820px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .contact-link {
    align-items: flex-start;
  }

  .link-arrow {
    display: none;
  }

  .btn-submit {
    width: 100%;
  }

  .footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-text {
    line-height: 1.7;
  }
}
</style>
