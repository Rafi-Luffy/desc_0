import { motion } from 'framer-motion'
import { Heart, Shield, Users, Globe, Link as LinkIcon, Leaf } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

// --- MOCK DATA ---
const teamMembers = [
  { name: 'Arjun Sharma', role: 'Founder & Visionary', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', bio: 'Left a corporate job to make charity transparent, believing every rupee should reach those who need it.', quote: 'Technology should serve humanity, not just profit.' },
  { name: 'Priya Patel', role: 'CTO & Blockchain Architect', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg', bio: 'Built our transparency system. Passionate about using tech for social good.', quote: 'Code can change the world, one block at a time.' },
  { name: 'Rahul Gupta', role: 'Head of Operations', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', bio: 'NGO veteran with 12 years of grassroots experience. Ensures every donation reaches the right hands.', quote: 'Trust is earned through action, not promises.' },
  { name: 'Sneha Reddy', role: 'Head of Impact', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg', bio: 'Measures our real-world impact and verifies every story we share.', quote: 'Every number represents a human life changed.' },
];

const milestones = [
  { year: '2020', title: 'The Dream Begins', description: 'DilSeDaan is founded with a simple, powerful idea: make charity transparent.', icon: Leaf },
  { year: '2021', title: 'Blockchain Integration', description: 'We launch our revolutionary transparent donation tracking system.', icon: LinkIcon },
  { year: '2022', title: '₹1 Crore Milestone', description: 'Our community raises its first crore in donations—all tracked with love.', icon: Heart },
  { year: '2024', title: '50,000 Lives Touched', description: 'We directly help over 50,000 people across India with verified impact.', icon: Users },
];

const values = [
  { icon: Shield, title: 'Radical Transparency', description: 'Every rupee is tracked on the blockchain. No secrets, no hidden fees.' },
  { icon: Heart, title: 'Maximum Impact', description: 'We measure and maximize the real-world effect of every donation.' },
  { icon: Users, title: 'Community-Driven', description: 'Building a family of donors, volunteers, and beneficiaries who care for each other.' },
  { icon: Globe, title: 'Accessible to All', description: 'Making charitable giving easy and accessible, no matter the size of the gift.' },
];

// --- MAIN PAGE COMPONENT ---
export function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* SECTION 1: HERO */}
      <section className="py-20 bg-gradient-to-br from-warm-orange/10 via-warm-cream to-warm-green/10 relative overflow-hidden">
        <div className="absolute inset-0 mandala-bg"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-handwritten font-bold mb-6 text-warm-charcoal">
              <span className="inline-block transform -rotate-2 text-warm-orange">A Promise</span>
              <br />
              <span className="inline-block transform rotate-1">of Trust & Transparency</span>
            </h1>
            <p className="text-xl md:text-2xl text-warm-charcoal-light mb-8 leading-relaxed">
              We started DilSeDaan because we believe that giving from the heart should come with peace of mind. Discover the story and the people behind India's most transparent donation platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE FOUNDER'S NOTE (Interactive Mission) */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 paper-texture"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-2 warm-card p-8 md:p-12 transform -rotate-1">
              <h2 className="text-4xl font-handwritten font-bold text-warm-charcoal mb-6">A Note from Our Founder</h2>
              <p className="text-lg text-warm-charcoal-light leading-relaxed mb-4">
                "Our mission is simple: to rebuild the trust in charitable giving. We envision a world where every donation creates maximum impact through <strong className="text-warm-orange font-bold relative group">complete transparency <Shield className="inline-block h-5 w-5 absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" /></strong>.
              </p>
              <p className="text-lg text-warm-charcoal-light leading-relaxed">
                By leveraging cutting-edge technology like <strong className="text-warm-green font-bold relative group">blockchain <LinkIcon className="inline-block h-5 w-5 absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" /></strong> and being driven by a <strong className="text-warm-blue font-bold relative group">passionate community <Users className="inline-block h-5 w-5 absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" /></strong>, we ensure that your kindness reaches exactly where it's needed most. This is our promise to you."
              </p>
              <div className="mt-8 text-right">
                <p className="font-handwritten text-2xl text-warm-charcoal">Arjun Sharma</p>
                <p className="text-warm-charcoal-light">Founder, DilSeDaan</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" alt="Arjun Sharma, Founder" className="rounded-2xl shadow-handmade transform rotate-2 w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE VALUES */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-handwritten font-bold text-warm-charcoal mb-4 transform rotate-1">Our Guiding Principles 💎</h2>
            <p className="text-xl text-warm-charcoal-light">These values are the heart and soul of everything we build and do.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }} className="warm-card text-center group hover:shadow-handmade transition-all duration-300 transform hover:-translate-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blue/10 rounded-full mb-6 group-hover:animate-bounce-gentle"><value.icon className="h-8 w-8 text-warm-blue" /></div>
                <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">{value.title}</h3>
                <p className="text-warm-charcoal-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TIMELINE */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 lotus-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">Our Journey So Far 🛤️</h2>
            <p className="text-xl text-warm-charcoal-light">Key milestones in our mission to transform charitable giving.</p>
          </motion.div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-warm-orange/20"></div>
            {milestones.map((milestone, index) => (
              <motion.div key={milestone.year} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }} className="mb-16 flex items-center">
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'order-2 pl-8'}`}>
                  <div className={`warm-card p-6 transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                    <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-2">{milestone.title}</h3>
                    <p className="text-warm-charcoal-light">{milestone.description}</p>
                  </div>
                </div>
                <div className="relative flex-shrink-0 order-1">
                  <div className="absolute -translate-x-1/2 left-1/2 w-12 h-12 bg-warm-orange rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xl">
                    <milestone.icon />
                  </div>
                  <div className="absolute -translate-x-1/2 left-1/2 top-14 bg-warm-green text-white font-handwritten text-sm px-2 py-1 rounded-full">{milestone.year}</div>
                </div>
                <div className="flex-1 order-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TEAM */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-handwritten font-bold text-warm-charcoal mb-4 transform rotate-1">The Hearts Behind the Mission 👥</h2>
            <p className="text-xl text-warm-charcoal-light">Passionate humans working to make charity transparent and impactful.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }} className="warm-card overflow-hidden group hover:shadow-handmade transition-all duration-500 transform hover:-translate-y-3">
                <div className="relative h-56">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-1 transform -rotate-1">{member.name}</h3>
                  <div className="text-warm-blue font-handwritten font-medium mb-3">{member.role}</div>
                  <p className="text-warm-charcoal-light text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="bg-warm-golden/10 rounded-lg p-3 border-l-4 border-warm-golden"><p className="text-xs font-handwritten text-warm-charcoal italic">"{member.quote}"</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* SECTION 6: FINAL CTA */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-warm-orange via-warm-golden to-warm-green rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <h2 className="text-4xl md:text-6xl font-handwritten font-bold mb-6 transform -rotate-1">Become Part of Our Story 💝</h2>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">Your trust and support fuels our mission. Join us in creating a world where every act of kindness counts.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button asChild variant="secondary" size="handmade" className="bg-white text-warm-orange hover:bg-warm-cream transform hover:scale-110 hover:-rotate-2 shadow-handmade font-handwritten font-bold"><Link to="/donate"><Heart className="mr-3 h-5 w-5 animate-heart-beat" fill="currentColor" />Join Our Mission</Link></Button>
                            
                            {/* ** THE ONLY CHANGE IS ON THIS BUTTON ** */}
                            <Button asChild variant="outline" size="handmade" className="border-2 border-white text-white hover:bg-white hover:text-warm-orange transform hover:rotate-1 font-handwritten">
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  )
}