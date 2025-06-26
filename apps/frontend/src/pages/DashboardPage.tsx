import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Heart, TrendingUp, Users, Award, Download } from 'lucide-react'
// Replace the following imports with the correct relative paths or mock implementations if the modules do not exist
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { useDonationStore } from '../store/donationStore'
import { formatCurrency } from '../lib/utils'

// --- MOCK DATA ---
const monthlyData = [
  { month: 'Jan', donations: 4500, donors: 1 }, { month: 'Feb', donations: 5200, donors: 2 },
  { month: 'Mar', donations: 4800, donors: 1 }, { month: 'Apr', donations: 6100, donors: 3 },
  { month: 'May', donations: 5500, donors: 2 }, { month: 'Jun', donations: 6700, donors: 3 },
];

const categoryData = [
  { name: 'Education', value: 35, color: '#ff9a00' }, // warm-orange
  { name: 'Healthcare', value: 25, color: '#34a853' }, // warm-green
  { name: 'Food', value: 20, color: '#cd5c5c' }, // warm-terracotta
  { name: 'Water', value: 15, color: '#2962ff' }, // warm-blue
  { name: 'Emergency', value: 5, color: '#EF4444' }, // red-500
];

// const impactData = [
//   { category: 'Meals Provided', count: '1,542', icon: '🍽️' }, { category: 'Children Educated', count: '234', icon: '📚' },
//   { category: 'Medical Treatments', count: '89', icon: '🏥' }, { category: 'Families got Water', count: '45', icon: '💧' },
// ];

// --- MAIN PAGE COMPONENT ---
export function DashboardPage() {
  const { donations, totalDonated } = useDonationStore();
  const userStats = {
    totalDonated: totalDonated || 25000,
    totalDonations: donations.length || 12,
    impactScore: 850,
    rank: 'Gold Donor',
    taxSaved: Math.floor((totalDonated || 25000) * 0.5),
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* SECTION 1: HEADER */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 paper-texture"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-handwritten font-bold text-warm-charcoal mb-2 transform -rotate-1">Your Impact Journal 📔</h1>
                <p className="text-xl text-warm-charcoal-light">Welcome back, Kind Heart! Here's the beautiful story of your generosity.</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Button variant="outline" className="border-warm-orange text-warm-orange hover:bg-warm-orange hover:text-white font-handwritten"><Download className="h-4 w-4 mr-2" />Export Report</Button>
              </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Donated', value: formatCurrency(userStats.totalDonated), icon: Heart, color: 'warm-orange' },
            { label: 'Donations Made', value: userStats.totalDonations, icon: TrendingUp, color: 'warm-green' },
            { label: 'Impact Score', value: userStats.impactScore, icon: Award, color: 'warm-blue' },
            { label: 'Tax Saved (80G)', value: formatCurrency(userStats.taxSaved), icon: Users, color: 'warm-terracotta' }
          ].map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="warm-card text-center group hover:shadow-handmade transition-all duration-300 transform hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}/10 text-${stat.color} rounded-full mb-4 group-hover:animate-bounce-gentle`}><stat.icon className="h-6 w-6" /></div>
                <div className="text-2xl font-handwritten font-bold text-warm-charcoal mb-1">{stat.value}</div>
                <div className="text-sm text-warm-charcoal-light">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Kindness Journey Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="warm-card p-6">
              <h3 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-6 transform -rotate-1">Your Kindness Journey ❤️</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff9a00" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff9a00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
                  <XAxis dataKey="month" tick={{ fontFamily: 'Kalam', fill: '#555' }} />
                  <YAxis tick={{ fontFamily: 'Kalam', fill: '#555' }} tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip
                    contentStyle={{ fontFamily: 'Poppins', borderRadius: '12px', border: '2px solid #ff9a00' }}
                    formatter={(value) => [typeof value === 'number' ? formatCurrency(value) : value, 'Donations']}
                  />
                  <Area type="monotone" dataKey="donations" stroke="#ff9a00" strokeWidth={3} fillOpacity={1} fill="url(#colorDonations)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
            {/* Recent Donations */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="warm-card p-6">
              <h3 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-6 transform rotate-1">Your Recent Donations 📜</h3>
              <div className="space-y-4">
                {[
                  { campaign: 'Education for All', amount: 5000, date: '2024-06-15', status: 'Used' },
                  { campaign: 'Clean Water Initiative', amount: 3000, date: '2024-05-10', status: 'In Progress' },
                ].map((donation, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2 }} className="flex items-center justify-between p-4 bg-warm-cream/80 rounded-xl">
                    <div><p className="font-handwritten font-bold text-warm-charcoal">{donation.campaign}</p><p className="text-sm text-warm-charcoal-light">{donation.date}</p></div>
                    <div className="text-right"><p className="font-bold text-lg text-warm-green">{formatCurrency(donation.amount)}</p><span className={`text-xs px-2 py-1 rounded-full font-bold ${ donation.status === 'Used' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }`}>{donation.status}</span></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 lg:sticky lg:top-8">
            {/* Donor Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="warm-card text-center bg-gradient-to-br from-warm-blue to-warm-green p-6 text-white shadow-handmade">
              <Award className="h-12 w-12 mx-auto mb-2 text-yellow-300" />
              <h3 className="text-2xl font-handwritten font-bold mb-1">{userStats.rank} ✨</h3>
              <p className="text-blue-100 mb-4 text-sm">You're in the top 10% of donors!</p>
              <Progress value={(userStats.impactScore / 1000) * 100} variant="handmade" className="bg-white/30 [&>div]:bg-yellow-400" />
              <div className="text-sm font-handwritten mt-2">{userStats.impactScore} / 1000 Impact Points</div>
            </motion.div>

            {/* Category Distribution */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="warm-card p-6">
              <h3 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-6 transform -rotate-1">Where Your Heart Lies ❤️</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" cornerRadius={10}>
                    {categoryData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip contentStyle={{ fontFamily: 'Poppins', borderRadius: '12px' }} formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">{categoryData.map((category) => (<div key={category.name} className="flex items-center justify-between text-sm"><div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} /><span>{category.name}</span></div><span className="font-medium">{category.value}%</span></div>))}</div>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="warm-card p-6">
              <h3 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-4 transform rotate-1">Quick Actions ⚡</h3>
              <div className="space-y-3">
                <Button variant="handmade" className="w-full"><Heart className="h-4 w-4 mr-2" />Make Another Donation</Button>
                <Button variant="outline" className="w-full border-warm-green text-warm-green hover:bg-warm-green hover:text-white">See Impact Stories</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}