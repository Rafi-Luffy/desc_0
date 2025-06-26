import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Smile, Home, BookOpen } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { useDonationStore } from '../store/donationStore'
import { formatCurrency, formatNumber, getProgressPercentage } from '../lib/utils'

type Campaign = {
  id: string
  imageUrl: string
  title: string
  description: string
  category: string
  donorCount: number
  raisedAmount: number
  targetAmount: number
  location: string
  isUrgent?: boolean
}

export function HomePage() {
  const { campaigns } = useDonationStore()
  const featuredCampaigns: Campaign[] = campaigns.slice(0, 3)

  const stats = [
    { 
      label: 'Families Fed', 
      value: '12,847', 
      icon: Heart, 
      description: 'warm meals served',
      color: 'text-warm-orange'
    },
    { 
      label: 'Children Smiling', 
      value: '8,234', 
      icon: Smile,
      description: 'dreams fulfilled',
      color: 'text-warm-green'
    },
    { 
      label: 'Homes Built', 
      value: '156', 
      icon: Home, 
      description: 'safe shelters created',
      color: 'text-warm-blue'
    },
    { 
      label: 'Books Donated', 
      value: '45,678', 
      icon: BookOpen, 
      description: 'futures brightened',
      color: 'text-warm-golden'
    },
  ]

  const impactStories = [
    {
      title: "Little Priya's School Dream",
      description: "Your ₹500 helped Priya get school books and uniform. She's now top of her class!",
      image: "https://images.pexels.com/photos/8617843/pexels-photo-8617843.jpeg",
      impact: "Education",
      hearts: 234
    },
    {
      title: "Clean Water for Rampur Village",
      description: "Thanks to 89 donors, Rampur now has clean drinking water for 500 families.",
      image: "https://images.pexels.com/photos/1029615/pexels-photo-1029615.jpeg",
      impact: "Water",
      hearts: 567
    },
    {
      title: "Grandmother Kamala's Medicine",
      description: "Your kindness helped Kamala get her diabetes medicine for 3 months.",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
      impact: "Healthcare",
      hearts: 123
    }
  ]

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section with Hand-drawn Feel */}
      <section className="relative py-20 overflow-hidden mandala-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-orange/5 via-warm-cream to-warm-green/5"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-warm-orange/10 rounded-full blur-xl animate-gentle-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-warm-green/10 rounded-full blur-xl animate-gentle-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Hand-drawn style heading */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-handwritten font-bold mb-4 text-warm-charcoal leading-tight">
                <span className="inline-block transform -rotate-2 text-warm-orange">Dil Se</span>
                <br />
                <span className="inline-block transform rotate-1">Donate Karo</span>
                <br />
                <span className="text-3xl md:text-4xl text-warm-green transform -rotate-1 inline-block">
                  दिल से दान करो ❤️
                </span>
              </h1>
              
              {/* Hand-drawn underline */}
              <svg className="mx-auto mt-4" width="300" height="20" viewBox="0 0 300 20">
                <path 
                  d="M10,15 Q150,5 290,12" 
                  stroke="#ff9a00" 
                  strokeWidth="3" 
                  fill="none"
                  className="sketch-line"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-warm-charcoal-light mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Every rupee you donate is tracked with love and transparency. 
              See exactly how your kindness changes lives, one smile at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                asChild
                variant="handmade"
                size="handmade"
                className="transform hover:scale-110 hover:rotate-2 shadow-handmade"
              >
                <Link to="/donate">
                  <Heart className="mr-3 h-5 w-5 animate-heart-beat" fill="currentColor" />
                  Start Donating with Love
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="handmade"
                className="border-2 border-warm-green text-warm-green hover:bg-warm-green hover:text-white transform hover:-rotate-1"
              >
                <Link to="/transparency">
                  See Where Money Goes
                </Link>
              </Button>
            </motion.div>

            {/* Trust indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex items-center justify-center space-x-2 text-warm-charcoal-light"
            >
              <div className="w-3 h-3 bg-warm-green rounded-full animate-pulse"></div>
              <span className="text-sm font-handwritten">100% transparent • Blockchain secured • Made with ❤️ in India</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats with Organic Feel */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 lotus-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">
              Look What We Did Together! 🎉
            </h2>
            <p className="text-warm-charcoal-light text-lg">Real impact, real smiles, real change</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 imperfect-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="warm-card text-center group hover:shadow-handmade transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${stat.color} bg-current/10 group-hover:animate-bounce-gentle`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-handwritten font-bold text-warm-charcoal mb-2">
                  {stat.value}
                </div>
                <div className="text-warm-charcoal font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-warm-charcoal-light">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Stories Section */}
      <section className="py-20 bg-warm-cream relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-handwritten font-bold text-warm-charcoal mb-4 transform rotate-1">
              Real Stories, Real Smiles 😊
            </h2>
            <p className="text-xl text-warm-charcoal-light max-w-2xl mx-auto">
              Every donation has a face, a story, and a grateful heart behind it
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="warm-card group hover:shadow-handmade transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-handwritten text-warm-orange font-bold">
                      {story.impact}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                    <span className="text-sm font-bold text-warm-charcoal">{story.hearts}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-3 transform -rotate-1">
                  {story.title}
                </h3>
                <p className="text-warm-charcoal-light leading-relaxed">
                  {story.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-warm-orange/20">
                  <Button variant="ghost" className="text-warm-orange hover:text-warm-orange-dark font-handwritten">
                    Read Full Story →
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns with Hand-drawn Progress */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 paper-texture"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">
              Help These Beautiful Souls 🙏
            </h2>
            <p className="text-xl text-warm-charcoal-light max-w-2xl mx-auto">
              Choose a cause that touches your heart. Every rupee makes a difference.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="warm-card group hover:shadow-handmade transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {campaign.isUrgent && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-handwritten font-bold animate-pulse">
                      Urgent! 🚨
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-handwritten bg-black/50 px-2 py-1 rounded">
                      📍 {campaign.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-handwritten text-warm-orange bg-warm-orange/10 px-3 py-1 rounded-full">
                      {campaign.category}
                    </span>
                    <span className="text-sm text-warm-charcoal-light font-handwritten">
                      {campaign.donorCount} kind hearts ❤️
                    </span>
                  </div>

                  <h3 className="text-xl font-handwritten font-bold text-warm-charcoal leading-tight transform -rotate-1">
                    {campaign.title}
                  </h3>
                  
                  <p className="text-warm-charcoal-light leading-relaxed">
                    {campaign.description}
                  </p>

                  {/* Hand-drawn style progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-handwritten text-warm-charcoal">Progress</span>
                      <span className="text-sm font-handwritten font-bold text-warm-green">
                        {getProgressPercentage(campaign.raisedAmount, campaign.targetAmount).toFixed(0)}% done! 🎉
                      </span>
                    </div>
                    
                    <Progress 
                      value={getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)} 
                      variant="handmade"
                      className="transform rotate-1"
                    />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-handwritten font-bold text-warm-green">
                          {formatCurrency(campaign.raisedAmount)}
                        </div>
                        <div className="text-sm text-warm-charcoal-light">
                          raised of {formatCurrency(campaign.targetAmount)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-handwritten font-bold text-warm-orange">
                          {formatNumber(Math.floor((campaign.targetAmount - campaign.raisedAmount) / 100))}
                        </div>
                        <div className="text-sm text-warm-charcoal-light">
                          more families to help
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="organic"
                    className="w-full font-handwritten font-bold"
                  >
                    <Link to={`/donate?campaign=${campaign.id}`}>
                      <Heart className="mr-2 h-4 w-4" fill="currentColor" />
                      Donate with Love
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              asChild
              variant="outline"
              size="handmade"
              className="border-2 border-warm-green text-warm-green hover:bg-warm-green hover:text-white transform hover:rotate-1"
            >
              <Link to="/campaigns">
                See All Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 bg-gradient-to-br from-warm-green/10 via-warm-cream to-warm-blue/10 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-handwritten font-bold text-warm-charcoal mb-4 transform rotate-1">
              Why Trust DilSeDaan? 🤝
            </h2>
            <p className="text-xl text-warm-charcoal-light max-w-2xl mx-auto">
              We're not just another donation platform. We're your neighbors who care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔗",
                title: "Blockchain Transparency",
                description: "Every rupee is tracked on blockchain. No corruption, no hidden fees. Just pure transparency.",
                color: "warm-blue"
              },
              {
                icon: "📸",
                title: "Real Photo Updates",
                description: "See photos and videos of exactly how your money helped. Real faces, real smiles.",
                color: "warm-green"
              },
              {
                icon: "❤️",
                title: "Made with Love in India",
                description: "Built by young Indians who believe in the power of kindness and community.",
                color: "warm-orange"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="warm-card text-center group hover:shadow-handmade transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="text-6xl mb-6 group-hover:animate-bounce-gentle">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">
                  {feature.title}
                </h3>
                <p className="text-warm-charcoal-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with Emotional Appeal */}
      <section className="py-20 bg-gradient-to-r from-warm-orange via-warm-golden to-warm-green relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-white"
          >
            <h2 className="text-4xl md:text-6xl font-handwritten font-bold mb-6 transform -rotate-1">
              Your Heart Can Change Everything 💝
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Join 12,847 kind souls who chose to make a difference. 
              Every donation, every smile, every life changed - it all starts with you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                variant="secondary"
                size="handmade"
                className="bg-white text-warm-orange hover:bg-warm-cream transform hover:scale-110 hover:-rotate-2 shadow-handmade font-handwritten font-bold"
              >
                <Link to="/donate">
                  <Heart className="mr-3 h-5 w-5 animate-heart-beat" fill="currentColor" />
                  Start Your Kindness Journey
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="handmade"
                className="border-2 border-white text-white hover:bg-white hover:text-warm-orange transform hover:rotate-1 font-handwritten"
              >
                <Link to="/volunteer">
                  Volunteer with Us
                </Link>
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-white/80 font-handwritten"
            >
              <p>✨ Made with love by Indians, for Indians ✨</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}