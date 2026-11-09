// =====================================================================
//  TIDU TECH 01 — "Có Wi-Fi nhưng không có Internet?"
//  One scene per voice line. Mascot: botty (Tidu Tech robot).
//  Theme: Everyday Tech, Wi-Fi vs Internet distinction, network topology.
// =====================================================================
BOTTY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BOTTY_X = 880, BOTTY_Y = 1790;
const KICK = 'TIDU TECH · KIẾN THỨC CÔNG NGHỆ';
const WALL = '#142235';
const SCENES = {};

// ---- CUSTOM TIDU TECH HELPERS (tt prefix to avoid clashes) ----

function ttWall(key) {
  prWall(WALL, { panel: 'rgba(255,255,255,0.03)', streak: false });
  // Corner and background circuit traces
  prCircuit(30, 310, 260, 280, key + '_cL');
  prCircuit(790, 310, 260, 280, key + '_cR');
  // Dark tech floor
  prFloor(1640, PR.techK, { trim: false });
  pp(pR(-40, 1636, W + 80, 8, 2), PR.glow, { shadow: false, tex: false });
  // Extra top-corner circuit nodes
  prCircuit(380, 310, 320, 140, key + '_cT');
}

// A paper smartphone with screen, Wi-Fi status bars, and browser
function ttPhone(cx, cy, s = 1, o = {}) {
  withT(cx, cy, o.rot ?? 0, s, () => {
    const pw = 360, ph = 640;
    // Outer phone chassis
    pp(pR(-pw / 2, -ph / 2, pw, ph, 36), PR.char, { key: (o.key ?? 'ph') + '_body', sb: 22, sy: 11, tex: 0.4 });
    // Screen bezel
    pp(pR(-pw / 2 + 16, -ph / 2 + 18, pw - 32, ph - 36, 24), '#0d1724', { key: (o.key ?? 'ph') + '_scr', shadow: false, tex: 0.3 });

    if (!o.mini) {
      txt('09:41', -pw / 2 + 36, -ph / 2 + 48, 20, PR.creamL, { weight: 800 });
    }
    pp(pR(pw / 2 - 62, -ph / 2 + 34, 34, 18, 4), PR.char, { shadow: false, tex: false });
    pp(pR(pw / 2 - 60, -ph / 2 + 36, 26, 14, 2), PR.green, { shadow: false, tex: false });
    pp(pR(pw / 2 - 28, -ph / 2 + 39, 4, 8, 1), PR.char, { shadow: false, tex: false });

    // Wi-Fi signal icon on phone (4 bars or concentric arcs)
    const wx = pw / 2 - 100, wy = -ph / 2 + 44;
    const bars = o.bars ?? 4;
    for (let b = 0; b < 4; b++) {
      const bh = 8 + b * 5, bx = wx + b * 7;
      const col = b < bars ? (o.barCol ?? PR.glow) : 'rgba(255,255,255,0.2)';
      pp(pR(bx, wy - bh, 5, bh, 1), col, { shadow: false, tex: false });
    }

    // Top Speaker slot
    pp(pR(-30, -ph / 2 + 32, 60, 6, 3), '#1a1a18', { shadow: false, tex: false });

    if (!o.mini) {
      // Browser URL bar
      pp(pR(-pw / 2 + 30, -ph / 2 + 76, pw - 60, 44, 12), PR.techK, { key: (o.key ?? 'ph') + '_url', sb: 4, sy: 2, tex: 0.3 });
      txt('🔒 tidu.tech/internet', -pw / 2 + 50, -ph / 2 + 104, 18, PR.creamD, { weight: 600, font: F_MONO });
    }
    // Screen Content
    if (o.error) {
      // Big paper error badge on phone screen
      const ew = pw - 68, eh = 320;
      pp(pR(-ew / 2, -40, ew, eh, 16), PR.creamL, { key: (o.key ?? 'ph') + '_err', sb: 12, sy: 6, tex: 0.5 });
      ctx.save();
      ctx.strokeStyle = PR.red;
      ctx.lineWidth = 4;
      ctx.strokeRect(-ew / 2 + 8, -32, ew - 16, eh - 16);
      ctx.restore();

      // Warning dinosaur / icon
      pp(pE(0, 30, 42, 42), PR.red, { key: (o.key ?? 'ph') + '_warn', sb: 6, sy: 3, tex: 0.4 });
      txt('!', 0, 48, 52, PR.creamL, { align: 'center', weight: 800 });

      txt('KHÔNG CÓ INTERNET', 0, 116, 22, PR.red, { align: 'center', weight: 800 });
      txt('DNS_PROBE_FINISHED_NO_INTERNET', 0, 146, 11, PR.navyD, { align: 'center', weight: 600, font: F_MONO });
      txt('Kiểm tra cáp mạng hoặc router', 0, 184, 15, PR.char, { align: 'center', weight: 700 });
      txt('Wi-Fi: Đầy vạch (Đã kết nối)', 0, 214, 16, PR.green, { align: 'center', weight: 800 });
    } else {
      // Normal / Loading page
      pp(pR(-pw / 2 + 30, -ph / 2 + 140, pw - 60, 160, 12), PR.navyD, { key: (o.key ?? 'ph') + '_card1', sb: 6, sy: 3, tex: 0.4 });
      txt('ĐANG TẢI TRANG...', 0, -ph / 2 + 200, 20, PR.glow, { align: 'center', weight: 800 });
      // Spinner
      const spinAngle = TT * TAU * 1.5;
      ctx.save();
      ctx.strokeStyle = PR.glow;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, -ph / 2 + 245, 22, spinAngle, spinAngle + Math.PI * 1.4);
      ctx.stroke();
      ctx.restore();

      // Placeholder content cards
      pp(pR(-pw / 2 + 30, 20, pw - 60, 70, 8), PR.techK, { key: (o.key ?? 'ph') + '_ph1', shadow: false, tex: 0.3 });
      pp(pR(-pw / 2 + 30, 105, pw - 60, 70, 8), PR.techK, { key: (o.key ?? 'ph') + '_ph2', shadow: false, tex: 0.3 });
    }
  });
}

// A detailed Wi-Fi router with dual antennas, status LEDs, and ventilation
function ttRouter(cx, cy, s = 1, o = {}) {
  withT(cx, cy, o.rot ?? 0, s, () => {
    const rw = 320, rh = 120;
    // Antennas
    const antAngle = 0.28;
    [-1, 1].forEach((dir) => {
      withT(dir * 110, -rh / 2, dir * antAngle, 1, () => {
        pp(pR(-12, -180, 24, 190, 8), PR.char, { key: (o.key ?? 'rt') + '_ant' + dir, sb: 8, sy: 4, tex: 0.4 });
        pp(pR(-12, -160, 24, 14, 2), PR.glow, { shadow: false, tex: false });
      });
    });

    // Router body
    pp(pR(-rw / 2, -rh / 2, rw, rh, 18), PR.techK, { key: (o.key ?? 'rt') + '_body', sb: 18, sy: 9, tex: 0.5 });
    // Top ventilation groove panel
    pp(pR(-rw / 2 + 20, -rh / 2 + 12, rw - 40, 26, 6), '#0e1d2d', { shadow: false, tex: 0.3 });
    for (let g = 0; g < 12; g++) {
      pp(pR(-rw / 2 + 36 + g * 22, -rh / 2 + 16, 12, 18, 2), '#152b40', { shadow: false, tex: false });
    }

    // Front edge bevel
    pp(pR(-rw / 2 + 10, rh / 2 - 40, rw - 20, 32, 8), '#122538', { shadow: false, tex: 0.3 });

    // LED Status lights: [Name, Color, On]
    const leds = [
      ['PWR', PR.green, true],
      ['2.4G', PR.glow, true],
      ['5G', PR.glow, true],
      ['WAN', o.online ? PR.green : PR.red, o.online || Math.floor(TT * 4) % 2 === 0],
    ];
    leds.forEach(([name, col, on], i) => {
      const lx = -rw / 2 + 45 + i * 65, ly = rh / 2 - 24;
      pp(pE(lx, ly, 7, 7), on ? col : '#334455', { key: (o.key ?? 'rt') + '_led' + i, sb: on ? 6 : 2, sy: 1, tex: 0.2 });
      if (on) {
        ctx.save();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.45;
        ctx.beginPath();
        ctx.arc(lx, ly, 13, 0, TAU);
        ctx.fill();
        ctx.restore();
      }
      txt(name, lx, ly - 14, 11, PR.creamD, { align: 'center', weight: 800, font: F_MONO });
    });

    // Name plate
    txt('ROUTER WI-FI (TRONG NHÀ)', 0, rh / 2 + 32, 22, PR.creamL, { align: 'center', weight: 800 });
  });
}

// Concentric Wi-Fi waves pulsing outward
function ttWifiPulse(cx, cy, radius, speed = 1, col = PR.glow, alpha = 0.8) {
  const t = TT * speed;
  ctx.save();
  ctx.strokeStyle = col;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const f = ((t * 0.8 + i * 0.33) % 1);
    const r = radius * 0.2 + f * radius * 0.8;
    const a = (1 - f) * alpha;
    ctx.globalAlpha = Math.max(0, a);
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI * 0.75, -Math.PI * 0.25);
    ctx.stroke();
  }
  ctx.restore();
}

// Global server rack / datacenter unit
function ttServerRack(cx, cy, s = 1, o = {}) {
  withT(cx, cy, o.rot ?? 0, s, () => {
    const sw = 300, sh = 420;
    // Cabinet outer frame
    pp(pR(-sw / 2, -sh / 2, sw, sh, 16), PR.char, { key: (o.key ?? 'sr') + '_cab', sb: 20, sy: 10, tex: 0.45 });
    // 3 Server chassis bays
    for (let u = 0; u < 3; u++) {
      const uy = -sh / 2 + 30 + u * 125;
      pp(pR(-sw / 2 + 16, uy, sw - 32, 108, 8), PR.techK, { key: (o.key ?? 'sr') + '_bay' + u, sb: 6, sy: 3, tex: 0.35 });
      // Drive bays
      for (let d = 0; d < 4; d++) {
        pp(pR(-sw / 2 + 32 + d * 48, uy + 16, 40, 76, 4), '#102030', { shadow: false, tex: false });
        // LED indicator
        const blink = Math.sin(TT * 6 + u * 4 + d) > 0;
        pp(pE(-sw / 2 + 52 + d * 48, uy + 80, 4, 4), o.online && blink ? PR.glow : PR.mustard, { shadow: false, tex: false });
      }
      // Status LEDs on right side
      pp(pE(sw / 2 - 40, uy + 36, 6, 6), o.online ? PR.green : PR.red, { shadow: false, tex: false });
      pp(pE(sw / 2 - 40, uy + 64, 6, 6), o.online ? PR.glow : '#334455', { shadow: false, tex: false });
    }

    // Globe badge on top
    withT(0, -sh / 2 - 50, 0, 1, () => {
      pp(pR(-130, -30, 260, 60, 12), PR.navyD, { key: (o.key ?? 'sr') + '_badge', sb: 8, sy: 4, tex: 0.4 });
      txt('🌐 MÁY CHỦ INTERNET', 0, 8, 18, PR.glow, { align: 'center', weight: 800 });
    });
  });
}

// Thick network cable connecting router to internet servers
function ttCable(x1, y1, x2, y2, o = {}) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  if (o.torn) {
    // Left segment
    ctx.save();
    ctx.strokeStyle = '#2b4460';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(mx - 45, my);
    ctx.stroke();

    // Right segment
    ctx.beginPath();
    ctx.moveTo(mx + 45, my);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();

    // Jagged paper-tear edges at break
    pp(pG([[mx - 48, my - 12], [mx - 32, my - 4], [mx - 46, my + 6], [mx - 34, my + 14], [mx - 52, my + 12]]), PR.red, { key: 'tear_L', shadow: false, tex: 0.3 });
    pp(pG([[mx + 48, my - 12], [mx + 32, my - 4], [mx + 46, my + 6], [mx + 34, my + 14], [mx + 52, my + 12]]), PR.red, { key: 'tear_R', shadow: false, tex: 0.3 });

    // Sparks popping out
    for (let s = 0; s < 5; s++) {
      const sa = s * 1.2 + TT * 8;
      const sr = 24 + (s % 3) * 14;
      const sx = mx + Math.cos(sa) * sr, sy = my + Math.sin(sa) * sr;
      pp(pE(sx, sy, 5, 5), PR.mustard, { shadow: false, tex: false });
    }
  } else {
    // Continuous solid cable
    ctx.save();
    ctx.strokeStyle = '#2b4460';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();

    // Glowing cyan data packets travelling from left to right
    for (let p = 0; p < 4; p++) {
      const f = ((TT * 0.9 + p * 0.25) % 1);
      const px = lerp(x1 + 30, x2 - 30, f), py = lerp(y1, y2, f);
      pp(pR(px - 14, py - 6, 28, 12, 5), PR.glow, { key: 'pkt' + p, sb: 6, sy: 2, tex: false });
    }
  }
}

// A comparison card with badge
function ttCard(cx, cy, w, h, header, points, col, key) {
  withT(cx, cy, 0, 1, () => {
    // Card body
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.creamL, { key: key + '_bg', sb: 16, sy: 8, tex: 0.5 });
    // Header band
    pp(pR(-w / 2, -h / 2, w, 76, 16), col, { key: key + '_hd', shadow: false, tex: 0.4 });
    pp(pR(-w / 2, -h / 2 + 56, w, 20, 0), col, { shadow: false, tex: false });
    txt(header, 0, -h / 2 + 50, 32, PR.creamL, { align: 'center', weight: 800 });

    // Bullet points
    points.forEach((pt, i) => {
      const py = -h / 2 + 130 + i * 56;
      pp(pE(-w / 2 + 36, py - 8, 8, 8), col, { shadow: false, tex: false });
      txt(pt, -w / 2 + 58, py, 23, PR.navy, { weight: 700 });
    });
  });
}

// =====================================================================
//  SCENES
// =====================================================================

SCENES.hook = () => {
  // S1: Điện thoại có Wi-Fi đầy vạch, nhưng tại sao vẫn không vào mạng được?
  ttWall('hk');
  prSign('WI-FI ĐẦY VẠCH... MẤT MẠNG?', { kicker: KICK });

  const tErr = VW('hook', 'không').t0;
  const isErr = TT >= tErr;

  // Hero: Big smartphone in the center
  ttPhone(480, 920, 1.15, {
    key: 'hk_ph',
    bars: 4,
    barCol: PR.green,
    error: isErr,
  });

  if (isErr) {
    prCross(480, 780, tErr, 72);
  }

  // Mascot: botty on the right with gaming headset, puzzled
  botty(BOTTY_X, BOTTY_Y, {
    hat: 'headset',
    mood: isErr ? 'wow' : 'neutral',
    key: 'b_hk',
    look: -22,
  });

  prChips();
};

SCENES.difference = () => {
  // S2: Vì Wi-Fi và Internet là hai thứ khác nhau.
  ttWall('diff');
  prSign('HAI THỨ HOÀN TOÀN KHÁC NHAU', { kicker: KICK });

  const tDiff = VW('difference', 'khác').t0;

  // Two comparison cards side by side
  // Left: Wi-Fi card (Cyan)
  ttCard(290, 840, 380, 520, '📶 WI-FI', [
    'Sóng vô tuyến nội bộ',
    'Nối thiết bị tới router',
    'Phạm vi: trong nhà bạn',
    'Không tự tạo nội dung',
  ], PR.blue, 'c_wf');

  // Right: Internet card (Orange/Navy)
  ttCard(750, 840, 380, 520, '🌐 INTERNET', [
    'Mạng lưới toàn cầu',
    'Hàng triệu máy chủ',
    'Cáp quang xuyên đại dương',
    'Chứa dữ liệu thế giới',
  ], PR.mustard, 'c_in');

  // Big "≠" (KHÁC NHAU) badge between them
  withT(520, 840, 0, popS(tDiff), () => {
    pp(pE(0, 0, 78, 78), PR.red, { key: 'diff_neq', sb: 16, sy: 8, tex: 0.5 });
    pp(pE(0, 0, 68, 68), PR.creamL, { shadow: false, tex: false });
    txt('≠', 0, 24, 76, PR.red, { align: 'center', weight: 800 });
  });

  // Mascot: botty with beanie, nodding
  botty(BOTTY_X, BOTTY_Y, {
    hat: 'beanie',
    mood: TT >= tDiff ? 'happy' : 'neutral',
    key: 'b_diff',
    look: -25,
  });

  prChips();
};

SCENES.wifi = () => {
  // S3: Wi-Fi giúp điện thoại kết nối không dây với router trong nhà.
  ttWall('wf');
  prSign('WI-FI: KẾT NỐI KHÔNG DÂY NỘI BỘ', { kicker: KICK });

  // Living room tech shelf
  pp(pR(60, 1180, 760, 32, 8), PR.woodD, { key: 'wf_shelf', sb: 12, sy: 6, tex: 0.6 });

  // Phone on left
  ttPhone(240, 940, 0.95, {
    key: 'wf_ph',
    bars: 4,
    barCol: PR.glow,
  });

  // Router on right
  ttRouter(640, 1020, 1.1, {
    key: 'wf_rt',
    online: true,
  });

  // Concentric Wi-Fi waves pulsing from router to phone
  ttWifiPulse(640, 890, 380, 1.3, PR.glow, 0.85);

  // Connection label banner
  withT(440, 680, 0, 1, () => {
    pp(pR(-200, -32, 400, 64, 12), PR.navyD, { key: 'wf_lbl', sb: 10, sy: 5, tex: 0.4 });
    txt('📡 SÓNG WI-FI NỘI BỘ (LAN)', 0, 10, 22, PR.glow, { align: 'center', weight: 800 });
  });

  // Mascot: botty with drone hat watching the signals
  botty(BOTTY_X, BOTTY_Y, {
    hat: 'drone',
    mood: 'happy',
    key: 'b_wf',
    look: -30,
  });

  prChips();
};

SCENES.internet = () => {
  // S4: Còn Internet là mạng lưới kết nối với thế giới bên ngoài.
  ttWall('in');
  prSign('INTERNET: KẾT NỐI TOÀN THẾ GIỚI', { kicker: KICK });

  // Left: Home box (Phone + Router)
  withT(220, 880, 0, 1, () => {
    // Dotted home container
    pp(pR(-160, -220, 320, 440, 16), '#13283e', { key: 'in_homebox', sb: 10, sy: 5, tex: 0.35 });
    ctx.save();
    ctx.strokeStyle = PR.glow;
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]);
    ctx.strokeRect(-152, -212, 304, 424);
    ctx.restore();
    txt('TRONG NHÀ (BẠN)', 0, -188, 20, PR.creamL, { align: 'center', weight: 800 });

    // Mini router and phone inside home
    ttRouter(0, 40, 0.68, { key: 'in_homerouter', online: true });
    ttPhone(0, -70, 0.45, { key: 'in_homephone', bars: 4, mini: true });
  });

  // Right: Global Datacenter / Server Rack
  ttServerRack(680, 880, 0.95, { key: 'in_rack', online: true });

  // Center: Long fiber optic cable carrying data packets
  ttCable(380, 920, 540, 920, { torn: false });

  // Top banner: Globe connection
  withT(460, 640, 0, 1, () => {
    pp(pR(-180, -30, 360, 60, 14), PR.mustard, { key: 'in_topbanner', sb: 10, sy: 5, tex: 0.5 });
    txt('CÁP QUANG RA MÁY CHỦ', 0, 9, 21, PR.navy, { align: 'center', weight: 800 });
  });

  // Mascot: botty with professor mortar hat holding AI chip
  botty(BOTTY_X, BOTTY_Y, {
    hat: 'mortar',
    mood: 'happy',
    key: 'b_in',
    hold: propChip(-0.1),
  });

  prChips();
};

SCENES.disconnect = () => {
  // S5: Nếu đường truyền Internet bị mất, Wi-Fi vẫn có thể hoạt động bình thường.
  ttWall('dc');
  prSign('ĐỨT CÁP: WI-FI VẪN ĐẦY VẠCH!', { kicker: KICK });

  const tCut = VW('disconnect', 'mất').t0;
  const isCut = TT >= tCut;

  // Left: Home Router + Phone (Wi-Fi STILL WORKS!)
  withT(220, 880, 0, 1, () => {
    pp(pR(-160, -220, 320, 440, 16), '#13283e', { key: 'dc_homebox', sb: 10, sy: 5, tex: 0.35 });
    ttRouter(0, 40, 0.68, { key: 'dc_homerouter', online: !isCut });
    ttPhone(0, -70, 0.45, { key: 'dc_homephone', bars: 4, barCol: PR.green, mini: true });
    ttWifiPulse(0, -10, 140, 1.5, PR.green, 0.9);

    // Green check badge: Wi-Fi vẫn chạy
    pp(pR(-130, 150, 260, 46, 10), PR.green, { key: 'dc_wfok', sb: 6, sy: 3, tex: 0.4 });
    txt('WI-FI: VẪN BÌNH THƯỜNG', 0, 180, 16, PR.creamL, { align: 'center', weight: 800 });
  });

  // Right: Global servers (Dimmed out when cut)
  ttServerRack(680, 880, 0.95, { key: 'dc_rack', online: !isCut });

  // Center: Torn cable with paper tear and cross
  ttCable(380, 920, 540, 920, { torn: isCut });

  if (isCut) {
    prCross(460, 920, tCut, 64);
    withT(460, 820, 0, popS(tCut), () => {
      pp(pR(-140, -26, 280, 52, 10), PR.red, { key: 'dc_cutlbl', sb: 10, sy: 5, tex: 0.5 });
      txt('ĐỨT ĐƯỜNG TRUYỀN', 0, 8, 18, PR.creamL, { align: 'center', weight: 800 });
    });
  }

  // Mascot: botty with tinfoil hat, shocked at the break
  botty(BOTTY_X, BOTTY_Y, {
    hat: 'tinfoil',
    mood: isCut ? 'wow' : 'flat',
    key: 'b_dc',
  });

  prChips();
};

SCENES.takeaway = () => {
  // S6: Vì vậy, đầy vạch Wi-Fi không có nghĩa là Internet đang hoạt động!
  ttWall('ta');
  prSign('ĐẦY VẠCH KHÔNG CÓ NGHĨA CÓ MẠNG', { kicker: KICK });

  const tStamp = VW('takeaway', 'không').t0;

  // Top card: Wi-Fi meaning
  withT(480, 680, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), PR.techK, { key: 'ta_c1', sb: 14, sy: 7, tex: 0.45 });
    // Wi-Fi signal icon
    for (let b = 0; b < 4; b++) {
      pp(pR(-330 + b * 14, 20 - (b + 1) * 14, 10, (b + 1) * 14, 2), PR.green, { shadow: false, tex: false });
    }
    txt('VẠCH WI-FI: SÓNG TỚI ROUTER', -240, -24, 28, PR.glow, { weight: 800 });
    txt('Chỉ cho biết điện thoại kết nối tốt tới cục phát trong nhà.', -240, 16, 20, PR.creamD, { weight: 600 });
    txt('Tín hiệu nội bộ đạt 100%', -240, 52, 18, PR.green, { weight: 700 });
  });

  // Bottom card: Internet meaning
  withT(480, 940, 0, 1, () => {
    pp(pR(-380, -90, 760, 180, 18), '#0e1d2d', { key: 'ta_c2', sb: 14, sy: 7, tex: 0.45 });
    txt('🌐', -320, 20, 48, PR.mustard, { align: 'center', weight: 800 });
    txt('INTERNET: KẾT NỐI RA THẾ GIỚI', -240, -24, 28, PR.mustard, { weight: 800 });
    txt('Đường dây từ router đi ra ngoài nhà mạng (ISP).', -240, 16, 20, PR.creamD, { weight: 600 });
    txt('Đường này đứt thì Wi-Fi đầy vạch vẫn không có mạng!', -240, 52, 18, PR.red, { weight: 700 });
  });

  // Big rubber stamp slamming on the takeaway
  prStamp('KHÔNG ĐỒNG NGHĨA!', 480, 1160, PR.red, tStamp, { size: 38, from: 1.25, rot: -0.04 });

  // Mascot: botty with VR goggles, cheerful
  botty(BOTTY_X, BOTTY_Y, {
    hat: 'vr',
    mood: 'happy',
    key: 'b_ta',
  });

  prChips();
};

SCENES.cta = () => {
  // S7: Bạn từng gặp tình huống này chưa?
  const t0 = E0;
  ttWall('cta');
  prSign('BẠN TỪNG BỊ TÌNH HUỐNG NÀY CHƯA?', { kicker: KICK });

  // Interactive Question Card
  withT(480, 750, 0, 1, () => {
    pp(pR(-380, -160, 760, 320, 20), PR.creamL, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    txt('TỪNG GẶP BAO GIỜ CHƯA?', 0, -88, 36, PR.navy, { align: 'center', weight: 800 });

    // Option A
    pp(pR(-340, -30, 320, 90, 14), PR.red, { key: 'cta_optA', sb: 8, sy: 4, tex: 0.4 });
    txt('😤 BỊ HOÀI, BỰC LẮM!', -180, 24, 21, PR.creamL, { align: 'center', weight: 800 });

    // Option B
    pp(pR(20, -30, 320, 90, 14), PR.green, { key: 'cta_optB', sb: 8, sy: 4, tex: 0.4 });
    txt('💡 GIỜ MỚI HIỂU ĐÓ!', 180, 24, 21, PR.creamL, { align: 'center', weight: 800 });

    txt('Bình luận bên dưới trải nghiệm của bạn nhé! 👇', 0, 114, 22, PR.char, { align: 'center', weight: 700 });
  });

  // Comment prompt box typing on
  prCommentBox(480, 1080, 'BÌNH LUẬN NGAY', t0 + 0.2, { hint: 'Bạn hay gặp lỗi này ở đâu?...' });

  // Mascot: botty with party hat, celebrating and waving
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
  cues.push({ k: 'tick', t: VW('hook', 'điện').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'không').t0 });
  cues.push({ k: 'pop', t: VW('difference', 'khác').t0 });
  cues.push({ k: 'tick', t: VW('wifi', 'router').t0 });
  cues.push({ k: 'chime', t: VW('internet', 'toàn').t0 });
  cues.push({ k: 'thud', t: VW('disconnect', 'mất').t0 });
  cues.push({ k: 'thud', t: VW('takeaway', 'không').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'tình').t0 });
  cues.push({ k: 'type', t: VW('cta', 'gặp').t0, n: 12, d: 0.4 });
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
