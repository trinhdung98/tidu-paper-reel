// =====================================================================
//  TIDU MIND 17 — "Trì hoãn không đơn giản chỉ vì lười biếng"
//  Bản chất tâm lý của sự trì hoãn (Procrastination & Emotion Regulation).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f / #355555.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · HÀNH VI';
const TEAL = '#2e4f4f', TEAL2 = '#355555';

const SCENES = {};

// ---- Helpers ----

function m17Room(wallColor, studs) {
  prWall(wallColor, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs });
  if (!studs) pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
}

// Paper smartphone with screen states
function m17Phone(cx, cy, w, h, screenMode, key = 'ph') {
  withT(cx, cy, 0, 1, () => {
    // Phone body
    pp(pR(-w / 2, -h / 2, w, h, 34), '#1e293b', { key: key + 'body', sb: 16, sy: 8, tex: 0.4 });
    // Camera notch
    pp(pR(-45, -h / 2 + 14, 90, 16, 8), '#0f172a', { shadow: false });
    pp(pE(-20, -h / 2 + 22, 6, 6), '#334155', { shadow: false });

    const sw = w - 30, sh = h - 64;
    const sy = 12;
    if (screenMode === 'video') {
      // Entertainment video feed
      pp(pR(-sw / 2, -sh / 2 + sy, sw, sh, 22), '#fff0f5', { key: key + 'scr', shadow: false, tex: 0.3 });
      // Video card
      pp(pR(-sw / 2 + 18, -sh / 2 + sy + 22, sw - 36, sh * 0.48, 16), '#fee2e2', { key: key + 'vcard', shadow: false, tex: 0.3 });
      // Play disc & arrow
      pp(pE(0, -sh / 2 + sy + sh * 0.24, 44, 44), PR.red, { shadow: false });
      pp(pG([[-10, -sh / 2 + sy + sh * 0.24 - 15], [18, -sh / 2 + sy + sh * 0.24], [-10, -sh / 2 + sy + sh * 0.24 + 15]]), PR.creamL, { shadow: false });
      // Progress bar
      pp(pR(-sw / 2 + 30, -sh / 2 + sy + sh * 0.44, sw - 60, 10, 5), 'rgba(239,68,68,0.25)', { shadow: false });
      pp(pR(-sw / 2 + 30, -sh / 2 + sy + sh * 0.44, (sw - 60) * 0.6, 10, 5), PR.red, { shadow: false });
      // Captions
      txt('LƯỚT THÊM...', 0, -sh / 2 + sy + sh * 0.58, 28, PR.char, { align: 'center', weight: 800 });
      txt('Chỉ vài phút thôi mà!', 0, -sh / 2 + sy + sh * 0.66, 22, PR.greyD, { align: 'center', weight: 700 });
      // Reaction buttons
      [-60, 0, 60].forEach((bx, i) => {
        pp(pE(bx, -sh / 2 + sy + sh * 0.82, 22, 22), [PR.pink, PR.sky, PR.orange][i], { shadow: false });
      });
    } else {
      // Standby / locked screen
      pp(pR(-sw / 2, -sh / 2 + sy, sw, sh, 22), '#f8fafc', { key: key + 'scr', shadow: false, tex: 0.3 });
      txt('09:41', 0, -sh / 2 + sy + 80, 48, PR.char, { align: 'center', weight: 800 });
      txt('Thứ Hai, 10 tháng 11', 0, -sh / 2 + sy + 120, 20, PR.greyD, { align: 'center', weight: 600 });
      // App icons grid at bottom
      [-65, 0, 65].forEach((ix, i) => {
        pp(pR(ix - 24, -sh / 2 + sy + sh * 0.6, 48, 48, 12), [PR.sky, PR.orange, PR.green][i], { shadow: false });
      });
      txt('MỞ ĐIỆN THOẠI?', 0, -sh / 2 + sy + sh * 0.8, 24, PR.navy, { align: 'center', weight: 800 });
    }
  });
}

// Paper work folder / document binder
function m17Binder(cx, cy, w, h, key = 'bd') {
  withT(cx, cy, 0, 1, () => {
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: key + 'body', sb: 14, sy: 7, tex: 0.45 });
    // Header banner
    pp(pR(-w / 2, -h / 2, w, 60, 18), PR.navy, { shadow: false });
    pp(pR(-w / 2, -h / 2 + 42, w, 18, 0), PR.navy, { shadow: false });
    txt('BÁO CÁO DỰ ÁN', 0, -h / 2 + 38, fitSize('BÁO CÁO DỰ ÁN', w - 40, 24), PR.creamL, { align: 'center', weight: 800 });
    // Paper rows
    for (let i = 0; i < 5; i++) {
      const rw = (w - 60) * (i === 4 ? 0.65 : 1);
      pp(pR(-w / 2 + 30, -h / 2 + 100 + i * 46, rw, 14, 7), 'rgba(30,41,59,0.18)', { shadow: false });
    }
    // Urgent tag
    pp(pR(-w / 2 + 30, h / 2 - 80, 160, 44, 8), '#fee2e2', { shadow: false });
    txt('CẦN LÀM', -w / 2 + 110, h / 2 - 52, 20, PR.red, { align: 'center', weight: 800 });
  });
}

// ---- SCENES ----

// S1: Bạn biết mình cần làm việc, nhưng lại mở điện thoại thêm một lần nữa?
SCENES.hook = () => {
  m17Room(TEAL, false);
  const tPhone = VW('hook', 'điện').t0;
  const isVideo = TT >= tPhone;

  prStar(130, 410, 30, PR.mustard);
  prStar(940, 410, 24, PR.pink);
  prClock(920, 560, 56, 11, 45, 'clk1');

  // Both hero elements fully drawn at t = 0 (frame 0 is the thumbnail)
  m17Binder(350, 810, 340, 480, 'bd1');
  m17Phone(730, 810, 310, 480, isVideo ? 'video' : 'standby', 'ph1');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: isVideo ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('LẠI MỞ ĐIỆN THOẠI?', { kicker: KICK });
  prChips();
};

// S2: Trì hoãn không phải lúc nào cũng đơn giản là lười biếng.
SCENES.emotion = () => {
  m17Room(TEAL2, true);
  const tKhong = VW('emotion', 'không').t0;
  const tDon = VW('emotion', 'đơn').t0;

  prStar(130, 400, 28, PR.mustard);
  prStar(930, 420, 30, PR.orange);

  // Left card: "Lười biếng?" (drawn at scale 1 at cut)
  withT(350, 810, -0.015, 1, () => {
    pp(pR(-170, -220, 340, 440, 20), '#fdf6f0', { key: 'em_l_card', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-100, -195, 200, 40, 10), PR.greyD, { shadow: false });
    txt('NGHĨ LÀ:', 0, -169, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('LƯỜI BIẾNG', 0, -90, fitSize('LƯỜI BIẾNG', 300, 40), PR.char, { align: 'center', weight: 800 });
    // Sleeping pillow graphic
    pp(pR(-80, -20, 160, 100, 28), '#e2e8f0', { key: 'pillow', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(-60, 5, 120, 14, 7), '#cbd5e1', { shadow: false });
    txt('Thiếu ý chí?', 0, 130, 24, PR.greyD, { align: 'center', weight: 700 });
  });

  // Red cross over laziness on "không phải"
  prCross(350, 810, tKhong, 66);
  if (TT >= tKhong) {
    prStamp('KHÔNG PHẢI!', 350, 970, PR.red, tKhong, { rot: -0.06, size: 38, from: 1.2 });
  }

  // Right card: "Cảm xúc tiêu cực" (drawn at scale 1 at cut)
  withT(730, 810, 0.015, 1, () => {
    pp(pR(-170, -220, 340, 440, 20), '#f0fdf4', { key: 'em_r_card', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-100, -195, 200, 40, 10), PR.navy, { shadow: false });
    txt('THỰC CHẤT:', 0, -169, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('NÉ TRÁNH', 0, -100, fitSize('NÉ TRÁNH', 300, 38), PR.navy, { align: 'center', weight: 800 });
    txt('CẢM XÚC', 0, -55, fitSize('CẢM XÚC', 300, 38), PR.navy, { align: 'center', weight: 800 });
    // Heart / shield graphic
    pp(pE(0, 35, 46, 46), '#fee2e2', { key: 'em_heart', sb: 8, sy: 4, tex: 0.4 });
    pp(pE(-16, 26, 18, 18), PR.red, { shadow: false });
    pp(pE(16, 26, 18, 18), PR.red, { shadow: false });
    pp(pG([[-30, 33], [30, 33], [0, 68]]), PR.red, { shadow: false });
    txt('Tự vệ tâm lý', 0, 130, 24, PR.char, { align: 'center', weight: 700 });
  });

  if (TT >= tDon) {
    prStamp('CƠ CHẾ TỰ VỆ', 730, 970, PR.navy, tDon, { rot: 0.05, size: 34, from: 1.2 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT >= tKhong ? 'think' : 'neutral', look: -25, key: 'b2' });
  prSign('TRÌ HOÃN KHÔNG PHẢI DO LƯỜI', { kicker: KICK });
  prChips();
};

// S3 (SPLIT): Một công việc có thể khiến bạn thấy khó, chán, lo lắng hoặc sợ làm không tốt.
SCENES.emotion2 = () => {
  m17Room(TEAL, false);
  const tKho = VW('emotion', 'khó').t0;
  const tChan = VW('emotion', 'chán').t0;
  const tLo = VW('emotion', 'lắng').t0;
  const tSo = VW('emotion', 'sợ').t0;

  prStar(120, 390, 28, PR.mustard);
  prStar(940, 410, 26, PR.pink);

  // Big task file at top (drawn at cut)
  withT(CX, 600, 0, 1, () => {
    pp(pR(-360, -90, 720, 180, 18), PR.paperW, { key: 'task_bar', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-360, -90, 720, 48, 18), PR.navy, { shadow: false });
    txt('NHIỆM VỤ ĐANG CHỜ GIẢI QUYẾT', 0, -60, fitSize('NHIỆM VỤ ĐANG CHỜ GIẢI QUYẾT', 680, 24), PR.creamL, { align: 'center', weight: 800 });
    txt('MỘT CÔNG VIỆC CẦN LÀM', 0, 22, fitSize('MỘT CÔNG VIỆC CẦN LÀM', 660, 40), PR.char, { align: 'center', weight: 800 });
  });

  // 4 emotion tags: containers always visible, contents/color highlight on words
  const tagList = [
    { label: 'CẢM THẤY QUÁ KHÓ', sub: 'Chưa rõ cách bắt đầu', col: PR.orange, bg: '#fff7ed', t: tKho, cx: 330, cy: 820 },
    { label: 'NHÀM CHÁN', sub: 'Não muốn kích thích ngay', col: PR.mustard, bg: '#fefce8', t: tChan, cx: 750, cy: 820 },
    { label: 'LO LẮNG', sub: 'Nhiều áp lực đè nặng', col: PR.sky, bg: '#f0f9ff', t: tLo, cx: 330, cy: 980 },
    { label: 'SỢ LÀM KHÔNG TỐT', sub: 'Áp lực phải hoàn hảo', col: PR.red, bg: '#fef2f2', t: tSo, cx: 750, cy: 980 },
  ];

  tagList.forEach((it, i) => {
    const revealed = TT >= it.t;
    withT(it.cx, it.cy, (i % 2 ? 0.015 : -0.015), 1, () => {
      // Base paper card
      pp(pR(-180, -60, 360, 120, 16), revealed ? it.bg : PR.paperW, { key: 'emtag_' + i, sb: 10, sy: 5, tex: 0.4 });
      pp(pR(-180, -60, 14, 120, 8), revealed ? it.col : PR.greyD, { shadow: false });
      if (revealed) {
        txt(it.label, -145, -16, fitSize(it.label, 300, 26), it.col, { weight: 800 });
        txt(it.sub, -145, 22, fitSize(it.sub, 300, 20), PR.char, { weight: 700 });
      } else {
        pp(pR(-145, -12, 200, 10, 4), 'rgba(30,41,59,0.12)', { shadow: false });
        pp(pR(-145, 12, 130, 10, 4), 'rgba(30,41,59,0.12)', { shadow: false });
      }
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'flat', look: -20, key: 'b3' });
  prSign('CẢM XÚC KHIẾN BẠN NÉ TRÁNH', { kicker: KICK });
  prChips();
};

// S4: Chuyển sang việc dễ chịu hơn giúp bạn tạm tránh cảm giác đó.
SCENES.trap = () => {
  m17Room(TEAL2, true);
  const tDoi = VW('trap', 'chịu').t0;

  prStar(130, 420, 30, PR.pink);
  prStar(940, 420, 24, PR.mustard);
  prClock(920, 560, 54, 12, 0, 'clk_trap');

  // Cozy desk organizer mat framing the phone
  withT(CX, 790, 0, 1, () => {
    pp(pR(-300, -320, 600, 640, 24), '#3a5f5f', { key: 'desk_mat', sb: 12, sy: 6, tex: 0.3 });
  });

  // Large entertaining smartphone hero (centered solo hero, drawn at cut)
  withT(CX, 790, -0.01, 1, () => {
    m17Phone(0, 0, 420, 580, 'video', 'ph_trap');
  });

  if (TT >= tDoi) {
    prStamp('DỄ CHỊU TỨC THÌ', CX, 1170, PR.green, tDoi, { rot: -0.03, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'happy', look: -30, key: 'b4' });
  prSign('TẠM TRÁNH CẢM GIÁC KHÓ CHỊU', { kicker: KICK });
  prChips();
};

// S5 (SPLIT): Nhưng công việc vẫn còn nguyên.
SCENES.trap2 = () => {
  m17Room(TEAL, false);
  const tNguyen = VW('trap', 'nguyên').t0;

  prStar(130, 420, 26, PR.mustard);
  prStar(940, 420, 30, PR.pink);

  // Clock leaping forward to late afternoon (drawn at cut)
  prClock(CX, 510, 70, 5, 15, 'clk_late');

  // Untouched giant mountain of documents (drawn at cut)
  withT(CX, 870, 0, 1, () => {
    // Bottom binder
    pp(pR(-340, 40, 680, 100, 16), PR.navy, { key: 'pile_bot', sb: 14, sy: 7, tex: 0.45 });
    txt('BÁO CÁO CHƯA LÀM', -300, 95, 24, PR.creamL, { weight: 800 });
    // Middle binder
    pp(pR(-320, -35, 640, 100, 16), '#334155', { key: 'pile_mid', sb: 12, sy: 6, tex: 0.45 });
    txt('TÀI LIỆU DỰ ÁN', -280, 20, 24, PR.creamL, { weight: 800 });
    // Top urgent folder
    pp(pR(-300, -110, 600, 100, 16), PR.paperW, { key: 'pile_top', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-300, -110, 600, 28, 16), PR.red, { shadow: false });
    txt('DEADLINE ĐANG ĐẾN GẦN', 0, -55, fitSize('DEADLINE ĐANG ĐẾN GẦN', 540, 30), PR.char, { align: 'center', weight: 800 });
  });

  if (TT >= tNguyen) {
    prStamp('CÔNG VIỆC VẪN CÒN NGUYÊN!', CX, 1100, PR.red, tNguyen, { rot: -0.04, size: 44, from: 1.2 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'wow', look: -30, key: 'b5' });
  prSign('CÔNG VIỆC VẪN CÒN NGUYÊN', { kicker: KICK });
  prChips();
};

// S6: Hãy thử quan sát: điều gì trong nhiệm vụ này đang khiến mình muốn né tránh?
SCENES.notice = () => {
  m17Room(TEAL2, true);
  const tQuan = VW('notice', 'quan').t0;
  const tNe = VW('notice', 'tránh').t0;

  prStar(130, 390, 32, PR.mustard);
  prStar(930, 400, 26, PR.orange);

  // Big observation clipboard (drawn at cut)
  withT(CX, 720, 0, 1, () => {
    // Clipboard body
    pp(pR(-360, -190, 720, 380, 22), PR.paperW, { key: 'obs_board', sb: 14, sy: 7, tex: 0.45 });
    // Clip at top
    pp(pR(-80, -215, 160, 44, 8), PR.char, { key: 'obs_clip', sb: 8, sy: 4, tex: 0.4 });
    // Step header
    pp(pR(-180, -155, 360, 46, 12), PR.mustard, { shadow: false });
    txt('DỪNG LẠI & QUAN SÁT', 0, -126, 22, PR.char, { align: 'center', weight: 800 });
    // Question text matching narration
    txt('"ĐIỀU GÌ TRONG NHIỆM VỤ NÀY', 0, -45, fitSize('"ĐIỀU GÌ TRONG NHIỆM VỤ NÀY', 640, 38), PR.navy, { align: 'center', weight: 800 });
    txt('ĐANG KHIẾN MÌNH MUỐN NÉ TRÁNH?"', 0, 15, fitSize('ĐANG KHIẾN MÌNH MUỐN NÉ TRÁNH?"', 640, 38), PR.red, { align: 'center', weight: 800 });
    // Prominent paper magnifying glass icon
    pp(pE(0, 110, 44, 44), '#cbd5e1', { key: 'glass_rim', sb: 8, sy: 4 });
    pp(pE(0, 110, 34, 34), PR.paperW, { shadow: false });
    pp(pR(26, 130, 36, 12, 4), PR.wood, { key: 'glass_handle', sb: 4, sy: 2, rot: 0.8 });
  });

  // 3 reflection cards below (drawn at cut, text colored on "né tránh")
  const qRevealed = TT >= tNe;
  const qCards = [
    { text: 'QUÁ KHÓ?', col: PR.orange, bg: '#fff7ed', cx: 260 },
    { text: 'NHÀM CHÁN?', col: PR.mustard, bg: '#fefce8', cx: 540 },
    { text: 'SỢ SAI?', col: PR.red, bg: '#fef2f2', cx: 820 },
  ];
  qCards.forEach((qc, i) => {
    withT(qc.cx, 1040, (i === 1 ? 0 : i === 0 ? -0.02 : 0.02), 1, () => {
      pp(pR(-120, -45, 240, 90, 14), qRevealed ? qc.bg : PR.paperW, { key: 'qc_' + i, sb: 10, sy: 5, tex: 0.4 });
      pp(pR(-120, -45, 10, 90, 6), qRevealed ? qc.col : PR.greyD, { shadow: false });
      if (qRevealed) {
        txt(qc.text, 5, 8, fitSize(qc.text, 200, 28), qc.col, { align: 'center', weight: 800 });
      } else {
        pp(pR(-60, -4, 120, 8, 4), 'rgba(30,41,59,0.14)', { shadow: false });
      }
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'think', look: -20, key: 'b6' });
  prSign('QUAN SÁT CẢM XÚC NÉ TRÁNH', { kicker: KICK });
  prChips();
};

// S7: Sau đó chọn một bước thật cụ thể, chẳng hạn đọc trang đầu tiên hoặc viết tiêu đề.
SCENES.microstep = () => {
  m17Room(TEAL, false);
  const tDoc = VW('microstep', 'đọc').t0;
  const tViet = VW('microstep', 'viết').t0;

  prStar(120, 390, 30, PR.mustard);
  prStar(940, 410, 26, PR.pink);

  // Header banner: "CHỌN MỘT BƯỚC CỤ THỂ" (drawn at cut)
  withT(CX, 530, 0, 1, () => {
    pp(pR(-350, -42, 700, 84, 16), PR.green, { key: 'ms_topbar', sb: 12, sy: 6, tex: 0.4 });
    txt('CHỌN MỘT BƯỚC THẬT CỤ THỂ', 0, 12, fitSize('CHỌN MỘT BƯỚC THẬT CỤ THỂ', 650, 34), PR.creamL, { align: 'center', weight: 800 });
  });

  // Example 1: Read the first page (Book / Document, drawn at cut)
  withT(350, 820, -0.015, 1, () => {
    pp(pR(-170, -210, 340, 420, 18), PR.paperW, { key: 'ex1_card', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-150, -190, 110, 36, 8), PR.sky, { shadow: false });
    txt('CÁCH 1', -95, -166, 18, PR.creamL, { align: 'center', weight: 800 });
    txt('ĐỌC TRANG ĐẦU TIÊN', 0, -115, fitSize('ĐỌC TRANG ĐẦU TIÊN', 300, 26), PR.navy, { align: 'center', weight: 800 });

    // Open book graphic
    pp(pR(-130, -70, 125, 170, 8), '#f8fafc', { key: 'bk_l', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(5, -70, 125, 170, 8), '#f8fafc', { key: 'bk_r', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(-3, -72, 6, 174, 2), PR.char, { shadow: false });
    // Text lines in book
    for (let j = 0; j < 4; j++) {
      pp(pR(-115, -45 + j * 32, 95, 8, 4), 'rgba(30,41,59,0.2)', { shadow: false });
      pp(pR(20, -45 + j * 32, 95, 8, 4), 'rgba(30,41,59,0.2)', { shadow: false });
    }
    // Page 1 bookmark tag
    pp(pR(-115, 60, 44, 24, 6), PR.orange, { shadow: false });
    txt('01', -93, 77, 14, PR.creamL, { align: 'center', weight: 800 });
    txt('Chỉ cần đọc trang 1', 0, 160, 20, PR.greyD, { align: 'center', weight: 700 });
  });
  prCheck(350, 970, tDoc, 50);

  // Example 2: Write the title (Notepad & Pencil, drawn at cut)
  withT(730, 820, 0.015, 1, () => {
    pp(pR(-170, -210, 340, 420, 18), PR.paperW, { key: 'ex2_card', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-150, -190, 110, 36, 8), PR.orange, { shadow: false });
    txt('CÁCH 2', -95, -166, 18, PR.creamL, { align: 'center', weight: 800 });
    txt('VIẾT TIÊU ĐỀ', 0, -115, fitSize('VIẾT TIÊU ĐỀ', 300, 26), PR.navy, { align: 'center', weight: 800 });

    // Notepad paper
    pp(pR(-130, -70, 260, 170, 8), '#fffbe6', { key: 'np_paper', sb: 8, sy: 4, tex: 0.4 });
    // Spiral rings
    for (let r = 0; r < 5; r++) {
      pp(pR(-110 + r * 50, -80, 14, 18, 4), PR.char, { shadow: false });
    }
    // Highlighted title box
    pp(pR(-110, -40, 220, 40, 6), '#fef08a', { shadow: false });
    txt('Tiêu đề: ...', -95, -14, 18, PR.char, { weight: 800 });
    for (let j = 0; j < 2; j++) {
      pp(pR(-110, 18 + j * 26, 180, 8, 4), 'rgba(30,41,59,0.18)', { shadow: false });
    }

    // Yellow pencil graphic
    pp(pR(10, 40, 90, 16, 3), PR.mustard, { key: 'penc_b', shadow: false });
    pp(pG([[100, 40], [118, 48], [100, 56]]), PR.creamL, { shadow: false });
    pp(pG([[112, 45], [118, 48], [112, 51]]), PR.char, { shadow: false });
    pp(pR(-2, 40, 14, 16, 2), PR.pink, { shadow: false });

    txt('Chỉ cần viết 1 dòng', 0, 160, 20, PR.greyD, { align: 'center', weight: 700 });
  });
  prCheck(730, 970, tViet, 50);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'happy', look: -25, key: 'b7' });
  prSign('CHỌN MỘT BƯỚC THẬT CỤ THỂ', { kicker: KICK });
  prChips();
};

// S8 (SPLIT): Đừng chỉ ép bản thân cố gắng hơn. Hãy tìm cách làm điểm bắt đầu dễ tiếp cận hơn.
SCENES.microstep2 = () => {
  m17Room(TEAL2, true);
  const tTiep = VW('microstep', 'tiếp').t0;

  prStar(130, 400, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  // Left card: "Ép bản thân cố hơn" (high wall / barrier, drawn at cut)
  withT(350, 770, -0.015, 1, () => {
    pp(pR(-170, -210, 340, 420, 18), '#fef2f2', { key: 'ms2_l_card', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-170, -210, 340, 44, 18), PR.red, { shadow: false });
    txt('ÉP BẢN THÂN CỐ HƠN', 0, -180, fitSize('ÉP BẢN THÂN CỐ HƠN', 300, 22), PR.creamL, { align: 'center', weight: 800 });
    txt('RÀO CẢN QUÁ CAO', 0, -125, fitSize('RÀO CẢN QUÁ CAO', 300, 26), PR.red, { align: 'center', weight: 800 });

    // Tall brick wall graphic
    pp(pR(-120, -80, 240, 160, 8), '#e2e8f0', { key: 'brick_wall', sb: 8, sy: 4, tex: 0.5 });
    for (let r = 0; r < 4; r++) {
      pp(pR(-120, -80 + r * 40, 240, 4, 0), '#94a3b8', { shadow: false });
      const off = (r % 2) * 40;
      for (let c = -120 + off; c < 120; c += 80) {
        pp(pR(c, -80 + r * 40, 4, 40, 0), '#94a3b8', { shadow: false });
      }
    }
    txt('Dễ kiệt sức & nản lòng', 0, 150, 20, PR.char, { align: 'center', weight: 700 });
  });
  prCross(350, 770, E0 + 0.1, 56);

  // Right card: "Điểm bắt đầu cực nhỏ" (gentle low step, drawn at cut)
  withT(730, 770, 0.015, 1, () => {
    pp(pR(-170, -210, 340, 420, 18), '#f0fdf4', { key: 'ms2_r_card', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-170, -210, 340, 44, 18), PR.green, { shadow: false });
    txt('HẠ THẤP ĐIỂM BẮT ĐẦU', 0, -180, fitSize('HẠ THẤP ĐIỂM BẮT ĐẦU', 300, 22), PR.creamL, { align: 'center', weight: 800 });
    txt('RÀO CẢN CỰC THẤP', 0, -125, fitSize('RÀO CẢN CỰC THẤP', 300, 26), PR.green, { align: 'center', weight: 800 });

    // Low entry step graphic
    pp(pR(-120, 10, 240, 70, 10), PR.paperW, { key: 'low_step', sb: 8, sy: 4, tex: 0.45 });
    pp(pR(-120, 10, 240, 14, 4), PR.green, { shadow: false });
    // Small flag on step
    pp(pR(60, -60, 6, 80, 2), PR.char, { shadow: false });
    pp(pG([[66, -60], [115, -45], [66, -30]]), PR.green, { shadow: false });

    txt('Bắt đầu nhẹ nhàng hơn', 0, 150, 20, PR.char, { align: 'center', weight: 700 });
  });
  prCheck(730, 770, E0 + 0.1, 56);

  if (TT >= tTiep) {
    prStamp('DỄ TIẾP CẬN HƠN', CX, 1130, PR.green, tTiep, { rot: -0.02, size: 48, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b8' });
  prSign('HẠ THẤP ĐIỂM BẮT ĐẦU', { kicker: KICK });
  prChips();
};

// S9: Bạn thường trì hoãn việc gì nhất?
SCENES.cta = () => {
  m17Room(TEAL, true);
  const tNhat = VW('cta', 'nhất').t0;

  prBunting(240);
  prStar(130, 430, 32, PR.mustard);
  prStar(940, 430, 26, PR.pink);
  prClock(950, 580, 52, 6, 0, 'clk_cta');

  // Comment box starts typing on last word of question
  prCommentBox(CX, 740, 'BẠN HAY TRÌ HOÃN VIỆC GÌ?', tNhat, { hint: 'Chia sẻ việc bạn hay hoãn…' });

  // Two clean example paper comment cards (drawn at cut, no emojis!)
  const cmtList = [
    { text: 'Viết báo cáo hoặc đọc tài liệu dài', col: PR.orange, cy: 950 },
    { text: 'Tập thể dục vào buổi sáng sớm', col: PR.blue, cy: 1110 },
  ];

  cmtList.forEach((c, i) => {
    withT(CX, c.cy, (i ? 0.012 : -0.012), 1, () => {
      pp(pR(-340, -55, 680, 110, 20), PR.paperW, { key: 'cmt_card_' + i, sb: 12, sy: 6, tex: 0.45 });
      // Paper avatar
      pp(pE(-275, 0, 34, 34), c.col, { key: 'cmt_av_' + i, shadow: false, tex: 0.4 });
      txt(c.text, -220, 2, fitSize(c.text, 520, 28), PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', look: -20, key: 'b9' });
  prSign('BẠN HAY TRÌ HOÃN VIỆC GÌ NHẤT?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['emotion', 'Một', 0, 'emotion2'],
  ['trap', 'Nhưng', 0, 'trap2'],
  ['microstep', 'Đừng', 0, 'microstep2'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'điện').t0 });
  cues.push({ k: 'thud', t: VW('emotion', 'không').t0 });
  cues.push({ k: 'chime', t: VW('emotion', 'khó').t0 });
  cues.push({ k: 'pop', t: VW('trap', 'chịu').t0 });
  cues.push({ k: 'thud', t: VW('trap', 'nguyên').t0 });
  cues.push({ k: 'tick', t: VW('notice', 'quan').t0 });
  cues.push({ k: 'pop', t: VW('microstep', 'đọc').t0 });
  cues.push({ k: 'chime', t: VW('microstep', 'tiếp').t0 });
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
