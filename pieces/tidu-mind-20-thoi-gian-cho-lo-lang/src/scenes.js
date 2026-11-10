// =====================================================================
//  TIDU MIND 20 — "Thử dành một khoảng thời gian riêng cho những lo lắng"
//  Kỹ thuật Scheduled Worry Time / Stimulus Control — CBT.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f / #355555.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · CÔNG CỤ TÂM LÝ';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};

// ---- Helpers (m20 = mind 20)

function m20Tag(str, x, y, fill, k = 1, rot = 0, size = 30) {
  const w = txtW(str, size) + 48, h = size * 2.1;
  withT(x, y, rot, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, 12), fill, { key: 'm20tag' + str, sb: 10, sy: 5, tex: 0.45 });
    txt(str, 0, size * 0.36, size, PR.creamL, { align: 'center', weight: 800 });
  });
}

function m20BookmarkIcon(x, y, s = 1, c = PR.creamL) {
  withT(x, y, 0, s, () => {
    pp(pG([[-14, -20], [14, -20], [14, 20], [0, 8], [-14, 20]]), c, { shadow: false, tex: false });
  });
}

// Hero 1: Work desk with laptop, drawer unit, lamp, coffee cup, and work items
function m20WorkDesk(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Under-desk drawer cabinet
    pp(pR(-180, 160, 360, 110, 8), PR.woodD, { key: 'dsk_cab', sb: 10, sy: 5, tex: 0.5 });
    pp(pR(-150, 180, 300, 32, 4), PR.wood, { key: 'dsk_drw1', shadow: false, tex: 0.4 });
    pp(pR(-30, 192, 60, 8, 2), PR.char, { shadow: false });
    pp(pR(-150, 224, 300, 32, 4), PR.wood, { key: 'dsk_drw2', shadow: false, tex: 0.4 });
    pp(pR(-30, 236, 60, 8, 2), PR.char, { shadow: false });

    // Desk mat surface
    pp(pR(-420, 140, 840, 30, 8), PR.wood, { key: 'dsk_mat', sb: 12, sy: 6, tex: 0.55 });

    // Laptop base & trackpad
    pp(pR(-270, 110, 540, 32, 6), PR.greyD, { key: 'lp_base', sb: 10, sy: 5, tex: 0.4 });
    pp(pR(-60, 116, 120, 18, 3), PR.char, { shadow: false, tex: false });

    // Laptop screen
    pp(pR(-240, -150, 480, 260, 10), PR.navy, { key: 'lp_screen', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-224, -134, 448, 228, 4), PR.paperW, { key: 'lp_disp', shadow: false, tex: 0.3 });

    // Screen contents: title & mock work lines
    txt('CÔNG VIỆC', 0, -90, 24, PR.navy, { align: 'center', weight: 800 });
    pp(pR(-180, -60, 160, 12, 3), PR.blue, { shadow: false, tex: false });
    pp(pR(-180, -38, 240, 8, 2), PR.grey, { shadow: false, tex: false });
    pp(pR(-180, -22, 200, 8, 2), PR.grey, { shadow: false, tex: false });
    pp(pR(-180, -6, 130, 8, 2), PR.grey, { shadow: false, tex: false });

    // Mini bar charts on screen
    [[-10, 20, 40, PR.blue], [35, 35, 55, PR.green], [80, 50, 70, PR.mustard]].forEach(([bx, by, bh, bc], i) => {
      pp(pR(bx, 68 - bh, 30, bh, 4), bc, { key: 'lp_bar' + i, shadow: false, tex: false });
    });

    // Coffee mug on right
    pp(pR(290, 60, 60, 80, 8), PR.cream, { key: 'dsk_cup', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(284, 52, 72, 12, 4), PR.creamL, { shadow: false, tex: false });
    pp(pE(354, 96, 16, 24), PR.cream, { key: 'dsk_cuph', shadow: false, tex: 0.4 });

    // Small desk lamp on left
    pp(pG([[-370, 140], [-310, 140], [-330, 120], [-350, 120]]), PR.woodD, { key: 'lmp_base', sb: 6, sy: 3 });
    pp(pR(-344, 20, 8, 100, 3), PR.greyD, { shadow: false });
    pp(pG([[-380, 30], [-300, 30], [-320, -10], [-360, -10]]), PR.orange, { key: 'lmp_shade', sb: 8, sy: 4, tex: 0.5 });
  });
}

// Hero 2: Large desk clock timer for 10-15 min worry time
function m20DeskTimer(cx, cy, showWedge) {
  withT(cx, cy, 0, 1, () => {
    // Desk table support
    pp(pR(-300, 215, 600, 24, 6), PR.wood, { key: 'tmr_shelf', sb: 10, sy: 5, tex: 0.5 });

    // Clock stand base
    pp(pR(-150, 195, 300, 32, 8), PR.woodD, { key: 'tmr_base', sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-85, 115, 24, 95, 4), PR.greyD, { shadow: false });
    pp(pR(61, 115, 24, 95, 4), PR.greyD, { shadow: false });

    // Outer dial bezel (radius 188)
    pp(pE(0, 0, 188, 188), PR.wood, { key: 'tmr_bezel', sb: 16, sy: 8, tex: 0.5 });
    pp(pE(0, 0, 168, 168), PR.greyD, { shadow: false });
    pp(pE(0, 0, 154, 154), PR.paperW, { key: 'tmr_face', shadow: false, tex: 0.35 });

    // 15-minute quadrant wedge
    if (showWedge) {
      ctx.save();
      ctx.fillStyle = 'rgba(230, 110, 60, 0.45)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 144, -Math.PI / 2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Tick marks for 12, 3, 6, 9
    [[0, -135, 6, 20], [135, 0, 20, 6], [0, 135, 6, 20], [-135, 0, 20, 6]].forEach(([tx, ty, tw, th]) => {
      pp(pR(tx - tw / 2, ty - th / 2, tw, th, 2), PR.char, { shadow: false, tex: false });
    });

    // Clock hands: 12:00 hour hand, 12:15 minute hand
    ctx.save();
    ctx.strokeStyle = PR.char; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -98); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(104, 0); ctx.stroke();
    ctx.restore();
    pp(pE(0, 0, 15, 15), PR.red, { key: 'tmr_pin', shadow: false });
  });
}

// Hero 3: Worry Review Docket / Clipboard
function m20WorryDocket(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Board base
    pp(pR(-380, -320, 760, 650, 18), PR.wood, { key: 'dok_board', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-120, -348, 240, 50, 8), PR.greyD, { key: 'dok_clip', sb: 8, sy: 4 });

    // Paper sheet
    pp(pR(-350, -300, 700, 600, 10), PR.paperW, { key: 'dok_paper', sb: 12, sy: 6, tex: 0.4 });

    // Top banner
    pp(pR(-310, -255, 620, 68, 12), PR.navy, { key: 'dok_ban', sb: 8, sy: 4, tex: 0.4 });
    txt('XEM XÉT CÁC MỐI LO', 0, -212, 34, PR.creamL, { align: 'center', weight: 800 });

    // Review checklist items
    const items = [
      ['Dành riêng thời gian để xem lại các lo lắng', PR.blue],
      ['Quan sát từng mối lo một cách bình tĩnh', PR.green],
      ['Không để nỗi lo làm gián đoạn công việc', PR.mustard],
    ];
    items.forEach(([desc, c], i) => {
      const iy = -130 + i * 120;
      pp(pR(-310, iy, 620, 96, 12), '#f6faf6', { key: 'dok_row' + i, sb: 8, sy: 4, tex: 0.3 });
      pp(pE(-265, iy + 48, 26, 26), c, { key: 'dok_dot' + i, sb: 4, sy: 2 });
      txt(String(i + 1), -265, iy + 58, 26, PR.creamL, { align: 'center', weight: 800 });
      txt(desc, -220, iy + 58, fitSize(desc, 500, 26), PR.char, { weight: 700 });
    });
  });
}

// Hero 4: The Worry Box (Slot & Box)
function m20WorryBox(cx, cy, notePop = 0, dropFrac = 0) {
  withT(cx, cy, 0, 1, () => {
    // Intrusive thought note above box
    const noteY = -230 + dropFrac * 170;
    const noteScale = (1 - dropFrac * 0.3) * notePop;
    const noteAlpha = Math.max(0, 1 - dropFrac * 0.9) * (notePop > 0.05 ? 1 : 0);
    if (noteAlpha > 0.05 && noteScale > 0.05) {
      ctx.save();
      ctx.globalAlpha = noteAlpha;
      withT(0, noteY, -0.02, noteScale, () => {
        pp(pR(-270, -50, 540, 100, 12), '#fff6e6', { key: 'bx_flynote', sb: 10, sy: 5, tex: 0.35 });
        txt('SUY NGHĨ XUẤT HIỆN BẤT CHỢT', 0, -10, 24, PR.greyD, { align: 'center', weight: 800 });
        txt('Ghi nhanh lại để xem sau', 0, 26, 28, PR.navy, { align: 'center', weight: 800 });
      });
      ctx.restore();
    }

    // Box body
    pp(pR(-330, -50, 660, 320, 18), PR.wood, { key: 'wbox_body', sb: 18, sy: 9, tex: 0.55 });
    // Upper lid rim with paper insertion slot
    pp(pR(-350, -85, 700, 50, 14), PR.woodD, { key: 'wbox_lid', sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-230, -75, 460, 18, 5), PR.char, { shadow: false, tex: false });

    // Existing notes inside box peaking out
    [[-130, -0.08], [-40, 0.04], [50, -0.05], [140, 0.07]].forEach(([px, rot], i) => {
      withT(px, -115 + (i % 2 ? 14 : 0), rot, 1, () => {
        pp(pR(-40, -40, 80, 80, 6), '#fff6e6', { key: 'wbox_peek' + i, sb: 6, sy: 3, tex: 0.3 });
        for (let r = 0; r < 3; r++) pp(pR(-28, -22 + r * 18, 56, 5, 2), 'rgba(40,50,70,0.25)', { shadow: false, tex: false });
      });
    });

    // Front label plaque
    pp(pR(-230, 40, 460, 120, 14), PR.paperW, { key: 'wbox_plaque', sb: 12, sy: 6, tex: 0.4 });
    txt('HỘP NỖI LO', 0, 92, 38, PR.navy, { align: 'center', weight: 800 });
    txt('Ghi lại để xem sau', 0, 134, 24, PR.char, { align: 'center', weight: 700 });
  });
}

// Hero 5: Decision evaluation board
function m20DecisionBoard(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Clipboard base
    pp(pR(-380, -320, 760, 650, 18), PR.wood, { key: 'dec_board', sb: 18, sy: 9, tex: 0.55 });
    pp(pR(-120, -348, 240, 50, 8), PR.greyD, { key: 'dec_clip', sb: 8, sy: 4 });
    // Paper sheet
    pp(pR(-350, -300, 700, 600, 10), PR.paperW, { key: 'dec_paper', sb: 12, sy: 6, tex: 0.4 });
    txt('ĐẾN THỜI GIAN ĐÃ CHỌN', 0, -250, 28, PR.greyD, { align: 'center', weight: 800 });

    // Question box
    pp(pR(-320, -215, 640, 134, 14), PR.navy, { key: 'dec_qbox', sb: 10, sy: 5, tex: 0.4 });
    txt('CÓ THỂ GIẢI QUYẾT BẰNG', 0, -168, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('HÀNH ĐỘNG CỤ THỂ KHÔNG?', 0, -122, 34, PR.sky, { align: 'center', weight: 800 });

    // Branch 1: CÓ (local x = -190 -> screen x = 350)
    pp(pR(-320, -45, 300, 290, 14), '#f0f8f0', { key: 'dec_yes_card', sb: 10, sy: 5 });
    pp(pR(-320, -45, 300, 62, 14), PR.green, { shadow: false });
    txt('CÓ', -170, -1, 32, PR.creamL, { align: 'center', weight: 800 });
    txt('Lập một kế hoạch', -170, 80, 24, PR.char, { align: 'center', weight: 800 });
    txt('hành động cụ thể', -170, 118, 22, PR.greyD, { align: 'center', weight: 700 });

    // Branch 2: CHƯA (local x = 190 -> screen x = 730)
    pp(pR(20, -45, 300, 290, 14), '#f4f8fc', { key: 'dec_no_card', sb: 10, sy: 5 });
    pp(pR(20, -45, 300, 62, 14), PR.blue, { shadow: false });
    txt('CHƯA', 170, -1, 32, PR.creamL, { align: 'center', weight: 800 });
    txt('Ghi nhận sự không', 170, 80, 24, PR.char, { align: 'center', weight: 800 });
    txt('chắc chắn ấy', 170, 118, 24, PR.char, { align: 'center', weight: 800 });
  });
}

// Hero 6: Action Plan Clipboard (Sentence 2)
function m20PlanHero(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    // Card background
    pp(pR(-380, -320, 760, 640, 18), PR.paperW, { key: 'plan_bg', sb: 18, sy: 9, tex: 0.45 });
    // Top banner
    pp(pR(-380, -320, 760, 88, 18), PR.green, { shadow: false, tex: 0.4 });
    txt('NẾU CÓ: LẬP KẾ HOẠCH', 0, -262, 36, PR.creamL, { align: 'center', weight: 800 });

    // Checklist rows
    const steps = [
      ['Bước 1:', 'Xác định việc cụ thể cần làm'],
      ['Bước 2:', 'Sắp xếp thời gian thực hiện'],
      ['Bước 3:', 'Bắt đầu với một bước nhỏ'],
    ];
    steps.forEach(([st, desc], i) => {
      const sy = -170 + i * 135;
      pp(pR(-330, sy, 660, 105, 14), '#f4f9f4', { key: 'plan_step' + i, sb: 8, sy: 4, tex: 0.3 });
      pp(pE(-275, sy + 52, 26, 26), PR.green, { key: 'plan_cir' + i, sb: 6, sy: 3 });
      txt(String(i + 1), -275, sy + 62, 26, PR.creamL, { align: 'center', weight: 800 });
      txt(st, -230, sy + 48, 24, PR.greenK, { weight: 800 });
      txt(desc, -230, sy + 80, 24, PR.char, { weight: 700 });
    });
  });
}

// Hero 7: Mindful Acceptance Frame (Sentence 3)
function m20AcceptanceHero(cx, cy) {
  withT(cx, cy, 0, 1, () => {
    pp(pR(-380, -320, 760, 640, 18), PR.paperW, { key: 'unc_bg', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-380, -320, 760, 88, 18), PR.blue, { shadow: false, tex: 0.4 });
    txt('NẾU CHƯA: GHI NHẬN', 0, -262, 34, PR.creamL, { align: 'center', weight: 800 });

    // Concentric calm circles (radii: 105, 70, 38)
    pp(pE(0, -60, 105, 105), '#eef5fa', { shadow: false });
    pp(pE(0, -60, 70, 70), '#dcecf5', { shadow: false });
    pp(pE(0, -60, 38, 38), PR.blue, { key: 'unc_dot', sb: 8, sy: 4 });
    txt('CHẤP NHẬN', 0, -53, 15, PR.creamL, { align: 'center', weight: 800 });

    // Guidance text card
    pp(pR(-330, 80, 660, 150, 14), PR.creamL, { key: 'unc_guid', sb: 8, sy: 4, tex: 0.35 });
    txt('Ghi nhận sự không chắc chắn ấy', 0, 134, 28, PR.navy, { align: 'center', weight: 800 });
    txt('Cho phép tương lai có những điều chưa rõ ràng', 0, 180, 24, PR.char, { align: 'center', weight: 700 });
  });
}

// Hero 8: Boundary Target Card (Scene 8)
function m20BoundaryHero(cx, cy, tQuan) {
  withT(cx, cy, 0, 1, () => {
    pp(pR(-380, -320, 760, 640, 18), PR.paperW, { key: 'bnd_bg', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-380, -320, 760, 88, 18), PR.green, { shadow: false, tex: 0.4 });
    txt('QUẢN LÝ SỰ CHÚ Ý', 0, -262, 34, PR.creamL, { align: 'center', weight: 800 });

    // Target rings at (0, -65)
    pp(pE(0, -65, 105, 105), PR.creamL, { shadow: false });
    pp(pE(0, -65, 72, 72), '#e2f2e2', { shadow: false });
    pp(pE(0, -65, 40, 40), PR.green, { key: 'bnd_tar', sb: 6, sy: 3 });

    // Tick badge on attention target
    prCheck(0, -65, tQuan, 42);

    // Guidance card
    pp(pR(-330, 80, 660, 150, 14), '#f4f9f4', { key: 'bnd_box', sb: 8, sy: 4, tex: 0.35 });
    txt('Huấn luyện tâm trí và sự chú ý', 0, 134, 28, PR.navy, { align: 'center', weight: 800 });
    txt('Đặt ranh giới thời gian rõ ràng cho nỗi lo', 0, 180, 24, PR.char, { align: 'center', weight: 700 });
  });
}

// Hero 9: Not Magic Card (Scene 9)
function m20NotMagicHero(cx, cy, tBien) {
  withT(cx, cy, 0, 1, () => {
    pp(pR(-380, -320, 760, 640, 18), PR.paperW, { key: 'nmg_bg', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-380, -320, 760, 88, 18), PR.red, { shadow: false, tex: 0.4 });
    txt('KHÔNG PHẢI PHƯƠNG PHÁP', 0, -262, 32, PR.creamL, { align: 'center', weight: 800 });

    // Cloud puff at (0, -65)
    pp(pE(-45, -65, 54, 44), PR.grey, { shadow: false });
    pp(pE(45, -65, 50, 40), PR.grey, { shadow: false });
    pp(pE(0, -82, 60, 48), PR.grey, { shadow: false });
    pp(pE(0, -52, 78, 42), PR.grey, { shadow: false });

    // Red cross on disappearing cloud
    prCross(0, -65, tBien, 44);

    // Guidance card
    pp(pR(-330, 80, 660, 150, 14), '#fbf2f2', { key: 'nmg_box', sb: 8, sy: 4, tex: 0.35 });
    txt('Không đảm bảo mọi lo lắng sẽ biến mất', 0, 134, 28, PR.redD, { align: 'center', weight: 800 });
    txt('Mục tiêu là không để âu lo chi phối cả ngày', 0, 180, 24, PR.char, { align: 'center', weight: 700 });
  });
}

// Hero 10: Save Video Action Card (CTA)
function m20SaveCard(cx, cy, tLuu) {
  withT(cx, cy, 0, 1, () => {
    pp(pR(-400, -340, 800, 680, 18), PR.paperW, { key: 'cta_card', sb: 18, sy: 9, tex: 0.45 });

    // Corner ribbon: bookmark
    pp(pG([[250, -340], [330, -340], [330, -190], [290, -225], [250, -190]]), PR.red, { key: 'cta_ribbon', sb: 8, sy: 4, tex: 0.5 });

    txt('BÀI TẬP TÂM LÝ', -340, -260, 26, PR.greyD, { weight: 800 });
    txt('KHOẢNG THỜI GIAN CHO LO LẮNG', -340, -212, fitSize('KHOẢNG THỜI GIAN CHO LO LẮNG', 520, 36), PR.navy, { weight: 800 });
    pp(pR(-340, -180, 680, 4, 2), PR.navy, { shadow: false, tex: false });

    // 3 summary steps
    const steps = [
      '1. Đặt khoảng thời gian ngắn (10 – 15 phút)',
      '2. Ngoài giờ: ghi lại vào sổ hoặc hộp để xem sau',
      '3. Đến giờ: phân loại hành động hoặc chấp nhận',
    ];
    steps.forEach((s, i) => {
      txt(s, -340, -110 + i * 85, fitSize(s, 640, 26), PR.char, { weight: 700 });
    });

    // Save action button
    withT(0, 195, 0, popS(tLuu), () => {
      pp(pR(-270, -45, 540, 90, 16), PR.redD, { key: 'btn_save', sb: 14, sy: 7, tex: 0.4 });
      m20BookmarkIcon(-160, 0, 1.25, PR.creamL);
      txt('LƯU VIDEO NÀY', 24, 12, 34, PR.creamL, { align: 'center', weight: 800 });
    });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Nỗi lo chen vào công việc cả ngày
  const tLo = VW('hook', 'lo').t0, tCach = VW('hook', 'cách').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(920, 420, 26, PR.pink);

  // Hero is fully present at t=0 (frame 0 thumbnail ready)
  m20WorkDesk(CX, 820);

  // Intrusive worry notes popping onto workspace
  const notes = [
    ['LO LẮNG!', CX - 240, 680, -0.1, PR.orange, tLo],
    ['LỠ CÓ CHUYỆN GÌ?', CX + 220, 660, 0.1, PR.red, VW('hook', 'cứ').t0],
    ['CÒN VIỆC NÀY?', CX, 560, 0.04, PR.mustard, VW('hook', 'vào').t0],
  ];
  notes.forEach(([msg, nx, ny, rot, c, t], i) => {
    const k = popS(t);
    if (k <= 0.01) return;
    withT(nx, ny, rot, k, () => {
      pp(pR(-120, -50, 240, 100, 12), '#fff0e6', { key: 'hk_note' + i, sb: 10, sy: 5, tex: 0.35 });
      txt(msg, 0, 8, fitSize(msg, 210, 24), c, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  prStamp('THỬ CÁCH NÀY', CX, 1180, PR.green, tCach, { rot: -0.04, size: 52, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tCach ? 'wow' : 'flat', look: -30, key: 'b1' });
  prSign('LO LẮNG CHEN VÀO CẢ NGÀY?', { kicker: KICK });
  prChips();
};

SCENES.worrytime = () => {   // S2: Đặt một khoảng thời gian ngắn, khoảng 10-15 phút
  const t10 = VW('worrytime', 'mười').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Clock is present at frame 0; wedge highlights on "mười đến mười lăm phút"
  m20DeskTimer(CX, 760, TT >= t10);

  // Pill badge below clock
  m20Tag('10 – 15 PHÚT', CX, 1080, PR.navy, 1, 0, 36);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'happy', look: -20, key: 'b2' });
  prSign('ĐẶT KHOẢNG THỜI GIAN NGẮN', { kicker: KICK });
  prChips();
};

SCENES.worryreview = () => {   // S3 (SPLIT): Để xem xét các mối lo của mình
  const tXet = VW('worrytime', 'xét').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 390, 30, PR.pink);
  prStar(920, 410, 28, PR.mustard);

  m20WorryDocket(CX, 800);
  prStamp('XEM XÉT MỐI LO', CX, 1180, PR.green, tXet, { rot: -0.03, size: 50, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -25, key: 'b2b' });
  prSign('XEM XÉT CÁC MỐI LO', { kicker: KICK });
  prChips();
};

SCENES.box = () => {   // S4: Xuất hiện ngoài khoảng đó -> Ghi lại để xem sau
  const tNgoai = VW('box', 'ngoài').t0, tGhi = VW('box', 'ghi').t0, tSau = VW('box', 'sau').t0;
  const dropU = clamp((TT - tGhi) / 0.5);
  prWall(TEAL2, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(160, 400, 30, PR.pink);
  prStar(920, 390, 26, PR.mustard);

  // Box hero present at frame 0; note pops on "ngoài khoảng đó" and drops on "ghi lại"
  m20WorryBox(CX, 860, popS(tNgoai), EZ.io(dropU));

  prStamp('GHI LẠI XEM SAU', CX, 1180, PR.green, tSau, { rot: 0.04, size: 50, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tGhi ? 'happy' : 'neutral', look: -30, key: 'b3' });
  prSign('GHI LẠI ĐỂ XEM SAU', { kicker: KICK });
  prChips();
};

SCENES.evaluate = () => {   // S5: Đến thời gian đã chọn: Tự hỏi có giải quyết bằng hành động không?
  const tHoi = VW('evaluate', 'hỏi').t0;
  prWall(TEAL, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 390, 32, PR.mustard);
  prStar(920, 410, 26, PR.orange);

  // Decision board is present at frame 0
  m20DecisionBoard(CX, 800);
  prStamp('TỰ HỎI', CX, 1180, PR.green, tHoi, { rot: -0.04, size: 50, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'neutral', look: -25, key: 'b4' });
  prSign('ĐẾN GIỜ ĐÃ CHỌN: TỰ HỎI', { kicker: KICK });
  prChips();
};

SCENES.plan = () => {   // S6 (SPLIT): Nếu có, hãy lập một kế hoạch
  const tKe = VW('evaluate', 'kế').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 400, 30, PR.pink);
  prStar(920, 390, 28, PR.mustard);

  m20PlanHero(CX, 800);
  prStamp('LẬP KẾ HOẠCH', CX, 1180, PR.green, tKe, { rot: -0.03, size: 52, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b4b' });
  prSign('NẾU CÓ: LẬP KẾ HOẠCH', { kicker: KICK });
  prChips();
};

SCENES.uncertainty = () => {   // S7 (SPLIT): Nếu chưa, hãy ghi nhận sự không chắc chắn ấy
  const tChac = VW('evaluate', 'chắc').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 380, 32, PR.mustard);
  prStar(920, 420, 28, PR.orange);

  m20AcceptanceHero(CX, 800);
  prStamp('GHI NHẬN', CX, 1180, PR.blue, tChac, { rot: 0.04, size: 52, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'happy', look: -25, key: 'b4c' });
  prSign('NẾU CHƯA: GHI NHẬN', { kicker: KICK });
  prChips();
};

SCENES.boundary = () => {   // S8: Đây là một cách quản lý sự chú ý
  const tQuan = VW('boundary', 'quản').t0;
  prWall(TEAL2, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 400, 28, PR.pink);

  m20BoundaryHero(CX, 800, tQuan);
  prStamp('QUẢN LÝ CHÚ Ý', CX, 1180, PR.green, tQuan, { rot: -0.03, size: 50, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'happy', look: -20, key: 'b5' });
  prSign('QUẢN LÝ SỰ CHÚ Ý', { kicker: KICK });
  prChips();
};

SCENES.notmagic = () => {   // S9 (SPLIT): không phải phương pháp đảm bảo mọi lo lắng sẽ biến mất
  const tBien = VW('boundary', 'biến').t0;
  prWall(TEAL, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 400, 30, PR.pink);
  prStar(920, 390, 28, PR.mustard);

  m20NotMagicHero(CX, 800, tBien);
  prStamp('KHÔNG PHẢI BIẾN MẤT', CX, 1180, PR.red, tBien, { rot: 0.04, size: 48, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'neutral', look: -25, key: 'b5b' });
  prSign('KHÔNG PHẢI BIẾN MẤT HOÀN TOÀN', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S10: Lưu video để thử bài tập này
  const tLuu = VW('cta', 'Lưu').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(180, 400, 34, PR.mustard);
  prStar(900, 380, 28, PR.pink);

  // Save Card Hero
  m20SaveCard(CX, 820, tLuu);
  prStamp('LƯU VIDEO', CX, 1180, PR.green, tLuu, { rot: -0.03, size: 52, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('LƯU LẠI BÀI TẬP NÀY', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['worrytime', 'để', 0, 'worryreview'],
  ['evaluate', 'Nếu', 0, 'plan'],
  ['evaluate', 'Nếu', 1, 'uncertainty'],
  ['boundary', 'không', 0, 'notmagic'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'lo').t0 });
  cues.push({ k: 'chime', t: VW('hook', 'cách').t0 });
  cues.push({ k: 'tick', t: VW('worrytime', 'mười').t0 });
  cues.push({ k: 'pop', t: VW('worrytime', 'xét').t0 });
  cues.push({ k: 'pop', t: VW('box', 'ngoài').t0 });
  cues.push({ k: 'thud', t: VW('box', 'sau').t0 });
  cues.push({ k: 'pop', t: VW('evaluate', 'hỏi').t0 });
  cues.push({ k: 'chime', t: VW('evaluate', 'kế').t0 });
  cues.push({ k: 'tick', t: VW('evaluate', 'chắc').t0 });
  cues.push({ k: 'tick', t: VW('boundary', 'quản').t0 });
  cues.push({ k: 'thud', t: VW('boundary', 'biến').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'Lưu').t0 });
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
