import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Users, DollarSign, TrendingUp, Activity, Plus, Edit, Trash2, Eye, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock data for admin dashboard
const adminStats = {
  totalDonations: 2500000,
  totalDonors: 12500,
  activeCampaigns: 45,
  totalImpact: 75000,
}

const recentDonations = [
  { id: 'DN001', donor: 'Rajesh Kumar', amount: 5000, campaign: 'Education for All', status: 'completed', date: '2024-01-15' },
  { id: 'DN002', donor: 'Anonymous', amount: 10000, campaign: 'Clean Water', status: 'completed', date: '2024-01-15' },
  { id: 'DN003', donor: 'Priya Singh', amount: 2500, campaign: 'Food Relief', status: 'pending', date: '2024-01-14' },
  { id: 'DN004', donor: 'Amit Patel', amount: 7500, campaign: 'Healthcare', status: 'completed', date: '2024-01-14' },
]

const campaignData = [
  { name: 'Education', donations: 850000, donors: 3200, color: '#3B82F6' },
  { name: 'Healthcare', donations: 650000, donors: 2100, color: '#10B981' },
  { name: 'Food Relief', donations: 450000, donors: 1800, color: '#F97316' },
  { name: 'Water & Sanitation', donations: 350000, donors: 1400, color: '#06B6D4' },
  { name: 'Emergency', donations: 200000, donors: 900, color: '#EF4444' },
]

const monthlyTrends = [
  { month: 'Jul', donations: 180000, donors: 450 },
  { month: 'Aug', donations: 220000, donors: 520 },
  { month: 'Sep', donations: 195000, donors: 480 },
  { month: 'Oct', donations: 280000, donors: 650 },
  { month: 'Nov', donations: 320000, donors: 720 },
  { month: 'Dec', donations: 380000, donors: 850 },
]

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'donations', label: 'Donations' },
    { id: 'users', label: 'Users' },
    { id: 'reports', label: 'Reports' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage campaigns, track donations, and monitor platform performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="charity">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 mb-8"
        >
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-charity-blue-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-charity-blue-100 dark:bg-charity-blue-900 rounded-full">
                    <DollarSign className="h-6 w-6 text-charity-blue-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  ₹{(adminStats.totalDonations / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Donations</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-charity-green-100 dark:bg-charity-green-900 rounded-full">
                    <Users className="h-6 w-6 text-charity-green-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+8.2%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {adminStats.totalDonors.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Donors</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-charity-orange-100 dark:bg-charity-orange-900 rounded-full">
                    <TrendingUp className="h-6 w-6 text-charity-orange-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+5.1%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {adminStats.activeCampaigns}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+15.3%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {adminStats.totalImpact.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Lives Impacted</div>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Monthly Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-6">Monthly Donation Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${(value / 1000).toFixed(0)}K`, 'Donations']} />
                    <Line 
                      type="monotone" 
                      dataKey="donations" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Campaign Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-6">Campaign Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={campaignData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="donations"
                    >
                      {campaignData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${(value / 1000).toFixed(0)}K`, 'Donations']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {campaignData.map((category) => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Donations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Recent Donations</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Donation ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Donor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Campaign</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.map((donation) => (
                      <tr key={donation.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 font-mono text-sm">{donation.id}</td>
                        <td className="py-3 px-4">{donation.donor}</td>
                        <td className="py-3 px-4 font-semibold">₹{donation.amount.toLocaleString()}</td>
                        <td className="py-3 px-4">{donation.campaign}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            donation.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">{tabs.find(t => t.id === activeTab)?.label} Section</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This section is under development. More admin features coming soon!
            </p>
            <Button variant="charity">
              Coming Soon
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}