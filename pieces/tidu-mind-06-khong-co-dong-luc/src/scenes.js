// =====================================================================
//  TIDU MIND 06 — "Không có động lực thì bắt đầu bằng cách nào?"
//  Hành vi & thói quen: thu nhỏ bước đầu tiên.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THÓI QUEN';
const TEAL = '#2e4f4f';

const SCENES = {};

// a paper mountain: base centred at (cx, by), w wide, h tall, with a snow cap and a summit flag
function m6Mountain(cx, by, w, h, key, o = {}) {
  pp(pG([[cx - w / 2, by], [cx - w * 0.06, by - h], [cx + w * 0.04, by - h * 0.96], [cx + w / 2, by]]), o.fill ?? '#8d9c97', { key: key + 'b', sb: 18, sy: 9, tex: 0.55 });
  pp(pG([[cx + w * 0.04, by - h * 0.96], [cx + w / 2, by], [cx + w * 0.12, by]]), 'rgba(0,0,0,0.12)', { key: key + 's', shadow: false });
  pp(pG([[cx - w * 0.17, by - h * 0.7], [cx - w * 0.06, by - h], [cx + w * 0.04, by - h * 0.96], [cx + w * 0.15, by - h * 0.72], [cx + w * 0.05, by - h * 0.78], [cx - w * 0.05, by - h * 0.68]]), PR.creamL, { key: key + 'c', shadow: false, tex: 0.4 });
  if (o.flag !== false) {
    const fx = cx - w * 0.06, fy = by - h;
    pp(pR(fx - 3, fy - 90, 6, 92, 2), PR.woodD, { key: key + 'fp', shadow: false });
    pp(pG([[fx + 3, fy - 90], [fx + 70, fy - 70], [fx + 3, fy - 50]]), PR.red, { key: key + 'ff', sb: 6, sy: 3, tex: 0.4 });
  }
}

function m6Rock(x, y, rx, ry, fill, key) {
  pp(() => { ctx.moveTo(x - rx, y + ry * 0.6); ctx.quadraticCurveTo(x - rx * 1.05, y - ry * 0.7, x - rx * 0.2, y - ry); ctx.quadraticCurveTo(x + rx * 0.9, y - ry * 1.05, x + rx, y + ry * 0.2); ctx.quadraticCurveTo(x + rx * 0.9, y + ry, x, y + ry); ctx.quadraticCurveTo(x - rx * 0.8, y + ry, x - rx, y + ry * 0.6); ctx.closePath(); }, fill, { key, sb: 12, sy: 6, tex: 0.6 });
}

function m6Tag(str, x, y, size, fill, color, key, rot = 0, k = 1) {
  if (k <= 0.01) return;
  withT(x, y, rot, k, () => {
    const w = txtW(str, size) + 50, h = size * 1.7;
    pp(pR(-w / 2, -h / 2, w, h, 12), fill, { key, sb: 10, sy: 5, tex: 0.45 });
    txt(str, 0, size * 0.36, size, color, { align: 'center', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // Không cần cả ngọn núi hôm nay; bắt đầu bằng một viên đá
  const tRock = VW('hook', 'viên').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 420, 34, PR.mustard);
  prStar(930, 430, 26, PR.pink);
  pp(pE(820, 560, 80, 26), PR.creamL, { key: 'cl1', sb: 8, sy: 4, tex: 0.4 });
  pp(pE(250, 640, 64, 22), PR.creamL, { key: 'cl1b', sb: 8, sy: 4, tex: 0.4 });

  m6Mountain(540, 1440, 860, 900, 'mt1');
  const kR = popS(tRock - 0.05);
  if (kR > 0.01) withT(540, 1340, 0, kR, () => m6Rock(0, 0, 110, 70, PR.mustard, 'rk1'));
  m6Tag('MỘT VIÊN ĐÁ', 540, 1180, 44, PR.creamL, PR.navy, 'tg1', -0.03, popS(tRock + 0.1));
  prBurst(540, 1330, tRock + 0.05, { n: 14 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tRock ? 'happy' : 'neutral', look: -30, key: 'b1' });
  prSign('BẮT ĐẦU BẰNG MỘT VIÊN ĐÁ', { kicker: KICK });
  prChips();
};

SCENES.heavy = () => {   // Việc trông quá lớn -> ngại bắt đầu
  const tBig = VW('heavy', 'quá').t0, tNgai = VW('heavy', 'ngại').t0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(935, 520, 56, 9, 45, 'clk2');
  prStar(140, 430, 30, PR.pink);
  prStar(150, 1250, 26, PR.mustard);

  // chồng hồ sơ cao dần lên khi "quá lớn"
  const g = EZ.o3 ? EZ.o3(ev(tBig, 0.6)) : ev(tBig, 0.6);
  const n = Math.round(4 + 10 * g), cols = ['#c9b28a', PR.creamL, '#7fb2c9', PR.cream, '#e9a3a3', '#a9cfd8'];
  withT(540, 1440, 0, popS(E0 + 0.15), () => {
    for (let i = 0; i < n; i++) {
      const w = 380 - (i % 3) * 16, dx = ((i * 37) % 5 - 2) * 8;
      pp(pR(-w / 2 + dx, -(i + 1) * 70, w, 64, 6), cols[i % cols.length], { key: 'fo2' + i, sb: 8, sy: 4, tex: 0.5 });
      pp(pR(-w / 2 + dx + 30, -(i + 1) * 70 - 10, 90, 16, 4), cols[i % cols.length], { key: 'fot2' + i, shadow: false, tex: 0.4 });
    }
  });
  prStamp('NGẠI BẮT ĐẦU', 540, 820, PR.red, tNgai, { rot: -0.08, size: 66, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tNgai ? 'flat' : 'neutral', look: -35, key: 'b2' });
  prSign('KHI VIỆC TRÔNG QUÁ LỚN', { kicker: KICK });
  prChips();
};

SCENES.heavy2 = () => {   // Báo cáo hai mươi trang nghe thật nặng nề
  const tDoc = VW('heavy', 'viết').t0, tN = VW('heavy', 'hai').t0, tHeavy = VW('heavy', 'nặng').t0;
  prWall('#3d4f5c', { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(935, 1250, 52, 10, 0, 'clk2b');
  prStar(140, 1260, 28, PR.mustard);
  pp(pR(820, 400, 140, 140, 3), PR.yellow, { key: 'n2b', sb: 8, sy: 4, tex: 0.5 });

  const drop = ev(tHeavy, 0.18), dy = drop * 120;
  withT(540, 860 + dy, -0.03 * (1 - drop), popS(tDoc), () => {
    for (let i = 8; i >= 1; i--) pp(pR(-250 + i * 6, -330 + i * 8, 500, 660, 10), i % 2 ? PR.cream : PR.paperW, { key: 'pg2' + i, sb: 6, sy: 3, tex: 0.4 });
    pp(pR(-250, -330, 500, 660, 10), PR.creamL, { key: 'rep2', sb: 18, sy: 9, tex: 0.5 });
    pp(pR(-250, -330, 500, 130, 10), PR.navy, { key: 'rep2h', shadow: false, tex: 0.4 });
    txt('BÁO CÁO', 0, -245, 64, PR.creamL, { align: 'center', weight: 800 });
    for (let i = 0; i < 5; i++) pp(pR(-190, -140 + i * 50, i % 2 ? 300 : 380, 16, 8), '#d8d2c4', { key: 'rl2' + i, shadow: false });
    if (TT >= tN) {
      const v = countUp(tN, 0.5, 1, 20);
      pp(pR(-170, 140, 340, 130, 16), PR.yellow, { key: 'ct2', sb: 10, sy: 5, tex: 0.5 });
      txt(v + ' TRANG', 0, 230, 64, PR.navy, { align: 'center', weight: 800 });
    }
  });
  if (TT >= tHeavy) {
    prBurst(330, 1200, tHeavy + 0.15, { n: 10, cols: [PR.cream, PR.creamL, PR.grey] });
    prBurst(750, 1200, tHeavy + 0.15, { n: 10, cols: [PR.cream, PR.creamL, PR.grey] });
    m6Tag('NẶNG NỀ', 540, 440, 64, PR.red, PR.creamL, 'tg2', -0.04, popS(tHeavy + 0.1));
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: TT >= tHeavy ? 'flat' : 'wow', look: -30, key: 'b2b' });
  prSign('BÁO CÁO HAI MƯƠI TRANG', { kicker: KICK });
  prChips();
};

SCENES.small = () => {   // Mở tài liệu và viết ba dòng thì sao?
  const tOpen = VW('small', 'mở').t0, tWrite = VW('small', 'viết').t0, tSao = VW('small', 'sao').t0;
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(935, 1250, 52, 8, 5, 'clk3');
  prStar(140, 1260, 30, PR.mustard);
  prStar(940, 420, 24, PR.pink);

  // cửa sổ tài liệu mở ra, ba dòng được gõ
  const k = popS(tOpen - 0.1);
  if (k > 0.01) withT(540, 860, 0, k, () => {
    pp(pR(-340, -360, 680, 720, 20), PR.char, { key: 'win3', sb: 20, sy: 10, tex: 0.35 });
    [PR.red, PR.yellow, PR.green].forEach((c, i) => pp(pE(-300 + i * 34, -322, 11, 11), c, { key: 'wd3' + i, shadow: false }));
    pp(pR(-316, -290, 632, 626, 10), PR.paperW, { key: 'page3', shadow: false, tex: 0.3 });
    txt('Báo cáo', -270, -215, 44, PR.navy, { weight: 800 });
    const lines = [520, 470, 380];
    lines.forEach((lw, i) => {
      const f = clamp((TT - tWrite - i * 0.25) / 0.3);
      if (f > 0) pp(pR(-270, -150 + i * 70, lw * f, 22, 11), '#6b7886', { key: 'ln3' + i, shadow: false, tex: 0.3 });
    });
    for (let i = 3; i < 7; i++) pp(pR(-270, -150 + i * 70, 520, 4, 2), '#e3ded2', { key: 'gl3' + i, shadow: false });
    const nDone = [0, 1, 2].filter((i) => TT >= tWrite + i * 0.25 + 0.3).length;
    if (nDone < 3 && TT >= tWrite) { const cy = -150 + nDone * 70; if (Math.floor(TT * 3) % 2 === 0) pp(pR(-270 + lines[nDone] * clamp((TT - tWrite - nDone * 0.25) / 0.3) + 6, cy - 8, 10, 38, 2), PR.orange, { key: 'cur3', shadow: false }); }
  });
  m6Tag('CHỈ 3 DÒNG?', 540, 1300, 48, PR.yellow, PR.navy, 'tg3', 0.03, popS(tSao - 0.1));

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT >= tSao ? 'wow' : 'neutral', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('MỞ FILE VÀ VIẾT 3 DÒNG', { kicker: KICK });
  prChips();
};

SCENES.small2 = () => {   // Bước nhỏ không giải quyết hết, nhưng cho một điểm khởi đầu rõ ràng
  const tAll = VW('small', 'toàn').t0, tStart = VW('small', 'điểm').t0;
  prWall('#3a5c5c', { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 430, 28, PR.mustard);
  pp(pE(860, 470, 70, 24), PR.creamL, { key: 'cl3', sb: 8, sy: 4, tex: 0.4 });

  withT(540, 760, 0, popS(E0 + 0.1), () => m6Mountain(0, 0, 520, 360, 'mt3'));
  // con đường từ chân màn hình lên núi
  const path = [[300, 1400], [520, 1300], [740, 1180], [560, 1060], [360, 960], [480, 860], [540, 780]];
  chalkLine(path, 1, { w: 14, color: 'rgba(244,241,232,0.7)', dash: [26, 22] });
  chalkLine(path.slice(0, 2), ev(E0 + 0.2, 0.5), { w: 16, color: PR.yellow });
  if (TT >= tAll) m6Tag('CHƯA PHẢI TOÀN BỘ', 540, 980, 34, '#4f7272', PR.creamL, 'tg3b', 0.03, popS(tAll));
  // cờ điểm khởi đầu
  const kS = popS(tStart - 0.1);
  if (kS > 0.01) withT(300, 1400, 0, kS, () => {
    pp(pE(0, 0, 50, 16), 'rgba(0,0,0,0.25)', { key: 'sh3', shadow: false });
    pp(pR(-4, -160, 8, 160, 3), PR.woodD, { key: 'sp3', sb: 6, sy: 3 });
    pp(pG([[4, -160], [120, -130], [4, -100]]), PR.red, { key: 'sf3', sb: 6, sy: 3, tex: 0.4 });
  });
  m6Tag('ĐIỂM KHỞI ĐẦU', 400, 1180, 42, PR.creamL, PR.navy, 'tg3c', -0.03, popS(tStart));

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT >= tStart ? 'happy' : 'neutral', look: -30, key: 'b3b' });
  prSign('ĐIỂM KHỞI ĐẦU RÕ RÀNG', { kicker: KICK });
  prChips();
};

SCENES.action = () => {   // Chọn một hành động đơn giản đến mức làm được ngay
  const tPick = VW('action', 'đơn').t0, tNow = VW('action', 'làm').t0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(935, 1250, 52, 4, 15, 'clk4');
  prStar(140, 1260, 30, PR.mustard);

  const opts = [['VIẾT XONG CẢ BÁO CÁO', 700, '#7c7f86'], ['VIẾT MỘT CHƯƠNG', 600, '#8a9aa0'], ['MỞ FILE, VIẾT 3 DÒNG', 640, '#3f7d5a']];
  opts.forEach(([s, w, c], i) => {
    const k = popS(E0 + 0.15 + i * 0.15), y = 560 + i * 260;
    const picked = i === 2 && TT >= tPick;
    const fade = i < 2 ? 1 - 0.55 * ev(tPick, 0.3) : 1;
    ctx.save(); ctx.globalAlpha = fade;
    withT(540, y, (i - 1) * 0.015, k * (picked ? 1 + 0.06 * EZ.back(clamp((TT - tPick) / 0.3)) : 1), () => {
      pp(pR(-w / 2, -90, w, 180, 18), picked ? PR.green : c, { key: 'op4' + i, sb: 14, sy: 7, tex: 0.5 });
      txt(s, 0, 16, fitSize(s, w - 70, 46), PR.creamL, { align: 'center', weight: 800 });
    });
    ctx.restore();
  });
  prCheck(860, 1080, tNow, 56);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tNow ? 'happy' : 'neutral', look: -25, key: 'b4', hold: propGlass(0.15) });
  prSign('ĐƠN GIẢN ĐẾN MỨC LÀM NGAY', { kicker: KICK });
  prChips();
};

SCENES.action2 = () => {   // Sau đó quyết định bước tiếp theo
  const tNext = VW('action', 'bước').t0;
  prWall('#2f5a50', { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 430, 30, PR.mustard);
  prStar(940, 420, 24, PR.pink);

  // bậc đá: bậc 1 đã xong, bậc 2 hiện ra
  const stones = [[260, 1300, 150, 60], [480, 1080, 140, 56], [690, 860, 130, 52], [860, 660, 110, 46]];
  stones.forEach(([x, y, rx, ry], i) => {
    const on = i === 0 || (i === 1 && TT >= tNext);
    const k = i === 1 ? 1 : popS(E0 + 0.1 + i * 0.1);
    if (k > 0.01) withT(x, y, 0, i === 1 && on ? 1 + 0.08 * Math.sin(clamp((TT - tNext) / 0.4) * Math.PI) : k, () => m6Rock(0, 0, rx, ry, on ? PR.mustard : '#5d7676', 'st5' + i));
  });
  prCheck(260, 1300, E0 + 0.25, 46);
  m6Tag('ĐÃ XONG', 260, 1180, 34, PR.creamL, PR.navy, 'tg5a', -0.03, popS(E0 + 0.3));
  m6Tag('BƯỚC TIẾP THEO?', 480, 950, 40, PR.yellow, PR.navy, 'tg5b', 0.03, popS(tNext));
  if (TT >= tNext) withT(380, 1180, -0.75, popS(tNext), () => pp(pG([[-60, -14], [20, -14], [20, -40], [66, 0], [20, 40], [20, 14], [-60, 14]]), PR.creamL, { key: 'ar5', sb: 8, sy: 4, tex: 0.4 }));

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: TT >= tNext ? 'happy' : 'neutral', look: -35, key: 'b4b' });
  prSign('QUYẾT ĐỊNH BƯỚC TIẾP THEO', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // Không đổi mục tiêu, đổi kích thước bước đầu tiên
  const tGoal = VW('reframe', 'mục').t0, tSize = VW('reframe', 'kích').t0;
  prWall(TEAL, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(935, 1250, 52, 4, 30, 'clk5');
  prStar(140, 1260, 30, PR.mustard);

  withT(540, 860, 0, popS(E0 + 0.1), () => m6Mountain(0, 0, 640, 440, 'mt5'));
  m6Tag('MỤC TIÊU: GIỮ NGUYÊN', 540, 940, 38, PR.creamL, PR.navy, 'tg6a', -0.02, popS(tGoal));
  // khối bước đầu tiên thu nhỏ
  const sh = EZ.back(clamp((TT - tSize) / 0.5)), bw = lerp(460, 200, sh), bh = lerp(280, 110, sh);
  withT(540, 1440, 0, popS(E0 + 0.2), () => {
    pp(pR(-bw / 2, -bh, bw, bh, 14), sh > 0.5 ? PR.mustard : '#7a5a5a', { key: 'blk6', sb: 16, sy: 8, tex: 0.5 });
    const s = 'BƯỚC ĐẦU';
    txt(s, 0, -bh / 2 + 14, fitSize(s, bw - 40, 50), sh > 0.5 ? PR.navy : PR.creamL, { align: 'center', weight: 800 });
  });
  m6Tag('ĐỔI KÍCH THƯỚC', 540, 1160, 44, PR.yellow, PR.navy, 'tg6b', 0.03, popS(tSize + 0.25));

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT >= tSize ? 'happy' : 'neutral', look: -20, key: 'b5' });
  prSign('THU NHỎ BƯỚC ĐẦU TIÊN', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // Việc nhỏ nhất bạn có thể bắt đầu trong hôm nay là gì?
  const tSmall = VW('cta', 'nhỏ').t0, tQ = VW('cta', 'gì').t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(330);
  prStar(130, 1260, 30, PR.mustard);
  prStar(950, 1180, 24, PR.pink);

  // tờ việc cần làm hôm nay
  withT(540, 900, -0.02, popS(E0 + 0.15), () => {
    pp(pR(-320, -380, 640, 760, 8), PR.creamL, { key: 'td6', sb: 20, sy: 10, tex: 0.5 });
    pp(pR(-320, -380, 640, 120, 8), PR.mustard, { key: 'td6h', shadow: false, tex: 0.5 });
    pp(pE(0, -380, 20, 20), PR.red, { key: 'td6p', sb: 6, sy: 3 });
    txt('HÔM NAY', 0, -296, 60, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-250, -170, 70, 70, 10), '#d8d2c4', { key: 'td6b', shadow: false });
    pp(pR(-150, -126, 380, 8, 4), '#d8d2c4', { key: 'td6l', shadow: false });
    for (let i = 0; i < 3; i++) pp(pR(-250, 0 + i * 90, 480, 6, 3), '#e6e0d2', { key: 'td6g' + i, shadow: false });
    if (TT >= tSmall) withT(-215, -135, 0, popS(tSmall), () => m6Rock(0, 0, 26, 18, PR.mustard, 'td6r'));
    if (TT >= tQ) txt('?', 40, -150, 110, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('VIỆC NHỎ NHẤT HÔM NAY?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [['heavy', 'viết', 0, 'heavy2'], ['small', 'bước', 0, 'small2'], ['action', 'sau', 0, 'action2']];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  cues.push({ k: 'pop', t: VW('hook', 'viên').t0 });
  cues.push({ k: 'tick', t: VW('heavy', 'quá').t0 });
  cues.push({ k: 'thud', t: VW('heavy', 'ngại').t0 });
  cues.push({ k: 'pop', t: VW('heavy', 'viết').t0 });
  cues.push({ k: 'thud', t: VW('heavy', 'nặng').t0 + 0.15 });
  cues.push({ k: 'pop', t: VW('small', 'mở').t0 - 0.1 });
  cues.push({ k: 'type', t: VW('small', 'viết').t0, n: 10, d: 0.8 });
  cues.push({ k: 'chime', t: VW('small', 'điểm').t0 - 0.1 });
  cues.push({ k: 'pop', t: VW('action', 'đơn').t0 });
  cues.push({ k: 'pop', t: VW('action', 'làm').t0 });
  cues.push({ k: 'tick', t: VW('action', 'bước').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'mục').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'kích').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'nhỏ').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'gì').t0 });
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
