// =====================================================================
//  TIDU MIND 10 — "Suy nghĩ của bạn không phải lúc nào cũng là sự thật"
//  Liệu pháp Nhận thức Hành vi (CBT Thought Record).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · NHẬN THỨC CBT';
const TEAL = '#2e4f4f', TEAL2 = '#355555';

const SCENES = {};

// ---- helpers (sn = suy nghĩ)
function snTag(str, x, y, fill, k = 1, rot = 0, size = 30) {
  const w = txtW(str, size) + 44, h = size * 2;
  withT(x, y, rot, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, 10), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.45 });
    txt(str, 0, size * 0.36, size, PR.creamL, { align: 'center', weight: 800 });
  });
}
// a projector screen showing a slide whose chart goes wrong; s scales it
function snScreen(cx, cy, k, bad) {
  withT(cx, cy, 0, k, () => {
    pp(pR(-12, 200, 24, 300, 4), PR.greyD, { key: 'scrpole', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(-350, -250, 700, 24, 10), PR.greyD, { key: 'scrbar', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(-330, -230, 660, 430, 6), PR.paperW, { key: 'scr', sb: 16, sy: 8, tex: 0.45 });
    txt('BÀI THUYẾT TRÌNH', 0, -170, 34, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-270, 150, 540, 5, 2), PR.char, { shadow: false, tex: false });
    [[-200, 160, PR.blue], [-80, 230, PR.blue], [40, 110, PR.blue], [160, 60, PR.blue]].forEach(([x, h, c], i) => pp(pR(x, 150 - h, 80, h, 4), bad && i >= 2 ? PR.red : c, { key: 'scb' + i, shadow: false, tex: 0.4 }));
    if (bad) {
      ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(-180, -40); ctx.lineTo(-40, -90); ctx.lineTo(60, 20); ctx.lineTo(230, 70); ctx.stroke();
      pp(pG([[250, 76], [206, 86], [226, 46]]), PR.red, { shadow: false, tex: false });
      ctx.restore();
    }
  });
}
function snScale(tilt, lItems, rItems, lLabel, rLabel) {
  const px = 540, py = 640, L = 290;
  pp(pR(px - 16, py, 32, 640, 6), PR.brown, { key: 'scpost', sb: 12, sy: 6, tex: 0.6 });
  pp(pR(px - 150, 1270, 300, 34, 10), PR.woodD, { key: 'scbase', sb: 12, sy: 6, tex: 0.6 });
  const ends = [-1, 1].map((d) => [px + d * L * Math.cos(tilt), py + d * L * Math.sin(tilt)]);
  ctx.save(); ctx.strokeStyle = 'rgba(244,241,232,0.85)'; ctx.lineWidth = 4;
  ends.forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 110, y + 280); ctx.moveTo(x, y); ctx.lineTo(x + 110, y + 280); ctx.stroke(); });
  ctx.restore();
  withT(px, py, tilt, 1, () => pp(pR(-L - 20, -14, 2 * L + 40, 28, 12), PR.mustard, { key: 'beam', sb: 12, sy: 6, tex: 0.5 }));
  pp(pE(px, py, 30, 30), PR.brown, { key: 'pivot', sb: 8, sy: 4, tex: 0.5 });
  [[ends[0], lItems, lLabel, PR.green], [ends[1], rItems, rLabel, PR.red]].forEach(([[x, y], items, label, c], j) => {
    items.forEach(([k, rot], i) => withT(x - 40 + i * 70, y + 240, rot, k, () => {
      pp(pR(-50, -64, 100, 128, 6), PR.paperW, { key: 'ev' + j + i, sb: 8, sy: 4, tex: 0.45 });
      for (let r = 0; r < 4; r++) pp(pR(-34, -40 + r * 24, r === 3 ? 40 : 68, 6, 2), 'rgba(40,50,70,0.35)', { shadow: false, tex: false });
    }));
    pp(() => { ctx.moveTo(x - 120, y + 280); ctx.lineTo(x + 120, y + 280); ctx.quadraticCurveTo(x, y + 380, x - 120, y + 280); }, PR.grey, { key: 'pan' + j, sb: 12, sy: 6, tex: 0.5 });
    if (label) snTag(label, x, y + 420, c, 1, 0, 26);
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // Nghĩ mình thất bại không có nghĩa đó là sự thật
  const tTh = VW('hook', 'nghĩ').t0, tFail = VW('hook', 'thất').t0, tTrue = VW('hook', 'sự').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  prThought(540, 760, 680, 440, 740, 1290, '', { key: 'th1' });   // no pop: the bubble is the thumbnail at frame 0
  if (TT >= tTh && TT < tFail) txt('...', 540, 780, 110, PR.grey, { align: 'center', base: 'middle', weight: 800 });
  if (TT >= tFail) withT(540, 760, -0.02, popS(tFail), () => {
    txt('MÌNH', 0, -30, 80, PR.navy, { align: 'center', weight: 800 });
    txt('THẤT BẠI', 0, 70, fitSize('THẤT BẠI', 500, 92), PR.redD, { align: 'center', weight: 800 });
  });
  prStamp('CHƯA CHẮC LÀ SỰ THẬT', 540, 965, PR.green, tTrue, { rot: -0.05, size: 52, from: 1.3 });

  prClock(930, 450, 60, 3, 30, 'clk1');
  prStar(140, 430, 34, PR.mustard);
  prStar(220, 1250, 24, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT < tTrue ? 'flat' : 'wow', look: -30, key: 'b1' });
  prSign('SUY NGHĨ CHƯA PHẢI SỰ THẬT', { kicker: KICK });
  prChips();
};

SCENES.situation = () => {   // Giả sử bạn làm hỏng một bài thuyết trình
  const t0 = E0, tBad = VW('situation', 'hỏng').t0;
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  snScreen(540, 760, popS(t0 + 0.15), TT >= tBad);
  // the lectern and its microphone
  pp(pG([[120, 1180], [330, 1180], [310, 1500], [140, 1500]]), PR.brown, { key: 'lect', sb: 14, sy: 7, tex: 0.6 });
  pp(pR(100, 1160, 250, 34, 8), PR.woodL, { key: 'lectt', sb: 8, sy: 4, tex: 0.5 });
  ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(225, 1160); ctx.quadraticCurveTo(230, 1110, 260, 1090); ctx.stroke(); ctx.restore();
  pp(pE(266, 1082, 16, 20), PR.char, { key: 'mic', shadow: false, tex: 0.3 });
  prStamp('HỎNG RỒI!', 640, 1110, PR.red, tBad + 0.1, { rot: 0.06, size: 60 });

  prStar(140, 430, 30, PR.pink);
  prClock(930, 450, 58, 3, 45, 'clk2');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT < tBad ? 'neutral' : 'wow', look: -35, key: 'b2' });
  prSign('MỘT BÀI THUYẾT TRÌNH HỎNG', { kicker: KICK });
  prChips();
};

SCENES.situation2 = () => {   // Suy nghĩ đầu tiên có thể là: mình thật kém cỏi
  const tTh = VW('situation', 'suy').t0, tSay = VW('situation', 'mình').t0;
  prWall(TEAL, { streak: 600, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // a small grey rain cloud over the corner of the room
  [[150, 470, 60], [215, 450, 70], [280, 475, 55]].forEach(([x, y, r], i) => pp(pE(x, y, r, r * 0.8), PR.greyD, { key: 'cl' + i, sb: 8, sy: 4, tex: 0.5 }));
  ctx.save(); ctx.strokeStyle = 'rgba(169,203,224,0.8)'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) { const x = 160 + i * 30, y = 530 + ((TT * 260 + i * 37) % 80); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 22); ctx.stroke(); }
  ctx.restore();

  prThought(540, 840, 680, 470, 760, 1300, '', { t: tTh, key: 'th2' });
  if (TT >= tTh && TT < tSay) txt('...', 540, 860, 110, PR.grey, { align: 'center', base: 'middle', weight: 800 });
  if (TT >= tSay) withT(540, 840, 0.02, popS(tSay), () => {
    txt('"MÌNH THẬT', 0, -24, fitSize('"MÌNH THẬT', 500, 76), PR.navy, { align: 'center', weight: 800 });
    txt('KÉM CỎI"', 0, 76, fitSize('KÉM CỎI"', 500, 88), PR.redD, { align: 'center', weight: 800 });
  });

  prClock(930, 450, 58, 3, 50, 'clk2b');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'flat', look: -30, key: 'b2b' });
  prSign('SUY NGHĨ ĐẦU TIÊN', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // Tách tình huống khỏi cách diễn giải
  const t0 = E0, tCut = VW('reality', 'tách').t0;
  prWall(TEAL2, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });

  const u = EZ.o3(ev(tCut, 0.6)), dx = 30 * u;
  // the dashed cut line, drawn top to bottom as the cards come apart
  if (u > 0) { ctx.save(); ctx.strokeStyle = 'rgba(244,241,232,0.9)'; ctx.lineWidth = 6; ctx.setLineDash([18, 14]); ctx.beginPath(); ctx.moveTo(540, 560); ctx.lineTo(540, 560 + 640 * u); ctx.stroke(); ctx.restore(); }
  withT(350 - dx, 880, -0.02 * u, popS(t0 + 0.15), () => {
    pp(pR(-190, -260, 380, 520, 16), '#4e8268', { key: 'sit_box', sb: 16, sy: 8, tex: 0.5 });
    txt('TÌNH HUỐNG', 0, -195, 36, PR.creamL, { align: 'center', weight: 800 });
    withT(0, 10, 0, 0.42, () => snScreen(0, 0, 1, true));
    txt('Bài thuyết trình', 0, 180, 30, PR.creamL, { align: 'center', weight: 700 });
  });
  withT(730 + dx, 880, 0.02 * u, popS(t0 + 0.3), () => {
    pp(pR(-190, -260, 380, 520, 16), '#9e5050', { key: 'int_box', sb: 16, sy: 8, tex: 0.5 });
    txt('DIỄN GIẢI', 0, -195, 36, PR.creamL, { align: 'center', weight: 800 });
    prThought(0, 0, 300, 190, 60, 120, '', { key: 'th3' });
    txt('"Mình', 0, -8, 40, PR.navy, { align: 'center', weight: 800 });
    txt('kém cỏi"', 0, 38, 40, PR.redD, { align: 'center', weight: 800 });
    txt('Cách mình hiểu', 0, 180, 30, PR.creamL, { align: 'center', weight: 700 });
  });
  // the scissors that make the cut
  withT(540, 520 + 680 * u, Math.PI / 2, popS(t0 + 0.4), () => {
    pp(pG([[0, -10], [120, -26], [0, 6]]), PR.grey, { key: 'bl1', sb: 6, sy: 3, tex: 0.3 });
    pp(pG([[0, 10], [120, 26], [0, -6]]), PR.techK, { key: 'bl2', sb: 6, sy: 3, tex: 0.3 });
    pp(() => { ctx.arc(-40, -28, 26, 0, TAU); ctx.moveTo(-26, -28); ctx.arc(-40, -28, 14, 0, TAU, true); }, PR.red, { key: 'sh1', sb: 6, sy: 3, tex: 0.4 });
    pp(() => { ctx.arc(-40, 28, 26, 0, TAU); ctx.moveTo(-26, 28); ctx.arc(-40, 28, 14, 0, TAU, true); }, PR.red, { key: 'sh2', sb: 6, sy: 3, tex: 0.4 });
  });

  prStar(150, 430, 32, PR.mustard);
  prClock(930, 450, 58, 4, 0, 'clk3');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'neutral', look: -25, key: 'b3' });
  prSign('TÁCH SỰ VIỆC KHỎI DIỄN GIẢI', { kicker: KICK });
  prChips();
};

SCENES.reality2 = () => {   // Sự thật là bài thuyết trình lần này chưa tốt
  const tFact = VW('reality', 'sự').t0, tOnce = VW('reality', 'lần').t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  snScreen(540, 760, 1, true);
  snTag('SỰ THẬT', 300, 520, PR.green, popS(tFact), -0.08, 34);
  snTag('LẦN NÀY: CHƯA TỐT', 540, 1110, PR.navy, popS(tOnce), 0.02, 40);

  prStar(150, 440, 30, PR.mustard);
  prClock(930, 450, 58, 4, 5, 'clk3b');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b3b' });
  prSign('SỰ THẬT: LẦN NÀY CHƯA TỐT', { kicker: KICK });
  prChips();
};

SCENES.reality3 = () => {   // "Luôn kém cỏi" là nhận định rộng hơn rất nhiều
  const t0 = E0, tAlways = VW('reality', 'luôn').t0, tWide = VW('reality', 'rộng').t0;
  prWall(TEAL2, { streak: 520, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const C = [540, 880], r = lerp(200, 420, EZ.o3(ev(tWide - 0.3, 0.9)));
  withT(C[0], C[1], 0, popS(tAlways), () => {
    pp(pE(0, 0, r, r), 'rgba(210,69,58,0.55)', { key: 'big', sb: 18, sy: 9, tex: 0.5 });
    ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 8; ctx.setLineDash([22, 14]); ctx.beginPath(); ctx.arc(0, 0, r - 4, 0, TAU); ctx.stroke(); ctx.restore();
    snTag('"MÌNH LUÔN KÉM CỎI"', 0, -r - 20, PR.redD, 1, -0.02, 36);
  });
  withT(C[0], C[1] + 60, 0, popS(t0 + 0.15), () => {
    pp(pE(0, 0, 120, 120), PR.green, { key: 'small', sb: 14, sy: 7, tex: 0.5 });
    txt('LẦN NÀY', 0, -6, 36, PR.creamL, { align: 'center', weight: 800 });
    txt('CHƯA TỐT', 0, 40, 30, PR.creamL, { align: 'center', weight: 800 });
  });

  prStar(130, 430, 30, PR.mustard);
  prClock(950, 420, 50, 4, 10, 'clk3c');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: TT < tWide ? 'neutral' : 'wow', look: -30, key: 'b3c' });
  prSign('MỘT NHẬN ĐỊNH QUÁ RỘNG', { kicker: KICK });
  prChips();
};

SCENES.questions = () => {   // Bằng chứng nào ủng hộ, bằng chứng nào không?
  const t0 = E0, tFor = VW('questions', 'ủng').t0, tAg = VW('questions', 'không').t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  withT(540, 440, 0, popS(t0 + 0.1), () => {
    pp(pR(-330, -48, 660, 96, 14), PR.creamL, { key: 'qth', sb: 12, sy: 6, tex: 0.5 });
    txt('"MÌNH THẬT KÉM CỎI"?', 0, 16, 44, PR.navy, { align: 'center', weight: 800 });
  });
  const tilt = lerp(0, -0.12, EZ.o3(ev(tFor + 0.1, 0.5))) + lerp(0, 0.12, EZ.o3(ev(tAg + 0.1, 0.5)));
  snScale(tilt, [[popS(tFor), -0.08]], [[popS(VW('questions', 'bằng', 1).t0), 0.06], [popS(tAg), -0.04]], 'ỦNG HỘ', 'KHÔNG ỦNG HỘ');

  prStar(140, 440, 30, PR.mustard);
  prNote(150, 1260, 120, 140, PR.yellow, -0.05, 'note4');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', look: -25, key: 'b4' });
  prSign('BẰNG CHỨNG NÀO?', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // Không cần ép mình suy nghĩ tích cực
  const t0 = E0, tPush = VW('reframe', 'ép').t0, tPos = VW('reframe', 'tích').t0;
  prWall(TEAL2, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  // a forced smile sticker, squeezed wider on "ép"
  const sq = 1 + 0.18 * EZ.o3(ev(tPush, 0.4)) + 0.02 * Math.sin(TT * 14) * (TT > tPush ? 1 : 0);
  withT(540, 820, 0, popS(t0 + 0.15), () => {
    ctx.save(); ctx.scale(sq, 1 / sq);
    pp(pE(0, 0, 250, 250), PR.yellow, { key: 'smile', sb: 18, sy: 9, tex: 0.5 });
    pp(pE(-85, -60, 26, 38), PR.char, { shadow: false, tex: false });
    pp(pE(85, -60, 26, 38), PR.char, { shadow: false, tex: false });
    ctx.strokeStyle = PR.char; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 10, 150, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
    ctx.restore();
  });
  snTag('PHẢI TÍCH CỰC!', 540, 1170, PR.navy, popS(t0 + 0.3), -0.03, 40);
  prCross(790, 600, tPos, 70);

  prStar(150, 440, 30, PR.mustard);
  prClock(930, 450, 58, 4, 30, 'clk5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'flat', look: -20, key: 'b5' });
  prSign('KHÔNG CẦN ÉP TÍCH CỰC', { kicker: KICK });
  prChips();
};

SCENES.reframe2 = () => {   // Chỉ cần suy nghĩ công bằng và chính xác hơn
  const tFair = VW('reframe', 'công').t0, tExact = VW('reframe', 'chính').t0, tMore = VW('reframe', 'hơn').t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  withT(540, 440, 0, popS(tFair), () => {
    pp(pR(-330, -48, 660, 96, 14), PR.creamL, { key: 'qth2', sb: 12, sy: 6, tex: 0.5 });
    const s = TT < tExact ? 'CÔNG BẰNG' : 'CÔNG BẰNG · CHÍNH XÁC';
    txt(s, 0, 16, fitSize('CÔNG BẰNG · CHÍNH XÁC', 600, 46), PR.green, { align: 'center', weight: 800 });
  });
  snScale(0, [[1, -0.08]], [[1, 0.06], [1, -0.04]], 'ỦNG HỘ', 'KHÔNG ỦNG HỘ');
  prCheck(540, 1180, tMore, 56);

  prStar(140, 440, 30, PR.mustard);
  prNote(150, 1260, 120, 140, PR.yellow, -0.05, 'note5');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5b' });
  prSign('NHÌN CẢ HAI PHÍA', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // Lưu lại ba câu hỏi
  const tSave = VW('cta', 'lưu').t0;
  const qs = [['Chuyện gì xảy ra?', VW('cta', 'chuyện').t0], ['Mình đang nghĩ gì?', VW('cta', 'mình').t0], ['Bằng chứng là gì?', VW('cta', 'bằng').t0]];
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  prBunting(260);
  prStar(190, 440, 34, PR.mustard);
  prStar(880, 420, 28, PR.pink);

  withT(540, 850, -0.015, popS(tSave), () => {
    pp(pR(-400, -330, 800, 660, 16), PR.paperW, { key: 'card6', sb: 18, sy: 9, tex: 0.5 });
    // the bookmark ribbon: "save this"
    pp(pG([[250, -330], [330, -330], [330, -190], [290, -224], [250, -190]]), PR.red, { key: 'ribbon', sb: 8, sy: 4, tex: 0.5 });
    txt('3 CÂU HỎI', -340, -240, 50, PR.navy, { weight: 800 });
    pp(pR(-340, -205, 560, 5, 2), PR.navy, { shadow: false, tex: false });
    qs.forEach(([q, t], i) => {
      const y = -110 + i * 150, k = popS(t);
      if (k <= 0.01) { pp(pR(-340, y - 30, 680, 6, 2), 'rgba(40,50,70,0.2)', { shadow: false, tex: false }); return; }
      withT(-290, y, 0, k, () => { pp(pE(0, 0, 40, 40), [PR.blue, PR.orange, PR.green][i], { key: 'qn' + i, sb: 6, sy: 3, tex: 0.4 }); txt(String(i + 1), 0, 15, 42, PR.creamL, { align: 'center', weight: 800 }); });
      txt(q, -220, y + 16, fitSize(q, 560, 48), PR.char, { weight: 800 });
    });
  });

  prNote(150, 1260, 120, 140, PR.yellow, -0.05, 'note6');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('LƯU LẠI 3 CÂU HỎI NÀY', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['situation', 'suy', 0, 'situation2'],
  ['reality', 'sự', 0, 'reality2'],
  ['reality', 'còn', 0, 'reality3'],
  ['reframe', 'chỉ', 0, 'reframe2'],
];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'nghĩ').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'sự').t0 });
  cues.push({ k: 'thud', t: VW('situation', 'hỏng').t0 + 0.1 });
  cues.push({ k: 'pop', t: VW('situation', 'suy').t0 });
  cues.push({ k: 'pop', t: VW('situation', 'mình').t0 });
  cues.push({ k: 'tick', t: VW('reality', 'tách').t0 });
  cues.push({ k: 'pop', t: VW('reality', 'sự').t0 });
  cues.push({ k: 'pop', t: VW('reality', 'lần').t0 });
  cues.push({ k: 'pop', t: VW('reality', 'luôn').t0 });
  cues.push({ k: 'tick', t: VW('reality', 'rộng').t0 - 0.3 });
  cues.push({ k: 'pop', t: VW('questions', 'ủng').t0 });
  cues.push({ k: 'pop', t: VW('questions', 'bằng', 1).t0 });
  cues.push({ k: 'pop', t: VW('questions', 'không').t0 });
  cues.push({ k: 'thud', t: VW('reframe', 'tích').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'công').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'hơn').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'lưu').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'chuyện').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'mình').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'bằng').t0 });
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
