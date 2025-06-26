import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

// --- Data (Can be moved to a separate file later) ---
const contactInfo = [
  { icon: Mail, title: "Email Us", detail: "office@dilsedaan.org", actionText: "Send an Email", href: "mailto:office@dilsedaan.org" },
  { icon: Phone, title: "Call Us", detail: "+91 80691 69691", actionText: "Call Now", href: "tel:+918069169691" },
];

const faqs = [
    { q: "How can I track my donation?", a: "Every donation made through our platform is given a unique transaction ID on the blockchain. You will receive a link via email to track its journey in real-time." },
    // ** UPDATED: Changed Foundation Name **
    { q: "Are my donations tax-deductible?", a: "Yes, DilSeDaan is a registered non-profit. All donations are eligible for tax benefits under Section 80G of the Income Tax Act." },
    { q: "Can I volunteer for a specific campaign?", a: "Absolutely! Please mention the campaign you're interested in in your message, and our team will get in touch with you." },
];

// --- MAIN PAGE COMPONENT ---
export function ContactPage() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* SECTION 1: HERO */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 paper-texture"></div>
        {/* Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[20vw] font-bold text-warm-cream opacity-80 select-none">Contact Us</h1>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-handwritten font-bold mb-4 text-warm-charcoal">
                    <span className="inline-block transform -rotate-2 text-warm-orange">Need Assistance?</span>
                    <span className="inline-block transform rotate-1"> Reach Out!</span>
                </h1>
                <p className="text-xl md:text-2xl text-warm-charcoal-light mb-8 leading-relaxed">
                    We're here to help. Whether you have a question, a suggestion, or want to share your story, our team is ready to listen.
                </p>
            </motion.div>
        </div>
      </section>

      {/* SECTION 2: CONTACT DETAILS & FORM */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Side: Contact Info & Map */}
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
                    <div className="warm-card p-6">
                        <h2 className="text-3xl font-handwritten font-bold text-warm-charcoal mb-6 transform -rotate-1">Our Contacts</h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="h-8 w-8 text-warm-orange flex-shrink-0 mt-1"/>
                                <div>
                                    <h3 className="font-bold text-lg text-warm-charcoal">Our Office</h3>
                                    <p className="text-warm-charcoal-light">No.6, Dhanammal street, Spurtank road, chetpet, Chennai 600-031</p>
                                </div>
                            </div>
                            {contactInfo.map(info => (
                                <div key={info.title} className="flex items-start space-x-4">
                                    <info.icon className="h-8 w-8 text-warm-orange flex-shrink-0 mt-1"/>
                                    <div>
                                        <h3 className="font-bold text-lg text-warm-charcoal">{info.title}</h3>
                                        <a href={info.href} className="text-warm-blue hover:underline">{info.detail}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="warm-card p-2 overflow-hidden">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.438992641571!2d80.24075867484433!3d13.071199087251762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526671578332d1%3A0xb45404d57c744cf2!2sThaagam%20Foundation!5e0!3m2!1sen!2sin!4v1716029311822!5m2!1sen!2sin"
                            width="100%" 
                            height="350" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-xl"
                        ></iframe>
                    </div>
                </motion.div>

                {/* Right Side: Contact Form */}
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="warm-card p-6 sticky top-8">
                     <h2 className="text-3xl font-handwritten font-bold text-warm-charcoal mb-6 transform rotate-1">Quick Contact Form</h2>
                     <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-warm-charcoal-light mb-1">Name*</label><input type="text" placeholder="Your Name" className="w-full p-3 border-2 border-black/10 rounded-lg focus:border-warm-orange outline-none transition-colors bg-white/50"/></div>
                            <div><label className="block text-sm font-medium text-warm-charcoal-light mb-1">Email*</label><input type="email" placeholder="Your Email" className="w-full p-3 border-2 border-black/10 rounded-lg focus:border-warm-orange outline-none transition-colors bg-white/50"/></div>
                            <div><label className="block text-sm font-medium text-warm-charcoal-light mb-1">Phone*</label><input type="tel" placeholder="Your Phone" className="w-full p-3 border-2 border-black/10 rounded-lg focus:border-warm-orange outline-none transition-colors bg-white/50"/></div>
                            <div><label className="block text-sm font-medium text-warm-charcoal-light mb-1">Address*</label><input type="text" placeholder="Your Address" className="w-full p-3 border-2 border-black/10 rounded-lg focus:border-warm-orange outline-none transition-colors bg-white/50"/></div>
                        </div>
                        <div><label className="block text-sm font-medium text-warm-charcoal-light mb-1">Case Description*</label><textarea rows={5} placeholder="Your Message" className="w-full p-3 border-2 border-black/10 rounded-lg focus:border-warm-orange outline-none transition-colors resize-none bg-white/50"></textarea></div>
                        {/* ** REMOVED: reCAPTCHA placeholder is gone ** */}
                        <Button type="submit" variant="handmade" className="w-full bg-warm-blue text-white hover:bg-blue-600 mt-4"><Send className="h-5 w-5 mr-2"/>Submit Now</Button>
                     </form>
                </motion.div>
            </div>
        </div>
      </section>

      {/* SECTION 3: FAQ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 paper-texture"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">Quick Questions? 🤔</h2>
              <p className="text-xl text-warm-charcoal-light">We might have an answer for you right here!</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="warm-card p-6 flex items-start space-x-4">
                    <HelpCircle className="h-8 w-8 text-warm-green flex-shrink-0 mt-1"/>
                    <div>
                        <h3 className="font-bold text-lg text-warm-charcoal">{faq.q}</h3>
                        <p className="text-warm-charcoal-light">{faq.a}</p>
                    </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-warm-orange via-warm-golden to-warm-green rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-handwritten font-bold mb-6 transform -rotate-1">Ready to Make a Difference? 💝</h2>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">Your kindness can change a life today. Join our mission and let's spread hope together.</p>
                    <Button asChild variant="secondary" size="handmade" className="bg-white text-warm-orange hover:bg-warm-cream transform hover:scale-110 hover:-rotate-2 shadow-handmade font-handwritten font-bold"><Link to="/donate"><Heart className="mr-3 h-5 w-5 animate-heart-beat" fill="currentColor" />Start Donating</Link></Button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  )
}