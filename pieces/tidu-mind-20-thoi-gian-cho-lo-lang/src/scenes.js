// =====================================================================
//  TIDU MIND 20 — "Thử dành một khoảng thời gian riêng cho những lo lắng"
//  Kỹ thuật Worry Time (Kiểm soát âu lo & Quản lý sự chú ý) — CBT.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · CÔNG CỤ TÂM LÝ';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ chiếc hộp giấy đựng nỗi lo (Worry Inbox / Box)
function m20WorryBox(cx, cy, s = 1, key = 'wbox') {
  withT(cx, cy, 0, s, () => {
    // Thùng carton giấy gấp
    pp(pR(-160, -80, 320, 200, 16), PR.wood, { key: key + 'body', sb: 14, sy: 7, tex: 0.5 });
    pp(pR(-180, -110, 360, 45, 12), PR.woodD, { shadow: false }); // Nắp hộp mở
    // Nhãn trên hộp
    pp(pR(-110, -20, 220, 60, 8), PR.paperW, { shadow: false });
    txt('HỘP NỖI LO', 0, 10, 26, PR.char, { align: 'center', base: 'middle', weight: 800 });

    // Các mảnh giấy lo lắng nhô ra từ trong hộp
    [-60, 0, 60].forEach((px, i) => {
      pp(pR(px - 35, -130 + (i % 2 ? 15 : 0), 70, 70, 6), '#fff5e0', { shadow: false, rot: (i - 1) * 0.1 });
    });
  });
}

// Helper: vẽ đồng hồ đếm ngược 15 phút (15-min timer)
function m20Timer(cx, cy, s = 1, key = 'tmr') {
  withT(cx, cy, 0, s, () => {
    pp(pE(0, 0, 140, 140), PR.paperW, { key: key + 'face', sb: 16, sy: 8, tex: 0.4 });
    pp(pE(0, 0, 120, 120), '#f4f6fa', { shadow: false });
    // Vùng quạt 15 phút tô màu cam
    ctx.save();
    ctx.fillStyle = 'rgba(224, 110, 60, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 110, -Math.PI / 2, 0); // 15 phút = 1/4 vòng tròn
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Kim chỉ
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -90); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(80, 0); ctx.stroke();
    ctx.restore();
    pp(pE(0, 0, 16, 16), PR.red, { shadow: false });
    txt('15 PHÚT', 0, 60, 24, PR.char, { align: 'center', weight: 800 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Nỗi lo chen vào công việc cả ngày
  const tLo = VW('hook', 'lo').t0, tCach = VW('hook', 'cách').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 2, 30, 'clk1');

  // Bàn làm việc với các tờ giấy lo lắng bay tới
  withT(CX, 720, 0, popS(E0 + 0.15), () => {
    pp(pR(-360, -110, 720, 220, 24), PR.paperW, { key: 'desk_box', sb: 14, sy: 7, tex: 0.4 });
    txt('ĐANG LÀM VIỆC TẬP TRUNG THÌ...', 0, -55, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('CÁC SUY NGHĨ LO LẮNG CỨ CHEN VÀO!', 0, 5, 34, PR.red, { align: 'center', weight: 800 });
    txt('"Lỡ deadline trễ thì sao?", "Lỡ khách hàng không hài lòng?"', 0, 60, 24, PR.navy, { align: 'center', weight: 700 });
  });

  // Mảnh giấy lo lắng bay lơ lửng
  [0, 1, 2].forEach((i) => {
    const k = popS(tLo + i * 0.2);
    if (k <= 0.01) return;
    const x = [CX - 220, CX, CX + 220][i];
    const y = 1000 + (i % 2 ? 30 : -20);
    withT(x, y, (i - 1) * 0.15, k, () => {
      pp(pR(-80, -45, 160, 90, 10), '#fff0e6', { key: 'fly' + i, sb: 10, sy: 5, tex: 0.3 });
      txt('LO LẮNG!', 0, 5, 24, PR.orange, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tCach ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('LO LẮNG CHEN VÀO CẢ NGÀY?', { kicker: KICK });
  prChips();
};

SCENES.worrytime = () => {   // S2: Đặt 10-15 phút để xem xét nỗi lo (Worry Time)
  const tTime = VW('worrytime', 'ngắn').t0, t15 = VW('worrytime', 'lăm').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Đồng hồ 15 phút
  withT(CX, 620, 0, popS(E0 + 0.15), () => {
    m20Timer(0, 0, 1.05, 'timer20');
  });

  // Hộp phương pháp Worry Time
  withT(CX, 980, 0, popS(t15), () => {
    pp(pR(-360, -90, 720, 180, 20), PR.navy, { key: 'wt_card', sb: 14, sy: 7, tex: 0.45 });
    txt('KỸ THUẬT "WORRY TIME":', 0, -40, 28, PR.sky, { align: 'center', weight: 800 });
    txt('DÀNH RIÊNG 10 – 15 PHÚT MỖI NGÀY', 0, 5, 36, PR.creamL, { align: 'center', weight: 800 });
    txt('(Ví dụ: 16:30 đến 16:45 chiều)', 0, 50, 24, '#ffe4cc', { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('KHOẢNG THỜI GIAN LO LẮNG', { kicker: KICK });
  prChips();
};

SCENES.box = () => {   // S3: Xuất hiện ngoài giờ đó -> Ghi vào Hộp giấy để xem sau
  const tNgoai = VW('box', 'ngoài').t0, tSau = VW('box', 'sau').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 3, 30, 'clk3');

  // Hộp giấy chứa nỗi lo
  withT(CX, 680, 0, popS(E0 + 0.15), () => {
    m20WorryBox(0, 0, 1.15, 'box3');
  });

  // Quy tắc ghi nhanh
  withT(CX, 1040, 0, popS(tSau), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'box_rule', sb: 12, sy: 6, tex: 0.4 });
    txt('NẾU LO LẮNG XUẤT HIỆN BAN NGÀY:', 0, -15, 26, PR.greyD, { align: 'center', weight: 800 });
    txt('Ghi nhanh vào giấy, cất vào hộp, để chiều xem!', 0, 25, 30, PR.green, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b3' });
  prSign('GHI LẠI ĐỂ XEM SAU', { kicker: KICK });
  prChips();
};

SCENES.evaluate = () => {   // S4: Đến giờ hẹn: Phân loại Có hành động vs Không hành động
  const tDen = VW('evaluate', 'chọn').t0, tKe = VW('evaluate', 'hoạch').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  withT(CX, 600, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'eval_head20', sb: 12, sy: 6, tex: 0.4 });
    txt('ĐẾN GIỜ "WORRY TIME", HÃY TỰ HỎI:', 0, -15, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('"ĐIỀU NÀY CÓ THỂ GIẢI QUYẾT BẰNG HÀNH ĐỘNG?"', 0, 25, 30, PR.navy, { align: 'center', weight: 800 });
  });

  // 2 nhánh phân loại
  withT(CX - 180, 880, -0.02, popS(E0 + 0.3), () => {
    pp(pR(-180, -110, 360, 220, 20), '#eaf5ea', { key: 'ev_left', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-180, -110, 360, 50, 20), PR.green, { shadow: false });
    txt('CÓ THỂ HÀNH ĐỘNG', 0, -85, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('Lập kế hoạch cụ thể:', 0, -20, 26, PR.char, { align: 'center', weight: 700 });
    txt('Làm gì? Vào lúc nào?', 0, 25, 28, PR.green, { align: 'center', weight: 800 });
  });

  withT(CX + 180, 880, 0.02, popS(E0 + 0.45), () => {
    pp(pR(-180, -110, 360, 220, 20), PR.paperW, { key: 'ev_right', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-180, -110, 360, 50, 20), PR.orange, { shadow: false });
    txt('CHƯA THỂ KIỂM SOÁT', 0, -85, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('Ghi nhận sự không', 0, -20, 26, PR.char, { align: 'center', weight: 700 });
    txt('chắc chắn của tương lai', 0, 25, 24, PR.orange, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b4' });
  prSign('PHÂN LOẠI ĐỂ XỬ LÝ', { kicker: KICK });
  prChips();
};

SCENES.boundary = () => {   // S5: Quản lý sự chú ý, không phải xóa sạch lo âu
  const tQuanLy = VW('boundary', 'quản').t0, tMat = VW('boundary', 'mất').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // Khung lịch có khe giờ Worry Time
  withT(CX, 650, 0, popS(E0 + 0.15), () => {
    pp(pR(-360, -120, 720, 240, 22), PR.paperW, { key: 'cal_slot', sb: 14, sy: 7, tex: 0.4 });
    txt('LỊCH BIỂU HẰNG NGÀY:', 0, -75, 26, PR.greyD, { align: 'center', weight: 800 });
    txt('08:00 – 16:30 : Làm việc tập trung 💼', 0, -25, 28, PR.char, { align: 'center', weight: 700 });
    pp(pR(-300, 15, 600, 60, 12), '#fff0e6', { shadow: false });
    txt('16:30 – 16:45 : KHUNG GIỜ LO LẮNG ⏱️', 0, 48, 28, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });

  withT(CX, 1020, 0, popS(tQuanLy), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.navy, { key: 'bnd_sum', sb: 12, sy: 6, tex: 0.45 });
    txt('ĐÂY LÀ CÁCH QUẢN LÝ SỰ CHÚ Ý,', 0, -15, 30, PR.creamL, { align: 'center', weight: 800 });
    txt('không để âu lo nuốt chửng cả ngày của bạn!', 0, 25, 28, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('QUẢN LÝ SỰ CHÚ Ý', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Lưu video để thử bài tập này vào một ngày suy nghĩ quá nhiều
  const tTell = VW('cta', 'nhiều').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  // Thẻ nhắc nhở lưu video
  withT(CX, 680, 0, popS(E0 + 0.2), () => {
    pp(pR(-360, -90, 720, 180, 24), PR.paperW, { key: 'save_wt', sb: 14, sy: 7, tex: 0.45 });
    txt('LƯU LẠI BÀI TẬP "WORRY TIME"', 0, -35, 32, PR.red, { align: 'center', weight: 800 });
    txt('Để thực hành khi bạn thấy quá tải suy nghĩ! 🧠✨', 0, 25, 28, PR.navy, { align: 'center', weight: 700 });
  });

  prCommentBox(CX, 980, 'GÓC CHIA SẺ', tTell, { hint: 'Lưu lại để áp dụng nhé…' });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('LƯU LẠI BÀI TẬP NÀY NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'lo').t0 });
  cues.push({ k: 'chime', t: VW('worrytime', 'lăm').t0 });
  cues.push({ k: 'pop', t: VW('box', 'sau').t0 });
  cues.push({ k: 'chime', t: VW('evaluate', 'hoạch').t0 });
  cues.push({ k: 'tick', t: VW('boundary', 'quản').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'nhiều').t0 });
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

