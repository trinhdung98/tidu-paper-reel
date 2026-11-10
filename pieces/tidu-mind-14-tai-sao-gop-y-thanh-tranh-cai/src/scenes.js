// =====================================================================
//  TIDU MIND 14 — "Tại sao góp ý dễ biến thành tranh cãi?"
//  Giao tiếp bất bạo động (NVC) & Mô hình phản hồi SBI (Situation-Behavior-Impact).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · GIAO TIẾP';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};

// ---- Piece helpers (m14 prefix to avoid kit clashes)
function m14Room(c, studs) {
  prWall(c, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs });
  if (!studs) pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb', sb: 10, sy: 5, tex: 0.6 });
}

function m14Tag(str, x, y, fill, k = 1, rot = 0, size = 26) {
  if (k <= 0.01) return;
  const w = txtW(str, size) + 40, h = size * 2;
  withT(x, y, rot, k, () => {
    pp(pR(-w / 2, -h / 2, w, h, 10), fill, { key: 'tag' + str + x, sb: 10, sy: 5, tex: 0.45 });
    txt(str, 0, size * 0.36, size, PR.creamL, { align: 'center', weight: 800 });
  });
}

function m14Shield(cx, cy, s = 1, key = 'shld') {
  if (s <= 0.01) return;
  withT(cx, cy, 0, s, () => {
    pp(pG([[-80, -110], [80, -110], [80, 20], [0, 120], [-80, 20]]), PR.blue, { key: key + 'b', sb: 14, sy: 7, tex: 0.45 });
    pp(pG([[-64, -94], [64, -94], [64, 14], [0, 102], [-64, 14]]), '#6292c4', { shadow: false, tex: 0.3 });
    pp(pR(-12, -70, 24, 126, 6), PR.creamL, { shadow: false });
    pp(pR(-46, -24, 92, 24, 6), PR.creamL, { shadow: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Định giúp người khác nhưng kết thúc bằng cãi vã
  const tNh = VW('hook', 'nhưng').t0, tCai = VW('hook', 'cãi').t0, tVa = VW('hook', 'vã').t0;
  m14Room(TEAL, false);
  prClock(930, 430, 56, 2, 15, 'clk1');
  prStar(140, 420, 32, PR.mustard);
  prStar(110, 1280, 24, PR.pink);

  // Big discussion hero card (fully drawn at frame 0 for thumbnail)
  withT(CX, 810, 0, 1, () => {
    pp(pR(-410, -290, 820, 580, 20), PR.paperW, { key: 'hk_board', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-410, -290, 820, 72, 20), PR.navy, { key: 'hk_head', shadow: false, tex: 0.4 });
    txt('CUỘC NÓI CHUYỆN GÓP Ý', 0, -244, 34, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Initial good intent (at t = 0)
    pp(pR(-370, -190, 350, 210, 14), '#eaf5ea', { key: 'hk_intent', sb: 10, sy: 5, tex: 0.4 });
    pp(pR(-370, -190, 350, 44, 14), PR.green, { key: 'hk_int_bar', shadow: false });
    txt('Ý ĐỊNH BAN ĐẦU', -195, -162, 22, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Muốn giúp', -195, -106, 32, PR.char, { align: 'center', base: 'middle', weight: 800 });
    txt('tốt hơn', -195, -64, 34, PR.green, { align: 'center', base: 'middle', weight: 800 });

    // Right side: open listening at t=0, turns to argument result on "nhưng"
    const kNh = popS(tNh);
    const rFill = kNh > 0.01 ? '#ffebee' : PR.creamL;
    const rBar = kNh > 0.01 ? PR.red : PR.greyD;
    const rTitle = kNh > 0.01 ? 'KẾT QUẢ THỰC TẾ' : 'ĐỐI PHƯƠNG';
    pp(pR(20, -190, 350, 210, 14), rFill, { key: 'hk_res', sb: 10, sy: 5, tex: 0.4 });
    pp(pR(20, -190, 350, 44, 14), rBar, { key: 'hk_res_bar', shadow: false });
    txt(rTitle, 195, -162, 22, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    if (kNh <= 0.01) {
      txt('Lắng nghe', 195, -84, 30, PR.greyD, { align: 'center', base: 'middle', weight: 700 });
    } else {
      txt('Một cuộc', 195, -106, 32, PR.char, { align: 'center', base: 'middle', weight: 800 });
      txt('cãi vã!', 195, -64, 36, PR.redD, { align: 'center', base: 'middle', weight: 800 });
    }
  });

  // Defensive shield erected in lower half on "cãi" (does NOT cover any text)
  const kShield = popS(tCai);
  if (kShield > 0.01) {
    m14Shield(CX, 930, kShield * 0.85, 'hk_shld');
    m14Tag('DỰNG KHIÊN PHÒNG THỦ', CX, 1020, PR.navy, kShield, 0, 22);
  }

  // Stamp at end of line
  prStamp('TRANH CÃI', CX, 1160, PR.red, tVa, { rot: -0.04, size: 52, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tCai ? 'wow' : 'neutral', look: -30, key: 'b1' });
  prSign('TẠI SAO BIẾN THÀNH TRANH CÃI?', { kicker: KICK });
  prChips();
};

SCENES.cause = () => {   // S2: Vấn đề không chỉ ở nội dung, mà ở cách truyền đạt
  const tNoiDung = VW('cause', 'dung').t0, tCach = VW('cause', 'cách').t0, tTruyen = VW('cause', 'đạt').t0;
  m14Room(TEAL2, true);
  prStar(140, 420, 30, PR.mustard);
  prStar(940, 430, 26, PR.orange);

  // Two-panel comparison present at cut (symmetric pair at 350 and 730)
  // Left card: NỘI DUNG GÓP Ý
  withT(350, 830, -0.015, 1, () => {
    pp(pR(-170, -250, 340, 500, 18), PR.paperW, { key: 'cs_lcard', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -250, 340, 64, 18), PR.navy, { key: 'cs_lbar', shadow: false });
    txt('NỘI DUNG', 0, -210, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Document paper icon
    pp(pR(-90, -130, 180, 210, 8), PR.creamL, { key: 'cs_doc', sb: 8, sy: 4, tex: 0.4 });
    for (let i = 0; i < 4; i++) pp(pR(-66, -95 + i * 40, i === 3 ? 80 : 132, 10, 3), 'rgba(30,45,70,0.3)', { shadow: false, tex: false });

    txt('Ý định tốt', 0, 130, 28, PR.char, { align: 'center', weight: 700 });
    m14Tag('CHƯA ĐỦ', 0, 195, PR.greyD, popS(tNoiDung), 0, 24);
  });

  // Right card: CÁCH TRUYỀN ĐẠT
  withT(730, 830, 0.015, 1, () => {
    pp(pR(-170, -250, 340, 500, 18), PR.paperW, { key: 'cs_rcard', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -250, 340, 64, 18), PR.orange, { key: 'cs_rbar', shadow: false });
    txt('CÁCH NÓI', 0, -210, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Megaphone / speaker icon
    withT(0, -25, 0, 1, () => {
      pp(pG([[-50, -20], [-10, -20], [50, -65], [50, 65], [-10, 20], [-50, 20]]), PR.mustard, { key: 'cs_horn', sb: 10, sy: 5, tex: 0.45 });
      pp(pR(-64, -22, 18, 44, 4), PR.char, { key: 'cs_hback', shadow: false });
      // Sound waves
      ctx.save(); ctx.strokeStyle = PR.orange; ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(58, 0, 28, -0.6, 0.6); ctx.stroke();
      ctx.beginPath(); ctx.arc(68, 0, 50, -0.6, 0.6); ctx.stroke();
      ctx.restore();
    });

    txt('Cách truyền đạt', 0, 130, 28, PR.char, { align: 'center', weight: 700 });
    m14Tag('QUYẾT ĐỊNH', 0, 195, PR.orange, popS(tCach), 0.02, 24);
  });

  prStamp('CÁCH TRUYỀN ĐẠT', CX, 1180, PR.mustard, tTruyen, { rot: -0.02, size: 44, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: TT >= tTruyen ? 'wow' : 'neutral', look: -25, key: 'b2' });
  prSign('NỘI DUNG HAY CÁCH NÓI?', { kicker: KICK });
  prChips();
};

SCENES.cause2 = () => {   // S2b (SPLIT): So sánh hai câu này
  const tHai = VW('cause', 'hai').t0;
  m14Room(TEAL, false);
  prClock(930, 430, 56, 2, 30, 'clk2b');
  prStar(140, 420, 32, PR.pink);

  // Two comparison podiums side-by-side present at cut (midpoint 540)
  withT(350, 820, -0.02, 1, () => {
    pp(pR(-170, -220, 340, 440, 18), '#ffebee', { key: 'c2_p1', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -220, 340, 58, 18), PR.red, { shadow: false });
    txt('CÂU THỨ NHẤT', 0, -184, 26, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('“ ? ”', 0, -20, 84, PR.redD, { align: 'center', base: 'middle', weight: 800 });
    txt('Đánh giá con người', 0, 120, 26, PR.char, { align: 'center', weight: 700 });
  });

  withT(730, 820, 0.02, 1, () => {
    pp(pR(-170, -220, 340, 440, 18), '#eaf5ea', { key: 'c2_p2', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -220, 340, 58, 18), PR.green, { shadow: false });
    txt('CÂU THỨ HAI', 0, -184, 26, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('“ ? ”', 0, -20, 84, PR.green, { align: 'center', base: 'middle', weight: 800 });
    txt('Nêu hành vi cụ thể', 0, 120, 26, PR.char, { align: 'center', weight: 700 });
  });

  // VS badge in the center
  withT(CX, 820, 0, 1, () => {
    pp(pE(0, 0, 50, 50), PR.navy, { key: 'vs_badge', sb: 10, sy: 5, tex: 0.4 });
    txt('VS', 0, 4, 34, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  prStamp('SO SÁNH 2 CÂU', CX, 1160, PR.blue, tHai, { rot: -0.03, size: 48, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b2b' });
  prSign('SO SÁNH HAI CÂU NÓI', { kicker: KICK });
  prChips();
};

SCENES.compare = () => {   // S3: Câu 1: "Bạn lúc nào cũng thiếu trách nhiệm."
  const tThieu = VW('compare', 'thiếu').t0, tNhiem = VW('compare', 'nhiệm').t0;
  m14Room(TEAL2, true);
  prStar(140, 420, 30, PR.mustard);
  prStar(940, 420, 28, PR.pink);

  // Big warning card present at cut CX=540
  withT(CX, 810, -0.015, 1, () => {
    pp(pR(-410, -250, 820, 500, 20), '#fff0f0', { key: 'cmp1_card', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-410, -250, 820, 68, 20), PR.red, { key: 'cmp1_head', shadow: false });
    txt('CÂU 1: ĐÁNH GIÁ CON NGƯỜI', 0, -208, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Exact quoted sentence from narration
    const qStr = '"Bạn lúc nào cũng thiếu trách nhiệm."';
    txt(qStr, 0, -80, fitSize(qStr, 740, 36), PR.char, { align: 'center', weight: 800 });

    // Identity label / tag pinned
    pp(pR(-280, 20, 560, 110, 12), PR.paperW, { key: 'tag_box', sb: 8, sy: 4, tex: 0.4 });
    txt('GẮN NHÃN TỔNG QUÁT', 0, 55, 24, PR.greyD, { align: 'center', weight: 800 });
    txt('Từ cực đoan: "lúc nào cũng"', 0, 95, 28, PR.redD, { align: 'center', weight: 800 });
  });

  prCross(880, 580, tThieu, 48);
  prStamp('CÔNG KÍCH BẢN THÂN', CX, 1160, PR.red, tNhiem, { rot: -0.04, size: 44, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b3' });
  prSign('CÂU 1: GẮN NHÃN BẢN THÂN', { kicker: KICK });
  prChips();
};

SCENES.compare2 = () => {   // S3b (SPLIT): Câu 2: "Và: hai lần gần đây bạn gửi báo cáo trễ, khiến nhóm phải đợi."
  const tTre = VW('compare', 'trễ').t0, tDoi = VW('compare', 'đợi').t0;
  m14Room(TEAL, false);
  prClock(930, 430, 56, 3, 0, 'clk3b');
  prStar(140, 420, 30, PR.mustard);

  // Big factual clipboard present at cut CX=540
  withT(CX, 810, 0.015, 1, () => {
    pp(pR(-410, -260, 820, 520, 20), PR.paperW, { key: 'cmp2_card', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-410, -260, 820, 68, 20), PR.green, { key: 'cmp2_head', shadow: false });
    txt('CÂU 2: HÀNH VI & TÁC ĐỘNG', 0, -218, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Exact quoted sentence from narration in 2 lines
    const lineA = '"Hai lần gần đây bạn gửi báo cáo trễ,';
    const lineB = 'khiến nhóm phải đợi."';
    txt(lineA, 0, -120, fitSize(lineA, 740, 34), PR.char, { align: 'center', weight: 800 });
    txt(lineB, 0, -74, fitSize(lineB, 740, 34), PR.char, { align: 'center', weight: 800 });

    // Two factual sub-widgets: specific behaviour + actual impact
    // Left sub-widget: 2 lần trễ
    pp(pR(-360, -10, 340, 160, 12), '#eaf5ea', { key: 'cmp2_act', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(-360, -10, 340, 38, 12), PR.navy, { shadow: false });
    txt('SỰ VIỆC CỤ THỂ', -190, 16, 20, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('2 lần gửi trễ', -190, 80, 32, PR.char, { align: 'center', base: 'middle', weight: 800 });

    // Right sub-widget: nhóm phải đợi
    pp(pR(20, -10, 340, 160, 12), '#eaf5ea', { key: 'cmp2_imp', sb: 8, sy: 4, tex: 0.4 });
    pp(pR(20, -10, 340, 38, 12), PR.green, { shadow: false });
    txt('TÁC ĐỘNG THỰC TẾ', 190, 16, 20, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Nhóm phải đợi', 190, 80, 32, PR.char, { align: 'center', base: 'middle', weight: 800 });
  });

  prCheck(880, 570, tTre, 48);
  prStamp('RÕ RÀNG & KHÁCH QUAN', CX, 1160, PR.green, tDoi, { rot: 0.02, size: 40, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT >= tTre ? 'happy' : 'neutral', look: -25, key: 'b3b' });
  prSign('CÂU 2: HÀNH VI VÀ TÁC ĐỘNG', { kicker: KICK });
  prChips();
};

SCENES.impact = () => {   // S4: Câu thứ hai nói rõ hành vi & tác động, thay vì đánh giá toàn bộ con người
  const tHanh = VW('impact', 'hành').t0, tDanh = VW('impact', 'đánh').t0, tNguoi = VW('impact', 'người').t0;
  m14Room(TEAL2, true);
  prStar(140, 420, 32, PR.mustard);
  prStar(940, 420, 26, PR.orange);

  // Badges above card tops (clear of all text)
  prCheck(350, 520, tHanh, 40);
  prCross(730, 520, tDanh, 40);

  // Two contrasting pillars present at cut: Behavior & Impact VS Whole Person Evaluation
  // Left pillar: HÀNH VI & TÁC ĐỘNG (at 350)
  withT(350, 830, -0.015, 1, () => {
    pp(pR(-170, -250, 340, 500, 18), PR.paperW, { key: 'imp_lcard', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -250, 340, 64, 18), PR.green, { key: 'imp_lbar', shadow: false });
    txt('HÀNH VI & TÁC ĐỘNG', 0, -210, 24, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    pp(pR(-130, -140, 260, 130, 10), '#eaf5ea', { key: 'imp_lex', sb: 6, sy: 3, tex: 0.4 });
    txt('Sự việc cụ thể', 0, -90, 26, PR.char, { align: 'center', weight: 800 });
    txt('Ảnh hưởng công việc', 0, -50, 22, PR.greyD, { align: 'center', weight: 700 });

    txt('Dễ tiếp thu', 0, 70, 32, PR.green, { align: 'center', weight: 800 });
    txt('& sửa đổi', 0, 110, 28, PR.char, { align: 'center', weight: 700 });
  });

  // Right pillar: ĐÁNH GIÁ CON NGƯỜI (at 730)
  withT(730, 830, 0.015, 1, () => {
    pp(pR(-170, -250, 340, 500, 18), PR.paperW, { key: 'imp_rcard', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-170, -250, 340, 64, 18), PR.red, { key: 'imp_rbar', shadow: false });
    txt('TOÀN BỘ CON NGƯỜI', 0, -210, 24, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    pp(pR(-130, -140, 260, 130, 10), '#ffebee', { key: 'imp_rex', sb: 6, sy: 3, tex: 0.4 });
    txt('Phán xét nhân cách', 0, -90, 26, PR.char, { align: 'center', weight: 800 });
    txt('Gắn nhãn tiêu cực', 0, -50, 22, PR.greyD, { align: 'center', weight: 700 });

    txt('Kích hoạt tự vệ', 0, 70, 32, PR.redD, { align: 'center', weight: 800 });
    txt('& tranh cãi', 0, 110, 28, PR.char, { align: 'center', weight: 700 });
  });

  prStamp('TÁCH HÀNH VI KHỎI BẢN THÂN', CX, 1170, PR.navy, tNguoi, { rot: -0.02, size: 36, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tHanh ? 'happy' : 'neutral', look: -25, key: 'b4' });
  prSign('TÁCH HÀNH VI KHỎI CON NGƯỜI', { kicker: KICK });
  prChips();
};

SCENES.reframe = () => {   // S5: Khi góp ý: 3 bước xây dựng
  const tNeu = VW('reframe', 'nêu').t0, tMo = VW('reframe', 'mô').t0, tTim = VW('reframe', 'tìm').t0, tPhap = VW('reframe', 'pháp').t0;
  m14Room(TEAL, false);
  prStar(140, 420, 34, PR.mustard);
  prStar(940, 430, 28, PR.pink);

  // 3-step action roadmap (container present at cut)
  withT(CX, 810, 0, 1, () => {
    pp(pR(-410, -250, 820, 500, 20), PR.paperW, { key: 'ref_board', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-410, -250, 820, 64, 20), PR.navy, { key: 'ref_head', shadow: false });
    txt('3 BƯỚC GÓP Ý XÂY DỰNG', 0, -210, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  // Step 1: Nêu sự việc cụ thể
  const k1 = popS(tNeu);
  if (k1 > 0.01) withT(CX, 680, -0.01, k1, () => {
    pp(pR(-360, -45, 720, 90, 14), '#eaf5ea', { key: 'rf_st1', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(-300, 0, 30, 30), PR.green, { shadow: false });
    txt('1', -300, 8, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('NÊU SỰ VIỆC CỤ THỂ', -240, 8, 30, PR.navy, { base: 'middle', weight: 800 });
  });

  // Step 2: Mô tả ảnh hưởng
  const k2 = popS(tMo);
  if (k2 > 0.01) withT(CX, 800, 0.01, k2, () => {
    pp(pR(-360, -45, 720, 90, 14), '#eaf0f8', { key: 'rf_st2', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(-300, 0, 30, 30), PR.blue, { shadow: false });
    txt('2', -300, 8, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('MÔ TẢ ẢNH HƯỞNG', -240, 8, 30, PR.navy, { base: 'middle', weight: 800 });
  });

  // Step 3: Cùng tìm giải pháp
  const k3 = popS(tTim);
  if (k3 > 0.01) withT(CX, 920, -0.01, k3, () => {
    pp(pR(-360, -45, 720, 90, 14), '#fff8e8', { key: 'rf_st3', sb: 10, sy: 5, tex: 0.4 });
    pp(pE(-300, 0, 30, 30), PR.mustard, { shadow: false });
    txt('3', -300, 8, 30, PR.char, { align: 'center', base: 'middle', weight: 800 });
    txt('CÙNG TÌM GIẢI PHÁP', -240, 8, 30, PR.navy, { base: 'middle', weight: 800 });
  });

  prStamp('3 BƯỚC THỰC HIỆN', CX, 1160, PR.green, tPhap, { rot: -0.02, size: 42, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: TT >= tTim ? 'happy' : 'neutral', look: -25, key: 'b5' });
  prSign('3 BƯỚC GÓP Ý XÂY DỰNG', { kicker: KICK });
  prChips();
};

SCENES.reframe2 = () => {   // S5b (SPLIT): Thẳng thắn mà không cần biến thành cuộc công kích
  const tThang = VW('reframe', 'thẳng').t0, tCong = VW('reframe', 'công').t0;
  m14Room(TEAL2, true);
  prClock(930, 430, 56, 3, 15, 'clk5b');
  prStar(140, 420, 30, PR.mustard);

  // Board present at cut
  withT(CX, 810, 0, 1, () => {
    pp(pR(-410, -250, 820, 500, 20), PR.paperW, { key: 'rf2_board', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-410, -250, 820, 64, 20), PR.navy, { key: 'rf2_head', shadow: false });
    txt('MỤC TIÊU CỦA GÓP Ý', 0, -210, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Positive constructive dialogue emblems
    withT(0, -70, -0.015, popS(tThang), () => {
      pp(pR(-350, -50, 700, 100, 14), PR.navy, { key: 'em1', sb: 10, sy: 5, tex: 0.4 });
      txt('THẲNG THẮN VÀ TRUNG THỰC', 0, 8, 32, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    });

    withT(0, 70, 0.015, popS(tCong), () => {
      pp(pR(-350, -50, 700, 100, 14), '#eaf5ea', { key: 'em2', sb: 10, sy: 5, tex: 0.4 });
      txt('KHÔNG CÔNG KÍCH CÁ NHÂN', 0, 8, 32, PR.green, { align: 'center', base: 'middle', weight: 800 });
    });
  });

  prCheck(880, 570, tCong, 48);
  prStamp('GÓP Ý XÂY DỰNG', CX, 1160, PR.green, tCong, { rot: 0.03, size: 44, from: 1.3 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -25, key: 'b5b' });
  prSign('THẲNG THẮN MÀ KHÔNG CÔNG KÍCH', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn thích góp ý trực tiếp hay cần thời gian suy nghĩ trước?
  const tTruc = VW('cta', 'trực').t0, tNghi = VW('cta', 'nghĩ').t0, tTruoc = VW('cta', 'trước?').t0;
  m14Room(TEAL, false);
  prBunting(260);
  prStar(180, 420, 34, PR.mustard);
  prStar(890, 410, 28, PR.pink);
  prStar(540, 360, 40, PR.orange);

  // Two vote choice cards present at cut (symmetric at 350 and 730)
  withT(350, 680, -0.02, 1, () => {
    const act = TT >= tTruc;
    pp(pR(-170, -110, 340, 220, 18), act ? PR.blue : '#3d5c80', { key: 'opt_a', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-150, -90, 300, 40, 8), '#2c4870', { shadow: false });
    txt('LỰA CHỌN A', 0, -70, 22, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('TRỰC TIẾP', 0, -8, 38, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Góp ý thẳng ngay lúc đó', 0, 46, fitSize('Góp ý thẳng ngay lúc đó', 300, 22), PR.creamL, { align: 'center', weight: 700 });
  });

  withT(730, 680, 0.02, 1, () => {
    const act = TT >= tNghi;
    pp(pR(-170, -110, 340, 220, 18), act ? PR.mustard : '#b08a20', { key: 'opt_b', sb: 14, sy: 7, tex: 0.45 });
    pp(pR(-150, -90, 300, 40, 8), '#8a6c18', { shadow: false });
    txt('LỰA CHỌN B', 0, -70, 22, PR.char, { align: 'center', base: 'middle', weight: 800 });
    txt('CẦN THỜI GIAN', 0, -8, fitSize('CẦN THỜI GIAN', 300, 36), PR.char, { align: 'center', base: 'middle', weight: 800 });
    txt('Suy nghĩ trước khi trao đổi', 0, 46, fitSize('Suy nghĩ trước khi trao đổi', 300, 22), PR.char, { align: 'center', weight: 700 });
  });

  // Comment box starts typing right as the question finishes
  prCommentBox(CX, 980, 'TRỰC TIẾP HAY SUY NGHĨ?', tTruoc, { hint: 'Bình luận lựa chọn của bạn…' });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN CHỌN CÁCH NÀO?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['cause', 'So', 0, 'cause2'],
  ['compare', 'Và:', 0, 'compare2'],
  ['reframe', 'Bạn', 0, 'reframe2'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: VW('hook', 'nhưng').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'cãi').t0 });
  cues.push({ k: 'thud', t: VW('hook', 'vã').t0 });
  cues.push({ k: 'pop', t: VW('cause', 'dung').t0 });
  cues.push({ k: 'pop', t: VW('cause', 'cách').t0 });
  cues.push({ k: 'chime', t: VW('cause', 'đạt').t0 });
  cues.push({ k: 'pop', t: VW('cause', 'hai').t0 });
  cues.push({ k: 'thud', t: VW('compare', 'thiếu').t0 });
  cues.push({ k: 'thud', t: VW('compare', 'nhiệm').t0 });
  cues.push({ k: 'pop', t: VW('compare', 'hai').t0 });
  cues.push({ k: 'chime', t: VW('compare', 'trễ').t0 });
  cues.push({ k: 'chime', t: VW('compare', 'đợi').t0 });
  cues.push({ k: 'pop', t: VW('impact', 'hành').t0 });
  cues.push({ k: 'thud', t: VW('impact', 'đánh').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'nêu').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'mô').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'tìm').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'pháp').t0 });
  cues.push({ k: 'pop', t: VW('reframe', 'thẳng').t0 });
  cues.push({ k: 'chime', t: VW('reframe', 'công').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'trực').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'nghĩ').t0 });
  cues.push({ k: 'chime', t: VW('cta', 'trước?').t0 });
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
