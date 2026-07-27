/* Drifted — prototype router, work data, motion */
const CASES = [
  { id:'zoller', client:'Frank Zoller Authentic History', cat:'product', span:'wide', tags:['AI product','400+ hours saved'], res:'1,250 lots. Typed by hand.',
    bg:'linear-gradient(107deg,var(--voltage-500) 0 46%,var(--tar-3) 46%)',
    hero:'1,250 lots.<br>Typed by hand.', sub:'Now filled from photographs — 400+ hours a year off the client\u2019s desk.',
    meta:[['Client','Valkyrie LLC'],['Discipline','AI product · Hosted PWA'],['Timeline','2026, live 16 August'],['Outcome','400+ hours saved']],
    challengeTitle:'Weeks of typing<br>before a single<br>item went live.',
    challenge:['Every auction meant 1,250 lots entered by hand. Photograph, edit, renumber, then type a title, a description, a start price and an estimate range — one lot at a time, to lot 1,250.','The work was not hard. It was long, and it happened before anything could be sold, on every single auction.'],
    phases:[['Ingestion','32,000 past items — titles, descriptions, estimates and realized prices — ingested into a hosted backend as the model\u2019s reference set.'],['The engine','Photographs in, complete listing rows out. Repeat items pull their own history; new items get identified and described from the image.'],['Review triage','Confidence-scored output. Only uncertain items are flagged for a human; everything else passes straight through.'],['The handoff','The filled template uploads straight to LiveAuctioneers, and existing automation cross-posts to BidSpirit and the direct bidding site.']],
    found:'Realized prices sat consistently below estimates across the historical set — systematic estimate inflation, invisible until 32,000 records were in one place.',
    stats:[['400+','Hours saved per year',1],['32,000','Items in the reference corpus'],['1,250','Lots per auction, previously by hand'],['21','Dealer sites watched by Inventory Watch'],['3','Builds for this client, and counting'],['[Lots processed pending]','First live auction, 16 Aug',2]],
    next:'ehsaan' },
  { id:'noted', client:'Noted.', cat:'creators', span:'', tags:['Creator growth','3K followers / month'], res:'115K followers. Zero products.',
    bg:'linear-gradient(90deg,#3A3B40,#8C8F98 22%,#4A4C52 36%,#B9BCC4 54%,#55575E 68%,#33343A)',
    hero:'115K followers.<br>Zero products.', sub:'A merch brand built from a red pen and an annotation concept.',
    meta:[['Client','Julia · @theonlycanadianbacon'],['Discipline','Creator growth · Brand'],['Timeline','Seven months, ongoing'],['Outcome','3K new followers a month']],
    challengeTitle:'An audience<br>with nothing<br>to buy.',
    challenge:['115K people, consistent attention, and no product. Brand deals paid inconsistently and every merch idea died at the question nobody had answered: what does it cost to make, what does it sell for, and what is left.'],
    phases:[['The concept','A full identity built on a red-pen annotation idea — a brand, not a logo on a shirt.'],['Margin first','An eight-product line priced against real production costs, with the margin table built before anything was designed.'],['Production','Printful and Tapstitch hybrid, so quality and turnaround both hold at volume.'],['The launch','Instagram launch strategy, content calendar, and a handoff package so the cycle runs without us.']],
    found:'The audience was already there. Nothing had ever been sold to it — the constraint was structural, not creative.',
    stats:[['3K','New followers per month',1],['115K','Followers at launch'],['8','Products, priced to margin'],['7 mo','Consistent monthly revenue'],['[Revenue pending]','Store still launching',2]],
    next:'gallery' },
  { id:'ehsaan', client:'Ehsaan', cat:'product', span:'', tags:['AI product','In production'], res:'Pakistan had no thrift marketplace',
    bg:'linear-gradient(150deg,var(--klein-500) 0 44%,var(--tar-3) 44%)',
    hero:'Pakistan had no<br>thrift marketplace.', sub:'A C2C marketplace PWA, brand system and launch campaign.',
    meta:[['Client','Suleman Farooqui'],['Discipline','AI product · Brand · Launch'],['Timeline','2026, in production'],['Scope','Marketplace PWA, identity, social, launch']],
    challengeTitle:'A category that<br>only existed in<br>Instagram DMs.',
    challenge:['Second-hand clothing in Pakistan moved through comment sections, WhatsApp groups and DM negotiations. No listings, no search, no trust layer, nothing built for the people actually using it.'],
    phases:[['Twenty-three prompts to first build','React, Vite, TypeScript and Supabase through Lovable, then moved to Claude Code against a nineteen-section knowledge base so the product keeps its own rules as it grows.'],['A Gen-Z-native brand','Identity, type system and product design built for the audience that already trades this way — fast, visual, unembarrassed about second-hand.'],['The launch system','Social content, video and launch assets produced alongside the build, so the product and the campaign ship as one thing.']],
    found:'Trust is the product. Every design decision routed back to whether a stranger would send money for a stranger\u2019s jacket.',
    stats:[['23','Prompts to first build',1],['19','Sections in the knowledge base'],['4','Disciplines in one contract'],['[Launch metrics pending]','Signups, listings, GMV',2]],
    next:'zoller' },
  { id:'gallery', client:'The Gallery', cat:'performance', span:'wide', tags:['Performance media','5.2–6× ROAS'], res:'Ten creatives. One inbox.',
    bg:'linear-gradient(200deg,var(--siren-500) 0 38%,var(--tar-2) 38%)',
    hero:'5.2–6× ROAS.<br>Every campaign.', sub:'A DM-first campaign for a personalised newborn brand.',
    meta:[['Client','The Gallery · @thegallery.bytg'],['Discipline','Performance media'],['Timeline','2026'],['Outcome','5.2–6× ROAS, every campaign']],
    challengeTitle:'A market that<br>never checks out<br>on a website.',
    challenge:['Personalised newborn gifts sell through conversation — sizing, spelling, dates, photos. The checkout was already the DM, so a campaign built to push traffic at a product page would have been measuring the wrong thing.'],
    phases:[['Ten creatives, one job','A tight creative set built to start a conversation rather than close a cart.'],['DM-native buying','Campaigns optimised toward the inbox, with the sale tracked where it actually happens.'],['Weekly iteration','The losers get cut, the winners get rebuilt. The number is reported every week against what was agreed.']],
    found:'Every campaign returned between 5.2 and 6 times its spend — not an average across a good quarter, every campaign.',
    stats:[['5.2–6×','ROAS on every campaign',1],['10','Creatives in the campaign'],['DM','Where the sale closes'],['[Spend pending]','Publishing spend alongside return',2]],
    next:'noted' },
  { id:'seyr', client:'Seyr', cat:'web', span:'half', tags:['Web build','Live'], res:'Built to convert, not to win awards', craft:true,
    bg:'linear-gradient(140deg,var(--newsprint) 0 40%,var(--tar-3) 40%)',
    hero:'Built to convert,<br>not to win awards.', sub:'An ecommerce storefront you can open in a new tab right now.',
    meta:[['Client','Seyr · @shop.seyr'],['Discipline','Web build'],['Timeline','Live'],['Scope','Ecommerce storefront']],
    challengeTitle:'Proof you can<br>click, not read<br>about.',
    challenge:['Every agency site describes work you cannot inspect. This is the one place a visitor can open the finished thing in a new tab and judge it themselves.'],
    phases:[['Conversion-built','Structure, product presentation and checkout flow designed around the purchase, not the portfolio shot.'],['Handover','Client-run from day one, with the build documented.']],
    found:'',
    stats:[['Live','seyr.shop',1],['[Conversion pending]','Before / after not yet measured',2]],
    next:'social' },
  { id:'social', client:'Multi-brand social', cat:'performance', span:'half', tags:['Strategy','Production'], res:'Four accounts, run direct', craft:true,
    bg:'linear-gradient(140deg,var(--tar-4),var(--tar-2) 60%)',
    hero:'2.2M views.<br>811 followers.', sub:'Strategy, production and client communication, run directly.',
    meta:[['Clients','BamBam · Poster Project · The Gallery · Better With A Cup Of Coffee'],['Discipline','Social strategy · Production'],['Timeline','Ongoing'],['Outcome','2.2M views in 90 days']],
    challengeTitle:'Reach without<br>an audience<br>to start from.',
    challenge:['Four brands, small follower counts, and a category where reach is normally bought. The work was to make content that travels on its own and only pay where paying is efficient.'],
    phases:[['One operator, four accounts','Strategy, production and client communication run directly — no coordination layer.'],['Organic first, paid where it pays','80% of the Poster Project\u2019s 2.2M views were organic; BamBam\u2019s paid traffic ran at $0.25 per landing page view.']],
    found:'Reach beats followers. The Poster Project reached 199,392 accounts in 90 days — up 174.5% — from an 811-follower base.',
    stats:[['2.2M','Views in 90 days, 80% organic',1],['199,392','Accounts reached, up 174.5%'],['80K','Accounts reached in 30 days'],['$0.25','Per landing page view — BamBam']],
    next:'zoller' }
];

const CTA = `<section class="cta"><div class="wrap" style="padding-block:clamp(64px,10vw,150px);position:relative">
  <div style="font:500 11px/1 var(--font-mono);letter-spacing:.2em;text-transform:uppercase;color:rgba(10,10,11,.66)">30-minute call · no deck · no pitch theatre</div>
  <h2 class="disp" style="margin-top:24px">Tell us the<br>number. <span class="ko">We'll tell</span><br>you if we can.</h2>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap;margin-top:52px;padding-top:26px;border-top:2px solid var(--tar)">
    <p style="max-width:44ch;font:400 17px/1.55 var(--font-body);color:#171708">We'll tell you if we can hit it. If we can't, we'll say that too — and point you at whoever can.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn dark" data-go="contact">Book the call ↗</button><button class="btn sec" style="box-shadow:inset 0 0 0 1px rgba(10,10,11,.4);color:var(--tar)">DM us instead</button></div>
  <div style="display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;margin-top:26px"><span style="font:500 10.5px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;color:rgba(10,10,11,.62)">Q4 — two slots · next call slot: this week</span><span style="display:flex;gap:16px;align-items:center;color:var(--tar)"><i data-lucide="instagram" class="lu"></i><i data-lucide="mail" class="lu"></i><i data-lucide="phone" class="lu"></i></span></div>
  </div>
</div></section>`;

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* ── work tiles ── */
function tile(c, i){
  return `<div class="item ${c.span}" data-cat="${c.cat}">
    <div class="shot"><div class="img" style="background:${c.bg}"><image-slot id="work-${c.id}" shape="rect" placeholder="Drop ${c.client} visual"></image-slot></div><div class="veil"></div><span class="tno">${String(i+1).padStart(2,"0")}</span><div class="go">${c.id==='seyr'?'Visit seyr.shop ↗':'View case ↗'}</div></div>
    <div class="meta" data-case="${c.id}" tabindex="0" role="link" aria-label="Open ${c.client} case study"><h3 class="disp" style="font-size:clamp(22px,2.4vw,34px)">${c.client}</h3>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="res ${c.craft?'craft':''}">${c.res}</div>${c.id==='seyr'?'<div style="margin-top:12px"><a href="https://seyr.shop" target="_blank" rel="noopener" style="font:500 11px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase">Open seyr.shop ↗</a></div>':''}</div>
  </div>`;
}
$('#workgrid').innerHTML = CASES.map((c,i) => tile(c,i)).join('');
$('#homework').innerHTML = CASES.slice(0,4).map((c,i) => tile(c,i)).join('');
$$('.ctaband').forEach(el => el.innerHTML = CTA);

/* ── case page ── */
function renderCase(id){
  const c = CASES.find(x => x.id === id) || CASES[0];
  const n = CASES.find(x => x.id === c.next) || CASES[0];
  $('#casebody').innerHTML = `
  <section class="grainy" style="position:relative;height:min(58vh,520px);display:flex;align-items:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0;background:${c.bg}"><image-slot id="casehero-${c.id}" shape="rect" fit="cover" placeholder="Drop the hero visual — product screen, campaign still, platform UI"></image-slot></div>
    <div style="position:absolute;inset:0;background:var(--scrim-bottom);pointer-events:none"></div>
    <div class="wrap" style="position:relative;width:100%;padding-bottom:44px">
      <div class="eye">${c.client}</div>
      <h1 class="disp" style="font-size:clamp(36px,7vw,116px);margin-top:16px">${c.hero}</h1>
      <p class="body" style="max-width:52ch;margin-top:18px;font-size:18px">${c.sub}</p>
    </div>
  </section>
  <div class="metabar">${c.meta.map(([k,v],i)=>`<div><span class="eye mut">${k}</span><b${i===3?' style="color:var(--voltage-500)"':''}>${v}</b></div>`).join('')}</div>
  <section class="wrap sect" style="border-top:0"><div class="two">
    <div><div class="eye">The challenge</div><h2 class="disp" style="font-size:clamp(24px,3.2vw,46px);margin-top:14px">${c.challengeTitle}</h2></div>
    <div>${c.challenge.map((p,i)=>`<p class="body"${i?' style="margin-top:14px"':''}>${p}</p>`).join('')}</div>
  </div></section>
  <section class="wrap sect">
    <div class="eye">What we did</div><h2 class="disp" style="font-size:clamp(26px,3.6vw,54px);margin-top:14px">${c.phases.length} phases.</h2>
    <div style="margin-top:26px">${c.phases.map(([t,b],i)=>`<div class="phase rv"><div class="phaseno">0${i+1}</div><div><h3 class="disp" style="font-size:22px">${t}</h3><p class="body" style="margin-top:10px;max-width:60ch">${b}</p><div class="shotbox" style="position:relative;height:clamp(190px,26vw,340px);padding:0;overflow:hidden"><image-slot id="phase-${c.id}-${i}" shape="rect" placeholder="Drop a still from phase 0${i+1}"></image-slot></div></div></div>`).join('')}</div>
  </section>
  ${c.found?`<section class="wrap sect"><div class="eye">What we found</div><p class="body" style="max-width:62ch;margin-top:14px;font-size:19px">${c.found}</p></section>`:''}
  <section class="sect" style="padding-bottom:0">
    <div class="wrap"><div class="eye">Results</div><h2 class="disp" style="font-size:clamp(26px,3.6vw,54px);margin-top:14px">The numbers.</h2>
      <p class="body" style="max-width:60ch;margin-top:14px">Every figure here is published or pending. Nothing is estimated in advance.</p></div>
    <div class="nums" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:30px">
      ${c.stats.map(([v,l,flag])=>`<div class="rv"><div class="n${flag===1?' acc':''}"${flag===2?' style="color:var(--ink-400);font-size:clamp(20px,2.2vw,30px)"':''}>${v}</div><div class="small" style="margin-top:12px;color:var(--text-primary)">${l}</div></div>`).join('')}
    </div>
  </section>
  <section class="wrap sect">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap"><div><div class="eye">Receipts</div><h2 class="disp" style="font-size:clamp(26px,3.6vw,54px);margin-top:14px">Screens, not claims.</h2></div><span class="eye mut">Drag images straight onto the frames</span></div>
    <div class="proofgrid">
      <div><div class="slotframe"><image-slot id="proof-${c.id}-1" shape="rect" placeholder="Dashboard or results screenshot"></image-slot></div></div>
      <div><div class="slotframe"><image-slot id="proof-${c.id}-2" shape="rect" placeholder="Product or campaign still"></image-slot></div></div>
      <div><div class="slotframe"><image-slot id="proof-${c.id}-3" shape="rect" placeholder="Detail — UI, packaging, ad frame"></image-slot></div></div>
    </div>
  </section>
  <section class="wrap sect"><div class="held"><div class="eye mut">Section held</div><p class="disp" style="font-size:clamp(22px,3vw,44px);margin-top:14px;color:var(--ink-300)">[Client quote pending]</p><p class="small" style="margin-top:14px;max-width:52ch">The quote goes up when the client writes one, and not before.</p></div></section>
  <div class="wrap" style="padding-bottom:20px"><div style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;padding-top:30px;border-top:1px solid var(--border-subtle);cursor:pointer" data-case="${n.id}">
    <div><span class="eye mut">Next project</span><h2 class="disp" style="font-size:clamp(26px,3.6vw,54px);margin-top:12px">${n.client}</h2></div>
    <span class="btn sec">Next case ↗</span>
  </div></div>`;
  observe();
}

/* ── router ── */
const ROUTES = ['home','work','case','perf','creators','ai','about','contact','thanks','notfound'];
function go(id, opts){
  if (id.startsWith('case:')) { renderCase(id.slice(5)); id = 'case'; }
  if (!ROUTES.includes(id)) id = 'notfound';
  const w = $('#wipe');
  w.classList.remove('run'); void w.offsetWidth; w.classList.add('run');
  setTimeout(() => {
    $$('.page').forEach(p => p.classList.toggle('on', p.id === id));
    $$('.navlinks button').forEach(b => b.toggleAttribute('aria-current', b.dataset.go === id));
    window.scrollTo(0, 0);
    observe();
  }, 260);
  if (!opts || !opts.silent) history.replaceState(null, '', '#' + id);
  $('#sheet').classList.remove('on');
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) { go(g.dataset.go); return; }
  const c = e.target.closest('[data-case]'); if (c) { go('case:' + c.dataset.case); }
});
$('#menubtn').addEventListener('click', () => $('#sheet').classList.add('on'));
$('#closebtn').addEventListener('click', () => $('#sheet').classList.remove('on'));

/* ── filters ── */
$$('.filt').forEach(b => b.addEventListener('click', () => {
  $$('.filt').forEach(o => o.classList.remove('on')); b.classList.add('on');
  const f = b.dataset.f; let shown = 0;
  $$('#workgrid .item').forEach(it => {
    const on = f === 'all' || it.dataset.cat === f;
    it.style.display = on ? '' : 'none';
    if (on) { shown++; it.style.animation = 'none'; void it.offsetWidth; it.style.animation = 'tilein 360ms var(--ease-expo) ' + (shown*45) + 'ms backwards'; }
  });
  $('#count').textContent = `Showing ${shown} of ${CASES.length}`;
}));

/* ── form ── */
$('#brief').addEventListener('submit', e => { e.preventDefault(); go('thanks'); });

/* ── misregistration reveal: the system's default entrance ── */
function misreg(root){
  // ghost-plate entrance retired — the misregistration device now lives only in
  // the mark, the work images and the section rules. Display type enters clean.
  return;
}

/* ── reveals + counters ── */
let io;
function overprint(){
  const p = $('.page.on'); if (!p) return;
  [...p.querySelectorAll('section.wrap.sect')].forEach((s, i) => {
    if (s.dataset.op || s.querySelector(':scope > .opnum')) return;
    s.dataset.op = '1'; s.classList.add('opwrap');
    const n = document.createElement('span');
    n.className = 'opnum'; n.setAttribute('aria-hidden','true');
    n.textContent = String(i + 1).padStart(2, '0');
    s.prepend(n);
  });
}

function observe(){
  if (io) io.disconnect();
  misreg();
  overprint();
  io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    const n = e.target.matches('[data-count]') ? e.target : e.target.querySelector('[data-count]');
    if (n) count(n);
    io.unobserve(e.target);
  }), { threshold:.25 });
  $$('.page.on .rv, .page.on .mr').forEach(el => io.observe(el));
  cacheScrollNodes();
}
function count(el){
  const host = el.querySelector('.over') || el, ghost = el.querySelector('.under');
  const write = v => { host.textContent = v; if (ghost) ghost.textContent = v; };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { write(el.dataset.count + (el.dataset.suffix||'')); return; }
  const target = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', dec = (el.dataset.count.split('.')[1]||'').length;
  let t0 = null;
  const step = t => { if (!t0) t0 = t; const p = Math.min((t - t0)/900, 1), e = 1 - Math.pow(1 - p, 4);
    write((target*e).toFixed(dec) + suf); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ── cursor: 8px square, 52px with a label over targets ── */
(function(){
  if (window.matchMedia('(hover:none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dot = document.createElement('div');
  dot.className = 'dot'; dot.innerHTML = '<span></span>';
  document.body.appendChild(dot);
  const lbl = dot.firstChild;
  addEventListener('mousemove', e => {
    dot.classList.add('on');
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    const t = e.target.closest('[data-case], .item, .svc>div, button, summary, a');
    if (!t) { dot.classList.remove('big'); return; }
    dot.classList.add('big');
    lbl.textContent = t.matches('.item, [data-case]') ? 'View' : t.matches('summary') ? 'Open' : 'Go';
  }, { passive:true });
  addEventListener('mouseleave', () => dot.classList.remove('on'));
})();

/* ── scroll-velocity coupling on display type ── */
let VELN = [], OPN = [], velTimer = null, lastY = 0, lastT = 0, ticking = false;
function cacheScrollNodes(){
  VELN = $$('.page.on h1.disp, .page.on h2.disp').slice(0, 12);
  OPN = $$('.page.on .opnum');
}
function onScrollFrame(){
  ticking = false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  const now = performance.now(), dy = Math.abs(scrollY - lastY), dt = Math.max(now - lastT, 1);
  const v = Math.min(dy / dt, 2.4) / 2.4; lastY = scrollY; lastT = now;
  for (const h of VELN){ h.classList.add('vel'); h.style.letterSpacing = (-0.045 - 0.05 * v) + 'em'; }
  for (const n of OPN){
    const r = n.parentElement.getBoundingClientRect();
    n.style.transform = 'translateY(' + ((innerHeight - r.top) * 0.1) + 'px)';
  }
  clearTimeout(velTimer);
  velTimer = setTimeout(() => { for (const h of VELN) h.style.letterSpacing = ''; }, 150);
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); } }, { passive:true });

/* ── pinned horizontal scroll-jack (app pitch) ── */
(function(){
  const zone = $('#jack'), rail = $('#rail'), prog = $('#jackprog');
  if (!zone || !rail) return;
  let jTick = false;
  const tick = () => {
    jTick = false;
    if (innerWidth <= 1000 || !zone.offsetParent) { rail.style.transform = ''; return; }
    const r = zone.getBoundingClientRect(), pinH = innerHeight - 70;
    const total = Math.max(r.height - pinH, 1);
    const p = Math.min(Math.max((70 - r.top) / total, 0), 1);
    const travel = Math.max(rail.scrollWidth - innerWidth + 80, 0);
    rail.style.transform = 'translateX(' + (-p * travel) + 'px)';
    if (prog) prog.style.width = (p * 100) + '%';
  };
  addEventListener('scroll', () => { if (!jTick) { jTick = true; requestAnimationFrame(tick); } }, { passive:true });
  addEventListener('resize', tick);
  tick();
})();

/* ── overprint numerals: parallax handled in onScrollFrame ── */

/* ── preloader ── */
(function(){
  const pre = $('#pre'), ct = $('#ct');
  const seen = sessionStorage.getItem('drifted-pre');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (seen || reduced) { pre.classList.add('done'); boot(); return; }
  let t0 = null;
  const step = t => { if (!t0) t0 = t; const p = Math.min((t - t0)/1150, 1);
    ct.textContent = 'Departure, by design · ' + String(Math.round(p*100)).padStart(3,'0');
    if (p < 1) requestAnimationFrame(step); else finish(); };
  requestAnimationFrame(step);
  function finish(){
    const w = $('#wipe'); w.classList.add('run');
    setTimeout(() => { pre.classList.add('done'); sessionStorage.setItem('drifted-pre','1'); boot(); }, 280);
  }
})();
function boot(){
  const hash = location.hash.replace('#','');
  if (hash) go(hash, { silent:true }); else observe();
}


/* ── enhancements ── */
const TITLES = { home:'Drifted — Look bigger than you are', work:'Work, not decks — Drifted', 'case':'Case study — Drifted', perf:'Performance media — Drifted', creators:'Creator growth — Drifted', ai:'AI product — Drifted', about:'We left on purpose — Drifted', contact:'Tell us the number — Drifted', thanks:'Booked — Drifted', notfound:'This one drifted too far — Drifted' };
const _go = go;
go = function(id, opts){
  _go(id, opts);
  const base = id.startsWith('case:') ? 'case' : (ROUTES.includes(id) ? id : 'notfound');
  document.title = TITLES[base] || TITLES.home;
  const live = $('#alive'); if (live) live.textContent = document.title;
};

/* skip link + live region */
(function(){
  const a = document.createElement('a');
  a.className = 'skip'; a.href = '#'; a.textContent = 'Skip to content';
  a.addEventListener('click', e => { e.preventDefault(); const m = $('.page.on'); if (m) { m.setAttribute('tabindex','-1'); m.focus(); } });
  document.body.prepend(a);
  const live = document.createElement('div');
  live.id = 'alive'; live.setAttribute('aria-live','polite');
  live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)';
  document.body.appendChild(live);
})();

/* scroll progress + back-to-top */
(function(){
  const bar = document.createElement('div'); bar.id = 'prog'; document.body.appendChild(bar);
  const top = document.createElement('button'); top.id = 'top'; top.setAttribute('aria-label','Back to top'); top.innerHTML = '<i></i>';
  top.addEventListener('click', () => window.scrollTo({ top:0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  document.body.appendChild(top);
  let pt = false;
  const run = () => { pt = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    top.classList.toggle('on', scrollY > innerHeight * 2);
  };
  addEventListener('scroll', () => { if (!pt) { pt = true; requestAnimationFrame(run); } }, { passive:true });
})();

/* nav hides scrolling down, returns scrolling up */
(function(){
  const nav = $('.nav'); if (!nav) return;
  let py = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (y > py + 6 && y > 220) nav.classList.add('hid');
    else if (y < py - 6) nav.classList.remove('hid');
    py = y;
  }, { passive:true });
})();

/* Karachi clock in the nav */
(function(){
  const nav = $('.nav'); if (!nav) return;
  const el = document.createElement('span'); el.id = 'khi';
  const cta = nav.querySelector('[data-go="contact"]');
  if (cta) cta.parentElement.insertBefore(el, cta); else nav.appendChild(el);
  const tick = () => { try { el.textContent = 'KHI ' + new Intl.DateTimeFormat('en-GB', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Karachi' }).format(new Date()); } catch(e) { el.remove(); } };
  tick(); setInterval(tick, 30000);
})();

/* filter counts */
$$('.filt').forEach(b => {
  const f = b.dataset.f;
  b.dataset.n = f === 'all' ? CASES.length : CASES.filter(c => c.cat === f).length;
});

/* home service cards carry their number */
(function(){
  const cards = $$('#home .svc > div');
  const lines = ['5.2–6× ROAS — The Gallery', '3K followers / month — Noted.', '400+ hours saved — Zoller'];
  if (cards.length !== 3) return;
  cards.forEach((c, i) => {
    const d = document.createElement('div');
    d.className = 'eye'; d.style.marginTop = '18px'; d.textContent = lines[i];
    c.appendChild(d);
  });
})();

/* click-to-copy email */
(function(){
  const EMAIL = 'hello@driftedmarketing.com';
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;left:50%;bottom:30px;transform:translate(-50%,16px);opacity:0;background:var(--voltage-500);color:var(--tar);font:500 11px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;padding:14px 20px;z-index:96;pointer-events:none;transition:opacity 160ms var(--ease-hit),transform 160ms var(--ease-hit)';
  document.body.appendChild(toast);
  document.addEventListener('click', e => {
    const t = e.target.closest('*');
    if (!t || !t.textContent || t.children.length > 0) return;
    if (t.textContent.trim() !== EMAIL) return;
    navigator.clipboard.writeText(EMAIL).then(() => {
      toast.textContent = 'Email copied';
      toast.style.opacity = '1'; toast.style.transform = 'translate(-50%,0)';
      setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translate(-50%,16px)'; }, 1400);
    });
  });
  $$('*').filter(el => el.children.length === 0 && el.textContent.trim() === EMAIL).forEach(el => { el.style.cursor = 'pointer'; el.title = 'Click to copy'; });
})();

/* keyboard: Enter/Space opens a focused card; Escape closes the sheet */
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.matches('.meta[data-case]')) {
    e.preventDefault(); go('case:' + document.activeElement.dataset.case);
  }
  if (e.key === 'Escape') $('#sheet').classList.remove('on');
});

/* orb mouse parallax */
(function(){
  const orb = $('.orb'); if (!orb) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ot = false, mx = 0, my = 0;
  addEventListener('mousemove', e => {
    mx = (e.clientX / innerWidth - .5); my = (e.clientY / innerHeight - .5);
    if (!ot) { ot = true; requestAnimationFrame(() => { ot = false;
      orb.style.transform = 'translate(' + (mx * 18) + 'px,' + (my * 12) + 'px)';
    }); }
  }, { passive:true });
})();

/* 404: the headline can never re-register while the cursor moves */
(function(){
  const h = document.querySelector('#notfound h1.disp, #notfound .disp'); if (!h) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  addEventListener('mousemove', e => {
    if (!document.querySelector('#notfound.on')) return;
    const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
    h.style.textShadow = (8 + x*14) + 'px ' + (6 + y*10) + 'px 0 var(--voltage-500), ' + (-6 - x*14) + 'px ' + (-4 - y*10) + 'px 0 var(--siren-500)';
  }, { passive:true });
})();

document.title = TITLES[(location.hash || '#home').slice(1)] || TITLES.home;


/* ── stimulation pass ── */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function flash(msg){
  let t = document.getElementById('ftoast');
  if (!t) { t = document.createElement('div'); t.id = 'ftoast'; t.style.cssText = 'position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:var(--tar-3);color:var(--voltage-500);border:1px solid var(--voltage-500);font:500 11px/1 var(--font-mono);letter-spacing:.18em;text-transform:uppercase;padding:14px 20px;z-index:126;opacity:0;transition:opacity 160ms linear;pointer-events:none'; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._h); t._h = setTimeout(() => t.style.opacity = '0', 1600);
}
/* display headlines: slam entrance; eyebrows: decode scramble; stats: flash when landed */
let io2;
const GLYPHS = 'DRIFTX/\\↗#01';
function scramble(el){
  if (el.dataset.scr || REDUCED) return; el.dataset.scr = '1';
  const txt = el.textContent; let f = 0; const total = Math.min(txt.length * 2, 26);
  const step = () => { f++;
    el.textContent = txt.split('').map((ch, i) => (ch === ' ' || i < (f / total) * txt.length) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
    if (f < total) requestAnimationFrame(step); else el.textContent = txt; };
  requestAnimationFrame(step);
}
function enhance(){
  const p = $('.page.on'); if (!p) return;
  if (io2) io2.disconnect();
  io2 = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return;
    if (e.target.classList.contains('rv2')) e.target.classList.add('in');
    if (e.target.classList.contains('eye')) scramble(e.target);
    if (e.target.matches('[data-count]')) setTimeout(() => { const n = e.target.querySelector('.n') || e.target; n.classList.add('done'); }, 950);
    io2.unobserve(e.target); }), { threshold:.3 });
  p.querySelectorAll('h1.disp, h2.disp').forEach(el => { if (!el.closest('.rv') && !el.dataset.rv2) { el.dataset.rv2 = '1'; el.classList.add('rv2'); } });
  p.querySelectorAll('.rv2:not(.in), .eye:not([data-scr])').forEach(el => io2.observe(el));
  p.querySelectorAll('.item .shot').forEach(sh => { if (!sh.querySelector('.glare')) { const g = document.createElement('div'); g.className = 'glare'; sh.appendChild(g); } });
}
const _observe2 = observe; observe = function(){ _observe2(); enhance(); };
enhance();
/* magnetic buttons */
if (!window.matchMedia('(hover:none)').matches && !REDUCED) {
  document.addEventListener('mouseover', e => {
    const b = e.target.closest('.btn'); if (!b || b._mag) return; b._mag = 1;
    b.addEventListener('mousemove', ev => { const r = b.getBoundingClientRect();
      b.style.transform = 'translate(' + ((ev.clientX - r.left - r.width/2) * .18) + 'px,' + ((ev.clientY - r.top - r.height/2) * .3) + 'px)'; });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; });
  });
  /* work-card tilt */
  document.addEventListener('mouseover', e => {
    const it = e.target.closest('.item'); if (!it || it._tilt) return; it._tilt = 1;
    const sh = it.querySelector('.shot'); if (!sh) return;
    it.addEventListener('mousemove', ev => { const r = it.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
      sh.style.transform = 'rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 6) + 'deg)'; });
    it.addEventListener('mouseleave', () => { sh.style.transform = ''; });
  });
}
/* CTA hover text swap */
document.addEventListener('mouseover', e => {
  const b = e.target.closest('button[data-go="contact"]'); if (!b || b._swap) return; b._swap = 1;
  const orig = b.textContent;
  b.addEventListener('mouseenter', () => { b.textContent = '30 min. No deck. ↗'; });
  b.addEventListener('mouseleave', () => { b.textContent = orig; });
});
/* DM buttons open Instagram */
document.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (/DM us/i.test(b.textContent)) window.open('https://instagram.com/drifted.marketing', '_blank', 'noopener');
});
/* currently-shipping ticker + Zoller countdown */
(function(){
  const host = document.querySelector('#home .ctaband'); if (!host) return;
  const bar = document.createElement('div'); bar.className = 'shipbar';
  const cd = () => { const ms = new Date('2026-08-16T00:00:00+05:00') - Date.now();
    if (ms <= 0) return 'Zoller platform — LIVE';
    const d = ms / 864e5 | 0, hr = (ms % 864e5) / 36e5 | 0, m = (ms % 36e5) / 6e4 | 0;
    return 'Zoller platform live in <b class="cd">' + d + 'd ' + hr + 'h ' + m + 'm</b>'; };
  const items = () => { const one = '<span>Now shipping →</span><span>' + cd() + '</span><span>·</span><span>Ehsaan marketplace — <b>in production</b></span><span>·</span><span>Noted. store — <b>launching</b></span><span>·</span><span>The Gallery — <b>5.2–6× every campaign</b></span><span>·</span><span>Q4 — <b>two client slots open</b></span><span>·</span>'; return one + one; };
  bar.innerHTML = '<div>' + items() + '</div>';
  host.insertAdjacentElement('beforebegin', bar);
  setInterval(() => { bar.firstChild.innerHTML = items(); }, 60000);
})();
/* popup: once per session, on exit-intent or 26s */
(function(){
  if (sessionStorage.getItem('drifted-pop')) return;
  const pop = document.createElement('div'); pop.id = 'pop';
  pop.innerHTML = '<div class="box"><button class="x" aria-label="Close">×</button><div style="font:500 10px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase;color:#1A1A08;margin-bottom:16px">A door, not a gate</div><h3>Still scrolling?</h3><p>That’s usually the sign. Bring us the number you need to hit — the call is 30 minutes, there’s no deck, and if we can’t get you there we’ll say so.</p><div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn dark" data-go="contact">Book the call ↗</button><button class="btn sec" id="popno" style="box-shadow:inset 0 0 0 1px rgba(10,10,11,.4);color:var(--tar)">Keep scrolling</button></div></div>';
  document.body.appendChild(pop);
  const close = () => { pop.classList.remove('on'); sessionStorage.setItem('drifted-pop','1'); };
  const show = () => { if (sessionStorage.getItem('drifted-pop') || pop.classList.contains('on')) return;
    if ($('#sheet').classList.contains('on')) return; pop.classList.add('on'); };
  pop.addEventListener('click', e => { if (e.target === pop || e.target.closest('.x') || e.target.closest('#popno') || e.target.closest('[data-go]')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  setTimeout(show, 26000);
  document.documentElement.addEventListener('mouseleave', e => { if (e.clientY <= 0) show(); });
})();
/* easter egg: type d-r-i-f-t and the plates slip */
(function(){
  let buf = '';
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select')) return;
    buf = (buf + e.key.toLowerCase()).slice(-5);
    if (buf === 'drift' && !REDUCED) {
      document.body.classList.add('slip');
      flash('The plates slipped. On purpose.');
      setTimeout(() => document.body.classList.remove('slip'), 1100);
    }
  });
})();


/* ── richness pass ── */
(function(){
function icons(){ try { lucide.createIcons(); } catch(e) { setTimeout(icons, 700); } }
/* @keyframes tilein */
var st = document.createElement('style');
st.textContent = '@keyframes tilein{from{opacity:0;transform:translateY(26px) skewY(1.5deg)}to{opacity:1;transform:none}}';
document.head.appendChild(st);
/* service card icons */
var svc = $$('#home .svc > div');
['bar-chart-3','users','cpu'].forEach(function(n, i){
  if (!svc[i]) return;
  var d = document.createElement('div');
  d.innerHTML = '<i data-lucide="' + n + '" class="lu" style="width:26px;height:26px;color:var(--voltage-500)"></i>';
  svc[i].prepend(d);
});
/* client strip after hero on home */
var hw = $('#homework') && ($('#homework').closest('section') || $('#homework').closest('.work') || $('#homework'));
if (hw) {
  var cs = document.createElement('section');
  cs.innerHTML = '<div class="wrap"><div class="eye mut" style="margin-bottom:16px">On the books</div><div class="clientstrip"><b>Frank Zoller</b><b>The Gallery</b><b>Noted.</b><b>Ehsaan</b><b>Seyr</b><b>BamBam</b><b>Poster Project</b><b>Better With A Cup Of Coffee</b></div></div>';
  hw.parentElement.insertBefore(cs, hw);
}
/* how-we-work steps before home CTA */
var band = $('#home .ctaband');
if (band) {
  var stp = document.createElement('section');
  stp.className = 'wrap sect';
  stp.innerHTML = '<div class="eye">How it runs</div><h2 class="disp" style="font-size:clamp(26px,3.6vw,54px);margin-top:14px">Three steps. No theatre.</h2><div class="steps" style="margin-top:28px">' +
  '<div><span class="sno">01</span><i data-lucide="phone-call" class="lu"></i><h3>The call</h3><p>30 minutes. You bring the number you need to hit and the date. No deck, no pitch theatre.</p></div>' +
  '<div><span class="sno">02</span><i data-lucide="crosshair" class="lu"></i><h3>The number</h3><p>We say yes or no on the call. Yes comes with a scope and a figure we report against weekly.</p></div>' +
  '<div><span class="sno">03</span><i data-lucide="receipt" class="lu"></i><h3>The receipts</h3><p>Published numbers or pending flags — never estimates. If it is not measured yet, it says so.</p></div></div>';
  band.parentElement.insertBefore(stp, band);
}
/* hero: watermark logo + orbit ring */
var hp = $('#home'); 
if (hp && hp.firstElementChild) {
  var hsec = hp.firstElementChild;
  if (getComputedStyle(hsec).position === 'static') hsec.style.position = 'relative';
  var img = document.createElement('img');
  img.src = 'assets/logo.svg'; img.alt = ''; img.className = 'wm-logo';
  hsec.appendChild(img);
}
var orb = $('.orb');
if (orb) { var ring = document.createElement('div'); ring.className = 'orbring'; orb.appendChild(ring); }
/* sticky slots banner */
if (!sessionStorage.getItem('drifted-slots')) {
  var sb = document.createElement('div');
  sb.id = 'slotsbar';
  sb.innerHTML = '<span>Q4 — <b style="color:var(--news)">two client slots open</b></span><button class="bk" data-go="contact">Book the call ↗</button><button class="xx" aria-label="Dismiss">×</button>';
  document.body.appendChild(sb);
  sb.querySelector('.xx').addEventListener('click', function(){ sb.remove(); sessionStorage.setItem('drifted-slots','1'); });
  sb.querySelector('.bk').addEventListener('click', function(){ sb.remove(); sessionStorage.setItem('drifted-slots','1'); });
  var sOn = false;
  addEventListener('scroll', function(){
    var max = document.documentElement.scrollHeight - innerHeight;
    var deep = max > 0 && scrollY / max > .55;
    var pg = document.querySelector('.page.on');
    var ok = pg && ['home','work','case'].indexOf(pg.id) > -1;
    var want = deep && ok && !sessionStorage.getItem('drifted-slots');
    if (want !== sOn) { sOn = want; sb.classList.toggle('on', want); }
  }, { passive:true });
}
/* nav CTA: pulse + alternating message after 45s */
var nb = document.querySelector('.nav [data-go="contact"]');
if (nb) {
  nb.classList.add('navcta-alt');
  setTimeout(function(){
    var alt = true, base = nb.textContent;
    setInterval(function(){ if (nb.matches(':hover')) return; nb.textContent = alt ? 'Q4: 2 slots ↗' : base; alt = !alt; }, 8000);
  }, 45000);
}
/* ticker: easter-egg hint + icons */
var ship = document.querySelector('.shipbar > div');
if (ship) ship.innerHTML = ship.innerHTML.split('<span>Now shipping →</span>').join('<span><i data-lucide="rocket" class="lu" style="width:13px;height:13px;color:var(--voltage-500)"></i> Now shipping →</span>');
icons();
setTimeout(icons, 1200);
})();
