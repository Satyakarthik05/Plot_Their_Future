import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Sparkles, 
  QrCode, 
  Home, 
  Gift, 
  Maximize2, 
  Minimize2, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Users 
} from 'lucide-react';
import { REGISTRY_DATA } from '../data/mockData';

export default function VenueWallView({ fundedSqFt, totalSqFt, blessings, onNavigateToSimulator }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentBlessingIdx, setCurrentBlessingIdx] = useState(0);

  // Auto-rotate the active live blessing on screen every 5 seconds
  useEffect(() => {
    if (blessings.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBlessingIdx((prev) => (prev + 1) % blessings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blessings]);

  const percentage = Math.round((fundedSqFt / totalSqFt) * 100);
  const totalAmount = fundedSqFt * REGISTRY_DATA.metrics.costPerSqFt;
  const activeBlessing = blessings[currentBlessingIdx] || blessings[0];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div style={{ background: '#070D1E', color: '#FFFFFF', minHeight: '100vh', paddingBottom: 60, position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Bar */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(16px)', padding: '16px 24px' }}>
        <div className="ptf-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--emerald-500)', display: 'inline-block' }} />
            <div>
              <span style={{ fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>
                Reception Banquet Live Projection
              </span>
              <h2 style={{ fontFamily: 'var(--font-royal)', fontSize: '1.125rem', fontWeight: 800 }}>
                Grand Reception • Digital Donor LED Screen
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Simulating 60-ft Venue Stage Display
            </span>
            <button
              onClick={toggleFullscreen}
              style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {isFullscreen ? <Minimize2 style={{ width: 14, height: 14 }} /> : <Maximize2 style={{ width: 14, height: 14 }} />}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="ptf-container" style={{ paddingTop: 36 }}>
        
        {/* Main Stage Spotlight Card */}
        <div className="ptf-venue-grid">
          
          {/* Left: Couple & Dream Home Progress */}
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 28, padding: 'clamp(18px, 4vw, 32px)', backdropFilter: 'blur(20px)', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="ptf-badge ptf-badge-gold">
                Blessings that Build
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                RERA Reg. P02400008921
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-royal)', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: 8 }}>
              SANVI <span style={{ fontFamily: 'var(--font-script)', fontWeight: 400, color: 'var(--gold-400)', fontSize: '1.2em' }}>&</span> SANTOSH
            </h1>
            <p style={{ fontSize: '0.938rem', color: '#CBD5E1', marginBottom: 28 }}>
              1,200 SQ.FT. Dream Sanctuary • SkyHigh Enclave, Flat 1402
            </p>

            {/* Giant Progress Bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: 'var(--emerald-500)', lineHeight: 1 }}>
                  {fundedSqFt} <span style={{ fontSize: '1.125rem', color: '#94A3B8', fontWeight: 400 }}>/ {totalSqFt} SFT</span>
                </span>
                <span style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--gold-400)', lineHeight: 1 }}>
                  {percentage}%
                </span>
              </div>

              <div style={{ width: '100%', height: 18, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 9999, overflow: 'hidden', padding: 2, border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <div 
                  style={{ height: '100%', borderRadius: 9999, background: 'var(--grad-gold)', width: `${percentage}%`, transition: 'width 1s ease', boxShadow: '0 0 16px rgba(245, 158, 11, 0.6)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: 8 }}>
                <span>Corpus in Escrow: ₹{(totalAmount / 100000).toFixed(2)} Lakhs</span>
                <span>Remaining: {totalSqFt - fundedSqFt} SFT</span>
              </div>
            </div>

            {/* 3 Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 18, textAlign: 'center' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: 14, padding: 12 }}>
                <div style={{ fontSize: '0.625rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Contributors</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: 4 }}>{blessings.length + 52} Loved Ones</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: 14, padding: 12 }}>
                <div style={{ fontSize: '0.625rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Bank Security</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--emerald-500)', marginTop: 4 }}>Tripartite Escrow</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: 14, padding: 12 }}>
                <div style={{ fontSize: '0.625rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Tax Exemption</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gold-400)', marginTop: 4 }}>Sec 56(2)(x)</div>
              </div>
            </div>

          </div>

          {/* Right: Table QR Stand */}
          <div style={{ background: 'linear-gradient(180deg, #101C3D 0%, #070D1E 100%)', borderRadius: 28, padding: 'clamp(18px, 4vw, 32px)', border: '2px solid rgba(217, 119, 6, 0.4)', textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(245, 158, 11, 0.2)', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <QrCode style={{ width: 24, height: 24 }} />
            </div>

            <span style={{ fontSize: '0.688rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>
              Scan from Your Banquet Table
            </span>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 800, margin: '6px 0 10px 0' }}>
              Gift a Square Foot & Bless
            </h3>

            <p style={{ fontSize: '0.813rem', color: '#CBD5E1', maxWidth: 300, margin: '0 auto 20px auto' }}>
              Point your smartphone camera to claim a tile, enter your blessings, and watch your deed appear live on this screen!
            </p>

            <div 
              onClick={onNavigateToSimulator}
              style={{ background: '#FFFFFF', padding: 18, borderRadius: 20, display: 'inline-block', border: '3px solid var(--gold-500)', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            >
              <div style={{ width: 170, height: 170, background: '#0B132B', borderRadius: 14, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <QrCode style={{ width: 150, height: 150, color: '#FFFFFF' }} />
                <div style={{ position: 'absolute', width: 36, height: 36, borderRadius: '50%', background: 'var(--marigold)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFFFFF' }}>
                  <Home style={{ width: 18, height: 18, color: '#FFFFFF' }} />
                </div>
              </div>
              <span style={{ display: 'block', fontSize: '0.688rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8 }}>
                Scan with UPI / Phone Camera
              </span>
            </div>

            <div style={{ marginTop: 16 }}>
              <button
                onClick={onNavigateToSimulator}
                style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-400)', textDecoration: 'underline' }}
              >
                Test Table Interaction in Demo →
              </button>
            </div>
          </div>

        </div>

        {/* Live Incoming Blessing Spotlight Ribbon */}
        {activeBlessing && (
          <div style={{ background: 'rgba(217, 119, 6, 0.12)', border: '1.5px solid rgba(245, 158, 11, 0.45)', borderRadius: 20, padding: 18, marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--gold-600)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, flexShrink: 0 }}>
                {activeBlessing.guestName.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF' }}>
                    {activeBlessing.guestName}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>({activeBlessing.relation})</span>
                  <span className="ptf-badge ptf-badge-emerald">
                    Gifted {activeBlessing.sqft} Sq.Ft. to {activeBlessing.roomName}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', fontStyle: 'italic', color: '#CBD5E1', marginTop: 4 }}>
                  "{activeBlessing.message}"
                </p>
              </div>
            </div>

            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 800, color: 'var(--gold-400)', background: 'rgba(0, 0, 0, 0.4)', padding: '6px 12px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', flexShrink: 0 }}>
              Deed #{activeBlessing.tileCode}
            </span>
          </div>
        )}

        {/* Founding Wall Grid */}
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 28, padding: 'clamp(18px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Users style={{ width: 22, height: 22, color: 'var(--gold-400)' }} />
              <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '1.25rem', fontWeight: 800 }}>
                The Founding Wall of Family & Friends
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Permanent Architectural Memento in Couple's Home
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {blessings.map((b) => (
              <div 
                key={b.id}
                style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 16, padding: 16 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#FFFFFF' }}>{b.guestName}</div>
                    <div style={{ fontSize: '0.688rem', color: '#94A3B8' }}>{b.relation}</div>
                  </div>
                  <span className="ptf-badge ptf-badge-gold" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--gold-400)' }}>
                    {b.sqft} SFT
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#CBD5E1', marginTop: 8 }}>
                  "{b.message}"
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
