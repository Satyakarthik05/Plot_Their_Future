import React from 'react';
import { 
  Printer, 
  Share2, 
  Download, 
  Home, 
  QrCode, 
  ShieldCheck, 
  Gift 
} from 'lucide-react';
import { REGISTRY_DATA } from '../data/mockData';

export default function FlyerModal({ isOpen, onClose, fundedSqFt, totalSqFt, onNavigateToSimulator }) {
  if (!isOpen) return null;

  const percentage = Math.round((fundedSqFt / totalSqFt) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ptf-modal-backdrop" onClick={onClose}>
      <div style={{ position: 'relative', maxWidth: 480, width: '92%', margin: '50px auto 20px auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: -42, right: 0, color: '#FFFFFF', fontWeight: 800, fontSize: '0.813rem', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: 10, backdropFilter: 'blur(8px)' }}
        >
          Close [✕]
        </button>

        {/* The Exact Wedding Gift Registry Flyer Card from User Image 2 */}
        <div 
          id="printable-flyer" 
          style={{
            background: '#FFFDF9',
            borderRadius: 24,
            padding: 'clamp(18px, 4vw, 32px)',
            border: '4px solid var(--gold-600)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Marigold Garland Border */}
          <div className="marigold-strip" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 16 }} />

          {/* Couple Names */}
          <h2 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.2rem, 7vw, 3rem)', color: 'var(--gold-700)', fontWeight: 400, marginTop: 14, marginBottom: 2 }}>
            Sanvi & Santosh
          </h2>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)', letterSpacing: '-0.01em', marginBottom: 2 }}>
            Wedding Gift Registry:
          </h1>

          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--gold-600)', marginBottom: 12 }}>
            Gift-a-Square-Foot
          </p>

          <div style={{ display: 'inline-block', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 9999, padding: '4px 16px', fontSize: '0.688rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 20 }}>
            1,200 SQ.FT. DREAM APARTMENT
          </div>

          {/* Mini 2D Floor Plan Blueprint */}
          <div style={{ maxWidth: 320, margin: '0 auto 16px auto', background: '#FFFFFF', borderRadius: 16, border: '2px solid var(--gold-600)', padding: 12, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: 6, height: 130 }}>
              
              {/* Funded (Gold) */}
              <div style={{ background: 'var(--grad-gold)', borderRadius: 10, padding: 10, color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase' }}>Funded</span>
                <span style={{ fontSize: '0.813rem', fontWeight: 800 }}>({fundedSqFt} Sq.Ft.)</span>
              </div>

              {/* Available Living Room */}
              <div style={{ background: 'var(--bg-subtle)', borderRadius: 10, padding: 10, border: '1.5px dashed #CBD5E1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Available</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--navy-900)' }}>LIVING ROOM</span>
              </div>

              {/* Balcony */}
              <div style={{ gridColumn: 'span 2', background: '#FFFFFF', borderRadius: 8, padding: 6, border: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.688rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                BALCONY & MASTER SUITE
              </div>
            </div>
          </div>

          {/* Progress Ribbon */}
          <div style={{ maxWidth: 320, margin: '0 auto 20px auto' }}>
            <div style={{ background: 'var(--navy-900)', color: '#FFFFFF', padding: '8px 16px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 800, boxShadow: 'var(--shadow-sm)' }}>
              {fundedSqFt} / {totalSqFt} SFT Funded ({percentage}%)
            </div>
          </div>

          {/* 3 Value Proposition Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 380, margin: '0 auto 20px auto', textAlign: 'center' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 12, padding: '10px 6px' }}>
              <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block', lineHeight: 1.25 }}>
                Build Equity for the Newlyweds
              </span>
            </div>
            <div style={{ background: '#FEF3C7', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: 12, padding: '10px 6px' }}>
              <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--gold-700)', display: 'block', lineHeight: 1.25 }}>
                Gift 1, 5, or 10 Sq.Ft.
              </span>
            </div>
            <div style={{ background: 'var(--emerald-50)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 12, padding: '10px 6px' }}>
              <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--emerald-700)', display: 'block', lineHeight: 1.25 }}>
                Escrow Secured & RERA Compliant
              </span>
            </div>
          </div>

          {/* QR Code Section */}
          <div 
            onClick={() => {
              onClose();
              onNavigateToSimulator();
            }}
            style={{ display: 'inline-block', background: '#FFFFFF', padding: 10, borderRadius: 16, border: '2px solid var(--gold-600)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', marginBottom: 12 }}
          >
            <div style={{ width: 110, height: 110, background: 'var(--navy-900)', borderRadius: 12, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <QrCode style={{ width: 98, height: 98, color: '#FFFFFF' }} />
              <div style={{ position: 'absolute', width: 26, height: 26, borderRadius: '50%', background: 'var(--marigold)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFFFFF' }}>
                <Home style={{ width: 14, height: 14, color: '#FFFFFF' }} />
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-700)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
            Scan to Gift Sq.Ft. & Bless the Couple
          </p>
          <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
            PlotTheirFuture.in • 100% Tax-Exempt Under Sec 56(2)(x)
          </p>

          {/* Bottom Marigold Garland Border */}
          <div className="marigold-strip" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16 }} />
        </div>

        {/* Action Buttons Below Flyer */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
          <button
            onClick={handlePrint}
            className="btn-outline"
            style={{ background: '#FFFFFF' }}
          >
            <Printer style={{ width: 16, height: 16, color: 'var(--gold-600)' }} />
            <span>Print Flyer</span>
          </button>

          <button
            onClick={() => alert("Flyer image link copied to clipboard for WhatsApp sharing!")}
            className="btn-gold"
            style={{ background: '#25D366' }}
          >
            <Share2 style={{ width: 16, height: 16 }} />
            <span>Share on WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}
