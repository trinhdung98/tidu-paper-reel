// =====================================================================
//  TIDU MIND 13 — "Vì sao ta dễ phán xét người khác?"
//  Lỗi quy kết cơ bản (Fundamental Attribution Error) — Thiên kiến nhận thức.
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

// Helper: vẽ thẻ so sánh hai góc nhìn (Người khác vs Bản thân)
function m13CompareCard(cx, cy, s = 1, o = {}) {
  withT(cx, cy, 0, s, () => {
    // Thẻ Người khác (bên trái)
    pp(pR(-380, -180, 360, 360, 20), PR.paperW, { key: 'cp_left', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-380, -180, 360, 60, 20), PR.red, { shadow: false });
    txt('NGƯỜI KHÁC', -200, -145, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('Đến muộn', -200, -70, 32, PR.char, { align: 'center', weight: 700 });
    if (o.stampOther) {
      prStamp('DO TÍNH CÁCH', -200, 30, PR.red, o.stampOther, { rot: -0.05, size: 30 });
      txt('("Thiếu trách nhiệm")', -200, 100, 24, PR.greyD, { align: 'center', weight: 700 });
    }

    // Thẻ Bản thân (bên phải)
    pp(pR(20, -180, 360, 360, 20), PR.paperW, { key: 'cp_right', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(20, -180, 360, 60, 20), PR.green, { shadow: false });
    txt('CHÍNH BẠN', 200, -145, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('Đến muộn', 200, -70, 32, PR.char, { align: 'center', weight: 700 });
    if (o.stampSelf) {
      prStamp('DO HOÀN CẢNH', 200, 30, PR.green, o.stampSelf, { rot: 0.05, size: 30 });
      txt('("Do kẹt xe tắc đường")', 200, 100, 24, PR.greyD, { align: 'center', weight: 700 });
    }
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Hai nhân vật cùng đến muộn
  const tNguoi = VW('hook', 'nhiệm').t0, tBan = VW('hook', 'kẹt').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 8, 30, 'clk1'); // 8h30 muộn làm

  // Hai thẻ so sánh cùng đến muộn
  const kCard = popS(E0 + 0.15);
  if (kCard > 0.01) {
    m13CompareCard(CX, 750, kCard, {
      stampOther: tNguoi,
      stampSelf: tBan
    });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tBan ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('CÙNG ĐI MUỘN, NGHĨ KHÁC NHAU?', { kicker: KICK });
  prChips();
};

SCENES.bias = () => {   // S2: Lỗi quy kết cơ bản (Fundamental Attribution Error)
  const tLoi = VW('bias', 'lỗi').t0, tCo = VW('bias', 'bản').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Cán cân đánh giá bị lệch
  withT(CX, 620, 0, popS(E0 + 0.1), () => {
    pp(pR(-380, -90, 760, 180, 22), PR.paperW, { key: 'bias_box', sb: 14, sy: 7, tex: 0.4 });
    txt('KHI NHÌN NGƯỜI KHÁC:', 0, -40, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('ĐÁNH GIÁ QUÁ CAO TÍNH CÁCH', 0, 0, 36, PR.red, { align: 'center', weight: 800 });
    txt('XEM NHẸ HOÀN CẢNH BÊN NGOÀI', 0, 45, 30, PR.greyD, { align: 'center', weight: 700 });
  });

  // Tên khoa học
  const kLoi = popS(tLoi);
  if (kLoi > 0.01) withT(CX, 950, -0.02, kLoi, () => {
    pp(pR(-340, -70, 680, 140, 20), PR.navy, { key: 'fae_card', sb: 14, sy: 7, tex: 0.45 });
    txt('LỖI QUY KẾT CƠ BẢN', 0, -10, 46, PR.creamL, { align: 'center', weight: 800 });
    txt('(FUNDAMENTAL ATTRIBUTION ERROR)', 0, 35, 22, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('LỖI QUY KẾT CƠ BẢN', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // S3: Một hành động chưa đủ thông tin để hiểu nguyên nhân
  const tInfo = VW('reality', 'tin').t0, tWhy = VW('reality', 'nhân').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 5, 0, 'clk3');

  // Hình ảnh tảng băng / một phần nhỏ của câu chuyện
  withT(CX, 640, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -90, 760, 180, 20), PR.paperW, { key: 'real_box', sb: 12, sy: 6, tex: 0.4 });
    txt('MỘT HÀNH ĐỘNG DUY NHẤT...', 0, -35, 32, PR.greyD, { align: 'center', weight: 800 });
    txt('CHƯA ĐỦ ĐỂ KẾT LUẬN CON NGƯỜI!', 0, 20, 38, PR.red, { align: 'center', weight: 800 });
  });

  // Hộp câu hỏi nguyên nhân
  const kWhy = popS(tWhy);
  if (kWhy > 0.01) withT(CX, 960, 0, kWhy, () => {
    pp(pR(-340, -80, 680, 160, 20), '#f4f6fa', { key: 'why_box', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-240, 0, 46, 46), PR.orange, { shadow: false });
    txt('?', -240, 15, 52, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Có bao nhiêu yếu tố ẩn phía sau?', 40, -15, 30, PR.navy, { align: 'center', weight: 800 });
    txt('Gia đình, sức khỏe, biến cố bất ngờ...', 40, 25, 26, PR.char, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b3' });
  prSign('CHỈ LÀ MỘT PHẦN CÂU CHUYỆN', { kicker: KICK });
  prChips();
};

SCENES.example = () => {   // S4: Ví dụ người trả lời cộc lốc
  const tCoc = VW('example', 'lốc').t0, tMet = VW('example', 'mỏi').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  // Khung chat tin nhắn ngắn gọn "Ừ", "Ko"
  withT(CX, 580, 0, popS(E0 + 0.15), () => {
    pp(pR(-360, -70, 720, 140, 20), PR.paperW, { key: 'chat_box', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-320, -35, 120, 70, 16), PR.greyD, { shadow: false });
    txt('"Ừ."', -260, 5, 32, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('HỌ TRẢ LỜI CỘC LỐC?', 50, 5, 34, PR.char, { align: 'center', base: 'middle', weight: 800 });
  });

  // Các khả năng thực tế (Hoàn cảnh)
  const reasons = [
    { text: 'Đang chịu áp lực lớn / tức giận', col: PR.red },
    { text: 'Kiệt sức & mệt mỏi sau ngày dài', col: PR.orange },
    { text: 'Chưa quen phong cách giao tiếp', col: PR.blue }
  ];
  reasons.forEach((r, i) => {
    const k = popS(tCoc + i * 0.25);
    if (k <= 0.01) return;
    const y = 780 + i * 140;
    withT(CX, y, i % 2 ? 0.01 : -0.01, k, () => {
      pp(pR(-340, -50, 680, 100, 16), '#f0f4ea', { key: 'rea' + i, sb: 10, sy: 5, tex: 0.4 });
      pp(pR(-320, -30, 12, 60, 6), r.col, { shadow: false });
      txt(r.text, -280, 2, 30, PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'neutral', look: -20, key: 'b4' });
  prSign('ĐỪNG VỘI KẾT LUẬN TÍNH CÁCH', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Tấm nhãn phán xét thay bằng dấu hỏi "Có hoàn cảnh nào chưa biết?"
  const tKet = VW('reframe', 'kết').t0, tHoi = VW('reframe', 'hỏi').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // Câu hỏi phản tỉnh
  withT(CX, 640, 0, popS(E0 + 0.15), () => {
    pp(pR(-400, -110, 800, 220, 24), PR.paperW, { key: 'ref_box', sb: 14, sy: 7, tex: 0.4 });
    txt('TRƯỚC KHI PHÁN XÉT, HÃY TỰ HỎI:', 0, -50, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('"CÓ HOÀN CẢNH NÀO MÌNH CHƯA BIẾT KHÔNG?"', 0, 5, 34, PR.navy, { align: 'center', weight: 800 });
    txt('Chuyển từ chỉ trích sang thấu cảm', 0, 60, 26, PR.green, { align: 'center', weight: 700 });
  });

  // Thay nhãn phán xét bằng Dấu hỏi
  const kStamp = popS(tHoi);
  if (kStamp > 0.01) {
    prStamp('HỎI THÊM, PHÁN XÉT BỚT', CX, 1020, PR.green, tHoi, { rot: -0.02, size: 40 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('TẠM DỪNG ĐỂ THẤU CẢM', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn đã từng hiểu lầm ai đó vì chỉ nhìn một phần câu chuyện chưa?
  const tTell = VW('cta', 'chưa').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'GÓC NHÌN CỦA BẠN', tTell, { hint: 'Kể trải nghiệm hiểu lầm của bạn…' });

  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.plum, PR.orange][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      pp(pR(-205, -30, 380 - i * 60, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
      pp(pR(-205, 10, 280 + i * 40, 18, 9), PR.cream, { shadow: false, tex: 0.3 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN TỪNG HIỂU LẦM AI CHƯA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'nhiệm').t0 });
  cues.push({ k: 'pop', t: VW('hook', 'kẹt').t0 });
  cues.push({ k: 'chime', t: VW('bias', 'lỗi').t0 });
  cues.push({ k: 'pop', t: VW('reality', 'tin').t0 });
  cues.push({ k: 'pop', t: VW('example', 'lốc').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'hỏi').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'hiểu').t0 });
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

