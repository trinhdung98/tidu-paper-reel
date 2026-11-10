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
const CHALKY = 'rgba(244,244,236,0.92)';

const SCENES = {};

// Helper: vẽ cuộn băng cassette tua lại (rewind tape loop)
function m19TapeLoop(cx, cy, s = 1, isLooping = true, key = 'tape') {
  withT(cx, cy, 0, s, () => {
    // Vỏ băng cassette giấy
    pp(pR(-220, -140, 440, 280, 24), PR.char, { key: key + 'body', sb: 16, sy: 8, tex: 0.4 });
    pp(pR(-180, -100, 360, 200, 16), PR.cream, { shadow: false, tex: 0.3 });
    // Nhãn băng
    txt('BĂNG PHÁT LẠI: "CÂU NÓI KHÓ NGHE"', 0, -60, 20, PR.red, { align: 'center', weight: 800 });
    // 2 trục bánh xe quay
    [-80, 80].forEach((wx, i) => {
      pp(pE(wx, 20, 40, 40), PR.char, { shadow: false });
      pp(pE(wx, 20, 20, 20), PR.cream, { shadow: false });
      // Răng cưa quay
      if (isLooping) {
        ctx.save(); ctx.translate(wx, 20); ctx.rotate(TT * (i === 0 ? 3 : -3));
        for (let j = 0; j < 6; j++) {
          ctx.rotate(Math.PI / 3);
          pp(pR(-4, -28, 8, 12, 2), PR.cream, { shadow: false });
        }
        ctx.restore();
      }
    });
    // Dải băng nối 2 trục
    pp(pR(-80, 14, 160, 12, 0), '#4a3b32', { shadow: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Cuộc nói chuyện đã xong nhưng trong đầu vẫn tranh luận
  const tXong = VW('hook', 'thúc').t0, tTranh = VW('hook', 'luận').t0;
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prStar(140, 400, 32, PR.mustard);
  prStar(940, 420, 26, PR.pink);
  prClock(930, 650, 56, 9, 30, 'clk1');

  // Bong bóng cuộc trò chuyện ảo trong đầu
  withT(CX, 720, 0, popS(E0 + 0.15), () => {
    pp(pR(-360, -110, 720, 220, 24), PR.paperW, { key: 'thought_box19', sb: 14, sy: 7, tex: 0.4 });
    txt('CUỘC GẶP ĐÃ KẾT THÚC TỪ LÂU...', 0, -55, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('NHƯNG TRONG ĐẦU VẪN ĐANG TRANH LUẬN!', 0, 5, 34, PR.red, { align: 'center', weight: 800 });
    txt('"Đáng lẽ lúc đó mình phải nói câu này..."', 0, 60, 26, PR.navy, { align: 'center', weight: 700 });
  });

  if (TT >= tTranh) {
    prStamp('TRANH LUẬN TRONG ĐẦU', CX, 1100, PR.red, tTranh, { rot: -0.05, size: 42 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT >= tTranh ? 'flat' : 'neutral', look: -30, key: 'b1' });
  prSign('TRONG ĐẦU VẪN TRANH CÃI?', { kicker: KICK });
  prChips();
};

SCENES.rumination = () => {   // S2: Cuộn băng tua lại cùng một câu nói
  const tTua = VW('rumination', 'lẽ').t0, tKinh = VW('rumination', 'nghiệm').t0;
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 380, 28, PR.mustard);
  prStar(920, 400, 30, PR.orange);

  // Cuộn băng cassette quay
  withT(CX, 660, 0, popS(E0 + 0.15), () => {
    m19TapeLoop(0, 0, 1.05, true, 'tape1');
  });

  // Hộp phân biệt suy ngẫm vs nhai lại
  withT(CX, 1020, 0, popS(tKinh), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'rum_box', sb: 12, sy: 6, tex: 0.4 });
    txt('SUY NGẪM: Giúp rút kinh nghiệm hữu ích', 0, -15, 30, PR.green, { align: 'center', weight: 800 });
    txt('NHƯNG NẾU CỨ LẶP LẠI MÃI THÌ SAO?', 0, 25, 28, PR.red, { align: 'center', weight: 700 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'neutral', look: -20, key: 'b2' });
  prSign('BĂNG PHÁT LẠI TÂM TRÍ', { kicker: KICK });
  prChips();
};

SCENES.loop = () => {   // S3: Băng lặp vòng tròn không tạo góc nhìn mới -> kiệt sức
  const tLap = VW('loop', 'lặp').t0, tMet = VW('loop', 'mỏi').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(160, 420, 30, PR.pink);
  prClock(930, 580, 56, 10, 0, 'clk3');

  // Vòng lặp tròn vô tận (Loop)
  withT(CX, 660, 0, popS(E0 + 0.15), () => {
    ctx.save(); ctx.strokeStyle = PR.red; ctx.lineWidth = 14; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, 140, 0, 1.8 * Math.PI); ctx.stroke(); ctx.restore();
    // Mũi tên vòng tròn
    pp(pG([[140, -10], [120, -50], [170, -30]]), PR.red, { shadow: false });
    txt('VÒNG LẶP', 0, -20, 36, PR.red, { align: 'center', weight: 800 });
    txt('NHAI LẠI', 0, 25, 36, PR.red, { align: 'center', weight: 800 });
  });

  withT(CX, 1020, 0, popS(tMet), () => {
    pp(pR(-380, -70, 760, 140, 20), PR.paperW, { key: 'loop_box', sb: 12, sy: 6, tex: 0.4 });
    txt('KHÔNG ĐEM LẠI GÓC NHÌN MỚI,', 0, -15, 30, PR.navy, { align: 'center', weight: 800 });
    txt('CHỈ LÀM BẠN CÀNG THÊM KIỆT SỨC!', 0, 25, 32, PR.red, { align: 'center', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b3' });
  prSign('VÒNG LẶP GÂY KIỆT SỨC', { kicker: KICK });
  prChips();
};

SCENES.question = () => {   // S4: Tự hỏi: Mình đang học thêm gì, hay chỉ đang phát lại khó chịu?
  const tHoi = VW('question', 'hỏi').t0, tPhat = VW('question', 'phát').t0;
  prWall(TEAL2, { streak: 360, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(140, 390, 32, PR.mustard);
  prStar(930, 410, 26, PR.orange);

  withT(CX, 650, 0, popS(E0 + 0.15), () => {
    pp(pR(-380, -110, 760, 220, 22), PR.paperW, { key: 'q19_box', sb: 14, sy: 7, tex: 0.4 });
    txt('DỪNG VÒNG LẶP VỚI CÂU HỎI:', 0, -55, 28, PR.greyD, { align: 'center', weight: 800 });
    txt('"MÌNH ĐANG HỌC THÊM ĐIỀU GÌ,', 0, -5, 34, PR.green, { align: 'center', weight: 800 });
    txt('HAY CHỈ ĐANG PHÁT LẠI CẢM GIÁC KHÓ CHỊU?"', 0, 45, 30, PR.red, { align: 'center', weight: 800 });
  });

  const kPhat = popS(tPhat);
  if (kPhat > 0.01) withT(CX, 1010, 0, kPhat, () => {
    pp(pR(-340, -60, 680, 120, 18), PR.navy, { key: 'q19_sub', sb: 12, sy: 6, tex: 0.45 });
    txt('Nhận thức là bước đầu tiên để bấm DỪNG!', 0, 5, 30, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'happy', look: -20, key: 'b4' });
  prSign('BẬT CÔNG TẮC TỈNH THỨC', { kicker: KICK });
  prChips();
};

SCENES.action = () => {   // S5: Nếu có bài học: ghi hành động; Nếu không: dừng băng & gấp gọn về hiện tại
  const tBaiHoc = VW('action', 'bài').t0, tHienTai = VW('action', 'hiện').t0;
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prStar(150, 380, 34, PR.mustard);
  prStar(920, 420, 28, PR.pink);

  // 2 hướng xử lý
  withT(CX - 180, 680, -0.02, popS(E0 + 0.15), () => {
    pp(pR(-180, -110, 360, 220, 20), '#eaf5ea', { key: 'act_left', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-180, -110, 360, 50, 20), PR.green, { shadow: false });
    txt('NẾU CÓ BÀI HỌC', 0, -85, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('Viết thành 1 hành động', 0, -20, 26, PR.char, { align: 'center', weight: 700 });
    txt('cụ thể cho lần sau!', 0, 25, 26, PR.green, { align: 'center', weight: 800 });
  });

  withT(CX + 180, 680, 0.02, popS(E0 + 0.3), () => {
    pp(pR(-180, -110, 360, 220, 20), PR.paperW, { key: 'act_right', sb: 12, sy: 6, tex: 0.4 });
    pp(pR(-180, -110, 360, 50, 20), PR.navy, { shadow: false });
    txt('NẾU KHÔNG CÒN GÌ ĐỂ LÀM', 0, -85, 20, PR.creamL, { align: 'center', weight: 800 });
    txt('Bấm nút DỪNG băng,', 0, -20, 26, PR.char, { align: 'center', weight: 700 });
    txt('quay về hiện tại!', 0, 25, 26, PR.navy, { align: 'center', weight: 800 });
  });

  if (TT >= tHienTai) {
    prStamp('CHUYỂN CHÚ Ý VỀ HIỆN TẠI', CX, 1060, PR.navy, tHienTai, { rot: -0.02, size: 36 });
  }

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -20, key: 'b5' });
  prSign('DỪNG PHÁT LẠI, QUAY VỀ HIỆN TẠI', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Bạn hay nhớ lời của mình hay lời của người khác?
  const tTell = VW('cta', 'người').t0;
  prWall(TEAL2, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prBunting(260);
  prStar(180, 420, 36, PR.mustard);
  prStar(890, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 10, 0, 'clk6');

  prCommentBox(CX, 820, 'GÓC TÂM SỰ', tTell, { hint: 'Bạn hay nhớ lại điều gì nhất?…' });

  [0, 1].forEach((i) => {
    withT(CX, 1030 + i * 170, i ? 0.015 : -0.015, popS(E0 + 0.3 + i * 0.25), () => {
      pp(pR(-340, -65, 680, 130, 24), PR.paperW, { key: 'cmt' + i, sb: 12, sy: 6, tex: 0.4 });
      pp(pE(-270, 0, 40, 40), [PR.blue, PR.orange][i], { key: 'cav' + i, shadow: false, tex: 0.4 });
      txt(['Nhớ câu người ta chê mình 🥺', 'Tự trách câu mình nói hớ 🙈'][i], -210, 8, 28, PR.char, { base: 'middle', weight: 700 });
    });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('BẠN HAY NHỚ LẠI ĐIỀU GÌ?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'thud', t: VW('hook', 'luận').t0 });
  cues.push({ k: 'pop', t: VW('rumination', 'lẽ').t0 });
  cues.push({ k: 'thud', t: VW('loop', 'mỏi').t0 });
  cues.push({ k: 'chime', t: VW('question', 'hỏi').t0 });
  cues.push({ k: 'chime', t: VW('action', 'bài').t0 });
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

