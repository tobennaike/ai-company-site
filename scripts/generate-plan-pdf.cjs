const puppeteer = require('puppeteer');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; color: #111; background: #fff; }

  .cover {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 64px;
    background: #0a0a0a;
    color: #fff;
    page-break-after: always;
  }
  .cover-logo { font-size: 13px; font-weight: 600; letter-spacing: 0.15em; color: #888; text-transform: uppercase; }
  .cover-logo span { color: #fff; }
  .cover-title { font-size: 56px; font-weight: 300; line-height: 1.1; letter-spacing: -0.02em; }
  .cover-title strong { font-weight: 700; }
  .cover-subtitle { font-size: 18px; color: #888; margin-top: 16px; }
  .cover-meta { display: flex; gap: 48px; }
  .cover-meta-item label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px; }
  .cover-meta-item span { font-size: 16px; font-weight: 500; }

  .page { padding: 64px; page-break-after: always; }
  .page:last-child { page-break-after: avoid; }

  .section-tag { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px; }
  h2 { font-size: 32px; font-weight: 300; letter-spacing: -0.02em; color: #111; margin-bottom: 8px; }
  h2 strong { font-weight: 700; }
  .section-sub { font-size: 15px; color: #666; margin-bottom: 36px; }

  /* North Star */
  .north-star-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px; }
  .stat-card { background: #f5f5f5; border-radius: 12px; padding: 24px; }
  .stat-card .number { font-size: 36px; font-weight: 700; letter-spacing: -0.03em; color: #111; }
  .stat-card .label { font-size: 13px; color: #666; margin-top: 4px; }
  .stat-card.dark { background: #0a0a0a; color: #fff; }
  .stat-card.dark .number { color: #fff; }
  .stat-card.dark .label { color: #888; }

  /* Two lane */
  .lane-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
  .lane-card { border-radius: 12px; padding: 28px; }
  .lane-card.lane-1 { background: #0a0a0a; color: #fff; }
  .lane-card.lane-2 { background: #f5f5f5; }
  .lane-num { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 12px; }
  .lane-card.lane-1 .lane-num { color: #555; }
  .lane-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .lane-card.lane-1 .lane-title { color: #fff; }
  .lane-desc { font-size: 14px; line-height: 1.6; color: #666; }
  .lane-card.lane-1 .lane-desc { color: #aaa; }
  .lane-highlight { margin-top: 16px; padding-top: 16px; border-top: 1px solid #222; }
  .lane-card.lane-2 .lane-highlight { border-top-color: #ddd; }
  .lane-highlight-item { font-size: 13px; color: #888; margin-bottom: 6px; }
  .lane-highlight-item strong { color: #111; }
  .lane-card.lane-1 .lane-highlight-item strong { color: #fff; }

  /* Products */
  .product-list { display: flex; flex-direction: column; gap: 16px; }
  .product-item { display: flex; align-items: flex-start; gap: 20px; padding: 20px 24px; background: #f9f9f9; border-radius: 10px; border-left: 3px solid #0a0a0a; }
  .product-item.built { border-left-color: #22c55e; }
  .product-week { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.08em; min-width: 60px; padding-top: 2px; }
  .product-item.built .product-week { color: #22c55e; }
  .product-name { font-size: 16px; font-weight: 600; color: #111; margin-bottom: 4px; }
  .product-desc { font-size: 13px; color: #666; }
  .product-price { font-size: 13px; font-weight: 600; color: #111; margin-top: 6px; }

  /* Pricing */
  .pricing-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .pricing-card { border-radius: 12px; padding: 24px; background: #f5f5f5; }
  .pricing-card.featured { background: #0a0a0a; color: #fff; }
  .pricing-tier { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 8px; }
  .pricing-card.featured .pricing-tier { color: #555; }
  .pricing-card.featured .pricing-tier::after { content: ' — Most Popular'; color: #22c55e; }
  .pricing-impl { font-size: 28px; font-weight: 700; color: #111; letter-spacing: -0.02em; }
  .pricing-card.featured .pricing-impl { color: #fff; }
  .pricing-impl-label { font-size: 12px; color: #888; margin-bottom: 12px; }
  .pricing-recurring { font-size: 16px; font-weight: 600; color: #111; }
  .pricing-card.featured .pricing-recurring { color: #fff; }
  .pricing-recurring-label { font-size: 12px; color: #888; }
  .pricing-margin { margin-top: 12px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  .pricing-card.featured .pricing-margin { border-top-color: #222; color: #888; }

  /* Timeline */
  .timeline { display: flex; flex-direction: column; gap: 0; }
  .timeline-row { display: grid; grid-template-columns: 100px 1fr; gap: 24px; align-items: stretch; }
  .timeline-week { font-size: 12px; font-weight: 700; color: #888; padding: 20px 0; text-align: right; }
  .timeline-content { border-left: 2px solid #e5e5e5; padding: 16px 0 16px 24px; }
  .timeline-row:first-child .timeline-content { border-left-color: #0a0a0a; }
  .timeline-row:nth-child(2) .timeline-content { border-left-color: #0a0a0a; }
  .timeline-title { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 4px; }
  .timeline-detail { font-size: 13px; color: #666; }
  .timeline-target { display: inline-block; margin-top: 6px; font-size: 12px; font-weight: 600; color: #fff; background: #0a0a0a; padding: 3px 10px; border-radius: 20px; }

  /* RCN */
  .rcn-box { background: #0a0a0a; color: #fff; border-radius: 14px; padding: 36px; margin-bottom: 24px; }
  .rcn-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
  .rcn-sub { font-size: 14px; color: #888; margin-bottom: 24px; }
  .rcn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .rcn-item label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #555; display: block; margin-bottom: 4px; }
  .rcn-item span { font-size: 14px; color: #ccc; }
  .rcn-item strong { color: #fff; }

  .objection-list { display: flex; flex-direction: column; gap: 12px; }
  .objection-item { padding: 16px 20px; background: #f5f5f5; border-radius: 10px; }
  .objection-q { font-size: 13px; font-weight: 600; color: #111; margin-bottom: 6px; }
  .objection-a { font-size: 13px; color: #555; line-height: 1.6; }

  /* Targets */
  .targets-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .targets-table th { text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #888; padding: 8px 12px; border-bottom: 2px solid #111; }
  .targets-table td { padding: 12px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
  .targets-table tr:last-child td { border-bottom: none; }
  .tier-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
  .tier-1 { background: #0a0a0a; color: #fff; }
  .tier-2 { background: #e5e5e5; color: #111; }

  /* Moat */
  .moat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .moat-card { padding: 24px; background: #f5f5f5; border-radius: 12px; }
  .moat-card h4 { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
  .moat-card p { font-size: 13px; color: #555; line-height: 1.6; }

  .back-cover {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #0a0a0a;
    color: #fff;
    text-align: center;
  }
  .back-cover h2 { font-size: 40px; font-weight: 300; letter-spacing: -0.02em; margin-bottom: 12px; }
  .back-cover h2 strong { font-weight: 700; }
  .back-cover p { font-size: 16px; color: #888; margin-bottom: 32px; }
  .back-cover .url { font-size: 14px; color: #555; }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-logo"><span>Auxo</span> Partners — Confidential</div>
  <div>
    <div class="cover-title"><strong>90-Day</strong><br>Execution Plan</div>
    <div class="cover-subtitle">AI Automation for SMBs — From Zero to $15K MRR</div>
  </div>
  <div class="cover-meta">
    <div class="cover-meta-item">
      <label>Founders</label>
      <span>Tobenna Ikejiani + Meki Kimario</span>
    </div>
    <div class="cover-meta-item">
      <label>Date</label>
      <span>March 2026</span>
    </div>
    <div class="cover-meta-item">
      <label>Version</label>
      <span>v1.0 — Internal</span>
    </div>
  </div>
</div>

<!-- PAGE 1: NORTH STAR -->
<div class="page">
  <div class="section-tag">Mission</div>
  <h2>The <strong>North Star</strong></h2>
  <div class="section-sub">One goal. Everything else is noise.</div>

  <div class="north-star-grid">
    <div class="stat-card dark">
      <div class="number">$15K</div>
      <div class="label">MRR target — Week 8-10</div>
    </div>
    <div class="stat-card">
      <div class="number">6-10</div>
      <div class="label">Paying clients to get there</div>
    </div>
    <div class="stat-card">
      <div class="number">~90%</div>
      <div class="label">Gross margin at scale (cost base $200-400/mo per client)</div>
    </div>
    <div class="stat-card">
      <div class="number">$0</div>
      <div class="label">Paid acquisition budget — all warm + outbound</div>
    </div>
  </div>

  <div class="section-tag" style="margin-top:8px;">Execution Philosophy</div>
  <h2>Move <strong>Fast.</strong> Win <strong>First.</strong></h2>
  <div class="section-sub" style="margin-bottom:20px;">Brad Jacobs-style: pick the fastest path to proof, then scale the playbook. No R&D cycles. No perfect product. Ship, charge, iterate.</div>

  <div class="moat-grid">
    <div class="moat-card">
      <h4>Ship in weeks, not months</h4>
      <p>Every product launches within 8 weeks. We use existing tools (Meki's stack, Derra AI) — no greenfield builds. If it can't be deployed in 2 weeks, it doesn't go first.</p>
    </div>
    <div class="moat-card">
      <h4>Charge from day one</h4>
      <p>Free pilots only to prove RCN partnership. All other clients pay on signing. Implementation fee closes the deal and funds operations.</p>
    </div>
    <div class="moat-card">
      <h4>CPA network = distribution moat</h4>
      <p>RCN CPAs is the beachhead. Each CPA partner we sign = 10-50 clients at zero CAC. By Month 6, we want 3-5 CPA firms routing their books.</p>
    </div>
    <div class="moat-card">
      <h4>Margins fund the machine</h4>
      <p>$10K implementation + $2.5K/mo per client. Cost to serve: $400/mo. Every client is a cash machine. Capital stays in, not out.</p>
    </div>
  </div>
</div>

<!-- PAGE 2: TWO-LANE STRATEGY -->
<div class="page">
  <div class="section-tag">Strategy</div>
  <h2>Two-Lane <strong>Attack</strong></h2>
  <div class="section-sub">Run both simultaneously from Week 1. Lane 1 closes deals. Lane 2 builds pipeline.</div>

  <div class="lane-grid">
    <div class="lane-card lane-1">
      <div class="lane-num">Lane 1 — Beachhead</div>
      <div class="lane-title">RCN CPAs</div>
      <div class="lane-desc">Family accounting firm as warm intro channel. Get access to their SMB client list. Run free pilots for 3-5 clients to prove ROI. Convert to paid. Replicate across 3-5 more CPA firms.</div>
      <div class="lane-highlight">
        <div class="lane-highlight-item"><strong>Rev share:</strong> 15-20% to RCN on conversions</div>
        <div class="lane-highlight-item"><strong>CAC:</strong> $0 — warm intros only</div>
        <div class="lane-highlight-item"><strong>Timeline:</strong> First pilots live Week 2-3</div>
        <div class="lane-highlight-item"><strong>Moat:</strong> CPA relationships = recurring deal flow</div>
      </div>
    </div>
    <div class="lane-card lane-2">
      <div class="lane-num">Lane 2 — Outbound</div>
      <div class="lane-title">Direct Outreach</div>
      <div class="lane-desc">LinkedIn DMs + cold email to Atlanta SMBs ($1-10MM revenue). Lead with Free AI Audit offer. 20 Tier 1 targets identified across medical billing, dental, staffing, law, logistics.</div>
      <div class="lane-highlight">
        <div class="lane-highlight-item"><strong>Target:</strong> Atlanta metro, $1-10MM rev</div>
        <div class="lane-highlight-item"><strong>Lead magnet:</strong> Free AI Audit (website + DMs)</div>
        <div class="lane-highlight-item"><strong>Priority verticals:</strong> Medical billing, dental, staffing</div>
        <div class="lane-highlight-item"><strong>Website:</strong> ai-company-site.vercel.app ✓ Live</div>
      </div>
    </div>
  </div>

  <div class="section-tag">Why This Works</div>
  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
    <div style="padding:20px; background:#f5f5f5; border-radius:10px;">
      <div style="font-size:22px; font-weight:700; margin-bottom:6px;">Lane 1</div>
      <div style="font-size:13px; color:#555;">Closes fast. Warm leads, no education required, family trust accelerates deal velocity.</div>
    </div>
    <div style="padding:20px; background:#f5f5f5; border-radius:10px;">
      <div style="font-size:22px; font-weight:700; margin-bottom:6px;">Lane 2</div>
      <div style="font-size:13px; color:#555;">Builds independent pipeline. Not reliant on one relationship. Proves repeatable sales motion.</div>
    </div>
    <div style="padding:20px; background:#0a0a0a; border-radius:10px; color:#fff;">
      <div style="font-size:22px; font-weight:700; margin-bottom:6px;">Together</div>
      <div style="font-size:13px; color:#888;">Lane 1 funds Lane 2. First RCN client pays for outbound tooling + next month's ops.</div>
    </div>
  </div>
</div>

<!-- PAGE 3: PRODUCTS -->
<div class="page">
  <div class="section-tag">Product Roadmap</div>
  <h2>Four Tools. <strong>Eight Weeks.</strong></h2>
  <div class="section-sub">Build in order of fastest time-to-revenue. Both founders own technical delivery.</div>

  <div class="product-list">
    <div class="product-item built">
      <div class="product-week">Built ✓</div>
      <div>
        <div class="product-name">Derra AI — Financial Reporting Automation</div>
        <div class="product-desc">Tax review assistant for CPA firms. Already deployed and live. Use as proof-of-concept in every RCN conversation.</div>
        <div class="product-price">$300–500/mo — demo-ready today</div>
      </div>
    </div>
    <div class="product-item">
      <div class="product-week">Wk 1–2</div>
      <div>
        <div class="product-name">AI Sales Funnel & Lead Follow-Up Agent</div>
        <div class="product-desc">Adapts Meki's existing tools. Automates lead capture, follow-up sequences, CRM updates, and appointment booking. Never miss a deal.</div>
        <div class="product-price">$1,000–2,000/mo add-on</div>
      </div>
    </div>
    <div class="product-item">
      <div class="product-week">Wk 3–4</div>
      <div>
        <div class="product-name">Invoice & Document Processor</div>
        <div class="product-desc">OCR + QuickBooks/Xero integration. Extracts, classifies, and posts invoices/receipts automatically. Built for accounting + medical billing clients.</div>
        <div class="product-price">$500–800/mo add-on</div>
      </div>
    </div>
    <div class="product-item">
      <div class="product-week">Wk 5–8</div>
      <div>
        <div class="product-name">AI Customer Support Chatbot</div>
        <div class="product-desc">Custom bot trained on client docs, FAQs, and product knowledge. 24/7 coverage without headcount. Handles tier-1 support and escalates complex issues.</div>
        <div class="product-price">$500–1,500/mo add-on</div>
      </div>
    </div>
  </div>

  <div style="margin-top:32px; padding:20px 24px; background:#f0fdf4; border-radius:10px; border-left:3px solid #22c55e;">
    <div style="font-size:13px; font-weight:700; color:#15803d; margin-bottom:6px;">Packaging Logic</div>
    <div style="font-size:13px; color:#555; line-height:1.6;">Clients don't buy tools — they buy outcomes. Bundle tools into the Starter/Growth/Scale tiers. Implementation fee = one-time cash. Monthly retainer = recurring service. Client never manages the AI — we do. That's the moat.</div>
  </div>
</div>

<!-- PAGE 4: PRICING -->
<div class="page">
  <div class="section-tag">Business Model</div>
  <h2>Pricing That <strong>Prints</strong></h2>
  <div class="section-sub">High-ticket implementation front-loads cash. Recurring retainer compounds. Margins are extraordinary.</div>

  <div class="pricing-grid">
    <div class="pricing-card">
      <div class="pricing-tier">Starter</div>
      <div class="pricing-impl">$5,000</div>
      <div class="pricing-impl-label">one-time implementation</div>
      <div class="pricing-recurring">$1,500<span style="font-size:13px;font-weight:400;color:#888;">/mo</span></div>
      <div class="pricing-recurring-label">ongoing service</div>
      <div class="pricing-margin">1 AI tool · Email support · Monthly report</div>
    </div>
    <div class="pricing-card featured">
      <div class="pricing-tier">Growth</div>
      <div class="pricing-impl">$10,000</div>
      <div class="pricing-impl-label" style="color:#666;">one-time implementation</div>
      <div class="pricing-recurring">$2,500<span style="font-size:13px;font-weight:400;color:#666;">/mo</span></div>
      <div class="pricing-recurring-label" style="color:#666;">ongoing service</div>
      <div class="pricing-margin">2 tools · Custom integrations · Monthly strategy check-in</div>
    </div>
    <div class="pricing-card">
      <div class="pricing-tier">Scale</div>
      <div class="pricing-impl">$20,000</div>
      <div class="pricing-impl-label">one-time implementation</div>
      <div class="pricing-recurring">$5,000<span style="font-size:13px;font-weight:400;color:#888;">/mo</span></div>
      <div class="pricing-recurring-label">ongoing service</div>
      <div class="pricing-margin">All tools · Dedicated AM · SLA · QBRs</div>
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-top:8px;">
    <div style="padding:20px; background:#f5f5f5; border-radius:10px;">
      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#888; margin-bottom:8px;">Month 1 (2 Growth clients)</div>
      <div style="font-size:28px; font-weight:700;">$25,000</div>
      <div style="font-size:13px; color:#666; margin-top:4px;">$20K impl + $5K first month</div>
    </div>
    <div style="padding:20px; background:#f5f5f5; border-radius:10px;">
      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#888; margin-bottom:8px;">Month 2 MRR (6 clients)</div>
      <div style="font-size:28px; font-weight:700;">$15,000</div>
      <div style="font-size:13px; color:#666; margin-top:4px;">Blended avg $2,500/mo × 6</div>
    </div>
    <div style="padding:20px; background:#0a0a0a; border-radius:10px; color:#fff;">
      <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#555; margin-bottom:8px;">Gross Margin at Scale</div>
      <div style="font-size:28px; font-weight:700; color:#22c55e;">~90%</div>
      <div style="font-size:13px; color:#888; margin-top:4px;">Cost base $200-400/mo per client</div>
    </div>
  </div>
</div>

<!-- PAGE 5: 8-WEEK TIMELINE -->
<div class="page">
  <div class="section-tag">Execution</div>
  <h2>Week-by-Week <strong>Plan</strong></h2>
  <div class="section-sub">No slack. Every week has a deliverable and a revenue target.</div>

  <div class="timeline">
    <div class="timeline-row">
      <div class="timeline-week">Week 1–2</div>
      <div class="timeline-content">
        <div class="timeline-title">Foundation + First Deals</div>
        <div class="timeline-detail">RCN call, pitch partnership, identify 3-5 pilot clients. Ship AI Sales Funnel tool. Website live (already done ✓). First outbound DMs sent to Tier 1 targets.</div>
        <span class="timeline-target">Target: 2-3 pilot commitments</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Week 3–4</div>
      <div class="timeline-content">
        <div class="timeline-title">Pilots Live + Invoice Tool</div>
        <div class="timeline-detail">RCN pilots deployed and running. Invoice/Document Processor shipped. First outbound responses converting to discovery calls. Partnership agreement signed with RCN.</div>
        <span class="timeline-target">Target: 1-2 paid clients</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Week 5–6</div>
      <div class="timeline-content">
        <div class="timeline-title">Convert Pilots + Build Chatbot</div>
        <div class="timeline-detail">Pilot clients shown results, converted to paid Growth tier. Chatbot build begins. Second wave outbound. First case study written from pilot results.</div>
        <span class="timeline-target">Target: 3-4 paying clients, $7.5-10K MRR</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Week 7–8</div>
      <div class="timeline-content">
        <div class="timeline-title">Chatbot Live + Scale</div>
        <div class="timeline-detail">Chatbot deployed for first clients. Outbound pipeline maturing. Pitch 2nd CPA firm using RCN results as proof. Upsell existing clients to next tier.</div>
        <span class="timeline-target">Target: $12-15K MRR, 2nd CPA partner conversation</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Month 3–6</div>
      <div class="timeline-content">
        <div class="timeline-title">Scale the Playbook</div>
        <div class="timeline-detail">15-20 clients. 3-5 CPA distribution partners. First hire (ops/support). Monthly cash machine funding next acquisition.</div>
        <span class="timeline-target">Target: $25K+ MRR, productized playbook</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Month 12</div>
      <div class="timeline-content">
        <div class="timeline-title">Scale</div>
        <div class="timeline-detail">50+ clients, $50-80K MRR. Productized service playbook, 3-5 CPA distribution partners, first dedicated hire. Auxo operates as a standalone, high-margin vertical within the holding company.</div>
        <span class="timeline-target">Target: $50-80K MRR</span>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 6: OUTBOUND TARGETS -->
<div class="page">
  <div class="section-tag">Outbound Pipeline</div>
  <h2>Atlanta <strong>Tier 1</strong> Targets</h2>
  <div class="section-sub">Accounting firms run through RCN channel only. Priority verticals TBD — Tobenna and Meki to align on right verticals before outreach begins.</div>

  <div style="background:#f5f5f5; border-radius:14px; padding:36px; text-align:center; margin-bottom:24px;">
    <div style="font-size:48px; font-weight:700; color:#0a0a0a; letter-spacing:-0.03em; margin-bottom:12px;">TBD</div>
    <div style="font-size:16px; font-weight:600; color:#111; margin-bottom:8px;">Verticals to be confirmed by founders</div>
    <div style="font-size:14px; color:#666; max-width:400px; margin:0 auto;">Tobenna and Meki to connect and validate the right Atlanta verticals before targeting. Accounting firms are reserved exclusively for the RCN channel.</div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
    <div style="padding:20px; background:#fff; border:1px solid #e5e5e5; border-radius:10px;">
      <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#888; margin-bottom:8px;">Confirmed Exclusion</div>
      <div style="font-size:14px; color:#111; font-weight:600;">Accounting Firms</div>
      <div style="font-size:13px; color:#666; margin-top:4px;">RCN channel only — no cold outreach to protect the partnership</div>
    </div>
    <div style="padding:20px; background:#0a0a0a; border-radius:10px;">
      <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#555; margin-bottom:8px;">Next Action</div>
      <div style="font-size:14px; color:#fff; font-weight:600;">Founder Alignment Call</div>
      <div style="font-size:13px; color:#888; margin-top:4px;">Tobenna + Meki to decide verticals, then populate targets</div>
    </div>
  </div>

  <div style="margin-top:20px; padding:16px 20px; background:#f5f5f5; border-radius:10px; font-size:13px; color:#555;">
    <strong style="color:#111;">Once verticals confirmed:</strong> LinkedIn DM → discovery call → Free AI Audit → proposal. Use Sales Navigator: Atlanta + vertical + 10-50 employees to find decision-maker names.
  </div>
</div>

<!-- BACK COVER -->
<div class="back-cover">
  <h2>Let's <strong>Build.</strong></h2>
  <p>Week 1 starts now. RCN call first. Everything else follows.</p>
  <div class="url">ai-company-site.vercel.app · Confidential — Internal Use Only</div>
</div>

</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outputPath = path.join(__dirname, 'auxo-partners-launch-plan.pdf');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  console.log('PDF saved to:', outputPath);
})();
