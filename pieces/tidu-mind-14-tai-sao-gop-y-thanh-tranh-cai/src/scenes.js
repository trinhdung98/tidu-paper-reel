// =====================================================================
//  TIDU MIND 14 — "Tại sao góp ý dễ biến thành tranh cãi?"
//  Giao tiếp bất bạo động & Kỹ năng phản hồi xây dựng.
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

// Helper: vẽ tấm khiên giấy (paper shield)
function m14Shield(cx, cy, s = 1, key = 'shld') {
  withT(cx, cy, 0, s, () => {
    // Thân khiên kim loại/giấy dày
    pp(pG([[-100, -140], [100, -140], [100, 30], [0, 150], [-100, 30]]), PR.blue, { key: key + 'body', sb: 16, sy: 8, tex: 0.45 });
    pp(pG([[-80, -120], [80, -120], [80, 20], [0, 130], [-80, 20]]), '#6898c8', { shadow: false, tex: 0.3 });
    // Chữ thập / biểu tượng phòng thủ
    pp(pR(-16, -90, 32, 160, 8), PR.creamL, { shadow: false });
    pp(pR(-60, -30, 120, 32, 8), PR.creamL, { shadow: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Nhân vật A nói "Bạn làm sai rồi!" -> Dựng khiên
  const tSai = VW('hook', 'giúp').t0, tCai = VW('hook', 'vã').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 10, 15, 'clk1');

  // Bong bóng công kích
  withT(CX - 180, 680, -0.04, popS(E0 + 0.1), () => {
    pp(pR(-180, -60, 360, 120, 24), PR.red, { key: 'atk_b', sb: 12, sy: 6, tex: 0.4 });
    txt('"BẠN LÀM SAI RỒI!"', 0, 5, 34, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  // Tấm khiên dựng lên chống đỡ
  const kShield = popS(tCai);
  if (kShield > 0.01) {
    m14Shield(CX + 200, 800, kShield * 1.1, 'shld1');
  }

  if (TT >= tCai + 0.5) {
    prStamp('PHÒNG THỦ & TRANH CÃI', CX, 1160, PR.red, tCai + 0.5, { rot: -0.04, size: 42 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tCai ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('TẠI SAO BIẾN THÀNH TRANH CÃI?', { kicker: KICK });
  prChips();
};

SCENES.cause = () => {   // S2: Vấn đề ở cách truyền đạt
  const tNoiDung = VW('cause', 'dung').t0, tTruyen = VW('cause', 'đạt').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  withT(CX, 620, 0, popS(E0 + 0.1), () => {
    pp(pR(-380, -90, 760, 180, 22), PR.paperW, { key: 'cause_box', sb: 14, sy: 7, tex: 0.4 });
    txt('VẤN ĐỀ KHÔNG CHỈ Ở NỘI DUNG GÓP Ý', 0, -35, 30, PR.greyD, { align: 'center', weight: 800 });
    txt('MÀ Ở CÁCH BẠN TRUYỀN ĐẠT!', 0, 20, 42, PR.red, { align: 'center', weight: 800 });
  });

  // Cán cân thông điệp
  withT(CX, 980, 0, popS(tTruyen), () => {
    pp(pR(-340, -80, 680, 160, 20), PR.navy, { key: 'intro_comp', sb: 12, sy: 6, tex: 0.45 });
    txt('SO SÁNH 2 CÁCH NÓI SAU ĐÂY:', 0, 0, 36, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('CÁCH NÓI QUYẾT ĐỊNH KẾT QUẢ', { kicker: KICK });
  prChips();
};

SCENES.compare = () => {   // S3: So sánh Câu 1 (Công kích con người) vs Câu 2 (Nêu sự việc cụ thể)
  const tCau1 = VW('compare', 'nhiệm').t0, tCau2 = VW('compare', 'đợi').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 11, 0, 'clk3');

  // Câu 1: Công kích con người
  withT(CX, 620, -0.015, popS(E0 + 0.1), () => {
    pp(pR(-380, -90, 760, 180, 20), '#ffe8e8', { key: 'c1_bg', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-380, -90, 20, 180, 10), PR.red, { shadow: false });
    txt('❌ CÁCH 1: ĐÁNH GIÁ TOÀN BỘ CON NGƯỜI', -330, -45, 26, PR.red, { weight: 800 });
    txt('"Bạn lúc nào cũng thiếu trách nhiệm!"', 0, 20, 34, PR.char, { align: 'center', weight: 800 });
  });

  // Câu 2: Nêu sự việc & tác động cụ thể
  const kC2 = popS(tCau2);
  if (kC2 > 0.01) withT(CX, 950, 0.015, kC2, () => {
    pp(pR(-380, -110, 760, 220, 20), '#eaf5ea', { key: 'c2_bg', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-380, -110, 20, 220, 10), PR.green, { shadow: false });
    txt('✓ CÁCH 2: HÀNH VI CỤ THỂ & TÁC ĐỘNG', -330, -65, 26, PR.green, { weight: 800 });
    txt('"Hai lần gần đây bạn gửi báo cáo trễ,', 0, -15, 32, PR.char, { align: 'center', weight: 800 });
    txt('khiến cả nhóm phải chờ đợi."', 0, 35, 32, PR.char, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tCau2 ? 'happy' : 'neutral', look: -30, key: 'b3' });
  prSign('CÔNG KÍCH HAY NÊU SỰ THẬT?', { kicker: KICK });
  prChips();
};

SCENES.impact = () => {   // S4: Câu thứ hai nói rõ hành vi & tác động thay vì đánh giá
  const tHanhVi = VW('impact', 'hành').t0, tNguoi = VW('impact', 'người').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  withT(CX, 620, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -90, 760, 180, 20), PR.paperW, { key: 'imp_box', sb: 12, sy: 6, tex: 0.4 });
    txt('CÂU THỨ HAI TẬP TRUNG VÀO:', 0, -35, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('HÀNH VI CỤ THỂ + TÁC ĐỘNG THỰC TẾ', 0, 20, 36, PR.green, { align: 'center', weight: 800 });
  });

  // Tấm bản kế hoạch chung
  withT(CX, 960, 0, popS(tHanhVi), () => {
    pp(pR(-320, -100, 640, 200, 16), PR.paperW, { key: 'plan_paper', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-300, -80, 600, 40, 8), PR.navy, { shadow: false });
    txt('BẢN KẾ HOẠCH CÙNG GIẢI QUYẾT', 0, -60, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('• Tách hành vi khỏi nhân phẩm', 0, -10, 28, PR.char, { align: 'center', weight: 700 });
    txt('• Tập trung vào cải thiện công việc', 0, 30, 28, PR.char, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b4' });
  prSign('TÁCH HÀNH VI KHỎI CON NGƯỜI', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: 3 bước góp ý: Nêu sự việc + Mô tả ảnh hưởng + Cùng tìm giải pháp
  const tNeu = VW('reframe', 'nêu').t0, tPhap = VW('reframe', 'pháp').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  const steps = [
    { num: '1', title: 'NÊU SỰ VIỆC CỤ THỂ', desc: 'Không dùng từ "luôn luôn", "lúc nào cũng"' },
    { num: '2', title: 'MÔ TẢ ẢNH HƯỞNG', desc: 'Cho thấy tác động lên công việc/nhóm' },
    { num: '3', title: 'CÙNG TÌM GIẢI PHÁP', desc: 'Hợp tác thay vì phán xét một chiều' }
  ];

  steps.forEach((st, i) => {
    const k = popS(tNeu + i * 0.25);
    if (k <= 0.01) return;
    const y = 580 + i * 180;
    withT(CX, y, i % 2 ? 0.01 : -0.01, k, () => {
      pp(pR(-380, -70, 760, 140, 18), PR.paperW, { key: 'step' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-310, 0, 36, 36), PR.green, { shadow: false });
      txt(st.num, -310, 10, 36, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt(st.title, -250, -12, 32, PR.navy, { base: 'middle', weight: 800 });
      txt(st.desc, -250, 28, 26, PR.greyD, { weight: 700 });
    });
  });

  if (TT >= tPhap) {
    prStamp('THẲNG THẮN MÀ KHÔNG CÔNG KÍCH', CX, 1180, PR.navy, tPhap, { rot: -0.02, size: 34 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('3 BƯỚC GÓP Ý XÂY DỰNG', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn thích góp ý trực tiếp hay cần thời gian suy nghĩ?
  const tTell = VW('cta', 'nghĩ').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'PHONG CÁCH CỦA BẠN', tTell, { hint: 'Bạn thích nhận góp ý thế nào?…' });

  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.blue, PR.mustard][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      pp(pR(-205, -30, 380 - i * 60, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
      pp(pR(-205, 10, 280 + i * 40, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN THÍCH ĐƯỢC GÓP Ý THẾ NÀO?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'vã').t0 });
  cues.push({ k: 'pop', t: VW('cause', 'đạt').t0 });
  cues.push({ k: 'thud', t: VW('compare', 'nhiệm').t0 });
  cues.push({ k: 'chime', t: VW('compare', 'đợi').t0 });
  cues.push({ k: 'pop', t: VW('impact', 'hành').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'pháp').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'thích').t0 });
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

