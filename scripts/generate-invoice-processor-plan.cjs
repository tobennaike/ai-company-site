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
  .cover-title { font-size: 52px; font-weight: 300; line-height: 1.1; letter-spacing: -0.02em; }
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

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px; }
  .stat-card { background: #f5f5f5; border-radius: 12px; padding: 24px; }
  .stat-card .number { font-size: 36px; font-weight: 700; letter-spacing: -0.03em; color: #111; }
  .stat-card .label { font-size: 13px; color: #666; margin-top: 4px; }
  .stat-card.dark { background: #0a0a0a; color: #fff; }
  .stat-card.dark .number { color: #fff; }
  .stat-card.dark .label { color: #888; }

  .moat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .moat-card { padding: 24px; background: #f5f5f5; border-radius: 12px; }
  .moat-card h4 { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
  .moat-card p { font-size: 13px; color: #555; line-height: 1.6; }

  .tech-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 32px; }
  .tech-table th { text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #888; padding: 8px 12px; border-bottom: 2px solid #111; }
  .tech-table td { padding: 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
  .tech-table td:first-child { font-weight: 600; color: #111; }
  .tech-table td:nth-child(2) { font-weight: 600; color: #111; }
  .tech-table td:nth-child(3) { color: #666; }
  .tech-table tr:last-child td { border-bottom: none; }

  .flow-steps { display: flex; flex-direction: column; gap: 0; }
  .flow-step { display: grid; grid-template-columns: 40px 1fr; gap: 16px; align-items: stretch; }
  .flow-num { font-size: 13px; font-weight: 700; color: #fff; background: #0a0a0a; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
  .flow-content { border-left: 2px solid #e5e5e5; padding: 0 0 24px 16px; }
  .flow-step:last-child .flow-content { border-left-color: transparent; }
  .flow-title { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 4px; }
  .flow-desc { font-size: 13px; color: #666; line-height: 1.5; }

  .confidence-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .conf-card { border-radius: 12px; padding: 24px; }
  .conf-card.green { background: #f0fdf4; border-left: 4px solid #22c55e; }
  .conf-card.yellow { background: #fefce8; border-left: 4px solid #eab308; }
  .conf-card.red { background: #fef2f2; border-left: 4px solid #ef4444; }
  .conf-threshold { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 4px; }
  .conf-card.green .conf-threshold { color: #15803d; }
  .conf-card.yellow .conf-threshold { color: #a16207; }
  .conf-card.red .conf-threshold { color: #dc2626; }
  .conf-label { font-size: 13px; font-weight: 600; margin-bottom: 6px; }
  .conf-desc { font-size: 12px; color: #666; line-height: 1.5; }

  .feature-list { display: flex; flex-direction: column; gap: 16px; }
  .feature-item { display: flex; align-items: flex-start; gap: 20px; padding: 20px 24px; background: #f9f9f9; border-radius: 10px; border-left: 3px solid #0a0a0a; }
  .feature-num { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.08em; min-width: 60px; padding-top: 2px; }
  .feature-name { font-size: 16px; font-weight: 600; color: #111; margin-bottom: 4px; }
  .feature-desc { font-size: 13px; color: #666; line-height: 1.5; }

  .pitfall-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .pitfall-table th { text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #888; padding: 8px 12px; border-bottom: 2px solid #111; }
  .pitfall-table td { padding: 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
  .pitfall-table td:first-child { font-weight: 600; color: #111; }
  .pitfall-table td:nth-child(2) { color: #666; }
  .pitfall-table tr:last-child td { border-bottom: none; }

  .schema-box { background: #0a0a0a; border-radius: 14px; padding: 28px 32px; color: #fff; font-family: 'SF Mono', 'Fira Code', monospace; font-size: 13px; line-height: 1.7; margin-bottom: 24px; }
  .schema-box .field { color: #7dd3fc; }
  .schema-box .type { color: #86efac; }
  .schema-box .comment { color: #555; }

  .timeline { display: flex; flex-direction: column; gap: 0; }
  .timeline-row { display: grid; grid-template-columns: 100px 1fr; gap: 24px; align-items: stretch; }
  .timeline-week { font-size: 12px; font-weight: 700; color: #888; padding: 20px 0; text-align: right; }
  .timeline-content { border-left: 2px solid #e5e5e5; padding: 16px 0 16px 24px; }
  .timeline-row:first-child .timeline-content { border-left-color: #0a0a0a; }
  .timeline-row:nth-child(2) .timeline-content { border-left-color: #0a0a0a; }
  .timeline-title { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 4px; }
  .timeline-detail { font-size: 13px; color: #666; }
  .timeline-target { display: inline-block; margin-top: 6px; font-size: 12px; font-weight: 600; color: #fff; background: #0a0a0a; padding: 3px 10px; border-radius: 20px; }

  .verify-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .verify-card { padding: 20px; background: #f5f5f5; border-radius: 10px; }
  .verify-card .metric { font-size: 22px; font-weight: 700; color: #111; margin-bottom: 4px; }
  .verify-card .desc { font-size: 13px; color: #666; }

  .decision-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .decision-card { padding: 20px; border-radius: 10px; }
  .decision-card label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; display: block; margin-bottom: 8px; }
  .decision-card .choice { font-size: 18px; font-weight: 700; color: #111; margin-bottom: 4px; }
  .decision-card .reason { font-size: 13px; color: #666; }

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
  <div class="cover-logo"><span>Auxo</span> Solutions &mdash; Confidential</div>
  <div>
    <div class="cover-title"><strong>Invoice &amp;</strong><br>Document Processor</div>
    <div class="cover-subtitle">Product #2 &mdash; AI-Powered Extraction, Routing &amp; QuickBooks Integration</div>
  </div>
  <div class="cover-meta">
    <div class="cover-meta-item">
      <label>Product</label>
      <span>#2 of 4 &mdash; Auxo Suite</span>
    </div>
    <div class="cover-meta-item">
      <label>Build Window</label>
      <span>Weeks 3&ndash;4</span>
    </div>
    <div class="cover-meta-item">
      <label>Date</label>
      <span>March 2026</span>
    </div>
  </div>
</div>

<!-- PAGE 1: WHY THIS EXISTS -->
<div class="page">
  <div class="section-tag">The Problem</div>
  <h2>Why Existing Tools <strong>Fail SMBs</strong></h2>
  <div class="section-sub">Rossum, Nanonets, Docsumo &mdash; they all break in the same 3 ways. We fix all three.</div>

  <div class="stat-grid">
    <div class="stat-card dark">
      <div class="number">5&ndash;15 hrs</div>
      <div class="label">per week &mdash; manual exception handling with current tools</div>
    </div>
    <div class="stat-card">
      <div class="number">$10&ndash;50K</div>
      <div class="label">implementation fees before a single invoice is processed</div>
    </div>
    <div class="stat-card">
      <div class="number">Template</div>
      <div class="label">based systems &mdash; break when a vendor changes their format</div>
    </div>
    <div class="stat-card dark">
      <div class="number">$0</div>
      <div class="label">our per-document fees &mdash; bundled into Auxo tier pricing</div>
    </div>
  </div>

  <div class="section-tag" style="margin-top:8px;">Our Edge</div>
  <h2>Three Fixes. <strong>Zero Templates.</strong></h2>
  <div class="section-sub" style="margin-bottom:20px;">LLM extraction handles any vendor format. Confidence routing eliminates manual review. Tier pricing kills per-doc fees.</div>

  <div class="moat-grid">
    <div class="moat-card">
      <h4>Automated Triage</h4>
      <p>Confidence-based routing auto-posts high-certainty invoices and surfaces only real exceptions. Cuts manual review from 5&ndash;15 hrs/week to near zero.</p>
    </div>
    <div class="moat-card">
      <h4>No Templates Needed</h4>
      <p>Claude extracts from any vendor format &mdash; no template setup, no breakage when vendors change invoices. Works on day one with every supplier.</p>
    </div>
    <div class="moat-card">
      <h4>SMB-Friendly Pricing</h4>
      <p>Bundled into existing Auxo tiers ($1,500&ndash;$5,000/mo). No per-document fees, no $10K implementation just for invoicing.</p>
    </div>
    <div class="moat-card">
      <h4>Native QuickBooks Sync</h4>
      <p>OAuth once, sync forever. Auto-posts validated invoices as QB Bills. Batch support for high-volume clients.</p>
    </div>
  </div>
</div>

<!-- PAGE 2: TECH STACK -->
<div class="page">
  <div class="section-tag">Infrastructure</div>
  <h2>Tech <strong>Stack</strong></h2>
  <div class="section-sub">Open-source where it matters. Best-in-class where it counts. All research-validated.</div>

  <table class="tech-table">
    <tr><th>Layer</th><th>Tool</th><th>Why</th></tr>
    <tr><td>PDF Parsing</td><td>Docling (IBM)</td><td>97.9% table accuracy, Apache 2.0, handles PDF/DOCX/images</td></tr>
    <tr><td>OCR Fallback</td><td>Surya OCR</td><td>97.7% accuracy on invoices, 90+ languages, open-source</td></tr>
    <tr><td>Extraction</td><td>Claude 3.5 Sonnet</td><td>Best JSON consistency, ~$0.001&ndash;0.01/invoice, any vendor format</td></tr>
    <tr><td>Validation</td><td>Pydantic + Thresholds</td><td>Type-safe schemas, confidence routing at 0.80/0.95 cutoffs</td></tr>
    <tr><td>Accounting</td><td>QuickBooks Online API</td><td>OAuth 2.0, batch endpoints &mdash; where most SMBs already live</td></tr>
    <tr><td>Backend</td><td>Python (FastAPI)</td><td>Matches Derra AI stack, fast async processing</td></tr>
    <tr><td>Frontend</td><td>React + Vite + Tailwind</td><td>Standalone client portal &mdash; review queue + dashboard</td></tr>
    <tr><td>Deployment</td><td>Railway</td><td>Consistent with all Auxo/Derra deployments</td></tr>
  </table>

  <div style="padding:20px 24px; background:#f0fdf4; border-radius:10px; border-left:3px solid #22c55e;">
    <div style="font-size:13px; font-weight:700; color:#15803d; margin-bottom:6px;">Cost Per Invoice</div>
    <div style="font-size:13px; color:#555; line-height:1.6;">Docling + Surya = free (open-source). Claude extraction = $0.001&ndash;0.01 per invoice. At 500 invoices/month per client, total AI cost is $0.50&ndash;$5.00/month. Margin on a $1,500/mo client: <strong style="color:#111;">&gt;99%</strong> on this product alone.</div>
  </div>
</div>

<!-- PAGE 3: ARCHITECTURE -->
<div class="page">
  <div class="section-tag">Architecture</div>
  <h2>Processing <strong>Pipeline</strong></h2>
  <div class="section-sub">Document in, validated bill in QuickBooks out. Seven steps, fully automated.</div>

  <div class="flow-steps">
    <div class="flow-step">
      <div class="flow-num">1</div>
      <div class="flow-content">
        <div class="flow-title">Document Upload</div>
        <div class="flow-desc">Client drags &amp; drops invoices in the portal. Supports PDF, DOCX, PNG, JPG. Email ingestion TBU.</div>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">2</div>
      <div class="flow-content">
        <div class="flow-title">Document Parsing (Docling)</div>
        <div class="flow-desc">IBM's Docling extracts text, tables, and layout structure. Handles multi-page invoices with built-in document splitter and table merging.</div>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">3</div>
      <div class="flow-content">
        <div class="flow-title">OCR Fallback (Surya)</div>
        <div class="flow-desc">If document is scanned or image-heavy, Surya OCR processes it at 97.7% accuracy. Supports 90+ languages and European number formats.</div>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">4</div>
      <div class="flow-content">
        <div class="flow-title">Structured Extraction (Claude)</div>
        <div class="flow-desc">Claude 3.5 Sonnet extracts all invoice fields into a typed Pydantic schema. No templates &mdash; handles any vendor format. Returns confidence scores per field.</div>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">5</div>
      <div class="flow-content">
        <div class="flow-title">Confidence Router</div>
        <div class="flow-desc">Scores each extraction. &gt;0.95 = auto-post to QB. 0.80&ndash;0.95 = review queue. &lt;0.80 = flagged for manual entry with pre-filled data.</div>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">6</div>
      <div class="flow-content">
        <div class="flow-title">QuickBooks Integration</div>
        <div class="flow-desc">Maps validated invoice to QB Bill format. Posts via OAuth 2.0 with batch support (up to 25 at once). Proactive token refresh.</div>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">7</div>
      <div class="flow-content">
        <div class="flow-title">Client Portal</div>
        <div class="flow-desc">Review queue for flagged invoices, audit log of all processed documents, dashboard with metrics and time-saved estimates.</div>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 4: CONFIDENCE ROUTING + SCHEMA -->
<div class="page">
  <div class="section-tag">Core Differentiator</div>
  <h2>Confidence-Based <strong>Routing</strong></h2>
  <div class="section-sub">The key innovation. Every invoice gets a confidence score. Routing is automatic.</div>

  <div class="confidence-grid">
    <div class="conf-card green">
      <div class="conf-threshold">&gt; 0.95</div>
      <div class="conf-label">Auto-Post</div>
      <div class="conf-desc">Directly posted to QuickBooks as a Bill. No human intervention. Target: 80%+ of all invoices land here.</div>
    </div>
    <div class="conf-card yellow">
      <div class="conf-threshold">0.80&ndash;0.95</div>
      <div class="conf-label">Review Queue</div>
      <div class="conf-desc">Appears in client portal with uncertain fields highlighted. One-click approve or edit &amp; approve.</div>
    </div>
    <div class="conf-card red">
      <div class="conf-threshold">&lt; 0.80</div>
      <div class="conf-label">Manual Entry</div>
      <div class="conf-desc">Pre-filled form with whatever was extracted. Client completes missing fields. Still faster than starting from scratch.</div>
    </div>
  </div>

  <div class="section-tag" style="margin-top:24px;">Extraction Schema</div>
  <h2>What We <strong>Extract</strong></h2>
  <div class="section-sub">Typed Pydantic schema. Every field has a confidence score.</div>

  <div class="schema-box">
    <span class="comment">// Core invoice fields extracted by Claude</span><br><br>
    <span class="field">vendor_name</span>: <span class="type">string</span><br>
    <span class="field">vendor_address</span>: <span class="type">string</span><br>
    <span class="field">invoice_number</span>: <span class="type">string</span><br>
    <span class="field">invoice_date</span>: <span class="type">date</span><br>
    <span class="field">due_date</span>: <span class="type">date | null</span><br>
    <span class="field">line_items</span>: <span class="type">LineItem[]</span> <span class="comment">// description, qty, unit_price, amount</span><br>
    <span class="field">subtotal</span>: <span class="type">decimal</span><br>
    <span class="field">tax</span>: <span class="type">decimal</span><br>
    <span class="field">total</span>: <span class="type">decimal</span><br>
    <span class="field">currency</span>: <span class="type">string</span> <span class="comment">// USD, EUR, GBP, etc.</span><br>
    <span class="field">payment_terms</span>: <span class="type">string | null</span> <span class="comment">// Net 30, Due on Receipt, etc.</span><br>
    <span class="field">confidence_score</span>: <span class="type">float</span> <span class="comment">// 0.0 &ndash; 1.0 overall</span>
  </div>
</div>

<!-- PAGE 5: FEATURES -->
<div class="page">
  <div class="section-tag">MVP Features</div>
  <h2>Five Core <strong>Capabilities</strong></h2>
  <div class="section-sub">Everything needed to process invoices end-to-end. Nothing more.</div>

  <div class="feature-list">
    <div class="feature-item">
      <div class="feature-num">Feature 1</div>
      <div>
        <div class="feature-name">Document Upload</div>
        <div class="feature-desc">Drag &amp; drop in the client portal. PDF, DOCX, PNG, JPG. Batch upload supported. Email ingestion to be added post-MVP.</div>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature-num">Feature 2</div>
      <div>
        <div class="feature-name">AI Extraction Engine</div>
        <div class="feature-desc">Docling parses structure. Surya OCR handles scanned docs. Claude extracts to typed schema. No templates, no vendor setup &mdash; works with any invoice format from day one.</div>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature-num">Feature 3</div>
      <div>
        <div class="feature-name">Confidence Routing</div>
        <div class="feature-desc">Auto-post (&gt;0.95), review queue (0.80&ndash;0.95), or flag (&lt;0.80). The differentiator vs every competitor &mdash; eliminates 5&ndash;15 hrs/week of manual triage.</div>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature-num">Feature 4</div>
      <div>
        <div class="feature-name">QuickBooks Integration</div>
        <div class="feature-desc">OAuth 2.0 setup once per client. Maps invoices to QB Bills. Batch posting (up to 25). Proactive token refresh + sync confirmation log.</div>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature-num">Feature 5</div>
      <div>
        <div class="feature-name">Client Portal (Standalone)</div>
        <div class="feature-desc">Review queue with highlighted uncertain fields. Audit log of every invoice processed. Dashboard: volume, auto-post rate, time saved. Standalone auth &mdash; independent from Derra AI.</div>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 6: PITFALLS + BUILD SEQUENCE -->
<div class="page">
  <div class="section-tag">Competitor Analysis</div>
  <h2>Pitfalls We <strong>Avoid</strong></h2>
  <div class="section-sub">Documented failure modes from Rossum, Nanonets, and Docsumo. We designed around every one.</div>

  <table class="pitfall-table">
    <tr><th>Pitfall</th><th>Our Fix</th></tr>
    <tr><td>Template overfitting</td><td>Claude LLM handles any vendor format &mdash; no templates to create or maintain</td></tr>
    <tr><td>Multi-page invoice failure</td><td>Docling has built-in document splitter + multi-page table merging</td></tr>
    <tr><td>Foreign currency / number formats</td><td>Claude natively understands European decimal/thousands separators</td></tr>
    <tr><td>OAuth token expiry</td><td>Proactive token refresh + client alert on auth failure before it blocks processing</td></tr>
    <tr><td>Silent accuracy drift</td><td>Confidence score logged per vendor &mdash; alerts if any vendor's accuracy drops over time</td></tr>
    <tr><td>SMB pricing barrier</td><td>Bundled into Auxo tier pricing &mdash; no per-document fees, no $10K implementation</td></tr>
  </table>

  <div class="section-tag" style="margin-top:40px;">Build Sequence</div>
  <h2>Two-Week <strong>Sprint</strong></h2>
  <div class="section-sub">Ship in 10 working days. No scope creep.</div>

  <div class="timeline">
    <div class="timeline-row">
      <div class="timeline-week">Day 1&ndash;2</div>
      <div class="timeline-content">
        <div class="timeline-title">Foundation</div>
        <div class="timeline-detail">Repo setup, FastAPI skeleton, Docling + Surya integration, Pydantic invoice schema, file upload endpoint.</div>
        <span class="timeline-target">Deliverable: Parse any PDF to structured text</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Day 3&ndash;4</div>
      <div class="timeline-content">
        <div class="timeline-title">Extraction + Routing</div>
        <div class="timeline-detail">Claude extraction logic, confidence scoring, routing engine. End-to-end: upload PDF, get structured JSON + route decision.</div>
        <span class="timeline-target">Deliverable: Full extraction pipeline working</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Day 5</div>
      <div class="timeline-content">
        <div class="timeline-title">QuickBooks OAuth + Sync</div>
        <div class="timeline-detail">QB OAuth 2.0 flow, bill creation endpoint, batch posting, sync confirmation log.</div>
        <span class="timeline-target">Deliverable: Auto-post invoice to QB sandbox</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Day 6&ndash;8</div>
      <div class="timeline-content">
        <div class="timeline-title">Client Portal</div>
        <div class="timeline-detail">React frontend: review queue, audit log, dashboard, settings. Standalone authentication.</div>
        <span class="timeline-target">Deliverable: Functional client portal</span>
      </div>
    </div>
    <div class="timeline-row">
      <div class="timeline-week">Day 9&ndash;10</div>
      <div class="timeline-content">
        <div class="timeline-title">Test + Deploy</div>
        <div class="timeline-detail">End-to-end testing with 20 real invoices. QB sandbox sync verification. Deploy to Railway.</div>
        <span class="timeline-target">Deliverable: Production-ready, deployed</span>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 7: VERIFICATION + DECISIONS -->
<div class="page">
  <div class="section-tag">Verification</div>
  <h2>How We Know <strong>It Works</strong></h2>
  <div class="section-sub">Concrete targets. Tested with real invoices before any client touches it.</div>

  <div class="verify-grid">
    <div class="verify-card">
      <div class="metric">&gt;80%</div>
      <div class="desc">Auto-post rate &mdash; invoices that go straight to QB with zero human touch</div>
    </div>
    <div class="verify-card">
      <div class="metric">&lt;5 sec</div>
      <div class="desc">Average processing time per invoice &mdash; upload to extraction complete</div>
    </div>
    <div class="verify-card">
      <div class="metric">20</div>
      <div class="desc">Real invoices tested &mdash; mix of PDF, scanned, multi-page, foreign currency</div>
    </div>
    <div class="verify-card">
      <div class="metric">100%</div>
      <div class="desc">QB sync verification &mdash; every auto-posted invoice confirmed in sandbox</div>
    </div>
  </div>

  <div class="section-tag" style="margin-top:32px;">Key Decisions</div>
  <h2>Locked <strong>In</strong></h2>
  <div class="section-sub">These are resolved. No revisiting.</div>

  <div class="decision-grid">
    <div class="decision-card" style="background:#0a0a0a;">
      <label style="color:#555;">Accounting Platform</label>
      <div class="choice" style="color:#fff;">QuickBooks First</div>
      <div class="reason" style="color:#888;">Most SMB clients already use QB. Xero added later.</div>
    </div>
    <div class="decision-card" style="background:#f5f5f5;">
      <label>Email Ingestion</label>
      <div class="choice">TBU</div>
      <div class="reason">Evaluating approach. Skipped for MVP &mdash; portal upload covers launch.</div>
    </div>
    <div class="decision-card" style="background:#f5f5f5;">
      <label>Portal Authentication</label>
      <div class="choice">Standalone</div>
      <div class="reason">Independent from Derra AI. Own auth system for client portal.</div>
    </div>
  </div>

  <div style="margin-top:32px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
    <div style="padding:20px 24px; background:#f0fdf4; border-radius:10px; border-left:3px solid #22c55e;">
      <div style="font-size:13px; font-weight:700; color:#15803d; margin-bottom:6px;">Revenue Impact</div>
      <div style="font-size:13px; color:#555; line-height:1.6;">Invoice processing adds $500&ndash;800/mo per client as an add-on. For accounting and medical billing clients, this is the highest-value tool in the Auxo suite.</div>
    </div>
    <div style="padding:20px 24px; background:#f5f5f5; border-radius:10px; border-left:3px solid #0a0a0a;">
      <div style="font-size:13px; font-weight:700; color:#111; margin-bottom:6px;">Integration with Product Suite</div>
      <div style="font-size:13px; color:#555; line-height:1.6;">Bundles into Growth ($2,500/mo) and Scale ($5,000/mo) tiers. Standalone sale also possible for accounting-only clients via RCN channel.</div>
    </div>
  </div>
</div>

<!-- BACK COVER -->
<div class="back-cover">
  <h2>Ship It. <strong>Week 3.</strong></h2>
  <p>Upload an invoice. Get a QB Bill. No templates. No manual entry.</p>
  <div class="url">Auxo Solutions &middot; Confidential &mdash; Internal Use Only</div>
</div>

</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outputPath = path.join(__dirname, '..', 'docs', 'auxo-invoice-processor-plan.pdf');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  console.log('PDF saved to:', outputPath);
})();
