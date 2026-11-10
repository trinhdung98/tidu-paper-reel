// =====================================================================
//  TIDU MIND 15 — "Lắng nghe không có nghĩa là phải đồng ý"
//  Kỹ năng lắng nghe thấu cảm & Giao tiếp trắc ẩn.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · GIAO TIẾP';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ tai nghe giấy (headphones / listen icon)
function m15Headphones(cx, cy, s = 1, key = 'hp') {
  withT(cx, cy, 0, s, () => {
    // Vòng cung qua đầu
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 18; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, 110, Math.PI, 0); ctx.stroke(); ctx.restore();
    // 2 ốp tai
    pp(pR(-130, -30, 40, 80, 20), PR.orange, { key: key + 'earL', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(90, -30, 40, 80, 20), PR.orange, { key: key + 'earR', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-110, 10, 12, 28), PR.creamL, { shadow: false });
    pp(pE(110, 10, 12, 28), PR.creamL, { shadow: false });
  });
}

// Helper: vẽ 2 vòng tròn Venn giao nhau (Circle overlap)
function m15Venn(cx, cy, frac = 1, key = 'venn') {
  withT(cx, cy, 0, 1, () => {
    // Vòng A: Quan điểm của bạn
    pp(pE(-110, 0, 170, 170), 'rgba(74, 144, 226, 0.65)', { key: key + 'vA', sb: 14, sy: 7, tex: 0.4 });
    txt('GÓC NHÌN', -170, -20, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('CỦA BẠN', -170, 20, 28, PR.creamL, { align: 'center', weight: 800 });

    // Vòng B: Quan điểm người khác
    pp(pE(110, 0, 170, 170), 'rgba(224, 86, 74, 0.65)', { key: key + 'vB', sb: 14, sy: 7, tex: 0.4 });
    txt('GÓC NHÌN', 170, -20, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('ĐỐI PHƯƠNG', 170, 20, 28, PR.creamL, { align: 'center', weight: 800 });

    // Phần giao nhau ở giữa: Thấu hiểu chung
    if (frac > 0.01) {
      txt('THẤU HIỂU', 0, -10, 26, '#fff4cc', { align: 'center', weight: 800 });
      txt('CHUNG', 0, 25, 24, '#fff4cc', { align: 'center', weight: 800 });
    }
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Đối diện chưa nói xong, ta đã chuẩn bị tên phản bác
  const tChua = VW('hook', 'xong').t0, tPhan = VW('hook', 'biện').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 1, 30, 'clk1');

  // Bong bóng người đối diện đang nói
  withT(CX - 160, 650, -0.04, popS(E0 + 0.1), () => {
    pp(pR(-180, -60, 360, 120, 24), PR.paperW, { key: 'sp_other', sb: 12, sy: 6, tex: 0.4 });
    txt('ĐANG NÓI DỞ...', 0, 5, 32, PR.char, { align: 'center', base: 'middle', weight: 800 });
  });

  // Hàng loạt mũi tên phản bác chĩa lại
  const kArrow = popS(tPhan);
  if (kArrow > 0.01) {
    [0, 1, 2].forEach((i) => {
      withT(CX + 140, 600 + i * 80, 0, kArrow, () => {
        pp(pR(-80, -12, 140, 24, 6), PR.red, { shadow: false });
        pp(pG([[-100, 0], [-70, -26], [-70, 26]]), PR.red, { shadow: false });
      });
    });
    txt('CHUẨN BỊ PHẢN BÁC!', CX + 200, 880, 30, PR.red, { align: 'center', weight: 800 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tPhan ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('CHƯA NGHE ĐÃ MUỐN PHẢN BIỆN?', { kicker: KICK });
  prChips();
};

SCENES.nature = () => {   // S2: Cuộc trò chuyện không phải là thắng - thua
  const tThang = VW('nature', 'thắng').t0, tThua = VW('nature', 'thua').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  withT(CX, 620, 0, popS(E0 + 0.1), () => {
    pp(pR(-380, -90, 760, 180, 22), PR.paperW, { key: 'nat_box', sb: 14, sy: 7, tex: 0.4 });
    txt('BẢN NĂNG MUỐN BẢO VỆ QUAN ĐIỂM...', 0, -35, 30, PR.greyD, { align: 'center', weight: 800 });
    txt('NHƯNG TRÒ CHUYỆN KHÔNG PHẢI ĐẤU VÕ!', 0, 20, 36, PR.red, { align: 'center', weight: 800 });
  });

  // Hộp gạch bỏ Thắng vs Thua
  const kWin = popS(tThang);
  if (kWin > 0.01) withT(CX, 950, 0, kWin, () => {
    pp(pR(-340, -80, 680, 160, 20), PR.navy, { key: 'no_win', sb: 12, sy: 6, tex: 0.45 });
    txt('KHÔNG CẦN CÓ NGƯỜI THẮNG VÀ THUA', 0, 0, 34, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('KHÔNG PHẢI CUỘC THẮNG THUA', { kicker: KICK });
  prChips();
};

SCENES.principle = () => {   // S3: Hiểu ý người khác mà vẫn không đồng tình + Tai nghe
  const tHieu = VW('principle', 'hiểu').t0, tDong = VW('principle', 'tình').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 2, 0, 'clk3');

  // Biểu tượng tai nghe lắng nghe
  const kHp = popS(E0 + 0.15);
  if (kHp > 0.01) {
    m15Headphones(CX, 620, kHp * 1.1, 'hp_scene');
  }

  // Khẳng định nguyên tắc vàng
  withT(CX, 960, 0, popS(tHieu), () => {
    pp(pR(-380, -90, 760, 180, 20), '#eaf5ea', { key: 'pri_box', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-380, -90, 20, 180, 10), PR.green, { shadow: false });
    txt('NGUYÊN TẮC QUAN TRỌNG:', -330, -45, 26, PR.green, { weight: 800 });
    txt('BẠN CÓ THỂ HIỂU Ý NGƯỜI KHÁC', 0, -5, 34, PR.navy, { align: 'center', weight: 800 });
    txt('MÀ KHÔNG NHẤT THIẾT PHẢI ĐỒNG TÌNH!', 0, 45, 32, PR.char, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'happy', look: -20, key: 'b3' });
  prSign('LẮNG NGHE KHÁC VỚI ĐỒNG Ý', { kicker: KICK });
  prChips();
};

SCENES.action = () => {   // S4: 3 việc cần làm: Để họ nói hết -> Nhắc lại -> Đưa góc nhìn
  const tHet = VW('action', 'hết').t0, tXac = VW('action', 'hạn').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  const steps = [
    { num: '1', name: 'ĐỂ HỌ NÓI HẾT', desc: 'Không ngắt lời, hạ vũ khí phản bác' },
    { num: '2', name: 'NHẮC LẠI ĐIỀU MÌNH HIỂU', desc: '"Nếu mình hiểu đúng, bạn đang lo về..."' },
    { num: '3', name: 'ĐƯA GÓC NHÌN BẢN THÂN', desc: 'Sau khi đối phương cảm thấy đã được nghe' }
  ];

  steps.forEach((st, i) => {
    const k = popS(tHet + i * 0.25);
    if (k <= 0.01) return;
    const y = 580 + i * 180;
    withT(CX, y, i % 2 ? 0.01 : -0.01, k, () => {
      pp(pR(-380, -70, 760, 140, 18), PR.paperW, { key: 'act' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-310, 0, 36, 36), PR.blue, { shadow: false });
      txt(st.num, -310, 10, 36, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt(st.name, -250, -12, 32, PR.navy, { base: 'middle', weight: 800 });
      txt(st.desc, -250, 28, 26, PR.greyD, { weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b4' });
  prSign('3 BƯỚC LẮNG NGHE CHỦ ĐỘNG', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Hai hình tròn Venn giao nhau + Xác nhận hơn phản bác
  const tXacNhan = VW('reframe', 'xác').t0, tSom = VW('reframe', 'sớm').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // Sơ đồ Venn 2 góc nhìn giao nhau
  const kVenn = popS(E0 + 0.15);
  if (kVenn > 0.01) {
    m15Venn(CX, 680, ev(tXacNhan, 0.8), 'venn_s5');
  }

  // Câu chốt
  withT(CX, 1040, 0, popS(tXacNhan), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'sum_box', sb: 12, sy: 6, tex: 0.4 });
    txt('MỘT CÂU HỎI XÁC NHẬN', 0, -15, 34, PR.green, { align: 'center', weight: 800 });
    txt('HỮU ÍCH HƠN VIỆC PHẢN BÁC QUÁ SỚM!', 0, 25, 30, PR.navy, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('XÁC NHẬN TRƯỚC, PHẢN HỒI SAU', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Lưu lại 3 bước: Nghe hết – Xác nhận – Phản hồi
  const tTell = VW('cta', 'bước').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  // Thẻ lưu lại 3 bước
  withT(CX, 680, 0, popS(E0 + 0.2), () => {
    pp(pR(-380, -120, 760, 240, 24), PR.paperW, { key: 'save_box', sb: 14, sy: 7, tex: 0.45 });
    txt('LƯU LẠI 3 BƯỚC VÀNG:', 0, -70, 32, PR.red, { align: 'center', weight: 800 });
    txt('1. NGHE HẾT', 0, -20, 34, PR.navy, { align: 'center', weight: 800 });
    txt('2. XÁC NHẬN', 0, 25, 34, PR.green, { align: 'center', weight: 800 });
    txt('3. PHẢN HỒI', 0, 70, 34, PR.orange, { align: 'center', weight: 800 });
  });

  prCommentBox(CX, 1020, 'LƯU LẠI BÀI HỌC', tTell, { hint: 'Lưu video để áp dụng nhé…' });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('NGHE HẾT · XÁC NHẬN · PHẢN HỒI', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'biện').t0 });
  cues.push({ k: 'pop', t: VW('nature', 'thắng').t0 });
  cues.push({ k: 'chime', t: VW('principle', 'hiểu').t0 });
  cues.push({ k: 'pop', t: VW('action', 'hết').t0 });
  cues.push({ k: 'tick', t: VW('reframe', 'xác').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'bước').t0 });
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

