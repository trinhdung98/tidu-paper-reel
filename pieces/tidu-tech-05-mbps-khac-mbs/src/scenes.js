// =====================================================================
//  TIDU TECH 05 — "Mạng 100 Mbps sao tải không được 100 MB/s?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: Megabit vs MegaByte (Mbps vs MB/s), 1 Byte = 8 bits, network math.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · KIẾN THỨC MẠNG';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 05 HELPERS (t5 prefix to avoid clashes) ----

function t5Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Plan box and download speed meter
function t5DownloadMeter(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // ISP Plan Card (Top)
    const pw = 740, ph = 150;
    pp(pR(-pw / 2, -180, pw, ph, 18), PR.creamL, { key: 't5_plan', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-pw / 2, -180, pw, 46, 18), PR.blue, { key: 't5_planhd', shadow: false, tex: 0.3 });
    pp(pR(-pw / 2, -140, pw, 10, 0), PR.blue, { shadow: false, tex: false });
    txt('GÓI CƯỚC INTERNET GIA ĐÌNH', 0, -150, 20, PR.creamL, { align: 'center', weight: 800 });

    txt('TỐC ĐỘ GÓI: 100 Mbps', -pw / 2 + 36, -70, 34, PR.navy, { weight: 800 });
    pp(pR(pw / 2 - 200, -96, 160, 50, 10), PR.mustard, { key: 't5_adv', shadow: false, tex: 0.3 });
    txt('QUẢNG CÁO', pw / 2 - 120, -64, 18, PR.navy, { align: 'center', weight: 800 });

    // Download Speed Reality Card (Bottom)
    const dw = 740, dh = 240;
    pp(pR(-dw / 2, 20, dw, dh, 20), '#0e1d2d', { key: 't5_dl', sb: 18, sy: 9, tex: 0.45 });
    txt('TẢI FILE THỰC TẾ TRÊN MÁY:', -dw / 2 + 40, 68, 22, PR.creamL, { weight: 800 });

    // Progress bar
    pp(pR(-dw / 2 + 40, 95, dw - 80, 36, 10), PR.techK, { shadow: false, tex: 0.3 });
    pp(pR(-dw / 2 + 40, 95, (dw - 80) * 0.45, 36, 10), PR.glow, { shadow: false, tex: false });

    // Actual speed display
    txt('Tốc độ: ~ 12,5 MB/s', -dw / 2 + 40, 180, 36, PR.mustard, { weight: 800 });
    txt('(Chỉ bằng 1/8 con số 100!)', -dw / 2 + 40, 220, 20, PR.creamD, { weight: 600 });

    // Big Question Mark
    pp(pE(dw / 2 - 90, 170, 48, 48), PR.red, { key: 't5_qmark', sb: 10, sy: 5, tex: 0.4 });
    txt('?', dw / 2 - 90, 190, 54, PR.creamL, { align: 'center', weight: 800 });
  });
}

// Letter comparison: b (bit) vs B (Byte)
function t5LetterCards(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Left: b (bit)
    pp(pR(-370, -180, 350, 420, 18), PR.creamL, { key: 't5_cb', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(-370, -180, 350, 60, 18), PR.blue, { key: 't5_cb_hd', shadow: false, tex: 0.35 });
    pp(pR(-370, -130, 350, 16, 0), PR.blue, { shadow: false, tex: false });
    txt('CHỮ THƯỜNG', -195, -142, 22, PR.creamL, { align: 'center', weight: 800 });

    txt('b', -195, -20, 110, PR.blue, { align: 'center', weight: 800 });
    txt('bit (megabit)', -195, 45, 26, PR.navy, { align: 'center', weight: 800 });
    txt('Nhà mạng dùng để ghi', -195, 110, 19, PR.char, { align: 'center', weight: 600 });
    txt('tốc độ đường truyền!', -195, 142, 19, PR.char, { align: 'center', weight: 600 });

    // Right: B (Byte)
    pp(pR(20, -180, 350, 420, 18), PR.creamL, { key: 't5_cB', sb: 16, sy: 8, tex: 0.5 });
    pp(pR(20, -180, 350, 60, 18), PR.mustard, { key: 't5_cB_hd', shadow: false, tex: 0.35 });
    pp(pR(20, -130, 350, 16, 0), PR.mustard, { shadow: false, tex: false });
    txt('CHỮ HOA', 195, -142, 22, PR.navy, { align: 'center', weight: 800 });

    txt('B', 195, -20, 110, PR.mustard, { align: 'center', weight: 800 });
    txt('Byte (megabyte)', 195, 45, 26, PR.navy, { align: 'center', weight: 800 });
    txt('Máy tính dùng để ghi', 195, 110, 19, PR.char, { align: 'center', weight: 600 });
    txt('dung lượng file tải về!', 195, 142, 19, PR.char, { align: 'center', weight: 600 });
  });
}

// 8 bits = 1 Byte conversion formula
function t5MathConversion(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('QUY TẮC QUY ĐỔI BẤT BIẾN:', 0, -180, 26, PR.glow, { align: 'center', weight: 800 });

    // 8 bits grid
    const bw = 70, gap = 12;
    for (let i = 0; i < 8; i++) {
      const bx = -315 + i * (bw + gap);
      pp(pR(bx, -120, bw, 80, 10), PR.creamL, { key: 't5_bit' + i, sb: 8, sy: 4, tex: 0.4 });
      txt('1 bit', bx + bw / 2, -72, 19, PR.navy, { align: 'center', weight: 800 });
    }

    // Bracket gathering into 1 Byte
    pp(pR(-10, -18, 20, 28, 2), PR.mustard, { shadow: false, tex: false });
    pp(pR(-20, 10, 40, 10, 2), PR.mustard, { shadow: false, tex: false });
    pp(pE(0, 26, 20, 14), PR.mustard, { shadow: false, tex: false });
    pp(pR(-280, 30, 560, 70, 14), PR.mustard, { key: 't5_1byte', sb: 12, sy: 6, tex: 0.5 });
    txt('8 bits = 1 Byte (B = 8b)', 0, 75, 30, PR.navy, { align: 'center', weight: 800 });

    // Math calculation box
    pp(pR(-340, 135, 680, 110, 16), '#0e1d2d', { key: 't5_calc', sb: 12, sy: 6, tex: 0.45 });
    txt('PHÉP TÍNH: 100 Mbps ÷ 8 = 12,5 MB/s', 0, 180, 26, PR.glow, { align: 'center', weight: 800, font: F_MONO });
    txt('Tốc độ tối đa trên lý thuyết của gói 100 Mbps', 0, 218, 19, PR.creamD, { align: 'center', weight: 600 });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Gói mạng 100 Mbps, nhưng tại sao tải file chỉ được khoảng 12 megabyte mỗi giây?
  t5Wall('hk');
  prSign('100 Mbps SAO TẢI ĐƯỢC 12 MB/s?', { kicker: KICK });

  t5DownloadMeter(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'wow',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.difference = () => {
  // S2: Vì 100 Mbps là một trăm megabit, không phải một trăm megabyte.
  t5Wall('diff');
  prSign('MEGABIT KHÁC MEGABYTE!', { kicker: KICK });

  const tDiff = VW('difference', 'không').t0;

  // Comparison statement card
  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 20), PR.creamL, { key: 'diff_card', sb: 18, sy: 9, tex: 0.5 });
    txt('HAI ĐƠN VỊ HOÀN TOÀN KHÁC NHAU', 0, -145, 26, PR.navy, { align: 'center', weight: 800 });

    // Row 1: Mbps
    pp(pR(-320, -90, 640, 110, 14), PR.techK, { key: 'diff_r1', shadow: false, tex: 0.3 });
    txt('Mbps = Mega-BIT mỗi giây', -280, -45, 24, PR.glow, { weight: 800 });
    txt('Chữ "b" nhỏ — Đơn vị đo đường truyền mạng', -280, -15, 19, PR.creamD, { weight: 600 });

    // Row 2: MB/s
    pp(pR(-320, 45, 640, 110, 14), PR.techK, { key: 'diff_r2', shadow: false, tex: 0.3 });
    txt('MB/s = Mega-BYTE mỗi giây', -280, 90, 24, PR.mustard, { weight: 800 });
    txt('Chữ "B" HOA — Đơn vị đo dung lượng file', -280, 120, 19, PR.creamD, { weight: 600 });
  });

  prStamp('KHÁC NHAU GẤP 8 LẦN!', 540, 1180, PR.red, tDiff, { size: 36, from: 1.25, rot: -0.05 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: 'happy',
    key: 'b_diff',
    look: -25,
  });

  prChips();
};

SCENES.units = () => {
  // S3: Bit viết bằng chữ b thường, còn byte viết bằng chữ B hoa.
  t5Wall('units');
  prSign('PHÂN BIỆT: CHỮ b VÀ CHỮ B', { kicker: KICK });

  t5LetterCards(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_units',
    look: -25,
  });

  prChips();
};

SCENES.math = () => {
  // S4: Cứ tám bit mới ghép thành một byte. Lấy 100 chia 8, bạn chỉ còn 12,5 megabyte mỗi giây lý thuyết.
  const t0 = E0;
  t5Wall('math');
  prSign('CÔNG THỨC: 1 BYTE = 8 BITS', { kicker: KICK });

  t5MathConversion(540, 880, t0);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_math',
    look: -30,
  });

  prChips();
};

SCENES.overhead = () => {
  // S5: Tốc độ thực tế còn thấp hơn do giao thức truyền tải và máy chủ.
  t5Wall('ovh');
  prSign('VÌ SAO THỰC TẾ CÒN THẤP HƠN?', { kicker: KICK });

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -220, 740, 440, 20), PR.creamL, { key: 'ovh_card', sb: 18, sy: 9, tex: 0.5 });
    txt('CÁC YẾU TỐ LÀM GIẢM TỐC ĐỘ TẢI', 0, -165, 26, PR.navy, { align: 'center', weight: 800 });

    const factors = [
      ['Giao thức mạng (TCP/IP Overhead)', 'Dữ liệu kiểm tra gói tin chiếm khoảng 5-10% băng thông.'],
      ['Tắc nghẽn giờ cao điểm', 'Nhiều người dùng chung hạ tầng làm suy hao tốc độ.'],
      ['Giới hạn máy chủ nguồn', 'Server chứa file không cho phép tải ở tốc độ tối đa.'],
    ];

    factors.forEach(([title, desc], i) => {
      const fy = -110 + i * 110;
      pp(pR(-330, fy, 660, 90, 12), PR.techK, { key: 'ovh_f' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(title, -300, fy + 32, 21, PR.mustard, { weight: 800 });
      txt(desc, -300, fy + 65, 18, PR.creamD, { weight: 600 });
    });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'flat',
    key: 'b_ovh',
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Nhớ kỹ nhé: Chữ b nhỏ là của nhà mạng, chữ B lớn mới là dung lượng file tải về!
  t5Wall('ta');
  prSign('QUY TẮC VÀNG: CHIA CHO 8', { kicker: KICK });

  const tStamp = VW('takeaway', 'nhỏ').t0;

  // Top Card: b nhỏ
  withT(540, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.blue, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.blue, { shadow: false, tex: false });
    txt('CHỮ "b" NHỎ: NHÀ MẠNG QUẢNG CÁO', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('Đo bằng Megabit (Mbps) để số trông to và hấp dẫn hơn.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Ví dụ: Gói 100 Mbps, 300 Mbps, 1 Gbps', 0, 50, 19, PR.blue, { align: 'center', weight: 800 });
  });

  // Bottom Card: B lớn
  withT(540, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.mustard, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.mustard, { shadow: false, tex: false });
    txt('CHỮ "B" HOA: TẢI FILE THỰC TẾ', 0, -55, 26, PR.navy, { align: 'center', weight: 800 });
    txt('Đo bằng MegaByte (MB/s). Lấy tốc độ mạng CHIA CHO 8!', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('100 Mbps ÷ 8 = 12,5 MB/s (Thực tế ~ 10-12 MB/s)', 0, 50, 19, PR.red, { align: 'center', weight: 800 });
  });

  prStamp('CHIA CHO 8!', 540, 1160, PR.red, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Bạn đang dùng gói mạng bao nhiêu Mbps ở nhà? Bình luận bên dưới nhé!
  const t0 = E0;
  t5Wall('cta');
  prSign('BẠN ĐANG DÙNG GÓI MẠNG NÀO?', { kicker: KICK });

  withT(540, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('THỬ TÍNH TỐC ĐỘ MẠNG NHÀ BẠN', 0, -115, 28, PR.navy, { align: 'center', weight: 800 });

    const speeds = [
      ['• Gói 150 Mbps:', 'Tải file tối đa ~ 18,7 MB/s'],
      ['• Gói 300 Mbps:', 'Tải file tối đa ~ 37,5 MB/s'],
      ['• Gói 1 Gbps (1000 Mbps):', 'Tải file tối đa ~ 125 MB/s'],
    ];

    speeds.forEach(([pkg, act], i) => {
      const py = -55 + i * 65;
      pp(pR(-330, py, 660, 50, 10), PR.techK, { key: 'cta_sp' + i, shadow: false, tex: 0.3 });
      txt(pkg, -300, py + 34, 20, PR.glow, { weight: 800 });
      txt(act, 60, py + 34, 20, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(540, 1090, 'BÌNH LUẬN GÓI MẠNG', t0 + 0.2, { hint: 'Mạng nhà bạn tải được bao nhiêu MB/s?...' });

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
  cues.push({ k: 'tick', t: VW('hook', 'gói').t0 });
  cues.push({ k: 'thud', t: VW('difference', 'không').t0 });
  cues.push({ k: 'pop', t: VW('units', 'thường').t0 });
  cues.push({ k: 'tick', t: VW('math', 'tám').t0 });
  cues.push({ k: 'thud', t: VW('overhead', 'thực').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'nhỏ').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'dùng').t0 });
  cues.push({ k: 'type', t: VW('cta', 'luận').t0, n: 12, d: 0.4 });
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
