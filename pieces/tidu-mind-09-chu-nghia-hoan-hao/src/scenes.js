// =====================================================================
//  TIDU MIND 09 — "Chủ nghĩa hoàn hảo có đang giữ chân bạn?"
//  Chủ nghĩa hoàn hảo & Bản nháp đầu tiên (Perfectionism vs MVP).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · HOÀN HẢO';
const TEAL = '#2e4f4f', TEAL2 = '#355555';
const CHALKC = 'rgba(244,244,236,0.92)';

const SCENES = {};

// ---- helpers (hh = hoàn hảo)
function hhLines(x0, y0, w, n, gap, frac = 1, c = 'rgba(40,50,70,0.28)') {
  ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 3;
  for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(x0, y0 + i * gap); ctx.lineTo(x0 + w * frac, y0 + i * gap); ctx.stroke(); }
  ctx.restore();
}
function hhScribble(x0, y0, w, n, gap, frac, key) {
  const R = RNG(key); ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const lw = w * R.r(0.55, 1), u = clamp(frac * n - i); if (u <= 0) break;
    ctx.beginPath(); ctx.moveTo(x0, y0 + i * gap);
    for (let x = 0; x <= lw * u; x += 18) ctx.lineTo(x0 + x, y0 + i * gap + Math.sin(x * 0.21 + i) * 5);
    ctx.stroke();
  }
  ctx.restore();
}
function hhPencil(x, y, rot, s = 1) {
  withT(x, y, rot, s, () => {
    pp(pR(-15, -150, 30, 240, 4), PR.yellow, { key: 'hpcl', sb: 8, sy: 4, tex: 0.4 });
    pp(pG([[-15, 90], [15, 90], [0, 132]]), PR.tan, { shadow: false, tex: 0.4 });
    pp(pG([[-5, 118], [5, 118], [0, 132]]), PR.char, { shadow: false, tex: false });
    pp(pR(-15, -176, 30, 30, 5), PR.pink, { shadow: false, tex: 0.4 });
  });
}
function hhBulb(x, y, r, k, glow = 1) {
  withT(x, y, 0, k, () => {
    if (glow > 0) {
      ctx.save(); ctx.strokeStyle = `rgba(242,201,76,${0.85 * glow})`; ctx.lineWidth = 9; ctx.lineCap = 'round';
      for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * 0.36, r0 = r * 1.3, r1 = r * (1.62 + 0.06 * Math.sin(TT * 6 + i)); ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0 - r * 0.1); ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1 - r * 0.1); ctx.stroke(); }
      ctx.restore();
    }
    pp(pE(0, -r * 0.1, r, r), glow > 0 ? PR.yellow : '#d9d4c4', { key: 'bulb', sb: 14, sy: 6, tex: 0.45 });
    pp(pR(-r * 0.42, r * 0.78, r * 0.84, r * 0.5, 6), PR.grey, { key: 'bulbb', sb: 6, sy: 3, tex: 0.4 });
    pp(pR(-r * 0.3, r * 1.26, r * 0.6, r * 0.18, 5), PR.greyD, { shadow: false, tex: 0.4 });
  });
}
function hhTag(str, x, y, fill, k = 1, rot = 0, size = 30) {
  const w = txtW(str, size) + 44;
  withT(x, y, rot, k, () => {
    pp(pR(-w / 2, -30, w, 60, 10), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.45 });
    txt(str, 0, 11, size, PR.creamL, { align: 'center', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // Một ý tưởng hay, nhưng chưa bắt đầu vì sợ chưa đủ tốt
  const t0 = E0, tIdea = VW('hook', 'ý').t0, tFear = VW('hook', 'sợ').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // the desk, the clipboard with a blank page, the idea above it
  pp(pR(70, 1232, 940, 34, 6), PR.wood, { key: 'desk1', sb: 12, sy: 6, tex: 0.6 });
  pp(pR(120, 1266, 30, 234, 4), PR.woodD, { key: 'dl1', sb: 8, sy: 4 });
  pp(pR(930, 1266, 30, 234, 4), PR.woodD, { key: 'dl2', sb: 8, sy: 4 });
  withT(540, 900, -0.02, 1, () => {   // on screen from frame 0: it is the thumbnail
    pp(pR(-250, -320, 500, 650, 18), PR.brown, { key: 'clipb', sb: 18, sy: 9, tex: 0.6 });
    pp(pR(-215, -270, 430, 570, 6), PR.paperW, { key: 'blank', sb: 6, sy: 3, tex: 0.45 });
    hhLines(-175, -170, 350, 9, 52);
    pp(pR(-90, -350, 180, 70, 14), PR.grey, { key: 'clip', sb: 8, sy: 4, tex: 0.4 });
  });
  hhBulb(540, 440, 62, popS(tIdea), TT >= tIdea ? 1 : 0);
  const shake = TT > tFear ? Math.sin(TT * 40) * 0.05 : 0;
  hhPencil(850, 980, 0.5 + shake, 1);
  prStamp('CHƯA ĐỦ TỐT?', 540, 900, PR.red, tFear + 0.05, { rot: -0.08, size: 66 });

  pp(pR(150, 1160, 90, 72, 10), PR.creamL, { key: 'mug1', sb: 8, sy: 4, tex: 0.5 });
  prClock(930, 450, 62, 11, 50, 'clk1');
  prStar(150, 420, 34, PR.mustard);
  prStar(240, 520, 22, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT < tFear ? 'neutral' : 'flat', look: -30, key: 'b1' });
  prSign('Ý TƯỞNG HAY — CHƯA DÁM LÀM?', { kicker: KICK });
  prChips();
};

SCENES.delay = () => {   // Muốn hoàn hảo khiến ta trì hoãn bước đầu tiên
  const t0 = E0, tPerf = VW('delay', 'hoàn').t0, tLate = VW('delay', 'trì').t0, tStep = VW('delay', 'bước').t0;
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  // a staircase: step one at the left, "hoàn hảo" waiting at the top
  const cols = ['#c9b28a', '#bda57c', '#b0986f', '#a38b62'];
  for (let i = 0; i < 4; i++) {
    const x = 140 + i * 200, top = 1330 - i * 170;
    pp(pR(x, top, 200, 1500 - top, 6), cols[i], { key: 'step' + i, sb: 14, sy: 6, tex: 0.6 });
    pp(pR(x, top, 200, 18, 4), PR.creamL, { key: 'stepe' + i, shadow: false, tex: 0.5 });
  }
  const glow = 0.5 + 0.5 * Math.sin(TT * 5);
  if (TT >= tStep) { ctx.save(); ctx.strokeStyle = `rgba(242,201,76,${0.6 + 0.4 * glow})`; ctx.lineWidth = 8; ctx.setLineDash([22, 14]); ctx.strokeRect(150, 1300, 180, 26); ctx.restore(); }
  hhTag('BƯỚC ĐẦU TIÊN', 260, 1225, PR.green, popS(tStep), -0.03, 30);

  const kP = popS(tPerf);
  withT(840, 650, 0, kP, () => {
    prStar(0, 0, 96, PR.yellow);
    hhTag('HOÀN HẢO', 0, -130, PR.navy, 1, 0.02, 30);
  });

  // the calendar that keeps saying "later"
  withT(270, 620, -0.06, popS(tLate), () => {
    pp(pR(-120, -120, 240, 240, 12), PR.paperW, { key: 'cal', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-120, -120, 240, 70, 12), PR.red, { key: 'calh', shadow: false, tex: 0.5 });
    txt('ĐỂ', 0, -72, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('MAI', 0, 70, 80, PR.char, { align: 'center', weight: 800 });
  });

  prClock(540, 470, 60, 11, 55, 'clk2');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'flat', look: -35, key: 'b2' });
  prSign('TRÌ HOÃN BƯỚC ĐẦU TIÊN', { kicker: KICK });
  prChips();
};

function hhCard(x, title, tagStr, k, rot, key, body) {
  withT(x, 860, rot, k, () => {
    pp(pR(-140, -230, 280, 460, 18), PR.creamL, { key: 'card' + key, sb: 16, sy: 8, tex: 0.5 });
    txt(title, 0, -175, fitSize(title, 230, 32), PR.navy, { align: 'center', weight: 800 });
    body();
    pp(pR(-118, 140, 236, 60, 10), PR.red, { key: 'ctag' + key, sb: 8, sy: 4, tex: 0.45 });
    txt(tagStr, 0, 181, fitSize(tagStr, 184, 26), PR.creamL, { align: 'center', weight: 800 });
  });
}

SCENES.delay2 = () => {   // Một bài viết chưa đăng, một dự án chưa thử, một ý tưởng vẫn nằm trong đầu
  const tA = VW('delay', 'bài').t0, tB = VW('delay', 'dự').t0, tC = VW('delay', 'ý').t0;
  prWall(TEAL, { streak: 700, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(70, 1100, 940, 30, 6), PR.wood, { key: 'shelf2', sb: 12, sy: 6, tex: 0.6 });
  [180, 900].forEach((x) => pp(pG([[x - 30, 1130], [x + 30, 1130], [x, 1190]]), PR.woodD, { key: 'shb' + x, sb: 8, sy: 4 }));

  hhCard(230, 'BÀI VIẾT', 'CHƯA ĐĂNG', popS(tA), -0.03, 'a', () => {
    pp(pR(-100, -130, 200, 190, 8), PR.paperW, { key: 'doc', sb: 6, sy: 3, tex: 0.4 });
    hhScribble(-80, -100, 160, 5, 30, 1, 'docs');
    pp(pR(-60, 82, 120, 40, 20), '#b9b5aa', { key: 'postbtn', shadow: false, tex: 0.4 });
    txt('ĐĂNG', 0, 111, 22, PR.creamL, { align: 'center', weight: 800 });
  });
  hhCard(540, 'DỰ ÁN', 'CHƯA THỬ', popS(tB), 0.02, 'b', () => {
    pp(pR(-100, -90, 200, 170, 6), PR.tan, { key: 'box', sb: 10, sy: 5, tex: 0.6 });
    pp(pG([[-100, -90], [100, -90], [80, -130], [-80, -130]]), '#d8b67e', { key: 'boxl', sb: 6, sy: 3, tex: 0.6 });
    pp(pR(-16, -130, 32, 210, 2), 'rgba(240,226,190,0.95)', { shadow: false, tex: 0.4 });
    pp(pR(-100, -20, 200, 30, 2), 'rgba(240,226,190,0.95)', { shadow: false, tex: 0.4 });
  });
  hhCard(850, 'Ý TƯỞNG', 'VẪN TRONG ĐẦU', popS(tC), -0.02, 'c', () => {
    pp(pE(0, -20, 105, 95), PR.mind, { key: 'head', sb: 10, sy: 5, tex: 0.6 });
    ctx.save(); ctx.strokeStyle = '#6550a0'; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-70, -70); ctx.quadraticCurveTo(-40, -40, -72, -10); ctx.moveTo(70, -70); ctx.quadraticCurveTo(40, -40, 72, -10); ctx.stroke(); ctx.restore();
    hhBulb(0, -30, 34, 1, TT > tC + 0.5 ? 0.6 : 0);
  });

  prClock(540, 470, 58, 12, 10, 'clk2b');
  prStar(150, 450, 30, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'flat', look: -30, key: 'b2b' });
  prSign('VẪN CHƯA BẮT ĐẦU', { kicker: KICK });
  prChips();
};

SCENES.draft = () => {   // Không thể cải thiện một bản nháp chưa tồn tại
  const t0 = E0, tFix = VW('draft', 'cải').t0, tNone = VW('draft', 'tồn').t0;
  prWall(TEAL2, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  withT(320, 840, -0.03, popS(t0 + 0.15), () => {
    pp(pR(-180, -240, 360, 480, 12), PR.paperW, { key: 'drft', sb: 16, sy: 8, tex: 0.5 });
    txt('BẢN NHÁP', 0, -180, 34, PR.navy, { align: 'center', weight: 800 });
    hhScribble(-140, -110, 280, 7, 46, 1, 'dr');
    const u = ev(tFix, 0.9);
    ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 7; ctx.lineCap = 'round';
    if (u > 0) { ctx.beginPath(); ctx.ellipse(-40, -64, 110 * Math.min(1, u * 2), 30, 0, 0, TAU * Math.min(1, u * 2)); ctx.stroke(); }
    if (u > 0.5) { ctx.beginPath(); ctx.moveTo(-140, 90); ctx.lineTo(-140 + 260 * (u - 0.5) * 2, 90); ctx.stroke(); }
    ctx.restore();
  });
  withT(760, 840, 0.03, popS(t0 + 0.35), () => {
    ctx.save(); ctx.strokeStyle = 'rgba(244,241,232,0.85)'; ctx.lineWidth = 7; ctx.setLineDash([26, 18]);
    ctx.beginPath(); ctx.roundRect(-180, -240, 360, 480, 12); ctx.stroke(); ctx.restore();
    txt('?', 0, 50, 180, 'rgba(244,241,232,0.35)', { align: 'center', weight: 800 });
  });
  hhPencil(560, 700, -0.6 + Math.sin(TT * 3) * 0.04, 0.9);
  prCheck(320, 1150, tFix + 0.2, 56);
  prCross(760, 1150, tNone, 56);

  prClock(930, 450, 60, 12, 20, 'clk3');
  prStar(150, 430, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT < tNone ? 'neutral' : 'wow', look: -25, key: 'b3' });
  prSign('CHƯA CÓ THÌ CHƯA SỬA ĐƯỢC', { kicker: KICK });
  prChips();
};

SCENES.question = () => {   // Đừng hỏi: làm sao để kết quả đầu tiên hoàn hảo?
  const tW = VW('question', 'làm').t0, tEnd = VW('question', 'tiên').t0, tPerf = VW('question', 'hoàn').t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBoard(110, 420, 860, 650, 'bq');
  const s1 = 'Làm sao để kết quả', s2 = 'đầu tiên';
  const f = ev(tW, Math.max(0.3, tEnd - tW + 0.2));
  txt(s1, 540, 600, fitSize(s1, 740, 64), CHALKC, { align: 'center', weight: 700, frac: clamp(f * 2) });
  txt(s2, 540, 700, 64, CHALKC, { align: 'center', weight: 700, frac: clamp(f * 2 - 1) });
  withT(540, 860, -0.03, popS(tPerf), () => {
    txt('HOÀN HẢO?', 0, 30, 110, PR.yellow, { align: 'center', weight: 800 });
  });
  prStar(860, 780, 38 * popS(tPerf + 0.15), PR.yellow);
  prStar(220, 790, 26 * popS(tPerf + 0.25), PR.yellow);

  prClock(930, 1200, 54, 12, 30, 'clk4');
  pp(pR(150, 1170, 150, 110, 8), '#3d5050', { key: 'bk4', sb: 10, sy: 5, tex: 0.5 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', look: -25, key: 'b4' });
  prSign('CÂU HỎI CŨ', { kicker: KICK });
  prChips();
};

SCENES.question2 = () => {   // Hãy hỏi: phiên bản đầu tiên cần đạt điều kiện tối thiểu nào?
  const tQ = VW('question', 'phiên').t0, tMin = VW('question', 'tối').t0, tOk = VW('question', 'nào').t0;
  prWall(TEAL2, { streak: 600, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // the question card
  withT(540, 410, 0, popS(tQ), () => {
    pp(pR(-430, -52, 860, 104, 14), PR.creamL, { key: 'qcard', sb: 14, sy: 7, tex: 0.5 });
    const q = 'Bản đầu tiên cần TỐI THIỂU gì?';
    txt(q, 0, 16, fitSize(q, 800, 46), PR.navy, { align: 'center', weight: 800 });
  });

  // two posts and a bar that drops from "hoàn hảo" to "tối thiểu"
  [180, 900].forEach((x) => {
    pp(pR(x - 18, 560, 36, 720, 8), PR.creamL, { key: 'post' + x, sb: 12, sy: 6, tex: 0.5 });
    pp(pR(x - 60, 1260, 120, 30, 8), PR.woodL, { key: 'pbase' + x, sb: 8, sy: 4, tex: 0.5 });
    for (let i = 0; i < 7; i++) pp(pR(x - 18, 600 + i * 96, 36, 10, 2), PR.redD, { shadow: false, tex: false });
  });
  const u = EZ.o3(ev(tMin, 0.7)), by = lerp(620, 1080, u);
  ctx.save(); ctx.globalAlpha = 0.5 * u; ctx.strokeStyle = PR.creamL; ctx.lineWidth = 6; ctx.setLineDash([20, 14]); ctx.strokeRect(200, 610, 680, 22); ctx.restore();
  if (u > 0.5) txt('HOÀN HẢO', 540, 590, 30, 'rgba(244,241,232,0.6)', { align: 'center', weight: 800 });
  pp(pR(200, by - 15, 680, 30, 10), PR.mustard, { key: 'bar', sb: 12, sy: 6, tex: 0.5 });
  hhTag(u < 0.5 ? 'HOÀN HẢO' : 'TỐI THIỂU', 540, by - 60, u < 0.5 ? PR.navy : PR.green, 1, 0, 32);
  prCheck(540, 1180, tOk, 54);

  prStar(110, 470, 26, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT < tOk ? 'neutral' : 'happy', look: -25, key: 'b4b' });
  prSign('ĐIỀU KIỆN TỐI THIỂU', { kicker: KICK });
  prChips();
};

SCENES.iterate = () => {   // Hoàn thành, quan sát, chỉnh sửa
  const tA = VW('iterate', 'hoàn').t0, tB = VW('iterate', 'quan').t0, tC = VW('iterate', 'chỉnh').t0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const C = [540, 860], R = 300;
  const nodes = [[-Math.PI / 2, 'HOÀN THÀNH', tA, PR.green], [Math.PI / 6, 'QUAN SÁT', tB, PR.blue], [Math.PI * 5 / 6, 'CHỈNH SỬA', tC, PR.orange]];
  // arrows round the loop, each drawn as its node lands
  ctx.save(); ctx.strokeStyle = 'rgba(244,241,232,0.8)'; ctx.lineWidth = 10; ctx.lineCap = 'round';
  nodes.forEach(([a, , t], i) => {
    const u = ev(t + 0.15, 0.5); if (u <= 0) return;
    const a0 = a + 0.42, a1 = a0 + (TAU / 3 - 0.84) * u;
    ctx.beginPath(); ctx.arc(C[0], C[1], R, a0, a1); ctx.stroke();
    if (u >= 1) { const hx = C[0] + Math.cos(a1) * R, hy = C[1] + Math.sin(a1) * R, d = a1 + Math.PI / 2; pp(pG([[hx + Math.cos(d) * 30, hy + Math.sin(d) * 30], [hx + Math.cos(d + 2.4) * 26, hy + Math.sin(d + 2.4) * 26], [hx + Math.cos(d - 2.4) * 26, hy + Math.sin(d - 2.4) * 26]]), 'rgba(244,241,232,0.9)', { shadow: false, tex: false }); }
    void i;
  });
  ctx.restore();
  nodes.forEach(([a, label, t, c], i) => {
    const x = C[0] + Math.cos(a) * R, y = C[1] + Math.sin(a) * R;
    withT(x, y, 0, popS(t), () => {
      pp(pE(0, 0, 92, 92), c, { key: 'node' + i, sb: 14, sy: 7, tex: 0.5 });
      if (i === 0) { ctx.save(); ctx.strokeStyle = PR.creamL; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-36, 0); ctx.lineTo(-8, 30); ctx.lineTo(40, -28); ctx.stroke(); ctx.restore(); }
      if (i === 1) { pp(pE(0, 0, 52, 32), PR.creamL, { shadow: false, tex: 0.4 }); pp(pE(0, 0, 20, 20), PR.char, { shadow: false, tex: false }); }
      if (i === 2) hhPencil(0, 0, 0.7, 0.42);
      const w = txtW(label, 28) + 36;
      pp(pR(-w / 2, 104, w, 52, 10), PR.creamL, { key: 'nlab' + i, sb: 8, sy: 4, tex: 0.4 });
      txt(label, 0, 140, 28, PR.navy, { align: 'center', weight: 800 });
    });
  });
  // the work in the middle: v1, then v2 once it has been edited
  withT(C[0], C[1] + 20, 0, popS(tA + 0.1), () => {
    pp(pR(-80, -100, 160, 200, 8), PR.paperW, { key: 'mid', sb: 10, sy: 5, tex: 0.45 });
    txt(TT < VW('iterate', 'sửa').t0 + 0.2 ? 'V1' : 'V2', 0, 24, 64, PR.navy, { align: 'center', weight: 800 });
  });

  prClock(930, 450, 58, 1, 0, 'clk5');
  prStar(150, 440, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('LÀM XONG RỒI SỬA DẦN', { kicker: KICK });
  prChips();
};

SCENES.careful = () => {   // Làm cẩn thận là điều tốt
  const tCare = VW('iterate', 'cẩn').t0, tGood = VW('iterate', 'tốt').t0;
  prWall(TEAL2, { streak: 500, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  withT(540, 860, 0.02, popS(E0 + 0.1), () => {
    pp(pR(-240, -320, 480, 640, 12), PR.paperW, { key: 'cpage', sb: 16, sy: 8, tex: 0.5 });
    hhScribble(-190, -250, 380, 10, 52, 1, 'cp');
  });
  const u = EZ.io(ev(tCare, 1.2));
  const gx = lerp(400, 640, u), gy = lerp(660, 900, u);
  pp(pR(gx + 70, gy + 70, 34, 170, 10), PR.char, { key: 'mgh', sb: 10, sy: 5, tex: 0.4, });
  withT(gx, gy, 0, 1, () => {
    pp(() => { ctx.arc(0, 0, 120, 0, TAU); ctx.moveTo(98, 0); ctx.arc(0, 0, 98, 0, TAU, true); }, PR.char, { key: 'mgr', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(0, 0, 98, 98), 'rgba(200,230,240,0.25)', { shadow: false, tex: false });
  });
  prCheck(730, 1130, tGood, 64);

  prClock(930, 450, 58, 1, 5, 'clk5b');
  prStar(150, 440, 30, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT < tGood ? 'neutral' : 'happy', look: -25, key: 'b5b' });
  prSign('CẨN THẬN LÀ ĐIỀU TỐT', { kicker: KICK });
  prChips();
};

SCENES.barrier = () => {   // Đừng để tiêu chuẩn cao biến thành lý do không bắt đầu
  const tWall = VW('iterate', 'tiêu').t0, tWhy = VW('iterate', 'lý').t0, tNo = VW('iterate', 'không').t0;
  prWall(TEAL, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // the start line on the floor of the track
  pp(pR(70, 1250, 940, 40, 4), PR.creamL, { key: 'start', sb: 8, sy: 4, tex: 0.5 });
  for (let i = 0; i < 24; i++) pp(pR(70 + i * 39.2, 1250 + (i % 2) * 20, 19.6, 20, 0), PR.char, { shadow: false, tex: false });
  txt('VẠCH XUẤT PHÁT', 540, 1340, 30, PR.creamL, { align: 'center', weight: 800 });

  // the wall of high standards rises behind the line
  const h = 640 * EZ.o3(ev(tWall, 0.8));
  if (h > 2) {
    ctx.save(); ctx.beginPath(); ctx.rect(200, 1240 - h, 680, h); ctx.clip();
    pp(pR(200, 600, 680, 640, 6), '#a9573f', { key: 'wall9', sb: 16, sy: 8, tex: 0.6 });
    ctx.fillStyle = 'rgba(40,20,12,0.35)';
    for (let r = 0; r < 10; r++) { ctx.fillRect(200, 600 + r * 64, 680, 5); for (let c = 0; c < 6; c++) ctx.fillRect(200 + (r % 2 ? 56 : 0) + c * 113, 600 + r * 64, 5, 64); }
    ctx.restore();
  }
  hhTag('TIÊU CHUẨN CAO', 540, 700, PR.navy, popS(tWall + 0.5), -0.02, 40);
  hhTag('= LÝ DO KHÔNG BẮT ĐẦU?', 540, 900, PR.red, popS(tWhy), 0.02, 36);
  prCross(540, 1090, tNo, 64);

  prStar(130, 440, 30, PR.mustard);
  prClock(930, 450, 58, 1, 10, 'clk5c');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'flat', look: -30, key: 'b5c' });
  prSign('ĐỪNG ĐỂ NÓ CẢN BẠN', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // Bạn đang trì hoãn điều gì?
  const t0 = E0, tType = VW('cta', 'điều').t0;
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(190, 440, 36, PR.mustard);
  prStar(880, 420, 28, PR.pink);

  prCommentBox(CX, 640, 'ĐIỀU BẠN TRÌ HOÃN', tType, { hint: 'Bạn đang trì hoãn điều gì?' });

  // a first draft, finally on the page
  withT(540, 1020, -0.04, popS(t0 + 0.2), () => {
    pp(pR(-210, -200, 420, 400, 10), PR.paperW, { key: 'ctadr', sb: 16, sy: 8, tex: 0.5 });
    txt('BẢN NHÁP 1', 0, -130, 40, PR.navy, { align: 'center', weight: 800 });
    hhScribble(-160, -70, 320, 5, 50, ev(t0 + 0.4, 2.2), 'ctas');
  });
  hhPencil(700, 1060, 0.55 + Math.sin(TT * 8) * 0.05, 0.9);

  prNote(150, 1250, 120, 140, PR.yellow, -0.05, 'note6');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN ĐANG TRÌ HOÃN ĐIỀU GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['delay', 'một', 0, 'delay2'],
  ['question', 'hãy', 0, 'question2'],
  ['iterate', 'làm', 0, 'careful'],
  ['iterate', 'nhưng', 0, 'barrier'],
];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'ý').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'sợ').t0 + 0.05 });
  cues.push({ k: 'pop', t: VW('delay', 'hoàn').t0 });
  cues.push({ k: 'tick', t: VW('delay', 'trì').t0 });
  cues.push({ k: 'pop', t: VW('delay', 'bài').t0 });
  cues.push({ k: 'pop', t: VW('delay', 'dự').t0 });
  cues.push({ k: 'pop', t: VW('delay', 'ý').t0 });
  cues.push({ k: 'pop', t: VW('draft', 'cải').t0 + 0.2 });
  cues.push({ k: 'thud', t: VW('draft', 'tồn').t0 });
  cues.push({ k: 'pop', t: VW('question', 'hoàn').t0 });
  cues.push({ k: 'tick', t: VW('question', 'tối').t0 });
  cues.push({ k: 'chime', t: VW('question', 'nào').t0 });
  cues.push({ k: 'pop', t: VW('iterate', 'hoàn').t0 });
  cues.push({ k: 'pop', t: VW('iterate', 'quan').t0 });
  cues.push({ k: 'pop', t: VW('iterate', 'chỉnh').t0 });
  cues.push({ k: 'chime', t: VW('iterate', 'tốt').t0 });
  cues.push({ k: 'thud', t: VW('iterate', 'không').t0 });
  cues.push({ k: 'type', t: VW('cta', 'điều').t0, n: 16, d: 0.45 });
  return cues;
}
const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const ERA_BG = ERA_LIST.map(() => TEAL);
function pieceCam() { return null; }
const BRIDGES = [];
const TIMELINE = {
  width: W, height: H, fps: FPS, duration: DURATION, frames: NFRAMES, loop: LOOP_T, safe: SAFE, format: 'voice-cut',
  shots: SHOT_LIST.map(([t0, sc], i) => ({ id: i + 1, key: sc, era: i, t0, t1: ERA_LIST[i][1], title: sc })),
  cuts: SHOT_LIST.slice(1).map(([t0]) => t0), morphs: [], cues: {},
  acts: [{ name: 'reel', role: 'journey', t0: 0, t1: DURATION }],
  board: SHOT_LIST.map(([t0, sc], i) => ({ t: (t0 + ERA_LIST[i][1]) / 2 + 0.3, title: sc, sound: '', next: 'cut' })),
  narration: VOICE.lines.map((l) => ({ t0: l.t0, t1: l.t1, text: l.text })),
  eras: ERA_LIST, bg: ERA_BG, cam: pieceCam, bridges: BRIDGES,
};
window.TIMELINE = TIMELINE;
