// One unit = 90 px. Unit coords A(0,0) B(6,0) C(8,4) D(2,4), E(2,0) is the foot of the height from D;
// px = (135 + 90x, 1000 - 90y). The triangle AED slides +6 units onto B E'(8,0) C, giving rectangle E E' C D.
const BH_U = 90;
const BH_A = [135,1000], BH_B = [675,1000], BH_C = [855,640], BH_D = [315,640], BH_E = [315,1000];
const BH_DX = 6 * BH_U;
const BH_PARA = [BH_A,BH_B,BH_C,BH_D];
const BH_TRI = [BH_A,BH_E,BH_D];
const BH_QUAD = [BH_E,BH_B,BH_C,BH_D];
const bhAt = (id,word,n = 0) => VW(id,word,n);
const bhPulse = (t) => (TT < t ? 0 : Math.sin(Math.PI * seg(TT,t,t + 0.6)));
const bhMove = (P,dx,dy = 0) => P.map(([x,y]) => [x + dx,y + dy]);

function bhRows() {
  const t0 = bhAt('result2','bốn').t0;
  return { t0,dt:Math.max(0.2,(VL('result2').t1 - t0) / 4) };
}
// k = fraction of the 6-unit translation; the change stage stops short so the fit lands on "ghép"
function bhSlide(i) {
  if (i < 2) return 0;
  if (i === 2) return 0.85 * seg(TT,bhAt('change1','trượt').t0,MF_TIMES[2].t1 - 0.15);
  if (i === 3) return lerp(0.85,1,EZ.o2(seg(TT,MF_TIMES[3].t0,bhAt('result1','ghép').t1)));
  return 1;
}
function bhProgress(i) {
  if (i === 0) return 0;
  if (i === 1) return 0.25 * seg(TT,bhAt('trigger1','cắt').t0,bhAt('trigger1','cao').t1);
  if (i === 2) { const w = bhAt('change1','trượt'); return 0.25 + 0.25 * seg(TT,w.t0,w.t1 + 0.3); }
  if (i === 3) {
    const g = bhAt('result1','ghép'), d = bhAt('result2','Đếm');
    return 0.5 + 0.25 * seg(TT,g.t0,g.t1 + 0.2) + 0.25 * seg(TT,d.t0,d.t1 + 0.2);
  }
  return 1;
}
function bhTag(str,frac = 1) {
  pp(pR(130,392,820,70,35),PR.navy,{key:'bh-tag'});
  txt(str,540,427,fitSize(str,760,36),PR.creamL,{align:'center',base:'middle',frac});
}
function bhFormulaText(i) {
  if (i === 4 || (i === 3 && TT >= bhAt('result3','Sáu').t0)) return '6 × 4 = 24 đơn vị vuông';
  return 'Diện tích = đáy × chiều cao?';
}
function bhGhost(alpha,w) {
  chalkLine([...BH_PARA,BH_A],1,{color:`rgba(244,241,232,${alpha})`,w,dash:[14,12]});
}
function bhHeight(x,pulse = 0,dy = 0) {
  chalkLine([[x,644 + dy],[x,996 + dy]],1,{color:PR.blue,w:6 + 4 * pulse,dash:[18,12]});
}
function bhRight(x,y,sx,sy,w = 4,a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  chalkLine([[x + sx * 24,y],[x + sx * 24,y + sy * 24],[x,y + sy * 24]],1,{color:PR.ink,w});
  ctx.restore();
}
function bhBase(x0,x1,pulse = 0) {
  chalkLine([[x0,1028],[x1,1028]],1,{color:PR.mustard,w:6 + 5 * pulse});
  chalkLine([[x0,1014],[x0,1042]],1,{color:PR.mustard,w:6});
  chalkLine([[x1,1014],[x1,1042]],1,{color:PR.mustard,w:6});
  mfText('đáy 6 đơn vị',(x0 + x1) / 2,1072,420,38 + 4 * pulse,PR.creamL,1);
}
function bhTriangle(i,k) {
  const lift = 30 * Math.sin(Math.PI * k), P = bhMove(BH_TRI,BH_DX * k,-lift), x = BH_E[0] + BH_DX * k;
  const split = bhAt('trigger2','tách').t0, tint = i > 1 ? 1 : seg(TT,split,split + 0.3);
  const raised = i === 1 ? 14 * tint : k < 1 ? 14 : 0;
  pp(pG(P),tint < 1 ? PR.creamL : PR.yellow,{key:'bh-tri',sb:16 + raised,sy:8 + raised * 0.6});
  if (tint > 0 && tint < 1) { ctx.save(); ctx.globalAlpha = tint; pp(pG(P),PR.yellow,{key:'bh-tri',shadow:false}); ctx.restore(); }
  bhHeight(x,0,-lift);
  const turn = i === 2 ? bhPulse(bhAt('change2','xoay').t0) : 0;
  bhRight(x,1000 - lift,-1,-1,4 + 4 * turn);
  if (i === 2) {
    const s = seg(TT,bhAt('change3','xiên').t0,bhAt('change3','xiên').t0 + 0.4);
    if (s > 0) chalkLine([P[0],P[2]],s,{color:PR.orange,w:8});
  }
}
function bhGrid(i) {
  const show = bhAt('result2','Đếm').t0;
  if (i < 3 || TT < show) return;
  const { t0,dt } = bhRows(), draw = i > 3 ? 1 : seg(TT,show,show + 0.4);
  for (let c = 1; c < 6; c++) chalkLine([[315 + c * BH_U,640],[315 + c * BH_U,1000]],draw,{color:'rgba(24,27,36,0.4)',w:3});
  for (let r = 1; r < 4; r++) chalkLine([[315,640 + r * BH_U],[855,640 + r * BH_U]],draw,{color:'rgba(24,27,36,0.4)',w:3});
  for (let r = 0; r < 4; r++) {
    const at = t0 + r * dt, a = i > 3 ? 1 : seg(TT,at,at + 0.25);
    if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha = 0.28 * a; ctx.fillStyle = PR.tidu;
    for (let c = 0; c < 6; c++) ctx.fillRect(318 + c * BH_U,643 + r * BH_U,BH_U - 6,BH_U - 6);
    ctx.restore();
    for (let c = 0; c < 6; c++) {
      withT(360 + c * BH_U,685 + r * BH_U,0,i > 3 ? 1 : popS(at),() => txt(String(r * 6 + c + 1),0,0,36,PR.ink,{align:'center',base:'middle'}));
    }
  }
}
function bhTrack(v,p,before) {
  const x0 = 250, x1 = 830, y = 1125, n = v.labels.length;
  pp(pR(x0,y - 8,x1 - x0,16,8),PR.slateD,{key:'bh-track'});
  if (p > 0) pp(pR(x0,y - 8,(x1 - x0) * p,16,8),PR.mustard,{key:'bh-track-on',shadow:false});
  v.labels.forEach((label,k) => {
    const at = n > 1 ? k / (n - 1) : 0, lit = p >= at - 1e-3, x = lerp(x0,x1,at);
    pp(pE(x,y,lit ? 15 : 11,lit ? 15 : 11),lit ? PR.mustard : PR.slateD,{key:'bh-dot' + k});
    mfText(label,x,1180,150,36,lit ? PR.creamL : 'rgba(244,241,232,0.55)',1);
  });
  pp(pE(lerp(x0,x1,p),y,22,22),PR.creamL,{key:'bh-marker'});
  pp(pE(lerp(x0,x1,p),y,10,10),PR.navy,{shadow:false});
  if (before > 0) withT(118,1150,0,before,() => pp(pG([[-38,22],[18,22],[38,-22],[-18,-22]]),PR.creamL,{key:'bh-thumb'}));
}
// base 8 and height 3 at 20 px per unit, slant offset 2 units
function bhPractice(t,answer) {
  withT(540,1330,0,popS(t),() => {
    pp(pR(-300,-70,600,140,18),PR.creamL,{key:'bh-practice'});
    pp(pG([[-280,30],[-120,30],[-80,-30],[-240,-30]]),PR.yellow,{key:'bh-practice-shape'});
    chalkLine([[-240,-30],[-240,30]],1,{color:PR.blue,w:4,dash:[8,6]});
    mfText(answer ? '8 × 3 = 24' : 'Đáy 8, cao 3:',120,-25,300,40,PR.ink,1);
    mfText(answer ? 'đơn vị vuông' : 'diện tích?',120,25,300,36,PR.ink,1);
  });
}

function renderBeat(b,i) {
  const v = b.visual, k = bhSlide(i), p = bhProgress(i);
  const cutT = bhAt('trigger1','cắt').t0, cut = i === 0 ? 0 : i === 1 ? seg(TT,cutT,bhAt('trigger1','cao').t1) : 1;
  const compareT = bhAt('result4','hình').t0, compare = i === 4 ? 1 : i === 3 ? seg(TT,compareT,compareT + 0.4) : 0;
  const landT = bhAt('result1','ghép').t1;

  bhTag(v.trigger,i === 4 ? seg(TT,MF_TIMES[4].t0,VL('implication1').t1) : 1);
  mfCard(bhFormulaText(i),540,545,820,100,{size:44});
  bhGhost(0.5 + 0.45 * compare,4 + 2 * compare);

  pp(pG(cut < 1 ? BH_PARA : BH_QUAD),PR.creamL,{key:'bh-sheet'});
  if (i < 3) {
    const hp = i === 0 ? bhPulse(bhAt('initial3','Chiều').t0) : 0;
    if (i < 2) txt('cao 4 đơn vị',340,820,36 + 4 * hp,PR.blue,{base:'middle'});
    bhHeight(BH_E[0],hp);
  } else {
    bhHeight(BH_E[0]);
  }
  bhRight(BH_E[0],1000,1,-1,4 + 4 * (i === 0 ? bhPulse(bhAt('initial3','vuông').t0) : 0));
  if (i === 1 && cut > 0) {
    chalkLine([BH_D,BH_E],cut,{color:PR.ink,w:3});
    if (cut < 1) { const y = lerp(BH_D[1],BH_E[1],cut); pp(pG([[315,y + 16],[302,y - 16],[328,y - 16]]),PR.greyD,{key:'bh-blade',sb:8,sy:4}); }
  }
  if (i === 2) {
    const s = seg(TT,bhAt('change3','xiên').t0,bhAt('change3','xiên').t0 + 0.4);
    if (s > 0) chalkLine([BH_B,BH_C],s,{color:PR.orange,w:8});
  }
  if (cut >= 1) bhTriangle(i,k);
  bhGrid(i);

  if (i >= 3) {
    const sq = i > 3 ? 1 : seg(TT,bhAt('result1','chữ').t0,bhAt('result1','chữ').t0 + 0.3);
    bhRight(BH_D[0],BH_D[1],1,1,4,sq);
    bhRight(BH_C[0],BH_C[1],-1,1,4,sq);
    withT(912,820,0,i > 3 ? 1 : popS(landT),() => {
      txt('cao',0,-26,40,PR.creamL,{align:'center',base:'middle'});
      txt('4',0,26,46,PR.creamL,{align:'center',base:'middle'});
    });
  }
  if (i < 3) bhBase(135,675,i === 0 ? bhPulse(bhAt('initial2','đáy').t0) : i === 2 ? bhPulse(bhAt('change1','sáu').t0) : 0);
  else bhBase(315,855);

  if (i === 4) {
    const slantT = bhAt('implication2','xiên').t0;
    prCheck(912,930,bhAt('implication2','vuông').t0,30);
    if (TT >= slantT) {
      chalkLine([BH_A,BH_D],seg(TT,slantT,slantT + 0.4),{color:PR.orange,w:8});
      withT(180,672,0,popS(slantT),() => txt('cạnh xiên',0,0,36,PR.creamL,{align:'center',base:'middle'}));
    }
    prCross(225,820,slantT,30);
    const tryT = bhAt('implication3','Nếu').t0;
    if (TT >= tryT) bhPractice(tryT,TT >= bhAt('implication4','tám').t0);
  }
  bhTrack(v,p,i === 4 ? 1 : i === 3 ? popS(compareT) : 0);
}
mfInstall(renderBeat);

function SFX_CUES() {
  const { t0,dt } = bhRows();
  return [
    { k:'pop',t:bhAt('trigger1','cắt').t0 },
    { k:'pop',t:bhAt('trigger2','tách').t0 },
    { k:'pop',t:bhAt('result1','ghép').t1 },
    ...[0,1,2,3].map((r) => ({ k:'tick',t:t0 + r * dt })),
    { k:'chime',t:bhAt('result3','hai').t0 },
    { k:'pop',t:bhAt('implication3','Nếu').t0 },
    { k:'chime',t:bhAt('implication4','hai').t0 },
  ];
}
