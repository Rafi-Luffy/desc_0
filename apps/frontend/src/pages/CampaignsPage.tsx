import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Search, MapPin, Users, Heart, Star, BookOpen, Droplets, Baby, 
    AlertTriangle, User, ShieldCheck, Link as LinkIcon, FileText, 
    CheckSquare, PlusCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDonationStore } from '@/store/donationStore';
import { formatCurrency, getProgressPercentage } from '@/lib/utils';
// NEW IMPORT FOR PERFORMANCE
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the blur effect CSS

// --- DATA & CONFIG ---
const categories = [
  { name: 'All Stories', icon: Star }, { name: 'Education', icon: BookOpen },
  { name: 'Emergency', icon: AlertTriangle }, { name: 'Healthcare', icon: Heart },
  { name: 'Water', icon: Droplets }, { name: 'Child Welfare', icon: Baby },
  { name: 'Women', icon: User },
];

const sortByOptions = [
  { id: 'urgent', name: 'Most Urgent' }, { id: 'nearing_goal', name: 'Nearing Goal' },
  { id: 'newest', name: 'Newest Stories' }, { id: 'most_loved', name: 'Most Loved' }
];

// --- ENHANCED DATA MODEL FOR VERIFICATION ---
type Campaign = {
    id: string; 
    title: string; 
    imageUrl: string; 
    story?: string; 
    category: string;
    location: string; 
    donorCount: number; 
    beneficiaries?: number; 
    raisedAmount: number;
    targetAmount: number; 
    isUrgent?: boolean;
    // --- BLOCKCHAIN & VERIFICATION FIELDS ---
    contractAddress: string;
    ipfsPlanHash: string;
    milestones: {
        total: number;
        verified: number;
    };
};

// --- MAIN PAGE COMPONENT ---
export function CampaignsPage() {
  // Use the store directly for instant loading
  const allCampaigns = useDonationStore((state) => state.campaigns as Campaign[]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [sortBy, setSortBy] = useState('urgent');

  // Filtering and sorting now happens instantly on the client side
  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Stories' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'urgent': return (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0);
      case 'nearing_goal': return getProgressPercentage(b.raisedAmount, b.targetAmount) - getProgressPercentage(a.raisedAmount, a.targetAmount);
      case 'most_loved': return b.donorCount - a.donorCount;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* SECTION 1: HERO */}
      <section className="py-20 bg-gradient-to-br from-warm-orange/10 via-warm-cream to-warm-green/10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">Stories That Need Your Heart 💝</h1>
          <p className="text-xl text-warm-charcoal-light max-w-3xl mx-auto">Browse campaigns started by our vetted charity partners. Every donation is tracked on-chain for full transparency.</p>
        </motion.div>
      </section>
      
      {/* NEW SECTION: FOR CHARITIES & TRUST */}
      <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                  <h2 className="text-3xl font-handwritten font-bold text-warm-charcoal mb-3">Are you a Charity?</h2>
                  <p className="text-lg text-warm-charcoal-light mb-6">Join our platform to raise funds transparently and build trust with a global community of donors. Let's make a difference, together.</p>
                  <Button asChild size="handmade">
                      <Link to="/create-campaign"><PlusCircle className="mr-2 h-5 w-5"/> Start a Campaign</Link>
                  </Button>
              </div>
              <div className="bg-warm-cream p-6 rounded-2xl border border-warm-orange/20">
                  <h3 className="font-handwritten text-2xl font-bold text-warm-charcoal mb-3">Our Commitment to Trust & Safety</h3>
                  <ul className="space-y-2 text-warm-charcoal-light list-inside">
                      <li className="flex items-start"><ShieldCheck className="h-5 w-5 mr-2 text-warm-green flex-shrink-0 mt-1"/><div><strong className="text-warm-charcoal">Charity Vetting:</strong> We perform a thorough due diligence check on every organization before they can post a campaign.</div></li>
                      <li className="flex items-start"><CheckSquare className="h-5 w-5 mr-2 text-warm-green flex-shrink-0 mt-1"/><div><strong className="text-warm-charcoal">Milestone-Based Funding:</strong> Donations are held in a smart contract and released in stages only after a charity submits proof of progress, which is then verified.</div></li>
                  </ul>
              </div>
          </div>
      </section>

      {/* SECTION 3: FILTERS & CAMPAIGN GRID */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="warm-card mb-8 p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center mb-6">
                <div className="relative"><Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-warm-orange" /><input type="text" placeholder="Search stories by keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border-2 border-warm-orange/30 rounded-xl focus:border-warm-orange focus:outline-none font-handwritten text-lg bg-white" /></div>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">{sortByOptions.map(option => (<Button key={option.id} onClick={() => setSortBy(option.id)} variant={sortBy === option.id ? 'handmade' : 'outline'} className={`flex-shrink-0 font-handwritten ${sortBy !== option.id && 'border-warm-charcoal/20'}`}>{option.name}</Button>))}</div>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-t border-warm-orange/20 pt-4">{categories.map(cat => (<button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`flex items-center space-x-2 px-4 py-2 rounded-full font-handwritten text-sm transition-colors flex-shrink-0 ${selectedCategory === cat.name ? 'bg-warm-blue text-white shadow-md' : 'bg-white hover:bg-warm-blue/10'}`}><cat.icon className="h-4 w-4" /><span>{cat.name}</span></button>))}</div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCampaigns.map((campaign, index) => (
              <motion.div key={campaign.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.5 }} className="warm-card group hover:shadow-handmade transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  {/* PERFORMANCE-OPTIMIZED IMAGE */}
                  <LazyLoadImage
                    alt={campaign.title}
                    src={campaign.imageUrl}
                    effect="blur"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-handwritten font-bold text-warm-blue">{campaign.category}</div>
                  <div className="absolute bottom-2 left-2 text-white flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full"><MapPin className="h-3 w-3" /><span className="text-xs font-handwritten">{campaign.location}</span></div>
                </div>
                <div className="space-y-4 p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-handwritten font-bold text-warm-charcoal leading-tight transform -rotate-1">{campaign.title}</h3>
                  <div className="flex items-center justify-between text-sm font-handwritten text-warm-charcoal-light">
                    <span className="flex items-center"><Heart className="h-4 w-4 mr-1 text-red-500"/>{campaign.donorCount} Donors</span>
                    {/* NEW MILESTONE INDICATOR */}
                    <span className="flex items-center" title="Verified milestones show proof of work has been submitted and approved.">
                        <CheckSquare className="h-4 w-4 mr-1 text-warm-green"/>{campaign.milestones.verified} of {campaign.milestones.total} Milestones
                    </span>
                  </div>
                  <div className="flex-grow">
                    <Progress value={getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)} variant="handmade" className="h-2.5"/>
                    <div className="flex justify-between text-xs font-handwritten mt-1"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>{formatCurrency(campaign.raisedAmount)} raised</span><span className="text-warm-charcoal-light">of {formatCurrency(campaign.targetAmount)}</span></div>
                  </div>
                  <div className="pt-4 mt-auto border-t border-warm-orange/20 space-y-3">
                    {/* CLEARER, ACTIONABLE BLOCKCHAIN LINKS */}
                    <div className="flex justify-around text-xs font-handwritten text-warm-charcoal-light">
                      <a href={`https://polygonscan.com/address/${campaign.contractAddress}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-warm-blue transition-colors"> <LinkIcon className="h-3 w-3" /> On-Chain Contract </a>
                      <a href={`https://ipfs.io/ipfs/${campaign.ipfsPlanHash}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-warm-blue transition-colors"> <FileText className="h-3 w-3" /> Immutable Proposal </a>
                    </div>
                    <Button asChild variant="organic" className="w-full font-handwritten font-bold"><Link to={`/donate?campaign=${campaign.id}`}><Heart className="mr-2 h-4 w-4" />Donate with Love</Link></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {sortedCampaigns.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-6xl mb-4">💔</div>
              <h3 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-2">No stories found</h3>
              <p className="text-warm-charcoal-light mb-6 font-handwritten">Try different filters to find stories that need your love</p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All Stories'); }} variant="handmade">Show All Stories</Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-warm-orange via-warm-golden to-warm-green rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-handwritten font-bold mb-4 transform -rotate-1">Can't Choose? Donate to Our General Fund</h2>
                    <p className="text-xl mb-8 opacity-90 font-handwritten">A general donation empowers us to allocate funds where they are most critically needed, all governed by the same transparent smart contract rules.</p>
                    <Button asChild variant="secondary" size="handmade" className="bg-white text-warm-orange hover:bg-warm-cream transform hover:scale-110 hover:-rotate-2 shadow-handmade font-handwritten font-bold"><Link to="/donate"><Heart className="mr-3 h-5 w-5 animate-heart-beat" fill="currentColor" />Donate to General Fund</Link></Button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}

