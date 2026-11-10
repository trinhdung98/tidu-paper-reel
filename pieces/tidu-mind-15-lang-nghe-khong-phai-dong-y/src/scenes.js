// =====================================================================
//  TIDU MIND 15 — "Lắng nghe không có nghĩa là phải đồng ý"
//  Kỹ năng lắng nghe thấu cảm & Giao tiếp trắc ẩn.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f / #355555.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · GIAO TIẾP';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};

// ---- Helpers (prefixed m15) ----

function m15Room(wallColor, studs = false) {
  prWall(wallColor, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs });
  if (!studs) pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 410, 30, PR.mustard);
  prStar(920, 420, 26, PR.pink);
}

// Mini headphones paper icon
function m15HeadphonesMini(cx, cy, s = 1, key = 'hpm') {
  withT(cx, cy, 0, s, () => {
    ctx.save(); ctx.strokeStyle = PR.char; ctx.lineWidth = 14; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, 70, Math.PI, 0); ctx.stroke(); ctx.restore();
    pp(pR(-85, -20, 28, 54, 12), PR.orange, { key: key + 'eL', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(57, -20, 28, 54, 12), PR.orange, { key: key + 'eR', sb: 8, sy: 4, tex: 0.4 });
  });
}

// Concrete paper shield prop (defending one's perspective)
function m15Shield(cx, cy, k, key = 'shld') {
  withT(cx, cy, 0, k, () => {
    // Outer shield rim
    pp(pG([[-240, -260], [240, -260], [220, 50], [0, 270], [-220, 50]]), '#243438', { key: key + 'rim', sb: 18, sy: 9, tex: 0.5 });
    // Inner shield face
    pp(pG([[-215, -240], [215, -240], [195, 40], [0, 245], [-195, 40]]), '#e5b244', { key: key + 'face', sb: 10, sy: 5, tex: 0.55 });
    // Crest badge in center
    pp(pR(-160, -150, 320, 200, 16), PR.paperW, { key: key + 'crest', sb: 8, sy: 4, tex: 0.45 });
    txt('QUAN ĐIỂM', 0, -65, 36, PR.navy, { align: 'center', weight: 800 });
    txt('CỦA MÌNH', 0, -15, 36, PR.navy, { align: 'center', weight: 800 });
    // Small heraldic star on crest
    prStar(0, 65, 26, PR.red);
  });
}

// Paper bookmark ribbon shape
function m15BookmarkRibbon(x, y, w, h, fill, key = 'bmk') {
  pp(pG([[x, y], [x + w, y], [x + w, y + h], [x + w / 2, y + h - 24], [x, y + h]]), fill, { key, sb: 8, sy: 4, tex: 0.4 });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Người đối diện chưa nói xong, ta đã chuẩn bị phản biện
  const tNhung = VW('hook', 'nhưng').t0;
  const tPhan = VW('hook', 'biện').t0;

  m15Room(TEAL, false);
  prClock(920, 430, 50, 1, 30, 'clk1');

  // Hero: Dialogue bubble from "Người đối diện" (fully drawn at t=0 for thumbnail)
  withT(CX - 40, 640, -0.02, 1, () => {
    pp(() => {
      ctx.roundRect(-350, -110, 700, 220, 24);
      ctx.moveTo(-240, 110); ctx.lineTo(-290, 160); ctx.lineTo(-210, 110);
    }, PR.paperW, { key: 'sp_other', sb: 16, sy: 8, tex: 0.45 });

    pp(pR(-310, -85, 230, 42, 10), PR.blue, { shadow: false });
    txt('NGƯỜI ĐỐI DIỆN', -195, -64, 22, PR.creamL, { align: 'center', weight: 800 });

    txt('CHƯA NÓI XONG...', 0, 16, 42, PR.navy, { align: 'center', weight: 800 });

    // Animated sound dots
    [-30, 0, 30].forEach((dx, i) => {
      const pulse = 1 + 0.3 * Math.sin(TT * 6 + i);
      pp(pE(dx, 68, 8 * pulse, 8 * pulse), PR.grey, { shadow: false });
    });
  });

  // You preparing counter argument
  const kCounter = popS(tNhung);
  if (kCounter > 0.01) {
    withT(CX + 40, 960, 0.02, kCounter, () => {
      pp(() => {
        ctx.roundRect(-340, -110, 680, 220, 24);
        ctx.moveTo(200, 110); ctx.lineTo(250, 160); ctx.lineTo(170, 110);
      }, '#fff8f4', { key: 'sp_self', sb: 16, sy: 8, tex: 0.45 });

      pp(pR(-300, -85, 210, 42, 10), PR.red, { shadow: false });
      txt('TÂM TRÍ BẠN', -195, -64, 22, PR.creamL, { align: 'center', weight: 800 });

      txt('CHUẨN BỊ PHẢN BIỆN?', 0, 16, fitSize('CHUẨN BỊ PHẢN BIỆN?', 540, 40), PR.red, { align: 'center', weight: 800 });

      // Red counter arrow pointing towards the dialogue
      pp(pR(-80, 60, 130, 16, 4), PR.red, { shadow: false });
      pp(pG([[-105, 68], [-75, 48], [-75, 88]]), PR.red, { shadow: false });
    });
  }

  prStamp('CHUẨN BỊ PHẢN BÁC!', CX, 1170, PR.red, tPhan, { rot: -0.03, size: 42, from: 1.2 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tPhan ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('CHƯA NGHE ĐÃ MUỐN PHẢN BIỆN?', { kicker: KICK });
  prChips();
};

SCENES.nature = () => {   // S2: Bản năng muốn bảo vệ quan điểm của mình
  const tBao = VW('nature', 'bảo').t0;
  const tMinh = VW('nature', 'mình').t0;

  m15Room(TEAL2, true);
  prClock(920, 430, 50, 2, 0, 'clk2');

  // Concrete Hero: Layered Paper Shield (present at cut)
  m15Shield(CX, 780, 1, 'nat_shield');

  // Pulsing aura when line reaches "bảo vệ quan điểm"
  if (TT >= tBao) {
    const pulse = 1 + 0.05 * Math.sin((TT - tBao) * 8);
    ctx.save();
    ctx.strokeStyle = 'rgba(232, 178, 68, 0.45)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(CX, 780, 310 * pulse, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }

  // Label tag above shield
  withT(CX, 460, 0, 1, () => {
    pp(pR(-230, -32, 460, 64, 16), PR.paperW, { key: 'nat_tag', sb: 10, sy: 5, tex: 0.4 });
    txt('BẢN NĂNG TỰ NHIÊN', 0, 8, 28, PR.greyD, { align: 'center', weight: 800 });
  });

  // Subtitle strip below shield (present at cut)
  withT(CX, 1070, 0, 1, () => {
    pp(pR(-190, -24, 380, 48, 12), PR.paperW, { key: 'nat_sub', sb: 8, sy: 4, tex: 0.4 });
    txt('TÂM LÝ BẢO VỆ BẢN THÂN', 0, 6, 22, PR.greyD, { align: 'center', weight: 800 });
  });

  prStamp('BẢO VỆ QUAN ĐIỂM', CX, 1170, PR.mustard, tMinh, { rot: -0.02, size: 44, from: 1.2 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'flat', look: -25, key: 'b2' });
  prSign('BẢO VỆ QUAN ĐIỂM CỦA MÌNH', { kicker: KICK });
  prChips();
};

SCENES.nature2 = () => {   // S3 (SPLIT): Cuộc trò chuyện không nhất thiết phải thắng thua
  const tThang = VW('nature', 'thắng').t0;
  const tThua = VW('nature', 'thua').t0;

  m15Room(TEAL, false);
  prClock(920, 430, 50, 2, 15, 'clk3');

  // Hero: Scoreboard card comparing Thắng vs Thua (present at cut)
  withT(CX, 750, 0, 1, () => {
    pp(pR(-370, -190, 740, 380, 24), '#1e3338', { key: 'sc_board', sb: 18, sy: 9, tex: 0.5 });

    // Left card: NGƯỜI THẮNG
    pp(pR(-330, -150, 280, 300, 16), PR.paperW, { key: 'sc_win', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(-190, -75, 40, 40), PR.mustard, { shadow: false });
    prStar(-190, -75, 22, PR.creamL);
    txt('NGƯỜI THẮNG', -190, 10, 28, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-290, 55, 200, 36, 8), '#eaf6ea', { shadow: false });
    txt('CHIẾN THẮNG', -190, 80, 20, PR.green, { align: 'center', weight: 800 });

    // VS center badge
    pp(pE(0, 0, 46, 46), PR.char, { key: 'sc_vs', sb: 8, sy: 4, tex: 0.4 });
    txt('VS', 0, 8, 28, PR.creamL, { align: 'center', weight: 800 });

    // Right card: NGƯỜI THUA
    pp(pR(50, -150, 280, 300, 16), PR.paperW, { key: 'sc_lose', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(190, -75, 40, 40), PR.grey, { shadow: false });
    txt('NGƯỜI THUA', 190, 10, 28, PR.greyD, { align: 'center', weight: 800 });
    pp(pR(90, 55, 200, 36, 8), '#fceeee', { shadow: false });
    txt('THẤT BẠI', 190, 80, 20, PR.red, { align: 'center', weight: 800 });
  });

  // Cross out the VS ring when line says "thua"
  prCross(CX, 750, tThua, 84);

  prStamp('KHÔNG CẦN THẮNG THUA', CX, 980, PR.green, tThang, { rot: -0.03, size: 42, from: 1.2 });

  // Lower message banner (present from cut)
  withT(CX, 1100, 0, 1, () => {
    pp(pR(-280, -32, 560, 64, 16), PR.paperW, { key: 'nowin_msg', sb: 10, sy: 5, tex: 0.4 });
    txt('LẮNG NGHE ĐỂ HIỂU NHAU', 0, 8, 28, PR.navy, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b3' });
  prSign('KHÔNG PHẢI CUỘC THẮNG THUA', { kicker: KICK });
  prChips();
};

SCENES.principle = () => {   // S4: Bạn có thể hiểu ý người khác mà vẫn không đồng tình
  const tHieu = VW('principle', 'hiểu').t0;
  const tDong = VW('principle', 'tình').t0;

  m15Room(TEAL2, true);
  prClock(920, 430, 50, 2, 30, 'clk4');

  // Hero: Paired cards centered symmetrically at 350 and 730 (present at cut)
  // Left card: HIỂU Ý ĐỐI PHƯƠNG
  withT(350, 750, -0.01, 1, () => {
    pp(pR(-170, -230, 340, 460, 20), PR.paperW, { key: 'card_listen', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -230, 340, 80, 20), PR.green, { shadow: false });
    pp(pR(-170, -165, 340, 15, 0), PR.green, { shadow: false });
    txt('LẮNG NGHE', 0, -180, 28, PR.creamL, { align: 'center', weight: 800 });

    m15HeadphonesMini(0, -70, 0.9, 'hpm_l');

    txt('HIỂU Ý', 0, 35, 38, PR.navy, { align: 'center', weight: 800 });
    txt('NGƯỜI KHÁC', 0, 80, 26, PR.greyD, { align: 'center', weight: 700 });
  });
  prCheck(350, 885, tHieu, 44);

  // Center badge: KHÁC VỚI
  withT(CX, 750, 0, 1, () => {
    pp(pE(0, 0, 50, 50), PR.char, { key: 'diff_badge', sb: 10, sy: 5, tex: 0.4 });
    txt('KHÁC', 0, -8, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('VỚI', 0, 18, 22, PR.creamL, { align: 'center', weight: 800 });
  });

  // Right card: VẪN GIỮ QUAN ĐIỂM
  withT(730, 750, 0.01, 1, () => {
    pp(pR(-170, -230, 340, 460, 20), PR.paperW, { key: 'card_agree', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -230, 340, 80, 20), PR.mustard, { shadow: false });
    pp(pR(-170, -165, 340, 15, 0), PR.mustard, { shadow: false });
    txt('QUAN ĐIỂM', 0, -180, 28, PR.navy, { align: 'center', weight: 800 });

    // Shield/flag icon
    pp(pG([[-32, -100], [32, -100], [26, -45], [0, -25], [-26, -45]]), PR.mustard, { shadow: false });

    txt('KHÔNG', 0, 35, 38, PR.navy, { align: 'center', weight: 800 });
    txt('ĐỒNG TÌNH', 0, 80, 26, PR.greyD, { align: 'center', weight: 700 });
  });
  prCheck(730, 885, tDong, 44);

  prStamp('HIỂU Ý KHÁC ĐỒNG TÌNH', CX, 1080, PR.green, tHieu + 0.2, { rot: -0.02, size: 40, from: 1.2 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'happy', look: -20, key: 'b4' });
  prSign('LẮNG NGHE KHÁC VỚI ĐỒNG Ý', { kicker: KICK });
  prChips();
};

SCENES.action = () => {   // S5: 3 việc: để họ nói hết -> nhắc lại điều hiểu -> đưa góc nhìn
  const tHet = VW('action', 'hết').t0;
  const tHieu = VW('action', 'hiểu').t0;
  const tGoc = VW('action', 'góc').t0;

  m15Room(TEAL, false);
  prClock(920, 430, 50, 2, 45, 'clk5');

  // Concrete Hero: Wooden Clipboard with paper sheet (present at cut)
  withT(CX, 780, 0, 1, () => {
    // Clipboard backing board
    pp(pR(-370, -290, 740, 580, 22), PR.woodD, { key: 'clip_board', sb: 18, sy: 9, tex: 0.6 });
    // Paper pad
    pp(pR(-340, -260, 680, 520, 12), PR.paperW, { key: 'clip_paper', sb: 12, sy: 6, tex: 0.45 });
    // Metallic clip at top
    pp(pR(-110, -300, 220, 56, 8), PR.char, { key: 'clip_top', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(-60, -272, 8, 8), PR.grey, { shadow: false });
    pp(pE(60, -272, 8, 8), PR.grey, { shadow: false });

    txt('3 VIỆC NÊN LÀM', 0, -205, 34, PR.navy, { align: 'center', weight: 800 });
  });

  // Step 1: Để họ nói hết
  const k1 = popS(tHet);
  if (k1 > 0.01) {
    withT(CX, 670, -0.01, k1, () => {
      pp(pR(-310, -42, 620, 84, 12), '#f2f8f5', { key: 'act_st1', sb: 8, sy: 4, tex: 0.4 });
      pp(pR(-310, -42, 14, 84, 6), PR.blue, { shadow: false });
      pp(pE(-260, 0, 24, 24), PR.blue, { shadow: false });
      txt('1', -260, 8, 26, PR.creamL, { align: 'center', weight: 800 });
      txt('ĐỂ HỌ NÓI HẾT', -215, 8, 30, PR.navy, { weight: 800 });
    });
    prCheck(CX + 260, 670, tHet + 0.1, 28);
  }

  // Step 2: Nhắc lại điều mình hiểu
  const k2 = popS(tHieu);
  if (k2 > 0.01) {
    withT(CX, 780, 0.01, k2, () => {
      pp(pR(-310, -42, 620, 84, 12), '#f2f8f5', { key: 'act_st2', sb: 8, sy: 4, tex: 0.4 });
      pp(pR(-310, -42, 14, 84, 6), PR.green, { shadow: false });
      pp(pE(-260, 0, 24, 24), PR.green, { shadow: false });
      txt('2', -260, 8, 26, PR.creamL, { align: 'center', weight: 800 });
      txt('NHẮC LẠI ĐIỀU MÌNH HIỂU', -215, 8, fitSize('NHẮC LẠI ĐIỀU MÌNH HIỂU', 420, 30), PR.navy, { weight: 800 });
    });
    prCheck(CX + 260, 780, tHieu + 0.1, 28);
  }

  // Step 3: Đưa ra góc nhìn bản thân
  const k3 = popS(tGoc);
  if (k3 > 0.01) {
    withT(CX, 890, -0.01, k3, () => {
      pp(pR(-310, -42, 620, 84, 12), '#f2f8f5', { key: 'act_st3', sb: 8, sy: 4, tex: 0.4 });
      pp(pR(-310, -42, 14, 84, 6), PR.orange, { shadow: false });
      pp(pE(-260, 0, 24, 24), PR.orange, { shadow: false });
      txt('3', -260, 8, 26, PR.creamL, { align: 'center', weight: 800 });
      txt('ĐƯA RA GÓC NHÌN', -215, 8, 30, PR.navy, { weight: 800 });
    });
    prCheck(CX + 260, 890, tGoc + 0.1, 28);
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'happy', look: -20, key: 'b5' });
  prSign('3 BƯỚC LẮNG NGHE CHỦ ĐỘNG', { kicker: KICK });
  prChips();
};

SCENES.action2 = () => {   // S6 (SPLIT): Ví dụ: nếu mình hiểu đúng, bạn đang lo về thời hạn...
  const tThoi = VW('action', 'thời').t0;
  const tKhong = VW('action', 'không').t0;

  m15Room(TEAL2, true);
  prClock(920, 430, 50, 3, 0, 'clk6');

  // Hero 1: Dialogue quote bubble (present at cut)
  withT(CX, 650, -0.01, 1, () => {
    pp(() => {
      ctx.roundRect(-370, -130, 740, 260, 24);
      ctx.moveTo(-40, 130); ctx.lineTo(0, 175); ctx.lineTo(40, 130);
    }, PR.paperW, { key: 'ex_bubble', sb: 16, sy: 8, tex: 0.45 });

    pp(pR(-330, -105, 230, 42, 10), PR.blue, { shadow: false });
    txt('VÍ DỤ CÂU HỎI:', -215, -84, 22, PR.creamL, { align: 'center', weight: 800 });

    txt('"Nếu mình hiểu đúng,', 0, -15, 36, PR.navy, { align: 'center', weight: 800 });
    txt('bạn đang lo về thời hạn, đúng không?"', 0, 40, fitSize('bạn đang lo về thời hạn, đúng không?"', 680, 32), PR.navy, { align: 'center', weight: 800 });
  });

  // Hero 2: Paper Wall Calendar prop (representing "thời hạn / deadline")
  withT(CX, 990, 0.02, 1, () => {
    // Calendar body
    pp(pR(-190, -115, 380, 230, 16), PR.paperW, { key: 'cal_body', sb: 14, sy: 7, tex: 0.45 });
    // Top binder red band
    pp(pR(-190, -115, 380, 60, 16), PR.red, { shadow: false });
    pp(pR(-190, -75, 380, 20, 0), PR.red, { shadow: false });
    // Binder hanging rings
    [-90, 0, 90].forEach((rx) => {
      pp(pR(rx - 8, -127, 16, 26, 6), PR.creamL, { shadow: false });
    });
    txt('THỜI HẠN', 0, -82, 26, PR.creamL, { align: 'center', weight: 800 });

    // Calendar sheet details
    txt('DEADLINE', 0, -5, 34, PR.char, { align: 'center', weight: 800 });
    pp(pR(-100, 35, 200, 36, 8), '#fceeee', { shadow: false });
    txt('CẦN XÁC NHẬN', 0, 56, 20, PR.red, { align: 'center', weight: 800 });
  });

  prStamp('XÁC NHẬN TRƯỚC', CX, 1180, PR.green, tKhong, { rot: -0.02, size: 44, from: 1.2 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b6' });
  prSign('HỎI LẠI ĐỂ XÁC NHẬN', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S7: Một câu hỏi xác nhận đôi khi hữu ích hơn việc phản bác quá sớm
  const tXac = VW('reframe', 'xác').t0;
  const tSom = VW('reframe', 'sớm').t0;

  m15Room(TEAL, false);
  prClock(920, 430, 50, 3, 15, 'clk7');

  // Paired comparison cards symmetric about CX = 540 (present at cut)
  // Left card: HỎI XÁC NHẬN (Hữu ích hơn)
  withT(350, 750, -0.01, 1, () => {
    pp(pR(-170, -230, 340, 460, 20), PR.paperW, { key: 'rf_good', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -230, 340, 80, 20), PR.green, { shadow: false });
    pp(pR(-170, -165, 340, 15, 0), PR.green, { shadow: false });
    txt('HỮU ÍCH HƠN', 0, -180, 26, PR.creamL, { align: 'center', weight: 800 });

    txt('CÂU HỎI', 0, -50, 34, PR.navy, { align: 'center', weight: 800 });
    txt('XÁC NHẬN', 0, 0, 34, PR.navy, { align: 'center', weight: 800 });
    txt('Làm rõ thông tin', 0, 60, 24, PR.greyD, { align: 'center', weight: 700 });
  });
  prCheck(350, 885, tXac, 44);

  // Right card: PHẢN BÁC QUÁ SỚM
  withT(730, 750, 0.01, 1, () => {
    pp(pR(-170, -230, 340, 460, 20), '#f4f5f2', { key: 'rf_bad', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-170, -230, 340, 80, 20), PR.greyD, { shadow: false });
    pp(pR(-170, -165, 340, 15, 0), PR.greyD, { shadow: false });
    txt('DỄ HIỂU LẦM', 0, -180, 26, PR.creamL, { align: 'center', weight: 800 });

    txt('PHẢN BÁC', 0, -50, 34, PR.char, { align: 'center', weight: 800 });
    txt('QUÁ SỚM', 0, 0, 34, PR.char, { align: 'center', weight: 800 });
    txt('Gây cảm giác phòng thủ', 0, 60, 22, PR.grey, { align: 'center', weight: 700 });
  });
  prCross(730, 885, tSom, 44);

  prStamp('XÁC NHẬN TRƯỚC', CX, 1080, PR.green, tXac + 0.2, { rot: -0.02, size: 44, from: 1.2 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'happy', look: -20, key: 'b7' });
  prSign('XÁC NHẬN TRƯỚC, PHẢN HỒI SAU', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S8: Lưu lại ba bước: Nghe hết – Xác nhận – Phản hồi
  const tLuu = VW('cta', 'Lưu').t0;
  const tHoi = VW('cta', 'Hồi').t0;

  m15Room(TEAL2, true);
  prBunting(260);
  prStar(140, 420, 34, PR.mustard);
  prStar(920, 410, 28, PR.pink);
  prClock(920, 430, 50, 3, 30, 'clk8');

  // Hero: 3-step Summary Cheat Sheet Card (present at cut)
  withT(CX, 680, 0, 1, () => {
    pp(pR(-370, -210, 740, 420, 24), PR.paperW, { key: 'cta_card', sb: 18, sy: 9, tex: 0.5 });
    // Header banner
    pp(pR(-370, -210, 740, 80, 24), PR.navy, { shadow: false });
    pp(pR(-370, -145, 740, 15, 0), PR.navy, { shadow: false });
    txt('3 BƯỚC LẮNG NGHE CHỦ ĐỘNG', 0, -165, 30, PR.creamL, { align: 'center', weight: 800 });

    // Step 1
    pp(pR(-330, -110, 660, 76, 12), '#f2f8f5', { key: 'cta_s1', shadow: false });
    pp(pE(-290, -72, 22, 22), PR.blue, { shadow: false });
    txt('1', -290, -64, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('NGHE HẾT', -250, -64, 30, PR.navy, { weight: 800 });
    txt('(Không ngắt lời)', 80, -64, 24, PR.greyD, { weight: 700 });

    // Step 2
    pp(pR(-330, -20, 660, 76, 12), '#f2f8f5', { key: 'cta_s2', shadow: false });
    pp(pE(-290, 18, 22, 22), PR.green, { shadow: false });
    txt('2', -290, 26, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('XÁC NHẬN', -250, 26, 30, PR.navy, { weight: 800 });
    txt('(Hỏi lại điều mình hiểu)', 80, 26, 24, PR.greyD, { weight: 700 });

    // Step 3
    pp(pR(-330, 70, 660, 76, 12), '#f2f8f5', { key: 'cta_s3', shadow: false });
    pp(pE(-290, 108, 22, 22), PR.orange, { shadow: false });
    txt('3', -290, 116, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('PHẢN HỒI', -250, 116, 30, PR.navy, { weight: 800 });
    txt('(Đưa ra góc nhìn riêng)', 80, 116, 24, PR.greyD, { weight: 700 });
  });

  // Bookmark ribbon slipping onto the summary card on "Lưu"
  if (TT >= tLuu) {
    const kSlide = Math.min(1, (TT - tLuu) / 0.3);
    m15BookmarkRibbon(CX + 260, 470 - 20 * (1 - kSlide), 50, 90, PR.red, 'cta_ribbon');
  }

  // Save Action Button Widget (NO COMMENT BOX, present at cut)
  const isSaved = TT >= tLuu;
  withT(CX, 1020, 0, 1, () => {
    // Button pill
    pp(pR(-280, -50, 560, 100, 50), isSaved ? '#1a4038' : PR.char, { key: 'btn_save', sb: 14, sy: 7, tex: 0.45 });

    // Ribbon icon inside button
    const rx = -200, ry = -24;
    pp(pG([[rx, ry], [rx + 32, ry], [rx + 32, ry + 48], [rx + 16, ry + 36], [rx, ry + 48]]), isSaved ? PR.mustard : PR.creamL, { shadow: false });

    txt('LƯU LẠI BA BƯỚC', 20, 8, fitSize('LƯU LẠI BA BƯỚC', 380, 34), PR.creamL, { align: 'center', weight: 800 });
  });

  prBurst(CX + 280, 1020, tLuu + 0.2);
  prStamp('ĐÃ LƯU BÀI HỌC!', CX, 1170, PR.green, tLuu + 0.25, { rot: -0.03, size: 44, from: 1.2 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', look: -20, key: 'b8' });
  prSign('NGHE HẾT · XÁC NHẬN · PHẢN HỒI', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['nature', 'Nhưng', 0, 'nature2'],
  ['action', 'Ví', 0, 'action2'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'biện').t0 });
  cues.push({ k: 'pop', t: VW('nature', 'mình').t0 });
  cues.push({ k: 'thud', t: VW('nature', 'thua').t0 });
  cues.push({ k: 'chime', t: VW('principle', 'hiểu').t0 });
  cues.push({ k: 'pop', t: VW('action', 'hết').t0 });
  cues.push({ k: 'pop', t: VW('action', 'hiểu').t0 });
  cues.push({ k: 'pop', t: VW('action', 'góc').t0 });
  cues.push({ k: 'pop', t: VW('action', 'thời').t0 });
  cues.push({ k: 'tick', t: VW('action', 'không').t0 });
  cues.push({ k: 'tick', t: VW('reframe', 'xác').t0 });
  cues.push({ k: 'thud', t: VW('reframe', 'sớm').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'Lưu').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'Hồi').t0 });
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
