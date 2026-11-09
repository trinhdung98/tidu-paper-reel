// =====================================================================
//  TIDU TECH 03 — "Chế độ ẩn danh có thật sự ẩn danh?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: Incognito mode, local privacy vs network visibility, ISP tracking.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · AN TOÀN SỐ';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 03 HELPERS (t3 prefix to avoid clashes) ----

function t3Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Browser Incognito Window with paper mask
function t3IncognitoBrowser(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    const bw = 740, bh = 420;
    // Dark incognito window
    pp(pR(-bw / 2, -bh / 2, bw, bh, 20), '#0e1724', { key: 't3_bw', sb: 18, sy: 9, tex: 0.45 });
    // Tab bar
    pp(pR(-bw / 2, -bh / 2, bw, 56, 20), '#182436', { key: 't3_tabbar', shadow: false, tex: 0.3 });
    pp(pR(-bw / 2, -bh / 2 + 36, bw, 20, 0), '#182436', { shadow: false, tex: false });

    // Window control dots
    [-1, 0, 1].forEach((d, i) => {
      const col = [PR.red, PR.mustard, PR.green][i];
      pp(pE(-bw / 2 + 36 + d * 22, -bh / 2 + 28, 6, 6), col, { shadow: false, tex: false });
    });

    // Incognito tab
    pp(pR(-bw / 2 + 100, -bh / 2 + 10, 240, 46, 8), '#0e1724', { key: 't3_actab', shadow: false, tex: 0.3 });
    txt('🕶️ Tab ẩn danh', -bw / 2 + 130, -bh / 2 + 40, 18, PR.creamL, { weight: 700 });

    // Detective hat & glasses badge
    withT(0, -60, 0, 1, () => {
      // Hat
      pp(pR(-90, -40, 180, 20, 6), PR.char, { key: 'hat_brim', sb: 6, sy: 3, tex: 0.3 });
      pp(pR(-60, -85, 120, 50, 10), PR.char, { key: 'hat_top', sb: 8, sy: 4, tex: 0.35 });
      pp(pR(-60, -50, 120, 10, 0), PR.glow, { shadow: false, tex: false });

      // Glasses / Mask
      pp(pE(-36, -5, 24, 20), PR.char, { key: 'gl_L', sb: 6, sy: 3, tex: 0.3 });
      pp(pE(36, -5, 24, 20), PR.char, { key: 'gl_R', sb: 6, sy: 3, tex: 0.3 });
      pp(pR(-14, -8, 28, 6, 2), PR.char, { shadow: false, tex: false });
    });

    txt('CHẾ ĐỘ ẨN DANH (INCOGNITO)', 0, 30, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('Người khác dùng chung máy sẽ không thấy lịch sử.', 0, 72, 21, PR.creamD, { align: 'center', weight: 600 });

    // Green check tag
    pp(pR(-240, 110, 480, 54, 12), '#143c24', { key: 't3_oktag', sb: 6, sy: 3, tex: 0.4 });
    txt('✓ Tự động xóa lịch sử, cookies khi tắt tab', 0, 144, 18, PR.green, { align: 'center', weight: 800 });
  });
}

// 3 Entitites that can still see your connection
function t3Observers(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    const obs = [
      ['🌐 WEBSITE ĐÍCH', 'Biết địa chỉ IP của bạn, thiết bị, và trang bạn xem.'],
      ['📡 NHÀ CUNG CẤP MẠNG (ISP)', 'Biết tên miền (domain) bạn kết nối tới.'],
      ['🏢 CÔNG TY / TRƯỜNG HỌC', 'Nếu dùng Wi-Fi chung, quản trị viên thấy log mạng.'],
    ];

    txt('NHỮNG BÊN VẪN BIẾT BẠN TRUY CẬP:', 0, -180, 26, PR.mustard, { align: 'center', weight: 800 });

    obs.forEach(([title, desc], i) => {
      const iy = -100 + i * 135;
      pp(pR(-360, iy, 720, 110, 16), PR.creamL, { key: 'obs_' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-360, iy, 16, 110, 6), PR.red, { shadow: false, tex: false });
      txt(title, -320, iy + 40, 22, PR.navy, { weight: 800 });
      txt(desc, -320, iy + 76, 18, PR.char, { weight: 600 });
      // Eye icon badge
      pp(pE(310, iy + 55, 24, 24), '#102030', { shadow: false, tex: 0.3 });
      txt('👁️', 310, iy + 63, 20, PR.mustard, { align: 'center', weight: 800 });
    });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Bạn bật chế độ ẩn danh và nghĩ không ai biết mình truy cập gì?
  t3Wall('hk');
  prSign('BẬT ẨN DANH: KHÔNG AI BIẾT?', { kicker: KICK });

  t3IncognitoBrowser(480, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: 'wow',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.device = () => {
  // S2: Chế độ ẩn danh chỉ giúp trình duyệt không lưu lịch sử trên thiết bị sau khi đóng tab.
  t3Wall('dev');
  prSign('CHỈ XÓA DỮ LIỆU TRÊN THIẾT BỊ', { kicker: KICK });

  // History erasing illustration
  withT(480, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 18), PR.creamL, { key: 'dev_card', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-370, -200, 740, 60, 18), PR.blue, { key: 'dev_hd', shadow: false, tex: 0.35 });
    pp(pR(-370, -150, 740, 16, 0), PR.blue, { shadow: false, tex: false });
    txt('📱 TRÊN ĐIỆN THOẠI & MÁY TÍNH CỦA BẠN', 0, -162, 22, PR.creamL, { align: 'center', weight: 800 });

    const rows = [
      ['Lịch sử duyệt web (History)', 'TỰ ĐỘNG XÓA'],
      ['Cookie phiên đăng nhập', 'TỰ ĐỘNG XÓA'],
      ['Dữ liệu form & biểu mẫu', 'KHÔNG LƯU LẠI'],
    ];

    rows.forEach(([name, status], i) => {
      const ry = -70 + i * 80;
      pp(pR(-330, ry, 660, 62, 10), PR.techK, { key: 'dev_row' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(name, -300, ry + 38, 20, PR.creamL, { weight: 700 });
      pp(pR(140, ry + 12, 160, 38, 8), PR.green, { key: 'dev_st' + i, shadow: false, tex: 0.3 });
      txt(status, 220, ry + 37, 15, PR.creamL, { align: 'center', weight: 800 });
    });

    txt('Sau khi đóng tab: Máy trở về trạng thái sạch sẽ', 0, 190, 20, PR.char, { align: 'center', weight: 700 });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'happy',
    key: 'b_dev',
    look: -25,
  });

  prChips();
};

SCENES.not_invisible = () => {
  // S3: Nhưng nó hoàn toàn không biến bạn thành người vô hình trên Internet.
  t3Wall('noinv');
  prSign('BẠN KHÔNG HỀ VÔ HÌNH!', { kicker: KICK });

  const tNot = VW('not_invisible', 'vô').t0;

  // Phantom Card with Big Cross
  withT(480, 840, 0, 1, () => {
    pp(pR(-360, -220, 720, 440, 20), PR.creamL, { key: 'ghost_card', sb: 18, sy: 9, tex: 0.5 });
    txt('ẢO TƯỞNG VỀ CHẾ ĐỘ ẨN DANH', 0, -160, 26, PR.char, { align: 'center', weight: 800 });

    // Ghost icon / Silhouette
    pp(pE(0, -30, 90, 90), '#d8dee9', { key: 'ghost_circ', sb: 8, sy: 4, tex: 0.35 });
    txt('👻', 0, 8, 84, PR.char, { align: 'center', weight: 800 });

    txt('"Tàng hình trên mạng?"', 0, 105, 30, PR.red, { align: 'center', weight: 800 });
    txt('Thực tế: Dữ liệu mạng vẫn truyền đi bình thường!', 0, 150, 21, PR.char, { align: 'center', weight: 700 });
  });

  prStamp('KHÔNG HỀ TÀNG HÌNH!', 480, 1180, PR.red, tNot, { size: 38, from: 1.25, rot: -0.05 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'wow',
    key: 'b_noinv',
  });

  prChips();
};

SCENES.who_sees = () => {
  // S4: Website bạn truy cập và nhà cung cấp mạng vẫn quan sát được kết nối.
  t3Wall('who');
  prSign('AI VẪN THẤY BẠN TRUY CẬP?', { kicker: KICK });

  t3Observers(480, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_who',
    hold: propChip(-0.1),
  });

  prChips();
};

SCENES.login = () => {
  // S5: Nếu đăng nhập vào tài khoản, website vẫn biết chính xác bạn là ai.
  t3Wall('login');
  prSign('ĐĂNG NHẬP = LỘ DANH TÍNH', { kicker: KICK });

  const tLogin = VW('login', 'biết').t0;

  // Login Form Demo Card
  withT(480, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 18), PR.creamL, { key: 'login_card', sb: 16, sy: 8, tex: 0.5 });
    txt('KHI BẠN ĐĂNG NHẬP VÀO TÀI KHOẢN', 0, -145, 26, PR.navy, { align: 'center', weight: 800 });

    // Mock Login Box
    pp(pR(-310, -90, 620, 64, 10), PR.techK, { key: 'lg_user', shadow: false, tex: 0.3 });
    txt('Email: nguyen_van_a@gmail.com', -280, -50, 20, PR.creamL, { weight: 700 });

    pp(pR(-310, -10, 620, 64, 10), PR.techK, { key: 'lg_pass', shadow: false, tex: 0.3 });
    txt('Mật khẩu: ••••••••••••', -280, 30, 20, PR.creamL, { weight: 700 });

    // Identity Revealed Banner
    pp(pR(-330, 85, 660, 80, 14), PR.red, { key: 'id_reveal', sb: 10, sy: 5, tex: 0.4 });
    txt('IDENTIFIED: WEBSITE BIẾT RÕ BẠN LÀ AI!', 0, 132, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  prCross(480, 1200, tLogin, 64);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'wow',
    key: 'b_login',
    look: -25,
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Ẩn danh là quyền riêng tư trên thiết bị, không phải tàng hình trên mạng!
  t3Wall('ta');
  prSign('ẨN DANH MÁY ≠ TÀNG HÌNH MẠNG', { kicker: KICK });

  const tStamp = VW('takeaway', 'không').t0;

  // Top Card: Quyền riêng tư máy
  withT(480, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.blue, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.blue, { shadow: false, tex: false });
    txt('📱 QUYỀN RIÊNG TƯ TRÊN MÁY BẠN', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Không lưu lại lịch sử, cookie sau khi bạn tắt tab.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('✓ Người mượn máy không thể soi lịch sử cũ', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  // Bottom Card: Tàng hình mạng
  withT(480, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.red, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.red, { shadow: false, tex: false });
    txt('🌐 TÀNG HÌNH TRÊN INTERNET', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Website và nhà mạng vẫn nhận địa chỉ IP của bạn.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('⚠️ Ẩn danh không thể thay thế VPN hoặc bảo mật mạng!', 0, 50, 19, PR.red, { align: 'center', weight: 800 });
  });

  prStamp('ẨN DANH CỤC BỘ!', 480, 1160, PR.mustard, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Gửi video này cho người đang hiểu nhầm về chế độ ẩn danh nhé.
  const t0 = E0;
  t3Wall('cta');
  prSign('CHIA SẺ ĐỂ HIỂU ĐÚNG NHÉ!', { kicker: KICK });

  withT(480, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('💡 TÓM TẮT DỄ NHỚ', 0, -115, 30, PR.navy, { align: 'center', weight: 800 });

    const notes = [
      '• Mượn máy người khác? Dùng ẩn danh rất tốt!',
      '• Mua sắm bất ngờ không muốn lộ lịch sử? Chuẩn!',
      '• Nghĩ không ai biết mình làm gì? Coi chừng nhầm!',
    ];
    notes.forEach((nt, i) => {
      pp(pR(-340, -55 + i * 65, 680, 50, 10), PR.techK, { key: 'cta_n' + i, shadow: false, tex: 0.3 });
      txt(nt, -310, -22 + i * 65, 20, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(480, 1090, 'CHIA SẺ NGAY', t0 + 0.2, { hint: 'Bạn hay bật ẩn danh khi nào?...' });

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
  cues.push({ k: 'tick', t: VW('hook', 'bật').t0 });
  cues.push({ k: 'tick', t: VW('device', 'giúp').t0 });
  cues.push({ k: 'thud', t: VW('not_invisible', 'vô').t0 });
  cues.push({ k: 'pop', t: VW('who_sees', 'mạng').t0 });
  cues.push({ k: 'thud', t: VW('login', 'biết').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'không').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'gửi').t0 });
  cues.push({ k: 'type', t: VW('cta', 'nhầm').t0, n: 12, d: 0.4 });
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
