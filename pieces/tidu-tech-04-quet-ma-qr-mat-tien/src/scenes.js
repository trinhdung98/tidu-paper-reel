// =====================================================================
//  TIDU TECH 04 — "Quét mã QR có thể mất tiền?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: QR code phishing, sticker swap attacks, URL verification.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · AN TOÀN SỐ';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 04 HELPERS (t4 prefix to avoid clashes) ----

function t4Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Paper QR Code with finder squares and optional peeling fake sticker
function t4QRCode(cx, cy, s = 1, isFake = false) {
  withT(cx, cy, 0, s, () => {
    const qw = 360, qh = 360;
    // Base QR card
    pp(pR(-qw / 2, -qh / 2, qw, qh, 18), PR.creamL, { key: 'qr_base', sb: 18, sy: 9, tex: 0.45 });

    // Finder squares in 3 corners
    const drawFinder = (fx, fy, col = PR.navy) => {
      pp(pR(fx - 40, fy - 40, 80, 80, 10), col, { shadow: false, tex: 0.3 });
      pp(pR(fx - 24, fy - 24, 48, 48, 6), PR.creamL, { shadow: false, tex: false });
      pp(pR(fx - 14, fy - 14, 28, 28, 4), col, { shadow: false, tex: false });
    };

    drawFinder(-qw / 2 + 65, -qh / 2 + 65);
    drawFinder(qw / 2 - 65, -qh / 2 + 65);
    drawFinder(-qw / 2 + 65, qh / 2 - 65);

    // Grid data dots
    const R = RNG('qr_dots');
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if ((r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3)) continue;
        if (R.r(0, 1) > 0.45) {
          const dx = -qw / 2 + 65 + c * 33, dy = -qh / 2 + 65 + r * 33;
          pp(pR(dx - 11, dy - 11, 22, 22, 4), PR.navy, { shadow: false, tex: false });
        }
      }
    }

    // Label on card
    txt('MÃ THANH TOÁN TẠI QUẦY', 0, qh / 2 + 42, 22, PR.creamL, { align: 'center', weight: 800 });

    // Peeling fake sticker layer
    if (isFake) {
      withT(0, 0, 0.04, 1, () => {
        // Red striped fake overlay
        pp(pR(-qw / 2 + 10, -qh / 2 + 10, qw - 20, qh - 20, 14), PR.red, { key: 'qr_fake', sb: 12, sy: 6, tex: 0.5 });
        txt('MÃ GIẢ DÁN ĐÈ!', 0, -20, 28, PR.creamL, { align: 'center', weight: 800 });
        txt('Kẻ gian dán đè lên mã thật', 0, 24, 18, PR.creamD, { align: 'center', weight: 600 });
        txt('Chuyển hướng sang web lừa đảo', 0, 56, 18, PR.mustard, { align: 'center', weight: 800 });
      });
    }
  });
}

// Smartphone camera scanning QR with green beam
function t4PhoneScan(cx, cy, s = 1, o = {}) {
  withT(cx, cy, 0, s, () => {
    const pw = 420, ph = 620;
    // Phone chassis
    pp(pR(-pw / 2, -ph / 2, pw, ph, 32), PR.char, { key: 't4ph_body', sb: 20, sy: 10, tex: 0.4 });
    pp(pR(-pw / 2 + 14, -ph / 2 + 16, pw - 28, ph - 32, 22), '#0d1724', { key: 't4ph_scr', shadow: false, tex: 0.3 });

    // Camera header
    txt('QUÉT MÃ THANH TOÁN', 0, -ph / 2 + 56, 20, PR.creamL, { align: 'center', weight: 800 });

    // Viewfinder frame
    const vw = 240, vh = 240, vy = -30;
    pp(pR(-vw / 2, vy - vh / 2, vw, vh, 12), 'rgba(255,255,255,0.06)', { shadow: false, tex: false });
    ctx.save();
    ctx.strokeStyle = PR.glow;
    ctx.lineWidth = 4;
    // 4 corner brackets
    const d = 26;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => {
      const bx = sx * (vw / 2), by = vy + sy * (vh / 2);
      ctx.beginPath();
      ctx.moveTo(bx - sx * d, by);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx, by - sy * d);
      ctx.stroke();
    });
    // Animated green/cyan scan line
    const scanY = vy + Math.sin(TT * 5) * (vh / 2 - 14);
    ctx.strokeStyle = PR.green;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-vw / 2 + 10, scanY);
    ctx.lineTo(vw / 2 - 10, scanY);
    ctx.stroke();
    ctx.restore();

    // Link banner detected
    if (o.phishing) {
      // Red phishing warning bar
      pp(pR(-pw / 2 + 25, 145, pw - 50, 110, 14), PR.red, { key: 't4_warnbar', sb: 10, sy: 5, tex: 0.45 });
      txt('LIÊN KẾT PHÁT HIỆN:', -pw / 2 + 45, 180, 18, PR.creamL, { weight: 800 });
      txt('pay-fake-bank.vn/login', -pw / 2 + 45, 215, 19, PR.mustard, { weight: 800, font: F_MONO });
      txt('Trang web giả mạo ngân hàng!', -pw / 2 + 45, 242, 16, PR.creamL, { weight: 700 });
    } else {
      pp(pR(-pw / 2 + 25, 160, pw - 50, 80, 12), PR.techK, { key: 't4_okbar', sb: 6, sy: 3, tex: 0.35 });
      txt('Đang mở liên kết...', 0, 208, 20, PR.glow, { align: 'center', weight: 800 });
    }
  });
}

// 3 stages of QR attack
function t4AttackStages(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    const steps = [
      ['1. QUÉT MÃ QR', 'Chỉ giải mã ký tự link', 'CHƯA MẤT TIỀN', PR.green],
      ['2. MỞ ĐƯỜNG DẪN', 'Trình duyệt mở web lạ', 'BẮT ĐẦU RỦI RO', PR.mustard],
      ['3. NHẬP PASS / OTP', 'Kẻ gian đánh cắp tài khoản', 'MẤT TIỀN THỰC SỰ', PR.red],
    ];

    txt('RỦI RO THỰC SỰ XẢY RA KHI NÀO?', 0, -180, 26, PR.glow, { align: 'center', weight: 800 });

    steps.forEach(([title, desc, status, col], i) => {
      const sy = -100 + i * 130;
      pp(pR(-360, sy, 720, 105, 14), PR.creamL, { key: 'stg_' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-360, sy, 18, 105, 6), col, { shadow: false, tex: false });
      txt(title, -320, sy + 38, 22, PR.navy, { weight: 800 });
      txt(desc, -320, sy + 74, 18, PR.char, { weight: 600 });
      pp(pR(130, sy + 25, 200, 50, 10), col, { key: 'stg_badge' + i, shadow: false, tex: 0.3 });
      txt(status, 230, sy + 58, 16, PR.creamL, { align: 'center', weight: 800 });
    });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Không phải mã QR nào cũng đáng tin. Kẻ gian có thể dán mã QR giả đè lên mã thật ở nơi công cộng.
  t4Wall('hk');
  prSign('CẢNH GIÁC MÃ QR GIẢ DÁN ĐÈ!', { kicker: KICK });

  const tFake = VW('hook', 'dán').t0;
  const isFake = TT >= tFake;

  t4QRCode(540, 880, 1.15, isFake);

  if (isFake) {
    prCross(540, 1260, tFake, 64);
  }

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: isFake ? 'wow' : 'neutral',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.phishing = () => {
  // S2: Khi quét, bạn có thể bị dẫn đến website giả mạo để nhập thông tin đăng nhập hoặc thanh toán.
  t4Wall('phish');
  prSign('QUÉT MÃ: DẪN ĐẾN WEB GIẢ MẠO', { kicker: KICK });

  t4PhoneScan(540, 880, 1.05, { phishing: true });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'wow',
    key: 'b_phish',
    look: -25,
  });

  prChips();
};

SCENES.risk = () => {
  // S3: Bản thân hành động quét mã không có nghĩa là tiền tự động biến mất.
  t4Wall('risk');
  prSign('QUÉT MÃ KHÔNG LÀM MẤT TIỀN NGAY', { kicker: KICK });

  const tRisk = VW('risk', 'mất').t0;

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 20), PR.creamL, { key: 'risk_card', sb: 18, sy: 9, tex: 0.5 });
    txt('BẢN CHẤT CỦA MÃ QR LÀ GÌ?', 0, -145, 26, PR.navy, { align: 'center', weight: 800 });

    pp(pR(-320, -90, 640, 100, 14), PR.techK, { key: 'rsk_def', shadow: false, tex: 0.35 });
    txt('Mã QR chỉ là cách viết tắt một đường link (URL)', 0, -50, 22, PR.creamL, { align: 'center', weight: 700 });
    txt('Quét mã chỉ đơn giản là đọc chuỗi ký tự đó!', 0, -18, 20, PR.glow, { align: 'center', weight: 700 });

    // Green statement
    pp(pR(-320, 40, 640, 110, 14), '#143c24', { key: 'rsk_ok', sb: 8, sy: 4, tex: 0.4 });
    txt('HÀNH ĐỘNG QUÉT MÃ HOÀN TOÀN KHÔNG THỂ', 0, 80, 20, PR.green, { align: 'center', weight: 800 });
    txt('tự động rút tiền hay hack máy của bạn!', 0, 116, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  prStamp('CHƯA MẤT TIỀN!', 540, 1180, PR.green, tRisk, { size: 38, from: 1.25, rot: -0.05 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_risk',
  });

  prChips();
};

SCENES.action = () => {
  // S4: Rủi ro thường xuất hiện ở liên kết và các thao tác tiếp theo.
  t4Wall('act');
  prSign('RỦI RO Ở CÁC THAO TÁC TIẾP THEO', { kicker: KICK });

  t4AttackStages(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'wow',
    key: 'b_act',
  });

  prChips();
};

SCENES.verify = () => {
  // S5: Hãy kiểm tra địa chỉ website, xác minh người nhận tiền và không nhập mật khẩu trên trang đáng ngờ.
  t4Wall('vrf');
  prSign('3 NGUYÊN TẮC AN TOÀN KHI QUÉT QR', { kicker: KICK });

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -220, 740, 440, 20), PR.creamL, { key: 'vrf_card', sb: 18, sy: 9, tex: 0.5 });
    txt('LUÔN KIỂM TRA TRƯỚC KHI BẤM', 0, -165, 28, PR.navy, { align: 'center', weight: 800 });

    const rules = [
      ['1. KIỂM TRA TÊN MIỀN LINK', 'Đảm bảo đúng web chính thức của ngân hàng / dịch vụ.'],
      ['2. XÁC MINH TÊN NGƯỜI NHẬN', 'Xem kỹ tên chủ tài khoản thụ hưởng tại quầy thanh toán.'],
      ['3. TUYỆT ĐỐI KHÔNG NHẬP PASS / OTP', 'Không bao giờ nhập mật khẩu trên trang web mở từ QR lạ.'],
    ];

    rules.forEach(([title, desc], i) => {
      const ry = -105 + i * 105;
      pp(pR(-330, ry, 660, 88, 12), PR.techK, { key: 'vrf_r' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(title, -300, ry + 32, 21, PR.glow, { weight: 800 });
      txt(desc, -300, ry + 64, 18, PR.creamD, { weight: 600 });
    });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_vrf',
    look: -25,
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Nhìn kỹ trước khi chuyển tiền: Mã QR chỉ là một đường link dẫn lối!
  t4Wall('ta');
  prSign('MÃ QR CHỈ LÀ ĐƯỜNG LINK DẪN LỐI', { kicker: KICK });

  const tStamp = VW('takeaway', 'chuyển').t0;

  // Top Card: Bản chất QR
  withT(540, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.blue, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.blue, { shadow: false, tex: false });
    txt('BẢN CHẤT MÃ QR', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Chỉ là hình thức mã hóa một chuỗi văn bản hoặc đường link.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Bản thân mã QR vô hại!', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  // Bottom Card: Nơi xuất hiện rủi ro
  withT(540, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.red, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.red, { shadow: false, tex: false });
    txt('RỦI RO LÀ ĐÍCH ĐẾN CỦA LINK', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Website giả mạo đánh cắp tài khoản & thông tin OTP.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Luôn nhìn kỹ người nhận tiền trước khi ấn xác nhận!', 0, 50, 19, PR.red, { align: 'center', weight: 800 });
  });

  prStamp('SOI KỸ ĐÍCH ĐẾN!', 540, 1160, PR.mustard, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Lưu lại video này trước lần thanh toán QR tiếp theo nhé.
  const t0 = E0;
  t4Wall('cta');
  prSign('LƯU LẠI ĐỂ DÙNG MẠNG AN TOÀN!', { kicker: KICK });

  withT(540, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('THANH TOÁN QR AN TOÀN', 0, -115, 30, PR.navy, { align: 'center', weight: 800 });

    const tips = [
      '• Quán ăn, cà phê: Sờ xem mã có bị dán đè không',
      '• Hiện link lạ ngoài app ngân hàng? DỪNG LẠI NGAY!',
      '• Chia sẻ cho người thân để tránh bị lừa tiền!',
    ];
    tips.forEach((tp, i) => {
      pp(pR(-340, -55 + i * 65, 680, 50, 10), PR.techK, { key: 'cta_tp' + i, shadow: false, tex: 0.3 });
      txt(tp, -310, -22 + i * 65, 20, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(540, 1090, 'LƯU VIDEO NGAY', t0 + 0.2, { hint: 'Bạn hay quét QR ở đâu nhất?...' });

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
  cues.push({ k: 'tick', t: VW('hook', 'mã').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'dán').t0 });
  cues.push({ k: 'pop', t: VW('phishing', 'quét').t0 });
  cues.push({ k: 'thud', t: VW('risk', 'mất').t0 });
  cues.push({ k: 'tick', t: VW('action', 'rủi').t0 });
  cues.push({ k: 'pop', t: VW('verify', 'kiểm').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'chuyển').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'lưu').t0 });
  cues.push({ k: 'type', t: VW('cta', 'toán').t0, n: 12, d: 0.4 });
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
