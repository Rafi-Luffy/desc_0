import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Heart, Shield, CreditCard, Smartphone, Building2, BookOpen, Utensils, Droplets, Link as LinkIcon } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { useDonationStore } from '../store/donationStore'
import { getProgressPercentage } from '../lib/utils'

// Define the Campaign type according to your data structure
interface Campaign {
  id: string
  title: string
  imageUrl: string
  raisedAmount: number
  targetAmount: number
  // Add other fields as needed
}

// --- HELPER COMPONENT: Ripple of Kindness ---
const RippleOfKindness = ({ amount }: { amount: number }) => {
    const impact = {
      meals: Math.floor(amount / 50) * 10,
      books: Math.floor(amount / 200),
      water: Math.floor(amount / 1000) * 5
    };
  
    const impactItems = [
      { key: 'meals', value: impact.meals, icon: Utensils, label: 'Meals', color: 'text-warm-orange' },
      { key: 'books', value: impact.books, icon: BookOpen, label: 'Books', color: 'text-warm-blue' },
      { key: 'water', value: impact.water, icon: Droplets, label: 'People get water', color: 'text-blue-500' },
    ].filter(item => item.value > 0);
  
    return (
        <AnimatePresence>
            <motion.div key={amount} className="relative w-full aspect-square flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: [0.7, 0] }}
                        transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity, repeatType: 'loop', ease: 'circOut' }}
                        className="absolute inset-0 border-2 border-warm-orange rounded-full"
                    />
                ))}
                <div className="text-center z-10">
                    <p className="font-handwritten text-warm-charcoal-light">Your donation of</p>
                    <p className="text-4xl font-handwritten font-bold text-warm-green">₹{amount.toLocaleString()}</p>
                    <p className="font-handwritten text-warm-charcoal-light">can create...</p>
                </div>
                {impactItems.map((item, index) => (
                    <motion.div
                        key={item.key}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.2, type: 'spring', stiffness: 150 }}
                        className={`absolute flex flex-col items-center ${item.color}`}
                        style={{ transform: `rotate(${index * (360 / impactItems.length)}deg) translateY(-100px) rotate(-${index * (360 / impactItems.length)}deg)` }}
                    >
                        <item.icon className="h-8 w-8 mb-1" />
                        <p className="font-handwritten font-bold text-lg">{item.value.toLocaleString()}</p>
                        <p className="text-xs">{item.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>
    )
}

// --- MAIN PAGE COMPONENT ---
export function DonatePage() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaign');
  const { campaigns, getCampaignById } = useDonationStore();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState(1000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('upi');

  useEffect(() => {
    if (campaignId) {
      const campaign = getCampaignById(campaignId);
      setSelectedCampaign(campaign ?? null);
    } else if (campaigns.length > 0) {
      setSelectedCampaign(campaigns[0]);
    }
  }, [campaignId, getCampaignById, campaigns]);

  const predefinedAmounts = [500, 1000, 2500, 5000];
  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'PhonePe, GPay, etc.' },
    { id: 'card', name: 'Card', icon: CreditCard, description: 'Credit/Debit' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All Banks' },
  ];

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* SECTION 1: HERO */}
      <section className="py-20 bg-gradient-to-br from-warm-orange/10 via-warm-cream to-warm-green/10 relative overflow-hidden">
        <div className="absolute inset-0 mandala-bg"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-handwritten font-bold mb-6 text-warm-charcoal">
                    <span className="inline-block transform -rotate-2 text-warm-orange">Your Heart,</span>
                    <span className="inline-block transform rotate-1"> Their Hope</span>
                </h1>
                <p className="text-xl md:text-2xl text-warm-charcoal-light mb-8 leading-relaxed">
                    Every rupee you donate is a powerful act of kindness. Join us in creating a ripple effect of positive change across India.
                </p>
            </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Donation Flow */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Choose a Story */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="warm-card">
                <h2 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-6 transform -rotate-1">Step 1: Choose a Story to Support 📖</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {campaigns.slice(0, 2).map((campaign) => (
                    <div key={campaign.id} onClick={() => setSelectedCampaign(campaign)} className={`border-2 rounded-2xl p-4 cursor-pointer hover:shadow-handmade transition-all duration-300 transform hover:-translate-y-1 ${selectedCampaign?.id === campaign.id ? 'border-warm-orange' : 'border-warm-orange/30'}`}>
                      <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-32 object-cover rounded-xl mb-3" />
                      <h3 className="font-handwritten font-bold text-warm-charcoal mb-2">{campaign.title}</h3>
                      <Progress value={getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)} variant="handmade" />
                    </div>
                  ))}
                </div>
            </motion.div>

            {/* Step 2: Share Your Love */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="warm-card">
              <h2 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-6 transform rotate-1">Step 2: Share Your Love 💕</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-handwritten font-medium text-warm-charcoal mb-3">Choose Amount (₹)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">{predefinedAmounts.map((amount) => (<button key={amount} type="button" onClick={() => setDonationAmount(amount)} className={`p-3 rounded-xl border-2 text-center font-handwritten font-bold transition-all duration-300 transform hover:scale-105 ${donationAmount === amount ? 'border-warm-orange bg-warm-orange text-white shadow-handmade' : 'border-warm-orange/30 text-warm-charcoal'}`}>{amount.toLocaleString()}</button>))}</div>
                  <input type="number" value={donationAmount} onChange={(e) => setDonationAmount(Number(e.target.value))} className="w-full px-4 py-3 border-2 border-warm-orange/30 rounded-xl focus:border-warm-orange focus:outline-none font-handwritten text-lg bg-white" placeholder="Or enter custom amount" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-handwritten font-medium text-warm-charcoal mb-2">Your Name 😊</label><input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full px-4 py-3 border-2 border-warm-green/30 rounded-xl focus:border-warm-green focus:outline-none font-handwritten bg-white" placeholder="Your name" /></div>
                  <div><label className="block text-sm font-handwritten font-medium text-warm-charcoal mb-2">Email 📧</label><input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-warm-blue/30 rounded-xl focus:border-warm-blue focus:outline-none font-handwritten bg-white" placeholder="your@email.com" /></div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-warm-sage/10 rounded-xl"><input type="checkbox" id="anonymous" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="w-5 h-5 text-warm-orange focus:ring-warm-orange border-warm-orange/30 rounded" /><label htmlFor="anonymous" className="font-handwritten text-warm-charcoal">Donate anonymously 🤫</label></div>
              </div>
            </motion.div>
            
            {/* Step 3: Complete Your Gift */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="warm-card">
              <h2 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-6 transform -rotate-1">Step 3: Complete Your Gift 💳</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">{paymentMethods.map((method) => (<div key={method.id} onClick={() => setSelectedPayment(method.id)} className={`border-2 rounded-xl p-4 text-center cursor-pointer group hover:border-warm-orange transition-colors ${selectedPayment === method.id ? 'border-warm-orange bg-warm-orange/10' : 'border-warm-orange/30'}`}><method.icon className={`h-8 w-8 mx-auto mb-2 text-warm-orange transition-transform group-hover:scale-110`} /><h3 className="font-handwritten font-bold text-warm-charcoal">{method.name}</h3></div>))}</div>
              <Button variant="handmade" size="handmade" className="w-full text-lg font-handwritten font-bold transform hover:scale-105 hover:rotate-1"><Heart className="mr-3 h-5 w-5 animate-heart-beat" fill="currentColor" />Donate ₹{donationAmount.toLocaleString()} with Love</Button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="warm-card">
              <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-4 text-center transform rotate-1">The Ripple of Your Kindness</h3>
              <RippleOfKindness amount={donationAmount} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="warm-card">
              <h3 className="text-xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">Your Trust, Our Promise 🤝</h3>
              <div className="space-y-4 text-sm text-warm-charcoal-light">
                <div className="flex items-start space-x-3"><Shield className="h-5 w-5 text-warm-green flex-shrink-0 mt-1" /><div><strong className="text-warm-charcoal">100% Secure Payments</strong><p>Your transaction is encrypted and safe.</p></div></div>
                <div className="flex items-start space-x-3"><LinkIcon className="h-5 w-5 text-warm-blue flex-shrink-0 mt-1" /><div><strong className="text-warm-charcoal">Blockchain Verified</strong><p>Every donation is tracked on a transparent, unchangeable ledger.</p></div></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}