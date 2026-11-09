// =====================================================================
//  TIDU MIND 07 — "Nói 'không' có phải là ích kỷ?"
//  Ranh giới cá nhân & Thói quen làm hài lòng (People Pleasing & Boundaries).
//  Mascot: brainy() (Tidu Mind brain). Theme: teal #2e4f4f.
// =====================================================================
BRAINY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const BRAINY_X = 880, BRAINY_Y = 1790;
const KICK = 'TIDU MIND · RANH GIỚI';
const TEAL = '#2e4f4f';
const TEAL2 = '#355555';

const SCENES = {};
const m7W = (word, n = 0, id) => VW(id, word, n).t0;

// a taped carton with a cream label, dropping in from above at t
function m7Box(cx, cy, w, h, label, col, t, rot = 0) {
  if (TT < t) return;
  const y = lerp(cy - 360, cy, EZ.o3(ev(t, 0.28)));
  withT(cx, y, rot, 1, () => {
    pp(pR(-w / 2, -h / 2, w, h, 10), col, { key: 'm7box' + label, sb: 12, sy: 6, tex: 0.5 });
    pp(pR(-22, -h / 2, 44, h, 0), '#d8c09a', { key: 'm7tape' + label, shadow: false, tex: 0.4 });
    const lw = w - 90;
    pp(pR(-lw / 2, -26, lw, 52, 6), PR.creamL, { key: 'm7lab' + label, sb: 4, sy: 2, tex: 0.35 });
    txt(label, 0, 2, fitSize(label, lw - 30, 30), PR.char, { align: 'center', base: 'middle', weight: 800 });
  });
}
const m7Heart = (cx, cy, s) => () => {
  ctx.moveTo(cx, cy + s * 0.9);
  ctx.bezierCurveTo(cx - s * 1.6, cy - s * 0.1, cx - s * 0.7, cy - s * 1.25, cx, cy - s * 0.45);
  ctx.bezierCurveTo(cx + s * 0.7, cy - s * 1.25, cx + s * 1.6, cy - s * 0.1, cx, cy + s * 0.9);
  ctx.closePath();
};
// a cream paper tag with centred text
function m7Tag(cx, cy, w, h, str, fill = PR.creamL, ink = PR.navy, size = 34, key = 'm7tag') {
  pp(pR(cx - w / 2, cy - h / 2, w, h, 10), fill, { key: key + str, sb: 10, sy: 5, tex: 0.45 });
  txt(str, cx, cy + 2, fitSize(str, w - 36, size), ink, { align: 'center', base: 'middle', weight: 800 });
}
function m7Stroke(fn, col, lw) {
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); fn(); ctx.stroke(); ctx.restore();
}
// a small wall plant in a pot (background life)
function m7Plant(x, y, key) {
  [[-0.5, 70], [0, 90], [0.5, 70]].forEach(([a, l], i) => withT(x, y - 40, a, 1, () => pp(pE(0, -l / 2, 20, l / 2), '#5f9f52', { key: key + 'lf' + i, sb: 6, sy: 3, tex: 0.5 })));
  pp(pG([[x - 44, y - 44], [x + 44, y - 44], [x + 32, y + 30], [x - 32, y + 30]]), PR.orange, { key: key + 'pot', sb: 8, sy: 4, tex: 0.5 });
}
// the picket fence: pointed cream pickets on two rails, spanning x0..x1, pickets standing on yb
function m7Fence(x0, x1, yb, h, k, key) {
  if (k <= 0.01) return;
  withT((x0 + x1) / 2, yb, 0, 1, () => {
    ctx.save(); ctx.scale(1, k);
    const hw = (x1 - x0) / 2;
    pp(pR(-hw, -h * 0.72, hw * 2, 30, 6), '#d9cfb8', { key: key + 'r1', sb: 8, sy: 4, tex: 0.5 });
    pp(pR(-hw, -h * 0.3, hw * 2, 30, 6), '#d9cfb8', { key: key + 'r2', sb: 8, sy: 4, tex: 0.5 });
    for (let x = -hw + 30; x <= hw - 30; x += 72) pp(pG([[x - 25, 0], [x - 25, -h + 34], [x, -h], [x + 25, -h + 34], [x + 25, 0]]), PR.creamL, { key: key + 'p' + x, sb: 10, sy: 5, tex: 0.5 });
    ctx.restore();
  });
}

// ---- SCENES ----

SCENES.hook = () => {   // S1: Chồng việc nhận giúp người khác cao dần đến quá tải
  const W1 = (w, n) => m7W(w, n, 'hook');
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  pp(pR(60, 1468, W - 120, 32, 4), PR.wood, { key: 'flb1', sb: 10, sy: 5, tex: 0.6 });
  prNote(160, 560, 150, 180, PR.creamL, -0.05, 'm7n1');
  prClock(920, 520, 70, 3, 30, 'clk1');
  prStar(140, 400, 30, PR.mustard);
  prStar(760, 420, 24, PR.pink);

  // the desk the pile grows on
  pp(pR(170, 1290, 740, 36, 8), PR.wood, { key: 'm7desk', sb: 12, sy: 6, tex: 0.6 });
  [210, 840].forEach((lx) => pp(pR(lx, 1326, 30, 150, 4), PR.woodD, { key: 'm7leg' + lx, sb: 8, sy: 4, tex: 0.5 }));

  const tq = W1('quá'), wob = (i) => Math.sin(TT * 7 + i * 1.3) * 0.012 * i * ev(tq, 0.3);
  m7Box(540, 1232, 480, 104, 'VIỆC CỦA MÌNH', '#a07850', -1, wob(0));
  m7Box(540, 1124, 450, 104, 'NHỜ VẢ ĐỒNG NGHIỆP', '#b88a5e', W1('giúp'), wob(1));
  m7Box(540, 1016, 420, 104, 'VIỆC CỦA BẠN BÈ', '#c89a6e', W1('mọi'), wob(2));
  m7Box(540, 908, 390, 104, 'DỰ ÁN NGOÀI GIỜ', '#a8805a', W1('dù'), wob(3));
  prStamp('QUÁ TẢI!', 540, 690, PR.red, tq, { rot: -0.08, size: 88 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'nightcap', mood: TT < tq ? 'flat' : 'wow', look: -30, key: 'b1' });
  prSign('ĐỒNG Ý DÙ ĐÃ QUÁ TẢI?', { kicker: KICK });
  prChips();
};

SCENES.fear = () => {   // S2a: Sợ từ chối vì sợ người khác thất vọng
  const W2 = (w, n) => m7W(w, n, 'fear');
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(920, 1180, 60, 3, 45, 'clk2');
  prStar(150, 1260, 30, PR.mustard);
  m7Plant(150, 1180, 'm7p2');

  // someone off-frame asks for a favour
  prSpeech(540, 470, 760, 130, 150, 600, 'Giúp mình việc này nhé?', { t: E0 + 0.2, key: 'm7ask', size: 50 });

  // the fear: a disappointed face in a thought bubble
  const tf = W2('vì');
  prThought(540, 930, 640, 460, 790, 1340, '', { t: tf, key: 'm7th' });
  const k = popS(tf + 0.1);
  if (k > 0.01) withT(540, 890, 0, k, () => {
    pp(pE(0, 0, 140, 140), '#f0c8a0', { key: 'm7face', sb: 10, sy: 5, tex: 0.45 });
    pp(pE(-48, -10, 14, 18), PR.ink, { key: 'm7eyeL', shadow: false, tex: 0.2 });
    pp(pE(48, -10, 14, 18), PR.ink, { key: 'm7eyeR', shadow: false, tex: 0.2 });
    m7Stroke(() => { ctx.moveTo(-74, -58); ctx.lineTo(-28, -44); ctx.moveTo(74, -58); ctx.lineTo(28, -44); }, PR.ink, 9);
    m7Stroke(() => ctx.arc(0, 92, 48, Math.PI * 1.2, Math.PI * 1.8), PR.ink, 10);
    if (TT >= W2('thất')) pp(() => { ctx.moveTo(62, 12); ctx.quadraticCurveTo(82, 46, 62, 56); ctx.quadraticCurveTo(42, 46, 62, 12); }, PR.sky, { key: 'm7tear', shadow: false, tex: 0.3 });
  });
  if (TT >= W2('thất')) txt('Họ sẽ thất vọng?', 540, 1110, 42, PR.navy, { align: 'center', base: 'middle', weight: 800 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: 'flat', look: -35, key: 'b2' });
  prSign('SỢ AI ĐÓ THẤT VỌNG', { kicker: KICK });
  prChips();
};

SCENES.fear2 = () => {   // S2b: Đồng ý mọi việc → thời gian cho ưu tiên khác bị thu hẹp
  const W2 = (w, n) => m7W(w, n, 'fear');
  prWall(TEAL, { streak: 300, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 420, 30, PR.mustard);
  prStar(930, 430, 24, PR.pink);
  m7Plant(150, 1180, 'm7p3');

  m7Tag(540, 470, 470, 64, 'THỜI GIAN CỦA BẠN', PR.navy, PR.creamL, 34, 'm7tt');
  const cx = 540, cy = 860, r = 300;
  const f = 0.22 * EZ.o3(ev(W2('đồng'), 0.4)) + 0.2 * EZ.o3(ev(W2('tất'), 0.4))
    + 0.16 * EZ.o3(ev(W2('việc'), 0.4)) + 0.2 * EZ.o3(ev(W2('thu'), 0.5));
  pp(pE(cx, cy, r + 22, r + 22), PR.creamL, { key: 'm7dial', sb: 18, sy: 9, tex: 0.5 });
  pp(pE(cx, cy, r, r), PR.green, { key: 'm7green', shadow: false, tex: 0.5 });
  const a0 = -Math.PI / 2;
  if (f > 0.005) pp(() => { ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a0, a0 + f * TAU); ctx.closePath(); }, PR.orange, { key: 'm7orange', shadow: false, tex: 0.5 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; m7Stroke(() => { ctx.moveTo(cx + Math.cos(a) * (r + 4), cy + Math.sin(a) * (r + 4)); ctx.lineTo(cx + Math.cos(a) * (r + 18), cy + Math.sin(a) * (r + 18)); }, PR.char, 5); }
  const ha = a0 + TT * 1.6;
  m7Stroke(() => { ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ha) * r * 0.7, cy + Math.sin(ha) * r * 0.7); }, PR.char, 12);
  pp(pE(cx, cy, 22, 22), PR.char, { key: 'm7hub', sb: 6, sy: 3, tex: 0.3 });

  // legend: what fills the day vs what shrinks
  const squeeze = ev(W2('thu'), 0.3);
  withT(330, 1236, 0, popS(W2('đồng')), () => {
    pp(pR(-190, -32, 380, 64, 10), PR.creamL, { key: 'm7lg1', sb: 8, sy: 4, tex: 0.45 });
    pp(pR(-172, -18, 36, 36, 6), PR.orange, { key: 'm7sw1', shadow: false, tex: 0.4 });
    txt('VIỆC NHẬN THÊM', 20, 2, fitSize('VIỆC NHẬN THÊM', 290, 30), PR.char, { align: 'center', base: 'middle', weight: 800 });
  });
  withT(750, 1236, 0, 1, () => {
    pp(pR(-190, -32, 380, 64, 10), PR.creamL, { key: 'm7lg2', sb: 8, sy: 4, tex: 0.45, rim: squeeze > 0 ? PR.red : null, rw: 6 });
    pp(pR(-172, -18, 36, 36, 6), PR.green, { key: 'm7sw2', shadow: false, tex: 0.4 });
    txt('ƯU TIÊN KHÁC', 20, 2, fitSize('ƯU TIÊN KHÁC', 290, 30), PR.char, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'detective', mood: squeeze > 0 ? 'wow' : 'flat', look: -35, key: 'b2b' });
  prSign('ƯU TIÊN KHÁC BỊ THU HẸP', { kicker: KICK });
  prChips();
};

SCENES.boundary = () => {   // S3a: Đặt ranh giới không có nghĩa là không quan tâm
  const W3 = (w, n) => m7W(w, n, 'boundary');
  prWall(TEAL, { streak: 460 });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(920, 520, 66, 4, 0, 'clk3');
  prStar(150, 420, 30, PR.pink);
  prStar(160, 640, 22, PR.mustard);

  const tf = W3('ranh');
  m7Fence(120, 960, 1290, 250, EZ.back(clamp((TT - tf) / 0.3)), 'm7f3');
  if (TT >= tf + 0.2) withT(540, 1150, -0.02, popS(tf + 0.2), () => m7Tag(0, 0, 340, 72, 'RANH GIỚI', PR.navy, PR.creamL, 40, 'm7rg'));

  const th = W3('quan');
  const hk = popS(th);
  if (hk > 0.01) withT(540, 690, 0, hk * (1 + Math.sin(TT * 6) * 0.025 * ev(th + 0.3, 0.2)), () => {
    pp(m7Heart(0, 0, 230), PR.red, { key: 'm7heart', sb: 18, sy: 9, tex: 0.5 });
    txt('VẪN', 0, -92, 50, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
    txt('QUAN TÂM', 0, -30, 50, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: TT < th ? 'neutral' : 'happy', look: -25, key: 'b3' });
  prSign('ĐẶT RANH GIỚI LÀNH MẠNH', { kicker: KICK });
  prChips();
};

SCENES.boundary2 = () => {   // S3b: Nói rõ điều mình có thể và không thể đảm nhận
  const W3 = (w, n) => m7W(w, n, 'boundary');
  prWall(TEAL2, { streak: 380, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  m7Fence(120, 960, 1290, 170, 1, 'm7f3b');
  prStar(150, 420, 30, PR.mustard);
  prStar(930, 420, 24, PR.pink);

  const card = (x, t, fill, head, items, mark) => {
    const k = popS(t); if (k <= 0.01) return;
    withT(x, 840, x < 540 ? -0.02 : 0.02, k, () => {
      pp(pR(-190, -250, 380, 500, 18), fill, { key: 'm7c' + head, sb: 16, sy: 8, tex: 0.5 });
      txt(head, 0, -150, fitSize(head, 320, 54), PR.creamL, { align: 'center', base: 'middle', weight: 800 });
      pp(pR(-150, -104, 300, 4, 2), PR.creamL, { shadow: false });
      items.forEach((s, i) => {
        if (TT < t + 0.25 + i * 0.3) return;
        pp(pR(-160, -70 + i * 110, 320, 84, 10), PR.creamL, { key: 'm7i' + s, sb: 6, sy: 3, tex: 0.4 });
        txt(s, 0, -28 + i * 110, fitSize(s, 280, 32), PR.char, { align: 'center', base: 'middle', weight: 800 });
      });
    });
    mark(x + 160, 572, t + 0.15, 44);
  };
  card(330, W3('có', 2), '#3e7a62', 'CÓ THỂ', ['Góp ý nhanh', 'Gửi tài liệu', 'Giúp cuối tuần'], prCheck);
  card(750, W3('không', 2), '#9e4c4c', 'KHÔNG THỂ', ['Làm thay cả dự án', 'Tăng ca tối nay', 'Trực thay cả tuần'], prCross);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'mortar', mood: 'happy', look: -25, key: 'b3b' });
  prSign('NÓI RÕ ĐIỀU MÌNH NHẬN ĐƯỢC', { kicker: KICK });
  prChips();
};

SCENES.sayno = () => {   // S4a: Im lặng rồi khó chịu
  const W4 = (w, n) => m7W(w, n, 'sayno');
  prWall(TEAL2, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prClock(920, 1180, 60, 4, 15, 'clk4');
  prStar(150, 420, 30, PR.mustard);
  m7Plant(150, 1180, 'm7p4');

  // the grudge: a storm cloud gathering
  const tc = W4('khó');
  const ck = popS(tc);
  if (ck > 0.01) withT(540 + Math.sin(TT * 40) * 3 * ev(tc + 0.25, 0.1), 660, 0, ck, () => {
    pp(pG([[30, 70], [-40, 210], [10, 200], [-30, 330], [80, 170], [30, 180], [70, 70]]), PR.yellow, { key: 'm7bolt', sb: 10, sy: 5, tex: 0.4 });
    pp(() => {
      ctx.ellipse(0, 20, 290, 110, 0, 0, TAU);
      ctx.moveTo(-40, -50); ctx.ellipse(-150, -40, 120, 100, 0, 0, TAU);
      ctx.moveTo(150, -80); ctx.ellipse(10, -80, 150, 130, 0, 0, TAU);
      ctx.moveTo(280, -30); ctx.ellipse(160, -30, 120, 100, 0, 0, TAU);
    }, '#4a5560', { key: 'm7cloud', sb: 18, sy: 9, tex: 0.55 });
    txt('KHÓ CHỊU', 0, 10, 60, PR.creamL, { align: 'center', base: 'middle', weight: 800 });
  });

  // the silence: a speech bubble with nothing but dots
  const ts = W4('im');
  prSpeech(500, 1080, 460, 190, 790, 1340, '', { t: ts, key: 'm7dots' });
  if (TT >= ts + 0.15) [-90, 0, 90].forEach((dx, i) => pp(pE(500 + dx, 1080, 22, 22), PR.greyD, { key: 'm7dot' + i, shadow: false, tex: 0.3 }));
  if (TT >= ts + 0.15) txt('IM LẶNG', 500, 1210, 34, PR.creamL, { align: 'center', base: 'middle', weight: 800 });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'flat', look: -25, key: 'b4' });
  prSign('IM LẶNG RỒI KHÓ CHỊU', { kicker: KICK });
  prChips();
};

SCENES.sayno2 = () => {   // S4b: Câu từ chối bình tĩnh: "Mình không thể giúp việc này hôm nay."
  const W4 = (w, n) => m7W(w, n, 'sayno');
  prWall(TEAL, { streak: 420, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });
  prStar(150, 1250, 30, PR.mustard);
  prStar(930, 1150, 24, PR.pink);
  m7Plant(150, 1180, 'm7p5');

  m7Tag(540, 480, 520, 70, 'THAY VÀO ĐÓ, HÃY NÓI:', PR.navy, PR.creamL, 36, 'm7say');
  const tb = W4('nói');
  prSpeech(540, 820, 880, 380, 790, 1340, '', { t: tb, key: 'm7no' });
  if (TT >= tb + 0.1) {
    const lines = [['Mình', 'không', 'thể', 'giúp'], ['việc', 'này', 'hôm', 'nay.']];
    const sz = fitSize('Mình không thể giúp', 720, 70), sp = txtW(' ', sz);
    lines.forEach((ws, li) => {
      const full = ws.join(' ');
      let x = 540 - txtW(full, sz) / 2;
      ws.forEach((w) => {
        const tw = txtW(w, sz);
        if (TT >= W4(w, w === 'thể' ? 1 : 0)) txt(w, x, 770 + li * 100, sz, li ? PR.redD : PR.navy, { base: 'middle', weight: 800 });
        x += tw + sp;
      });
    });
  }
  prCheck(930, 650, W4('nay'), 50);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'beret', mood: 'happy', look: -25, key: 'b4b' });
  prSign('TỪ CHỐI RÕ RÀNG, BÌNH TĨNH', { kicker: KICK });
  prChips();
};

SCENES.healthy = () => {   // S5: Quan hệ lành mạnh: cân bằng giữa quan tâm và trao đổi về giới hạn
  const W5 = (w, n) => m7W(w, n, 'healthy');
  prWall(TEAL2, { streak: 320, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: false });
  prClock(920, 520, 66, 4, 30, 'clk5');
  prStar(150, 420, 30, PR.mustard);
  prStar(170, 1250, 24, PR.pink);

  const tL = W5('quan', 1), tR = W5('trao');
  const th = TT < tR ? springMove(tL, 0, -0.14, SPRING.playful) : springMove(tR, -0.14, 0, SPRING.playful);
  const px = 540, py = 580, arm = 280;
  // post and base
  pp(pG([[px - 150, 1270], [px + 150, 1270], [px + 100, 1222], [px - 100, 1222]]), PR.woodD, { key: 'm7base', sb: 12, sy: 6, tex: 0.5 });
  pp(pR(px - 18, py, 36, 640, 8), PR.wood, { key: 'm7post', sb: 10, sy: 5, tex: 0.5 });
  // pans hang from the beam ends
  [-1, 1].forEach((sd) => {
    const ex = px + Math.cos(th) * arm * sd, ey = py + Math.sin(th) * arm * sd, pY = ey + 300;
    m7Stroke(() => { ctx.moveTo(ex, ey); ctx.lineTo(ex - 130, pY); ctx.moveTo(ex, ey); ctx.lineTo(ex + 130, pY); }, PR.greyD, 5);
    const t = sd < 0 ? tL : tR, k = popS(t);
    if (k > 0.01) withT(ex, pY - 14, 0, k, () => {
      if (sd < 0) {
        pp(m7Heart(0, -70, 76), PR.red, { key: 'm7h5', sb: 12, sy: 6, tex: 0.5 });
      } else {
        pp(pR(-110, -150, 220, 120, 26), PR.creamL, { key: 'm7sp5', sb: 10, sy: 5, tex: 0.45 });
        pp(pG([[-40, -32], [-70, 6], [0, -32]]), PR.creamL, { key: 'm7sp5t', shadow: false, tex: 0.45 });
        [-60, -20, 20, 60].forEach((x) => pp(pG([[x - 12, -50], [x - 12, -112], [x, -128], [x + 12, -112], [x + 12, -50]]), PR.tan, { key: 'm7sp5p' + x, shadow: false, tex: 0.4 }));
        pp(pR(-80, -100, 160, 12, 4), PR.tan, { key: 'm7sp5r', shadow: false, tex: 0.4 });
      }
    });
    pp(pG([[ex - 150, pY], [ex + 150, pY], [ex + 110, pY + 56], [ex - 110, pY + 56]]), PR.mustard, { key: 'm7pan' + sd, sb: 12, sy: 6, tex: 0.5 });
    if (TT >= t) m7Tag(ex, pY + 110, 300, 64, sd < 0 ? 'QUAN TÂM' : 'TRAO ĐỔI GIỚI HẠN', PR.creamL, PR.navy, 32, 'm7pt');
  });
  withT(px, py, th, 1, () => pp(pR(-arm - 20, -14, (arm + 20) * 2, 28, 10), PR.woodL, { key: 'm7beam', sb: 10, sy: 5, tex: 0.5 }));
  pp(pE(px, py, 30, 30), PR.mustard, { key: 'm7piv', sb: 8, sy: 4, tex: 0.4 });
  prCheck(540, 430, W5('hạn'), 50);

  brainy(BRAINY_X, BRAINY_Y, { hat: 'halo', mood: 'happy', look: -20, key: 'b5' });
  prSign('QUAN TÂM & GIỚI HẠN', { kicker: KICK });
  prChips();
};

SCENES.cta = () => {   // S6: Comment box CTA
  const W6 = (w, n) => m7W(w, n, 'cta');
  prWall(TEAL, { streak: 350, panel: 'rgba(255,255,255,0.03)' });
  prFloor(1500, PR.woodD, { studs: true });

  prBunting(260);
  prStar(150, 420, 30, PR.mustard);
  prStar(930, 420, 24, PR.pink);
  prClock(930, 640, 54, 4, 45, 'clk6');

  prSpeech(540, 560, 420, 150, 420, 700, 'KHÔNG?', { t: W6('không'), key: 'm7ctab', size: 70, color: PR.redD });
  prCommentBox(CX, 840, 'TÌNH HUỐNG KHÓ', E0 + 0.5, { hint: 'Tình huống nào bạn khó nói không?' });

  [['NHỜ VIỆC NGOÀI GIỜ', 250, 'tình'], ['CHO MƯỢN TIỀN', 540, 'huống'], ['MỘT BUỔI HẸN', 830, 'nào']].forEach(([s, x, w], i) => {
    const k = popS(W6(w)); if (k <= 0.01) return;
    withT(x, 1070, [-0.03, 0.02, -0.02][i], k, () => m7Tag(0, 0, 260, 120, s, [PR.yellow, PR.pink, PR.sky][i], PR.char, 32, 'm7cta'));
  });

  brainy(BRAINY_X, BRAINY_Y, { hat: 'party', mood: 'happy', key: 'b6', look: -20 });
  prSign('KHÓ NÓI KHÔNG NHẤT KHI NÀO?', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [
  ['fear', 'nhưng', 0, 'fear2'],
  ['boundary', 'nó', 0, 'boundary2'],
  ['sayno', 'bạn', 0, 'sayno2'],
];
function SFX_CUES() {
  const W = (id, w, n) => VW(id, w, n).t0;
  const cues = [];
  ['giúp', 'mọi', 'dù'].forEach((w) => cues.push({ k: 'pop', t: W('hook', w) }));
  cues.push({ k: 'thud', t: W('hook', 'quá') });
  cues.push({ k: 'pop', t: W('fear', 'vì') });
  ['đồng', 'tất', 'việc', 'thu'].forEach((w) => cues.push({ k: 'tick', t: W('fear', w) }));
  cues.push({ k: 'thud', t: W('boundary', 'ranh') });
  cues.push({ k: 'pop', t: W('boundary', 'quan') });
  cues.push({ k: 'pop', t: W('boundary', 'có', 2) });
  cues.push({ k: 'pop', t: W('boundary', 'không', 2) });
  cues.push({ k: 'pop', t: W('sayno', 'im') });
  cues.push({ k: 'thud', t: W('sayno', 'khó') });
  cues.push({ k: 'pop', t: W('sayno', 'nói') });
  cues.push({ k: 'chime', t: W('sayno', 'nay') });
  cues.push({ k: 'pop', t: W('healthy', 'quan', 1) });
  cues.push({ k: 'pop', t: W('healthy', 'trao') });
  cues.push({ k: 'chime', t: W('healthy', 'hạn') });
  const ctaL = VL('cta');
  cues.push({ k: 'type', t: ctaL.t0 + 0.5, n: 16, d: 1.3 });
  ['tình', 'huống', 'nào'].forEach((w) => cues.push({ k: 'pop', t: W('cta', w) }));
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
