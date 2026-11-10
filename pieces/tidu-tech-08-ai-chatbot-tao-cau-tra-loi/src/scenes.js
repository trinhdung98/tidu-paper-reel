// =====================================================================
//  TIDU TECH 08 — "AI chatbot tạo câu trả lời như thế nào?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: LLM tokenization, neural attention, next-token generation, RAG.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · AI GIẢI THÍCH';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 08 HELPERS (t8 prefix to avoid clashes) ----

function t8Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// User typing prompt into chatbot
function t8UserPrompt(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    const pw = 740, ph = 380;
    pp(pR(-pw / 2, -ph / 2, pw, ph, 20), PR.creamL, { key: 't8_pbg', sb: 18, sy: 9, tex: 0.5 });
    // Chat window header
    pp(pR(-pw / 2, -ph / 2, pw, 56, 20), '#0e1d2d', { key: 't8_phd', shadow: false, tex: 0.3 });
    pp(pR(-pw / 2, -ph / 2 + 36, pw, 20, 0), '#0e1d2d', { shadow: false, tex: false });
    sparkIcon(-pw / 2 + 36, -ph / 2 + 28, 16, PR.glow, 0.2);
    txt('GỬI CÂU HỎI TỚI CHATBOT AI', -pw / 2 + 68, -ph / 2 + 36, 20, PR.glow, { weight: 800 });

    // Prompt box
    pp(pR(-pw / 2 + 30, -80, pw - 60, 110, 14), PR.techK, { key: 't8_pbox', sb: 8, sy: 4, tex: 0.35 });
    txt('BẠN HỎI:', -pw / 2 + 55, -45, 18, PR.mustard, { weight: 800 });
    txt('"Thời tiết Hà Nội hôm nay thế nào?"', -pw / 2 + 55, -10, 24, PR.creamL, { weight: 700 });

    // Brain processing icon below
    pp(pR(-220, 60, 440, 70, 12), '#182436', { key: 't8_proc', shadow: false, tex: 0.3 });
    txt('HỆ THỐNG BẮT ĐẦU XỬ LÝ...', 0, 102, 21, PR.glow, { align: 'center', weight: 800 });
  });
}

// Sentence splitting into tokens
function t8Tokenization(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('BƯỚC 1: TÁCH THÀNH CÁC TOKEN (MẨU TỪ)', 0, -180, 24, PR.glow, { align: 'center', weight: 800 });

    const tokens = [
      ['Thời', '#412'],
      ['tiết', '#893'],
      ['Hà', '#910'],
      ['Nội', '#911'],
      ['hôm', '#320'],
      ['nay', '#321'],
      ['thế', '#154'],
      ['nào', '#155'],
      ['?', '#029'],
    ];

    tokens.forEach(([tok, id], i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const tx = -240 + col * 240, ty = -90 + row * 105;
      pp(pR(tx - 105, ty - 38, 210, 76, 12), PR.creamL, { key: 't8_tok' + i, sb: 8, sy: 4, tex: 0.45 });
      txt(tok, tx, ty - 4, 26, PR.navy, { align: 'center', weight: 800 });
      txt(id, tx, ty + 24, 15, PR.blue, { align: 'center', weight: 700, font: F_MONO });
    });

    txt('Mỗi token là một từ hoặc cụm ký tự máy tính đọc được', 0, 240, 20, PR.creamD, { align: 'center', weight: 600 });
  });
}

// Neural network next-token prediction
function t8NeuralPrediction(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('BƯỚC 2: MẠNG NƠ-RON TÍNH TOÁN XÁC SUẤT', 0, -180, 24, PR.glow, { align: 'center', weight: 800 });

    const cands = [
      ['Hôm nay', 'Xác suất P = 89,4%', PR.green],
      ['Hiện tại', 'Xác suất P = 7,2%', PR.blue],
      ['Dự báo', 'Xác suất P = 3,4%', PR.mustard],
    ];

    cands.forEach(([word, prob, col], i) => {
      const cy_i = -100 + i * 115;
      pp(pR(-360, cy_i, 720, 95, 14), PR.creamL, { key: 't8_cand' + i, sb: 10, sy: 5, tex: 0.45 });
      pp(pR(-360, cy_i, 18, 95, 6), col, { shadow: false, tex: false });
      txt(word, -320, cy_i + 38, 24, PR.navy, { weight: 800 });
      txt(prob, -320, cy_i + 70, 18, PR.char, { weight: 600 });

      if (i === 0) {
        pp(pR(180, cy_i + 22, 150, 48, 10), PR.green, { key: 't8_sel', shadow: false, tex: 0.3 });
        txt('ĐƯỢC CHỌN', 255, cy_i + 52, 17, PR.creamL, { align: 'center', weight: 800 });
      }
    });

    txt('Dự đoán từ tiếp theo dựa trên ngữ cảnh toàn câu', 0, 260, 20, PR.creamD, { align: 'center', weight: 600 });
  });
}

// Stream of generated text
function t8TokenStream(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    const pw = 740, ph = 420;
    pp(pR(-pw / 2, -ph / 2, pw, ph, 20), PR.creamL, { key: 't8_strm', sb: 18, sy: 9, tex: 0.5 });
    txt('DÒNG TẠO TỪ LIÊN TỤC (STREAMING)', 0, -ph / 2 + 50, 24, PR.navy, { align: 'center', weight: 800 });

    // Flowing words box
    pp(pR(-pw / 2 + 30, -110, pw - 60, 240, 14), '#0e1d2d', { key: 't8_flow', sb: 8, sy: 4, tex: 0.35 });

    const words = ['"Hôm', 'nay,', 'Hà', 'Nội', 'trời', 'nhiều', 'mây,', 'nhiệt', 'độ', 'khoảng', '26', 'độ', 'C..."'];
    let curX = -pw / 2 + 55, curY = -60;
    words.forEach((w) => {
      const ww = txtW(w, 23);
      if (curX + ww > pw / 2 - 50) {
        curX = -pw / 2 + 55;
        curY += 50;
      }
      txt(w, curX, curY, 23, PR.glow, { weight: 700 });
      curX += ww + 12;
    });

    // Block cursor
    pp(pR(curX, curY - 24, 14, 28, 2), PR.mustard, { shadow: false, tex: false });

    txt('Từng từ sinh ra nối tiếp nhau như gõ phím siêu tốc', 0, 160, 20, PR.char, { align: 'center', weight: 700 });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Khi bạn gửi câu hỏi tới một chatbot AI, điều gì thực sự xảy ra trước khi câu trả lời xuất hiện?
  t8Wall('hk');
  prSign('ĐIỀU GÌ XẢY RA TRƯỚC KHI AI TRẢ LỜI?', { kicker: KICK });

  t8UserPrompt(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'wow',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.tokens = () => {
  // S2: Hệ thống trước tiên chia câu hỏi của bạn thành các mẩu nhỏ gọi là token.
  t8Wall('tok');
  prSign('CHIA CÂU THÀNH CÁC TOKEN', { kicker: KICK });

  t8Tokenization(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: 'happy',
    key: 'b_tok',
    look: -25,
  });

  prChips();
};

SCENES.context = () => {
  // S3: Mạng nơ-ron xử lý ngữ cảnh và tính toán xác suất của các từ tiếp theo.
  t8Wall('ctx');
  prSign('MẠNG NƠ-RON TÍNH XÁC SUẤT', { kicker: KICK });

  t8NeuralPrediction(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_ctx',
    look: -25,
  });

  prChips();
};

SCENES.generation = () => {
  // S4: Từng token mới được sinh ra liên tiếp, từ này nối tiếp từ kia như một dòng chảy.
  t8Wall('gen');
  prSign('TẠO TỪ LIÊN TỤC NHƯ DÒNG CHẢY', { kicker: KICK });

  t8TokenStream(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_gen',
    look: -30,
  });

  prChips();
};

SCENES.rag = () => {
  // S5: Một số hệ thống còn kết hợp công cụ tìm kiếm trên web để cập nhật dữ liệu mới.
  t8Wall('rag');
  prSign('KẾT HỢP TÌM KIẾM WEB (RAG)', { kicker: KICK });

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 20), PR.creamL, { key: 'rag_card', sb: 18, sy: 9, tex: 0.5 });
    txt('TÌM KIẾM DỮ LIỆU THỰC TẾ (RAG)', 0, -145, 26, PR.navy, { align: 'center', weight: 800 });

    const parts = [
      ['1. Mô hình ngôn ngữ (LLM)', 'Hiểu câu hỏi và hành văn mượt mà'],
      ['2. Công cụ tìm kiếm Web', 'Tra cứu tin tức mới nhất hôm nay'],
      ['3. Tổng hợp thông tin', 'Ghép dữ liệu web thành câu trả lời'],
    ];

    parts.forEach(([p, desc], i) => {
      const ry = -75 + i * 90;
      pp(pR(-330, ry, 660, 72, 12), PR.techK, { key: 'rag_p' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(p, -300, ry + 30, 21, PR.glow, { weight: 800 });
      txt(desc, -300, ry + 56, 17, PR.creamD, { weight: 600 });
    });

    txt('Nhờ vậy AI biết được thông tin vừa diễn ra!', 0, 185, 20, PR.green, { align: 'center', weight: 800 });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'happy',
    key: 'b_rag',
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Chatbot không phải mở cuốn từ điển chép đáp án, mà đang dự đoán câu chữ theo xác suất!
  t8Wall('ta');
  prSign('KHÔNG PHẢI CHÉP TỪ ĐIỂN!', { kicker: KICK });

  const tStamp = VW('takeaway', 'chép').t0;

  // Top Card: Không phải từ điển
  withT(540, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.red, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.red, { shadow: false, tex: false });
    txt('KHÔNG PHẢI MỞ TỪ ĐIỂN CHÉP ĐÁP ÁN', 0, -55, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('AI không lưu sẵn hàng triệu câu trả lời trong kho lưu trữ.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Mỗi lần trả lời là một lần AI tự sáng tác câu mới!', 0, 50, 19, PR.red, { align: 'center', weight: 800 });
  });

  // Bottom Card: Dự đoán xác suất
  withT(540, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.green, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.green, { shadow: false, tex: false });
    txt('DỰ ĐOÁN XÁC SUẤT TỪNG TOKEN', 0, -55, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Ghép từ có khả năng xuất hiện hợp lý nhất theo ngữ cảnh.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Đó là lý do cùng một câu hỏi, AI có thể trả lời khác nhau!', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  prStamp('DỰ ĐOÁN XÁC SUẤT!', 540, 1160, PR.mustard, tStamp, { size: 36, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Bình luận 'AI' bên dưới nếu bạn muốn làm phần hai về cách huấn luyện mô hình nhé!
  const t0 = E0;
  t8Wall('cta');
  prSign('BẠN MUỐN XEM PHẦN HAI KHÔNG?', { kicker: KICK });

  withT(540, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('CHỦ ĐỀ PHẦN HAI GỒM NHỮNG GÌ?', 0, -115, 28, PR.navy, { align: 'center', weight: 800 });

    const topics = [
      '• Huấn luyện trước (Pre-training) bằng hàng tỷ trang web',
      '• Tinh chỉnh bằng phản hồi con người (RLHF)',
      '• Tại sao AI cần hàng nghìn card đồ họa GPU siêu khủng?',
    ];
    topics.forEach((top, i) => {
      pp(pR(-340, -55 + i * 65, 680, 50, 10), PR.techK, { key: 'cta_tp' + i, shadow: false, tex: 0.3 });
      txt(top, -310, -22 + i * 65, 19, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(540, 1090, 'BÌNH LUẬN "AI"', t0 + 0.2, { hint: 'Để lại bình luận "AI" để nhận phần 2 nhé!...' });

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
  cues.push({ k: 'type', t: VW('hook', 'gửi').t0, n: 12, d: 0.4 });
  cues.push({ k: 'pop', t: VW('tokens', 'chia').t0 });
  cues.push({ k: 'tick', t: VW('context', 'tính').t0 });
  cues.push({ k: 'tick', t: VW('generation', 'sinh').t0 });
  cues.push({ k: 'chime', t: VW('rag', 'tìm').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'chép').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'luận').t0 });
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
