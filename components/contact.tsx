'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { validateContactForm, sanitizeInput, type ContactFormData } from '@/lib/validation'

// Load reCAPTCHA script
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const socialLinks = [
  { platform: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com/in/username', label: 'Connect on LinkedIn' },
  { platform: 'GitHub', icon: <Github className="h-5 w-5" />, url: 'https://github.com/username', label: 'View GitHub profile' },
  { platform: 'Twitter', icon: <Twitter className="h-5 w-5" />, url: 'https://twitter.com/username', label: 'Follow on Twitter' },
]

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // reCAPTCHA setup
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (siteKey) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const validation = validateContactForm(formData)
    if (validation.length > 0) {
      const newErrors: FormErrors = {}; validation.forEach(v => newErrors[v.field as keyof FormErrors] = v.message); setErrors(newErrors)

      // Announce errors to screen readers
      const errorMessages = validation.map(v => v.message).join(" ")
      setSubmitMessage(`Please fix the following errors: ${errorMessages}`)
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Get reCAPTCHA token
      let token = ''
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      
      if (siteKey && window.grecaptcha) {
        try {
          token = await window.grecaptcha.execute(siteKey, { action: 'submit_contact' })
        } catch (e) {
          console.error('reCAPTCHA execution failed:', e)
          // Continue without token in development, but fail in production
          if (process.env.NODE_ENV === 'production') {
            throw new Error('Failed to verify reCAPTCHA')
          }
        }
      }

      // Sanitize input before sending
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      }

      // Send data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sanitizedData,
          recaptchaToken: token
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      // Success
      setSubmitStatus('success')
      setSubmitMessage('Your message has been sent successfully! I will get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 bg-black relative content-visibility-auto overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm font-body text-white/80 mb-6 uppercase tracking-widest">{/* Get In Touch */}</div>
            <h2 id="contact-heading" className="text-5xl md:text-7xl lg:text-[6rem] font-heading italic text-white leading-[0.9] tracking-[-3px] mb-6">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-body font-light">
              Have a project in mind or want to explore opportunities? Let&apos;s discuss how we can work together.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-[2rem] p-8 md:p-12 border border-white/5 h-full flex flex-col"
          >
            <h3 className="font-heading italic text-3xl md:text-4xl text-white mb-8 tracking-tight">Contact Information</h3>
            <p className="text-white/70 font-body font-light mb-12">
              Feel free to reach out through any of these channels. I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-8 flex-grow">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 liquid-glass rounded-[0.75rem] flex items-center justify-center border border-white/10 text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-body text-white/50 uppercase tracking-wider mb-1">Email</h4>
                  <a href="mailto:hello@example.com" className="text-lg text-white hover:text-white/80 transition-colors font-body">
                    hello@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 liquid-glass rounded-[0.75rem] flex items-center justify-center border border-white/10 text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-body text-white/50 uppercase tracking-wider mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-lg text-white hover:text-white/80 transition-colors font-body">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 liquid-glass rounded-[0.75rem] flex items-center justify-center border border-white/10 text-white shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-body text-white/50 uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-lg text-white font-body">San Francisco, CA</p>
                  <p className="text-sm text-white/50 font-light mt-1">Available for remote work worldwide</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="text-sm font-body text-white/50 uppercase tracking-wider mb-6">Connect with me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="liquid-glass rounded-[2rem] p-8 md:p-12 border border-white/5">
              <h3 className="font-heading italic text-3xl md:text-4xl text-white mb-8 tracking-tight">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-body text-white/70 mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-colors font-body',
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    )}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-400 flex items-center gap-1 font-body"><AlertCircle className="h-4 w-4" />{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-body text-white/70 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-colors font-body',
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    )}
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-400 flex items-center gap-1 font-body"><AlertCircle className="h-4 w-4" />{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-body text-white/70 mb-2">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-colors font-body',
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    )}
                    placeholder="What is this regarding?"
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && <p className="mt-2 text-sm text-red-400 flex items-center gap-1 font-body"><AlertCircle className="h-4 w-4" />{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-body text-white/70 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-colors font-body resize-none',
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    )}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-2 text-sm text-red-400 flex items-center gap-1 font-body"><AlertCircle className="h-4 w-4" />{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="liquid-glass-strong w-full rounded-xl py-4 flex items-center justify-center gap-2 text-white font-medium hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>

                <div aria-live="polite" aria-atomic="true">
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'p-4 rounded-xl border mt-4 font-body',
                        submitStatus === 'success'
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {submitStatus === 'success' ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
                        <p>{submitMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
