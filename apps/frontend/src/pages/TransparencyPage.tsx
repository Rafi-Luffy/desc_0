import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, CheckCircle, Clock, X, Heart, ExternalLink, XCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

// --- MOCK DATA ALIGNED WITH BLOCKCHAIN ARCHITECTURE ---
// In a real DApp, this would be a connected user's wallet address from Metamask/etc.
const MOCK_USER_WALLET_ADDRESS = "0xAbC123...fEd456";

type UsageProof = {
    item: string;
    amount: number;
    verified: boolean;
    // Link to proof document (e.g., receipt scan) on IPFS
    proofIpfsHash: string | null;
    // The transaction hash of the verification/milestone approval
    verificationTransactionHash: string | null;
};

type BlockchainTransaction = {
    transactionHash: string;
    donorAddress: string;
    // Donor name could be from a profile linked to the address, or "Anonymous"
    donorName: string;
    amount: number;
    campaign: string;
    timestamp: string;
    status: 'confirmed' | 'pending' | 'failed';
    blockNumber: number | null;
    usage: UsageProof[];
};

const MOCK_TRANSACTIONS: BlockchainTransaction[] = [
  { transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b", donorAddress: MOCK_USER_WALLET_ADDRESS, donorName: "Priya (from Wallet)", amount: 5000, campaign: "Little Priya's School Books", timestamp: "2024-07-15T10:30:00Z", status: "confirmed", blockNumber: 18945672, usage: [
      { item: "School books purchase", amount: 2000, verified: true, proofIpfsHash: "QmXoW8s...Y4Z", verificationTransactionHash: "0x...1111" },
      { item: "Uniform tailoring", amount: 1500, verified: true, proofIpfsHash: "QmYp9X...A5B", verificationTransactionHash: "0x...2222" },
      { item: "Stationery supplies", amount: 1000, verified: true, proofIpfsHash: "QmZa7B...C9D", verificationTransactionHash: "0x...3333" },
      { item: "Platform fee (5%)", amount: 250, verified: true, proofIpfsHash: "QmBv3D...E8F", verificationTransactionHash: "0x...4444" },
      { item: "Funds remaining", amount: 250, verified: false, proofIpfsHash: null, verificationTransactionHash: null }
  ]},
  { transactionHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f2b3c4d", donorAddress: "0xAnonymous...789", donorName: "Anonymous Hero", amount: 10000, campaign: "Clean Water for Rampur", timestamp: "2024-07-14T15:45:00Z", status: "confirmed", blockNumber: 18945234, usage: [
      { item: "Water purification system", amount: 8000, verified: true, proofIpfsHash: "QmCdeFg...G1H", verificationTransactionHash: "0x...5555" },
      { item: "System installation labor", amount: 1500, verified: true, proofIpfsHash: "QmHijKl...M2N", verificationTransactionHash: "0x...6666" },
      { item: "Platform fee (5%)", amount: 500, verified: true, proofIpfsHash: "QmOpQr...S3T", verificationTransactionHash: "0x...7777" }
  ]},
  { transactionHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f3c4d5e6f", donorAddress: "0xRahul...abc", donorName: "Rahul from Delhi", amount: 2500, campaign: "Emergency Food Relief", timestamp: "2024-07-13T09:20:00Z", status: "pending", blockNumber: null, usage: [] },
];


const fundAllocation = {
  totalRaised: 2500000,
  categories: [
    { name: "Education", percentage: 32, color: "bg-warm-blue", description: "Books, uniforms, and digital learning for underprivileged children." },
    { name: "Healthcare", percentage: 24, color: "bg-warm-green", description: "Medicines, check-ups, and critical surgeries for those in need." },
    { name: "Food & Nutrition", percentage: 16, color: "bg-warm-orange", description: "Hot meals and nutritional support for children and the elderly." },
    { name: "Water & Sanitation", percentage: 12, color: "bg-blue-400", description: "Clean drinking water projects and hygiene awareness campaigns." },
    { name: "Emergency Relief", percentage: 16, color: "bg-red-500", description: "Immediate support for families affected by natural disasters." }
  ]
};

// --- HELPER COMPONENT: Transaction Detail Modal ---
const DetailModal = ({ tx, onClose }: { tx: BlockchainTransaction, onClose: () => void }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="warm-card w-full max-w-3xl transform-none" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4"><h3 className="text-2xl font-handwritten font-bold text-warm-charcoal">Complete Audit Trail</h3><Button variant="ghost" size="icon" onClick={onClose}><X /></Button></div>
            <div className="space-y-4">
                <div className="flex justify-between items-center bg-warm-cream p-3 rounded-lg">
                    <div><p className="text-sm text-warm-charcoal-light font-handwritten">Donation to</p><p className="font-bold text-warm-charcoal">{tx.campaign}</p></div>
                    <div className="text-right"><p className="text-sm text-warm-charcoal-light font-handwritten">Amount</p><p className="font-bold text-2xl text-warm-green">₹{tx.amount.toLocaleString()}</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-warm-cream/50 p-3 rounded-lg"><p className="text-warm-charcoal-light">Donor</p><p className="font-bold text-warm-charcoal">{tx.donorName}</p></div>
                    <div className="bg-warm-cream/50 p-3 rounded-lg"><p className="text-warm-charcoal-light">Timestamp</p><p className="font-bold text-warm-charcoal">{new Date(tx.timestamp).toLocaleString()}</p></div>
                    <div className="bg-warm-cream/50 p-3 rounded-lg"><p className="text-warm-charcoal-light">Donor Address</p><p className="font-mono text-xs text-warm-blue truncate">{tx.donorAddress}</p></div>
                    <div className="bg-warm-cream/50 p-3 rounded-lg"><p className="text-warm-charcoal-light">Block Number</p><p className="font-mono text-xs text-warm-blue">{tx.blockNumber ? `#${tx.blockNumber}` : 'Processing...'}</p></div>
                    <div className="bg-warm-cream/50 p-3 rounded-lg col-span-1 md:col-span-2">
                        <div className="flex justify-between items-center">
                            <div><p className="text-warm-charcoal-light">Blockchain Transaction ID</p><p className="font-mono text-[10px] md:text-xs text-warm-blue break-all">{tx.transactionHash}</p></div>
                            {tx.status === 'confirmed' && (
                                <Button variant="outline" size="sm" asChild className="ml-2 flex-shrink-0">
                                    <a href={`https://etherscan.io/tx/${tx.transactionHash}`} target="_blank" rel="noopener noreferrer">View on Etherscan <ExternalLink className="h-3 w-3 ml-1"/></a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                {tx.usage.length > 0 && (
                    <div>
                        <h4 className="font-handwritten text-lg font-bold text-warm-charcoal mt-4 mb-2">Fund Usage & Proof-of-Impact</h4>
                        <div className="space-y-2">{tx.usage.map((use, idx) => (<div key={idx} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                            <div><p className="font-handwritten font-medium text-warm-charcoal">{use.item}</p><p className="text-sm font-bold text-warm-green">₹{use.amount.toLocaleString()}</p></div>
                            <div className="flex items-center space-x-2">
                                {use.verified && use.proofIpfsHash ? (
                                    <Button variant="ghost" size="sm" asChild className="text-warm-blue hover:bg-warm-blue/10"><a href={`https://ipfs.io/ipfs/${use.proofIpfsHash}`} target="_blank" rel="noopener noreferrer">View Proof <ExternalLink className="h-3 w-3 ml-1"/></a></Button>
                                ) : null}
                                {use.verified ? <div className="flex items-center text-sm text-warm-green"><CheckCircle className="h-4 w-4 mr-1"/>Verified</div> : <div className="flex items-center text-sm text-warm-golden"><Clock className="h-4 w-4 mr-1"/>Pending</div>}
                            </div>
                        </div>))}</div>
                    </div>
                )}
            </div>
        </motion.div>
    </motion.div>
);

// --- MAIN PAGE COMPONENT ---
export function TransparencyPage() {
  // --- STATE MANAGEMENT ---
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'my_transactions'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<BlockchainTransaction | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<(typeof fundAllocation.categories[0]) | null>(null);
  
  // Simulate checking for a connected wallet
  const [userWalletAddress] = useState<string | null>(MOCK_USER_WALLET_ADDRESS);

  // --- DATA FETCHING ---
  useEffect(() => {
    // In a real application, this would be an API call to your backend.
    // The backend would fetch data from the blockchain and your database (e.g., MongoDB for metadata).
    // e.g., const response = await fetch('/api/transparency/transactions');
    const fetchTransactions = async () => {
        try {
            setIsLoading(true);
            // Simulate network delay for fetching from blockchain/backend
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // On successful fetch, set the data.
            setTransactions(MOCK_TRANSACTIONS);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch transaction data:", err);
            setError("Could not load transaction data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchTransactions();
  }, []);

  // --- FILTERING LOGIC ---
  const filteredTransactions = transactions
    .filter(tx => {
        if (filter === 'my_transactions' && userWalletAddress) {
            return tx.donorAddress === userWalletAddress;
        }
        return true;
    })
    .filter(tx =>
        tx.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.campaign.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* SECTION 1: HERO */}
      <section className="py-20 bg-gradient-to-br from-warm-orange/10 via-warm-cream to-warm-green/10 relative overflow-hidden">
        <div className="absolute inset-0 mandala-bg"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-handwritten font-bold mb-6 text-warm-charcoal"><span className="inline-block transform -rotate-2 text-warm-orange">Your Trust,</span><br /><span className="inline-block transform rotate-1">Verified On-Chain</span></h1>
                <p className="text-xl md:text-2xl text-warm-charcoal-light mb-8 leading-relaxed">We believe every act of kindness deserves absolute clarity. Here, you can trace every rupee on an immutable blockchain ledger, from donation to impact.</p>
            </motion.div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE FUND ALLOCATION */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 paper-texture"></div>
        <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-4xl font-handwritten font-bold text-warm-charcoal mb-4 transform -rotate-1">How We Allocate Your Kindness 💝</h2>
                <p className="text-xl text-warm-charcoal-light">Our funding categories are governed by transparent rules. Hover to learn more.</p>
            </motion.div>
            <div className="max-w-4xl mx-auto">
                <div className="flex rounded-full h-8 w-full overflow-hidden border-2 border-white shadow-lg mb-4">{fundAllocation.categories.map(cat => (<div key={cat.name} style={{ width: `${cat.percentage}%` }} onMouseEnter={() => setHoveredCategory(cat)} onMouseLeave={() => setHoveredCategory(null)} className={`h-full transition-all duration-300 ${cat.color} ${hoveredCategory && hoveredCategory.name !== cat.name ? 'opacity-50' : ''}`} />))}</div>
                <div className="h-24 mt-8"><AnimatePresence mode="wait">{hoveredCategory ? (<motion.div key={hoveredCategory.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center"><h3 className="text-2xl font-handwritten font-bold text-warm-charcoal">{hoveredCategory.name} ({hoveredCategory.percentage}%)</h3><p className="text-warm-charcoal-light">{hoveredCategory.description}</p></motion.div>) : <p className="text-center text-warm-charcoal-light font-handwritten">Hover over a color to see the details!</p>}</AnimatePresence></div>
            </div>
        </div>
      </section>

      {/* SECTION 3: TRANSACTION EXPLORER */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-4xl font-handwritten font-bold text-warm-charcoal mb-4 transform rotate-1">The Ledger of Truth 🔍</h2>
                <p className="text-xl text-warm-charcoal-light max-w-3xl mx-auto">Each donation is immutably recorded. Fund usage is verified on-chain, with proof stored on IPFS. Search for any transaction to trace its journey.</p>
            </motion.div>
            <div className="max-w-4xl mx-auto mb-8 space-y-4">
                {userWalletAddress && (
                  <div className="flex justify-center gap-2 sm:gap-4">
                      <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'} className="font-handwritten text-base">All Transactions</Button>
                      <Button onClick={() => setFilter('my_transactions')} variant={filter === 'my_transactions' ? 'default' : 'outline'} className="font-handwritten text-base">My Transactions</Button>
                  </div>
                )}
                <div className="relative"><Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-warm-orange" /><input type="text" placeholder="Search by name, address, transaction hash, or campaign..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 border-2 border-warm-orange/30 rounded-xl focus:border-warm-orange focus:outline-none font-handwritten text-lg bg-white" /></div>
            </div>
            
            {/* --- DYNAMIC CONTENT AREA --- */}
            <div className="grid md:grid-cols-2 gap-8">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => ( // Skeleton Loaders
                  <div key={index} className="warm-card animate-pulse"><div className="h-6 bg-warm-cream/80 rounded w-3/4 mb-4"></div><div className="h-4 bg-warm-cream/80 rounded w-1/2 mb-6"></div><div className="bg-warm-cream/50 p-3 rounded-lg space-y-2"><div className="h-4 bg-warm-cream/80 rounded w-full"></div><div className="h-4 bg-warm-cream/80 rounded w-5/6"></div></div><div className="h-10 bg-warm-cream/80 rounded w-full mt-4"></div></div>
                ))
              ) : error ? (
                <div className="md:col-span-2 text-center py-12 bg-red-100/50 rounded-lg"><XCircle className="mx-auto h-12 w-12 text-red-500" /><h3 className="mt-2 text-xl font-handwritten font-bold text-red-700">Oops! Something went wrong.</h3><p className="mt-1 text-red-600">{error}</p></div>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, index) => (
                  <motion.div key={tx.transactionHash} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="warm-card group hover:shadow-handmade transition-all duration-300 transform hover:-translate-y-2">
                      <div className="flex justify-between items-start mb-4">
                          <div><p className="font-handwritten font-bold text-lg text-warm-charcoal">{tx.donorName}</p><span className={`flex items-center text-xs font-bold ${tx.status === 'confirmed' ? 'text-warm-green' : 'text-warm-golden'}`}>{tx.status === 'confirmed' ? <><CheckCircle className="h-4 w-4 mr-1"/>Confirmed</> : <><Clock className="h-4 w-4 mr-1"/>Pending</>}</span></div>
                          <p className="text-2xl font-bold text-warm-green font-handwritten">₹{tx.amount.toLocaleString()}</p>
                      </div>
                      <div className="bg-warm-cream/80 p-3 rounded-lg text-sm space-y-2">
                          <p><strong className="text-warm-charcoal-light">Campaign:</strong> {tx.campaign}</p>
                          <p className="truncate"><strong className="text-warm-charcoal-light">Txn Hash:</strong> <span className="font-mono text-warm-blue">{tx.transactionHash}</span></p>
                      </div>
                      <Button onClick={() => setSelectedTransaction(tx)} variant="ghost" className="w-full mt-4 font-handwritten text-warm-blue hover:bg-warm-blue/10 hover:text-warm-blue-dark"><Eye className="h-4 w-4 mr-2"/>View Audit Trail</Button>
                  </motion.div>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-12"><div className="text-6xl mb-4">🤷</div><h3 className="text-2xl font-handwritten font-bold text-warm-charcoal mb-2">No results found</h3><p className="text-warm-charcoal-light font-handwritten">Try a different search term or change the filter!</p></div>
              )}
            </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-warm-orange via-warm-golden to-warm-green rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                        <h2 className="text-4xl md:text-6xl font-handwritten font-bold mb-6 transform -rotate-1">Trust Built, Hearts Connected 🤝</h2>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">This is what transparency looks like. Join our family of transparent giving and donate with complete confidence.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button asChild variant="secondary" size="handmade" className="bg-white text-warm-blue hover:bg-warm-cream transform hover:scale-110 hover:-rotate-2 shadow-handmade font-handwritten font-bold"><Link to="/donate"><Heart className="mr-3 h-5 w-5 animate-heart-beat" fill="currentColor" />Donate with Confidence</Link></Button>
                            <Button asChild variant="outline" size="handmade" className="border-2 border-white text-white hover:bg-white hover:text-warm-blue transform hover:rotate-1 font-handwritten"><Link to="/impact">See Real Impact</Link></Button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
      </section>

      <AnimatePresence>{selectedTransaction && <DetailModal tx={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}</AnimatePresence>
    </div>
  )
}