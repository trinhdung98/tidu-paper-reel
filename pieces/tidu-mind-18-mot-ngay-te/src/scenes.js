// =====================================================================
//  TIDU MIND 18 — "Một ngày tệ không có nghĩa cuộc sống của bạn tệ"
//  Bẫy khái quát hoá quá mức (Overgeneralization Distortion) — CBT.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · CẢM XÚC';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ lưới lịch tuần/tháng giấy (paper calendar grid)
function m18Calendar(cx, cy, highlightRed = false, spreadAll = false, key = 'cal') {
  withT(cx, cy, 0, 1, () => {
    // Khung lịch treo tường
    pp(pR(-300, -200, 600, 400, 20), PR.paperW, { key: key + 'bg', sb: 14, sy: 7, tex: 0.4 });
    pp(pR(-300, -200, 600, 60, 20), PR.red, { shadow: false });
    txt('THÁNG NÀY', 0, -165, 28, PR.creamL, { align: 'center', weight: 800 });

    // Lưới các ngày (5 cột x 4 hàng)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const x = -210 + c * 105;
        const y = -80 + r * 100;
        const isToday = (r === 1 && c === 2);
        const col = (spreadAll || (highlightRed && isToday)) ? '#ffe0e0' : '#f4f6fa';
        pp(pR(x - 42, y - 40, 84, 80, 10), col, { shadow: false });
        if (!(highlightRed && isToday && !spreadAll)) {
          txt(String(r * 5 + c + 1), x, y + 2, 24, (isToday || spreadAll) ? PR.red : PR.greyD, { align: 'center', base: 'middle', weight: 700 });
        }
      }
    }
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Hôm nay thất bại -> Sợ mãi mãi thất bại?
  const tBai = VW('hook', 'bại').t0, tMai = VW('hook', 'mãi').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 6, 0, 'clk1');

  // Lịch với 1 ngày bị đóng dấu NGÀY TỆ
  withT(CX, 750, 0, popS(E0 + 0.15), () => {
    m18Calendar(0, 0, true, false, 'cal1');
  });

  if (TT >= tBai) {
    prStamp('NGÀY TỆ!', CX, 1020, PR.red, tBai, { rot: -0.04, size: 42 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tMai ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('HÔM NAY TỆ = MÃI MÃI TỆ?', { kicker: KICK });
  prChips();
};

SCENES.overgeneralize = () => {   // S2: Dấu đỏ lan sang toàn bộ lịch (Phỏng vấn trượt -> Không bao giờ có việc)
  const tLan = VW('overgeneralize', 'tương').t0, tViec = VW('overgeneralize', 'việc').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Lịch bị đỏ toàn bộ
  withT(CX, 620, 0, 1, () => {
    m18Calendar(0, 0, true, true, 'cal2');
  });

  // Hộp suy nghĩ cực đoan
  withT(CX, 1020, 0, popS(E0 + 0.2), () => {
    pp(pR(-380, -90, 760, 180, 20), '#ffe8e8', { key: 'ovg_box', sb: 14, sy: 7, tex: 0.4 });
    pp(pR(-380, -90, 20, 180, 10), PR.red, { shadow: false });
    txt('BẪY KHÁI QUÁT HÓA QUÁ MỨC:', -330, -45, 26, PR.red, { weight: 800 });
    txt('Một lần phỏng vấn thất bại biến thành:', 0, -5, 30, PR.char, { align: 'center', weight: 700 });
    txt('"MÌNH CHẲNG BAO GIỜ TÌM ĐƯỢC VIỆC!"', 0, 40, 34, PR.red, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -20, key: 'b2' });
  prSign('BẪY KHÁI QUÁT HOÁ QUÁ MỨC', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // S3: Một kết quả chưa thể đại diện cho mọi khả năng
  const tKetQua = VW('reality', 'kết').t0, tKhaNang = VW('reality', 'năng').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 7, 0, 'clk3');

  withT(CX, 650, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -100, 760, 200, 22), PR.paperW, { key: 'real_box18', sb: 14, sy: 7, tex: 0.4 });
    txt('DỪNG LẠI VÀ NHÌN RÕ SỰ THẬT:', 0, -45, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('MỘT KẾT QUẢ DUY NHẤT...', 0, -5, 34, PR.navy, { align: 'center', weight: 800 });
    txt('KHÔNG ĐẠI DIỆN CHO MỌI KHẢ NĂNG!', 0, 45, 36, PR.green, { align: 'center', weight: 800 });
  });

  // Hộp tỷ lệ xác suất
  const kRate = popS(tKhaNang);
  if (kRate > 0.01) withT(CX, 1000, 0, kRate, () => {
    pp(pR(-340, -70, 680, 140, 20), PR.navy, { key: 'stat_card', sb: 12, sy: 6, tex: 0.45 });
    txt('Một cánh cửa khép lại', 0, -15, 32, PR.creamL, { align: 'center', weight: 800 });
    txt('không có nghĩa cả thế giới đã đóng cửa!', 0, 25, 28, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b3' });
  prSign('MỘT SỰ KIỆN ≠ TOÀN BỘ TƯƠNG LAI', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S4: Thay bằng nhận định chính xác: Cuộc PV lần này chưa tốt, cần xem lại chuẩn bị
  const tThay = VW('reframe', 'thay').t0, tChuanBi = VW('reframe', 'bị').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  withT(CX, 620, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -90, 760, 180, 20), PR.paperW, { key: 'ref_head18', sb: 12, sy: 6, tex: 0.4 });
    txt('THAY ĐỔI CÁCH TỰ ĐỐI THOẠI:', 0, -35, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('TỪ CỰC ĐOAN SANG CHÍNH XÁC', 0, 20, 38, PR.navy, { align: 'center', weight: 800 });
  });

  // Hộp câu nói mới chính xác
  const kNew = popS(tChuanBi);
  if (kNew > 0.01) withT(CX, 960, 0, kNew, () => {
    pp(pR(-380, -100, 760, 200, 20), '#eaf5ea', { key: 'new_say', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-380, -100, 20, 200, 10), PR.green, { shadow: false });
    txt('✓ CÁCH NÓI CÔNG BẰNG & CHÍNH XÁC:', -330, -55, 26, PR.green, { weight: 800 });
    txt('"Buổi phỏng vấn LẦN NÀY chưa tốt,', 0, -10, 32, PR.char, { align: 'center', weight: 800 });
    txt('và mình cần xem lại phần chuẩn bị."', 0, 35, 32, PR.char, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b4' });
  prSign('NÓI CÔNG BẰNG VỚI BẢN THÂN', { kicker: KICK });
  prChips();
};

SCENES.differentiate = () => {   // S5: 1 ô lịch đỏ nằm giữa nhiều ô trung tính
  const tPhanBiet = VW('differentiate', 'phân').t0, tRong = VW('differentiate', 'rộng').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // Lịch với chỉ 1 ngày đỏ giữa nhiều ngày xám/xanh
  withT(CX, 620, 0, popS(E0 + 0.15), () => {
    m18Calendar(0, 0, true, false, 'cal3');
  });

  withT(CX, 1040, 0, popS(tPhanBiet), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'diff_box', sb: 12, sy: 6, tex: 0.4 });
    txt('PHÂN BIỆT MỘT SỰ KIỆN CỤ THỂ', 0, -15, 32, PR.navy, { align: 'center', weight: 800 });
    txt('VỚI MỘT KẾT LUẬN TOÀN DIỆN QUÁ RỘNG!', 0, 25, 30, PR.red, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('MỘT NGÀY TỆ ≠ CUỘC ĐỜI TỆ', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn có câu nói nào thường dùng để tự trách mình không?
  const tTell = VW('cta', 'mình').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'GÓC TỰ THẤU CẢM', tTell, { hint: 'Chia sẻ câu nói bạn muốn thay đổi…' });

  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.plum, PR.orange][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      txt(['"Mình chẳng bao giờ làm được gì ra hồn"', 'Hôm nay nhắc mình: Chỉ là một ngày thôi! ❤️'][i], -210, 8, 28, PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('HÔM NAY TỆ, MAI SẼ KHÁC!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'bại').t0 });
  cues.push({ k: 'thud', t: VW('overgeneralize', 'việc').t0 });
  cues.push({ k: 'chime', t: VW('reality', 'năng').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'chính').t0 });
  cues.push({ k: 'tick', t: VW('differentiate', 'phân').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'mình').t0 });
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
