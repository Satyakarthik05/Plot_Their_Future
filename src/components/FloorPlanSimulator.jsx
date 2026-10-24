import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Home, 
  Gift, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Share2, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Info,
  DollarSign,
  QrCode
} from 'lucide-react';
import { REGISTRY_DATA } from '../data/mockData';

export default function FloorPlanSimulator({ 
  fundedSqFt, 
  totalSqFt, 
  onTilePurchased,
  onOpenFlyer 
}) {
  const [selectedRoomId, setSelectedRoomId] = useState('all');
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [customSft, setCustomSft] = useState(5);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    relation: 'Family Friend',
    phone: '',
    message: '',
    paymentMethod: 'upi',
  });

  // Calculate selected SFT count and cost
  const selectedSftCount = selectedTiles.length > 0 
    ? selectedTiles.length * 10 
    : customSft;

  const totalAmount = selectedSftCount * REGISTRY_DATA.metrics.costPerSqFt;

  // Build grid data for the rooms
  // 120 blocks total = 1,200 sq.ft. (10 sq.ft. per block)
  const allGridTiles = useMemo(() => {
    const tiles = [];
    let tileIndex = 1;

    REGISTRY_DATA.rooms.forEach((room) => {
      const fundedBlocksCount = Math.floor(room.fundedSft / 10);
      for (let i = 0; i < room.tilesGrid; i++) {
        const isFunded = i < fundedBlocksCount;
        tiles.push({
          id: `TILE-${tileIndex}`,
          blockNum: i + 1,
          roomId: room.id,
          roomName: room.name,
          sqft: 10,
          isFunded: isFunded,
          fundedBy: isFunded ? (i % 2 === 0 ? "Ramesh Uncle" : "IIT Gang") : null,
          color: room.color,
        });
        tileIndex++;
      }
    });

    return tiles;
  }, []);

  // Filtered tiles
  const visibleTiles = selectedRoomId === 'all'
    ? allGridTiles
    : allGridTiles.filter(t => t.roomId === selectedRoomId);

  // Toggle tile selection
  const handleTileClick = (tile) => {
    if (tile.isFunded) return;
    if (selectedTiles.includes(tile.id)) {
      setSelectedTiles(selectedTiles.filter(id => id !== tile.id));
    } else {
      setSelectedTiles([...selectedTiles, tile.id]);
    }
  };

  // Quick preset button click (1, 5, 10, 20 SFT)
  const handleQuickSelectPreset = (sft) => {
    setCustomSft(sft);
    setSelectedTiles([]); // Use preset amount
  };

  // Trigger Checkout
  const handleOpenCheckout = () => {
    setCheckoutOpen(true);
  };

  // Simulate Payment & Escrow Settlement (Track B Pipeline)
  const handleConfirmGifting = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutOpen(false);

      // Trigger Confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D97706', '#F59E0B', '#10B981', '#B45309', '#DC2626'],
      });

      const newCert = {
        deedId: `PTF-${Math.floor(100000 + Math.random() * 900000)}`,
        guestName: formData.name,
        relation: formData.relation,
        sqft: selectedSftCount,
        roomName: selectedRoomId !== 'all' 
          ? REGISTRY_DATA.rooms.find(r => r.id === selectedRoomId)?.name 
          : "Grand Living Room & Suites",
        amount: totalAmount,
        message: formData.message || "Heartiest congratulations and infinite blessings for your forever home!",
        timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        escrowRef: REGISTRY_DATA.couple.escrowAccountRef,
        sec56Compliant: true,
      };

      setCertificateData(newCert);

      // Update global parent state
      onTilePurchased({
        guestName: formData.name,
        relation: formData.relation,
        sqft: selectedSftCount,
        roomName: newCert.roomName,
        amount: totalAmount,
        message: newCert.message,
      });

      // Clear selection
      setSelectedTiles([]);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px 0 44px 0', minHeight: '100vh', background: 'var(--bg-page)' }}>
      <div className="ptf-container">
        
        {/* Title & Tagline Banner */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 20px auto' }}>
          <div className="ptf-hero-badge" style={{ marginBottom: 8, padding: '4px 14px', fontSize: '0.625rem' }}>
            <Sparkles style={{ width: 12, height: 12, color: 'var(--gold-600)' }} />
            <span>Interactive 1,200 SQ.FT. Apartment Blueprint</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: 6, lineHeight: 1.2 }}>
            Gift-a-Square-Foot Floor Plan Grid
          </h1>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Select coordinate-mapped square feet in Sanvi & Santosh's first home. Settle directly into the RBI-regulated builder escrow account.
          </p>
        </div>

        {/* Top 4 Summary Cards */}
        <div className="ptf-summary-cards-grid" style={{ marginBottom: 18, gap: 12 }}>
          <div className="ptf-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Flat Area</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 1 }}>1,200 SQ.FT.</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--emerald-600)', fontWeight: 700, marginTop: 1 }}>RERA Reg. P02400008921</div>
          </div>

          <div className="ptf-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Funded So Far</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--gold-700)', marginTop: 1 }}>{fundedSqFt} SQ.FT.</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 1 }}>
              {Math.round((fundedSqFt / totalSqFt) * 100)}% Equity Built
            </div>
          </div>

          <div className="ptf-card" style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Remaining Needed</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 1 }}>{totalSqFt - fundedSqFt} SQ.FT.</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 1 }}>Open for Gifting</div>
          </div>

          <div className="ptf-card" style={{ padding: '10px 14px', background: 'var(--emerald-50)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--emerald-700)', textTransform: 'uppercase' }}>RBI Tripartite Escrow</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--emerald-700)', marginTop: 1 }}>₹4,500 / SFT</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--emerald-600)', fontWeight: 700, marginTop: 1 }}>Sec 56(2)(x) Tax Exempt</div>
          </div>
        </div>

        {/* Main Workspace Layout (Screen-Fitting 2-Column Grid) */}
        <div className="ptf-simulator-grid">
          
          {/* Left: Floor Plan Blueprint */}
          <div className="ptf-card" style={{ padding: '16px 18px', minWidth: 0, width: '100%', boxSizing: 'border-box' }}>
            
            {/* Room Filter Pills & Legend Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedRoomId('all')}
                    className={`btn-outline ${selectedRoomId === 'all' ? 'btn-primary' : ''}`}
                    style={{ padding: '5px 11px', fontSize: '0.688rem', borderRadius: 8 }}
                  >
                    All (1,200 SFT)
                  </button>
                  {REGISTRY_DATA.rooms.map((room) => {
                    const shortName = room.name
                      .replace("Grand Living Room", "Living Room")
                      .replace("Master Suite & Walk-in", "Master Suite")
                      .replace("Guest & Parents Room", "Guest Room")
                      .replace("Modular Kitchen & Dining", "Kitchen")
                      .replace("Sunset Skyline Balcony", "Balcony");

                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`btn-outline ${selectedRoomId === room.id ? 'btn-primary' : ''}`}
                        style={{ padding: '5px 11px', fontSize: '0.688rem', borderRadius: 8, whiteSpace: 'nowrap' }}
                      >
                        {shortName} ({room.totalSft} SFT)
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.688rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 2.5, background: 'var(--gold-600)' }} /> Funded
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 2.5, background: 'var(--emerald-500)' }} /> Selected
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 2.5, background: '#FFFFFF', border: '1px solid #CBD5E1' }} /> Available
                  </span>
                </div>
              </div>
            </div>

            {/* Dark Blueprint Frame */}
            <div className="ptf-blueprint-frame">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: 10, marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: '0.563rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--gold-400)', textTransform: 'uppercase' }}>
                    Architectural Vector Blueprint
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginTop: 1, letterSpacing: '0.03em' }}>
                    UNIT 1402 • 1,200 SQFT 3BHK RESIDENCE
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.625rem', color: '#94A3B8' }}>Interactive Grid</span>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--emerald-400)' }}>1 Tile = 10 Sq.Ft.</div>
                </div>
              </div>

              {/* Grid Tiles */}
              <div className="ptf-tiles-matrix">
                {visibleTiles.map((tile) => {
                  const isSelected = selectedTiles.includes(tile.id);
                  let tileClass = "ptf-grid-tile available";
                  if (tile.isFunded) tileClass = "ptf-grid-tile funded";
                  else if (isSelected) tileClass = "ptf-grid-tile selected";

                  return (
                    <div
                      key={tile.id}
                      onClick={() => handleTileClick(tile)}
                      title={tile.isFunded 
                        ? `${tile.roomName}: Funded by ${tile.fundedBy} (10 SFT • ₹45,000)` 
                        : `${tile.roomName}: Available (10 SFT • ₹45,000) - Click to Select`}
                      className={tileClass}
                    >
                      {tile.isFunded ? (
                        <>
                          <Lock style={{ width: 10, height: 10, color: 'var(--gold-200)', flexShrink: 0 }} />
                          <span style={{ marginTop: 1, fontSize: '0.5rem', lineHeight: 1 }}>Funded</span>
                        </>
                      ) : isSelected ? (
                        <>
                          <Check style={{ width: 12, height: 12, color: '#FFFFFF', flexShrink: 0 }} />
                          <span style={{ marginTop: 1, fontSize: '0.5rem', lineHeight: 1 }}>Chosen</span>
                        </>
                      ) : (
                        <>
                          <span style={{ opacity: 0.65, fontFamily: 'monospace', fontSize: '0.5rem', lineHeight: 1 }}>10</span>
                          <span style={{ color: 'var(--gold-400)', marginTop: 1, fontSize: '0.5rem', lineHeight: 1 }}>Select</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footnote */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.688rem', color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Info style={{ width: 12, height: 12, color: 'var(--gold-400)' }} />
                  Select blocks or choose presets on the right.
                </span>
                <span style={{ color: 'var(--gold-400)', fontWeight: 700 }}>
                  Anti-Concurrency 10-Minute Lock
                </span>
              </div>
            </div>

            {/* Room Breakdown Strips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginTop: 16 }}>
              {REGISTRY_DATA.rooms.map((r) => {
                const rPct = Math.round((r.fundedSft / r.totalSft) * 100);
                const shortName = r.name
                  .replace("Grand Living Room", "Living Room")
                  .replace("Master Suite & Walk-in", "Master Suite")
                  .replace("Guest & Parents Room", "Guest Room")
                  .replace("Modular Kitchen & Dining", "Kitchen")
                  .replace("Sunset Skyline Balcony", "Balcony");

                return (
                  <div key={r.id} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '10px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.688rem', fontWeight: 800, marginBottom: 3 }}>
                      <span style={{ color: 'var(--navy-900)' }}>{shortName}</span>
                      <span style={{ color: 'var(--gold-700)' }}>{rPct}%</span>
                    </div>
                    <div style={{ width: '100%', height: 5, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--gold-600)', width: `${rPct}%`, borderRadius: 9999 }} />
                    </div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 3 }}>
                      {r.fundedSft}/{r.totalSft} SFT
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: Gifting Configuration & Checkout */}
          <div className="ptf-card" style={{ padding: '18px 20px', minWidth: 0, width: '100%', position: 'sticky', top: 76, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: 10, marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: '0.563rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Gifting Summary
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 1 }}>
                  Your Gift of Equity
                </h3>
              </div>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-700)' }}>
                <Gift style={{ width: 17, height: 17 }} />
              </div>
            </div>

            {/* Presets */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-900)', display: 'block', marginBottom: 6 }}>
                Choose Micro-Units (Sq.Ft.)
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
                {[
                  { sft: 1, label: "1 Sq.Ft.", name: "Lay a Brick", cost: "₹4,500" },
                  { sft: 5, label: "5 Sq.Ft.", name: "Cosy Corner", cost: "₹22,500", popular: true },
                  { sft: 10, label: "10 Sq.Ft.", name: "Window View", cost: "₹45,000" },
                  { sft: 20, label: "20 Sq.Ft.", name: "Balcony Slice", cost: "₹90,000" },
                ].map((preset) => {
                  const isSelected = selectedTiles.length === 0 && customSft === preset.sft;
                  return (
                    <div
                      key={preset.sft}
                      onClick={() => handleQuickSelectPreset(preset.sft)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 10,
                        border: isSelected ? '2px solid var(--gold-600)' : '1px solid var(--border-color)',
                        background: isSelected ? '#FEF9F0' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      {preset.popular && (
                        <span style={{ position: 'absolute', top: -7, right: 6, fontSize: '0.5rem', fontWeight: 800, textTransform: 'uppercase', background: 'var(--gold-600)', color: '#FFFFFF', padding: '1px 5px', borderRadius: 9999 }}>
                          Popular
                        </span>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.813rem', color: 'var(--navy-900)' }}>{preset.label}</span>
                        <span style={{ fontWeight: 800, fontSize: '0.688rem', color: 'var(--gold-700)' }}>{preset.cost}</span>
                      </div>
                      <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {preset.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slider */}
              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.688rem', fontWeight: 800, marginBottom: 6 }}>
                  <span>Custom Square Feet:</span>
                  <span style={{ color: 'var(--gold-700)', fontSize: '0.875rem' }}>{selectedSftCount} SFT</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={selectedSftCount}
                  onChange={(e) => {
                    setSelectedTiles([]);
                    setCustomSft(parseInt(e.target.value) || 1);
                  }}
                  style={{ width: '100%', accentColor: 'var(--gold-600)', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Cost Breakdown */}
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 14, padding: '12px 14px', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.688rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
                <span>Selected Area:</span>
                <strong style={{ color: 'var(--navy-900)' }}>{selectedSftCount} SFT</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.688rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
                <span>Unit Rate:</span>
                <strong style={{ color: 'var(--navy-900)' }}>₹4,500 / SFT</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.688rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                <span>Escrow Processing:</span>
                <strong style={{ color: 'var(--emerald-600)' }}>FREE (Wedding Waiver)</strong>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--navy-900)' }}>Total Escrow Gift:</span>
                <span style={{ fontSize: '1.188rem', fontWeight: 800, color: 'var(--gold-700)' }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Escrow Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: '0.688rem', color: 'var(--emerald-700)', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck style={{ width: 13, height: 13, flexShrink: 0, color: 'var(--emerald-600)' }} />
                <span>100% Ring-Fenced in RBI Tripartite Escrow</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 style={{ width: 13, height: 13, flexShrink: 0, color: 'var(--emerald-600)' }} />
                <span>Sec 56(2)(x) Tax-Exempt Legal Marriage Gift</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleOpenCheckout}
              className="btn-gold"
              style={{ width: '100%', padding: '13px', fontSize: '0.875rem' }}
            >
              <Gift style={{ width: 16, height: 16 }} />
              <span>Lock & Gift {selectedSftCount} Sq.Ft. Now</span>
            </button>

            <button
              onClick={onOpenFlyer}
              style={{ width: '100%', textAlign: 'center', fontSize: '0.688rem', fontWeight: 700, color: 'var(--crimson-700)', textDecoration: 'underline', marginTop: 8 }}
            >
              Generate Printable Wedding Flyer Card →
            </button>

          </div>

        </div>

      </div>

      {/* 10-Minute Checkout Modal */}
      {checkoutOpen && (
        <div className="ptf-modal-backdrop" onClick={() => setCheckoutOpen(false)}>
          <div className="ptf-modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ background: 'var(--grad-navy)', color: '#FFFFFF', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--gold-400)', textTransform: 'uppercase' }}>
                  Track B: Escrow Pipeline
                </span>
                <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '1.188rem', fontWeight: 800, marginTop: 2 }}>
                  10-Minute Tile Reservation
                </h3>
              </div>
              <button 
                onClick={() => setCheckoutOpen(false)}
                style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmGifting} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Tile Lock Timer */}
              <div style={{ background: '#FEF3C7', border: '1px solid rgba(217, 119, 6, 0.4)', borderRadius: 12, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--gold-700)', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Lock style={{ width: 14, height: 14 }} />
                  Tiles Reserved Exclusively for You
                </span>
                <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>09:59 mins</span>
              </div>

              <div className="ptf-form-group">
                <label className="ptf-form-label">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Uncle & Sunita Aunty"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="ptf-form-group">
                  <label className="ptf-form-label">Relation to Couple</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                  >
                    <option value="Family Elder / Uncle">Family Elder / Uncle</option>
                    <option value="Cousin & Squad">Cousin & Squad</option>
                    <option value="College / School Friend">College / School Friend</option>
                    <option value="Colleague / Mentor">Colleague / Mentor</option>
                    <option value="Well-wisher">Well-wisher</option>
                  </select>
                </div>

                <div className="ptf-form-group">
                  <label className="ptf-form-label">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="ptf-form-group">
                <label className="ptf-form-label">Blessing Message</label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="May your home be filled with boundless joy, peace, and prosperity..."
                />
              </div>

              {/* Settlement Channel */}
              <div className="ptf-form-group">
                <label className="ptf-form-label">Select Settlement Channel</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[
                    { id: 'upi', label: 'UPI / QR', sub: 'GPay, PhonePe, Paytm' },
                    { id: 'card', label: 'Cards', sub: 'Visa, Master, RuPay' },
                    { id: 'netbank', label: 'NetBanking', sub: 'RTGS / NEFT' },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                      style={{
                        padding: 10,
                        borderRadius: 12,
                        border: formData.paymentMethod === m.id ? '2px solid var(--navy-900)' : '1px solid var(--border-color)',
                        background: formData.paymentMethod === m.id ? 'var(--navy-900)' : '#FFFFFF',
                        color: formData.paymentMethod === m.id ? '#FFFFFF' : 'var(--navy-900)',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '0.813rem' }}>{m.label}</div>
                      <div style={{ fontSize: '0.625rem', opacity: 0.8, marginTop: 2 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.813rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Total Escrow Corpus:</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-700)' }}>
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-gold"
                  style={{ width: '100%', padding: '16px' }}
                >
                  {isProcessing ? (
                    <span>Registering Escrow Deed...</span>
                  ) : (
                    <>
                      <ShieldCheck style={{ width: 18, height: 18 }} />
                      <span>Pay & Confirm Escrow Deed</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Digital Deed Certificate Modal */}
      {certificateData && (
        <div className="ptf-modal-backdrop" onClick={() => setCertificateData(null)}>
          <div className="ptf-modal-box" style={{ border: '3px solid var(--gold-600)', padding: 'clamp(18px, 4vw, 32px)' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setCertificateData(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--navy-900)' }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', borderBottom: '2px solid rgba(217, 119, 6, 0.25)', paddingBottom: 16, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#FEF3C7', color: 'var(--gold-700)', margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--gold-500)' }}>
                <Home style={{ width: 24, height: 24 }} />
              </div>
              <span style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-700)' }}>
                Official Digital Deed & Escrow Certificate
              </span>
              <h2 style={{ fontFamily: 'var(--font-royal)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 2 }}>
                PLOT THEIR FUTURE
              </h2>
              <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                Fractional Real Estate Wedding Gift Registry • Deed Ref #{certificateData.deedId}
              </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <p style={{ fontSize: '0.688rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                This Certifies That
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--crimson-700)', margin: '6px 0' }}>
                {certificateData.guestName}
              </h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--text-secondary)', maxWidth: 420, margin: '0 auto 12px auto' }}>
                Has successfully funded and gifted <strong style={{ color: 'var(--navy-900)' }}>{certificateData.sqft} Square Feet</strong> of equity in the newlywed sanctuary for
              </p>
              <div style={{ display: 'inline-block', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '8px 18px', fontFamily: 'var(--font-royal)', fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)' }}>
                Sanvi Sharma & Santosh Varma
              </div>
            </div>

            <div style={{ background: '#FAF8F5', border: '1px solid var(--border-color)', borderRadius: 16, padding: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.75rem', marginBottom: 20 }}>
              <div>
                <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.625rem', fontWeight: 800 }}>Allocated Room</span>
                <div style={{ fontWeight: 800, color: 'var(--navy-900)' }}>{certificateData.roomName}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.625rem', fontWeight: 800 }}>Escrow Corpus</span>
                <div style={{ fontWeight: 800, color: 'var(--emerald-700)' }}>₹{certificateData.amount.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.625rem', fontWeight: 800 }}>Date of Lock</span>
                <div style={{ fontWeight: 800, color: 'var(--navy-900)' }}>{certificateData.timestamp}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.625rem', fontWeight: 800 }}>Tax Compliance</span>
                <div style={{ fontWeight: 800, color: 'var(--emerald-700)' }}>Sec 56(2)(x) Exempt</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '2px solid rgba(217, 119, 6, 0.25)', paddingTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldCheck style={{ width: 28, height: 28, color: 'var(--emerald-600)' }} />
                <div style={{ fontSize: '0.688rem', textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, color: 'var(--navy-900)' }}>RBI Tripartite Escrow</div>
                  <div style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>Ref: {certificateData.escrowRef}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => alert("Digital Deed Certificate downloaded as PDF!")}
                  className="btn-outline"
                  style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                >
                  <Download style={{ width: 14, height: 14 }} />
                  <span>PDF</span>
                </button>

                <button
                  onClick={() => alert("WhatsApp receipt with permanent tile deed link sent!")}
                  className="btn-gold"
                  style={{ padding: '8px 14px', fontSize: '0.75rem', background: '#25D366' }}
                >
                  <Share2 style={{ width: 14, height: 14 }} />
                  <span>Share</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
