import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MicrositeView from './components/MicrositeView';
import FloorPlanSimulator from './components/FloorPlanSimulator';
import VenueWallView from './components/VenueWallView';
import ArchitectureView from './components/ArchitectureView';
import HostDashboardView from './components/HostDashboardView';
import FlyerModal from './components/FlyerModal';
import { REGISTRY_DATA } from './data/mockData';
import { ShieldCheck, Heart, Home, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('microsite');
  const [fundedSqFt, setFundedSqFt] = useState(REGISTRY_DATA.metrics.fundedSqFt); // 420 SFT
  const [blessings, setBlessings] = useState(REGISTRY_DATA.recentBlessings);
  const [rsvpList, setRsvpList] = useState([]);
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Trigger floating toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // When a guest gifts tiles via the FloorPlanSimulator
  const handleTilePurchased = (newGift) => {
    setFundedSqFt((prev) => Math.min(prev + newGift.sqft, REGISTRY_DATA.metrics.totalSqFt));
    
    const newBlessingItem = {
      id: Date.now(),
      guestName: newGift.guestName,
      relation: newGift.relation,
      sqft: newGift.sqft,
      roomName: newGift.roomName,
      amount: newGift.amount,
      message: newGift.message,
      timestamp: "Just now",
      verifiedEscrow: true,
      tileCode: `TILE-${Math.floor(100 + Math.random() * 900)}`,
    };

    setBlessings([newBlessingItem, ...blessings]);
    triggerToast(`🎉 Successfully funded ${newGift.sqft} SFT! Escrow deed registered.`);
  };

  // When a guest submits a direct blessing in the guestbook
  const handleAddBlessing = (newBlessing) => {
    setBlessings([newBlessing, ...blessings]);
    triggerToast(`💌 Blessing posted to Sanvi & Santosh's Live Guestbook!`);
  };

  // When a guest submits an RSVP
  const handleAddRsvp = (rsvp) => {
    setRsvpList([rsvp, ...rsvpList]);
    triggerToast(`✅ RSVP confirmed for ${rsvp.name}!`);
  };

  // Reset demo state
  const handleResetData = () => {
    setFundedSqFt(REGISTRY_DATA.metrics.fundedSqFt);
    setBlessings(REGISTRY_DATA.recentBlessings);
    setRsvpList([]);
    triggerToast("🔄 Demo state reset to initial baseline (420 / 1,200 SFT).");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFlyer={() => setIsFlyerOpen(true)}
        onResetData={handleResetData}
        fundedSqFt={fundedSqFt}
        totalSqFt={REGISTRY_DATA.metrics.totalSqFt}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'microsite' && (
          <MicrositeView
            onNavigateToSimulator={() => setActiveTab('simulator')}
            onOpenFlyer={() => setIsFlyerOpen(true)}
            fundedSqFt={fundedSqFt}
            totalSqFt={REGISTRY_DATA.metrics.totalSqFt}
            blessings={blessings}
            onAddBlessing={handleAddBlessing}
            onAddRsvp={handleAddRsvp}
          />
        )}

        {activeTab === 'simulator' && (
          <FloorPlanSimulator
            fundedSqFt={fundedSqFt}
            totalSqFt={REGISTRY_DATA.metrics.totalSqFt}
            onTilePurchased={handleTilePurchased}
            onOpenFlyer={() => setIsFlyerOpen(true)}
          />
        )}

        {activeTab === 'venue' && (
          <VenueWallView
            fundedSqFt={fundedSqFt}
            totalSqFt={REGISTRY_DATA.metrics.totalSqFt}
            blessings={blessings}
            onNavigateToSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureView />
        )}

        {activeTab === 'dashboard' && (
          <HostDashboardView
            fundedSqFt={fundedSqFt}
            totalSqFt={REGISTRY_DATA.metrics.totalSqFt}
            blessings={blessings}
            rsvpList={rsvpList}
          />
        )}
      </main>

      {/* Global Footer (hidden only in fullscreen venue mode) */}
      {activeTab !== 'venue' && (
        <footer style={{ background: 'var(--navy-900)', color: '#FFFFFF', padding: '48px 0 24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="ptf-container">
            <div className="ptf-footer-grid">
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gold-500)', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Home style={{ width: 20, height: 20 }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-royal)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                    PLOT THEIR FUTURE
                  </span>
                </div>
                <p style={{ fontSize: '0.813rem', color: '#CBD5E1', maxWidth: 440, lineHeight: 1.6, marginBottom: 16 }}>
                  "Build Their First Home, One Square Foot at a Time!" The world's first fractional real estate wedding registry powered by RBI-regulated tripartite escrow accounts and RERA builder integration.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--emerald-500)', fontWeight: 700 }}>
                  <ShieldCheck style={{ width: 16, height: 16 }} />
                  <span>Sec 56(2)(x) Tax-Exempt Marriage Gift Compliance</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-400)', marginBottom: 14 }}>
                  Client Demo Modes
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.813rem', color: '#CBD5E1' }}>
                  <li>
                    <button onClick={() => setActiveTab('microsite')} style={{ color: '#CBD5E1' }}>
                      • Guest Microsite (Sanvi & Santosh)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('simulator')} style={{ color: '#CBD5E1' }}>
                      • 1,200 SFT Interactive Floor Plan
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('venue')} style={{ color: '#CBD5E1' }}>
                      • 60-ft Banquet LED Wall Simulation
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('architecture')} style={{ color: '#CBD5E1' }}>
                      • System Architecture & SOP Matrix
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('dashboard')} style={{ color: '#CBD5E1' }}>
                      • Host Administration Dashboard
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-400)', marginBottom: 14 }}>
                  Banking & Compliance
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.75rem', color: '#94A3B8' }}>
                  <li>• ICICI Tripartite Escrow Trust</li>
                  <li>• Telangana RERA Reg. P02400008921</li>
                  <li>• Anti-Concurrency 10-Min Lock</li>
                  <li>• &lt; 5s WhatsApp Receipt SLA</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <button
                    onClick={() => setIsFlyerOpen(true)}
                    style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-400)', textDecoration: 'underline' }}
                  >
                    Open Printable Gift Flyer →
                  </button>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', fontSize: '0.75rem', color: '#94A3B8' }}>
              <p>© 2026 PlotTheirFuture.in • Client Presentation Build v1.0</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>Designed with</span>
                <Heart style={{ width: 14, height: 14, color: '#DC2626', fill: '#DC2626' }} />
                <span>for the Indian Wedding & PropTech Ecosystem</span>
              </p>
            </div>
          </div>
        </footer>
      )}

      {/* Printable Flyer Modal */}
      <FlyerModal
        isOpen={isFlyerOpen}
        onClose={() => setIsFlyerOpen(false)}
        fundedSqFt={fundedSqFt}
        totalSqFt={REGISTRY_DATA.metrics.totalSqFt}
        onNavigateToSimulator={() => {
          setIsFlyerOpen(false);
          setActiveTab('simulator');
        }}
      />

      {/* Reactive Global Toast Notification */}
      {toastMessage && (
        <div className="ptf-toast animate-float">
          <Sparkles style={{ width: 16, height: 16, color: 'var(--gold-400)', flexShrink: 0 }} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
