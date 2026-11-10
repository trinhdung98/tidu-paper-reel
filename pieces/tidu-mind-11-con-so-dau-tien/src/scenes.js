// =====================================================================
//  TIDU MIND 11 — "Con số đầu tiên có thể ảnh hưởng quyết định của bạn"
//  Hiệu ứng neo (Anchoring Bias) — Thiên kiến nhận thức.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THIÊN KIẾN';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ thẻ giá dạng giấy cắt (price tag)
function m11Tag(x, y, price, strike = false, highlight = false, key = 'tag') {
  withT(x, y, 0, 1, () => {
    // Thân thẻ giá
    pp(pR(-180, -100, 360, 200, 24), highlight ? '#fff4d6' : PR.paperW, { key: key + 'b', sb: 14, sy: 7, tex: 0.4 });
    // Lỗ xỏ dây và dây treo
    pp(pE(-130, 0, 16, 16), PR.char, { key: key + 'hole', shadow: false, tex: false });
    ctx.save(); ctx.strokeStyle = '#c8a870'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(-190, -40); ctx.stroke(); ctx.restore();
    // Chữ giá
    const col = highlight ? PR.red : (strike ? PR.greyD : PR.navy);
    txt(price, 10, 12, fitSize(price, 250, 48), col, { align: 'center', base: 'middle', weight: 800 });
    // Gạch chéo nếu strike
    if (strike) {
      ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 8; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-110, 30); ctx.lineTo(130, -10); ctx.stroke(); ctx.restore();
    }
  });
}

// Helper: vẽ chiếc mỏ neo giấy (anchor)
function m11Anchor(cx, cy, s = 1, key = 'anc') {
  withT(cx, cy, 0, s, () => {
    // Vòng xích trên
    pp(pE(0, -120, 32, 32), PR.char, { key: key + 'ring', sb: 8, sy: 4, tex: 0.4 });
    pp(pE(0, -120, 16, 16), PR.cream, { shadow: false, tex: false });
    // Trục đứng
    pp(pR(-12, -100, 24, 210, 10), PR.char, { key: key + 'shaft', sb: 10, sy: 5, tex: 0.4 });
    // Thanh ngang
    pp(pR(-80, -60, 160, 22, 8), PR.greyD, { key: key + 'cross', sb: 8, sy: 4, tex: 0.4 });
    // Cánh neo cong hình cung
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 26; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 40, 110, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore();
    // Hai mũi neo nhọn
    pp(pG([[-105, 30], [-130, 70], [-80, 60]]), PR.char, { key: key + 'tipL', shadow: false });
    pp(pG([[105, 30], [130, 70], [80, 60]]), PR.char, { key: key + 'tipR', shadow: false });
  });
}

// Helper: vẽ đồng hồ đo định giá (gauge dial)
function m11Dial(cx, cy, value = 0.5, key = 'dial') {
  withT(cx, cy, 0, 1, () => {
    // Khung đồng hồ bán nguyệt
    pp(pR(-260, -150, 520, 280, 28), PR.paperW, { key: key + 'bg', sb: 14, sy: 7, tex: 0.4 });
    // Vòng cung đo
    ctx.save(); ctx.lineWidth = 24; ctx.lineCap = 'round';
    ctx.strokeStyle = '#e2ded5';
    ctx.beginPath(); ctx.arc(0, 60, 170, Math.PI, 0); ctx.stroke();
    // Đoạn giá neo (đỏ)
    ctx.strokeStyle = PR.red;
    ctx.beginPath(); ctx.arc(0, 60, 170, Math.PI + Math.PI * 0.65, 0); ctx.stroke();
    ctx.restore();
    // Nhãn 2 đầu
    txt('0đ', -170, 100, 28, PR.greyD, { align: 'center', weight: 700 });
    txt('500k', 170, 100, 28, PR.red, { align: 'center', weight: 800 });
    // Kim chỉ (tính góc từ Math.PI đến 0)
    const angle = Math.PI - Math.PI * clamp(value);
    ctx.save();
    ctx.translate(0, 60);
    ctx.rotate(angle);
    pp(pR(-6, -10, 12, 160, 6), PR.char, { key: key + 'needle', shadow: false, tex: 0.3 });
    pp(pE(0, 0, 22, 22), PR.navy, { key: key + 'pin', sb: 6, sy: 3, tex: 0.3 });
    ctx.restore();
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Hai thẻ giá 500k và 300k xuất hiện
  const t500 = VW('hook', 'năm').t0, t300 = VW('hook', 'ba').t0, tHoi = VW('hook', 'hời').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 2, 15, 'clk1');

  // Thẻ giá 500.000đ (xuất hiện trước, gạch chéo khi 300k xuất hiện)
  const k1 = popS(t500);
  if (k1 > 0.01) withT(CX, 620, -0.04, k1, () => {
    m11Tag(0, 0, '500.000đ', TT >= t300, false, 'tag500');
  });

  // Thẻ giá 300.000đ (xuất hiện tạo cảm giác "hời")
  const k2 = popS(t300);
  if (k2 > 0.01) withT(CX, 920, 0.04, k2, () => {
    m11Tag(0, 0, '300.000đ', false, true, 'tag300');
  });

  // Stamp "MÓN HỜI?"
  if (TT >= tHoi) {
    prStamp('MÓN HỜI?', CX, 1160, PR.red, tHoi, { rot: -0.08, size: 48 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT < tHoi ? 'neutral' : 'wow', look: -25, key: 'b1' });
  prSign('TẠI SAO TRÔNG NHƯ MÓN HỜI?', { kicker: KICK });
  prChips();
};

SCENES.explain = () => {   // S2: Giá 500.000đ được đóng khung lớn + Thẻ "HIỆU ỨNG NEO"
  const tNeo = VW('explain', 'neo').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Thẻ lớn đóng khung làm MỐC NEO
  withT(CX, 650, 0, popS(E0 + 0.1), () => {
    pp(pR(-360, -140, 720, 280, 24), PR.paperW, { key: 'frame_bg', sb: 16, sy: 8, tex: 0.4 });
    pp(pR(-340, -120, 680, 240, 16), '#fff0e0', { shadow: false, tex: 0.3 });
    txt('CON SỐ ĐẦU TIÊN (MỐC NEO)', 0, -60, 32, PR.orange, { align: 'center', weight: 800 });
    txt('500.000đ', 0, 30, 80, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  // Banner HIỆU ỨNG NEO
  const kNeo = popS(tNeo);
  if (kNeo > 0.01) withT(CX, 1020, -0.02, kNeo, () => {
    pp(pR(-300, -70, 600, 140, 20), PR.navy, { key: 'neo_card', sb: 14, sy: 7, tex: 0.45 });
    txt('HIỆU ỨNG NEO', 0, -15, 46, PR.creamL, { align: 'center', weight: 800 });
    txt('(ANCHORING BIAS)', 0, 35, 24, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('HIỆU ỨNG NEO', { kicker: KICK });
  prChips();
};

SCENES.mechanism = () => {   // S3: Mỏ neo giữ kim đồng hồ gần mức giá đầu
  const tMoc = VW('mechanism', 'mốc').t0, tHop = VW('mechanism', 'hợp').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 4, 30, 'clk3');

  // Đồng hồ định giá với kim bị kéo lệch về 500k
  const needleVal = 0.82; // gần mức giá cao
  withT(CX, 680, 0, 1, () => {
    m11Dial(0, 0, needleVal, 'mech_dial');
  });

  // Chiếc mỏ neo cắm chặt giữ kim
  const kAnc = popS(E0 + 0.3);
  if (kAnc > 0.01) withT(CX + 140, 780, 0.12, kAnc, () => {
    m11Anchor(0, 0, 0.85, 'anc_mech');
  });

  // Hộp ghi chú giải thích
  withT(CX, 1100, 0, popS(tMoc), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'note_bg', sb: 12, sy: 6, tex: 0.4 });
    txt('GIÁ BAN ĐẦU TRỞ THÀNH MỐC SO SÁNH', 0, -15, 32, PR.navy, { align: 'center', weight: 800 });
    txt('Dù chưa chắc đã là mức giá hợp lý!', 0, 25, 28, TT >= tHop ? PR.red : PR.greyD, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tHop ? 'wow' : 'neutral', look: -30, key: 'b3' });
  prSign('BỊ HÚT VÀO MỐC BAN ĐẦU', { kicker: KICK });
  prChips();
};

SCENES.broaden = () => {   // S4: Xuất hiện 3 thẻ: Mua sắm, Thương lượng, Ước lượng
  const tShop = VW('broaden', 'sắm').t0, tNego = VW('broaden', 'thương').t0, tEst = VW('broaden', 'ước').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  const areas = [
    { title: 'MUA SẮM', sub: 'Giá gốc niêm yết', t: tShop, col: PR.red },
    { title: 'THƯƠNG LƯỢNG', sub: 'Mức giá đề xuất đầu', t: tNego, col: PR.orange },
    { title: 'ƯỚC LƯỢNG', sub: 'Các con số dự đoán', t: tEst, col: PR.navy }
  ];

  areas.forEach((a, i) => {
    const k = popS(a.t);
    if (k <= 0.01) return;
    const y = 620 + i * 180;
    withT(CX, y, i % 2 ? 0.015 : -0.015, k, () => {
      pp(pR(-380, -70, 760, 140, 18), PR.paperW, { key: 'area' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pR(-360, -50, 14, 100, 7), a.col, { shadow: false, tex: false });
      txt(a.title, -320, -10, 36, a.col, { base: 'middle', weight: 800 });
      txt(a.sub, -320, 28, 28, PR.char, { weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -20, key: 'b4' });
  prSign('XUẤT HIỆN Ở NHIỀU NƠI', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: So sánh chất lượng, nhu cầu + Thẻ "Đừng chỉ so với con số đầu tiên"
  const tAsk = VW('reframe', 'hỏi').t0, tFirst = VW('reframe', 'tiên').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // Câu hỏi phản tỉnh
  withT(CX, 620, 0, popS(E0 + 0.15), () => {
    pp(pR(-400, -100, 800, 200, 24), PR.paperW, { key: 'ref_q', sb: 14, sy: 7, tex: 0.4 });
    txt('NẾU CHƯA TỪNG NHÌN THẤY', 0, -45, 30, PR.greyD, { align: 'center', weight: 800 });
    txt('CON SỐ ĐẦU TIÊN...', 0, -5, 38, PR.red, { align: 'center', weight: 800 });
    txt('Mình sẽ đánh giá món này thế nào?', 0, 45, 32, PR.navy, { align: 'center', weight: 700 });
  });

  // 3 tiêu chí đánh giá độc lập
  const kAns = popS(tFirst);
  if (kAns > 0.01) withT(CX, 950, 0, kAns, () => {
    pp(pR(-380, -110, 760, 220, 20), '#eaf5ea', { key: 'eval_box', sb: 12, sy: 6, tex: 0.4 });
    txt('ĐÁNH GIÁ DỰA TRÊN:', 0, -70, 28, PR.green, { align: 'center', weight: 800 });
    txt('✓ Nhu cầu thật của bản thân', 0, -25, 32, PR.char, { align: 'center', weight: 700 });
    txt('✓ Chất lượng thực tế của sản phẩm', 0, 15, 32, PR.char, { align: 'center', weight: 700 });
    txt('✓ Mức giá trung bình thị trường', 0, 55, 32, PR.char, { align: 'center', weight: 700 });
  });

  // Thẻ chữ "Đừng chỉ so với con số đầu tiên"
  if (TT >= tFirst + 1.2) {
    prStamp('ĐỪNG CHỈ SO VỚI SỐ ĐẦU TIÊN', CX, 1140, PR.navy, tFirst + 1.2, { rot: -0.02, size: 36 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('ĐỪNG DÍNH VÀO MỎ NEO', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn từng mua đồ chỉ vì giảm giá sâu chưa?
  const tTell = VW('cta', 'sâu').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'BÌNH LUẬN CỦA BẠN', tTell, { hint: 'Kể trải nghiệm của bạn nhé…' });

  // 2 bình luận minh họa
  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.orange, PR.blue][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      pp(pR(-205, -30, 380 - i * 60, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
      pp(pR(-205, 10, 280 + i * 40, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN TỪNG BỊ DÍNH NEO CHƯA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'năm').t0 });
  cues.push({ k: 'pop', t: VW('hook', 'ba').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'hời').t0 });
  cues.push({ k: 'chime', t: VW('explain', 'neo').t0 });
  cues.push({ k: 'thud', t: VW('mechanism', 'mốc').t0 });
  cues.push({ k: 'pop', t: VW('broaden', 'sắm').t0 });
  cues.push({ k: 'pop', t: VW('broaden', 'thương').t0 });
  cues.push({ k: 'pop', t: VW('broaden', 'ước').t0 });
  cues.push({ k: 'tick', t: VW('reframe', 'hỏi').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'tiên').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'mua').t0 });
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
