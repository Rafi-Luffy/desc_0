import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Donation {
  id: string
  amount: number
  cause: string
  donorName: string
  donorEmail: string
  message?: string
  isAnonymous: boolean
  timestamp: Date
  status: 'pending' | 'completed' | 'failed'
  paymentMethod: 'upi' | 'card' | 'netbanking'
  transactionId?: string
  taxBenefit?: number
}

export interface Campaign {
  id: string
  title: string
  description: string
  category: string
  targetAmount: number
  raisedAmount: number
  donorCount: number
  imageUrl: string
  isUrgent: boolean
  endDate?: Date
  location: string
  beneficiaries?: number
  story?: string
}

interface DonationState {
  donations: Donation[]
  campaigns: Campaign[]
  totalDonated: number
  totalImpact: number
  addDonation: (donation: Donation) => void
  updateDonationStatus: (id: string, status: Donation['status']) => void
  getCampaignById: (id: string) => Campaign | undefined
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
}

export const useDonationStore = create<DonationState>()(
  persist(
    (set, get) => ({
      donations: [],
      campaigns: [
        {
          id: '1',
          title: 'Little Priya Needs School Books',
          description: 'Help 8-year-old Priya from a slum in Mumbai get her school books and uniform. She dreams of becoming a doctor but her family can\'t afford education.',
          category: 'Education',
          targetAmount: 25000,
          raisedAmount: 18500,
          donorCount: 47,
          imageUrl: 'https://images.pexels.com/photos/8617843/pexels-photo-8617843.jpeg',
          isUrgent: false,
          location: 'Mumbai Slums, Maharashtra',
          beneficiaries: 1,
          story: 'Priya walks 2km daily to school but doesn\'t have books. Your ₹500 can change her life forever.'
        },
        {
          id: '2',
          title: 'Emergency Food for Flood Victims',
          description: 'Families in Kerala are stranded without food after devastating floods. They need immediate relief - rice, dal, and clean water.',
          category: 'Emergency Relief',
          targetAmount: 150000,
          raisedAmount: 142000,
          donorCount: 234,
          imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
          isUrgent: true,
          location: 'Flood-affected Kerala',
          beneficiaries: 150,
          story: 'Families have been without food for 3 days. Your ₹200 can feed a family for a week.'
        },
        {
          id: '3',
          title: 'Clean Water for Rampur Village',
          description: '500 families in Rampur village walk 5km daily for contaminated water. Help us install a clean water system.',
          category: 'Water & Sanitation',
          targetAmount: 300000,
          raisedAmount: 185000,
          donorCount: 156,
          imageUrl: 'https://images.pexels.com/photos/1029615/pexels-photo-1029615.jpeg',
          isUrgent: false,
          location: 'Rampur Village, Rajasthan',
          beneficiaries: 500,
          story: 'Children miss school to fetch water. Your ₹1000 can give clean water to 5 families.'
        },
        {
          id: '4',
          title: 'Grandmother Kamala\'s Medicine',
          description: 'Kamala, 67, needs diabetes medicine but her family can\'t afford it. She raised 5 orphans and now needs our help.',
          category: 'Healthcare',
          targetAmount: 45000,
          raisedAmount: 32000,
          donorCount: 89,
          imageUrl: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg',
          isUrgent: true,
          location: 'Rural Tamil Nadu',
          beneficiaries: 1,
          story: 'Kamala sacrificed everything for orphans. Now it\'s our turn to help her.'
        },
        {
          id: '5',
          title: 'Warm Blankets for Street Children',
          description: 'Winter is coming and 200+ street children in Delhi need warm blankets to survive the cold nights.',
          category: 'Child Welfare',
          targetAmount: 80000,
          raisedAmount: 45000,
          donorCount: 123,
          imageUrl: 'https://images.pexels.com/photos/8617843/pexels-photo-8617843.jpeg',
          isUrgent: true,
          location: 'Delhi Streets',
          beneficiaries: 200,
          story: 'Children sleep on cold streets. Your ₹400 can give a warm blanket to a child.'
        },
        {
          id: '6',
          title: 'Skill Training for Rural Women',
          description: 'Teach 50 rural women tailoring skills so they can earn ₹5000/month and support their families independently.',
          category: 'Women Empowerment',
          targetAmount: 200000,
          raisedAmount: 125000,
          donorCount: 78,
          imageUrl: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
          isUrgent: false,
          location: 'Rural Uttar Pradesh',
          beneficiaries: 50,
          story: 'Women want to work but lack skills. Your ₹2000 can train a woman for life.'
        },
        {
          id: '7',
          title: 'Solar Lights for Village School',
          description: 'Children in Sundargram study under kerosene lamps. Help us install solar lights so they can study safely.',
          category: 'Education',
          targetAmount: 120000,
          raisedAmount: 67000,
          donorCount: 91,
          imageUrl: 'https://images.pexels.com/photos/8617843/pexels-photo-8617843.jpeg',
          isUrgent: false,
          location: 'Sundargram, West Bengal',
          beneficiaries: 300,
          story: 'Children study in darkness. Your ₹1500 can light up their future.'
        },
        {
          id: '8',
          title: 'Wheelchairs for Disabled Children',
          description: 'Help 15 disabled children get wheelchairs so they can go to school and play with friends.',
          category: 'Healthcare',
          targetAmount: 225000,
          raisedAmount: 156000,
          donorCount: 67,
          imageUrl: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg',
          isUrgent: false,
          location: 'Pune, Maharashtra',
          beneficiaries: 15,
          story: 'Children crawl to school. Your ₹15000 can give a child mobility and dignity.'
        },
        {
          id: '9',
          title: 'Mobile Library for Remote Villages',
          description: 'Bring books and learning to 12 remote villages where children have never seen a library.',
          category: 'Education',
          targetAmount: 180000,
          raisedAmount: 89000,
          donorCount: 134,
          imageUrl: 'https://images.pexels.com/photos/8617843/pexels-photo-8617843.jpeg',
          isUrgent: false,
          location: 'Remote Himachal Pradesh',
          beneficiaries: 800,
          story: 'Books can travel where schools cannot. Your ₹1000 can bring a library to a village.'
        },
        {
          id: '10',
          title: 'Emergency Surgery for Baby Arjun',
          description: '6-month-old Arjun needs urgent heart surgery. His parents are daily wage workers who cannot afford the operation.',
          category: 'Healthcare',
          targetAmount: 350000,
          raisedAmount: 298000,
          donorCount: 445,
          imageUrl: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg',
          isUrgent: true,
          location: 'AIIMS, Delhi',
          beneficiaries: 1,
          story: 'Baby Arjun\'s heart needs fixing. Your donation can give him a chance to live and play like other children.'
        },
        {
          id: '11',
          title: 'Organic Farming Training',
          description: 'Train 100 farmers in organic farming techniques to increase their income and protect the environment.',
          category: 'Agriculture',
          targetAmount: 250000,
          raisedAmount: 167000,
          donorCount: 98,
          imageUrl: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
          isUrgent: false,
          location: 'Rural Punjab',
          beneficiaries: 100,
          story: 'Healthy soil, healthy food, healthy farmers. Your ₹2500 can train a farmer in sustainable agriculture.'
        },
        {
          id: '12',
          title: 'Menstrual Hygiene for School Girls',
          description: 'Provide sanitary pads and hygiene education to 500 school girls so they don\'t miss classes.',
          category: 'Women Empowerment',
          targetAmount: 75000,
          raisedAmount: 52000,
          donorCount: 187,
          imageUrl: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
          isUrgent: false,
          location: 'Rural Bihar',
          beneficiaries: 500,
          story: 'Every girl deserves to attend school every day. Your ₹150 can support a girl for a full year.'
        }
      ],
      totalDonated: 0,
      totalImpact: 0,
      addDonation: (donation) =>
        set((state) => ({
          donations: [...state.donations, donation],
          totalDonated: state.totalDonated + donation.amount,
        })),
      updateDonationStatus: (id, status) =>
        set((state) => ({
          donations: state.donations.map((donation) =>
            donation.id === id ? { ...donation, status } : donation
          ),
        })),
      getCampaignById: (id) => get().campaigns.find((campaign) => campaign.id === id),
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [...state.campaigns, campaign],
        })),
      updateCampaign: (id, updates) =>
        set((state) => ({
          campaigns: state.campaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, ...updates } : campaign
          ),
        })),
    }),
    {
      name: 'donation-storage',
    }
  )
)