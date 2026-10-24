import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Download, 
  Utensils, 
  Hotel, 
  Send, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { REGISTRY_DATA } from '../data/mockData';

export default function HostDashboardView({ fundedSqFt, totalSqFt, blessings, rsvpList }) {
  const [filterType, setFilterType] = useState('all');

  const percentage = Math.round((fundedSqFt / totalSqFt) * 100);
  const totalAmount = fundedSqFt * REGISTRY_DATA.metrics.costPerSqFt;
  const targetAmount = totalSqFt * REGISTRY_DATA.metrics.costPerSqFt;

  return (
    <div style={{ padding: '48px 0', minHeight: '100vh', background: 'var(--bg-page)' }}>
      <div className="ptf-container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div className="ptf-badge ptf-badge-emerald" style={{ marginBottom: 8 }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>Host & Financial Administration Portal</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              Sanvi & Santosh • Event Analytics
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Real-time monitoring of wedding RSVPs, catering headcounts, and RBI escrow fund accumulation.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => alert("RSVP & Escrow Ledger exported to CSV format!")}
              className="btn-outline"
            >
              <FileSpreadsheet style={{ width: 16, height: 16, color: 'var(--emerald-600)' }} />
              <span>Export CSV Ledger</span>
            </button>

            <button
              onClick={() => alert("Broadcast sent to all attending guests on WhatsApp!")}
              className="btn-primary"
            >
              <Send style={{ width: 16, height: 16, color: 'var(--gold-400)' }} />
              <span>Broadcast Update</span>
            </button>
          </div>
        </div>

        {/* 4 Metrics Cards */}
        <div className="ptf-summary-cards-grid" style={{ marginBottom: 32 }}>
          
          <div className="ptf-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Escrow Corpus</span>
              <span className="ptf-badge ptf-badge-emerald">{percentage}% of Goal</span>
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              ₹{(totalAmount / 100000).toFixed(2)} Lakhs
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Target: ₹{(targetAmount / 100000).toFixed(2)} Lakhs ({totalSqFt} SFT)
            </div>
          </div>

          <div className="ptf-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Confirmed RSVPs</span>
              <span className="ptf-badge ptf-badge-gold">342 Attendees</span>
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              {rsvpList.length + 184} Guests
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              182 Veg • 64 Jain • 96 Non-Veg
            </div>
          </div>

          <div className="ptf-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hospitality Stay</span>
              <span className="ptf-badge ptf-badge-navy">Taj Falaknuma</span>
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              24 Rooms
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              12 Airport Shuttles Requisitioned
            </div>
          </div>

          <div className="ptf-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.688rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Builder Settlement</span>
              <span className="ptf-badge ptf-badge-emerald">Verified</span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              Post-Wedding RTGS
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Tripartite Escrow Agreement Active
            </div>
          </div>

        </div>

        {/* 2-Column Section: Contributions Ledger + RERA Builder Linkage */}
        <div className="ptf-dashboard-grid">
          
          {/* Left: Contributions Ledger */}
          <div className="ptf-card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                  Live Escrow Contributions Ledger
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  All transactions ring-fenced under RBI Tripartite Escrow Trust guidelines.
                </p>
              </div>
              <span className="ptf-badge ptf-badge-gold">
                {blessings.length} Recorded Gifts
              </span>
            </div>

            <div className="ptf-table-container">
              <table className="ptf-table">
                <thead>
                  <tr>
                    <th>Guest & Relation</th>
                    <th>Allocated Area</th>
                    <th>Corpus Amount</th>
                    <th>Escrow Status</th>
                    <th>Deed Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {blessings.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--navy-900)' }}>{b.guestName}</div>
                        <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)' }}>{b.relation}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--gold-700)' }}>
                        {b.sqft} SFT ({b.roomName})
                      </td>
                      <td style={{ fontWeight: 800, color: 'var(--navy-900)' }}>
                        ₹{b.amount.toLocaleString('en-IN')}
                      </td>
                      <td>
                        <span className="ptf-badge ptf-badge-emerald" style={{ fontSize: '0.625rem' }}>
                          <CheckCircle2 style={{ width: 12, height: 12 }} />
                          Escrow Ringed
                        </span>
                      </td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        #{b.tileCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: RERA Builder Linkage & Catering Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            <div className="ptf-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <ShieldCheck style={{ width: 20, height: 20, color: 'var(--emerald-600)' }} />
                <h4 style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)' }}>RERA Project Linkage</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.75rem' }}>
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Project Name</div>
                  <div style={{ fontWeight: 800, color: 'var(--navy-900)', fontSize: '0.875rem', marginTop: 2 }}>SkyHigh Enclave, Tower Emerald</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>Unit 1402 (1,200 SQ.FT.)</div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>RERA Registration</div>
                  <div style={{ fontWeight: 800, color: 'var(--navy-900)', fontFamily: 'monospace', marginTop: 2 }}>P02400008921 (Telangana RERA)</div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Escrow Trustee Bank</div>
                  <div style={{ fontWeight: 800, color: 'var(--navy-900)', marginTop: 2 }}>ICICI Bank Trust Services</div>
                  <div style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.688rem', marginTop: 2 }}>A/C Ref: ESC-WF-2026-8921-HYD</div>
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--emerald-600)' }} />
                  Dual-Authorization Wire Armed for Payout
                </span>
              </div>
            </div>

            {/* Catering Breakdown */}
            <div className="ptf-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Utensils style={{ width: 20, height: 20, color: 'var(--gold-600)' }} />
                <h4 style={{ fontWeight: 800, fontSize: '0.938rem', color: 'var(--navy-900)' }}>Catering Breakdown</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'var(--bg-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Pure Vegetarian Feast:</span>
                  <strong style={{ color: 'var(--navy-900)' }}>182 Guests (53%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'var(--bg-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Jain (No Root Veg):</span>
                  <strong style={{ color: 'var(--navy-900)' }}>64 Guests (19%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'var(--bg-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Non-Vegetarian:</span>
                  <strong style={{ color: 'var(--navy-900)' }}>96 Guests (28%)</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
