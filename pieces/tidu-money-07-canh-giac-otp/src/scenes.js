// =====================================================================
//  TIDU MONEY 07 — "Một mã OTP có thể khiến bạn mất tiền"
//  Theme: Banking Security & Anti-Fraud
// =====================================================================
PIGGY_SCALE = 0.86;
F_HEAD = '"Be Vietnam Pro", "Avenir Next", sans-serif';
F_CHIP = 'Bevan, SuperClarendon, serif';
const PIGGY_X = 880, PIGGY_Y = 1790;
const KICK = 'TIDU MONEY · BẢO MẬT';
const SCENES = {};

// ---- HELPERS ----

// A smartphone showing incoming call or SMS
function tmPhone(cx, cy, callerStr, isAlert = false, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 340, h = 540;
    // Phone body
    pp(pR(-w / 2, -h / 2, w, h, 32), PR.char, { key: 'ph_body', sb: 18, sy: 9, tex: 0.35 });
    // Screen
    pp(pR(-w / 2 + 14, -h / 2 + 16, w - 28, h - 32, 22), isAlert ? '#2a1a1c' : '#14202b', { key: 'ph_screen', shadow: false, tex: 0.25 });

    // Speaker notch
    pp(pR(-45, -h / 2 + 28, 90, 8, 4), '#3a4450', { shadow: false, tex: false });

    // Incoming Call Info
    pp(pE(0, -90, 48, 48), isAlert ? PR.red : PR.navy, { key: 'ph_avatar', sb: 8, sy: 4, tex: 0.35 });
    txt('🏦', 0, -75, 42, PR.creamL, { align: 'center' });

    txt(callerStr, 0, -10, 22, PR.creamL, { align: 'center', weight: 800 });
    txt('Cuộc gọi đến...', 0, 22, 18, PR.grey, { align: 'center', weight: 600 });

    // Decline / Accept buttons
    pp(pE(-75, 140, 36, 36), PR.red, { key: 'ph_btn_dec', sb: 8, sy: 4, tex: 0.3 });
    txt('📞', -75, 150, 26, PR.creamL, { align: 'center' });

    pp(pE(75, 140, 36, 36), PR.green, { key: 'ph_btn_acc', sb: 8, sy: 4, tex: 0.3 });
    txt('📞', 75, 150, 26, PR.creamL, { align: 'center' });
  });
}

// SMS OTP Card
function tmOTPSMS(cx, cy, codeStr, s = 1) {
  withT(cx, cy, 0, s, () => {
    const w = 580, h = 240;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'otp_box', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 60, 16), PR.char, { shadow: false, tex: 0.35 });
    txt('📩 TIN NHẮN TỪ NGÂN HÀNG', 0, -h / 2 + 40, 22, PR.creamL, { align: 'center', weight: 800 });

    txt('Mã xác thực OTP của bạn là:', 0, -10, 22, PR.greyD, { align: 'center', weight: 700 });
    txt(codeStr, 0, 42, 48, PR.red, { align: 'center', weight: 800, font: F_MONO });
    txt('TUYỆT ĐỐI KHÔNG CHIA SẺ VỚI BẤT KỲ AI!', 0, 85, 18, PR.red, { align: 'center', weight: 800 });
  });
}

// =====================================================================
//  SCENE DEFINITIONS
// =====================================================================

// Scene 1 (hook): Có người tự xưng là ngân hàng và hỏi mã OTP của bạn. Bạn sẽ làm gì?
SCENES.hook = () => {
  const tHoi = VW('hook', 'hỏi').t0;

  prWall('#2a1a24', { streak: 400 });
  prFloor(1560, PR.char, { studs: true });
  prClock(190, 420, 68, 14, 20);

  // Ringing phone
  const vibrate = Math.sin(TT * 45) * 4;
  tmPhone(470 + vibrate, 720, 'TỔNG ĐÀI (GIẢ MẠO)', true, popS(E0 + 0.15));

  // Speech bubble asking for OTP
  withT(470, 1030, 0, popS(tHoi), () => {
    pp(pR(-240, -45, 480, 90, 14), PR.mustard, { key: 'hk_bubble', sb: 14, sy: 7, tex: 0.45 });
    txt('"Vui lòng đọc mã OTP gửi về máy!"', 0, 12, 22, PR.char, { align: 'center', weight: 800 });
  });

  // Piggy with visor flat/suspicious
  piggy(PIGGY_X, PIGGY_Y, { hat: 'visor', mood: 'flat', look: -15, key: 'p1' });

  prSign('HỎI MÃ OTP · BẠN SẼ LÀM GÌ?', { kicker: KICK });
  prChips();
};

// Scene 2 (scam): Dù họ nói tài khoản đang bị khóa hay có giao dịch bất thường, đừng đọc mã OTP, mật khẩu hoặc thông tin đăng nhập cho người khác.
SCENES.scam = () => {
  const tDung = VW('scam', 'đừng').t0;

  prWall(PR.navyD, { streak: 450 });
  prFloor(1560, PR.char, { studs: true });

  // OTP Card
  tmOTPSMS(470, 640, '8 4 9 2 0 1', popS(E0 + 0.15));

  // Big Red Cross over OTP
  prCross(470, 640, tDung + 0.2, 90);

  // Warning Banner
  withT(470, 920, 0, popS(tDung + 0.4), () => {
    pp(pR(-280, -60, 560, 120, 16), PR.red, { key: 'scam_ban', sb: 16, sy: 8, tex: 0.45 });
    txt('TUYỆT ĐỐI KHÔNG ĐỌC MÃ OTP!', 0, -12, 28, PR.creamL, { align: 'center', weight: 800 });
    txt('Không mật khẩu  ·  Không thông tin thẻ', 0, 28, 22, PR.creamL, { align: 'center', weight: 700 });
  });

  // Piggy bowler
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -16, key: 'p2' });

  prSign('TUYỆT ĐỐI KHÔNG CUNG CẤP OTP', { kicker: KICK });
  prChips();
};

// Scene 3 (fake): Kẻ gian có thể giả mạo số điện thoại, giao diện và cả giọng nói để tạo cảm giác đáng tin.
SCENES.fake = () => {
  prWall(PR.board, { streak: 500 });
  prFloor(1560, PR.woodD, { trim: false });

  // 3 Tricks Card
  const tricks = [
    { title: 'GIẢ MẠO SỐ ĐIỆN THOẠI', desc: 'Làm giả tên hiển thị Brandname', ic: '📞' },
    { title: 'GIẢ MẠO GIAO DIỆN WEB', desc: 'Đường link lạ giả web ngân hàng', ic: '🌐' },
    { title: 'GIẢ MẠO GIỌNG NÓI & AI', desc: 'Giọng đọc chuyên nghiệp như tổng đài', ic: '🎙️' }
  ];

  withT(470, 740, 0, popS(E0 + 0.15), () => {
    const w = 600, h = 460;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'fk_box', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.char, { shadow: false, tex: 0.35 });
    txt('3 THỦ ĐOẠN TINH VI CỦA KẺ GIAN', 0, -h / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });

    tricks.forEach((tr, i) => {
      const iy = -h / 2 + 125 + i * 105;
      pp(pR(-w / 2 + 25, iy, w - 50, 85, 12), '#fdf2f2', { key: 'fk_tr_' + i, sb: 6, sy: 3, tex: 0.35 });
      txt(tr.ic, -w / 2 + 65, iy + 52, 34, PR.char, { align: 'center' });
      txt(tr.title, -w / 2 + 115, iy + 38, 22, PR.red, { weight: 800 });
      txt(tr.desc, -w / 2 + 115, iy + 66, 19, PR.char, { weight: 700 });
    });
  });

  // Piggy mortar pointing
  piggy(PIGGY_X, PIGGY_Y, { hat: 'mortar', mood: 'neutral', look: -16, hold: propStick(-0.25), key: 'p3' });

  prSign('THỦ ĐOẠN GIẢ MẠO TINH VI', { kicker: KICK });
  prChips();
};

// Scene 4 (stop): Nếu nhận được yêu cầu đáng ngờ, hãy dừng tương tác.
SCENES.stop = () => {
  const tDung = VW('stop', 'dừng').t0;

  prWall(PR.plum, { streak: 450 });
  prFloor(1560, PR.woodD, { trim: false });

  // Red Hang Up Button & Stop sign
  withT(470, 680, 0, popS(E0 + 0.15), () => {
    pp(pE(0, -50, 80, 80), PR.red, { key: 'stop_circle', sb: 18, sy: 9, tex: 0.4 });
    txt('📞', 0, -32, 48, PR.creamL, { align: 'center' });
    txt('GÁC MÁY NGAY', 0, 75, 34, PR.char, { align: 'center', weight: 800 });
  });

  // Stamp: "DỪNG TƯƠNG TÁC"
  prStamp('DỪNG TƯƠNG TÁC NGAY!', 470, 960, PR.red, tDung + 0.2, { rot: -0.04, size: 36, from: 1.3 });

  // Piggy flat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'bowler', mood: 'flat', look: -15, key: 'p4' });

  prSign('DỪNG TƯƠNG TÁC NGAY LẬP TỨC', { kicker: KICK });
  prChips();
};

// Scene 5 (verify): Sau đó, tự truy cập ứng dụng hoặc liên hệ ngân hàng qua kênh chính thức mà bạn đã xác minh.
SCENES.verify = () => {
  prWall('#243b53', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // 2 Verification Steps Card
  withT(470, 740, 0, popS(E0 + 0.15), () => {
    const w = 600, h = 420;
    pp(pR(-w / 2, -h / 2, w, h, 18), PR.paperW, { key: 'vf_card', sb: 16, sy: 8, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 16), PR.teal, { shadow: false, tex: 0.35 });
    txt('TỰ KIỂM TRA CHÍNH THỨC', 0, -h / 2 + 52, 26, PR.creamL, { align: 'center', weight: 800 });

    // Step 1: App
    pp(pR(-270, -80, 540, 110, 14), '#edf7ed', { key: 'vf_s1', sb: 6, sy: 3, tex: 0.35 });
    txt('📱 BƯỚC 1: TỰ MỞ APP NGÂN HÀNG', -245, -35, 22, PR.char, { weight: 800 });
    txt('Kiểm tra trực tiếp biến động số dư và thông báo', -245, 0, 19, PR.greyD, { weight: 700 });

    // Step 2: Hotline
    pp(pR(-270, 50, 540, 110, 14), '#f6f3eb', { key: 'vf_s2', sb: 6, sy: 3, tex: 0.35 });
    txt('📞 BƯỚC 2: GỌI HOTLINE SAU MẶT THẺ', -245, 95, 22, PR.char, { weight: 800 });
    txt('Kênh hỗ trợ chính thống duy nhất được xác thực', -245, 130, 19, PR.greyD, { weight: 700 });
  });

  // Piggy tophat
  piggy(PIGGY_X, PIGGY_Y, { hat: 'tophat', mood: 'happy', look: -15, key: 'p5' });

  prSign('TỰ XÁC MINH CHÍNH THỨC', { kicker: KICK });
  prChips();
};

// Scene 6 (seconds): Chỉ vài giây kiểm tra có thể giúp bạn tránh một sai lầm lớn.
SCENES.seconds = () => {
  const tSai = VW('seconds', 'lớn').t0;

  prWall('#1a3a2a', { streak: 500 });
  prFloor(1560, PR.wood, { trim: false });

  // Stamp: "BẢO VỆ TÀI KHOẢN"
  prStamp('VÀI GIÂY TRÁNH MẤT TIỀN!', 470, 560, PR.mustard, E0 + 0.1, { rot: -0.03, size: 34, from: 1.25 });

  // CTA Card
  withT(470, 880, 0, popS(tSai + 0.2), () => {
    const w = 580, h = 360;
    pp(pR(-w / 2, -h / 2, w, h, 20), PR.paperW, { key: 'cta_box_07', sb: 18, sy: 9, tex: 0.45 });
    pp(pR(-w / 2, -h / 2, w, 82, 18), PR.money, { shadow: false, tex: 0.4 });
    txt('CÙNG NHAU CẢNH GIÁC', 0, -h / 2 + 52, 28, PR.creamL, { align: 'center', weight: 800 });

    txt('CHIA SẺ VIDEO NÀY', 0, 5, 32, PR.char, { align: 'center', weight: 800 });
    txt('cho người thân và bạn bè để cùng phòng tránh lừa đảo!', 0, 50, 21, PR.greyD, { align: 'center', weight: 700 });

    pp(pR(-180, 95, 360, 52, 12), PR.navy, { key: 'cta_btn_07', sb: 8, sy: 4, tex: 0.4 });
    txt('CHIA SẺ NGAY ↗️', 0, 130, 24, PR.creamL, { align: 'center', weight: 800 });
  });

  // Piggy party
  piggy(PIGGY_X, PIGGY_Y, { hat: 'party', mood: 'happy', look: -15, hold: propCoin(60), key: 'p6' });

  prSign('VÀI GIÂY TRÁNH MẤT TIỀN', { kicker: KICK });
  prChips();
};

// =====================================================================
//  SHOTS + TIMELINE
// =====================================================================
const SPLITS = [];

function SFX_CUES() {
  return [
    { k: 'pop', t: 0.1 },
    { k: 'tick', t: VW('hook', 'hỏi').t0 },
    { k: 'thud', t: VW('scam', 'đừng').t0 + 0.2 },
    { k: 'tick', t: VW('fake', 'giả').t0 },
    { k: 'thud', t: VW('stop', 'dừng').t0 + 0.2 },
    { k: 'chime', t: VW('verify', 'xác').t0 },
    { k: 'chime', t: VW('seconds', 'lớn').t0 + 0.2 }
  ];
}

const SHOT_LIST = VOICE.lines.map((l, i) => [i === 0 ? 0 : CUT(l.id), l.id])
  .concat(SPLITS.map(([id, w, n, key]) => [VW(id, w, n).t0 - 0.08, key])).sort((a, b) => a[0] - b[0]);
const ERA_LIST = SHOT_LIST.map(([t0, sc], i) => [t0, i + 1 < SHOT_LIST.length ? SHOT_LIST[i + 1][0] : DURATION, () => SCENES[sc]()]);
const TIMELINE = {
  width: W, height: H, fps: FPS, duration: DURATION, frames: NFRAMES, loop: LOOP_T, safe: SAFE, format: 'voice-cut',
  shots: SHOT_LIST.map(([t0, sc], i) => ({ id: i + 1, key: sc, era: i, t0, t1: ERA_LIST[i][1], title: sc })),
  cuts: SHOT_LIST.slice(1).map(([t0]) => t0), morphs: [], cues: {},
  acts: [{ name: 'reel', role: 'journey', t0: 0, t1: DURATION }],
  board: SHOT_LIST.map(([t0, sc], i) => ({ t: (t0 + ERA_LIST[i][1]) / 2 + 0.3, title: sc, sound: '', next: 'cut' })),
  narration: VOICE.lines.map((l) => ({ t0: l.t0, t1: l.t1, text: l.text })),
};
window.TIMELINE = TIMELINE;
