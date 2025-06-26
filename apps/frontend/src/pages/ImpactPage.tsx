import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, X, CheckCircle, Loader, ArrowRight } from 'lucide-react'
// Update the import path below to your actual Button component location if needed
// Fallback Button if '../../components/ui/button' does not exist
const Button = (props: any) => <button {...props} />;

type ImpactStatus = {
  name: string
  status: string
}

type Transaction = {
  id: string
  hash: string
  from: string
  to: string
  amount: number
  campaign: string
  wish: string
  block: number
  timestamp: string
  nonce: number
  gasUsed: string
  gasPrice: string
  fee: number
  impactStatus: ImpactStatus[]
}

type Lantern = {
  tx: Transaction
  x: string
  duration: number
}

// --- MOCK DATA (Expanded to 15 transactions) ---
const mockTransactions: Transaction[] = [
  { id: '0x1a2b', hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2', from: '0x3c4d...a1b2', to: 'DilSeDaan.eth', amount: 0.5, campaign: 'Educate a Child', wish: 'For a brighter future.', block: 1234567, timestamp: '10 secs ago', nonce: 101, gasUsed: '21,000', gasPrice: '30 Gwei', fee: 0.00063, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Education', status: 'Complete'}, {name: 'Books & Supplies Purchased', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0x5e6f', hash: '0x5e6f7g8h9i0j1k2l3m4n5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5', from: '0x7g8h...c3d4', to: 'DilSeDaan.eth', amount: 1.2, campaign: 'Clean Water', wish: 'A small drop of hope.', block: 1234566, timestamp: '1 min ago', nonce: 45, gasUsed: '25,000', gasPrice: '32 Gwei', fee: 0.0008, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Water Project', status: 'Complete'}, {name: 'Well-Drilling Commenced', status: 'Complete'}, {name: 'Impact Report Filed', status: 'Complete'}] },
  { id: '0x8h9i', hash: '0x8h9i0j1k2l3m4n5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l', from: '0x9j0k...d5e6', to: 'DilSeDaan.eth', amount: 0.75, campaign: 'Animal Shelter', wish: 'For our furry friends.', block: 1234565, timestamp: '3 mins ago', nonce: 12, gasUsed: '22,000', gasPrice: '28 Gwei', fee: 0.000616, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Animal Welfare', status: 'Complete'}, {name: 'Food & Medicine Procured', status: 'Complete'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0x2l3m', hash: '0x2l3m4n5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0', from: '0x4n5p...f7g8', to: 'DilSeDaan.eth', amount: 3.0, campaign: 'Disaster Relief', wish: 'Sending strength and support.', block: 1234564, timestamp: '5 mins ago', nonce: 88, gasUsed: '30,000', gasPrice: '35 Gwei', fee: 0.00105, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Disaster Relief', status: 'Complete'}, {name: 'Emergency Supplies Deployed', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0xabcd', hash: '0xabcd1234567890efabcd1234567890efabcd1234567890efabcd1234567890', from: '0x5q6r...h9i0', to: 'DilSeDaan.eth', amount: 0.2, campaign: 'Mid-Day Meals', wish: 'No child should go hungry.', block: 1234563, timestamp: '8 mins ago', nonce: 203, gasUsed: '21,500', gasPrice: '31 Gwei', fee: 0.000666, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Meal Program', status: 'Complete'}, {name: 'Meals Served Today', status: 'Complete'}, {name: 'Impact Report Filed', status: 'Complete'}] },
  { id: '0xefgh', hash: '0xefgh1234567890abcd1234567890efabcd1234567890efabcd1234567890', from: '0x1s2t...j1k2', to: 'DilSeDaan.eth', amount: 1.5, campaign: 'Women Empowerment', wish: 'Supporting strong women.', block: 1234562, timestamp: '12 mins ago', nonce: 5, gasUsed: '28,000', gasPrice: '33 Gwei', fee: 0.000924, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Skills Training', status: 'Complete'}, {name: 'Training Workshop Started', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0xijkl', hash: '0xijkl1234567890efgh1234567890abcd1234567890efgh1234567890abcd', from: '0x3u4v...l3m4', to: 'DilSeDaan.eth', amount: 0.1, campaign: 'Educate a Child', wish: 'A small gift for education.', block: 1234561, timestamp: '15 mins ago', nonce: 301, gasUsed: '21,000', gasPrice: '30 Gwei', fee: 0.00063, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Education', status: 'Complete'}, {name: 'Books & Supplies Purchased', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0xmnop', hash: '0xmnop1234567890ijkl1234567890efgh1234567890abcd1234567890efgh', from: '0x5w6x...n5p6', to: 'DilSeDaan.eth', amount: 5.0, campaign: 'Build a Home', wish: 'A roof for a family.', block: 1234560, timestamp: '20 mins ago', nonce: 150, gasUsed: '35,000', gasPrice: '40 Gwei', fee: 0.0014, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Housing', status: 'Complete'}, {name: 'Foundation Laid', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0xqrst', hash: '0xqrst1234567890mnop1234567890ijkl1234567890efgh1234567890abcd', from: '0x7y8z...q7r8', to: 'DilSeDaan.eth', amount: 0.3, campaign: 'Clean Water', wish: 'Clean water for all.', block: 1234559, timestamp: '25 mins ago', nonce: 77, gasUsed: '25,500', gasPrice: '32 Gwei', fee: 0.000816, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Water Project', status: 'Complete'}, {name: 'Well-Drilling Commenced', status: 'Complete'}, {name: 'Impact Report Filed', status: 'Complete'}] },
  { id: '0xuvwx', hash: '0xuvwx1234567890qrst1234567890mnop1234567890ijkl1234567890efgh', from: '0x9a0b...s9t0', to: 'DilSeDaan.eth', amount: 0.8, campaign: 'Senior Citizen Care', wish: 'Respect for our elders.', block: 1234558, timestamp: '30 mins ago', nonce: 19, gasUsed: '23,000', gasPrice: '29 Gwei', fee: 0.000667, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Senior Care', status: 'Complete'}, {name: 'Monthly Support Provided', status: 'Complete'}, {name: 'Impact Report Filed', status: 'Complete'}] },
  { id: '0x5678', hash: '0x567890abcdef1234567890abcdef1234567890abcdef12345678901234', from: '0x4e5f...w3x4', to: 'DilSeDaan.eth', amount: 2.5, campaign: 'Educate a Child', wish: 'Investing in the future.', block: 1234556, timestamp: '40 mins ago', nonce: 99, gasUsed: '21,000', gasPrice: '30 Gwei', fee: 0.00063, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Education', status: 'Complete'}, {name: 'Books & Supplies Purchased', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0x90ab', hash: '0x90abcdef1234567890abcdef1234567890abcdef1234567890567890ab', from: '0x6g7h...y5z6', to: 'DilSeDaan.eth', amount: 0.6, campaign: 'Mid-Day Meals', wish: 'A full stomach smiles.', block: 1234555, timestamp: '45 mins ago', nonce: 1, gasUsed: '21,800', gasPrice: '31 Gwei', fee: 0.0006758, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Meal Program', status: 'Complete'}, {name: 'Meals Served Today', status: 'Complete'}, {name: 'Impact Report Filed', status: 'Complete'}] },
  { id: '0xcdef', hash: '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef123456', from: '0x8i9j...a7b8', to: 'DilSeDaan.eth', amount: 1.0, campaign: 'Disaster Relief', wish: 'Rebuilding lives.', block: 1234554, timestamp: '50 mins ago', nonce: 123, gasUsed: '30,500', gasPrice: '35 Gwei', fee: 0.0010675, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Disaster Relief', status: 'Complete'}, {name: 'Emergency Supplies Deployed', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
  { id: '0x0123', hash: '0x0123456789abcdef1234567890abcdef1234567890abcdef1234567890', from: '0x0k1l...c9d0', to: 'DilSeDaan.eth', amount: 0.9, campaign: 'Women Empowerment', wish: 'Empower a woman, empower a nation.', block: 1234553, timestamp: '55 mins ago', nonce: 404, gasUsed: '28,200', gasPrice: '33 Gwei', fee: 0.0009306, impactStatus: [{name: 'Funds Received', status: 'Complete'}, {name: 'Allocated to Skills Training', status: 'Complete'}, {name: 'Training Workshop Started', status: 'In Progress'}, {name: 'Impact Report Filed', status: 'Pending'}] },
];

// --- HELPER COMPONENT: The Ultimate Two-Column Explorer Modal ---
const DetailModal = ({
  tx,
  onClose,
}: {
  tx: Transaction | null
  onClose: () => void
}) => {
  if (!tx) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900/90 border border-white/10 rounded-2xl w-full max-w-2xl mx-auto p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10"
        >
          <X />
        </Button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-warm-orange">{tx.campaign}</h3>
            <p className="italic text-white/80 mb-4">"{tx.wish}"</p>
            <div className="mb-2">
              <span className="font-mono text-green-400 text-lg">{tx.amount} MATIC</span>
            </div>
            <div className="text-xs text-white/60 mb-2">
              <span>From: {tx.from}</span>
              <br />
              <span>To: {tx.to}</span>
            </div>
            <div className="text-xs text-white/60 mb-2">
              <span>Tx Hash: {tx.hash}</span>
              <br />
              <span>Block: {tx.block}</span>
              <br />
              <span>Timestamp: {tx.timestamp}</span>
            </div>
            <div className="text-xs text-white/60 mb-2">
              <span>Nonce: {tx.nonce}</span>
              <br />
              <span>Gas Used: {tx.gasUsed}</span>
              <br />
              <span>Gas Price: {tx.gasPrice}</span>
              <br />
              <span>Fee: {tx.fee} MATIC</span>
            </div>
            <div className="mt-6">
              <h4 className="font-bold text-white mb-2">Impact Status</h4>
              <ul className="space-y-2">
                {tx.impactStatus.map((item: ImpactStatus, index: number) => (
                  <li key={index} className="flex items-center space-x-3">
                    {item.status === 'Complete' ? (
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <Loader className="h-5 w-5 text-yellow-500 animate-spin flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-sm text-white">{item.name}</p>
                      <p className="text-xs text-white/70">{item.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- HELPER COMPONENT: Full Ledger Modal with Rich Data ---
const FullLedgerModal = ({
  allPlaques,
  onSelectTx,
  onClose,
}: {
  allPlaques: Transaction[]
  onSelectTx: (tx: Transaction) => void
  onClose: () => void
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-gray-900/90 border border-white/10 rounded-2xl w-full max-w-3xl mx-auto p-8 relative flex flex-col"
      onClick={e => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10"
      >
        <X />
      </Button>
      <div className="overflow-y-auto pr-4 flex-grow">
        <div className="grid grid-cols-4 text-sm font-bold text-white/60 p-3 mb-2 sticky top-0 bg-gray-900/80 backdrop-blur-sm">
          <span>Campaign</span>
          <span>Amount</span>
          <span>Transaction Hash</span>
          <span>Timestamp</span>
        </div>
        {allPlaques.map((plaque: Transaction) => (
          <button
            key={plaque.id}
            onClick={() => onSelectTx(plaque)}
            className="w-full grid grid-cols-4 gap-4 text-left p-3 mb-2 rounded-lg hover:bg-white/5 transition-colors text-sm"
          >
            <div>
              <p className="font-bold text-warm-orange truncate">{plaque.campaign}</p>
              <p className="text-xs text-white/60 italic">"{plaque.wish}"</p>
            </div>
            <div className="text-green-400 font-mono">{plaque.amount} MATIC</div>
            <div className="font-mono text-sm text-blue-400 truncate">{plaque.hash}</div>
            <div className="text-white/60 text-xs font-mono">{plaque.timestamp}</div>
          </button>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

// --- MAIN PAGE COMPONENT ---
export function ImpactPage() {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [allPlaques, setAllPlaques] = useState<Transaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isFullLedgerVisible, setFullLedgerVisible] = useState(false);

  useEffect(() => {
    setAllPlaques(mockTransactions);
    // Only run once on mount, not on every allPlaques change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const baseTx = mockTransactions[Math.floor(Math.random() * mockTransactions.length)];
      const newTx: Transaction = {
        ...baseTx,
        id: Date.now().toString(),
        timestamp: `~${Math.floor(Math.random() * 5) + 1} secs ago`,
        block: allPlaques.length > 0 ? allPlaques[0].block + 1 : 1234568,
      };
      const newLantern: Lantern = {
        tx: newTx,
        x: `${Math.random() * 80 + 10}%`,
        duration: Math.random() * 25 + 30,
      };
      setLanterns(prev => [newLantern, ...prev.slice(0, 14)]);
      setAllPlaques(prev => [newTx, ...prev]);
    }, 4500);
    return () => clearInterval(interval);
  }, [allPlaques]);

  return (
    <div className="bg-[#10141c] text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#10141c] via-[#1a202c] to-[#2d3748]" />
      </div>

      <main className="relative z-10">
        {/* SECTION 1: HERO TITLE */}
        <section className="h-screen flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-handwritten font-bold mb-4 transform -rotate-1">Lanterns of Hope</h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">Each light is a real wish, a real donation. Below lies the immutable record of kindness they leave behind.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: LIVE LEDGER & LANTERN ORIGIN */}
<section className="py-20 bg-[#2d3748] relative">
  <div className="absolute -top-32 inset-x-0 h-screen pointer-events-none z-0">
    <AnimatePresence>
      {lanterns.map(lantern => (
        <motion.button
          key={lantern.tx.id}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-100vh', opacity: [0.7, 1, 1, 0] }}
          transition={{ duration: lantern.duration, ease: "linear" }}
          style={{ left: lantern.x }}
          className="absolute w-20 h-24 pointer-events-auto"
          aria-label={`Lantern from ${lantern.tx.from}`}
          onClick={() => setSelectedTx(lantern.tx)}
        >
          <div className="relative w-full h-full animate-flicker">
            <div className="absolute top-0 w-full h-16 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t-full rounded-b-sm opacity-80" />
            <div className="absolute top-4 w-full h-12 bg-yellow-300 rounded-full blur-xl" />
          </div>
        </motion.button>
      ))}
    </AnimatePresence>
  </div>
    
  <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-handwritten font-bold mb-4 transform -rotate-1">The Ledger of Kindness</h2>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto">A live, verifiable record of every act of generosity, forever etched on the blockchain.</p>
              </div>
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold">Live Transactions</h3><Button variant="ghost" onClick={() => setFullLedgerVisible(true)} className="text-white/70 hover:text-white hover:bg-white/10">View Full Ledger <ArrowRight className="h-4 w-4 ml-2" /></Button></div>
                <div className="h-[500px] overflow-y-auto pr-2">
                    <AnimatePresence>
                      {allPlaques.slice(0, 50).map((plaque, index) => (
                        <motion.button layout key={plaque.id} initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} onClick={() => setSelectedTx(plaque)} className={`w-full grid grid-cols-2 md:grid-cols-5 gap-4 text-left p-3 rounded-lg transition-colors text-sm ${index === 0 ? "bg-green-500/20 animate-[pulse_2s_ease-out_1]" : "hover:bg-white/5"}`}>
                          <div className="font-mono text-blue-400 truncate hidden md:block">{plaque.hash.substring(0,10)}...</div>
                          <p className="font-bold text-warm-orange truncate col-span-2 md:col-span-1">{plaque.campaign}</p>
                          <div className="font-mono text-white/80 truncate hidden md:block">{plaque.from}</div>
                          <div className="text-green-400 font-bold text-right md:text-left">{plaque.amount} MATIC</div>
                          <div className="text-white/60 italic truncate hidden md:block">"{plaque.wish}"</div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: IGNITE YOUR LANTERN (CTA) */}
        <section className="py-20 bg-[#10141c]">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <h2 className="text-4xl md:text-5xl font-handwritten font-bold text-white mb-4 transform -rotate-1">Ignite Your Lantern ✨</h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">Add your own light to the sky and etch your wish on the ledger. Find a cause that speaks to your heart.</p>
                <Button asChild size="handmade" className="transform hover:scale-105 shadow-lg bg-warm-orange hover:bg-yellow-500 text-black px-12 py-8 text-xl">
                    <Link to="/campaigns"><Heart className="mr-3 h-6 w-6" />Choose a Cause to Support</Link>
                </Button>
            </motion.div>
          </div>
        </section>
      <AnimatePresence>
        {selectedTx && <DetailModal tx={selectedTx} onClose={() => setSelectedTx(null)} />}
        {isFullLedgerVisible && (
          <FullLedgerModal
            allPlaques={allPlaques}
            onSelectTx={(tx) => {
              setFullLedgerVisible(false);
              setSelectedTx(tx);
            }}
            onClose={() => setFullLedgerVisible(false)}
          />
        )}
      </AnimatePresence>
      </main>
    </div>
  );
}