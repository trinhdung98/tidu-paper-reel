// =====================================================================
//  TIDU TECH 09 — "Website có ổ khóa HTTPS đã an toàn chưa?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: HTTPS encryption vs website legitimacy, SSL certificates, phishing.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · AN TOÀN SỐ';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 09 HELPERS (t9 prefix to avoid clashes) ----

function t9Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Browser with green padlock and questionable website content
function t9BrowserWithLock(cx, cy, isWarn = false) {
  withT(cx, cy, 0, 1, () => {
    const bw = 740, bh = 420;
    // Browser frame
    pp(pR(-bw / 2, -bh / 2, bw, bh, 20), PR.creamL, { key: 't9_bframe', sb: 18, sy: 9, tex: 0.5 });
    // URL bar header
    pp(pR(-bw / 2, -bh / 2, bw, 64, 20), '#0e1d2d', { key: 't9_urlbar', shadow: false, tex: 0.35 });
    pp(pR(-bw / 2, -bh / 2 + 44, bw, 20, 0), '#0e1d2d', { shadow: false, tex: false });

    // Green lock icon and domain
    pp(pR(-bw / 2 + 25, -bh / 2 + 12, bw - 50, 42, 10), PR.techK, { key: 't9_inp', shadow: false, tex: 0.3 });
    txt('shop-giam-gia-90k.online', -bw / 2 + 50, -bh / 2 + 40, 19, PR.green, { weight: 800, font: F_MONO });
    pp(pR(bw / 2 - 165, -bh / 2 + 16, 125, 34, 6), '#143c24', { shadow: false, tex: false });
    txt('HTTPS BẢO MẬT', bw / 2 - 102, -bh / 2 + 39, 13, PR.green, { align: 'center', weight: 800 });

    // Website content
    pp(pR(-bw / 2 + 30, -bh / 2 + 90, bw - 60, 220, 14), '#f4f1e8', { key: 't9_cnt', sb: 8, sy: 4, tex: 0.3 });
    txt('SIÊU XẢ KHO GIẢM 90% TOÀN BỘ SẢN PHẨM!', 0, -bh / 2 + 140, 22, PR.red, { align: 'center', weight: 800 });
    txt('Nhập thông tin thẻ ngân hàng để nhận quà ngay...', 0, -bh / 2 + 185, 18, PR.char, { align: 'center', weight: 600 });

    if (isWarn) {
      // Red stamp overlay
      pp(pR(-260, 80, 520, 60, 12), PR.red, { key: 't9_fakebadge', sb: 10, sy: 5, tex: 0.45 });
      txt('WEB LỪA ĐẢO VẪN CÓ Ổ KHÓA!', 0, 118, 22, PR.creamL, { align: 'center', weight: 800 });
    }
  });
}

// Sealed envelope illustration for HTTPS encryption
function t9SealedEnvelope(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('HTTPS: MÃ HÓA ĐƯỜNG TRUYỀN DỮ LIỆU', 0, -180, 26, PR.glow, { align: 'center', weight: 800 });

    // Sealed envelope card
    const ew = 660, eh = 300;
    pp(pR(-ew / 2, -eh / 2, ew, eh, 18), PR.creamL, { key: 'env_body', sb: 16, sy: 8, tex: 0.45 });
    // Envelope flap lines
    ctx.save();
    ctx.strokeStyle = '#c4c8d0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-ew / 2 + 10, -eh / 2 + 10);
    ctx.lineTo(0, 10);
    ctx.lineTo(ew / 2 - 10, -eh / 2 + 10);
    ctx.stroke();
    ctx.restore();

    // Golden wax seal with lock
    pp(pE(0, 10, 48, 48), PR.mustard, { key: 'env_seal', sb: 10, sy: 5, tex: 0.4 });
    pp(pR(-8, 10, 16, 18, 4), PR.navy, { shadow: false, tex: false });
    pp(pE(0, 8, 8, 8), PR.navy, { shadow: false, tex: false });

    txt('Dữ liệu (mật khẩu, thẻ) đi trong phong bì kín', 0, 95, 22, PR.navy, { align: 'center', weight: 800 });
    txt('Hacker ở quán cà phê không thể xem trộm giữa đường.', 0, 130, 19, PR.char, { align: 'center', weight: 600 });

    // Green guarantee tag
    pp(pR(-280, 180, 560, 50, 10), '#143c24', { key: 'env_ok', sb: 6, sy: 3, tex: 0.35 });
    txt('ĐẢM BẢO: KHÔNG BỊ NGHE LÉN DỌC ĐƯỜNG', 0, 212, 18, PR.green, { align: 'center', weight: 800 });
  });
}

// Who is at the other end?
function t9DestinationCheck(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('NHƯNG: AI ĐANG CẦM PHONG BÌ ĐÓ?', 0, -180, 26, PR.mustard, { align: 'center', weight: 800 });

    // Comparison of two ends
    const sides = [
      ['BÊN BÁN CHÂN CHÍNH', 'HTTPS bảo vệ giao dịch mua bán an toàn.', PR.green],
      ['KẺ LỪA ĐẢO CHIẾM ĐOẠT', 'Kẻ lừa đảo vẫn dùng HTTPS để nhận dữ liệu kín đáo!', PR.red],
    ];

    sides.forEach(([title, desc, col], i) => {
      const sy = -90 + i * 145;
      pp(pR(-360, sy, 720, 115, 16), PR.creamL, { key: 'dst_' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-360, sy, 18, 115, 6), col, { shadow: false, tex: false });
      txt(title, -320, sy + 42, 22, PR.navy, { weight: 800 });
      txt(desc, -320, sy + 80, 18, PR.char, { weight: 600 });
    });

    txt('HTTPS không hề xác minh chủ web có lương thiện hay không!', 0, 240, 20, PR.creamD, { align: 'center', weight: 700 });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Thấy biểu tượng ổ khóa HTTPS trên website thì chắc chắn an toàn và không bị lừa đảo?
  t9Wall('hk');
  prSign('CÓ Ổ KHÓA = KHÔNG BỊ LỪA ĐẢO?', { kicker: KICK });

  t9BrowserWithLock(540, 880, false);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: 'wow',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.encryption = () => {
  // S2: HTTPS thực chất chỉ giúp mã hóa đường truyền giữa máy bạn và máy chủ.
  t9Wall('enc');
  prSign('HTTPS CHỈ MÃ HÓA ĐƯỜNG TRUYỀN', { kicker: KICK });

  t9SealedEnvelope(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'happy',
    key: 'b_enc',
    look: -25,
  });

  prChips();
};

SCENES.phishing = () => {
  // S3: Nó không đảm bảo người sở hữu trang web đó là người bán hàng lương thiện!
  t9Wall('phish');
  prSign('AI Ở ĐẦU BÊN KIA ĐƯỜNG TRUYỀN?', { kicker: KICK });

  t9DestinationCheck(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'wow',
    key: 'b_phish',
  });

  prChips();
};

SCENES.free_cert = () => {
  // S4: Ngày nay, một trang web lừa đảo hoàn toàn có thể cài chứng chỉ HTTPS miễn phí trong vài phút.
  t9Wall('free');
  prSign('CHỨNG CHỈ HTTPS MIỄN PHÍ DỄ CÀI', { kicker: KICK });

  t9BrowserWithLock(540, 880, true);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'wow',
    key: 'b_free',
    look: -25,
  });

  prChips();
};

SCENES.verify = () => {
  // S5: Vì vậy, hãy kiểm tra kỹ tên miền, nguồn link và thông tin pháp lý bên bán.
  t9Wall('vrf');
  prSign('3 BƯỚC KIỂM TRA TRƯỚC KHI MUA', { kicker: KICK });

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -220, 740, 440, 20), PR.creamL, { key: 'vrf_card', sb: 18, sy: 9, tex: 0.5 });
    txt('ĐỪNG CHỈ NHÌN Ổ KHÓA!', 0, -165, 26, PR.navy, { align: 'center', weight: 800 });

    const checks = [
      ['1. SOI KỸ TÊN MIỀN CHÍNH THỨC', 'Cảnh giác tên miền lạ (.top, .xyz, sh0pee.vn...)'],
      ['2. NGUỒN GỐC ĐƯỜNG DẪN', 'Không click vào liên kết từ tin nhắn rác, bài quảng cáo'],
      ['3. THÔNG TIN PHÁP LÝ & BẢO HÀNH', 'Có địa chỉ thật, hotline thật, đánh giá uy tín ngoài đời'],
    ];

    checks.forEach(([title, desc], i) => {
      const ry = -105 + i * 105;
      pp(pR(-330, ry, 660, 88, 12), PR.techK, { key: 'vrf_c' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(title, -300, ry + 32, 21, PR.glow, { weight: 800 });
      txt(desc, -300, ry + 64, 18, PR.creamD, { weight: 600 });
    });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_vrf',
    look: -25,
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Ổ khóa chỉ chứng nhận đường truyền kín đáo, chứ không chứng nhận website đó tử tế!
  t9Wall('ta');
  prSign('KÍN ĐÁO KHÔNG ĐỒNG NGHĨA TỬ TẾ', { kicker: KICK });

  const tStamp = VW('takeaway', 'chứng').t0;

  // Top Card: Kín đáo
  withT(540, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.blue, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.blue, { shadow: false, tex: false });
    txt('Ý NGHĨA THỰC CỦA Ổ KHÓA HTTPS', 0, -55, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Đảm bảo bạn đang nói chuyện riêng tư với máy chủ trang web.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Dữ liệu không bị đọc trộm trên đường truyền', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  // Bottom Card: Không chứng nhận tử tế
  withT(540, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.red, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.red, { shadow: false, tex: false });
    txt('KHÔNG ĐẢM BẢO CHỦ WEB LÀ AI', 0, -55, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('Kẻ lừa đảo vẫn cài được HTTPS miễn phí trong vài phút.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Đường truyền kín nhưng người nhận có thể là kẻ gian!', 0, 50, 19, PR.red, { align: 'center', weight: 800 });
  });

  prStamp('KÍN ≠ TỬ TẾ!', 540, 1160, PR.red, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Chia sẻ ngay điều này với người thân hay mua sắm online nhé!
  const t0 = E0;
  t9Wall('cta');
  prSign('CHIA SẺ CHO NGƯỜI HAY MUA ONLINE!', { kicker: KICK });

  withT(540, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('MUA SẮM ONLINE AN TOÀN', 0, -115, 28, PR.navy, { align: 'center', weight: 800 });

    const tips = [
      '• Không vội tin vào biểu tượng ổ khóa màu xanh',
      '• Đọc kỹ từng chữ cái trên thanh địa chỉ tên miền',
      '• Cảnh báo người lớn tuổi trong nhà tránh bẫy lừa đảo!',
    ];
    tips.forEach((tp, i) => {
      pp(pR(-340, -55 + i * 65, 680, 50, 10), PR.techK, { key: 'cta_tp' + i, shadow: false, tex: 0.3 });
      txt(tp, -310, -22 + i * 65, 20, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(540, 1090, 'CHIA SẺ NGAY', t0 + 0.2, { hint: 'Bạn hay mua sắm ở trang web nào?...' });

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
  cues.push({ k: 'tick', t: VW('hook', 'khóa').t0 });
  cues.push({ k: 'pop', t: VW('encryption', 'mã').t0 });
  cues.push({ k: 'thud', t: VW('phishing', 'lương').t0 });
  cues.push({ k: 'tick', t: VW('free_cert', 'miễn').t0 });
  cues.push({ k: 'pop', t: VW('verify', 'kiểm').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'chứng').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'chia').t0 });
  cues.push({ k: 'type', t: VW('cta', 'sắm').t0, n: 12, d: 0.4 });
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
