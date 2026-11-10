// =====================================================================
//  TIDU MIND 16 — "Càng nhiều lựa chọn, tại sao càng khó quyết định?"
//  Nghịch lý lựa chọn (Paradox of Choice / Choice Overload).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · QUYẾT ĐỊNH';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};

// ---- helpers ----
function m16Room(c, studs = false) {
  prWall(c, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs });
  if (!studs) pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
}

function m16Mark(x, y, r, good) {
  pp(pE(x, y, r, r), PR.creamL, { key: 'mk' + Math.round(x) + '_' + Math.round(y), sb: 6, sy: 3, tex: 0.3 });
  ctx.save();
  ctx.strokeStyle = good ? PR.green : PR.red;
  ctx.lineWidth = r * 0.28;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  if (good) {
    ctx.moveTo(x - r * 0.44, y);
    ctx.lineTo(x - r * 0.1, y + r * 0.38);
    ctx.lineTo(x + r * 0.46, y - r * 0.36);
  } else {
    ctx.moveTo(x - r * 0.36, y - r * 0.36);
    ctx.lineTo(x + r * 0.36, y + r * 0.36);
    ctx.moveTo(x + r * 0.36, y - r * 0.36);
    ctx.lineTo(x - r * 0.36, y + r * 0.36);
  }
  ctx.stroke();
  ctx.restore();
}

function m16Tag(str, x, y, fill, k = 1, rot = 0, size = 30) {
  const w = txtW(str, size) + 44, h = size * 2;
  withT(x, y, rot, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, 10), fill, { key: 'tag' + str, sb: 10, sy: 5, tex: 0.45 });
    txt(str, 0, size * 0.36, size, PR.creamL, { align: 'center', weight: 800 });
  });
}

function m16Phone(cx, cy, w, h, k = 1, key = 'ph') {
  withT(cx, cy, 0, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, 40), PR.char, { key: key + 'body', sb: 18, sy: 9, tex: 0.5 });
    pp(pR(-w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 28), PR.creamL, { key: key + 'scr', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(0, -h / 2 + 36, 8, 8), PR.char, { key: key + 'cam', shadow: false, tex: false });
    pp(pR(-w / 2 + 36, -h / 2 + 58, w - 72, 60, 14), PR.navy, { key: key + 'hdr', shadow: false, tex: 0.4 });
    txt('GIAO ĐỒ ĂN', 0, -h / 2 + 98, 24, PR.creamL, { align: 'center', weight: 800 });
  });
}

function m16Scale(cx, cy, tilt, lCards, rCards, key = 'sc') {
  const L = 270;
  pp(pR(cx - 14, cy - 20, 28, 620, 6), PR.brown, { key: key + 'post', sb: 12, sy: 6, tex: 0.6 });
  pp(pR(cx - 150, cy + 590, 300, 36, 10), PR.woodD, { key: key + 'base', sb: 12, sy: 6, tex: 0.6 });
  const ends = [-1, 1].map((d) => [cx + d * L * Math.cos(tilt), cy + d * L * Math.sin(tilt)]);
  ctx.save();
  ctx.strokeStyle = 'rgba(244,241,232,0.85)';
  ctx.lineWidth = 4;
  ends.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 90, y + 250);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 90, y + 250);
    ctx.stroke();
  });
  ctx.restore();
  withT(cx, cy, tilt, 1, () => {
    pp(pR(-L - 16, -14, 2 * L + 32, 28, 12), PR.mustard, { key: key + 'beam', sb: 12, sy: 6, tex: 0.5 });
  });
  pp(pE(cx, cy, 26, 26), PR.brown, { key: key + 'piv', sb: 8, sy: 4, tex: 0.5 });

  [[ends[0], lCards, 'panL'], [ends[1], rCards, 'panR']].forEach(([[x, y], cards, pKey]) => {
    cards.forEach(([k, rot, name, col], i) => {
      withT(x - 30 + i * 40, y + 210 - i * 36, rot, k, () => {
        pp(pR(-65, -45, 130, 90, 8), PR.paperW, { key: key + pKey + i, sb: 8, sy: 4, tex: 0.45 });
        pp(pR(-65, -45, 12, 90, 0), col, { key: key + pKey + 'c' + i, shadow: false, tex: 0.4 });
        txt(name, -45, 6, fitSize(name, 100, 20), PR.char, { weight: 800 });
      });
    });
    pp(() => {
      ctx.moveTo(x - 110, y + 250);
      ctx.lineTo(x + 110, y + 250);
      ctx.quadraticCurveTo(x, y + 330, x - 110, y + 250);
    }, PR.grey, { key: key + pKey + 'dish', sb: 12, sy: 6, tex: 0.5 });
  });
}

function m16Clipboard(cx, cy, w, h, k = 1, key = 'cb') {
  withT(cx, cy, 0, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.wood, { key: key + 'bd', sb: 16, sy: 8, tex: 0.6 });
    pp(pR(-w / 2 + 24, -h / 2 + 36, w - 48, h - 64, 12), PR.paperW, { key: key + 'pp', sb: 10, sy: 5, tex: 0.45 });
    pp(pR(-90, -h / 2 - 12, 180, 48, 8), PR.mustard, { key: key + 'clp', sb: 12, sy: 6, tex: 0.55 });
    pp(pE(0, -h / 2 + 12, 16, 16), PR.char, { key: key + 'clphole', shadow: false, tex: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Mở app đồ ăn hàng trăm món -> chẳng biết chọn gì
  const tTram = VW('hook', 'trăm').t0, tKo = VW('hook', 'gì').t0;
  m16Room(TEAL, false);
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(940, 460, 54, 12, 0, 'clk1');

  // Phone hero is fully drawn at t=0 for thumbnail
  m16Phone(CX, 800, 500, 740, 1, 'ph1');

  // Initial dishes inside the app screen
  const initDishes = [
    ['Cơm tấm sườn nướng', PR.orange, 640],
    ['Bún chả Hà Nội', PR.green, 740],
    ['Phở bò đặc biệt', PR.blue, 840],
  ];
  initDishes.forEach(([name, col, y], i) => {
    withT(CX, y, i % 2 ? 0.01 : -0.01, 1, () => {
      pp(pR(-200, -36, 400, 72, 14), PR.paperW, { key: 'fd' + i, sb: 8, sy: 4, tex: 0.4 });
      pp(pE(-160, 0, 22, 22), col, { key: 'fde' + i, shadow: false, tex: 0.4 });
      txt(name, -120, 2, fitSize(name, 280, 26), PR.char, { base: 'middle', weight: 800 });
    });
  });

  // Cascading extra dishes pop on "trăm" to show overwhelming choices
  const extraDishes = [
    ['Pizza hải sản', PR.red, CX - 130, 960, -0.04, tTram],
    ['Sushi cá hồi', PR.plum, CX + 130, 980, 0.04, tTram + 0.15],
    ['Mì xào giòn', PR.mustard, CX - 110, 1070, 0.03, tTram + 0.3],
    ['Bánh mì chả', PR.teal, CX + 110, 1090, -0.03, tTram + 0.45],
  ];
  extraDishes.forEach(([name, col, x, y, rot, tc], i) => {
    const k = popS(tc);
    if (k > 0.01) withT(x, y, rot, k, () => {
      pp(pR(-150, -32, 300, 64, 12), PR.paperW, { key: 'exd' + i, sb: 10, sy: 5, tex: 0.45 });
      pp(pE(-120, 0, 18, 18), col, { key: 'exde' + i, shadow: false, tex: 0.4 });
      txt(name, -90, 2, fitSize(name, 210, 24), PR.char, { base: 'middle', weight: 800 });
    });
  });

  // Stamp on "chẳng biết chọn gì?"
  if (TT >= tKo) {
    prStamp('CHẲNG BIẾT CHỌN GÌ?', CX, 1190, PR.red, tKo, { rot: -0.04, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tKo ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('HÀNG TRĂM MÓN, KHÔNG BIẾT CHỌN GÌ?', { kicker: KICK });
  prChips();
};

SCENES.paradox = () => {   // S2a: Nhiều lựa chọn mang lại sự tự do
  m16Room(TEAL2, true);
  prStar(140, 390, 30, PR.mustard);
  prStar(930, 410, 28, PR.orange);

  // Big fan of 5 colorful option cards blooming upward, fully present at cut
  const cards = [
    [-290, 60, -0.24, 'MÓN 1', PR.orange],
    [-145, 18, -0.12, 'MÓN 2', PR.green],
    [0, 0, 0, 'MÓN 3', PR.mustard],
    [145, 18, 0.12, 'MÓN 4', PR.blue],
    [290, 60, 0.24, 'MÓN 5', PR.red],
  ];
  cards.forEach(([dx, dy, rot, name, col], i) => {
    withT(CX + dx, 830 + dy, rot, 1, () => {
      pp(pR(-85, -150, 170, 300, 18), PR.paperW, { key: 'fan' + i, sb: 14, sy: 7, tex: 0.4 });
      pp(pE(0, -70, 38, 38), col, { key: 'fanc' + i, shadow: false, tex: 0.4 });
      txt(name, 0, 36, 32, PR.char, { align: 'center', weight: 800 });
      txt('Tùy chọn', 0, 80, 22, PR.greyD, { align: 'center', weight: 700 });
    });
  });

  m16Tag('SỰ TỰ DO LỰA CHỌN', CX, 520, PR.mustard, 1, 0, 34);

  const tDo = VW('paradox', 'do').t0;
  if (TT >= tDo) {
    prStar(CX - 240, 520, 24, PR.yellow);
    prStar(CX + 240, 520, 24, PR.yellow);
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b2' });
  prSign('TỰ DO LỰA CHỌN', { kicker: KICK });
  prChips();
};

SCENES.paradox_hard = () => {   // S2b: Nhưng trong một số tình huống khiến quyết định khó khăn hơn
  const tKho = VW('paradox', 'khăn').t0;
  m16Room(TEAL, false);
  prStar(140, 400, 28, PR.pink);
  prStar(940, 420, 30, PR.mustard);

  // Mechanical balance scale heavily tilted by overloaded options
  const leftItems = [[1, -0.02, 'LỰA CHỌN', PR.green]];
  const rightItems = [
    [1, 0.03, 'MÓN A', PR.red],
    [1, -0.04, 'MÓN B', PR.orange],
    [1, 0.05, 'MÓN C', PR.blue],
    [1, -0.02, 'MÓN D', PR.plum],
  ];
  m16Scale(CX, 660, 0.18, leftItems, rightItems, 'sc1');

  m16Tag('QUÁ NHIỀU PHƯƠNG ÁN', CX, 510, PR.red, 1, 0, 32);

  if (TT >= tKho) {
    prStamp('KHÓ QUYẾT ĐỊNH HƠN', CX, 1140, PR.red, tKho, { rot: 0.04, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'flat', look: -25, key: 'b2_hard' });
  prSign('KHIẾN QUYẾT ĐỊNH KHÓ KHĂN', { kicker: KICK });
  prChips();
};

SCENES.reaction = () => {   // S3a: Bạn liên tục so sánh, sợ bỏ lỡ và trì hoãn việc chốt
  const tLo = VW('reaction', 'lỡ').t0, tChot = VW('reaction', 'chốt').t0;
  m16Room(TEAL2, true);
  prClock(940, 460, 54, 12, 30, 'clk3');
  prStar(140, 400, 30, PR.pink);

  // Two symmetric comparison cards at x = 350 and 730 (midpoint 540), present at cut
  const pairData = [
    [350, 'PHƯƠNG ÁN A', PR.orange, -0.015, 'cardL'],
    [730, 'PHƯƠNG ÁN B', PR.blue, 0.015, 'cardR'],
  ];
  pairData.forEach(([cx, title, col, rot, key]) => {
    withT(cx, 780, rot, 1, () => {
      pp(pR(-170, -210, 340, 420, 20), PR.paperW, { key: key + 'bg', sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-170, -210, 340, 56, 12), col, { key: key + 'hdr', shadow: false, tex: 0.4 });
      txt(title, 0, -172, 24, PR.creamL, { align: 'center', weight: 800 });
      pp(pE(0, -60, 44, 44), col, { key: key + 'icon', shadow: false, tex: 0.35 });
      for (let r = 0; r < 3; r++) {
        pp(pR(-120, 30 + r * 42, 240, 18, 6), PR.cream, { key: key + 'bar' + r, shadow: false, tex: false });
      }
    });
  });

  // Animated comparison oscillation between the two cards
  const shift = Math.sin(TT * 6) * 16;
  withT(CX + shift, 780, 0, 1, () => {
    pp(pR(-45, -24, 90, 48, 12), PR.mustard, { key: 'cmpbadge', sb: 8, sy: 4, tex: 0.4 });
    txt('VS', 0, 8, 26, PR.char, { align: 'center', weight: 800 });
  });

  m16Tag('LIÊN TỤC SO SÁNH', CX, 530, PR.navy, 1, 0, 30);

  if (TT >= tLo) {
    m16Tag('SỢ BỎ LỠ (FOMO)', CX, 980, PR.red, popS(tLo), -0.02, 30);
  }

  if (TT >= tChot) {
    prStamp('TRÌ HOÃN VIỆC CHỐT', CX, 1160, PR.red, tChot, { rot: -0.04, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b3' });
  prSign('SO SÁNH VÀ TRÌ HOÃN', { kicker: KICK });
  prChips();
};

SCENES.reaction_notless = () => {   // S3b: Không phải lúc nào ít lựa chọn cũng tốt hơn
  const tTot = VW('reaction', 'tốt', 1).t0;
  m16Room(TEAL, false);
  prStar(140, 400, 30, PR.mustard);
  prStar(940, 410, 26, PR.orange);

  // Large sturdy display table
  pp(pR(100, 960, 880, 40, 10), PR.wood, { key: 'tbls', sb: 14, sy: 7, tex: 0.6 });
  pp(pR(150, 1000, 40, 470, 6), PR.woodD, { key: 'tbll1', sb: 10, sy: 5, tex: 0.6 });
  pp(pR(890, 1000, 40, 470, 6), PR.woodD, { key: 'tbll2', sb: 10, sy: 5, tex: 0.6 });

  // Single lone option card on display, present at cut
  withT(CX, 760, 0, 1, () => {
    pp(pR(-210, -170, 420, 340, 20), PR.paperW, { key: 'lone_card', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-210, -170, 420, 56, 12), PR.slateD, { key: 'lone_hdr', shadow: false, tex: 0.4 });
    txt('CHỈ CÓ 1 LỰA CHỌN', 0, -132, 26, PR.creamL, { align: 'center', weight: 800 });
    pp(pE(0, -15, 48, 48), PR.slate, { key: 'lone_ico', shadow: false, tex: 0.3 });
    txt('Phương án duy nhất', 0, 65, 26, PR.char, { align: 'center', weight: 800 });
    txt('Không có sự đối chiếu', 0, 105, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  // Empty outline slots on the sides
  ctx.save();
  ctx.strokeStyle = 'rgba(244,241,232,0.45)';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  [-290, 290].forEach((dx) => {
    ctx.strokeRect(CX + dx - 100, 640, 200, 240);
  });
  ctx.restore();

  m16Tag('ÍT LỰA CHỌN QUÁ MỨC', CX, 500, PR.greyD, 1, 0, 30);

  if (TT >= tTot) {
    prStamp('CHƯA HẲN ĐÃ TỐT', CX, 1140, PR.blue, tTot, { rot: 0.03, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'neutral', look: -20, key: 'b3_notless' });
  prSign('ÍT LỰA CHỌN CHƯA HẲN TỐT', { kicker: KICK });
  prChips();
};

SCENES.criteria = () => {   // S4a: Điều quan trọng là có tiêu chí rõ ràng
  const tRo = VW('criteria', 'rõ').t0;
  m16Room(TEAL2, true);
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 28, PR.pink);

  // Big handsome wooden clipboard, fully present at cut
  m16Clipboard(CX, 810, 660, 720, 1, 'cb1');

  // Clipboard content
  txt('TIÊU CHÍ RÕ RÀNG', CX, 560, 36, PR.navy, { align: 'center', weight: 800 });

  const criteriaRows = [
    ['MỤC TIÊU CỐT LÕI', 670],
    ['GIỚI HẠN CẦN THIẾT', 780],
    ['ƯU TIÊN PHÙ HỢP', 890],
  ];
  criteriaRows.forEach(([label, y], i) => {
    pp(pR(CX - 260, y - 28, 520, 56, 12), '#f4f2ec', { key: 'cr_row' + i, shadow: false, tex: false });
    pp(pR(CX - 240, y - 18, 36, 36, 6), PR.paperW, { key: 'cr_box' + i, sb: 4, sy: 2, tex: false });
    txt(label, CX - 170, y + 2, 28, PR.char, { base: 'middle', weight: 800 });
    if (TT >= tRo) {
      m16Mark(CX - 222, y, 16, true);
    }
  });

  if (TT >= tRo) {
    prStamp('TIÊU CHÍ RÕ RÀNG', CX, 1160, PR.green, tRo, { rot: -0.03, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'happy', look: -20, key: 'b4' });
  prSign('CẦN TIÊU CHÍ RÕ RÀNG', { kicker: KICK });
  prChips();
};

SCENES.criteria_three = () => {   // S4b: Hãy thử xác định 3 điều quan trọng nhất trước khi tìm kiếm
  const tNhat = VW('criteria', 'nhất').t0;
  m16Room(TEAL, false);
  prStar(140, 390, 30, PR.pink);
  prStar(930, 410, 32, PR.mustard);

  m16Tag('XÁC ĐỊNH TRƯỚC KHI TÌM', CX, 470, PR.navy, 1, 0, 30);

  // 3 Priority Tier Cards present at cut
  const tiers = [
    ['1', 'ĐIỀU QUAN TRỌNG NHẤT', PR.mustard, 620],
    ['2', 'ĐIỀU QUAN TRỌNG THỨ HAI', PR.blue, 760],
    ['3', 'ĐIỀU QUAN TRỌNG THỨ BA', PR.green, 900],
  ];
  tiers.forEach(([num, label, col, y], i) => {
    withT(CX, y, i % 2 ? 0.01 : -0.01, 1, () => {
      pp(pR(-340, -55, 680, 110, 16), PR.paperW, { key: 'tier' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pE(-270, 0, 36, 36), col, { key: 'tiernum' + i, shadow: false, tex: 0.4 });
      txt(num, -270, 2, 34, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      txt(label, -210, 2, fitSize(label, 440, 28), PR.char, { base: 'middle', weight: 800 });
    });
  });

  if (TT >= tNhat) {
    prStamp('3 ĐIỀU QUAN TRỌNG NHẤT', CX, 1120, PR.mustard, tNhat, { rot: 0.03, size: 44, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b4_three' });
  prSign('3 ĐIỀU QUAN TRỌNG NHẤT', { kicker: KICK });
  prChips();
};

SCENES.criteria_filter = () => {   // S4c: Sau đó loại những phương án không phù hợp
  const tLoai = VW('criteria', 'loại').t0, tHop = VW('criteria', 'hợp').t0;
  m16Room(TEAL2, true);
  prStar(140, 400, 30, PR.mustard);
  prStar(930, 420, 28, PR.orange);

  m16Tag('LỌC THEO TIÊU CHÍ', CX, 520, PR.navy, 1, 0, 32);

  // 3 options at safe column centres 270, 540, 810 (w = 240), present at cut
  const options = [
    [270, 'PHƯƠNG ÁN 1', false],
    [540, 'PHƯƠNG ÁN 2', true],
    [810, 'PHƯƠNG ÁN 3', false],
  ];
  options.forEach(([cx, title, match], i) => {
    const isFiltered = TT >= tLoai && !match;
    ctx.save();
    if (isFiltered) ctx.globalAlpha = 0.45;
    withT(cx, 760, (i - 1) * 0.02, 1, () => {
      pp(pR(-120, -160, 240, 320, 16), PR.paperW, { key: 'fltop' + i, sb: 12, sy: 6, tex: 0.45 });
      pp(pR(-120, -160, 240, 48, 10), match ? PR.green : PR.slateD, { key: 'fltop_hdr' + i, shadow: false, tex: 0.4 });
      txt(title, 0, -128, 20, PR.creamL, { align: 'center', weight: 800 });
      pp(pE(0, -40, 32, 32), match ? PR.moneyL : PR.cream, { key: 'fltop_ico' + i, shadow: false, tex: 0.3 });
      txt(match ? 'Khớp tiêu chí' : 'Lệch tiêu chí', 0, 30, 18, PR.char, { align: 'center', weight: 700 });
    });
    ctx.restore();
    if (TT >= tLoai) {
      m16Mark(cx, 850, 28, match);
    }
  });

  if (TT >= tHop) {
    prStamp('LOẠI BỎ PHƯƠNG ÁN LỆCH', CX, 1140, PR.green, tHop, { rot: -0.03, size: 40, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -20, key: 'b4_filter' });
  prSign('LOẠI PHƯƠNG ÁN KHÔNG PHÙ HỢP', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Đôi khi quyết định tốt hơn không phải xem thêm, mà là biết mình đang tìm điều gì
  const tXem = VW('reframe', 'xem').t0, tTim = VW('reframe', 'tìm').t0;
  m16Room(TEAL, false);
  prStar(140, 390, 32, PR.mustard);
  prStar(940, 410, 28, PR.pink);

  // Both cards present at cut
  // Left card: "Xem thêm vô tận"
  const dimLeft = TT >= tXem ? 0.5 : 1;
  ctx.save();
  ctx.globalAlpha = dimLeft;
  withT(350, 760, -0.02, 1, () => {
    pp(pR(-170, -210, 340, 420, 20), PR.paperW, { key: 'rf_l_bg', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-170, -210, 340, 56, 12), PR.slateD, { key: 'rf_l_hdr', shadow: false, tex: 0.4 });
    txt('XEM THÊM VÔ TẬN', 0, -172, 22, PR.creamL, { align: 'center', weight: 800 });
    pp(pE(0, -60, 40, 40), PR.slate, { key: 'rf_l_ico', shadow: false, tex: 0.3 });
    txt('Lướt không hồi kết', 0, 10, 22, PR.char, { align: 'center', weight: 700 });
    txt('Thêm phân vân', 0, 50, 20, PR.red, { align: 'center', weight: 700 });
  });
  ctx.restore();
  if (TT >= tXem) {
    m16Mark(350, 910, 32, false);
  }

  // Right card: "Biết mình tìm gì"
  withT(730, 760, 0.02, 1, () => {
    pp(pR(-170, -210, 340, 420, 20), PR.paperW, { key: 'rf_r_bg', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -210, 340, 56, 12), PR.green, { key: 'rf_r_hdr', shadow: false, tex: 0.4 });
    txt('BIẾT ĐIỀU MÌNH TÌM', 0, -172, 22, PR.creamL, { align: 'center', weight: 800 });
    pp(pE(0, -60, 40, 40), PR.moneyL, { key: 'rf_r_ico', shadow: false, tex: 0.35 });
    txt('Có tiêu chí rõ ràng', 0, 10, 22, PR.char, { align: 'center', weight: 700 });
    txt('Chốt nhanh và chuẩn', 0, 50, 20, PR.green, { align: 'center', weight: 700 });
  });
  if (TT >= tTim) {
    m16Mark(730, 910, 32, true);
  }

  m16Tag('CÁCH QUYẾT ĐỊNH TỐT HƠN', CX, 500, PR.mustard, 1, 0, 32);

  if (TT >= tTim) {
    prStamp('BIẾT ĐIỀU MÌNH TÌM', CX, 1140, PR.green, tTim, { rot: 0.04, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tTim ? 'wow' : 'neutral', look: -25, key: 'b5' });
  prSign('BIẾT RÕ ĐIỀU MÌNH TÌM', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn thuộc nhóm quyết định nhanh hay suy nghĩ rất lâu trước khi chọn?
  const tTell = VW('cta', 'chọn').t0;
  const tNhanh = VW('cta', 'nhanh').t0;
  const tLau = VW('cta', 'lâu').t0;

  m16Room(TEAL2, true);
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(950, 480, 54, 10, 10, 'clk6');

  m16Tag('BÌNH CHỌN CỦA BẠN', CX, 580, PR.mustard, 1, 0, 32);

  // Comment box starts typing on the last word of the question
  prCommentBox(CX, 760, 'PHONG CÁCH CỦA BẠN', tTell, { hint: 'Bình luận cách bạn chọn…' });

  // Two option cards using exact narration words, NO emoji, NO invented numbers
  withT(CX, 960, -0.015, popS(tNhanh), () => {
    pp(pR(-340, -50, 680, 100, 20), PR.paperW, { key: 'opt_fast', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-270, 0, 30, 30), PR.green, { key: 'opt_f_ico', shadow: false, tex: 0.4 });
    m16Mark(-270, 0, 18, true);
    txt('QUYẾT ĐỊNH NHANH', -210, 2, fitSize('QUYẾT ĐỊNH NHANH', 440, 32), PR.char, { base: 'middle', weight: 800 });
  });

  withT(CX, 1100, 0.015, popS(tLau), () => {
    pp(pR(-340, -50, 680, 100, 20), PR.paperW, { key: 'opt_slow', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-270, 0, 30, 30), PR.orange, { key: 'opt_s_ico', shadow: false, tex: 0.4 });
    pp(pE(-270, 0, 16, 16), PR.paperW, { shadow: false, tex: false });
    txt('SUY NGHĨ RẤT LÂU', -210, 2, fitSize('SUY NGHĨ RẤT LÂU', 440, 32), PR.char, { base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN CHỌN NHANH HAY CHẬM?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['paradox', 'nhưng', 0, 'paradox_hard'],
  ['reaction', 'Không', 0, 'reaction_notless'],
  ['criteria', 'Hãy', 0, 'criteria_three'],
  ['criteria', 'Sau', 0, 'criteria_filter'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'trăm').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'gì').t0 });
  cues.push({ k: 'chime', t: VW('paradox', 'do').t0 });
  cues.push({ k: 'thud', t: VW('paradox', 'khăn').t0 });
  cues.push({ k: 'pop', t: VW('reaction', 'sánh').t0 });
  cues.push({ k: 'thud', t: VW('reaction', 'chốt').t0 });
  cues.push({ k: 'chime', t: VW('reaction', 'tốt', 1).t0 });
  cues.push({ k: 'pop', t: VW('criteria', 'rõ').t0 });
  cues.push({ k: 'chime', t: VW('criteria', 'nhất').t0 });
  cues.push({ k: 'thud', t: VW('criteria', 'loại').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'tìm').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'nhanh').t0 });
  return cues;
}

const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const ERA_BG = ERA_LIST.map(() => TEAL);
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
