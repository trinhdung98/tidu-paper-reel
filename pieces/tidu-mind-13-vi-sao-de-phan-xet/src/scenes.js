// =====================================================================
//  TIDU MIND 13 — "Vì sao ta dễ phán xét người khác?"
//  Lỗi quy kết cơ bản (Fundamental Attribution Error) — Thiên kiến nhận thức.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · THIÊN KIẾN';
const TEAL = '#2e4f4f', TEAL2 = '#355555';

const SCENES = {};

// ---- helpers (m13 = piece tidu-mind-13)

function m13Room(c, studs) {
  prWall(c, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs });
  if (!studs) pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
}

// S1: Office late scene
function m13OfficeLate(cx, cy, k, tStamp) {
  withT(cx, cy, 0, k, () => {
    // Office door / partition backdrop
    pp(pR(-320, -220, 640, 420, 18), PR.slate, { key: 'of_wall', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-280, -190, 250, 360, 12), PR.navyD, { key: 'of_door', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(-50, -10, 14, 14), PR.mustard, { key: 'of_knob', shadow: false, tex: 0.3 });

    // Office wall clock
    prClock(150, -80, 68, 8, 45, 'of_clk');

    // Desk in front
    pp(pR(-350, 100, 700, 54, 8), PR.woodL, { key: 'of_desk', sb: 12, sy: 6, tex: 0.5 });

    // Attendance clipboard on desk
    pp(pR(-240, 40, 220, 80, 8), PR.paperW, { key: 'of_att', sb: 8, sy: 4, tex: 0.4 });
    txt('GIỜ VÀO LÀM', -130, 68, 20, PR.greyD, { align: 'center', weight: 800 });
    txt('08:00', -130, 104, 32, PR.char, { align: 'center', weight: 800 });

    // Briefcase on desk
    pp(pR(80, 52, 120, 68, 8), PR.woodD, { key: 'of_case', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(120, 38, 40, 16, 4), PR.char, { shadow: false });

    // Late stamp on "nhiệm"
    if (TT >= tStamp) {
      prStamp('THIẾU TRÁCH NHIỆM!', 0, 215, PR.red, tStamp, { rot: -0.04, size: 48, from: 1.3 });
    }
  });
}

// S1b: Traffic jam scene
function m13TrafficJam(cx, cy, k, tStamp) {
  withT(cx, cy, 0, k, () => {
    // Road asphalt
    pp(pR(-380, -180, 760, 340, 18), PR.char, { key: 'tj_road', sb: 14, sy: 7, tex: 0.45 });

    // Lane dashes
    ctx.save();
    ctx.strokeStyle = PR.mustard;
    ctx.lineWidth = 6;
    ctx.setLineDash([28, 20]);
    ctx.beginPath();
    ctx.moveTo(-350, -10);
    ctx.lineTo(350, -10);
    ctx.stroke();
    ctx.restore();

    // Traffic light post at left
    pp(pR(-340, -160, 18, 120, 4), PR.greyD, { key: 'tl_pole', shadow: false });
    pp(pR(-356, -170, 50, 90, 8), PR.ink, { key: 'tl_box', sb: 8, sy: 4 });
    pp(pE(-331, -150, 12, 12), PR.red, { key: 'tl_red', shadow: false });
    pp(pE(-331, -125, 12, 12), 'rgba(230,184,42,0.3)', { shadow: false });
    pp(pE(-331, -100, 12, 12), 'rgba(47,158,91,0.3)', { shadow: false });

    // Taxi (yellow)
    pp(pR(-240, -120, 170, 70, 12), PR.mustard, { key: 'car_tax', sb: 10, sy: 5, tex: 0.4 });
    pp(pR(-210, -145, 90, 35, 6), PR.mustard, { key: 'car_tax_top', shadow: false });
    pp(pR(-190, -140, 50, 25, 4), PR.char, { shadow: false });
    pp(pR(-180, -160, 30, 14, 4), PR.char, { key: 'tax_sign', shadow: false });
    pp(pE(-210, -50, 18, 18), PR.ink, { shadow: false });
    pp(pE(-110, -50, 18, 18), PR.ink, { shadow: false });

    // Red car (middle)
    pp(pR(-30, -130, 180, 75, 12), PR.red, { key: 'car_red', sb: 10, sy: 5, tex: 0.4 });
    pp(pR(0, -155, 100, 35, 6), PR.red, { key: 'car_red_top', shadow: false });
    pp(pR(20, -150, 60, 24, 4), PR.sky, { shadow: false });
    pp(pE(0, -55, 18, 18), PR.ink, { shadow: false });
    pp(pE(110, -55, 18, 18), PR.ink, { shadow: false });

    // Blue car (right)
    pp(pR(190, -120, 150, 70, 12), PR.blue, { key: 'car_blue', sb: 10, sy: 5, tex: 0.4 });
    pp(pR(220, -145, 80, 32, 6), PR.blue, { key: 'car_blue_top', shadow: false });
    pp(pR(235, -140, 50, 22, 4), PR.sky, { shadow: false });
    pp(pE(220, -50, 18, 18), PR.ink, { shadow: false });
    pp(pE(300, -50, 18, 18), PR.ink, { shadow: false });

    // Road label
    txt('ÙN TẮC GIỜ CAO ĐIỂM', 0, 70, 28, PR.creamL, { align: 'center', weight: 800 });

    // Stamp on "kẹt"
    if (TT >= tStamp) {
      prStamp('DO KẸT XE?', 0, 225, PR.green, tStamp, { rot: 0.04, size: 52, from: 1.3 });
    }
  });
}

// S2: Balance scale
function m13Scale(tilt, k, tCao, tNhe) {
  const px = 540, py = 660, arm = 300;
  withT(px, py, 0, k, () => {
    // Post and base
    pp(pR(-14, 0, 28, 620, 6), PR.brown, { key: 'sc_post', sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-140, 600, 280, 32, 8), PR.woodD, { key: 'sc_base', sb: 12, sy: 6, tex: 0.5 });

    // Beam
    withT(0, 0, tilt, 1, () => {
      pp(pR(-arm - 20, -14, 2 * arm + 40, 28, 10), PR.mustard, { key: 'sc_beam', sb: 12, sy: 6, tex: 0.5 });
    });
    pp(pE(0, 0, 26, 26), PR.brown, { key: 'sc_piv', sb: 6, sy: 3, tex: 0.4 });

    // Left pan (TÍNH CÁCH - Heavy)
    const lx = -arm * Math.cos(tilt), ly = -arm * Math.sin(tilt);
    ctx.save();
    ctx.strokeStyle = 'rgba(244,241,232,0.85)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx - 100, ly + 250);
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx + 100, ly + 250);
    ctx.stroke();
    ctx.restore();

    // Heavy weight
    withT(lx, ly + 250, 0, 1, () => {
      pp(pR(-85, -60, 170, 70, 14), PR.red, { key: 'w_red', sb: 10, sy: 5, tex: 0.4 });
      txt('TÍNH CÁCH', 0, -22, 28, PR.creamL, { align: 'center', weight: 800 });
      pp(pR(-110, 0, 220, 20, 6), PR.mustard, { key: 'pan_l', sb: 8, sy: 4, tex: 0.4 });
      if (TT >= tCao) {
        pp(pR(-110, 35, 220, 44, 8), PR.redD, { key: 'tag_l', sb: 6, sy: 3 });
        txt('ĐÁNH GIÁ QUÁ CAO', 0, 58, 20, PR.creamL, { align: 'center', weight: 800 });
      }
    });

    // Right pan (HOÀN CẢNH - Light)
    const rx = arm * Math.cos(tilt), ry = arm * Math.sin(tilt);
    ctx.save();
    ctx.strokeStyle = 'rgba(244,241,232,0.85)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx - 100, ry + 250);
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx + 100, ry + 250);
    ctx.stroke();
    ctx.restore();

    // Light weight / feather
    withT(rx, ry + 250, 0, 1, () => {
      pp(pR(-70, -40, 140, 48, 12), PR.slate, { key: 'w_slate', sb: 8, sy: 4, tex: 0.4 });
      txt('HOÀN CẢNH', 0, -14, 24, PR.creamL, { align: 'center', weight: 800 });
      pp(pR(-110, 0, 220, 20, 6), PR.mustard, { key: 'pan_r', sb: 8, sy: 4, tex: 0.4 });
      if (TT >= tNhe) {
        pp(pR(-80, 35, 160, 44, 8), PR.greyD, { key: 'tag_r', sb: 6, sy: 3 });
        txt('XEM NHẸ', 0, 58, 20, PR.creamL, { align: 'center', weight: 800 });
      }
    });
  });
}

// S2b: Concept board
function m13ConceptBoard(cx, cy, k) {
  withT(cx, cy, 0, k, () => {
    // Plaque body
    pp(pR(-390, -210, 780, 420, 22), PR.navy, { key: 'cb_body', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-366, -186, 732, 372, 16), PR.navyD, { shadow: false, tex: 0.3 });

    // Kicker
    txt('THIÊN KIẾN NHẬN THỨC', 0, -135, 26, PR.mustard, { align: 'center', weight: 800 });

    // Main title
    txt('LỖI QUY KẾT CƠ BẢN', 0, -60, fitSize('LỖI QUY KẾT CƠ BẢN', 660, 52), PR.creamL, { align: 'center', weight: 800 });
    txt('(FUNDAMENTAL ATTRIBUTION ERROR)', 0, -5, fitSize('(FUNDAMENTAL ATTRIBUTION ERROR)', 640, 24), PR.sky, { align: 'center', weight: 700 });

    // Two comparing pills
    pp(pR(-330, 50, 310, 80, 12), PR.redD, { key: 'cb_p1', sb: 6, sy: 3 });
    txt('KHI NHÌN NGƯỜI KHÁC:', -175, 78, 18, PR.creamL, { align: 'center', weight: 700 });
    txt('Quy cho tính cách', -175, 108, 24, PR.creamL, { align: 'center', weight: 800 });

    pp(pR(20, 50, 310, 80, 12), PR.green, { key: 'cb_p2', sb: 6, sy: 3 });
    txt('KHI NHÌN CHÍNH MÌNH:', 175, 78, 18, PR.creamL, { align: 'center', weight: 700 });
    txt('Hiểu rõ hoàn cảnh', 175, 108, 24, PR.creamL, { align: 'center', weight: 800 });
  });
}

// S3: Iceberg scene
function m13Iceberg(cx, cy, k, tDu) {
  withT(cx, cy, 0, k, () => {
    // Sea frame backdrop
    pp(pR(-380, -280, 760, 560, 20), '#1d3b4a', { key: 'ib_bg', sb: 16, sy: 8, tex: 0.4 });

    // Water surface line
    ctx.save();
    ctx.strokeStyle = 'rgba(79,240,255,0.7)';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 14]);
    ctx.beginPath();
    ctx.moveTo(-360, -70);
    ctx.lineTo(360, -70);
    ctx.stroke();
    ctx.restore();

    // Underwater deep iceberg
    pp(pG([[-280, -60], [280, -60], [200, 210], [-220, 190]]), '#2b586d', { key: 'ib_deep', sb: 10, sy: 5, tex: 0.45 });
    txt('TOÀN BỘ HOÀN CẢNH', 0, 45, 32, PR.creamL, { align: 'center', weight: 800 });
    txt('& NGUYÊN NHÂN ẨN PHÍA SAU', 0, 95, 24, PR.sky, { align: 'center', weight: 700 });

    // Iceberg peak (above water)
    pp(pG([[-130, -65], [0, -230], [130, -65]]), PR.paperW, { key: 'ib_top', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-120, -180, 240, 50, 8), PR.navy, { key: 'ib_top_tag', sb: 6, sy: 3 });
    txt('1 HÀNH ĐỘNG', 0, -153, 24, PR.creamL, { align: 'center', weight: 800 });
    txt('(Chỉ là phần nổi)', 0, -100, 20, PR.char, { align: 'center', weight: 700 });

    // Stamp on "đủ"
    if (TT >= tDu) {
      prStamp('CHƯA ĐỦ THÔNG TIN', 0, 215, PR.red, tDu, { rot: -0.03, size: 48, from: 1.3 });
    }
  });
}

// S4: Phone conversation scene
function m13Phone(cx, cy, k, tAngry, tTired) {
  withT(cx, cy, 0, k, () => {
    // Smartphone body
    pp(pR(-270, -240, 540, 480, 32), PR.char, { key: 'ph_body', sb: 16, sy: 8, tex: 0.4 });
    pp(pR(-246, -216, 492, 432, 20), PR.paperW, { key: 'ph_screen', shadow: false, tex: 0.3 });

    // Camera & speaker
    pp(pR(-40, -204, 80, 8, 4), PR.greyD, { shadow: false });
    pp(pE(60, -200, 6, 6), PR.greyD, { shadow: false });

    // Chat bubble 1: Sent (You)
    pp(pR(0, -160, 230, 68, 14), PR.blue, { key: 'b_sent', sb: 6, sy: 3, tex: 0.4 });
    txt('Bạn xong việc chưa?', 115, -126, 22, PR.creamL, { align: 'center', weight: 700 });

    // Chat bubble 2: Received curt reply
    pp(pR(-226, -70, 120, 68, 14), PR.greyD, { key: 'b_recv', sb: 6, sy: 3, tex: 0.4 });
    txt('"Ừ."', -166, -36, 30, PR.creamL, { align: 'center', weight: 800 });

    txt('TRẢ LỜI CỘC LỐC?', 0, 50, 28, PR.char, { align: 'center', weight: 800 });
  });

  // Possibilities popping below
  if (TT >= tAngry) {
    withT(360, cy + 240, -0.02, popS(tAngry), () => {
      pp(pR(-160, -40, 320, 80, 14), PR.redD, { key: 'rs_ang', sb: 8, sy: 4, tex: 0.4 });
      txt('ĐANG TỨC GIẬN?', 0, 4, 24, PR.creamL, { align: 'center', weight: 800 });
    });
  }
  if (TT >= tTired) {
    withT(720, cy + 240, 0.02, popS(tTired), () => {
      pp(pR(-160, -40, 320, 80, 14), PR.orange, { key: 'rs_tir', sb: 8, sy: 4, tex: 0.4 });
      txt('ĐANG MỆT MỎI?', 0, 4, 24, PR.creamL, { align: 'center', weight: 800 });
    });
  }
}

// S4b: Communication styles scene (High contrast cream cards)
function m13CommStyles(cx, cy, k, tQuen) {
  withT(cx, cy, 0, k, () => {
    // Style 1 card (left)
    pp(pR(-370, -180, 340, 340, 18), PR.paperW, { key: 'st1', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(-370, -180, 340, 60, 18), PR.blue, { shadow: false });
    txt('PHONG CÁCH 1', -200, -145, 24, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-330, -90, 260, 76, 12), PR.cream, { key: 'st1_b', shadow: false });
    txt('"Ừ. Xong rồi."', -200, -52, 26, PR.char, { align: 'center', weight: 800 });
    txt('Ngắn gọn · Trực tiếp', -200, 45, 24, PR.char, { align: 'center', weight: 700 });

    // Style 2 card (right)
    pp(pR(30, -180, 340, 340, 18), PR.paperW, { key: 'st2', sb: 12, sy: 6, tex: 0.45 });
    pp(pR(30, -180, 340, 60, 18), PR.green, { shadow: false });
    txt('PHONG CÁCH 2', 200, -145, 24, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(70, -90, 260, 76, 12), PR.cream, { key: 'st2_b', shadow: false });
    txt('"Dạ mình gửi nhé!"', 200, -52, 24, PR.char, { align: 'center', weight: 800 });
    txt('Thân mật · Chi tiết', 200, 45, 24, PR.char, { align: 'center', weight: 700 });

    // Banner below
    const kQ = popS(tQuen);
    if (kQ > 0.01) {
      withT(0, 205, 0, kQ, () => {
        pp(pR(-330, -40, 660, 80, 16), PR.navy, { key: 'st_tag', sb: 10, sy: 5, tex: 0.4 });
        txt('CHƯA QUEN CÁCH GIAO TIẾP', 0, 5, 28, PR.creamL, { align: 'center', weight: 800 });
      });
    }
  });
}

// S5: Pause before concluding (Octagonal Stop Sign)
function m13StopSign(cx, cy, k, tKet) {
  withT(cx, cy, 0, k, () => {
    // Wooden post
    pp(pR(-14, -40, 28, 380, 6), PR.wood, { key: 'stop_pole', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-130, 310, 260, 32, 8), PR.woodD, { key: 'stop_base', sb: 8, sy: 4, tex: 0.5 });

    // Octagon stop sign (radius 200)
    const R = 200;
    pp(() => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i + 0.5) * Math.PI / 4, x = Math.cos(a) * R, y = -100 + Math.sin(a) * R;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }, PR.red, { key: 'stop_oct', sb: 16, sy: 8, tex: 0.45 });

    // Inner white border
    ctx.save();
    ctx.strokeStyle = PR.creamL;
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i + 0.5) * Math.PI / 4, x = Math.cos(a) * (R - 14), y = -100 + Math.sin(a) * (R - 14);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    txt('KHOAN', 0, -130, 54, PR.creamL, { align: 'center', weight: 800 });
    txt('PHÁN XÉT!', 0, -68, 46, PR.creamL, { align: 'center', weight: 800 });

    // Cross on "kết"
    if (TT >= tKet) {
      prCross(230, -100, tKet, 60);
    }

    // Subtext pill in front
    pp(pR(-210, 115, 420, 52, 10), PR.paperW, { key: 'sub_tag', sb: 8, sy: 4 });
    txt('Đừng vội kết luận tính cách', 0, 142, 24, PR.char, { align: 'center', weight: 700 });
  });
}

// S5b: The key question
function m13QuestionCard(cx, cy, k, tHoi) {
  withT(cx, cy, 0, k, () => {
    // Card
    pp(pR(-400, -190, 800, 380, 22), PR.paperW, { key: 'qc_body', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-370, -165, 740, 52, 10), PR.navy, { key: 'qc_bar', shadow: false });
    txt('HÃY THỬ HỎI BẢN THÂN', 0, -138, 24, PR.creamL, { align: 'center', weight: 800 });

    txt('"CÓ HOÀN CẢNH NÀO', 0, -50, 42, PR.char, { align: 'center', weight: 800 });
    txt('MÌNH CHƯA BIẾT KHÔNG?"', 0, 12, 42, PR.redD, { align: 'center', weight: 800 });

    txt('Chuyển từ chỉ trích sang thấu cảm', 0, 75, 26, PR.green, { align: 'center', weight: 700 });

    // Bookmark ribbon at top-right
    pp(pG([[310, -190], [360, -190], [360, -90], [335, -110], [310, -90]]), PR.red, { key: 'rib_q', sb: 6, sy: 3 });

    // Stamp
    if (TT >= tHoi) {
      prStamp('CHẬM LẠI MỘT NHỊP', 0, 210, PR.green, tHoi, { rot: -0.02, size: 48, from: 1.3 });
    }
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Người khác đi làm muộn là thiếu trách nhiệm
  const tNh = VW('hook', 'nhiệm').t0;
  m13Room(TEAL, false);
  prStar(140, 420, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);

  // Hero is fully drawn at frame 0 (thumbnail)
  m13OfficeLate(CX, 800, 1, tNh);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tNh ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('NGƯỜI KHÁC: THIẾU TRÁCH NHIỆM', { kicker: KICK });
  prChips();
};

SCENES.hook2 = () => {   // S1b: Còn bạn đi muộn là do kẹt xe?
  const tKet = VW('hook', 'kẹt').t0;
  m13Room(TEAL2, true);
  prStar(150, 410, 30, PR.mustard);
  prStar(930, 430, 28, PR.orange);
  prClock(940, 420, 48, 8, 55, 'clk1b');

  m13TrafficJam(CX, 800, popS(E0 + 0.05), tKet);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tKet ? 'flat' : 'neutral', look: -30, key: 'b1b' });
  prSign('CÒN BẠN: DO KẸT XE?', { kicker: KICK });
  prChips();
};

SCENES.bias = () => {   // S2: Cán cân thiên lệch giữa tính cách và hoàn cảnh
  const tCao = VW('bias', 'cao').t0, tNhe = VW('bias', 'nhẹ').t0;
  m13Room(TEAL, false);
  prStar(140, 410, 28, PR.mustard);
  prStar(940, 410, 30, PR.pink);

  const tilt = lerp(0, -0.14, EZ.o3(ev(tCao, 0.6)));
  m13Scale(tilt, popS(E0 + 0.05), tCao, tNhe);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT >= tCao ? 'wow' : 'neutral', look: -25, key: 'b2' });
  prSign('ĐÁNH GIÁ QUÁ CAO TÍNH CÁCH', { kicker: KICK });
  prChips();
};

SCENES.bias2 = () => {   // S2b: Lỗi quy kết cơ bản (Fundamental Attribution Error)
  m13Room(TEAL2, true);
  prStar(150, 420, 32, PR.orange);
  prStar(930, 420, 28, PR.mustard);

  m13ConceptBoard(CX, 820, popS(E0 + 0.05));

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -20, key: 'b2b' });
  prSign('LỖI QUY KẾT CƠ BẢN', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // S3: Một hành động chưa đủ thông tin để hiểu nguyên nhân
  const tDu = VW('reality', 'đủ').t0;
  m13Room(TEAL, false);
  prStar(140, 420, 30, PR.pink);
  prClock(940, 420, 48, 5, 15, 'clk3');

  m13Iceberg(CX, 820, popS(E0 + 0.05), tDu);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'neutral', look: -30, key: 'b3' });
  prSign('CHƯA ĐỦ THÔNG TIN ĐỂ HIỂU', { kicker: KICK });
  prChips();
};

SCENES.example = () => {   // S4: Trả lời cộc lốc: tức giận hay mệt mỏi?
  const tAngry = VW('example', 'tức').t0, tTired = VW('example', 'mệt').t0;
  m13Room(TEAL2, true);
  prStar(140, 420, 30, PR.mustard);
  prStar(940, 420, 26, PR.orange);

  m13Phone(CX, 750, popS(E0 + 0.05), tAngry, tTired);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -25, key: 'b4' });
  prSign('TRẢ LỜI CỘC LỐC', { kicker: KICK });
  prChips();
};

SCENES.example2 = () => {   // S4b: Chưa quen phong cách giao tiếp
  const tQuen = VW('example', 'quen').t0;
  m13Room(TEAL, false);
  prStar(150, 410, 32, PR.pink);
  prStar(930, 410, 28, PR.mustard);

  m13CommStyles(CX, 800, popS(E0 + 0.05), tQuen);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tQuen ? 'happy' : 'neutral', look: -25, key: 'b4b' });
  prSign('CHƯA QUEN CÁCH GIAO TIẾP', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Trước khi kết luận về tính cách...
  const tKet = VW('reframe', 'kết').t0;
  m13Room(TEAL2, true);
  prStar(140, 420, 34, PR.mustard);
  prStar(940, 420, 28, PR.pink);

  m13StopSign(CX, 800, popS(E0 + 0.05), tKet);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'flat', look: -25, key: 'b5' });
  prSign('TRƯỚC KHI KẾT LUẬN', { kicker: KICK });
  prChips();
};

SCENES.reframe2 = () => {   // S5b: Có hoàn cảnh nào mình chưa biết không?
  const tHoi = VW('reframe', 'biết').t0;
  m13Room(TEAL, false);
  prStar(150, 420, 30, PR.mustard);
  prStar(930, 420, 28, PR.pink);

  m13QuestionCard(CX, 800, popS(E0 + 0.05), tHoi);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5b' });
  prSign('CÓ HOÀN CẢNH NÀO CHƯA BIẾT?', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn đã từng hiểu lầm ai đó vì chỉ nhìn một phần câu chuyện chưa?
  const tChua = VW('cta', 'chưa').t0;
  m13Room(TEAL2, true);
  prBunting(260);
  prStar(160, 430, 34, PR.mustard);
  prStar(920, 430, 28, PR.pink);

  prCommentBox(CX, 760, 'GÓC NHÌN CỦA BẠN', tChua, { hint: 'Kể trải nghiệm của bạn…' });

  // Two community comments below
  withT(CX, 1000, -0.015, popS(E0 + 0.3), () => {
    pp(pR(-340, -50, 680, 100, 20), PR.paperW, { key: 'cmt0', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-270, 0, 34, 34), PR.plum, { key: 'cav0', shadow: false });
    txt('Từng nghĩ đồng nghiệp lạnh lùng...', -210, 2, 26, PR.char, { base: 'middle', weight: 700 });
  });

  withT(CX, 1160, 0.015, popS(E0 + 0.5), () => {
    pp(pR(-340, -50, 680, 100, 20), PR.paperW, { key: 'cmt1', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(-270, 0, 34, 34), PR.orange, { key: 'cav1', shadow: false });
    txt('...hóa ra bạn ấy đang chịu áp lực lớn!', -210, 2, 26, PR.char, { base: 'middle', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN TỪNG HIỂU LẦM AI CHƯA?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['hook', 'Còn', 0, 'hook2'],
  ['bias', 'Hiện', 0, 'bias2'],
  ['example', 'hoặc', 0, 'example2'],
  ['reframe', 'có', 0, 'reframe2'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'nhiệm').t0 });
  cues.push({ k: 'pop', t: VW('hook', 'kẹt').t0 });
  cues.push({ k: 'tick', t: VW('bias', 'cao').t0 });
  cues.push({ k: 'pop', t: VW('bias', 'nhẹ').t0 });
  cues.push({ k: 'chime', t: VW('bias', 'lỗi').t0 });
  cues.push({ k: 'pop', t: VW('reality', 'đủ').t0 });
  cues.push({ k: 'pop', t: VW('example', 'tức').t0 });
  cues.push({ k: 'pop', t: VW('example', 'mệt').t0 });
  cues.push({ k: 'tick', t: VW('example', 'quen').t0 });
  cues.push({ k: 'thud', t: VW('reframe', 'kết').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'biết').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'hiểu').t0 });
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
