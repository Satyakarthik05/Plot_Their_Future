import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Gift, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Share2, 
  Navigation, 
  Video, 
  Send,
  Users,
  Utensils,
  Hotel,
  Play
} from 'lucide-react';
import { REGISTRY_DATA } from '../data/mockData';

export default function MicrositeView({ 
  onNavigateToSimulator, 
  onOpenFlyer, 
  fundedSqFt, 
  totalSqFt, 
  blessings, 
  onAddBlessing,
  onAddRsvp 
}) {
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    adults: 2,
    children: 0,
    diet: 'veg',
    stayNeeded: false,
    shuttleNeeded: false,
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const [newBlessing, setNewBlessing] = useState({
    name: '',
    relation: 'Friend / Family',
    message: '',
  });

  const [activeCeremony, setActiveCeremony] = useState(REGISTRY_DATA.ceremonies[3]); // Lagna Muhurtham default
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Countdown timer calculation for Nov 28, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 34,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const percentage = Math.round((fundedSqFt / totalSqFt) * 100);
  const totalAmount = fundedSqFt * REGISTRY_DATA.metrics.costPerSqFt;

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;
    onAddRsvp(rsvpForm);
    setRsvpSubmitted(true);
  };

  const handleBlessingSubmit = (e) => {
    e.preventDefault();
    if (!newBlessing.name.trim() || !newBlessing.message.trim()) return;
    onAddBlessing({
      id: Date.now(),
      guestName: newBlessing.name,
      relation: newBlessing.relation,
      sqft: 5,
      roomName: "Grand Living Room",
      amount: 22500,
      message: newBlessing.message,
      timestamp: "Just now",
      verifiedEscrow: true,
      tileCode: "LR-NEW",
    });
    setNewBlessing({ name: '', relation: 'Friend / Family', message: '' });
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      
      {/* 1. TOP HERO SECTION */}
      <section className="ptf-hero-section">
        <div className="ptf-container">
          
          {/* Couple Header Announcement */}
          <div className="ptf-hero-announcement">
            <div className="ptf-hero-badge">
              <Sparkles style={{ width: 14, height: 14, color: 'var(--gold-600)' }} />
              <span>Sacred Matrimonial Celebration</span>
              <Sparkles style={{ width: 14, height: 14, color: 'var(--gold-600)' }} />
            </div>

            <h1 className="ptf-couple-names">
              Sanvi <span className="ptf-couple-amp">&</span> Santosh
            </h1>

            <p style={{ fontSize: '0.938rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Inviting You to Bless Our New Beginnings
            </p>

            <div className="ptf-wedding-date-bar">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar style={{ width: 16, height: 16, color: 'var(--marigold)' }} />
                <span>Saturday, November 28, 2026</span>
              </span>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin style={{ width: 16, height: 16, color: 'var(--marigold)' }} />
                <span>Banjara Hills, Hyderabad</span>
              </span>
            </div>
          </div>

          {/* Hero 2-Column Split */}
          <div className="ptf-hero-grid">
            
            {/* Left: Cinematic Graphic Banner */}
            <div className="ptf-banner-wrapper">
              <img 
                src="/wedding_couple_banner.jpg" 
                alt="Plot Their Future Wedding Couple" 
                className="ptf-banner-img"
              />

              <div className="ptf-banner-overlay">
                <div className="ptf-banner-caption">
                  <span className="ptf-badge ptf-badge-gold" style={{ background: 'var(--gold-500)', color: 'var(--navy-900)' }}>
                    Exclusive Concept
                  </span>
                  <h3>Plot Their Future.in</h3>
                  <p>"Build Their First Home, One Square Foot at a Time!"</p>
                </div>

                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="btn-outline"
                  style={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', padding: '10px 16px', borderRadius: 14 }}
                >
                  <Play style={{ width: 14, height: 14, fill: 'var(--marigold)', color: 'var(--marigold)' }} />
                  <span>Watch Story</span>
                </button>
              </div>
            </div>

            {/* Right: Gift-a-Square-Foot Official Registry Card */}
            <div className="ptf-registry-card">
              
              {/* Header */}
              <div className="ptf-registry-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-600)' }}>
                    <Gift style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Official Registry
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-royal)', fontSize: '1.188rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                      Gift-a-Square-Foot
                    </h2>
                  </div>
                </div>

                <span className="ptf-badge ptf-badge-emerald">
                  <ShieldCheck style={{ width: 14, height: 14 }} />
                  RERA Compliant
                </span>
              </div>

              {/* Target Apartment Box */}
              <div className="ptf-target-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="ptf-target-title">Target Apartment</div>
                    <div className="ptf-target-apartment">SkyHigh Enclave, Flat 1402</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Financial District, Hyderabad</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Unit Price</div>
                    <div style={{ fontSize: '1.063rem', fontWeight: 800, color: 'var(--navy-900)' }}>₹4,500 / SFT</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, marginBottom: 4 }}>
                    <span style={{ color: 'var(--emerald-600)' }}>
                      {fundedSqFt} SFT Funded ({percentage}%)
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Goal: {totalSqFt} SFT
                    </span>
                  </div>

                  <div className="ptf-progress-track">
                    <div 
                      className="ptf-progress-fill" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.688rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    <span>₹{(totalAmount / 100000).toFixed(2)} Lakhs in Escrow</span>
                    <span>₹{((totalSqFt * REGISTRY_DATA.metrics.costPerSqFt) / 100000).toFixed(2)} Lakhs Total</span>
                  </div>
                </div>
              </div>

              {/* 3 Pillars */}
              <div className="ptf-three-pillars">
                <div className="ptf-pillar-item">
                  <div className="ptf-pillar-label">Purpose</div>
                  <div className="ptf-pillar-val">Build Equity</div>
                </div>
                <div className="ptf-pillar-item" style={{ background: '#FEF3C7', borderColor: 'rgba(217, 119, 6, 0.3)' }}>
                  <div className="ptf-pillar-label" style={{ color: 'var(--gold-700)' }}>Micro-Units</div>
                  <div className="ptf-pillar-val" style={{ color: 'var(--gold-700)' }}>1, 5, 10 SFT</div>
                </div>
                <div className="ptf-pillar-item" style={{ background: '#ECFDF5', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  <div className="ptf-pillar-label" style={{ color: 'var(--emerald-700)' }}>Security</div>
                  <div className="ptf-pillar-val" style={{ color: 'var(--emerald-700)' }}>Escrow Ringed</div>
                </div>
              </div>

              {/* Primary Call to Action */}
              <button
                onClick={onNavigateToSimulator}
                className="btn-gold"
                style={{ width: '100%', fontSize: '1rem', padding: '16px' }}
              >
                <Gift style={{ width: 20, height: 20 }} />
                <span>Choose Tiles on Floor Plan Grid</span>
                <ChevronRight style={{ width: 18, height: 18 }} />
              </button>

              {/* Footer Note */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', paddingTop: 6 }}>
                <button 
                  onClick={onOpenFlyer}
                  style={{ color: 'var(--crimson-700)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  View Printable Gift Flyer →
                </button>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--emerald-600)', fontWeight: 700 }}>
                  <ShieldCheck style={{ width: 14, height: 14 }} />
                  Sec 56(2)(x) Tax Exempt
                </span>
              </div>

            </div>

          </div>

          {/* Countdown Clock Strip */}
          <div className="ptf-countdown-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-700)' }}>
                <Clock style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Auspicious Muhurtham Window
                </span>
                <h4 style={{ fontSize: '0.938rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                  Saturday Dawn • Nov 28, 2026 (4:45 AM)
                </h4>
              </div>
            </div>

            {/* Countdown Digits */}
            <div className="ptf-countdown-blocks">
              <div className="ptf-countdown-unit">
                <div className="ptf-countdown-num">{timeLeft.days}</div>
                <div className="ptf-countdown-lbl">Days</div>
              </div>
              <span style={{ fontWeight: 800, color: 'var(--gold-600)' }}>:</span>
              <div className="ptf-countdown-unit">
                <div className="ptf-countdown-num">{timeLeft.hours}</div>
                <div className="ptf-countdown-lbl">Hours</div>
              </div>
              <span style={{ fontWeight: 800, color: 'var(--gold-600)' }}>:</span>
              <div className="ptf-countdown-unit">
                <div className="ptf-countdown-num">{timeLeft.minutes}</div>
                <div className="ptf-countdown-lbl">Mins</div>
              </div>
              <span style={{ fontWeight: 800, color: 'var(--gold-600)' }}>:</span>
              <div className="ptf-countdown-unit">
                <div className="ptf-countdown-num" style={{ color: 'var(--gold-600)' }}>{timeLeft.seconds}</div>
                <div className="ptf-countdown-lbl">Secs</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CEREMONY SEQUENCE WORKFLOW (TRACK A) */}
      <section style={{ padding: '60px 0', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="ptf-container">
          
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 36px auto' }}>
            <span className="ptf-badge ptf-badge-gold">
              Track A Workflow
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8, marginBottom: 8 }}>
              Ceremony Sequence & Ritual Workflow
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Bride & Groom Traditional Vedic Sequence with GPS venue navigation, dress codes, and automated alerts.
            </p>
          </div>

          {/* Ceremony Stepper Tabs */}
          <div className="ptf-ceremonies-nav">
            {REGISTRY_DATA.ceremonies.map((c) => {
              const isSelected = activeCeremony.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveCeremony(c)}
                  className={`ptf-ceremony-tab ${isSelected ? 'active' : ''}`}
                >
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, color: isSelected ? 'var(--gold-700)' : 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {c.day}
                  </span>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--navy-900)', marginTop: 4, lineHeight: 1.25 }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: '0.688rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    {c.time}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Ceremony Spotlight Card */}
          <div className="ptf-ceremony-spotlight">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="ptf-badge ptf-badge-gold">
                  {activeCeremony.subtitle}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock style={{ width: 14, height: 14, color: 'var(--gold-600)' }} />
                  {activeCeremony.time} ({activeCeremony.date})
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: 10 }}>
                {activeCeremony.title}
              </h3>

              <p style={{ fontSize: '0.938rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                {activeCeremony.description}
              </p>

              {/* Ritual Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--gold-700)', textTransform: 'uppercase', marginBottom: 4 }}>Venue Location</div>
                  <div style={{ fontWeight: 700, fontSize: '0.813rem', color: 'var(--navy-900)', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <MapPin style={{ width: 16, height: 16, color: 'var(--marigold)', flexShrink: 0, marginTop: 1 }} />
                    <span>{activeCeremony.venue}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--gold-700)', textTransform: 'uppercase', marginBottom: 4 }}>Dress Code</div>
                  <div style={{ fontWeight: 700, fontSize: '0.813rem', color: 'var(--navy-900)' }}>
                    {activeCeremony.dressCode}
                  </div>
                </div>
              </div>

              {/* Automated System Trigger */}
              <div style={{ background: 'var(--emerald-50)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.75rem', color: 'var(--emerald-700)' }}>
                <ShieldCheck style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--emerald-600)' }} />
                <div>
                  <strong>System Trigger:</strong> {activeCeremony.systemAction}
                </div>
              </div>
            </div>

            {/* Right: GPS Navigation Box */}
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Navigation style={{ width: 18, height: 18, color: 'var(--gold-600)' }} />
                <span>Guest Navigation & Sync</span>
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Tap below for 1-click turn-by-turn Google Maps GPS route and calendar sync.
              </p>

              <a
                href={REGISTRY_DATA.couple.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <MapPin style={{ width: 16, height: 16, color: 'var(--gold-400)' }} />
                <span>Open Google Maps GPS</span>
              </a>

              <button
                onClick={() => alert("Added to your Google / Apple Calendar with 2-hour automated reminder!")}
                className="btn-outline"
                style={{ width: '100%' }}
              >
                <Calendar style={{ width: 16, height: 16 }} />
                <span>1-Click Calendar Sync</span>
              </button>

              <button
                onClick={() => alert("WhatsApp broadcast invite link copied to clipboard!")}
                className="btn-outline"
                style={{ width: '100%', color: '#075E54', background: '#DCF8C6', borderColor: '#86EFAC' }}
              >
                <Share2 style={{ width: 16, height: 16 }} />
                <span>Share Ritual on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SMART RSVP SECTION */}
      <section style={{ padding: '60px 0', background: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <div className="ptf-container">
          
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px auto' }}>
            <span className="ptf-badge ptf-badge-emerald">
              Module 2: Smart Attendance
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8, marginBottom: 8 }}>
              Smart RSVP & Stay Logistics
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Please confirm your attendance so our hospitality team can arrange catering, airport shuttles, and luxury stay suites.
            </p>
          </div>

          <div className="ptf-rsvp-card">
            {rsvpSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--emerald-50)', color: 'var(--emerald-600)', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 style={{ width: 36, height: 36 }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: 8 }}>
                  RSVP Received with Gratitude!
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{rsvpForm.name}</strong>. Your confirmation has been synced with the couple's hospitality dashboard. An automated WhatsApp confirmation has been dispatched.
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="btn-primary"
                  style={{ padding: '10px 20px' }}
                >
                  Edit RSVP Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit}>
                
                {/* Name & Phone */}
                <div className="ptf-form-row">
                  <div className="ptf-form-group">
                    <label className="ptf-form-label">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      placeholder="e.g. Anand & Priya Sharma"
                    />
                  </div>

                  <div className="ptf-form-group">
                    <label className="ptf-form-label">WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={rsvpForm.phone}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Attending Options */}
                <div className="ptf-form-group" style={{ marginBottom: 18 }}>
                  <label className="ptf-form-label">Will you be joining us?</label>
                  <div className="ptf-radio-group">
                    {[
                      { id: 'yes', label: 'Joyfully Attend', icon: '🎉' },
                      { id: 'virtual', label: 'Watch Virtually', icon: '💻' },
                      { id: 'no', label: 'Regretfully Decline', icon: '💌' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setRsvpForm({ ...rsvpForm, attending: opt.id })}
                        className={`ptf-radio-btn ${rsvpForm.attending === opt.id ? 'active' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Headcounts & Diet */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 18 }}>
                  <div className="ptf-form-group">
                    <label className="ptf-form-label">Adult Guests</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={rsvpForm.adults}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, adults: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  <div className="ptf-form-group">
                    <label className="ptf-form-label">Children (&lt; 10)</label>
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={rsvpForm.children}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, children: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="ptf-form-group">
                    <label className="ptf-form-label">Dietary Preference</label>
                    <select
                      value={rsvpForm.diet}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, diet: e.target.value })}
                    >
                      <option value="veg">Pure Vegetarian Feast</option>
                      <option value="jain">Jain (No Root Veg)</option>
                      <option value="nonveg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 24, paddingTop: 4 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.813rem', fontWeight: 700, color: 'var(--navy-900)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rsvpForm.stayNeeded}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, stayNeeded: e.target.checked })}
                      style={{ width: 16, height: 16, accentColor: 'var(--gold-600)' }}
                    />
                    <span>Hotel Room Booking Required</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.813rem', fontWeight: 700, color: 'var(--navy-900)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rsvpForm.shuttleNeeded}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, shuttleNeeded: e.target.checked })}
                      style={{ width: 16, height: 16, accentColor: 'var(--gold-600)' }}
                    />
                    <span>Airport / Railway Station Shuttle Needed</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
                >
                  Submit RSVP Confirmation
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 4. FOUNDING WALL & BLESSINGS GUESTBOOK */}
      <section style={{ padding: '60px 0', background: 'var(--bg-subtle)' }}>
        <div className="ptf-container">
          
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px auto' }}>
            <span className="ptf-badge ptf-badge-gold">
              Blessings that Build
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8, marginBottom: 8 }}>
              The Founding Wall of Family & Friends
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Every square foot gifted carries a lasting blessing for Sanvi & Santosh's new abode.
            </p>
          </div>

          <div className="ptf-blessings-layout">
            
            {/* Blessings Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {blessings.slice(0, 5).map((b) => (
                <div key={b.id} className="ptf-card ptf-card-hover" style={{ padding: '18px 22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)' }}>
                          {b.guestName}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          ({b.relation})
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gold-700)', fontWeight: 700, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Gift style={{ width: 14, height: 14 }} />
                        <span>Gifted {b.sqft} Sq.Ft. to {b.roomName}</span>
                        <span style={{ color: '#CBD5E1' }}>•</span>
                        <span style={{ color: 'var(--text-muted)' }}>{b.timestamp}</span>
                      </div>
                    </div>

                    <span className="ptf-badge ptf-badge-emerald">
                      Tile #{b.tileCode}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.813rem', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--bg-subtle)', padding: '10px 14px', borderRadius: 12, border: '1px solid var(--border-color)', margin: 0 }}>
                    "{b.message}"
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Leave a Blessing Form */}
            <div className="ptf-card" style={{ padding: 28, position: 'sticky', top: 100 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-700)' }}>
                  <Send style={{ width: 18, height: 18 }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.063rem', color: 'var(--navy-900)' }}>Send Blessings</h3>
              </div>

              <form onSubmit={handleBlessingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="ptf-form-group">
                  <label className="ptf-form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newBlessing.name}
                    onChange={(e) => setNewBlessing({ ...newBlessing, name: e.target.value })}
                    placeholder="e.g. Ramesh Uncle"
                  />
                </div>

                <div className="ptf-form-group">
                  <label className="ptf-form-label">Relation to Couple</label>
                  <input
                    type="text"
                    value={newBlessing.relation}
                    onChange={(e) => setNewBlessing({ ...newBlessing, relation: e.target.value })}
                    placeholder="e.g. Cousin, School Friend, Colleague"
                  />
                </div>

                <div className="ptf-form-group">
                  <label className="ptf-form-label">Blessing / Message</label>
                  <textarea
                    rows="3"
                    required
                    value={newBlessing.message}
                    onChange={(e) => setNewBlessing({ ...newBlessing, message: e.target.value })}
                    placeholder="Write your heartfelt wishes for their new home..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                >
                  Post Blessing on Live Wall
                </button>

                <div style={{ textAlign: 'center', marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={onNavigateToSimulator}
                    style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-700)', textDecoration: 'underline' }}
                  >
                    Want to attach a Sq.Ft. tile with your blessing? Click here →
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Cinematic Video Invite Modal Preview */}
      {showVideoModal && (
        <div className="ptf-modal-backdrop" onClick={() => setShowVideoModal(false)}>
          <div className="ptf-modal-box" style={{ background: 'var(--navy-900)', color: '#FFFFFF', border: '2px solid var(--gold-500)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', fontWeight: 700 }}>
                <Video style={{ width: 18, height: 18, color: 'var(--gold-500)' }} />
                <span>Sanvi & Santosh • The Journey Home (Teaser)</span>
              </div>
              <button 
                onClick={() => setShowVideoModal(false)}
                style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            <div style={{ position: 'relative', height: 320, background: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
              <img 
                src="/wedding_couple_banner.jpg" 
                alt="Video thumbnail" 
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
              />
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--marigold)', color: '#FFFFFF', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(234, 88, 12, 0.5)' }}>
                  <Play style={{ width: 32, height: 32, fill: '#FFFFFF', marginLeft: 4 }} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>
                  From First Date to First Doorstep
                </h4>
                <p style={{ fontSize: '0.813rem', color: '#CBD5E1', maxWidth: 400, margin: '0 auto' }}>
                  A cinematic 4K video invitation crafted for family and friends. Streaming via low-latency CDN.
                </p>
              </div>
            </div>

            <div style={{ padding: '14px 20px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>Duration: 1m 45s • 4K Dolby Atmos</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="btn-gold"
                style={{ padding: '8px 16px', fontSize: '0.75rem' }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
