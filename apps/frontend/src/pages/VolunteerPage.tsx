import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, MapPin, Clock, Heart, Award, CheckCircle, Star, Smile, Heart as HandHeart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const volunteerOpportunities = [
  {
    id: 1,
    title: 'Feed Hungry Children 🍽️',
    description: 'Help distribute warm meals to street children in Mumbai. Every meal brings a smile!',
    location: 'Mumbai, Maharashtra',
    date: '2024-01-20',
    time: '10:00 AM - 2:00 PM',
    volunteers: 15,
    maxVolunteers: 25,
    skills: ['Kind Heart', 'Physical Work', 'Communication'],
    category: 'Food & Nutrition',
    urgent: true,
    impact: 'Feed 200+ children',
    emoji: '🍽️'
  },
  {
    id: 2,
    title: 'Teach Village Children 📚',
    description: 'Become a teacher for a day! Help rural children with basic reading and math.',
    location: 'Pune, Maharashtra',
    date: '2024-01-22',
    time: '9:00 AM - 3:00 PM',
    volunteers: 8,
    maxVolunteers: 12,
    skills: ['Teaching', 'Patience', 'Hindi/English'],
    category: 'Education',
    urgent: false,
    impact: 'Educate 50+ children',
    emoji: '📚'
  },
  {
    id: 3,
    title: 'Health Camp Assistant 🏥',
    description: 'Support doctors during free health checkups for underprivileged families.',
    location: 'Delhi NCR',
    date: '2024-01-25',
    time: '8:00 AM - 4:00 PM',
    volunteers: 12,
    maxVolunteers: 20,
    skills: ['Medical Background', 'Organization', 'Empathy'],
    category: 'Healthcare',
    urgent: false,
    impact: 'Help 300+ patients',
    emoji: '🏥'
  },
  {
    id: 4,
    title: 'Digital Literacy for Elders 💻',
    description: 'Teach grandparents how to use smartphones and video call their families!',
    location: 'Bangalore, Karnataka',
    date: '2024-01-27',
    time: '2:00 PM - 6:00 PM',
    volunteers: 5,
    maxVolunteers: 10,
    skills: ['Computer Skills', 'Teaching', 'Patience'],
    category: 'Digital Literacy',
    urgent: false,
    impact: 'Connect 30+ elders',
    emoji: '💻'
  },
  {
    id: 5,
    title: 'Plant Trees with Kids 🌱',
    description: 'Join children in planting trees and teaching them about environment protection!',
    location: 'Chennai, Tamil Nadu',
    date: '2024-01-28',
    time: '6:00 AM - 10:00 AM',
    volunteers: 20,
    maxVolunteers: 40,
    skills: ['Physical Work', 'Environmental Awareness', 'Fun Attitude'],
    category: 'Environment',
    urgent: false,
    impact: 'Plant 500+ trees',
    emoji: '🌱'
  },
  {
    id: 6,
    title: 'Distribute Warm Clothes ❄️',
    description: 'Help distribute warm blankets and clothes to homeless people during winter.',
    location: 'Delhi, NCR',
    date: '2024-01-30',
    time: '7:00 AM - 11:00 AM',
    volunteers: 18,
    maxVolunteers: 30,
    skills: ['Physical Work', 'Compassion', 'Communication'],
    category: 'Winter Relief',
    urgent: true,
    impact: 'Warm 400+ people',
    emoji: '❄️'
  }
]

const volunteerBenefits = [
  {
    icon: Heart,
    title: 'Make Real Impact',
    description: 'Directly touch lives and see the immediate difference you make in communities',
    emoji: '💝'
  },
  {
    icon: Users,
    title: 'Meet Amazing People',
    description: 'Connect with like-minded souls who share your passion for helping others',
    emoji: '🤝'
  },
  {
    icon: Award,
    title: 'Gain Life Experience',
    description: 'Develop new skills, gain confidence, and add meaningful experience to your life',
    emoji: '🌟'
  },
  {
    icon: CheckCircle,
    title: 'Verified Certificates',
    description: 'Receive beautiful certificates and LinkedIn recommendations for your service',
    emoji: '🏆'
  },
]

const volunteerTestimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    text: "Volunteering with DilSeDaan changed my life! Seeing children smile because of our help is priceless.",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    hours: 120
  },
  {
    name: "Rahul Gupta",
    role: "College Student",
    text: "I've made lifelong friends while helping others. It's the most rewarding thing I've ever done!",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    hours: 80
  },
  {
    name: "Sneha Patel",
    role: "Teacher",
    text: "Teaching village children opened my eyes to real problems. Now I volunteer every weekend!",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    hours: 200
  }
]

export function VolunteerPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const { toast } = useToast()

  const handleSignup = (opportunity) => {
    setSelectedOpportunity(opportunity)
    setShowSignupForm(true)
  }

  const submitApplication = () => {
    toast({
      title: 'Application Submitted! 🎉',
      description: 'Thank you for volunteering! We\'ll contact you with details soon.',
      variant: 'success',
    })
    setShowSignupForm(false)
  }

  return (
    <div className="min-h-screen bg-warm-cream py-8">
      <div className="container mx-auto px-4">
        {/* Emotional Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">
            Become a Volunteer Hero! 🦸‍♀️🦸‍♂️
          </h1>
          <p className="text-xl text-warm-charcoal-light max-w-3xl mx-auto">
            Join our family of amazing volunteers and make real difference in people's lives. 
            Every hour you give creates ripples of joy and hope!
          </p>
          
          {/* Hand-drawn volunteer icon */}
          <svg className="mx-auto mt-6" width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="20" r="8" fill="#ff9a00" className="animate-heart-beat" />
            <path d="M30,28 L30,50 M22,35 L38,35 M20,42 L40,42" stroke="#34a853" strokeWidth="4" strokeLinecap="round" />
            <path d="M15,50 L45,50" stroke="#2962ff" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Benefits with warm design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {volunteerBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
              transition={{ delay: index * 0.1 }}
              className="warm-card text-center group hover:shadow-handmade transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                {benefit.emoji}
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-blue/10 rounded-full mb-4">
                <benefit.icon className="h-6 w-6 text-warm-blue" />
              </div>
              <h3 className="text-lg font-handwritten font-bold text-warm-charcoal mb-2 transform -rotate-1">
                {benefit.title}
              </h3>
              <p className="text-warm-charcoal-light text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Volunteer Opportunities with warm design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-handwritten font-bold mb-8 text-center text-warm-charcoal transform rotate-1">
            Amazing Opportunities Waiting for You! ✨
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ delay: index * 0.1 }}
                className="warm-card group hover:shadow-handmade transition-all duration-500 transform hover:-translate-y-3 hover:rotate-0"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">{opportunity.emoji}</span>
                    <span className="px-3 py-1 bg-warm-blue/10 text-warm-blue rounded-full text-sm font-handwritten font-bold">
                      {opportunity.category}
                    </span>
                    {opportunity.urgent && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-handwritten font-bold animate-pulse">
                        Urgent! 🚨
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-2 transform -rotate-1">
                  {opportunity.title}
                </h3>
                <p className="text-warm-charcoal-light mb-4 leading-relaxed">{opportunity.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-warm-orange" />
                    <span className="font-handwritten">{opportunity.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-warm-green" />
                    <span className="font-handwritten">{new Date(opportunity.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-warm-blue" />
                    <span className="font-handwritten">{opportunity.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-warm-golden" />
                    <span className="font-handwritten">{opportunity.volunteers}/{opportunity.maxVolunteers} volunteers</span>
                  </div>
                </div>

                {/* Impact highlight */}
                <div className="bg-warm-green/10 rounded-xl p-3 mb-4 border-l-4 border-warm-green">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-warm-green" />
                    <span className="font-handwritten font-bold text-warm-green">{opportunity.impact}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-warm-charcoal-light mb-2 font-handwritten">Skills needed:</div>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-warm-orange/10 text-warm-orange rounded-full text-xs font-handwritten"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="handmade"
                    className="flex-1 font-handwritten font-bold"
                    onClick={() => handleSignup(opportunity)}
                  >
                    <Heart className="mr-2 h-4 w-4" fill="currentColor" />
                    Join This Mission
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-warm-blue text-warm-blue hover:bg-warm-blue hover:text-white">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Volunteer Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-handwritten font-bold mb-8 text-center text-warm-charcoal transform -rotate-1">
            What Our Volunteer Heroes Say 💬
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {volunteerTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="warm-card text-center group hover:shadow-handmade transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-warm-orange/30"
                />
                <h3 className="font-handwritten font-bold text-warm-charcoal mb-1">{testimonial.name}</h3>
                <p className="text-sm text-warm-charcoal-light mb-3 font-handwritten">{testimonial.role}</p>
                <p className="text-warm-charcoal-light italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="bg-warm-golden/10 rounded-lg p-2">
                  <span className="text-sm font-handwritten text-warm-golden">
                    ⏰ {testimonial.hours} hours volunteered
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Simple Signup Form Modal */}
        {showSignupForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="warm-card max-w-md w-full"
            >
              <h3 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">
                Join This Mission! 🚀
              </h3>
              
              {selectedOpportunity && (
                <div className="bg-warm-blue/10 rounded-xl p-4 mb-6 border-l-4 border-warm-blue">
                  <h4 className="font-handwritten font-bold text-warm-blue">
                    {selectedOpportunity.title}
                  </h4>
                  <p className="text-sm text-warm-charcoal-light font-handwritten">
                    {selectedOpportunity.location} • {new Date(selectedOpportunity.date).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your beautiful name"
                  className="w-full px-4 py-3 border-2 border-warm-orange/30 rounded-xl focus:border-warm-orange focus:outline-none font-handwritten bg-white/50"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-warm-green/30 rounded-xl focus:border-warm-green focus:outline-none font-handwritten bg-white/50"
                />
                <input
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full px-4 py-3 border-2 border-warm-blue/30 rounded-xl focus:border-warm-blue focus:outline-none font-handwritten bg-white/50"
                />
                <textarea
                  rows={3}
                  placeholder="Why do you want to volunteer? (Optional)"
                  className="w-full px-4 py-3 border-2 border-warm-golden/30 rounded-xl focus:border-warm-golden focus:outline-none font-handwritten bg-white/50 resize-none"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="handmade"
                  className="flex-1 font-handwritten font-bold"
                  onClick={submitApplication}
                >
                  <Heart className="mr-2 h-4 w-4" fill="currentColor" />
                  Submit Application
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSignupForm(false)}
                  className="border-2 border-warm-charcoal text-warm-charcoal hover:bg-warm-charcoal hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center bg-gradient-to-r from-warm-orange via-warm-golden to-warm-green rounded-2xl p-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-handwritten font-bold mb-6 transform -rotate-1">
              Can't Find the Perfect Opportunity? 🤔
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 font-handwritten leading-relaxed">
              We're always looking for passionate volunteers! Tell us your interests 
              and we'll create the perfect opportunity just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                variant="secondary"
                size="handmade"
                className="bg-white text-warm-orange hover:bg-warm-cream transform hover:scale-110 hover:-rotate-2 shadow-handmade font-handwritten font-bold"
              >
                <HandHeart className="mr-3 h-5 w-5" />
                General Volunteer Signup
              </Button>
              
              <Button
                variant="outline"
                size="handmade"
                className="border-2 border-white text-white hover:bg-white hover:text-warm-orange transform hover:rotate-1 font-handwritten"
              >
                Create Custom Opportunity
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-white/80 font-handwritten"
            >
              <p>✨ Every volunteer is a hero in someone's story ✨</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}