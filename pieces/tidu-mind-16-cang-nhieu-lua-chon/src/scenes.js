// =====================================================================
//  TIDU MIND 16 — "Càng nhiều lựa chọn, tại sao càng khó quyết định?"
//  Nghịch lý lựa chọn (Paradox of Choice) — Tâm lý ra quyết định.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · QUYẾT ĐỊNH';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ thực đơn cuộn dài vô tận (cascading menu)
function m16MenuCascade(cx, cy, s = 1, key = 'menu') {
  withT(cx, cy, 0, s, () => {
    // 4 thẻ món ăn xếp chồng lớp lớp
    const dishes = ['Cơm tấm sườn', 'Bún chả Hà Nội', 'Pizza hải sản', 'Sushi cá hồi'];
    dishes.forEach((d, i) => {
      withT(0, (i - 1.5) * 110, (i % 2 ? 0.03 : -0.03), 1, () => {
        pp(pR(-280, -45, 560, 90, 16), PR.paperW, { key: key + 'd' + i, sb: 10, sy: 5, tex: 0.4 });
        pp(pE(-230, 0, 26, 26), [PR.orange, PR.red, PR.blue, PR.green][i], { shadow: false });
        txt(d, -180, 2, 30, PR.char, { base: 'middle', weight: 800 });
        txt('⭐ 4.8 · 30 phút', 130, 2, 22, PR.greyD, { base: 'middle', weight: 700 });
      });
    });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Mở app đồ ăn hàng trăm món -> không biết chọn gì
  const tApp = VW('hook', 'ăn').t0, tTram = VW('hook', 'trăm').t0, tKo = VW('hook', 'gì').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 12, 0, 'clk1');

  // Menu xếp chồng dài
  const kMenu = popS(E0 + 0.15);
  if (kMenu > 0.01) {
    m16MenuCascade(CX, 750, kMenu * 1.05, 'menu1');
  }

  // Stamp không biết chọn gì
  if (TT >= tKo) {
    prStamp('CHẲNG BIẾT CHỌN GÌ?', CX, 1160, PR.red, tKo, { rot: -0.06, size: 44 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tKo ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('HÀNG TRĂM MÓN, KHÔNG BIẾT CHỌN GÌ?', { kicker: KICK });
  prChips();
};

SCENES.paradox = () => {   // S2: Nghịch lý lựa chọn (Paradox of Choice)
  const tTuDo = VW('paradox', 'do').t0, tKho = VW('paradox', 'khăn').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  withT(CX, 620, 0, popS(E0 + 0.1), () => {
    pp(pR(-380, -90, 760, 180, 22), PR.paperW, { key: 'para_box', sb: 14, sy: 7, tex: 0.4 });
    txt('NHIỀU LỰA CHỌN = TỰ DO?', 0, -35, 30, PR.greyD, { align: 'center', weight: 800 });
    txt('NHƯNG LẠI KHIẾN BẠN BẾ TẮC!', 0, 20, 38, PR.red, { align: 'center', weight: 800 });
  });

  const kCard = popS(tKho);
  if (kCard > 0.01) withT(CX, 960, -0.02, kCard, () => {
    pp(pR(-340, -70, 680, 140, 20), PR.navy, { key: 'paradox_tag', sb: 14, sy: 7, tex: 0.45 });
    txt('NGHỊCH LÝ LỰA CHỌN', 0, -10, 46, PR.creamL, { align: 'center', weight: 800 });
    txt('(PARADOX OF CHOICE)', 0, 35, 22, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('NGHỊCH LÝ LỰA CHỌN', { kicker: KICK });
  prChips();
};

SCENES.reaction = () => {   // S3: Liên tục so sánh, sợ bỏ lỡ (FOMO), trì hoãn việc chốt
  const tSo = VW('reaction', 'sánh').t0, tLo = VW('reaction', 'lỡ').t0, tChot = VW('reaction', 'chốt').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 12, 30, 'clk3');

  const traps = [
    { title: 'LIÊN TỤC SO SÁNH', sub: 'Món nào ngon hơn? Quán nào rẻ hơn?' },
    { title: 'NỖI SỢ BỎ LỠ (FOMO)', sub: 'Sợ chọn món này rồi sẽ tiếc món kia' },
    { title: 'TÊ LIỆT QUYẾT ĐỊNH', sub: 'Lướt 30 phút vẫn chưa bấm đặt hàng' }
  ];

  traps.forEach((tr, i) => {
    const k = popS(tSo + i * 0.25);
    if (k <= 0.01) return;
    const y = 600 + i * 180;
    withT(CX, y, i % 2 ? 0.015 : -0.015, k, () => {
      pp(pR(-380, -70, 760, 140, 18), PR.paperW, { key: 'trap' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pR(-360, -50, 14, 100, 7), PR.red, { shadow: false });
      txt(tr.title, -320, -12, 34, PR.red, { base: 'middle', weight: 800 });
      txt(tr.sub, -320, 28, 26, PR.char, { weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b3' });
  prSign('BẪY SO SÁNH VÔ TẬN', { kicker: KICK });
  prChips();
};

SCENES.criteria = () => {   // S4: Giải pháp: Xác định 3 tiêu chí quan trọng nhất trước khi tìm
  const tTieuChi = VW('criteria', 'tiêu').t0, tLoc = VW('criteria', 'loại').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  withT(CX, 600, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -80, 760, 160, 20), PR.paperW, { key: 'crit_box', sb: 12, sy: 6, tex: 0.4 });
    txt('GIẢI PHÁP: THIẾT LẬP 3 TIÊU CHÍ TRƯỚC', 0, -25, 30, PR.green, { align: 'center', weight: 800 });
    txt('Không lướt tìm kiếm khi chưa có bộ lọc!', 0, 25, 28, PR.char, { align: 'center', weight: 700 });
  });

  const filters = [
    { name: '1. NGÂN SÁCH', val: 'Tối đa 60.000đ', col: PR.orange },
    { name: '2. THỜI GIAN', val: 'Giao dưới 25 phút', col: PR.blue },
    { name: '3. KHẨU VỊ HÔM NAY', val: 'Cơm hoặc mì nước nóng', col: PR.green }
  ];

  filters.forEach((f, i) => {
    const k = popS(tTieuChi + i * 0.25);
    if (k <= 0.01) return;
    const y = 800 + i * 140;
    withT(CX, y, i % 2 ? 0.01 : -0.01, k, () => {
      pp(pR(-360, -50, 720, 100, 16), '#f0f4ea', { key: 'f' + i, sb: 10, sy: 5, tex: 0.4 });
      txt(f.name, -320, 2, 30, f.col, { base: 'middle', weight: 800 });
      txt(f.val, 100, 2, 28, PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b4' });
  prSign('BỘ LỌC 3 TIÊU CHÍ', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Chỉ còn 3 lựa chọn trên bàn -> Biết mình đang tìm gì
  const tBa = VW('reframe', 'xem').t0, tTim = VW('reframe', 'tìm').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // 3 thẻ lựa chọn cuối cùng
  const final3 = ['Món A', 'Món B', 'Món C'];
  final3.forEach((m, i) => {
    withT(CX - 240 + i * 240, 680, (i - 1) * 0.03, popS(E0 + 0.15 + i * 0.15), () => {
      pp(pR(-100, -120, 200, 240, 18), PR.paperW, { key: 'fin' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(0, -30, 36, 36), [PR.orange, PR.green, PR.blue][i], { shadow: false });
      txt(m, 0, 50, 32, PR.char, { align: 'center', weight: 800 });
      txt('Đạt tiêu chí', 0, 85, 20, PR.green, { align: 'center', weight: 700 });
    });
  });

  // Thông điệp kết
  withT(CX, 1020, 0, popS(tTim), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'sum_box16', sb: 12, sy: 6, tex: 0.4 });
    txt('QUYẾT ĐỊNH TỐT KHÔNG PHẢI XEM THÊM,', 0, -15, 30, PR.navy, { align: 'center', weight: 800 });
    txt('MÀ LÀ BIẾT RÕ MÌNH ĐANG TÌM ĐIỀU GÌ!', 0, 25, 32, PR.red, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('CHỌN ÍT MÀ CHẤT LƯỢNG', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn thuộc nhóm quyết định nhanh hay suy nghĩ rất lâu?
  const tTell = VW('cta', 'chọn').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'PHONG CÁCH CỦA BẠN', tTell, { hint: 'Bạn quyết định nhanh hay chậm?…' });

  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.green, PR.red][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      txt(['Chốt trong 2 phút ⚡', 'Nghĩ 40 phút chưa xong 😅'][i], -210, 8, 30, PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN CHỌN NHANH HAY CHẬM?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'trăm').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'gì').t0 });
  cues.push({ k: 'chime', t: VW('paradox', 'do').t0 });
  cues.push({ k: 'thud', t: VW('reaction', 'chốt').t0 });
  cues.push({ k: 'pop', t: VW('criteria', 'tiêu').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'tìm').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'nhanh').t0 });
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

