// =====================================================================
//  TIDU MIND 19 — "Vì sao bạn cứ nhớ lại một câu nói khó nghe?"
//  Hiện tượng nhai lại suy nghĩ (Rumination Loop) — Cảm xúc & Suy nghĩ.
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · SUY NGHĨ';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};

// Helper: Cuộn băng cassette bằng giấy (paper cassette)
function m19Tape(cx, cy, s = 1, isLooping = true, key = 'tape') {
  withT(cx, cy, 0, s, () => {
    // Vỏ băng
    pp(pR(-230, -140, 460, 280, 22), PR.char, { key: key + 'body', sb: 16, sy: 8, tex: 0.4 });
    pp(pR(-190, -100, 380, 200, 16), PR.cream, { shadow: false, tex: 0.3 });
    // Nhãn băng
    txt('PHÁT LẠI: CÂU NÓI KHÓ NGHE', 0, -60, 22, PR.red, { align: 'center', weight: 800 });
    // Cửa sổ nhìn dải băng
    pp(pR(-120, -20, 240, 75, 10), PR.char, { shadow: false });
    pp(pR(-114, -14, 228, 63, 8), '#4a3b32', { shadow: false });
    // 2 trục bánh xe quay
    [-65, 65].forEach((wx, i) => {
      pp(pE(wx, 18, 36, 36), PR.cream, { shadow: false });
      pp(pE(wx, 18, 16, 16), PR.char, { shadow: false });
      if (isLooping) {
        ctx.save(); ctx.translate(wx, 18); ctx.rotate(TT * (i === 0 ? 3 : -3));
        for (let j = 0; j < 6; j++) {
          ctx.rotate(Math.PI / 3);
          pp(pR(-3, -22, 6, 10, 2), PR.char, { shadow: false });
        }
        ctx.restore();
      }
    });
    // Dải băng nối 2 trục
    pp(pR(-65, 12, 130, 12, 0), '#2a1a12', { shadow: false });
  });
}

// Helper: Bóng đèn nhận thức (lightbulb)
function m19Lightbulb(cx, cy, s = 1, key = 'bulb') {
  withT(cx, cy, 0, s, () => {
    // Tia sáng
    ctx.save(); ctx.strokeStyle = PR.mustard; ctx.lineWidth = 6; ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 60, Math.sin(a) * 60);
      ctx.lineTo(Math.cos(a) * 82, Math.sin(a) * 82);
      ctx.stroke();
    }
    ctx.restore();
    // Bầu bóng đèn
    pp(pE(0, -10, 48, 48), PR.mustard, { key: key + 'glass', sb: 10, sy: 5, tex: 0.3 });
    pp(pR(-20, 22, 40, 26, 4), PR.grey, { key: key + 'base', shadow: false });
    pp(pR(-12, 48, 24, 10, 3), PR.char, { shadow: false });
  });
}

// Helper: Bút chì viết kế hoạch (paper pencil)
function m19Pencil(cx, cy, rot = -0.4, s = 1, key = 'pen') {
  withT(cx, cy, rot, s, () => {
    // Thân bút
    pp(pR(-12, -80, 24, 140, 4), PR.mustard, { key: key + 'body', sb: 8, sy: 4, tex: 0.4 });
    // Tẩy
    pp(pR(-12, -105, 24, 25, 4), PR.pink, { key: key + 'erase', shadow: false });
    pp(pR(-12, -82, 24, 8, 2), PR.grey, { shadow: false });
    // Đầu chì
    pp(pG([[-12, 60], [12, 60], [0, 95]]), PR.woodL, { key: key + 'tip', shadow: false });
    pp(pG([[-4, 83], [4, 83], [0, 95]]), PR.char, { shadow: false });
  });
}

// Helper: Chậu cây xanh an yên cho hiện tại
function m19PottedPlant(cx, cy, s = 1, key = 'plant') {
  withT(cx, cy, 0, s, () => {
    // Chậu đất nung
    pp(pG([[-60, 50], [60, 50], [45, 140], [-45, 140]]), PR.clawd, { key: key + 'pot', sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-68, 35, 136, 20, 6), PR.clawd, { key: key + 'rim', sb: 8, sy: 4, tex: 0.5 });
    // Lá xanh
    [
      [-35, 10, 42, 65, -0.5, PR.green],
      [35, 5, 44, 70, 0.45, PR.green],
      [0, -25, 46, 75, -0.05, '#4e8268'],
      [-55, -15, 36, 55, -0.85, '#3b6a53'],
      [55, -10, 38, 58, 0.8, '#3b6a53'],
    ].forEach(([lx, ly, rw, rh, rot, c], i) => {
      withT(lx, ly, rot, 1, () => {
        pp(pE(0, 0, rw, rh), c, { key: key + 'leaf' + i, sb: 8, sy: 4, tex: 0.4 });
      });
    });
  });
}

// ---- SCENES ----

// S1: Hook - Cuộc trò chuyện đã kết thúc, nhưng trong đầu bạn vẫn đang tranh luận?
SCENES.hook = () => {
  const tTranh = VW('hook', 'luận').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 420, 32, PR.mustard);
  prStar(920, 430, 26, PR.pink);
  prClock(920, 440, 52, 11, 30, 'clk1');

  // Đám mây suy nghĩ lớn: THUMBNAIL TẠI FRAME 0 (vẽ đầy đủ ở t = 0)
  prThought(CX, 750, 720, 470, 740, 1280, '', { key: 'th_hook' });

  // Nhãn trạng thái bên trong đám mây
  pp(pR(CX - 190, 560, 380, 46, 12), PR.navy, { key: 'hk_tag', shadow: false });
  txt('CUỘC TRÒ CHUYỆN ĐÃ XONG', CX, 584, 22, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

  // 2 bong bóng lời thoại tranh luận đối đầu nhau
  withT(390, 700, -0.02, 1, () => {
    pp(pR(-135, -55, 270, 110, 16), PR.paperW, { key: 'hk_sp1', sb: 10, sy: 5, tex: 0.4 });
    txt('"Người ta vừa nói..."', 0, -14, 22, PR.greyD, { align: 'center', weight: 700 });
    txt('CÂU KHÓ NGHE', 0, 18, 25, PR.red, { align: 'center', weight: 800 });
  });

  withT(690, 770, 0.02, 1, () => {
    pp(pR(-135, -55, 270, 110, 16), PR.paperW, { key: 'hk_sp2', sb: 10, sy: 5, tex: 0.4 });
    txt('"Lẽ ra mình phải..."', 0, -14, 22, PR.greyD, { align: 'center', weight: 700 });
    txt('TRANH CÃI LẠI', 0, 18, 25, PR.blue, { align: 'center', weight: 800 });
  });

  // Dấu hiệu tranh cãi bùng phát
  if (TT >= tTranh) {
    prStamp('TRANH LUẬN TRONG ĐẦU', CX, 1080, PR.red, tTranh, { rot: -0.04, size: 44, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tTranh ? 'flat' : 'neutral', look: -30, key: 'b1' });
  prSign('TRONG ĐẦU VẪN TRANH CÃI?', { kicker: KICK });
  prChips();
};

// S2: Rumination - Bạn nghĩ về điều đáng lẽ mình nên nói, rồi tưởng tượng hàng loạt câu trả lời khác
SCENES.rumination = () => {
  const tLe = VW('rumination', 'lẽ').t0;
  const tTuong = VW('rumination', 'tưởng').t0;
  const tLoat = VW('rumination', 'loạt').t0;
  const tKhac = VW('rumination', 'khác').t0;

  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 420, 28, PR.mustard);
  prStar(920, 430, 30, PR.orange);

  // Cuộn băng tua lại ở trên - hiện diện ngay từ cut
  m19Tape(CX, 580, 1.05, true, 'tape_rum');

  // Thẻ chính: Điều đáng lẽ nên nói - hiện diện từ đầu
  withT(CX, 765, 0, 1, () => {
    pp(pR(-290, -42, 580, 84, 16), PR.paperW, { key: 'rum_card0', sb: 12, sy: 6, tex: 0.4 });
    txt('ĐÁNG LẼ MÌNH NÊN NÓI...', 0, 4, 28, PR.navy, { align: 'center', base: 'middle', weight: 800 });
  });

  // Hàng loạt câu trả lời khác tưởng tượng trong đầu
  if (TT >= tTuong) {
    withT(CX, 875, -0.015, popS(tTuong), () => {
      pp(pR(-270, -36, 540, 72, 14), '#fcf5e5', { key: 'rum_card1', sb: 10, sy: 5, tex: 0.4 });
      txt('Câu trả lời 1: "Lúc đó phản bác ngay..."', 0, 3, 23, PR.char, { align: 'center', base: 'middle', weight: 700 });
    });
  }

  if (TT >= tLoat) {
    withT(CX, 965, 0.015, popS(tLoat), () => {
      pp(pR(-270, -36, 540, 72, 14), '#fdeeed', { key: 'rum_card2', sb: 10, sy: 5, tex: 0.4 });
      txt('Câu trả lời 2: "Hoặc đáp trả sắc bén hơn..."', 0, 3, 23, PR.red, { align: 'center', base: 'middle', weight: 700 });
    });
  }

  if (TT >= tKhac) {
    prStamp('HÀNG LOẠT CÂU TRẢ LỜI', CX, 1100, PR.orange, tKhac, { rot: -0.03, size: 40, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'flat', look: -25, key: 'b2' });
  prSign('TƯỞNG TƯỢNG ĐÁP TRẢ', { kicker: KICK });
  prChips();
};

// S3 (SPLIT): Reflection - Việc suy ngẫm có thể giúp ta rút kinh nghiệm.
SCENES.reflection = () => {
  const tKinh = VW('rumination', 'nghiệm').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 420, 32, PR.green);
  prStar(920, 440, 28, PR.mustard);

  // Bìa kẹp tài liệu rút kinh nghiệm (learning clipboard) - hiện diện từ đầu
  withT(CX, 750, 0, 1, () => {
    // Tấm gỗ bìa kẹp
    pp(pR(-280, -220, 560, 440, 20), PR.woodD, { key: 'ref_board', sb: 14, sy: 7, tex: 0.6 });
    // Tờ giấy trắng
    pp(pR(-250, -180, 500, 380, 12), PR.paperW, { key: 'ref_paper', shadow: false, tex: 0.4 });
    // Cái kẹp sắt trên đầu
    pp(pR(-80, -235, 160, 40, 8), PR.greyD, { key: 'ref_clip', sb: 8, sy: 4 });
    pp(pE(0, -215, 16, 16), PR.creamL, { shadow: false });

    // Tiêu đề
    txt('SUY NGẪM TÍCH CỰC', 0, -135, 30, PR.green, { align: 'center', weight: 800 });
    txt('Rút kinh nghiệm cho bản thân', 0, -95, 22, PR.greyD, { align: 'center', weight: 700 });

    // Dòng kẻ giấy
    for (let r = 0; r < 4; r++) {
      pp(pR(-210, -50 + r * 65, 420, 3, 1), 'rgba(60,80,100,0.2)', { shadow: false });
    }
  });

  // Tích xanh rút kinh nghiệm
  withT(360, 725, 0, popS(E0 + 0.15), () => {
    prCheck(0, 0, E0 + 0.15, 32);
    txt('Nhìn nhận sự việc khách quan', 50, 2, 24, PR.char, { base: 'middle', weight: 700 });
  });

  withT(360, 790, 0, popS(tKinh), () => {
    prCheck(0, 0, tKinh, 32);
    txt('Chuẩn bị tốt hơn cho lần sau', 50, 2, 24, PR.char, { base: 'middle', weight: 700 });
  });

  if (TT >= tKinh) {
    prStamp('RÚT KINH NGHIỆM', CX, 1080, PR.green, tKinh, { rot: -0.03, size: 44, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b_ref' });
  prSign('SUY NGẪM ĐỂ RÚT KINH NGHIỆM', { kicker: KICK });
  prChips();
};

// S4: Loop - Nhưng khi cùng một câu chuyện lặp đi lặp lại mà không đem lại góc nhìn mới, nó dễ trở nên mệt mỏi.
SCENES.loop = () => {
  const tMoi = VW('loop', 'mới').t0;
  const tMet = VW('loop', 'mỏi').t0;

  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 420, 30, PR.pink);
  prClock(920, 440, 52, 12, 15, 'clk3');

  // Cuộn băng quay vòng lặp vô tận (Loop cassette) - hiện diện từ đầu
  m19Tape(CX, 620, 1.1, true, 'tape_loop');

  // Mũi tên vòng tròn quay quanh dải băng
  withT(CX, 620, TT * 2.2, 1, () => {
    ctx.save(); ctx.strokeStyle = 'rgba(230,80,60,0.65)'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, 270, 0, 1.4 * Math.PI); ctx.stroke(); ctx.restore();
    pp(pG([[270, 0], [250, -35], [295, -20]]), PR.red, { shadow: false });
  });

  // Thẻ thông báo: Không có góc nhìn mới
  if (TT >= tMoi) {
    withT(CX, 870, 0, popS(tMoi), () => {
      pp(pR(-280, -40, 560, 80, 16), PR.paperW, { key: 'loop_box_nomew', sb: 12, sy: 6, tex: 0.4 });
      txt('KHÔNG ĐEM LẠI GÓC NHÌN MỚI', 0, 3, 26, PR.red, { align: 'center', base: 'middle', weight: 800 });
    });
  }

  // Dấu hiệu pin cạn kiệt năng lượng
  if (TT >= tMet) {
    withT(CX, 965, 0, popS(tMet), () => {
      pp(pR(-90, -22, 180, 44, 8), PR.char, { key: 'bat_b', sb: 8, sy: 4 });
      pp(pR(-84, -16, 168, 32, 6), PR.creamL, { shadow: false });
      pp(pR(-78, -12, 42, 24, 4), PR.red, { shadow: false });
      pp(pR(90, -10, 10, 20, 3), PR.char, { shadow: false });
    });
  }

  // Dễ trở nên mệt mỏi
  if (TT >= tMet) {
    prStamp('DỄ MỆT MỎI', CX, 1080, PR.red, tMet, { rot: 0.04, size: 50, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT >= tMet ? 'flat' : 'neutral', look: -30, key: 'b3' });
  prSign('VÒNG LẶP GÂY MỆT MỎI', { kicker: KICK });
  prChips();
};

// S5: Question - Hãy thử hỏi: mình đang học thêm điều gì, hay chỉ đang phát lại cảm giác khó chịu?
SCENES.question = () => {
  const tHoi = VW('question', 'hỏi').t0;
  const tHoc = VW('question', 'học').t0;
  const tPhat = VW('question', 'phát').t0;

  prWall(TEAL, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 410, 32, PR.mustard);
  prStar(920, 420, 26, PR.orange);

  // 2 nhánh so sánh cân đối x = 540 (350 và 730) - hiện diện từ đầu
  // Nhánh 1 (Trái): Đang học thêm điều gì?
  withT(350, 750, -0.015, 1, () => {
    pp(pR(-170, -220, 340, 440, 18), PR.paperW, { key: 'q_card_left', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-170, -220, 340, 54, 18), PR.green, { shadow: false });
    txt('HỌC THÊM ĐIỀU GÌ?', 0, -192, 22, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    // Biểu tượng bóng đèn
    m19Lightbulb(0, -50, 0.9, 'q_bulb');
    txt('Rút bài học hữu ích', 0, 75, 22, PR.char, { align: 'center', weight: 700 });
    txt('Có góc nhìn mới', 0, 115, 20, PR.green, { align: 'center', weight: 800 });
  });

  // Nhánh 2 (Phải): Hay chỉ đang phát lại khó chịu?
  withT(730, 750, 0.015, 1, () => {
    pp(pR(-170, -220, 340, 440, 18), PR.paperW, { key: 'q_card_right', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-170, -220, 340, 54, 18), PR.red, { shadow: false });
    txt('PHÁT LẠI KHÓ CHỊU?', 0, -192, 22, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    // Băng nhỏ quay
    m19Tape(0, -50, 0.55, true, 'q_tape');
    txt('Tua đi tua lại cảm xúc', 0, 75, 22, PR.char, { align: 'center', weight: 700 });
    txt('Mắc kẹt trong bực bội', 0, 115, 20, PR.red, { align: 'center', weight: 800 });
  });

  if (TT >= tHoi) {
    prStamp('TỰ HỎI CHÍNH MÌNH', CX, 1080, PR.mustard, tHoi, { rot: -0.02, size: 44, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT >= tPhat ? 'wow' : 'happy', look: -25, key: 'b4' });
  prSign('HỌC HỎI HAY PHÁT LẠI?', { kicker: KICK });
  prChips();
};

// S6 (SPLIT sentence 1): Action - Nếu có bài học, hãy ghi thành một hành động cụ thể.
SCENES.action = () => {
  const tBai = VW('action', 'bài').t0;
  const tGhi = VW('action', 'ghi').t0;
  const tDong = VW('action', 'động').t0;

  prWall(TEAL2, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(140, 410, 34, PR.mustard);
  prStar(920, 430, 28, PR.pink);

  // Cuốn sổ kế hoạch hành động lớn - hiện diện từ đầu
  withT(CX, 760, 0, 1, () => {
    pp(pR(-280, -220, 560, 440, 20), PR.paperW, { key: 'act_note', sb: 14, sy: 7, tex: 0.45 });
    // Dải gáy sổ trên đầu
    pp(pR(-280, -220, 560, 54, 20), PR.green, { shadow: false });
    txt('HÀNH ĐỘNG CỤ THỂ', 0, -192, 24, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

    // Các dòng kẻ giấy
    for (let r = 0; r < 4; r++) {
      pp(pR(-240, -90 + r * 75, 480, 3, 1), 'rgba(60,80,100,0.2)', { shadow: false });
    }

    // Nội dung ghi chép
    txt('BÀI HỌC RÚT RA:', -230, -120, 22, PR.greyD, { align: 'left', weight: 700 });
    txt('"Lần sau chuẩn bị trước ý chính"', -230, -55, 24, PR.char, { align: 'left', weight: 700 });
  });

  // Hộp tích hành động cụ thể
  withT(CX, 805, 0, popS(tGhi), () => {
    prCheck(-200, 0, tGhi, 32);
    txt('Ghi thành 1 việc rõ ràng cần làm', -150, 2, 24, PR.green, { base: 'middle', weight: 800 });
  });

  // Cây bút chì vẽ cạnh sổ
  m19Pencil(810, 840, 0.35, 1, 'act_pencil');

  if (TT >= tDong) {
    prStamp('GHI THÀNH HÀNH ĐỘNG', CX, 1070, PR.green, tDong, { rot: -0.03, size: 44, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('NẾU CÓ BÀI HỌC', { kicker: KICK });
  prChips();
};

// S7 (SPLIT sentence 2): Present - Nếu chưa có việc gì cần làm, bạn có thể chủ động chuyển sự chú ý sang hiện tại.
SCENES.present = () => {
  const tHienTai = VW('action', 'hiện').t0;

  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 420, 30, PR.mustard);
  prStar(920, 440, 32, PR.pink);
  prClock(920, 440, 52, 2, 45, 'clk_pres');

  // Nút DỪNG BĂNG trên máy cassette - hiện diện từ đầu
  withT(CX, 610, 0, 1, () => {
    pp(pR(-230, -90, 460, 180, 18), PR.char, { key: 'stop_deck', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-200, -60, 400, 120, 12), PR.cream, { shadow: false });
    // Nút Stop đỏ to
    pp(pR(-110, -35, 220, 70, 10), PR.red, { key: 'btn_stop', sb: 8, sy: 4 });
    // Hình vuông stop
    pp(pR(-65, -15, 30, 30, 4), PR.creamL, { shadow: false });
    txt('DỪNG BĂNG', -20, 0, 24, PR.creamL, { base: 'middle', weight: 800 });
  });

  // Chậu cây xanh an yên cho hiện tại
  m19PottedPlant(360, 850, 1.05, 'pres_plant');

  // Thẻ thông điệp quay về hiện tại - hiện diện từ đầu
  withT(700, 880, 0.02, 1, () => {
    pp(pR(-180, -90, 360, 180, 18), PR.paperW, { key: 'pres_card', sb: 12, sy: 6, tex: 0.4 });
    txt('CHUYỂN CHÚ Ý', 0, -35, 24, PR.navy, { align: 'center', weight: 800 });
    txt('VỀ HIỆN TẠI', 0, 5, 28, PR.green, { align: 'center', weight: 800 });
    txt('Hít thở sâu & làm việc trước mắt', 0, 45, 18, PR.greyD, { align: 'center', weight: 700 });
  });

  if (TT >= tHienTai) {
    prStamp('QUAY VỀ HIỆN TẠI', CX, 1140, PR.navy, tHienTai, { rot: -0.02, size: 44, from: 1.3 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'happy', look: -20, key: 'b_pres' });
  prSign('CHUYỂN VỀ HIỆN TẠI', { kicker: KICK });
  prChips();
};

// S8: CTA - Bạn hay nhớ lại lời nói của mình hay lời nói của người khác?
SCENES.cta = () => {
  const tNho = VW('cta', 'nhớ').t0;
  const tKhac = VW('cta', 'khác').t0;

  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(140, 430, 36, PR.mustard);
  prStar(920, 440, 28, PR.pink);
  prClock(920, 440, 52, 10, 0, 'clk6');

  // 2 tấm thẻ lựa chọn đối xứng nhau qua CX = 540 (350 và 730) - hiện diện từ đầu
  withT(350, 710, -0.015, 1, () => {
    pp(pR(-170, -110, 340, 220, 16), PR.paperW, { key: 'opt_a', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-170, -110, 340, 48, 16), PR.blue, { shadow: false });
    txt('LỰA CHỌN A', 0, -86, 20, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Lời nói của mình', 0, -15, 26, PR.char, { align: 'center', weight: 800 });
    txt('(Tự trách, dằn vặt)', 0, 25, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  withT(730, 710, 0.015, 1, () => {
    pp(pR(-170, -110, 340, 220, 16), PR.paperW, { key: 'opt_b', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-170, -110, 340, 48, 16), PR.orange, { shadow: false });
    txt('LỰA CHỌN B', 0, -86, 20, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('Lời của người khác', 0, -15, 26, PR.char, { align: 'center', weight: 800 });
    txt('(Câu khó nghe, chê bai)', 0, 25, 20, PR.greyD, { align: 'center', weight: 700 });
  });

  // Hộp bình luận gõ sau khi dứt câu hỏi (bắt đầu tại chữ 'khác')
  prCommentBox(CX, 950, 'Ý KIẾN BẠN', tKhac, { hint: 'Bạn hay nhớ điều nào hơn?…' });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b8', look: -20 });
  prSign('BẠN HAY NHỚ ĐIỀU GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['rumination', 'Việc', 0, 'reflection'],
  ['action', 'Nếu', 1, 'present'],
];

function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'luận').t0 });
  cues.push({ k: 'pop', t: VW('rumination', 'lẽ').t0 });
  cues.push({ k: 'chime', t: VW('rumination', 'nghiệm').t0 });
  cues.push({ k: 'thud', t: VW('loop', 'mỏi').t0 });
  cues.push({ k: 'pop', t: VW('question', 'học').t0 });
  cues.push({ k: 'thud', t: VW('question', 'phát').t0 });
  cues.push({ k: 'chime', t: VW('action', 'bài').t0 });
  cues.push({ k: 'pop', t: VW('action', 'hiện').t0 });
  cues.push({ k: 'pop', t: VW('cta', 'nhớ').t0 });
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
