// =====================================================================
//  TIDU TECH 02 — "Tại sao AI có thể nói sai rất tự tin?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: AI hallucination, LLM next-token prediction, fact verification.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · AI GIẢI THÍCH';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 02 HELPERS (t2 prefix to avoid clashes) ----

function t2Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Chat prompt and response interface
function t2Chat(cx, cy, o = {}) {
  withT(cx, cy, 0, 1, () => {
    // User prompt bubble (Top Right)
    const uw = 560, uh = 90;
    pp(pR(100 - uw / 2, -180, uw, uh, 18), PR.techK, { key: 't2_user', sb: 12, sy: 6, tex: 0.4 });
    txt('Hãy kể tên 3 cuốn sách khoa học năm 1892', 100, -125, 20, PR.creamL, { align: 'center', weight: 700 });

    // AI response bubble (Lower Center)
    const aw = 740, ah = 360;
    pp(pR(-aw / 2, -60, aw, ah, 22), PR.creamL, { key: 't2_ai', sb: 18, sy: 9, tex: 0.5 });
    // AI Header bar
    pp(pR(-aw / 2, -60, aw, 56, 22), '#0e1d2d', { key: 't2_aihd', shadow: false, tex: 0.3 });
    pp(pR(-aw / 2, -20, aw, 16, 0), '#0e1d2d', { shadow: false, tex: false });
    sparkIcon(-aw / 2 + 36, -32, 16, PR.glow, 0.2);
    txt('TRỢ LÝ AI (TỰ TIN TRẢ LỜI)', -aw / 2 + 68, -25, 20, PR.glow, { weight: 800 });

    // AI Generated Text
    txt('Dưới đây là 3 cuốn sách nổi tiếng xuất bản năm 1892:', -aw / 2 + 36, 25, 21, PR.char, { weight: 700 });
    txt('1. "Bí Mật Vũ Trụ & Thời Gian" — GS. John Nam', -aw / 2 + 40, 68, 20, PR.navy, { weight: 800 });
    txt('2. "Cơ Học Sóng Lượng Tử Cổ Điển" (NXB Oxford)', -aw / 2 + 40, 110, 20, PR.navy, { weight: 800 });
    txt('3. "Lịch Sử Thần Kinh Học Hiện Đại" — TS. Clara', -aw / 2 + 40, 152, 20, PR.navy, { weight: 800 });

    // Status indicator
    if (o.isWrong) {
      // Red stamp & question badge
      pp(pR(-aw / 2 + 30, 205, aw - 60, 60, 12), PR.red, { key: 't2_errbar', sb: 8, sy: 4, tex: 0.4 });
      txt('TẤT CẢ CUỐN SÁCH TRÊN ĐỀU KHÔNG TỒN TẠI!', 0, 243, 21, PR.creamL, { align: 'center', weight: 800 });
    } else {
      pp(pR(-aw / 2 + 30, 205, aw - 60, 60, 12), '#183828', { key: 't2_okbar', shadow: false, tex: 0.3 });
      txt('Câu trả lời cực kỳ mượt mà & thuyết phục', 0, 243, 21, PR.green, { align: 'center', weight: 800 });
    }
  });
}

// Token word chips assembling
function t2TokenStream(cx, cy, t0) {
  withT(cx, cy, 0, 1, () => {
    const tokens = [
      ['Mô hình', PR.blue, 0],
      ['ngôn ngữ', PR.techL, 0.2],
      ['dự đoán', PR.mustard, 0.4],
      ['từ tiếp theo', PR.green, 0.6],
    ];

    txt('CƠ CHẾ: GHÉP TỪ DỰA TRÊN XÁC SUẤT', 0, -160, 26, PR.glow, { align: 'center', weight: 800 });

    tokens.forEach(([tok, col, dt], i) => {
      const k = popS(t0 + dt);
      if (k <= 0.01) return;
      const ty = -70 + i * 85;
      withT(0, ty, 0, k, () => {
        // Token card
        pp(pR(-280, -32, 560, 66, 14), PR.creamL, { key: 'tok_' + i, sb: 10, sy: 5, tex: 0.45 });
        pp(pR(-280, -32, 50, 66, 14), col, { shadow: false, tex: 0.3 });
        pp(pR(-250, -32, 20, 66, 0), col, { shadow: false, tex: false });
        txt(String(i + 1), -255, 10, 24, PR.creamL, { align: 'center', weight: 800 });

        txt(tok, -200, 10, 28, PR.navy, { weight: 800 });

        // Probability badge
        const probs = ['P = 98.4%', 'P = 94.2%', 'P = 91.8%', 'P = 89.6%'];
        pp(pR(130, -22, 130, 44, 8), '#0e1d2d', { shadow: false, tex: 0.3 });
        txt(probs[i], 195, 8, 18, PR.glow, { align: 'center', weight: 800, font: F_MONO });
      });
    });

    txt('Học từ hàng tỷ mẫu văn bản để nói trôi chảy', 0, 280, 22, PR.creamD, { align: 'center', weight: 700 });
  });
}

// Comparison between pattern matching vs fact checking
function t2RealityCheck(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Card 1: Pattern matching (What AI does)
    pp(pR(-370, -180, 740, 160, 16), PR.creamL, { key: 't2_c1', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-370, -180, 18, 160, 6), PR.green, { shadow: false, tex: false });
    txt('GHÉP CÂU CHỮ THEO MẪU', -320, -125, 26, PR.navy, { weight: 800 });
    txt('AI tìm các từ ngữ có khả năng đi cùng nhau cao nhất.', -320, -85, 20, PR.char, { weight: 600 });
    pp(pR(220, -155, 120, 48, 10), PR.green, { key: 't2_ok_tag', sb: 4, sy: 2, tex: 0.3 });
    txt('RẤT TỐT', 280, -123, 18, PR.creamL, { align: 'center', weight: 800 });

    // Card 2: Fact verification (What AI does NOT do)
    pp(pR(-370, 20, 740, 160, 16), PR.creamL, { key: 't2_c2', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-370, 20, 18, 160, 6), PR.red, { shadow: false, tex: false });
    txt('KIỂM CHỨNG VỚI THỰC TẾ', -320, 75, 26, PR.navy, { weight: 800 });
    txt('AI không tự tra cứu dữ liệu thực hay đi kiểm chứng sự thật.', -320, 115, 20, PR.char, { weight: 600 });
    pp(pR(200, 45, 140, 48, 10), PR.red, { key: 't2_no_tag', sb: 4, sy: 2, tex: 0.3 });
    txt('KHÔNG CÓ', 270, 77, 18, PR.creamL, { align: 'center', weight: 800 });

    // Warning note below
    pp(pR(-340, 210, 680, 60, 12), PR.navyD, { key: 't2_warnbox', sb: 8, sy: 4, tex: 0.4 });
    txt('Tự động tạo văn bản ≠ Tự động biết sự thật', 0, 248, 22, PR.mustard, { align: 'center', weight: 800 });
  });
}

// 3 fake generated items
function t2FakeItems(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    const items = [
      ['TÊN SÁCH BỊA', '"Vũ trụ 1892" — GS. Nam', 'Tác giả & sách hoàn toàn hư cấu'],
      ['SỐ LIỆU GIẢ', '"89,4% tăng trưởng năm 1902"', 'Con số ngẫu nhiên nghe hợp lý'],
      ['NGUỒN TRÍCH DẪN', 'doi:10.1038/s41586-fake', 'Mã trích dẫn và liên kết 404 rỗng'],
    ];

    items.forEach(([tag, title, desc], i) => {
      const iy = -160 + i * 140;
      pp(pR(-360, iy, 720, 115, 14), PR.creamL, { key: 'fake_' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-360, iy, 720, 36, 14), PR.red, { shadow: false, tex: 0.3 });
      pp(pR(-360, iy + 22, 720, 14, 0), PR.red, { shadow: false, tex: false });
      txt(tag, -330, iy + 26, 17, PR.creamL, { weight: 800 });

      txt(title, -330, iy + 68, 22, PR.navy, { weight: 800 });
      txt(desc, -330, iy + 98, 18, PR.char, { weight: 600 });
    });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Bạn hỏi AI một câu, nó trả lời rất mượt. Nhưng câu trả lời đó có thể sai hoàn toàn!
  t2Wall('hk');
  prSign('AI TRẢ LỜI TỰ TIN... NHƯNG SAI?', { kicker: KICK });

  const tWrong = VW('hook', 'sai').t0;
  const isWrong = TT >= tWrong;

  t2Chat(540, 880, { isWrong });

  if (isWrong) {
    prCross(540, 1240, tWrong, 64);
  }

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: isWrong ? 'wow' : 'happy',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.term = () => {
  // S2: Hiện tượng này được gọi là AI hallucination, hay ảo giác AI.
  t2Wall('term');
  prSign('HIỆN TƯỢNG ẢO GIÁC AI', { kicker: KICK });

  const tTerm = VW('term', 'ảo').t0;

  // Center Term Card
  withT(540, 840, 0, 1, () => {
    pp(pR(-380, -220, 760, 440, 20), PR.creamL, { key: 'term_card', sb: 18, sy: 9, tex: 0.5 });
    // Header
    pp(pR(-380, -220, 760, 80, 20), '#0e1d2d', { shadow: false, tex: 0.4 });
    pp(pR(-380, -160, 760, 20, 0), '#0e1d2d', { shadow: false, tex: false });
    txt('THUẬT NGỮ CÔNG NGHỆ', 0, -170, 24, PR.glow, { align: 'center', weight: 800 });

    txt('AI HALLUCINATION', 0, -80, 44, PR.red, { align: 'center', weight: 800 });
    txt('(ẢO GIÁC AI)', 0, -20, 32, PR.navy, { align: 'center', weight: 800 });

    pp(pR(-320, 40, 640, 120, 14), PR.techK, { key: 'term_def', sb: 8, sy: 4, tex: 0.35 });
    txt('Khi mô hình AI tạo ra thông tin', 0, 80, 22, PR.creamL, { align: 'center', weight: 700 });
    txt('hoàn toàn không có thật nhưng nói rất tự tin!', 0, 120, 22, PR.mustard, { align: 'center', weight: 800 });
  });

  prStamp('ẢO GIÁC AI', 540, 1180, PR.red, tTerm, { size: 42, from: 1.25, rot: -0.05 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: 'wow',
    key: 'b_term',
    look: -25,
  });

  prChips();
};

SCENES.pattern = () => {
  // S3: Mô hình ngôn ngữ tạo câu trả lời dựa trên những mẫu đã học và ngữ cảnh hiện tại.
  const t0 = E0;
  t2Wall('pt');
  prSign('AI GHÉP TỪ THEO XÁC SUẤT', { kicker: KICK });

  t2TokenStream(540, 860, t0 + 0.2);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_pt',
    look: -30,
  });

  prChips();
};

SCENES.reality = () => {
  // S4: Nó không tự động kiểm chứng từng khẳng định với thực tế.
  const t0 = E0;
  t2Wall('rl');
  prSign('AI KHÔNG TỰ KIỂM CHỨNG THỰC TẾ', { kicker: KICK });

  t2RealityCheck(540, 880, t0);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'flat',
    key: 'b_rl',
  });

  prChips();
};

SCENES.fake = () => {
  // S5: Vì vậy, AI đôi khi tạo ra tên sách, số liệu hoặc nguồn tham khảo không tồn tại.
  const t0 = E0;
  t2Wall('fk');
  prSign('DỮ LIỆU BỊA RA HOÀN TOÀN', { kicker: KICK });

  t2FakeItems(540, 880, t0);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'wow',
    key: 'b_fk',
    hold: propChip(-0.1),
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Câu trả lời nghe thuyết phục không đồng nghĩa với câu trả lời chính xác.
  t2Wall('ta');
  prSign('THUYẾT PHỤC ≠ CHÍNH XÁC', { kicker: KICK });

  const tStamp = VW('takeaway', 'chính').t0;

  // Top Card: Văn phong thuyết phục
  withT(540, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.blue, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.blue, { shadow: false, tex: false });
    txt('CÂU TRẢ LỜI NGHE THUYẾT PHỤC', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Văn phong trôi chảy, ngữ pháp chuẩn, tự tin.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('AI chỉ giỏi ghép câu chữ hợp ngữ cảnh', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  // Bottom Card: Độ chính xác
  withT(540, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.red, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.red, { shadow: false, tex: false });
    txt('CÂU TRẢ LỜI CHÍNH XÁC THỰC TẾ', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Cần nguồn kiểm chứng, sự kiện có thật ngoài đời.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Nghe hay không có nghĩa là sự thật!', 0, 50, 19, PR.red, { align: 'center', weight: 800 });
  });

  prStamp('KHÔNG ĐỒNG NGHĨA!', 540, 1160, PR.red, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Lưu video này để nhớ kiểm chứng thông tin do AI tạo ra.
  const t0 = E0;
  t2Wall('cta');
  prSign('HÃY LUÔN KIỂM CHỨNG LẠI!', { kicker: KICK });

  // Big verification checklist card
  withT(540, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('NGUYÊN TẮC VÀNG KHI DÙNG AI', 0, -115, 30, PR.navy, { align: 'center', weight: 800 });

    const checks = [
      '1. Kiểm tra lại mọi số liệu và tên người',
      '2. Tìm nguồn gốc chính thống ngoài đời thực',
      '3. Không vội tin vào trích dẫn chưa kiểm chứng',
    ];
    checks.forEach((ch, i) => {
      pp(pR(-330, -55 + i * 65, 660, 50, 10), PR.techK, { key: 'cta_ch' + i, shadow: false, tex: 0.3 });
      txt(ch, -300, -22 + i * 65, 20, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(540, 1090, 'LƯU VIDEO NGAY', t0 + 0.2, { hint: 'Bạn từng bị AI lừa thông tin gì chưa?...' });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'party',
    mood: 'happy',
    key: 'b_cta',
    look: -15,
  });

  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'tick', t: VW('hook', 'hỏi').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'sai').t0 });
  cues.push({ k: 'pop', t: VW('term', 'ảo').t0 });
  cues.push({ k: 'tick', t: VW('pattern', 'mẫu').t0 });
  cues.push({ k: 'thud', t: VW('reality', 'không').t0 });
  cues.push({ k: 'thud', t: VW('fake', 'sách').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'chính').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'lưu').t0 });
  cues.push({ k: 'type', t: VW('cta', 'kiểm').t0, n: 14, d: 0.45 });
  return cues;
}

const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const ERA_BG = ERA_LIST.map(() => WALL);
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
