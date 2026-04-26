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
  const [recaptchaReady, setRecaptchaReady] = useState(false)

  // Load reCAPTCHA script
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) {
      console.warn('reCAPTCHA site key not configured')
      setRecaptchaReady(true)
      return
    }

    // Check if script is already loaded
    if (window.grecaptcha) {
      setRecaptchaReady(true)
      return
    }

    // Load reCAPTCHA script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      setRecaptchaReady(true)
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup is not needed as reCAPTCHA script should persist
    }
  }, [])

  const validateForm = (): boolean => {
    const validationErrors = validateContactForm(formData)
    const newErrors: FormErrors = {}
    
    validationErrors.forEach(error => {
      newErrors[error.field as keyof FormErrors] = error.message
    })
    
    setErrors(newErrors)
    return validationErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Generate reCAPTCHA token if available
      let recaptchaToken: string | undefined
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      
      if (siteKey && window.grecaptcha && recaptchaReady) {
        try {
          recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' })
        } catch (error) {
          console.warn('Failed to generate reCAPTCHA token:', error)
          // Continue without token if reCAPTCHA fails
        }
      }

      // Sanitize form data before sending
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      }

      // Send to API with reCAPTCHA token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sanitizedData,
          recaptchaToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubmitStatus('error')
        setSubmitMessage(result.message || 'Failed to send message. Please try again.')
        return
      }

      setSubmitStatus('success')
      setSubmitMessage(result.message || 'Your message has been sent successfully!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setErrors({})
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contact" className="section-spacing bg-gradient-to-b from-secondary/10 to-background content-visibility-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid-responsive-2 gap-responsive-lg">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a
                      href="mailto:hello@example.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@example.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Typically responds within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available Mon-Fri, 9AM-6PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p className="text-muted-foreground">San Francisco, California</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-bold mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg',
                        'bg-accent text-accent-foreground hover:bg-accent/80',
                        'transition-all duration-300'
                      )}
                      aria-label={social.label}
                    >
                      {social.icon}
                      <span className="font-medium">{social.platform}</span>
                    </a>
                  ))}
                </div>
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
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors',
                      'bg-background focus:bg-background',
                      errors.name
                        ? 'border-destructive focus:ring-destructive/20'
                        : 'border-input focus:border-primary focus:ring-primary/20'
                    )}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors',
                      'bg-background focus:bg-background',
                      errors.email
                        ? 'border-destructive focus:ring-destructive/20'
                        : 'border-input focus:border-primary focus:ring-primary/20'
                    )}
                    placeholder="your.email@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors',
                      'bg-background focus:bg-background',
                      errors.subject
                        ? 'border-destructive focus:ring-destructive/20'
                        : 'border-input focus:border-primary focus:ring-primary/20'
                    )}
                    placeholder="What is this regarding?"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-2 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors',
                      'bg-background focus:bg-background resize-none',
                      errors.message
                        ? 'border-destructive focus:ring-destructive/20'
                        : 'border-input focus:border-primary focus:ring-primary/20'
                    )}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full px-6 py-3 rounded-lg font-medium transition-all duration-300',
                    'flex items-center justify-center gap-2',
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'shadow-lg hover:shadow-xl'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'p-4 rounded-lg border',
                      submitStatus === 'success'
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : 'bg-destructive/10 text-destructive border-destructive/20'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {submitStatus === 'success' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <p>{submitMessage}</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}