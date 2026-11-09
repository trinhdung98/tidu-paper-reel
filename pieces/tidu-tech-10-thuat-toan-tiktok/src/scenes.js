// =====================================================================
//  TIDU TECH 10 — "Vì sao TikTok liên tục đề xuất đúng thứ bạn thích?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: Recommendation algorithm, For You page (FYP), user signals, ranking.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · AI GIẢI THÍCH';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 10 HELPERS (t10 prefix to avoid clashes) ----

function t10Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Smartphone showing vertical video feed
function t10PhoneFeed(cx, cy, o = {}) {
  withT(cx, cy, 0, 1, () => {
    const pw = 420, ph = 620;
    // Phone chassis
    pp(pR(-pw / 2, -ph / 2, pw, ph, 32), PR.char, { key: 't10_phb', sb: 20, sy: 10, tex: 0.4 });
    pp(pR(-pw / 2 + 14, -ph / 2 + 16, pw - 28, ph - 32, 22), '#0d1724', { key: 't10_phscr', shadow: false, tex: 0.3 });

    // Header tabs: Đang Follow | Dành cho bạn
    txt('Đang Follow', -80, -ph / 2 + 50, 18, PR.creamD, { weight: 600 });
    txt('Dành cho bạn', 70, -ph / 2 + 50, 20, PR.creamL, { weight: 800 });
    pp(pR(15, -ph / 2 + 64, 110, 4, 2), PR.glow, { shadow: false, tex: false });

    // Video card in center
    const vw = pw - 60, vh = 360;
    pp(pR(-vw / 2, -60, vw, vh, 16), o.cats ? '#1f3044' : '#142235', { key: 't10_vcard', sb: 10, sy: 5, tex: 0.4 });

    if (o.cats) {
      txt('🐱', 0, 10, 90, PR.creamL, { align: 'center', weight: 800 });
      txt('Mèo con ngáo ngơ siêu đáng yêu', 0, 85, 20, PR.creamL, { align: 'center', weight: 800 });
      txt('#catsoftiktok #cute #meomeo', 0, 120, 16, PR.glow, { align: 'center', weight: 700 });

      // Floating hearts
      for (let h = 0; h < 3; h++) {
        const hy = -20 - h * 40 - Math.sin(TT * 4 + h) * 15;
        txt('❤️', 110, hy, 26, PR.red, { align: 'center', weight: 800 });
      }
    } else {
      txt('📱 TỔNG HỢP VIDEO', 0, 10, 30, PR.creamL, { align: 'center', weight: 800 });
      txt('Nấu ăn, thể thao, âm nhạc...', 0, 70, 18, PR.creamD, { align: 'center', weight: 600 });
    }

    // Right-side action bar icons
    const actions = ['❤️ 142K', '💬 2.8K', '🔖 18K', '➡️ 9.5K'];
    actions.forEach((act, i) => {
      txt(act, pw / 2 - 40, -40 + i * 55, 14, PR.creamL, { align: 'center', weight: 700 });
    });
  });
}

// 4 User behavior signals that TikTok tracks
function t10UserSignals(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('4 TÍN HIỆU TƯƠNG TÁC QUAN TRỌNG NHẤT', 0, -180, 24, PR.glow, { align: 'center', weight: 800 });

    const signals = [
      ['⏱️ THỜI GIAN XEM VIDEO', 'Xem hết video hoặc xem đi xem lại (+ Điểm rất cao)'],
      ['❤️ THẢ TIM & LƯU YÊU THÍCH', 'Bày tỏ sự quan tâm rõ ràng với chủ đề'],
      ['💬 BÌNH LUẬN & CHIA SẺ', 'Hành động tương tác có trọng số lớn nhất'],
      ['⏩ LƯỚT QUA TRONG 1 GIÂY', 'Không thích nội dung này (- Trừ điểm đề xuất)'],
    ];

    signals.forEach(([title, desc], i) => {
      const sy = -100 + i * 115;
      pp(pR(-360, sy, 720, 95, 14), PR.creamL, { key: 'sig_' + i, sb: 10, sy: 5, tex: 0.45 });
      pp(pR(-360, sy, 18, 95, 6), i === 3 ? PR.red : PR.green, { shadow: false, tex: false });
      txt(title, -320, sy + 38, 21, PR.navy, { weight: 800 });
      txt(desc, -320, sy + 70, 18, PR.char, { weight: 600 });
    });
  });
}

// Metadata analysis (Audio, Hashtags, Description)
function t10MetadataCard(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('PHÂN TÍCH NỘI DUNG TỪNG VIDEO', 0, -180, 26, PR.glow, { align: 'center', weight: 800 });

    const metas = [
      ['🎵 ÂM THANH XU HƯỚNG', 'Đoạn nhạc hoặc giọng lồng tiếng đang thịnh hành'],
      ['🏷️ HASHTAG & TỪ KHÓA', 'Nhãn chủ đề: #haihuoc, #congnghe, #review...'],
      ['📝 PHỤ ĐỀ & HÌNH ẢNH', 'AI quét hình ảnh và chữ xuất hiện trong video'],
    ];

    metas.forEach(([title, desc], i) => {
      const my = -95 + i * 115;
      pp(pR(-360, my, 720, 95, 14), PR.creamL, { key: 'meta_' + i, sb: 10, sy: 5, tex: 0.45 });
      pp(pR(-360, my, 18, 95, 6), PR.blue, { shadow: false, tex: false });
      txt(title, -320, my + 38, 21, PR.navy, { weight: 800 });
      txt(desc, -320, my + 70, 18, PR.char, { weight: 600 });
    });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Bạn vừa xem vài video về mèo, sao cả trang đề xuất hôm nay ngập tràn video mèo?
  t10Wall('hk');
  prSign('VỪA XEM MÈO: FEED TOÀN MÈO?', { kicker: KICK });

  t10PhoneFeed(480, 880, { cats: true });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: 'wow',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.signals = () => {
  // S2: TikTok không hề đọc suy nghĩ của bạn, mà học từ chính những tín hiệu bạn để lại.
  t10Wall('sig');
  prSign('HỌC TỪ HÀNH VI CỦA BẠN', { kicker: KICK });

  t10UserSignals(480, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'happy',
    key: 'b_sig',
    look: -25,
  });

  prChips();
};

SCENES.metrics = () => {
  // S3: Hệ thống ghi nhận bạn dừng lại xem bao lâu, có thả tim, bình luận hay lướt qua nhanh.
  t10Wall('met');
  prSign('THỜI GIAN XEM LÀ YẾU TỐ VÀNG', { kicker: KICK });

  withT(480, 840, 0, 1, () => {
    pp(pR(-370, -220, 740, 440, 20), PR.creamL, { key: 'met_card', sb: 18, sy: 9, tex: 0.5 });
    txt('TRỌNG SỐ QUAN TRỌNG NHẤT: WATCH TIME', 0, -165, 24, PR.navy, { align: 'center', weight: 800 });

    const metrics = [
      ['1. Xem hết 100% video', 'Tín hiệu mạnh nhất: Bạn rất thích nội dung này!'],
      ['2. Xem lặp lại lần 2', 'Điểm cộng tối đa cho chủ đề đó'],
      ['3. Lướt qua ngay < 2 giây', 'Thuật toán hiểu: Bạn không muốn xem nữa'],
    ];

    metrics.forEach(([st, desc], i) => {
      const sy = -105 + i * 95;
      pp(pR(-330, sy, 660, 75, 12), PR.techK, { key: 'met_box' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(st, -300, sy + 28, 21, PR.glow, { weight: 800 });
      txt(desc, -300, sy + 56, 17, PR.creamD, { weight: 600 });
    });

    txt('Mỗi giây bạn dừng lại đều được thuật toán ghi nhớ!', 0, 192, 20, PR.green, { align: 'center', weight: 800 });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_met',
    look: -30,
  });

  prChips();
};

SCENES.metadata = () => {
  // S4: Nó cũng phân tích chi tiết âm thanh, mô tả và hashtag của từng video.
  t10Wall('meta');
  prSign('PHÂN TÍCH NỘI DUNG TỪNG VIDEO', { kicker: KICK });

  t10MetadataCard(480, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_meta',
    look: -25,
  });

  prChips();
};

SCENES.algorithm = () => {
  // S5: Thuật toán liên tục tính điểm để đưa nội dung bạn thích nhất lên đầu bảng tin.
  t10Wall('algo');
  prSign('TÍNH ĐIỂM & ĐỀ XUẤT CHO BẠN', { kicker: KICK });

  withT(480, 840, 0, 1, () => {
    pp(pR(-370, -220, 740, 440, 20), PR.creamL, { key: 'algo_card', sb: 18, sy: 9, tex: 0.5 });
    txt('QUY TRÌNH XẾP HẠNG BẢNG TIN FYP', 0, -165, 26, PR.navy, { align: 'center', weight: 800 });

    const flow = [
      ['Hàng triệu video mới tải lên mỗi ngày', 'Phân loại chủ đề qua AI'],
      ['So khớp với hồ sơ sở thích của bạn', 'Tính điểm xác suất bạn sẽ xem hết'],
      ['Đưa video điểm cao nhất vào feed của bạn!', 'Liên tục cập nhật theo thời gian thực'],
    ];

    flow.forEach(([f1, f2], i) => {
      const fy = -105 + i * 90;
      pp(pR(-330, fy, 660, 70, 12), PR.techK, { key: 'algo_f' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(f1, -300, fy + 26, 21, PR.glow, { weight: 800 });
      txt(f2, -300, fy + 52, 17, PR.creamD, { weight: 600 });
    });

    txt('Bảng tin của bạn là duy nhất, không giống ai!', 0, 190, 20, PR.green, { align: 'center', weight: 800 });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'happy',
    key: 'b_algo',
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Bạn tương tác với thứ gì, thuật toán sẽ xây dựng thế giới của bạn bằng chính thứ đó!
  t10Wall('ta');
  prSign('THUẬT TOÁN LÀ TẤM GƯƠNG', { kicker: KICK });

  const tStamp = VW('takeaway', 'thứ').t0;

  // Top Card: Bản chất thuật toán
  withT(480, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.blue, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.blue, { shadow: false, tex: false });
    txt('🪞 TẤM GƯƠNG PHẢN CHIẾU HÀNH VI', 0, -55, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Thuật toán không tự ép bạn xem gì, nó chỉ phản ánh thói quen của bạn.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('✓ Dừng lại xem nhiều = Sẽ được xem nhiều hơn', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  // Bottom Card: Mẹo đổi feed
  withT(480, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.mustard, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.mustard, { shadow: false, tex: false });
    txt('💡 MUỐN THAY ĐỔI TRANG ĐỀ XUẤT?', 0, -55, 24, PR.navy, { align: 'center', weight: 800 });
    txt('Chủ động lướt qua nhanh nội dung vô bổ trong 1 giây.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Tìm kiếm & thả tim cho nội dung học tập, sau 3 ngày feed sẽ đổi!', 0, 50, 19, PR.navy, { align: 'center', weight: 800 });
  });

  prStamp('CÁ NHÂN HÓA 100%!', 480, 1160, PR.mustard, tStamp, { size: 36, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Trang đề xuất TikTok của bạn hiện đang ngập tràn chủ đề gì? Kể bên dưới nhé!
  const t0 = E0;
  t10Wall('cta');
  prSign('BẢNG TIN CỦA BẠN ĐANG CÓ GÌ?', { kicker: KICK });

  withT(480, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('📊 TOP 3 CHỦ ĐỀ PHỔ BIẾN TRÊN FYP', 0, -115, 28, PR.navy, { align: 'center', weight: 800 });

    const topics = [
      '🐱 Thú cưng, động vật hài hước',
      '🍔 Ẩm thực, nấu ăn & du lịch trải nghiệm',
      '📚 Kiến thức công nghệ, học tập & đời sống',
    ];
    topics.forEach((top, i) => {
      pp(pR(-340, -55 + i * 65, 680, 50, 10), PR.techK, { key: 'cta_tp' + i, shadow: false, tex: 0.3 });
      txt(top, -310, -22 + i * 65, 20, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(480, 1090, 'CHỦ ĐỀ CỦA BẠN', t0 + 0.2, { hint: 'Feed của bạn đang đầy nội dung gì?...' });

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
  cues.push({ k: 'tick', t: VW('hook', 'mèo').t0 });
  cues.push({ k: 'pop', t: VW('signals', 'hiệu').t0 });
  cues.push({ k: 'tick', t: VW('metrics', 'dừng').t0 });
  cues.push({ k: 'pop', t: VW('metadata', 'thanh').t0 });
  cues.push({ k: 'chime', t: VW('algorithm', 'toán').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'thứ').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'đề').t0 });
  cues.push({ k: 'type', t: VW('cta', 'xuất').t0, n: 12, d: 0.4 });
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
