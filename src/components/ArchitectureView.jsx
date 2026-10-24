import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Workflow, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight, 
  Users, 
  DollarSign, 
  Lock, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { REGISTRY_DATA } from '../data/mockData';

export default function ArchitectureView() {
  const [activeSubTab, setActiveSubTab] = useState('pillars');
  const [selectedPillar, setSelectedPillar] = useState(REGISTRY_DATA.systemArchitecture[2]); // Registry default
  const [inspectedDoc, setInspectedDoc] = useState(null);

  const subTabs = [
    { id: 'pillars', label: 'Functional Architecture (4 Pillars)' },
    { id: 'escrow_pipeline', label: 'Escrow Transaction Pipeline (Track B)' },
    { id: 'matrix', label: 'Operational Responsibility Matrix' },
    { id: 'sop_stages', label: '6-Stage End-to-End SOP Flow' },
    { id: 'docs', label: 'Original Architecture Blueprints' },
  ];

  return (
    <div style={{ padding: '48px 0', minHeight: '100vh', background: 'var(--bg-page)' }}>
      <div className="ptf-container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 36px auto' }}>
          <div className="ptf-hero-badge">
            <Cpu style={{ width: 14, height: 14, color: 'var(--gold-600)' }} />
            <span>Enterprise System Architecture & Client Deck</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: 10 }}>
            Platform System Architecture & Operations
          </h1>

          <p style={{ fontSize: '0.938rem', color: 'var(--text-secondary)' }}>
            Full technical specifications, banking escrow protocols, operational responsibility matrices, and standard operating procedures.
          </p>
        </div>

        {/* 4 Bottom Key Metrics */}
        <div className="ptf-summary-cards-grid">
          <div className="ptf-card" style={{ padding: '16px 18px', borderLeft: '4px solid var(--gold-600)' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>1,200 SFT</div>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 4 }}>APARTMENT TARGET AREA</div>
            <div style={{ fontSize: '0.688rem', color: 'var(--emerald-600)', fontWeight: 700, marginTop: 2 }}>RERA Registered Blueprint</div>
          </div>

          <div className="ptf-card" style={{ padding: '16px 18px', borderLeft: '4px solid var(--gold-600)' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>₹3,500 - 6,000</div>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 4 }}>UNIT COST PER SFT</div>
            <div style={{ fontSize: '0.688rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 2 }}>Tier 1 & 2 Metro Pricing</div>
          </div>

          <div className="ptf-card" style={{ padding: '16px 18px', borderLeft: '4px solid var(--emerald-600)' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--emerald-600)' }}>&lt; 5 Seconds</div>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 4 }}>WHATSAPP RECEIPT SLA</div>
            <div style={{ fontSize: '0.688rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 2 }}>Instant Digital Deed Delivery</div>
          </div>

          <div className="ptf-card" style={{ padding: '16px 18px', borderLeft: '4px solid var(--crimson-700)' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--crimson-700)' }}>Sec 56(2)(x)</div>
            <div style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 4 }}>TAX-EXEMPT COMPLIANCE</div>
            <div style={{ fontSize: '0.688rem', color: 'var(--emerald-600)', fontWeight: 700, marginTop: 2 }}>100% Legal Marriage Gift</div>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={activeSubTab === tab.id ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '8px 16px', fontSize: '0.75rem', whiteSpace: 'nowrap', borderRadius: 12 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Functional Architecture (4 Pillars) */}
        {activeSubTab === 'pillars' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="ptf-pillars-grid">
              {REGISTRY_DATA.systemArchitecture.map((pillar) => {
                const isSelected = selectedPillar.id === pillar.id;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar)}
                    className="ptf-card ptf-card-hover"
                    style={{
                      border: isSelected ? '2px solid var(--gold-600)' : '1px solid var(--border-color)',
                      background: isSelected ? '#FFFFFF' : '#FAF8F5',
                      boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--navy-900)', color: 'var(--gold-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.125rem', marginBottom: 14 }}>
                      {pillar.title.charAt(0)}
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--navy-900)', marginBottom: 6, lineHeight: 1.3 }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 14 }}>
                      {pillar.items.length} functional system modules
                    </p>
                    <div style={{ borderTop: '1px solid var(--bg-subtle)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {pillar.items.map((it, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                          <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--emerald-600)', flexShrink: 0 }} />
                          <span>{it.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spotlight Card */}
            <div className="ptf-card" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span className="ptf-badge ptf-badge-gold">
                  Architecture Specification
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                  {selectedPillar.title}
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {selectedPillar.items.map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 16, padding: 20 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--navy-900)', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                        {idx + 1}
                      </span>
                      {item.label}
                    </div>
                    <p style={{ fontSize: '0.813rem', color: 'var(--text-secondary)', paddingLeft: 34, lineHeight: 1.5 }}>
                      {item.desc}. Production grade webhook architecture, responsive mobile layouts, and low-latency storage.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Escrow Transaction Pipeline (Track B) */}
        {activeSubTab === 'escrow_pipeline' && (
          <div className="ptf-card" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <span className="ptf-badge ptf-badge-emerald">
                Track B Architecture
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8, marginBottom: 6 }}>
                Fractional Square-Foot Transaction & Escrow Pipeline
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                How guest gifting flows from mobile checkout into bank ring-fencing and post-wedding builder settlement.
              </p>
            </div>

            {/* Pipeline Steps */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Step 1</span>
                <h4 style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)', margin: '6px 0 10px 0' }}>Guest on Mobile</h4>
                <ul style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  <li>• Selects 1, 5, or 10 SFT Tile</li>
                  <li>• Attaches Blessing Message</li>
                  <li>• UPI / Card Checkout</li>
                </ul>
                <span className="ptf-badge ptf-badge-navy">UPI / Card Checkout</span>
              </div>

              <div style={{ background: '#FEF3C7', border: '1px solid rgba(217, 119, 6, 0.4)', borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--gold-700)', textTransform: 'uppercase' }}>Step 2</span>
                <h4 style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)', margin: '6px 0 10px 0' }}>Payment Gateway & Lock</h4>
                <ul style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  <li>• 10-Minute Tile Reservation</li>
                  <li>• Webhook Transaction Ping</li>
                  <li>• Concurrency Prevention</li>
                </ul>
                <span className="ptf-badge ptf-badge-gold">Payment Confirmed</span>
              </div>

              <div style={{ background: 'var(--emerald-50)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--emerald-700)', textTransform: 'uppercase' }}>Step 3</span>
                <h4 style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)', margin: '6px 0 10px 0' }}>RBI Tripartite Escrow</h4>
                <ul style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  <li>• Direct Bank Ring-Fencing</li>
                  <li>• WhatsApp Receipt + Tax Ref</li>
                  <li>• Tiles Locked as Funded</li>
                </ul>
                <span className="ptf-badge ptf-badge-emerald">Tiles Locked as Funded</span>
              </div>

              <div style={{ background: '#FAF8F5', border: '1px solid var(--border-color)', borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Step 4</span>
                <h4 style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)', margin: '6px 0 10px 0' }}>Builder Settlement</h4>
                <ul style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  <li>• RERA Project Account</li>
                  <li>• Disbursed Post-Wedding</li>
                  <li>• Permanent Equity Credit</li>
                </ul>
                <span className="ptf-badge ptf-badge-navy">Permanent Equity Credit</span>
              </div>
            </div>

            {/* Protections */}
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              <div>
                <h5 style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--navy-900)', marginBottom: 4 }}>Tripartite Trustee Agreement</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Funds cannot be diverted to personal bank accounts. Locked exclusively for the developer's registered RERA project account.
                </p>
              </div>
              <div>
                <h5 style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--navy-900)', marginBottom: 4 }}>Section 56(2)(x) IT Exemption</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Wedding gifts received on the occasion of marriage in India are 100% exempt from income tax without monetary ceiling.
                </p>
              </div>
              <div>
                <h5 style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--navy-900)', marginBottom: 4 }}>Dual-Authorization Payout</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Settlement requires dual authorization by the couple and the bank escrow officer after wedding ceremony completion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Operational Responsibility Matrix */}
        {activeSubTab === 'matrix' && (
          <div className="ptf-card" style={{ padding: 36 }}>
            <div style={{ marginBottom: 24 }}>
              <span className="ptf-badge ptf-badge-gold">
                Operational Framework
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8, marginBottom: 6 }}>
                Ceremony & Gifting Operational Responsibility Matrix
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Role definitions, primary communication channels, triggers, and responsible stakeholders across the wedding lifecycle.
              </p>
            </div>

            <div className="ptf-table-container">
              <table className="ptf-table">
                <thead>
                  <tr>
                    <th>Touchpoint</th>
                    <th>Primary Channel</th>
                    <th>Operational Trigger</th>
                    <th>Responsible Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {REGISTRY_DATA.operationalMatrix.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 800, color: 'var(--navy-900)' }}>{row.touchpoint}</td>
                      <td style={{ fontWeight: 700, color: 'var(--gold-700)' }}>{row.primaryChannel}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{row.operationalTrigger}</td>
                      <td style={{ fontWeight: 800, color: 'var(--emerald-700)' }}>{row.responsibleOwner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: 6-Stage End-to-End SOP Flow */}
        {activeSubTab === 'sop_stages' && (
          <div className="ptf-card" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <span className="ptf-badge ptf-badge-emerald">
                Phase 1 & Phase 2 Deliverables
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8, marginBottom: 6 }}>
                Master Stage Progression: Setup to Settlement
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                End-to-End operational flowchart detailing key user actions, automated backend logic, and milestone outputs.
              </p>
            </div>

            {/* Stepper Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
              {REGISTRY_DATA.flowchartStages.map((st) => (
                <div key={st.stageNum} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 14, padding: 12, textAlign: 'center' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--navy-900)', color: 'var(--gold-400)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, marginBottom: 4 }}>
                    {st.stageNum}
                  </span>
                  <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--navy-900)' }}>
                    {st.title.replace(/Stage \d: /, '')}
                  </div>
                </div>
              ))}
            </div>

            <div className="ptf-table-container">
              <table className="ptf-table">
                <thead>
                  <tr>
                    <th style={{ width: 140 }}>Stage</th>
                    <th>Key User Actions</th>
                    <th>System & Automated Logic</th>
                    <th>Milestone Output</th>
                  </tr>
                </thead>
                <tbody>
                  {REGISTRY_DATA.flowchartStages.map((row) => (
                    <tr key={row.stageNum}>
                      <td style={{ fontWeight: 800, color: 'var(--navy-900)' }}>{row.title}</td>
                      <td style={{ color: 'var(--text-primary)' }}>{row.keyActions}</td>
                      <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.75rem' }}>{row.systemLogic}</td>
                      <td style={{ fontWeight: 700, color: 'var(--emerald-700)' }}>{row.milestoneOutput}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: Original Blueprints */}
        {activeSubTab === 'docs' && (
          <div className="ptf-card" style={{ padding: 36 }}>
            <div style={{ marginBottom: 20 }}>
              <span className="ptf-badge ptf-badge-gold">
                Artifact Blueprint Viewer
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: 8, marginBottom: 6 }}>
                Client Design & Architecture Documentation
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Click on any blueprint below to inspect full resolution.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { title: "Functional System Architecture", file: "/assets/system_architecture.png", desc: "4 Core Modular Pillars" },
                { title: "Wedding Gift Flyer Design", file: "/assets/flyer_card.png", desc: "Sanvi & Santosh Print Card" },
                { title: "Banner & Marketing Graphic", file: "/assets/banner_graphic.png", desc: "Hero Concept Artwork" },
                { title: "Track A & Track B Workflow Matrix", file: "/assets/track_matrix.jpg", desc: "Ceremony & Escrow Pipeline" },
                { title: "End-to-End Operational Flowchart", file: "/assets/workflow_sop.jpg", desc: "Phases 1 & 2 Execution SOP" },
              ].map((doc, idx) => (
                <div 
                  key={idx}
                  onClick={() => setInspectedDoc(doc.file)}
                  className="ptf-card ptf-card-hover"
                  style={{ padding: 18, cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--navy-900)' }}>{doc.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{doc.desc}</p>
                    </div>
                    <Maximize2 style={{ width: 16, height: 16, color: 'var(--gold-600)' }} />
                  </div>
                  <div style={{ height: 200, background: '#FFFFFF', borderRadius: 12, border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={doc.file} alt={doc.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
            </div>

            {inspectedDoc && (
              <div className="ptf-modal-backdrop" onClick={() => setInspectedDoc(null)}>
                <div style={{ position: 'relative', maxWidth: 960, maxHeight: '90vh', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setInspectedDoc(null)}
                    style={{ position: 'absolute', top: -40, right: 0, color: '#FFFFFF', fontWeight: 800, background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: 10 }}
                  >
                    Close [✕]
                  </button>
                  <img src={inspectedDoc} alt="Document" style={{ maxHeight: '82vh', width: 'auto', borderRadius: 16, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }} />
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
