import React from 'react';
import { 
  Heart, 
  Home, 
  Tv, 
  Cpu, 
  BarChart3, 
  FileText, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenFlyer, onResetData, fundedSqFt, totalSqFt }) {
  const percentage = Math.round((fundedSqFt / totalSqFt) * 100);

  const navItems = [
    { id: 'microsite', label: 'Microsite', icon: Heart, badge: 'Demo' },
    { id: 'simulator', label: 'Floor Plan', icon: Home, badge: `${fundedSqFt} SFT` },
    { id: 'venue', label: 'Venue Wall', icon: Tv, badge: 'Live' },
    { id: 'architecture', label: 'System SOP', icon: Cpu, badge: 'Deck' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, badge: '342' },
  ];

  return (
    <>
      <header className="ptf-navbar">
        {/* Delicate Royal Gold & Saffron Garland Ribbon */}
        <div className="marigold-strip" />

        {/* Main Bar */}
        <div className="ptf-container">
          <div className="ptf-navbar-inner">
            
            {/* Brand Logo & Tagline */}
            <div 
              onClick={() => setActiveTab('microsite')}
              className="ptf-brand"
            >
              <div className="ptf-brand-logo">
                <Home style={{ width: 18, height: 18, color: 'var(--gold-500)' }} />
                <Sparkles style={{ width: 10, height: 10, color: 'var(--gold-300)', position: 'absolute', top: 2, right: 2 }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <span className="ptf-brand-title">
                    PLOT THEIR FUTURE
                  </span>
                  <span className="ptf-badge ptf-badge-emerald ptf-rera-pill" style={{ fontSize: '0.563rem', padding: '1.5px 6px' }}>
                    RERA ESCROW
                  </span>
                </div>
                <span className="ptf-brand-tagline">
                  Wedding Gift Registry • Gift-a-Square-Foot
                </span>
              </div>
            </div>

            {/* Desktop Center Tabs */}
            <nav className="ptf-nav-tabs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`ptf-nav-tab ${isActive ? 'active' : ''}`}
                  >
                    <Icon style={{ width: 14, height: 14 }} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ptf-nav-pill-badge">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="ptf-nav-actions">
              {/* Quick SFT Progress Badge */}
              <div className="ptf-progress-chip">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-600)', display: 'inline-block' }} />
                <span className="ptf-progress-text-full">{fundedSqFt} / {totalSqFt} SFT ({percentage}%)</span>
                <span className="ptf-progress-text-compact">{percentage}%</span>
              </div>

              {/* Flyer Generator Button */}
              <button
                onClick={onOpenFlyer}
                className="btn-outline ptf-nav-flyer-btn"
                style={{ padding: '6px 12px', fontSize: '0.688rem', borderColor: '#FCA5A5', color: '#991B1B', background: '#FEF2F2', whiteSpace: 'nowrap' }}
                title="View & Download Wedding Gift Flyer"
              >
                <FileText style={{ width: 13, height: 13, color: '#DC2626' }} />
                <span className="ptf-btn-text-hideable">Flyer</span>
              </button>

              {/* Reset Demo State Button */}
              <button
                onClick={onResetData}
                style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Reset Demo State"
              >
                <RotateCcw style={{ width: 13, height: 13 }} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom App Navigation Bar (Shown on screens <= 860px) */}
      <nav className="ptf-mobile-bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`ptf-mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="ptf-mobile-nav-icon-wrap">
                <Icon style={{ width: 18, height: 18 }} />
                {item.badge && (
                  <span className="ptf-mobile-nav-badge">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="ptf-mobile-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
