// =====================================================================
//  TIDU MIND 05 — "Mạng xã hội có khiến bạn thấy mình thua kém?"
//  Bẫy so sánh xã hội (social comparison, Festinger 1954).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · TÂM LÝ XÃ HỘI';
const TEAL = '#2e4f4f';

const SCENES = {};

function ms5Heart(x, y, r, c = PR.red, key = 'heart') {
  pp(() => {
    ctx.moveTo(x, y + r * 0.85);
    ctx.bezierCurveTo(x - r * 1.6, y - r * 0.2, x - r * 0.6, y - r * 1.3, x, y - r * 0.45);
    ctx.bezierCurveTo(x + r * 0.6, y - r * 1.3, x + r * 1.6, y - r * 0.2, x, y + r * 0.85);
    ctx.closePath();
  }, c, { key, sb: 6, sy: 3, tex: 0.4 });
}

function ms5House(key) {
  pp(pR(-46, -8, 92, 66, 4), PR.creamL, { key: key + 'hb', sb: 8, sy: 4, tex: 0.4 });
  pp(pG([[-62, -4], [0, -62], [62, -4]]), PR.red, { key: key + 'hr', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(-12, 18, 26, 40, 4), PR.wood, { key: key + 'hd', shadow: false, tex: 0.4 });
  pp(pR(18, 6, 20, 20, 3), PR.sky, { key: key + 'hw', shadow: false, tex: 0.3 });
}

function ms5Plane(key) {
  pp(pG([[-8, -4], [26, -4], [-22, -58]]), PR.creamL, { key: key + 'pw1', sb: 6, sy: 3, tex: 0.4 });
  pp(pE(0, 0, 70, 15), PR.paperW, { key: key + 'pb', sb: 8, sy: 4, tex: 0.4 });
  pp(pG([[-8, 4], [26, 4], [-22, 58]]), PR.cream, { key: key + 'pw2', sb: 6, sy: 3, tex: 0.4 });
  pp(pG([[-66, -4], [-50, -4], [-72, -32]]), PR.red, { key: key + 'pt', shadow: false, tex: 0.4 });
}

function ms5Case(key) {
  pp(pR(-24, -46, 48, 24, 8), PR.woodD, { key: key + 'ch', shadow: false, tex: 0.4 });
  pp(pR(-58, -28, 116, 80, 10), PR.brown, { key: key + 'cb', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(-58, 0, 116, 6, 2), PR.woodD, { key: key + 'cs', shadow: false });
  pp(pG([[62, -30], [92, -70], [122, -30], [104, -30], [104, 10], [80, 10], [80, -30]]), PR.mustard, { key: key + 'ca', sb: 6, sy: 3, tex: 0.4 });
}

const MS5_ICON = { house: [ms5House, '#7fb2c9'], plane: [ms5Plane, '#5f97c9'], case: [ms5Case, '#c9b28a'] };

// a feed post: photo on the left, title and likes on the right
function ms5Post(cx, cy, k, kind, title, key) {
  if (k <= 0.01) return;
  withT(cx, cy, 0, k, () => {
    pp(pR(-310, -120, 620, 240, 18), PR.creamL, { key: key + 'card', sb: 16, sy: 8, tex: 0.45 });
    const [icon, bg] = MS5_ICON[kind];
    pp(pR(-290, -100, 220, 200, 12), bg, { key: key + 'ph', shadow: false, tex: 0.5 });
    withT(-180, 6, 0, 1.15, () => icon(key));
    const s = fitSize(title, 340, 44);
    txt(title, -40, -10, s, PR.navy, { weight: 800 });
    ms5Heart(-18, 50, 18, PR.red, key + 'lk');
    pp(pR(14, 42, 130, 16, 8), '#d8d2c4', { key: key + 'bar', shadow: false, tex: 0.3 });
    pp(pR(160, 42, 80, 16, 8), '#d8d2c4', { key: key + 'bar2', shadow: false, tex: 0.3 });
  });
}

// a phone; fn draws the screen inside a clip (screen origin = top-left of the glass)
function ms5Phone(cx, cy, w, h, k, fn) {
  if (k <= 0.01) return;
  withT(cx, cy, 0, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, 54), PR.char, { key: 'ph5', sb: 22, sy: 11, tex: 0.35 });
    const gx = -w / 2 + 22, gy = -h / 2 + 60, gw = w - 44, gh = h - 110;
    pp(pR(gx, gy, gw, gh, 20), '#ece8de', { key: 'ph5g', shadow: false, tex: 0.3 });
    pp(pR(-50, -h / 2 + 24, 100, 14, 7), '#3a3d44', { key: 'ph5s', shadow: false });
    ctx.save(); ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 20); ctx.clip();
    ctx.translate(gx, gy); fn(gw, gh);
    ctx.restore();
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // Mở mạng xã hội: bảng tin cuộn liên tục những thành công
  const tOpen = VW('hook', 'mở').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(930, 520, 64, 3, 30, 'clk1');
  prStar(140, 420, 36, PR.mustard);
  prStar(150, 1220, 26, PR.pink);
  prStar(930, 1200, 30, PR.mustard);

  const kinds = ['house', 'plane', 'case'];
  ms5Phone(540, 880, 480, 860, 1, (gw, gh) => {
    pp(pR(0, 0, gw, 70, 0), PR.navy, { key: 'ph5bar', shadow: false, tex: 0.3 });
    ms5Heart(gw - 44, 36, 14, PR.pink, 'ph5h');
    pp(pR(24, 26, 140, 20, 10), PR.creamL, { key: 'ph5t', shadow: false });
    const off = Math.max(0, TT - tOpen) * 110;
    for (let i = 0; i < 9; i++) {
      const y = 90 + i * 250 - off;
      if (y < -260 || y > gh + 20) continue;
      const kk = 'f5' + i;
      pp(pR(16, y, gw - 32, 230, 14), PR.paperW, { key: kk + 'c', sb: 6, sy: 3, tex: 0.35 });
      pp(pE(46, y + 30, 18, 18), [PR.mindL, PR.pink, PR.tealL][i % 3], { key: kk + 'a', shadow: false });
      pp(pR(74, y + 22, 120, 14, 7), '#d8d2c4', { key: kk + 'n', shadow: false });
      const [icon, bg] = MS5_ICON[kinds[i % 3]];
      pp(pR(30, y + 58, gw - 60, 130, 10), bg, { key: kk + 'p', shadow: false, tex: 0.5 });
      withT(gw / 2, y + 126, 0, 0.9, () => icon(kk));
      ms5Heart(48, y + 208, 12, PR.red, kk + 'h');
    }
  });
  prBurst(540, 640, VW('hook', 'công').t0, { n: 18 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b1' });
  prSign('NGƯỜI KHÁC LIÊN TỤC THÀNH CÔNG?', { kicker: KICK });
  prChips();
};

SCENES.hook2 = () => {   // Người mua nhà, người đi du lịch, người vừa được thăng chức
  prWall('#3a5c5c', { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(930, 1300, 56, 6, 10, 'clk1b');
  prStar(120, 1320, 30, PR.mustard);
  prStar(960, 420, 24, PR.pink);

  ms5Post(540, 560, popS(VW('hook', 'mua').t0 - 0.1), 'house', 'VỪA MUA NHÀ', 'p1');
  ms5Post(540, 860, popS(VW('hook', 'đi').t0 - 0.1), 'plane', 'ĐI DU LỊCH', 'p2');
  ms5Post(540, 1160, popS(VW('hook', 'vừa').t0 - 0.1), 'case', 'VỪA THĂNG CHỨC', 'p3');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'wow', look: -30, key: 'b1b' });
  prSign('NHÀ MỚI, DU LỊCH, THĂNG CHỨC', { kicker: KICK });
  prChips();
};

SCENES.slow = () => {   // Nhìn lại cuộc sống của mình: sao mình chậm thế?
  const t0 = E0, tAsk = VW('slow', 'sao').t0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  // cửa sổ đêm + lịch treo tường
  pp(pR(150, 420, 300, 300, 12), PR.woodD, { key: 'win5', sb: 14, sy: 7, tex: 0.5 });
  pp(pR(170, 440, 260, 260, 6), '#1f2f4a', { key: 'win5i', shadow: false, tex: 0.5 });
  pp(pE(370, 500, 30, 30), PR.creamL, { key: 'moon5', shadow: false });
  prStar(230, 600, 12, PR.yellow); prStar(300, 520, 9, PR.yellow);
  pp(pR(296, 440, 8, 260, 0), PR.woodD, { key: 'win5m', shadow: false });
  pp(pR(620, 440, 220, 250, 8), PR.creamL, { key: 'cal5', sb: 12, sy: 6, tex: 0.5 });
  pp(pR(620, 440, 220, 60, 8), PR.red, { key: 'cal5h', shadow: false, tex: 0.5 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) pp(pR(640 + c * 40, 520 + r * 40, 26, 26, 4), '#d8d2c4', { key: 'cal5' + r + c, shadow: false });

  // bàn làm việc
  const dk = popS(t0 + 0.1);
  withT(540, 1080, 0, dk, () => {
    pp(pR(-350, 20, 36, 400, 6), PR.woodD, { key: 'leg5a', sb: 10, sy: 5 });
    pp(pR(314, 20, 36, 400, 6), PR.woodD, { key: 'leg5b', sb: 10, sy: 5 });
    pp(pR(-390, -20, 780, 46, 10), PR.wood, { key: 'desk5', sb: 16, sy: 8, tex: 0.5 });
    // laptop
    pp(pR(-250, -220, 300, 196, 14), PR.char, { key: 'lap5', sb: 12, sy: 6, tex: 0.35 });
    pp(pR(-236, -206, 272, 168, 8), '#3b5f7a', { key: 'lap5s', shadow: false, tex: 0.4 });
    pp(pR(-210, -180, 150, 14, 7), 'rgba(244,241,232,0.6)', { key: 'lap5l1', shadow: false });
    pp(pR(-210, -150, 210, 14, 7), 'rgba(244,241,232,0.4)', { key: 'lap5l2', shadow: false });
    pp(pG([[-280, -24], [80, -24], [100, -14], [-300, -14]]), '#4a4d55', { key: 'lap5b', sb: 6, sy: 3 });
    // cốc
    pp(pR(176, -90, 34, 50, 14), PR.mustard, { key: 'mug5h', sb: 6, sy: 3 });
    pp(pR(120, -110, 76, 92, 14), PR.mustard, { key: 'mug5', sb: 8, sy: 4, tex: 0.5 });
    chalkLine([[146, -130], [140, -150], [148, -170]], 1, { w: 5, color: 'rgba(244,244,236,0.5)' });
    chalkLine([[172, -130], [166, -150], [174, -170]], 1, { w: 5, color: 'rgba(244,244,236,0.5)' });
    // giấy tờ
    pp(pR(240, -60, 120, 44, 4), PR.paperW, { key: 'doc5a', sb: 6, sy: 3, tex: 0.4 });
    pp(pR(250, -86, 110, 30, 4), PR.cream, { key: 'doc5b', sb: 6, sy: 3, tex: 0.4 });
  });
  // ốc sên bò chậm trên mép bàn
  const sx = 230 + Math.max(0, TT - t0) * 10;
  if (dk > 0.9) {
    pp(pR(sx - 58, 1040, 120, 20, 10), '#9fae8a', { key: 'sn5b', sb: 6, sy: 3, tex: 0.5 });
    pp(pR(sx + 46, 1006, 8, 40, 4), '#9fae8a', { key: 'sn5e', shadow: false });
    pp(pE(sx + 50, 1004, 8, 8), '#9fae8a', { key: 'sn5ee', shadow: false });
    pp(pE(sx - 8, 1012, 40, 36), PR.brown, { key: 'sn5s', sb: 8, sy: 4, tex: 0.6 });
    pp(pE(sx - 8, 1012, 22, 20), PR.tan, { key: 'sn5i', shadow: false, tex: 0.5 });
    pp(pE(sx - 8, 1012, 9, 8), PR.brown, { key: 'sn5c', shadow: false });
  }

  prThought(540, 580, 700, 230, 800, 820, 'SAO MÌNH CHẬM THẾ?', { t: tAsk, key: 'th5', size: 56 });
  prClock(930, 820, 56, 11, 45, 'clk2');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tAsk ? 'flat' : 'neutral', look: -35, key: 'b2' });
  prSign('TỰ HỎI: SAO MÌNH CHẬM THẾ?', { kicker: KICK });
  prChips();
};

SCENES.iceberg = () => {   // Nhưng có một điều cần nhớ
  const t0 = E0, tNho = VW('iceberg', 'nhớ').t0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(930, 1260, 56, 4, 0, 'clk3');
  prStar(130, 1280, 30, PR.mustard);
  pp(pR(110, 400, 150, 150, 3), PR.yellow, { key: 'n3a', sb: 8, sy: 4, tex: 0.5 });
  pp(pR(840, 380, 140, 140, 3), PR.pink, { key: 'n3b', sb: 8, sy: 4, tex: 0.5 });

  withT(540, 880, -0.02, popS(t0 + 0.15), () => {
    pp(pR(-320, -300, 640, 600, 6), PR.creamL, { key: 'memo3', sb: 20, sy: 10, tex: 0.5 });
    pp(pR(-320, -300, 640, 70, 6), PR.mustard, { key: 'memo3h', shadow: false, tex: 0.5 });
    pp(pE(0, -300, 22, 22), PR.red, { key: 'pin3', sb: 8, sy: 4 });
    pp(pE(0, -60, 110, 110), PR.red, { key: 'bang3', sb: 12, sy: 6, tex: 0.5 });
    txt('!', 0, -60, 170, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('ĐIỀU CẦN NHỚ', 0, 160, fitSize('ĐIỀU CẦN NHỚ', 540, 72), PR.navy, { align: 'center', weight: 800, frac: ev(tNho - 0.6, 0.6) });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('MỘT ĐIỀU CẦN NHỚ', { kicker: KICK });
  prChips();
};

SCENES.iceberg2 = () => {   // Những gì thấy trên mạng chỉ là một phần cuộc sống
  const tTip = VW('iceberg', 'thấy').t0, tDeep = VW('iceberg', 'chỉ').t0, tPart = VW('iceberg', 'phần').t0;
  const SEA = 760;
  prWall('#4a6f80', { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pE(180, 430, 46, 46), PR.yellow, { key: 'sun4', sb: 10, sy: 5 });
  pp(pE(860, 440, 70, 26), PR.creamL, { key: 'cl4a', sb: 8, sy: 4, tex: 0.4 });
  pp(pE(820, 430, 44, 30), PR.creamL, { key: 'cl4b', shadow: false, tex: 0.4 });

  // phần chìm
  const deep = ev(tDeep, 0.7);
  ctx.save(); ctx.globalAlpha = deep;
  pp(pG([[400, SEA], [680, SEA], [860, 900], [930, 1120], [830, 1340], [540, 1440], [250, 1340], [150, 1110], [220, 900]]), '#bcdbe3', { key: 'berg4d', shadow: false, tex: 0.6 });
  ctx.restore();
  // mặt nước
  pp(pR(-40, SEA, W + 80, 1500 - SEA, 0), 'rgba(28,70,104,0.62)', { key: 'sea4', shadow: false, tex: 0.5 });
  for (let i = 0; i < 6; i++) pp(pE(90 + i * 180 + Math.sin(TT * 2 + i) * 10, SEA + 6, 50, 6), 'rgba(244,241,232,0.5)', { key: 'wv4' + i, shadow: false });
  // phần nổi
  const tip = popS(tTip - 0.1);
  if (tip > 0.01) withT(540, SEA, 0, tip, () => {
    pp(pG([[-150, 0], [-70, -150], [-20, -200], [60, -140], [150, 0]]), '#eef6f7', { key: 'berg4t', sb: 12, sy: 6, tex: 0.5 });
  });
  const lab = popS(tTip);
  if (lab > 0.01) withT(540, 470, 0, lab, () => {
    pp(pR(-230, -38, 460, 76, 14), PR.navy, { key: 'tag4', sb: 10, sy: 5, tex: 0.4 });
    txt('NHỮNG GÌ BẠN THẤY', 0, 14, fitSize('NHỮNG GÌ BẠN THẤY', 420, 38), PR.creamL, { align: 'center', weight: 800 });
  });
  // nhãn phần chìm
  if (deep > 0.5) {
    txt('CUỘC SỐNG THẬT', 540, 900, 52, PR.navy, { align: 'center', weight: 800, frac: ev(tDeep + 0.2, 0.6) });
    [['NGÀY MỆT', 370, 1020], ['LẦN THẤT BẠI', 710, 1020], ['VIỆC THƯỜNG NGÀY', 540, 1140], ['LÚC LO LẮNG', 540, 1260]].forEach(([s, x, y], i) => {
      const k = popS(tPart - 0.3 + i * 0.15); if (k <= 0.01) return;
      withT(x, y, (i % 2 ? 0.03 : -0.03), k, () => {
        const w = txtW(s, 34) + 48;
        pp(pR(-w / 2, -32, w, 64, 12), PR.creamL, { key: 'dt4' + i, sb: 8, sy: 4, tex: 0.45 });
        txt(s, 0, 12, 34, PR.navy, { align: 'center', weight: 800 });
      });
    });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT >= tPart ? 'wow' : 'neutral', look: -25, key: 'b3b', hold: propGlass(0.15) });
  prSign('TRÊN MẠNG CHỈ LÀ MỘT PHẦN', { kicker: KICK });
  prChips();
};

SCENES.compare = () => {   // Cả hành trình của mình vs khoảnh khắc được chọn đăng
  const tA = VW('compare', 'hành').t0, tV = VW('compare', 'so').t0, tB = VW('compare', 'khoảnh').t0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(130, 1300, 30, PR.mustard);
  prClock(930, 1300, 52, 4, 15, 'clk4');

  // trái: cuộn phim dài = cả hành trình
  withT(320, 880, -0.02, popS(tA - 0.1), () => {
    pp(pR(-190, -320, 380, 640, 18), '#3c5f6e', { key: 'c4a', sb: 16, sy: 8, tex: 0.5 });
    txt('CẢ HÀNH TRÌNH', 0, -250, fitSize('CẢ HÀNH TRÌNH', 330, 40), PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-110, -200, 220, 480, 8), PR.char, { key: 'film4', sb: 8, sy: 4, tex: 0.3 });
    for (let i = 0; i < 12; i++) { pp(pR(-100, -190 + i * 40, 14, 18, 3), '#ece8de', { key: 'fh4a' + i, shadow: false }); pp(pR(86, -190 + i * 40, 14, 18, 3), '#ece8de', { key: 'fh4b' + i, shadow: false }); }
    const cols = ['#8a9aa0', '#5f7a9c', PR.yellow, '#7c7f86', '#c9b28a', '#6b8f7a'];
    cols.forEach((c, i) => pp(pR(-76, -190 + i * 78, 152, 66, 4), c, { key: 'fr4' + i, shadow: false, tex: 0.5 }));
    for (let j = 0; j < 4; j++) pp(pR(-50 + j * 30, -100, 4, 18, 2), 'rgba(244,241,232,0.8)', { key: 'rain4' + j, shadow: false });
    pp(pE(0, -10, 20, 20), PR.creamL, { key: 'sun4f', shadow: false });
  });
  // phải: 1 tấm ảnh = khoảnh khắc được chọn đăng
  withT(760, 880, 0.03, popS(tB - 0.1), () => {
    pp(pR(-190, -320, 380, 640, 18), '#9e5050', { key: 'c4b', sb: 16, sy: 8, tex: 0.5 });
    txt('KHOẢNH KHẮC', 0, -250, fitSize('KHOẢNH KHẮC', 330, 40), PR.creamL, { align: 'center', weight: 800 });
    txt('ĐƯỢC CHỌN ĐĂNG', 0, -200, fitSize('ĐƯỢC CHỌN ĐĂNG', 330, 32), PR.yellow, { align: 'center', weight: 800 });
    withT(0, 70, -0.05, 1, () => {
      pp(pR(-130, -150, 260, 300, 6), PR.paperW, { key: 'pol4', sb: 12, sy: 6, tex: 0.4 });
      pp(pR(-110, -130, 220, 200, 4), '#7fb2c9', { key: 'pol4i', shadow: false, tex: 0.5 });
      pp(pE(50, -80, 28, 28), PR.yellow, { key: 'pol4s', shadow: false });
      pp(pG([[-110, 70], [-40, -20], [20, 40], [60, 0], [110, 70]]), '#5f9f52', { key: 'pol4m', shadow: false, tex: 0.5 });
      ms5Heart(0, 112, 20, PR.red, 'pol4h');
    });
  });
  // "so với"
  if (TT >= tV) withT(540, 880, 0, popS(tV), () => {
    pp(pE(0, 0, 62, 62), PR.mustard, { key: 'vs4', sb: 12, sy: 6, tex: 0.5 });
    txt('VS', 0, 4, 44, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('SO SÁNH KHẬP KHIỄNG', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // So sánh: đôi khi tạo động lực, cũng có thể khiến nản lòng
  const tUp = VW('reframe', 'tạo').t0, tDown = VW('reframe', 'nản').t0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(130, 1300, 32, PR.mustard);
  prClock(930, 1300, 52, 4, 30, 'clk5');

  withT(320, 880, -0.02, popS(tUp - 0.1), () => {
    pp(pR(-190, -280, 380, 560, 18), '#3f7d5a', { key: 'r5a', sb: 16, sy: 8, tex: 0.5 });
    txt('ĐÔI KHI', 0, -210, 30, PR.yellow, { align: 'center', weight: 800 });
    pp(pG([[0, -160], [110, -30], [45, -30], [45, 120], [-45, 120], [-45, -30], [-110, -30]]), PR.mustard, { key: 'r5au', sb: 10, sy: 5, tex: 0.5 });
    txt('TẠO ĐỘNG LỰC', 0, 210, fitSize('TẠO ĐỘNG LỰC', 330, 42), PR.creamL, { align: 'center', weight: 800 });
  });
  withT(760, 880, 0.03, popS(tDown - 0.1), () => {
    pp(pR(-190, -280, 380, 560, 18), '#9e5050', { key: 'r5b', sb: 16, sy: 8, tex: 0.5 });
    txt('CŨNG CÓ THỂ', 0, -210, 30, '#f8d0d0', { align: 'center', weight: 800 });
    pp(pG([[0, 140], [110, 10], [45, 10], [45, -140], [-45, -140], [-45, 10], [-110, 10]]), '#d9d2c3', { key: 'r5bd', sb: 10, sy: 5, tex: 0.5 });
    txt('NẢN LÒNG', 0, 210, fitSize('NẢN LÒNG', 330, 42), PR.creamL, { align: 'center', weight: 800 });
  });

  const mood = TT >= tDown ? 'flat' : TT >= tUp ? 'happy' : 'neutral';
  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood, look: -20, key: 'b5' });
  prSign('SO SÁNH CÓ HAI MẶT', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // Đổi câu hỏi: hôm nay mình tiến bộ gì so với mình trước đây?
  const tSwap = VW('cta', 'đổi').t0, tNew = VW('cta', 'hôm').t0, tPast = VW('cta', 'tiến').t0, tNow = VW('cta', 'bộ').t0, tArrow = VW('cta', 'so').t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(130, 760, 30, PR.mustard);
  prStar(950, 740, 26, PR.pink);

  // thẻ câu hỏi: câu cũ bị gạch, lật sang câu mới
  const flip = clamp((TT - tNew) / 0.3), sy = flip < 0.5 ? 1 - flip * 2 : flip * 2 - 1;
  withT(540, 520, 0, 1, () => {
    ctx.save(); ctx.scale(1, Math.max(0.02, sy));
    if (flip < 0.5) {
      pp(pR(-410, -80, 820, 160, 18), PR.creamL, { key: 'q6a', sb: 14, sy: 7, tex: 0.5 });
      txt('SAO MÌNH CHẬM THẾ?', 0, 18, fitSize('SAO MÌNH CHẬM THẾ?', 740, 56), '#7c7f86', { align: 'center', weight: 800 });
      const st = ev(tSwap, 0.4);
      if (st > 0) pp(pR(-330, 0, 660 * st, 10, 5), PR.red, { key: 'q6s', shadow: false });
    } else {
      pp(pR(-410, -80, 820, 160, 18), '#3f7d5a', { key: 'q6b', sb: 14, sy: 7, tex: 0.5 });
      const q = 'HÔM NAY MÌNH TIẾN BỘ ĐIỀU GÌ?';
      txt(q, 0, 18, fitSize(q, 740, 52), PR.creamL, { align: 'center', weight: 800 });
    }
    ctx.restore();
  });

  // bậc thang: mình trước đây -> mình hôm nay
  const kS = popS(E0 + 0.15), kP = popS(tPast - 0.1), kN = popS(tNow - 0.1);
  withT(340, 1500, 0, kS, () => pp(pR(-190, -300, 380, 300, 12), '#4f7272', { key: 'st6a', sb: 16, sy: 8, tex: 0.5 }));
  withT(740, 1500, 0, kS, () => pp(pR(-190, -520, 380, 520, 12), '#5f8f86', { key: 'st6b', sb: 16, sy: 8, tex: 0.5 }));
  if (kP > 0.01) withT(340, 1340, 0, kP, () => txt('MÌNH TRƯỚC ĐÂY', 0, 0, fitSize('MÌNH TRƯỚC ĐÂY', 330, 40), PR.creamL, { align: 'center', weight: 800 }));
  if (kN > 0.01) withT(740, 1070, 0, kN, () => txt('MÌNH HÔM NAY', 0, 0, fitSize('MÌNH HÔM NAY', 330, 40), PR.creamL, { align: 'center', weight: 800 }));
  if (kP > 0.5) brainy(340, 1168, { s: 0.36, hat: 'nightcap', mood: 'neutral', key: 'b6p' });
  if (kN > 0.5) brainy(740, 948, { s: 0.36, hat: 'mortar', mood: 'happy', key: 'b6n' });
  if (TT >= tArrow) withT(540, 900, -0.5, popS(tArrow), () => {
    pp(pG([[-70, -16], [30, -16], [30, -44], [80, 0], [30, 44], [30, 16], [-70, 16]]), PR.mustard, { key: 'ar6', sb: 10, sy: 5, tex: 0.5 });
  });
  prBurst(740, 640, tNow + 0.2, { n: 14 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: TT >= tNew ? 'happy' : 'neutral', key: 'b6', look: -20 });
  prSign('THỬ ĐỔI CÂU HỎI', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [['hook', 'người', 1, 'hook2'], ['iceberg', 'những', 0, 'iceberg2']];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'mở').t0 });
  ['mua', 'đi', 'vừa'].forEach((w) => cues.push({ k: 'pop', t: VW('hook', w).t0 - 0.1 }));
  cues.push({ k: 'tick', t: VL('slow').t0 + 0.2 });
  cues.push({ k: 'pop', t: VW('slow', 'sao').t0 });
  cues.push({ k: 'pop', t: VL('iceberg').t0 + 0.15 });
  cues.push({ k: 'thud', t: VW('iceberg', 'chỉ').t0 });
  cues.push({ k: 'pop', t: VW('compare', 'hành').t0 - 0.1 });
  cues.push({ k: 'pop', t: VW('compare', 'khoảnh').t0 - 0.1 });
  cues.push({ k: 'chime', t: VW('reframe', 'tạo').t0 - 0.1 });
  cues.push({ k: 'thud', t: VW('reframe', 'nản').t0 - 0.1 });
  cues.push({ k: 'tick', t: VW('cta', 'hôm').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'bộ').t0 });
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
