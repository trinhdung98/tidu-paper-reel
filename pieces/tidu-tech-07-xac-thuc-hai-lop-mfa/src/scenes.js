// =====================================================================
//  TIDU TECH 07 — "Có mật khẩu rồi, tại sao cần xác thực hai lớp?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: Two-Factor Authentication (2FA/MFA), phishing resistance, passkeys.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · AN TOÀN SỐ';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 07 HELPERS (t7 prefix to avoid clashes) ----

function t7Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Door with Lock and Key illustration
function t7VaultDoors(cx, cy, o = {}) {
  withT(cx, cy, 0, 1, () => {
    // Door 1: Password Lock (Left)
    withT(-180, 0, 0, 1, () => {
      pp(pR(-150, -200, 300, 400, 16), PR.creamL, { key: 'd1_bg', sb: 14, sy: 7, tex: 0.45 });
      pp(pR(-150, -200, 300, 54, 16), PR.blue, { key: 'd1_hd', shadow: false, tex: 0.3 });
      pp(pR(-150, -160, 300, 14, 0), PR.blue, { shadow: false, tex: false });
      txt('LỚP 1: MẬT KHẨU', 0, -165, 20, PR.creamL, { align: 'center', weight: 800 });

      // Password input dots
      pp(pR(-120, -70, 240, 56, 10), PR.techK, { key: 'd1_inp', shadow: false, tex: 0.3 });
      txt('••••••••••••', 0, -32, 26, PR.creamL, { align: 'center', weight: 800 });

      // Lock status
      if (o.keyStolen) {
        pp(pE(0, 50, 40, 40), PR.red, { key: 'd1_lck', sb: 8, sy: 4, tex: 0.4 });
        pp(pR(-18, 42, 36, 30, 6), PR.creamL, { shadow: false, tex: false });
        pp(pR(-6, 28, 24, 18, 4), PR.creamL, { shadow: false, tex: false });
        txt('ĐÃ BỊ LỘ!', 0, 130, 22, PR.red, { align: 'center', weight: 800 });
      } else {
        pp(pE(0, 50, 40, 40), PR.techK, { key: 'd1_lck', sb: 8, sy: 4, tex: 0.4 });
        pp(pR(-18, 42, 36, 30, 6), PR.creamL, { shadow: false, tex: false });
        pp(pE(0, 36, 14, 12), PR.creamL, { shadow: false, tex: false });
        txt('KHÓA 1', 0, 130, 22, PR.navy, { align: 'center', weight: 800 });
      }
    });

    // Door 2: MFA Lock (Right)
    withT(180, 0, 0, 1, () => {
      pp(pR(-150, -200, 300, 400, 16), PR.creamL, { key: 'd2_bg', sb: 14, sy: 7, tex: 0.45 });
      pp(pR(-150, -200, 300, 54, 16), PR.mustard, { key: 'd2_hd', shadow: false, tex: 0.3 });
      pp(pR(-150, -160, 300, 14, 0), PR.mustard, { shadow: false, tex: false });
      txt('LỚP 2: XÁC THỰC MFA', 0, -165, 20, PR.navy, { align: 'center', weight: 800 });

      // 6-digit OTP code box
      pp(pR(-120, -70, 240, 56, 10), '#0e1d2d', { key: 'd2_inp', shadow: false, tex: 0.3 });
      txt('4 8 2  9 1 0', 0, -32, 24, PR.glow, { align: 'center', weight: 800, font: F_MONO });

      // Security Shield status
      pp(pE(0, 50, 40, 40), PR.green, { key: 'd2_lck', sb: 8, sy: 4, tex: 0.4 });
      pp(pR(-18, 42, 36, 36, 6), PR.creamL, { shadow: false, tex: false });
      pp(pE(0, 80, 18, 10), PR.creamL, { shadow: false, tex: false });
      txt('BẢO VỆ TUYỆT ĐỐI', 0, 130, 20, PR.green, { align: 'center', weight: 800 });
    });
  });
}

// 3 Types of 2FA Methods ranked
function t7MethodRanks(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('XẾP HẠNG CÁC PHƯƠNG THỨC XÁC THỰC', 0, -180, 26, PR.glow, { align: 'center', weight: 800 });

    const ranks = [
      ['PASSKEY / KHÓA BẢO MẬT VẬT LÝ', 'Chống lừa đảo tuyệt đối (Phishing-resistant)', PR.green],
      ['ỨNG DỤNG AUTHENTICATOR', 'Google / Microsoft Authenticator (Mã đổi mỗi 30s)', PR.blue],
      ['TIN NHẮN SMS OTP', 'Dễ bị tấn công tráo SIM / mã độc đọc trộm', PR.mustard],
    ];

    ranks.forEach(([title, desc, col], i) => {
      const ry = -105 + i * 130;
      pp(pR(-360, ry, 720, 105, 14), PR.creamL, { key: 'rnk_' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-360, ry, 18, 105, 6), col, { shadow: false, tex: false });
      txt(title, -320, ry + 38, 20, PR.navy, { weight: 800 });
      txt(desc, -320, ry + 74, 18, PR.char, { weight: 600 });
    });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Mật khẩu mạnh đến mấy vẫn có thể bị lộ qua các vụ rò rỉ dữ liệu hoặc trang web giả mạo.
  t7Wall('hk');
  prSign('MẬT KHẨU MẠNH VẪN BỊ LỘ?', { kicker: KICK });

  const tLeak = VW('hook', 'lộ').t0;
  const isLeaked = TT >= tLeak;

  t7VaultDoors(540, 880, { keyStolen: isLeaked });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: isLeaked ? 'wow' : 'neutral',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.mfa = () => {
  // S2: Xác thực hai lớp, hay MFA, sinh ra để bổ sung một cánh cửa bảo vệ thứ hai.
  t7Wall('mfa');
  prSign('XÁC THỰC HAI LỚP (MFA)', { kicker: KICK });

  t7VaultDoors(540, 880, { keyStolen: true });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'happy',
    key: 'b_mfa',
    look: -25,
  });

  prChips();
};

SCENES.step = () => {
  // S3: Sau khi điền mật khẩu, bạn phải xác nhận thêm bằng mã ứng dụng hoặc khóa bảo mật.
  t7Wall('step');
  prSign('BƯỚC 2: XÁC MINH DANH TÍNH', { kicker: KICK });

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 20), PR.creamL, { key: 'step_card', sb: 18, sy: 9, tex: 0.5 });
    txt('QUY TRÌNH ĐĂNG NHẬP 2 BƯỚC', 0, -145, 26, PR.navy, { align: 'center', weight: 800 });

    const steps = [
      ['Bước 1: Điền mật khẩu', 'Xác nhận điều bạn BIẾT (Something you know)'],
      ['Bước 2: Mã OTP / Vân tay', 'Xác nhận thứ bạn CÓ (Something you have)'],
    ];

    steps.forEach(([st, desc], i) => {
      const sy = -80 + i * 115;
      pp(pR(-330, sy, 660, 90, 12), PR.techK, { key: 'st_box' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(st, -300, sy + 32, 22, PR.glow, { weight: 800 });
      txt(desc, -300, sy + 64, 18, PR.creamD, { weight: 600 });
    });

    txt('Kẻ gian chỉ có mật khẩu sẽ bị chặn ngay tại Bước 2!', 0, 185, 20, PR.green, { align: 'center', weight: 800 });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_step',
    look: -25,
  });

  prChips();
};

SCENES.blocked = () => {
  // S4: Dù kẻ gian có được mật khẩu của bạn, chúng vẫn lập tức bị chặn đứng ở vòng này.
  t7Wall('blk');
  prSign('KẺ GIAN BỊ CHẶN ĐỨNG!', { kicker: KICK });

  const tBlk = VW('blocked', 'chặn').t0;

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 20), PR.creamL, { key: 'blk_card', sb: 18, sy: 9, tex: 0.5 });
    txt('TÌNH HUỐNG KẺ GIAN ĐÁNH CẮP ĐƯỢC MẬT KHẨU', 0, -145, 22, PR.char, { align: 'center', weight: 800 });

    pp(pR(-320, -90, 640, 80, 12), PR.red, { key: 'blk_st', shadow: false, tex: 0.3 });
    txt('Kẻ gian có mật khẩu của bạn: nguyen_a@123', 0, -42, 20, PR.creamL, { align: 'center', weight: 700 });

    // Blocked barrier
    pp(pR(-320, 20, 640, 130, 14), '#102030', { key: 'blk_shield', sb: 8, sy: 4, tex: 0.4 });
    txt('HỆ THỐNG YÊU CẦU: NHẬP MÃ TỪ ĐIỆN THOẠI CỦA BẠN!', 0, 65, 20, PR.mustard, { align: 'center', weight: 800 });
    txt('Kẻ gian không cầm điện thoại của bạn -> BỊ CHẶN HOÀN TOÀN!', 0, 110, 18, PR.green, { align: 'center', weight: 800 });
  });

  prStamp('CHẶN ĐỨNG TRUY CẬP!', 540, 1180, PR.red, tBlk, { size: 36, from: 1.25, rot: -0.05 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'wow',
    key: 'b_blk',
  });

  prChips();
};

SCENES.methods = () => {
  // S5: Tuy nhiên, hãy ưu tiên dùng ứng dụng Authenticator hoặc Passkey thay vì tin nhắn SMS.
  t7Wall('mth');
  prSign('ƯU TIÊN PASSKEY & AUTHENTICATOR', { kicker: KICK });

  t7MethodRanks(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_mth',
    look: -30,
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Hai lớp khóa luôn an toàn hơn một: Đừng để mật khẩu gánh vác toàn bộ tài sản số của bạn!
  t7Wall('ta');
  prSign('HAI LỚP KHÓA LUÔN TỐT HƠN MỘT', { kicker: KICK });

  const tStamp = VW('takeaway', 'khóa').t0;

  // Top Card: Chỉ mật khẩu
  withT(540, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.red, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.red, { shadow: false, tex: false });
    txt('CHỈ DÙNG MỖI MẬT KHẨU (1 LỚP)', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Lộ mật khẩu qua phishing hoặc data leak = MẤT TÀI KHOẢN.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Toàn bộ tài sản số bị đe dọa!', 0, 50, 19, PR.red, { align: 'center', weight: 800 });
  });

  // Bottom Card: Có MFA
  withT(540, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.green, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.green, { shadow: false, tex: false });
    txt('BẬT XÁC THỰC HAI LỚP (MFA)', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Lộ mật khẩu vẫn an toàn vì kẻ gian không có lớp khóa thứ 2.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Giảm tới 99% nguy cơ bị chiếm quyền tài khoản!', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  prStamp('BẬT MFA NGAY!', 540, 1160, PR.green, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Kiểm tra ngay email chính của bạn đã bật xác thực hai lớp chưa nhé!
  const t0 = E0;
  t7Wall('cta');
  prSign('KIỂM TRA BẢO MẬT NGAY HÔM NAY!', { kicker: KICK });

  withT(540, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('3 TÀI KHOẢN CẦN BẬT MFA NGAY', 0, -115, 28, PR.navy, { align: 'center', weight: 800 });

    const accs = [
      '1. Email chính (Gmail, Outlook, iCloud) — Chìa khóa mọi tài khoản!',
      '2. Tài khoản ngân hàng, ví điện tử, sàn thương mại',
      '3. Mạng xã hội (Facebook, Zalo, Telegram, TikTok)',
    ];
    accs.forEach((ac, i) => {
      pp(pR(-340, -55 + i * 65, 680, 50, 10), PR.techK, { key: 'cta_ac' + i, shadow: false, tex: 0.3 });
      txt(ac, -310, -22 + i * 65, 19, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(540, 1090, 'BẬT MFA NGAY', t0 + 0.2, { hint: 'Email của bạn đã bật MFA chưa?...' });

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
  cues.push({ k: 'tick', t: VW('hook', 'mật').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'lộ').t0 });
  cues.push({ k: 'pop', t: VW('mfa', 'cửa').t0 });
  cues.push({ k: 'tick', t: VW('step', 'mã').t0 });
  cues.push({ k: 'thud', t: VW('blocked', 'chặn').t0 });
  cues.push({ k: 'pop', t: VW('methods', 'ưu').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'khóa').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'kiểm').t0 });
  cues.push({ k: 'type', t: VW('cta', 'email').t0, n: 12, d: 0.4 });
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
