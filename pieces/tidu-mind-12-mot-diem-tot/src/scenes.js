// =====================================================================
//  TIDU MIND 12 — "Một điểm tốt không có nghĩa mọi thứ đều tốt"
//  Hiệu ứng hào quang (Halo Effect) — Tâm lý xã hội.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · TÂM LÝ XÃ HỘI';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const GOLD = '#f5c542';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ vòng hào quang giấy (paper halo glow)
function m12Halo(cx, cy, r, alpha = 1) {
  if (alpha <= 0.01) return;
  ctx.save();
  // Vòng tia hào quang tỏa ra
  const n = 12;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    const r1 = r * 0.75, r2 = r * 1.25;
    ctx.strokeStyle = `rgba(255, 230, 110, ${0.45 * alpha})`;
    ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }
  // Vòng cung vàng sáng
  ctx.strokeStyle = `rgba(245, 197, 66, ${0.85 * alpha})`;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

// Helper: vẽ nhân vật thuyết trình
function m12Presenter(cx, cy, s = 1, haloFrac = 0, key = 'pres') {
  withT(cx, cy, 0, s, () => {
    // Hào quang nếu có
    if (haloFrac > 0.01) m12Halo(0, -180, 140, haloFrac);
    // Bục thuyết trình
    pp(pR(-150, 40, 300, 160, 12), PR.wood, { key: key + 'pod', sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-130, 60, 260, 12, 6), PR.woodD, { shadow: false });
    // Micro cổ ngỗng
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-60, 40); ctx.quadraticCurveTo(-70, -20, -30, -30); ctx.stroke();
    ctx.restore();
    pp(pE(-30, -30, 12, 12), PR.greyD, { shadow: false });

    // Thân áo vest lịch sự
    pp(pG([[-80, 40], [80, 40], [60, -110], [-60, -110]]), PR.navy, { key: key + 'suit', sb: 10, sy: 5, tex: 0.4 });
    pp(pG([[-20, -110], [0, -30], [20, -110]]), PR.paperW, { shadow: false });
    pp(pG([[-10, -80], [0, -10], [10, -80]]), PR.red, { shadow: false }); // Cà vạt
    // Khuôn mặt
    pp(pE(0, -170, 56, 60), '#f3d3b3', { key: key + 'face', sb: 10, sy: 5, tex: 0.4 });
    // Mắt tự tin & nụ cười
    pp(pE(-20, -175, 6, 6), PR.char, { shadow: false });
    pp(pE(20, -175, 6, 6), PR.char, { shadow: false });
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, -160, 16, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore();
    // Tóc
    pp(() => ctx.ellipse(0, -200, 62, 45, 0, Math.PI, TAU), PR.char, { shadow: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Nhân vật A thuyết trình rất tự tin
  const tTin = VW('hook', 'tin').t0, tGioi = VW('hook', 'giỏi').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 3, 0, 'clk1');

  // Nhân vật thuyết trình tự tin
  m12Presenter(CX, 950, 1.25, 0, 'pres1');

  // Bong bóng nói
  const kSay = popS(tTin);
  if (kSay > 0.01) withT(CX + 240, 620, 0.05, kSay, () => {
    pp(pR(-180, -60, 360, 120, 24), PR.paperW, { key: 'say_bg', sb: 12, sy: 6, tex: 0.4 });
    txt('TỰ TIN & LƯU LOÁT!', 0, 5, 32, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  if (TT >= tGioi) {
    prStamp('RẤT GIỎI?', CX, 1180, PR.red, tGioi, { rot: -0.05, size: 48 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tGioi ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('TỰ TIN CÓ BẰNG RẤT GIỎI?', { kicker: KICK });
  prChips();
};

SCENES.explain = () => {   // S2: Hào quang giấy xuất hiện + HIỆU ỨNG HÀO QUANG
  const tHalo = VW('explain', 'quang').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Nhân vật với vòng hào quang phát sáng
  const haloAlpha = ev(tHalo, 0.8);
  m12Presenter(CX, 920, 1.2, haloAlpha, 'pres2');

  // Thẻ giải thích
  withT(CX, 540, 0, popS(tHalo), () => {
    pp(pR(-320, -70, 640, 140, 22), PR.navy, { key: 'halo_card', sb: 14, sy: 7, tex: 0.45 });
    txt('HIỆU ỨNG HÀO QUANG', 0, -10, 48, GOLD, { align: 'center', weight: 800 });
    txt('(HALO EFFECT)', 0, 35, 24, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b2' });
  prSign('HIỆU ỨNG HÀO QUANG', { kicker: KICK });
  prChips();
};

SCENES.mechanism = () => {   // S3: Biểu tượng Thông minh, Đáng tin, Chuyên nghiệp xuất hiện cùng nhau
  const tTin = VW('mechanism', 'tin').t0, tNang = VW('mechanism', 'năng').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 4, 15, 'clk3');

  // Hộp ấn tượng nổi bật (Ví dụ: Ăn mặc chỉnh chu)
  withT(CX, 580, 0, popS(E0 + 0.1), () => {
    pp(pR(-360, -70, 720, 140, 20), '#fff5e0', { key: 'first_imp', sb: 12, sy: 6, tex: 0.4 });
    txt('ẤN TƯỢNG BAN ĐẦU: CHỈNH CHU, TỰ TIN', 0, 5, 32, PR.orange, { align: 'center', base: 'middle', weight: 800 });
  });

  // Mũi tên suy diễn kéo theo mọi thứ
  ctx.save(); ctx.strokeStyle = GOLD; ctx.lineWidth = 10; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(CX, 660); ctx.lineTo(CX, 720); ctx.stroke(); ctx.restore();

  // 3 thuộc tính bị tự động "khoác hào quang"
  const traits = [
    { name: 'THÔNG MINH?', col: PR.navy },
    { name: 'ĐÁNG TIN CẬY?', col: PR.green },
    { name: 'CHUYÊN NGHIỆP?', col: PR.plum }
  ];
  traits.forEach((tr, i) => {
    const k = popS(tTin + i * 0.25);
    if (k <= 0.01) return;
    const y = 740 + i * 135;
    withT(CX, y, i % 2 ? 0.015 : -0.015, k, () => {
      pp(pR(-340, -50, 680, 100, 18), PR.paperW, { key: 'trait' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pR(-320, -35, 16, 70, 8), tr.col, { shadow: false });
      txt(tr.name, -280, 5, 34, tr.col, { base: 'middle', weight: 800 });
      txt('Chưa có bằng chứng', 110, 5, 24, PR.greyD, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b3' });
  prSign('MỘT ĐIỂM SÁNG LÀM MỜ TẤT CẢ', { kicker: KICK });
  prChips();
};

SCENES.notice = () => {   // S4: Ấn tượng đầu tiên không nhất thiết sai, nhưng cần quan sát thêm
  const tSai = VW('notice', 'sai').t0, tQuan = VW('notice', 'quan').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  withT(CX, 650, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -90, 760, 180, 20), PR.paperW, { key: 'notice_box', sb: 12, sy: 6, tex: 0.4 });
    txt('ẤN TƯỢNG ĐẦU TIÊN CÓ THỂ ĐÚNG...', 0, -35, 30, PR.greyD, { align: 'center', weight: 800 });
    txt('NHƯNG CHƯA ĐỦ TOÀN DIỆN!', 0, 20, 38, PR.red, { align: 'center', weight: 800 });
  });

  // Kính lúp quan sát thêm
  const kGlass = popS(tQuan);
  if (kGlass > 0.01) withT(CX, 1000, 0, kGlass, () => {
    pp(pE(0, -30, 100, 100), 'rgba(255,255,255,0.85)', { key: 'lens', sb: 16, sy: 8, tex: 0.3 });
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(0, -30, 100, 0, TAU); ctx.stroke(); ctx.restore();
    // Cán kính
    ctx.save(); ctx.strokeStyle = PR.wood; ctx.lineWidth = 26; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(70, 40); ctx.lineTo(150, 120); ctx.stroke(); ctx.restore();
    txt('CẦN THỜI GIAN QUAN SÁT', 0, 170, 34, PR.creamL, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'happy', look: -20, key: 'b4' });
  prSign('HÃY QUAN SÁT THÊM', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Tách thành các thẻ độc lập: Tự tin / Kiến thức / Kết quả
  const tTach = VW('reframe', 'đánh').t0, tRieng = VW('reframe', 'riêng').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  const cards = [
    { name: 'SỰ TỰ TIN', desc: 'Thần thái & cách nói chuyện', col: PR.orange },
    { name: 'KIẾN THỨC', desc: 'Độ sâu & tính chính xác', col: PR.blue },
    { name: 'KẾT QUẢ CÔNG VIỆC', desc: 'Sản phẩm & hiệu quả thực tế', col: PR.green }
  ];

  cards.forEach((c, i) => {
    const k = popS(tTach + i * 0.2);
    if (k <= 0.01) return;
    const y = 580 + i * 190;
    withT(CX, y, i % 2 ? 0.015 : -0.015, k, () => {
      pp(pR(-380, -75, 760, 150, 18), PR.paperW, { key: 'card' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pR(-360, -55, 14, 110, 7), c.col, { shadow: false });
      txt(c.name, -320, -15, 36, c.col, { base: 'middle', weight: 800 });
      txt(c.desc, -320, 30, 28, PR.char, { weight: 700 });
      pp(pR(240, -40, 100, 80, 12), '#f0f4f8', { shadow: false });
      txt('ĐỘC LẬP', 290, 8, 20, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  if (TT >= tRieng) {
    prStamp('BẰNG CHỨNG RIÊNG BIỆT', CX, 1200, PR.navy, tRieng, { rot: -0.02, size: 38 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('ĐÁNH GIÁ TỪNG THỨ ĐỘC LẬP', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn từng thay đổi ấn tượng sau khi hiểu họ hơn chưa?
  const tTell = VW('cta', 'hơn').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'GÓC CHIA SẺ', tTell, { hint: 'Bạn từng thay đổi ấn tượng chưa?…' });

  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.green, PR.orange][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      pp(pR(-205, -30, 380 - i * 60, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
      pp(pR(-205, 10, 280 + i * 40, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN TỪNG BỊ HÀO QUANG ĐÁNH LỪA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'tin').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'giỏi').t0 });
  cues.push({ k: 'chime', t: VW('explain', 'quang').t0 });
  cues.push({ k: 'pop', t: VW('mechanism', 'tin').t0 });
  cues.push({ k: 'pop', t: VW('mechanism', 'năng').t0 });
  cues.push({ k: 'tick', t: VW('notice', 'quan').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'riêng').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'ấn').t0 });
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
