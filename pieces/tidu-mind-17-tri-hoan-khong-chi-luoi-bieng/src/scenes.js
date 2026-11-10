// =====================================================================
//  TIDU MIND 17 — "Trì hoãn không đơn giản chỉ vì lười biếng"
//  Bản chất tâm lý của sự trì hoãn (Procrastination & Emotion Regulation).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · HÀNH VI';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ điện thoại thông minh dạng giấy (paper smartphone)
function m17Phone(cx, cy, s = 1, flipped = false, key = 'phone') {
  withT(cx, cy, 0, s, () => {
    if (flipped) {
      // Điện thoại úp mặt xuống bàn
      pp(pR(-120, -200, 240, 400, 36), '#2c3e50', { key: key + 'back', sb: 14, sy: 7, tex: 0.4 });
      pp(pR(-90, -170, 70, 70, 16), '#1a252f', { shadow: false }); // Cụm camera
      pp(pE(-55, -135, 14, 14), PR.char, { shadow: false });
    } else {
      // Màn hình sáng lướt video ngắn/mạng xã hội
      pp(pR(-120, -200, 240, 400, 36), '#1a1a1a', { key: key + 'frame', sb: 16, sy: 8, tex: 0.4 });
      pp(pR(-105, -185, 210, 370, 24), '#fff0f5', { shadow: false, tex: 0.3 });
      pp(pE(0, -50, 40, 40), PR.red, { shadow: false }); // Nút play / feed
      pp(pG([[-10, -65], [18, -50], [-10, -35]]), PR.creamL, { shadow: false });
      txt('LƯỚT THÊM...', 0, 30, 24, PR.char, { align: 'center', weight: 800 });
      txt('Chỉ 5 phút thôi mà!', 0, 70, 20, PR.greyD, { align: 'center', weight: 700 });
    }
  });
}

// Helper: vẽ tập tài liệu deadline cần hoàn thành
function m17Doc(cx, cy, s = 1, key = 'doc') {
  withT(cx, cy, 0, s, () => {
    pp(pR(-150, -190, 300, 380, 16), PR.paperW, { key: key + 'body', sb: 14, sy: 7, tex: 0.4 });
    pp(pR(-130, -170, 260, 40, 8), PR.navy, { shadow: false });
    txt('TÀI LIỆU QUAN TRỌNG', 0, -150, 20, PR.creamL, { align: 'center', weight: 800 });
    for (let i = 0; i < 5; i++) {
      pp(pR(-120, -90 + i * 40, 240 * (i === 4 ? 0.6 : 1), 14, 7), 'rgba(40,40,60,0.18)', { shadow: false });
    }
    prStamp('DEADLINE GẤP', 0, 70, PR.red, E0, { rot: -0.1, size: 28 });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Biết cần làm việc, nhưng lại mở điện thoại thêm lần nữa
  const tViec = VW('hook', 'việc').t0, tPhone = VW('hook', 'thoại').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 11, 45, 'clk1');

  // Tài liệu bên trái
  withT(CX - 180, 750, -0.04, popS(E0 + 0.1), () => {
    m17Doc(0, 0, 0.95, 'doc1');
  });

  // Điện thoại bên phải hút sự chú ý
  const kPhone = popS(tPhone);
  if (kPhone > 0.01) withT(CX + 180, 750, 0.04, kPhone, () => {
    m17Phone(0, 0, 0.95, false, 'phone1');
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tPhone ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('LẠI CẦM ĐIỆN THOẠI LÊN?', { kicker: KICK });
  prChips();
};

SCENES.emotion = () => {   // S2: Trì hoãn không phải vì lười biếng mà là né tránh cảm xúc khó chịu
  const tLuoi = VW('emotion', 'biếng').t0, tKho = VW('emotion', 'khó').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  withT(CX, 600, 0, popS(E0 + 0.1), () => {
    pp(pR(-380, -90, 760, 180, 22), PR.paperW, { key: 'emo_box', sb: 14, sy: 7, tex: 0.4 });
    txt('TRÌ HOÃN KHÔNG ĐƠN GIẢN LÀ LƯỜI BIẾNG', 0, -35, 30, PR.greyD, { align: 'center', weight: 800 });
    txt('MÀ LÀ VÌ CẢM XÚC TIÊU CỰC VỚI CÔNG VIỆC!', 0, 20, 34, PR.red, { align: 'center', weight: 800 });
  });

  const feelings = [
    { name: 'SỢ LÀM KHÔNG TỐT', sub: 'Áp lực phải hoàn hảo' },
    { name: 'CẢM THẤY QUÁ KHÓ', sub: 'Không biết bắt đầu từ đâu' },
    { name: 'CẢM GIÁC NHÀM CHÁN', sub: 'Bộ não muốn kích thích ngay' }
  ];

  feelings.forEach((f, i) => {
    const k = popS(tKho + i * 0.25);
    if (k <= 0.01) return;
    const y = 800 + i * 140;
    withT(CX, y, i % 2 ? 0.01 : -0.01, k, () => {
      pp(pR(-360, -50, 720, 100, 16), '#fff4e6', { key: 'fl' + i, sb: 10, sy: 5, tex: 0.4 });
      txt(f.name, -320, 2, 30, PR.orange, { base: 'middle', weight: 800 });
      txt(f.sub, 80, 2, 26, PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b2' });
  prSign('BẢN CHẤT CỦA TRÌ HOÃN', { kicker: KICK });
  prChips();
};

SCENES.trap = () => {   // S3: Giảm nhẹ trước mắt vs Áp lực về sau
  const tDoi = VW('trap', 'chịu').t0, tNguyen = VW('trap', 'nguyên').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 12, 15, 'clk3');

  // Thẻ trước mắt
  withT(CX - 180, 720, -0.02, popS(E0 + 0.15), () => {
    pp(pR(-180, -120, 360, 240, 20), '#eaf5ea', { key: 'trap_left', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-180, -120, 360, 50, 20), PR.green, { shadow: false });
    txt('TRƯỚC MẮT (LƯỚT ĐIỆN THOẠI)', 0, -95, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('Dễ chịu tạm thời', 0, -20, 28, PR.green, { align: 'center', weight: 800 });
    txt('Né tránh lo âu', 0, 25, 26, PR.char, { align: 'center', weight: 700 });
  });

  // Thẻ về sau
  withT(CX + 180, 720, 0.02, popS(E0 + 0.3), () => {
    pp(pR(-180, -120, 360, 240, 20), '#ffe8e8', { key: 'trap_right', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-180, -120, 360, 50, 20), PR.red, { shadow: false });
    txt('VỀ SAU (KHI HẾT GIỜ)', 0, -95, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('Áp lực gấp đôi!', 0, -20, 28, PR.red, { align: 'center', weight: 800 });
    txt('Công việc vẫn còn nguyên', 0, 25, 24, PR.char, { align: 'center', weight: 700 });
  });

  if (TT >= tNguyen) {
    prStamp('CÔNG VIỆC VẪN CÒN ĐÓ', CX, 1060, PR.red, tNguyen, { rot: -0.04, size: 40 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -30, key: 'b3' });
  prSign('BẪY CẢM XÚC NGẮN HẠN', { kicker: KICK });
  prChips();
};

SCENES.notice = () => {   // S4: Quan sát: Điều gì khiến mình muốn né tránh?
  const tQuan = VW('notice', 'quan').t0, tNe = VW('notice', 'tránh').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  withT(CX, 660, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -100, 760, 200, 22), PR.paperW, { key: 'not_box', sb: 14, sy: 7, tex: 0.4 });
    txt('BƯỚC 1: DỪNG LẠI VÀ QUAN SÁT', 0, -45, 30, PR.greyD, { align: 'center', weight: 800 });
    txt('"ĐIỀU GÌ TRONG NHIỆM VỤ NÀY', 0, -5, 36, PR.navy, { align: 'center', weight: 800 });
    txt('ĐANG KHIẾN MÌNH MUỐN NÉ TRÁNH?"', 0, 40, 36, PR.red, { align: 'center', weight: 800 });
  });

  const kAns = popS(tNe);
  if (kAns > 0.01) withT(CX, 1020, 0, kAns, () => {
    pp(pR(-340, -70, 680, 140, 20), PR.navy, { key: 'ans_card', sb: 12, sy: 6, tex: 0.45 });
    txt('Gọi tên được nỗi sợ', 0, -15, 32, PR.creamL, { align: 'center', weight: 800 });
    txt('sẽ làm giảm sức mạnh của nó!', 0, 25, 28, PR.sky, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'happy', look: -20, key: 'b4' });
  prSign('GỌI TÊN CẢM XÚC NÉ TRÁNH', { kicker: KICK });
  prChips();
};

SCENES.microstep = () => {   // S5: Chọn 1 bước thật cụ thể: đọc trang 1 / viết tiêu đề + Úp điện thoại
  const tBuoc = VW('microstep', 'chọn').t0, tUp = VW('microstep', 'tiêu').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // Micro-step
  withT(CX - 120, 680, 0, popS(E0 + 0.15), () => {
    pp(pR(-240, -120, 480, 240, 20), '#eaf5ea', { key: 'micro_box', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-240, -120, 480, 50, 20), PR.green, { shadow: false });
    txt('BƯỚC 2: CHỌN MỘT BƯỚC CỰC NHỎ', 0, -95, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('✓ Đọc 1 trang tài liệu đầu', 0, -30, 28, PR.char, { align: 'center', weight: 700 });
    txt('✓ Hoặc chỉ viết 1 dòng tiêu đề', 0, 15, 28, PR.char, { align: 'center', weight: 700 });
    txt('✓ Hoặc mở file ra trong 2 phút', 0, 60, 28, PR.char, { align: 'center', weight: 700 });
  });

  // Điện thoại úp xuống
  withT(CX + 240, 680, 0.05, popS(tUp), () => {
    m17Phone(0, 0, 0.85, true, 'phone_flip');
  });

  if (TT >= tUp + 1.0) {
    prStamp('LÀM ĐIỂM BẮT ĐẦU DỄ HƠN', CX, 1080, PR.navy, tUp + 1.0, { rot: -0.02, size: 36 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('HẠ THẤP RÀO CẢN BẮT ĐẦU', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn thường trì hoãn việc gì nhất?
  const tTell = VW('cta', 'nhất').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'GÓC THÚ NHẬN', tTell, { hint: 'Bạn hay trì hoãn việc gì nhất?…' });

  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.orange, PR.blue][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      txt(['Tập thể dục buổi sáng 🏃‍♂️', 'Viết báo cáo tuần 📝'][i], -210, 8, 30, PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN HAY TRÌ HOÃN VIỆC GÌ NHẤT?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'thoại').t0 });
  cues.push({ k: 'chime', t: VW('emotion', 'khó').t0 });
  cues.push({ k: 'thud', t: VW('trap', 'nguyên').t0 });
  cues.push({ k: 'tick', t: VW('notice', 'quan').t0 });
  cues.push({ k: 'chime', t: VW('microstep', 'chọn').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'nhất').t0 });
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

