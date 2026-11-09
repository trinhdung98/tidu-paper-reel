// =====================================================================
//  TIDU MIND 02 — "Họ không trả lời tin nhắn, có phải họ ghét bạn?"
//  Thiên kiến suy diễn / Đọc tâm trí (Mind Reading Distortion).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · CẢM XÚC';
const TEAL = '#2e4f4f';
const CHALK_C = 'rgba(244,244,236,0.92)';
const M2_SENT = '#5a9e6f';

const SCENES = {};

// Điện thoại mở khung chat; o.sent2 = tin nhắn thứ hai, o.sent2Frac = phần đã gõ (< 1 thì đang gõ ở ô nhập)
function m2Phone(cx, cy, s = 1, o = {}) {
  withT(cx, cy, 0, s, () => {
    pp(pR(-220, -390, 440, 780, 48), '#1a2228', { key: 'ph_body', sb: 18, sy: 9, tex: 0.4 });
    pp(pR(-200, -370, 400, 740, 34), '#f0f4f4', { key: 'ph_screen', shadow: false, tex: 0.3 });
    pp(pR(-200, -340, 400, 96, 0), '#e2e8e8', { shadow: false, tex: 0.3 });
    pp(pR(-56, -360, 112, 16, 8), '#111', { shadow: false, tex: false });
    pp(pE(-140, -292, 30, 30), PR.orange, { key: 'ph_av', shadow: false, tex: 0.4 });
    txt('Bạn thân', -94, -280, 34, PR.navy, { weight: 800 });
    const bubble = (str, y) => {
      const w = txtW(str, 32) + 56;
      pp(pR(176 - w, y, w, 78, 24), M2_SENT, { key: 'msg' + y, sb: 6, sy: 3, tex: 0.3 });
      txt(str, 176 - w / 2, y + 51, 32, PR.creamL, { align: 'center', weight: 800 });
    };
    bubble('Cậu rảnh không?', -200);
    txt('Đã gửi · 15:30', 176, -90, 24, PR.greyD, { align: 'right', weight: 700 });
    pp(pR(-180, 292, 360, 58, 29), PR.paperW, { key: 'ph_in', shadow: false, tex: 0.3 });
    if (o.sent2) {
      const f = o.sent2Frac ?? 1;
      if (f < 1) txt(o.sent2, -150, 332, 28, PR.ink, { weight: 700, frac: f });
      else { bubble(o.sent2, -40); txt('Đã gửi · bây giờ', 176, 70, 24, PR.greyD, { align: 'right', weight: 700 }); }
    }
    if (o.after) o.after();
  });
}

// Kính lúp giấy: tâm tròng kính (x, y), bán kính r
function m2Glass(x, y, r, k = 1) {
  withT(x, y, 0, k, () => {
    withT(r * 0.7, r * 0.7, -Math.PI / 4, 1, () => pp(pR(-r * 0.18, 0, r * 0.36, r * 1.1, 12), PR.woodD, { key: 'mgh', sb: 10, sy: 5, tex: 0.5 }));
    pp(pE(0, 0, r, r), PR.greyD, { key: 'mgr', sb: 12, sy: 6, tex: 0.4 });
    pp(pE(0, 0, r * 0.82, r * 0.82), 'rgba(214,236,240,0.55)', { shadow: false, tex: 0.2 });
    pp(pE(-r * 0.32, -r * 0.32, r * 0.18, r * 0.12, -0.7), 'rgba(255,255,255,0.7)', { shadow: false, tex: false });
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: tin nhắn chưa được trả lời → cả một câu chuyện
  prWall(TEAL, { streak: 400, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });

  prClock(960, 400, 60, 3, 30 + TT * 2, 'clk1');
  prStar(130, 400, 34, PR.mustard);

  m2Phone(CX, 840, 1);

  [['?', 180, 620, 'tưởng'], ['!', 900, 760, 'ra'], ['…', 180, 1040, 'câu']].forEach(([s, x, y, w], i) => {
    const t = VW('hook', w).t0;
    prThought(x, y, 170, 130, x, y, s, { t, key: 'hk' + i, size: 76 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: TT > VW('hook', 'tưởng').t0 ? 'wow' : 'neutral', look: -35, key: 'b1' });
  prSign('CHƯA TRẢ LỜI TIN NHẮN?', { kicker: KICK });
  prChips();
};

SCENES.overthink = () => {   // S2: ba kịch bản trong đầu
  prWall('#2a4848', { streak: 520 });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb2', sb: 10, sy: 5, tex: 0.6 });

  const items = [
    { x: 470, y: 600, text: 'HỌ GIẬN MÌNH?', t: VW('overthink', 'giận').t0 },
    { x: 610, y: 860, text: 'MÌNH NÓI SAI À?', t: VW('overthink', 'sai').t0 },
    { x: 480, y: 1120, text: 'HỌ HẾT THÍCH MÌNH?', t: VW('overthink', 'thích').t0 },
  ];
  items.forEach((b, i) => {
    const last = i === items.length - 1;
    prThought(b.x, b.y, 600, 170, last ? 790 : b.x, last ? 1400 : b.y, b.text, { t: b.t, key: 'ot' + i, size: 46 });
  });

  prClock(960, 400, 60, 3, 45, 'clk2');
  prStar(130, 1300, 32, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: 'flat', look: -30, key: 'b2' });
  prSign('KỊCH BẢN TRONG ĐẦU', { kicker: KICK });
  prChips();
};

SCENES.reality = () => {   // S3a: nhìn lại — điều bạn thực sự biết
  const tLook = VW('reality', 'nhìn').t0, tKnow = VW('reality', 'biết').t0, tNo = VW('reality', 'trả').t0;
  prWall('#355555', { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  m2Phone(CX, 840, 1, {
    after: () => {
      const k = popS(tLook);
      if (k > 0.01) m2Glass(lerp(260, 60, EZ.o3(ev(tLook, 0.6))), -110, 120, k);
    },
  });
  prCheck(CX + 250, 760, tNo, 52);

  withT(CX, 1320, -0.02, popS(tKnow), () => {
    const str = 'BẠN BIẾT: HỌ CHƯA TRẢ LỜI';
    pp(pR(-360, -45, 720, 90, 20), PR.green, { key: 'fact_tag', sb: 12, sy: 6, tex: 0.5 });
    txt(str, 0, 4, fitSize(str, 660, 40), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  prClock(960, 400, 60, 4, 15, 'clk3');
  prStar(130, 460, 34, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'neutral', look: -25, key: 'b3', hold: propNotebook(0.1) });
  prSign('NHÌN LẠI SỰ THẬT', { kicker: KICK });
  prChips();
};

SCENES.reality2 = () => {   // S3b: những phần còn lại đều là suy đoán
  const t0 = E0, tRest = VW('reality', 'phần').t0, tGuess = VW('reality', 'suy').t0;
  prWall('#3b5d5a', { streak: 700, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  withT(330, 860, -0.02, popS(t0 + 0.05), () => {
    pp(pR(-180, -240, 360, 480, 20), '#4e8268', { key: 'fact_card', sb: 16, sy: 8, tex: 0.5 });
    txt('SỰ THẬT', 0, -170, 40, PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-150, -136, 300, 4, 2), PR.creamL, { shadow: false });
    ['Họ chưa', 'trả lời'].forEach((s, i) => txt(s, 0, -40 + i * 54, 40, PR.creamL, { align: 'center', weight: 800 }));
  });
  prCheck(330, 1010, t0 + 0.2);

  withT(750, 860, 0.02, popS(tRest), () => {
    pp(pR(-180, -240, 360, 480, 20), '#9e5a4e', { key: 'guess_card', sb: 16, sy: 8, tex: 0.5 });
    const title = 'PHẦN CÒN LẠI';
    txt(title, 0, -170, fitSize(title, 320, 40), PR.creamL, { align: 'center', weight: 800 });
    pp(pR(-150, -136, 300, 4, 2), PR.creamL, { shadow: false });
    ['Họ giận?', 'Mình nói sai?', 'Hết thích mình?'].forEach((s, i) => txt(s, 0, -50 + i * 60, fitSize(s, 300, 34), PR.creamL, { align: 'center', weight: 700 }));
  });
  prStamp('SUY ĐOÁN', 750, 1030, PR.mustard, tGuess, { rot: -0.1, size: 54, from: 1.4 });

  prClock(960, 400, 60, 4, 20, 'clk3b');
  prStar(130, 1300, 32, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: TT > tGuess ? 'wow' : 'neutral', look: -25, key: 'b3b' });
  prSign('SỰ THẬT VÀ SUY ĐOÁN', { kicker: KICK });
  prChips();
};

SCENES.distortion = () => {   // S4: bẫy đọc tâm trí
  const t0 = E0, tAssume = VW('distortion', 'mặc').t0;
  prWall(TEAL, { streak: 450 });
  prFloor(1500, PR.woodD, { studs: false });

  prBoard(150, 420, 780, 540, 'bd_dist');
  txt('BẪY TÂM LÝ', CX, 560, 44, CHALK_C, { align: 'center', frac: ev(t0 + 0.2, 0.5) });
  txt('ĐỌC TÂM TRÍ', CX, 680, 88, CHALK_C, { align: 'center', frac: ev(t0 + 0.6, 0.7) });
  txt('(Mind Reading)', CX, 770, 40, CHALK_C, { align: 'center', weight: 600, frac: ev(t0 + 1.1, 0.5) });
  chalkLine([[300, 830], [780, 830]], ev(t0 + 1.4, 0.4), { w: 5 });

  withT(CX, 1150, -0.02, popS(tAssume), () => {
    pp(pR(-360, -100, 720, 200, 22), PR.creamL, { key: 'assume_card', sb: 14, sy: 7, tex: 0.4 });
    const l1 = 'MẶC ĐỊNH MÌNH BIẾT', l2 = 'HỌ ĐANG NGHĨ GÌ';
    const sz = Math.min(fitSize(l1, 640, 46), fitSize(l2, 640, 46));
    txt(l1, 0, -26, sz, PR.navy, { align: 'center', base: 'middle', weight: 800 });
    txt(l2, 0, 38, sz, PR.red, { align: 'center', base: 'middle', weight: 800 });
  });
  prBurst(CX, 1150, VW('distortion', 'nghĩ').t0);

  prStar(130, 1320, 30, PR.pink);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'phones', mood: 'wow', look: -20, key: 'b4' });
  prSign('BẪY "ĐỌC TÂM TRÍ"', { kicker: KICK });
  prChips();
};

SCENES.action = () => {   // S5a: tự hỏi — có bằng chứng nào không?
  const tAsk = VW('action', 'hỏi').t0, tProof = VW('action', 'bằng').t0, tConc = VW('action', 'kết').t0;
  prWall('#2f5252', { streak: 280, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  withT(CX, 740, 0, popS(tAsk), () => {
    pp(pR(-390, -190, 780, 380, 24), '#3e6a6a', { key: 'act1', sb: 16, sy: 8, tex: 0.45 });
    txt('TỰ HỎI', 0, -110, 34, PR.mustard, { align: 'center', base: 'middle', weight: 800 });
    const lines = ['"Mình có bằng chứng nào', 'cho kết luận này không?"'];
    const sz = Math.min(...lines.map((l) => fitSize(l, 700, 52)));
    lines.forEach((l, i) => txt(l, 0, -10 + i * 76, sz, PR.creamL, { align: 'center', base: 'middle', weight: 800 }));
  });

  withT(CX, 1170, 0.02, popS(tConc), () => {
    pp(pR(-280, -60, 560, 120, 14), '#f3e3a5', { key: 'concl', sb: 10, sy: 5, tex: 0.5 });
    const s = 'KẾT LUẬN: "HỌ GIẬN MÌNH"';
    txt(s, 0, 2, fitSize(s, 500, 34), PR.ink, { align: 'center', base: 'middle', weight: 800 });
  });
  const gk = popS(tProof);
  if (gk > 0.01) m2Glass(lerp(900, 790, EZ.o3(ev(tConc, 0.6))), 1050, 76, gk);

  prClock(960, 400, 60, 5, 0, 'clk5');
  prStar(130, 1320, 34, PR.mustard);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'neutral', look: -25, key: 'b5', hold: propNotebook(0.1) });
  prSign('KIỂM TRA BẰNG CHỨNG', { kicker: KICK });
  prChips();
};

SCENES.action2 = () => {   // S5b: hỏi thẳng thay vì tự viết tiếp câu chuyện
  const tTalk = VW('action', 'trao').t0, tSend = VW('action', 'tiếp', 0).t0, tWrite = VW('action', 'viết').t0;
  prWall(TEAL, { streak: 640, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });

  const msg = 'Mọi chuyện ổn chứ?';
  m2Phone(330, 840, 0.92, { sent2: TT > tTalk ? msg : null, sent2Frac: TT > tSend ? 1 : ev(tTalk, Math.max(0.3, tSend - tTalk - 0.05)) });

  prThought(770, 760, 330, 230, 770, 760, 'KỊCH BẢN', { t: E0 + 0.05, key: 'scr', size: 42 });
  prCross(770, 900, tWrite);
  prStamp('HỎI TRỰC TIẾP', CX, 1330, PR.green, VW('action', 'trực').t0, { rot: -0.04, size: 52 });

  prClock(960, 400, 60, 5, 10, 'clk5b');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: TT > tSend ? 'happy' : 'neutral', look: -25, key: 'b5b' });
  prSign('HỎI THẲNG, ĐỪNG ĐOÁN', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: lưu video
  const t0 = E0, tSave = VW('cta', 'lưu').t0;
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(190, 420, 36, PR.mustard);
  prStar(880, 390, 28, PR.pink);
  prStar(540, 340, 44, PR.orange);
  prClock(960, 560, 60, 5, 15, 'clk6');

  prCommentBox(CX, 820, 'LƯU VIDEO NÀY', t0 + 0.5, { hint: 'Lưu cho lần chờ tin nhắn…' });

  withT(CX, 1140, -0.03, popS(tSave), () => {
    pp(pG([[-110, -150], [110, -150], [110, 150], [0, 80], [-110, 150]]), PR.mustard, { key: 'bmk', sb: 16, sy: 8, tex: 0.5 });
    pp(pG([[-110, -150], [110, -150], [110, -110], [-110, -110]]), PR.yellow, { shadow: false, tex: 0.4 });
  });

  prNote(150, 1240, 120, 140, '#f3e3a5', -0.04, 'note6');

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('LƯU LẠI KHI CẦN NHÉ!', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['reality', 'những', 0, 'reality2'],
  ['action', 'nếu', 0, 'action2'],
];
function SFX_CUES() {
  const cues = [];
  cues.push({ k: 'pop', t: 0.3 });
  ['tưởng', 'ra', 'câu'].forEach((w) => cues.push({ k: 'pop', t: VW('hook', w).t0 }));
  ['giận', 'sai', 'thích'].forEach((w) => cues.push({ k: 'tick', t: VW('overthink', w).t0 }));
  cues.push({ k: 'pop', t: VW('reality', 'nhìn').t0 });
  cues.push({ k: 'pop', t: VW('reality', 'trả').t0 });
  cues.push({ k: 'pop', t: VW('reality', 'phần').t0 });
  cues.push({ k: 'thud', t: VW('reality', 'suy').t0 });
  cues.push({ k: 'chime', t: VW('distortion', 'mặc').t0 });
  cues.push({ k: 'pop', t: VW('action', 'hỏi').t0 });
  cues.push({ k: 'pop', t: VW('action', 'kết').t0 });
  const tTalk = VW('action', 'trao').t0, tSend = VW('action', 'tiếp', 0).t0;
  cues.push({ k: 'type', t: tTalk, n: 10, d: Math.max(0.3, tSend - tTalk - 0.05) });
  cues.push({ k: 'pop', t: tSend });
  cues.push({ k: 'thud', t: VW('action', 'trực').t0 });
  const ctaL = VL('cta');
  cues.push({ k: 'type', t: ctaL.t0 + 0.5, n: 14, d: 0.45 });
  cues.push({ k: 'pop', t: VW('cta', 'lưu').t0 });
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
