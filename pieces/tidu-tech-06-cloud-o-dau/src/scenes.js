// =====================================================================
//  TIDU TECH 06 — "Cloud thực sự nằm ở đâu?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: Cloud storage architecture, physical datacenters, multi-region backup.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · HẠ TẦNG SỐ';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH 06 HELPERS (t6 prefix to avoid clashes) ----

function t6Wall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  prCircuit(380, 310, 320, 140, key + '_cT');
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
}

// Paper Cloud with floating photo card
function t6CloudHero(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Fluffy cloud made of circles
    const cloudCol = PR.creamL;
    pp(pE(0, -40, 150, 90), cloudCol, { key: 'cld_m', sb: 18, sy: 9, tex: 0.45 });
    pp(pE(-110, -10, 90, 75), cloudCol, { key: 'cld_l', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(110, -10, 90, 75), cloudCol, { key: 'cld_r', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-50, -85, 80, 70), cloudCol, { key: 'cld_tl', shadow: false, tex: 0.4 });
    pp(pE(60, -85, 75, 65), cloudCol, { key: 'cld_tr', shadow: false, tex: 0.4 });

    // Cloud label
    txt('THE CLOUD', 0, -40, 32, PR.navy, { align: 'center', weight: 800 });

    // Floating polaroid photo
    const py = 120 + Math.sin(TT * 4) * 14;
    withT(0, py, -0.05, 1, () => {
      pp(pR(-90, -110, 180, 220, 12), PR.creamL, { key: 'cld_photo', sb: 16, sy: 8, tex: 0.5 });
      // Picture inside
      pp(pR(-75, -95, 150, 140, 6), PR.blue, { shadow: false, tex: 0.3 });
      txt('ẢNH KỶ NIỆM', 0, -20, 18, PR.creamL, { align: 'center', weight: 800 });
      txt('Đang tải lên cloud...', 0, 85, 15, PR.char, { align: 'center', weight: 700 });
    });

    // Red X over the literal cloud idea
    txt('KHÔNG HỀ BAY LÊN TRỜI!', 0, 290, 26, PR.red, { align: 'center', weight: 800 });
  });
}

// Physical Datacenter building with server racks inside
function t6Datacenter(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    const dw = 740, dh = 440;
    // Building exterior frame
    pp(pR(-dw / 2, -dh / 2, dw, dh, 18), PR.char, { key: 'dc_bld', sb: 18, sy: 9, tex: 0.45 });
    // Roof / header
    pp(pR(-dw / 2, -dh / 2, dw, 60, 18), PR.techK, { key: 'dc_roof', shadow: false, tex: 0.35 });
    pp(pR(-dw / 2, -dh / 2 + 40, dw, 20, 0), PR.techK, { shadow: false, tex: false });
    txt('TRUNG TÂM DỮ LIỆU VẬT LÝ (DATA CENTER)', 0, -dh / 2 + 42, 22, PR.glow, { align: 'center', weight: 800 });

    // 3 Server rack rows
    [-1, 0, 1].forEach((d) => {
      const rx = d * 225, ry = 10;
      pp(pR(rx - 95, ry - 140, 190, 310, 12), '#102030', { key: 'dc_rack' + d, sb: 8, sy: 4, tex: 0.4 });
      // Server shelves with blinking LED dots
      for (let s = 0; s < 5; s++) {
        const sy = ry - 120 + s * 55;
        pp(pR(rx - 80, sy, 160, 44, 6), PR.techK, { shadow: false, tex: 0.3 });
        // LED dots
        for (let l = 0; l < 4; l++) {
          const blink = Math.sin(TT * 6 + d * 3 + s * 2 + l) > 0;
          pp(pE(rx - 60 + l * 20, sy + 22, 4, 4), blink ? PR.glow : PR.green, { shadow: false, tex: false });
        }
      }
    });

    txt('Hàng nghìn máy chủ hoạt động 24/7 với hệ thống làm mát', 0, dh / 2 + 40, 20, PR.creamD, { align: 'center', weight: 600 });
  });
}

// 3 redundant backup copies across regions
function t6BackupCopies(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    txt('SAO LƯU DỰ PHÒNG ĐA VÙNG (REDUNDANCY)', 0, -180, 26, PR.glow, { align: 'center', weight: 800 });

    const centers = [
      ['TRUNG TÂM VIỆT NAM', 'Bản sao 1: Phục vụ truy cập siêu nhanh'],
      ['TRUNG TÂM SINGAPORE', 'Bản sao 2: Dự phòng khu vực Đông Nam Á'],
      ['TRUNG TÂM HOA KỲ', 'Bản sao 3: Lưu trữ an toàn tuyệt đối'],
    ];

    centers.forEach(([title, desc], i) => {
      const cy_i = -100 + i * 135;
      pp(pR(-360, cy_i, 720, 110, 16), PR.creamL, { key: 'bk_' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-360, cy_i, 18, 110, 6), PR.green, { shadow: false, tex: false });
      txt(title, -320, cy_i + 40, 22, PR.navy, { weight: 800 });
      txt(desc, -320, cy_i + 76, 18, PR.char, { weight: 600 });
      // Shield check
      pp(pE(310, cy_i + 55, 24, 24), '#143c24', { shadow: false, tex: 0.3 });
      pp(pR(298, cy_i + 48, 24, 28, 4), PR.green, { shadow: false, tex: false });
      pp(pE(310, cy_i + 56, 8, 6), PR.creamL, { shadow: false, tex: false });
    });
  });
}

// Multi-device sync illustration
function t6DeviceSync(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Center server hub
    pp(pE(0, -40, 70, 70), PR.techK, { key: 'hub_bg', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(0, -38, 32, 22), PR.glow, { key: 'hub_cld_m', sb: 6, sy: 3, tex: 0.3 });
    pp(pE(-22, -28, 20, 16), PR.glow, { shadow: false, tex: 0.3 });
    pp(pE(22, -28, 20, 16), PR.glow, { shadow: false, tex: 0.3 });
    txt('DỮ LIỆU ĐÁM MÂY', 0, 65, 22, PR.glow, { align: 'center', weight: 800 });

    // 3 Devices connected
    const devs = [
      ['ĐIỆN THOẠI CŨ', -240, 180],
      ['MÁY TÍNH XÁCH TAY', 0, 180],
      ['ĐIỆN THOẠI MỚI', 240, 180],
    ];

    devs.forEach(([name, dx, dy], i) => {
      // Dotted connector line
      ctx.save();
      ctx.strokeStyle = PR.glow;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(dx, dy - 50);
      ctx.stroke();
      ctx.restore();

      pp(pR(dx - 100, dy - 40, 200, 90, 12), PR.creamL, { key: 'dev_' + i, sb: 10, sy: 5, tex: 0.45 });
      txt(name, dx, dy, 16, PR.navy, { align: 'center', weight: 800 });
      txt('Cùng xem 1 bức ảnh!', dx, dy + 28, 14, PR.green, { align: 'center', weight: 700 });
    });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Khi bạn lưu một bức ảnh lên cloud, nó không hề bay vào một đám mây thật.
  t6Wall('hk');
  prSign('LƯU LÊN CLOUD: NẰM Ở ĐÂU?', { kicker: KICK });

  t6CloudHero(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: 'wow',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.datacenter = () => {
  // S2: Dữ liệu được lưu trên các hệ thống máy chủ vật lý, đặt trong các trung tâm dữ liệu khổng lồ.
  t6Wall('dc');
  prSign('TRUNG TÂM DỮ LIỆU (DATA CENTER)', { kicker: KICK });

  t6Datacenter(540, 860);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: 'happy',
    key: 'b_dc',
    look: -25,
  });

  prChips();
};

SCENES.connection = () => {
  // S3: Thiết bị của bạn kết nối qua Internet để gửi hoặc lấy dữ liệu về.
  t6Wall('conn');
  prSign('KẾT NỐI QUA MẠNG INTERNET', { kicker: KICK });

  withT(540, 840, 0, 1, () => {
    pp(pR(-370, -200, 740, 420, 20), PR.creamL, { key: 'conn_card', sb: 18, sy: 9, tex: 0.5 });
    txt('QUY TRÌNH GỬI VÀ NHẬN DỮ LIỆU', 0, -145, 26, PR.navy, { align: 'center', weight: 800 });

    const steps = [
      ['1. Bạn chụp ảnh', 'Ảnh nằm trong bộ nhớ điện thoại'],
      ['2. Gửi qua Internet', 'Dữ liệu mã hóa truyền qua cáp quang'],
      ['3. Lưu vào máy chủ', 'Ghi vào ổ cứng trung tâm dữ liệu'],
    ];

    steps.forEach(([st, desc], i) => {
      const sy = -75 + i * 85;
      pp(pR(-330, sy, 660, 68, 12), PR.techK, { key: 'conn_st' + i, sb: 4, sy: 2, tex: 0.3 });
      txt(st, -300, sy + 30, 21, PR.glow, { weight: 800 });
      txt(desc, -300, sy + 56, 17, PR.creamD, { weight: 600 });
    });

    txt('Bất cứ khi nào cần: Tải ngược từ server về máy!', 0, 190, 20, PR.green, { align: 'center', weight: 800 });
  });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_conn',
    look: -25,
  });

  prChips();
};

SCENES.backup = () => {
  // S4: Các dịch vụ còn lưu nhiều bản sao ở các nơi khác nhau để đảm bảo an toàn tuyệt đối.
  t6Wall('bk');
  prSign('LƯU NHIỀU BẢN SAO DỰ PHÒNG', { kicker: KICK });

  t6BackupCopies(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_bk',
    look: -30,
  });

  prChips();
};

SCENES.sync = () => {
  // S5: Nhờ vậy, bạn đổi sang điện thoại mới hay mở máy tính vẫn xem được cùng một bức ảnh.
  t6Wall('sync');
  prSign('ĐỒNG BỘ MỌI THIẾT BỊ TỨC THÌ', { kicker: KICK });

  t6DeviceSync(540, 880);

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: 'happy',
    key: 'b_sync',
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Cloud thực chất là máy tính của người khác được bạn thuê dùng qua Internet!
  t6Wall('ta');
  prSign('BẢN CHẤT CỦA ĐÁM MÂY (CLOUD)', { kicker: KICK });

  const tStamp = VW('takeaway', 'người').t0;

  // Top Card: Cloud là gì
  withT(540, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.blue, { key: 'ta_c1_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.blue, { shadow: false, tex: false });
    txt('BẢN CHẤT CỦA "ĐÁM MÂY"', 0, -55, 26, PR.creamL, { align: 'center', weight: 800 });
    txt('"There is no cloud, it is just someone else\'s computer."', 0, 12, 21, PR.navy, { align: 'center', weight: 700 });
    txt('Đơn giản là máy tính của công ty khác (Google, Apple, AWS)', 0, 50, 19, PR.green, { align: 'center', weight: 800 });
  });

  // Bottom Card: Lợi ích
  withT(540, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.creamL, { key: 'ta_c2', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-380, -90, 760, 52, 18), PR.mustard, { key: 'ta_c2_hd', shadow: false, tex: 0.4 });
    pp(pR(-380, -56, 760, 18, 0), PR.mustard, { shadow: false, tex: false });
    txt('VÌ SAO BẠN NÊN DÙNG CLOUD?', 0, -55, 26, PR.navy, { align: 'center', weight: 800 });
    txt('Mất điện thoại không sợ mất dữ liệu hay ảnh kỷ niệm.', 0, 12, 21, PR.char, { align: 'center', weight: 600 });
    txt('Hạ tầng bảo vệ chuyên nghiệp với chi phí rẻ!', 0, 50, 19, PR.blue, { align: 'center', weight: 800 });
  });

  prStamp('MÁY CHỦ THỰC TẾ!', 540, 1160, PR.mustard, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Bạn có muốn khám phá bên trong một trung tâm dữ liệu không? Bình luận bên dưới nhé!
  const t0 = E0;
  t6Wall('cta');
  prSign('BẠN CÓ MUỐN KHÁM PHÁ THÊM?', { kicker: KICK });

  withT(540, 760, 0, 1, () => {
    pp(pR(-380, -180, 760, 360, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('TRUNG TÂM DỮ LIỆU CÓ GÌ ĐẶC BIỆT?', 0, -115, 28, PR.navy, { align: 'center', weight: 800 });

    const facts = [
      '• Hệ thống làm mát bằng chất lỏng & gió khổng lồ',
      '• Máy phát điện diesel dự phòng khi mất điện lưới',
      '• An ninh nghiêm ngặt nhiều lớp với máy quét sinh trắc học',
    ];
    facts.forEach((fc, i) => {
      pp(pR(-340, -55 + i * 65, 680, 50, 10), PR.techK, { key: 'cta_fc' + i, shadow: false, tex: 0.3 });
      txt(fc, -310, -22 + i * 65, 20, PR.creamL, { weight: 700 });
    });
  });

  prCommentBox(540, 1090, 'BÌNH LUẬN "CLOUD"', t0 + 0.2, { hint: 'Bạn dùng cloud nào: iCloud hay Drive?...' });

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
  cues.push({ k: 'tick', t: VW('hook', 'lưu').t0 });
  cues.push({ k: 'pop', t: VW('datacenter', 'máy').t0 });
  cues.push({ k: 'tick', t: VW('connection', 'gửi').t0 });
  cues.push({ k: 'chime', t: VW('backup', 'toàn').t0 });
  cues.push({ k: 'pop', t: VW('sync', 'đổi').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'người').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'khám').t0 });
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
