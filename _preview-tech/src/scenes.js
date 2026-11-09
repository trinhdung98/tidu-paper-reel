// Preview of the Tidu Tech robot: t < 5 a hat × mood grid; 5–8 a tech desk with the props; t >= 8 side view walking
const SCENES = {};
const HATS = ['headset', 'vr', 'beanie', 'drone', 'mortar', 'tinfoil', 'party'];
const MOODS = ['neutral', 'happy', 'wow', 'flat'];
const GW = W / 4, GH = H / 7;

SCENES.grid = () => {
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: false });
  HATS.forEach((hat, row) => {
    MOODS.forEach((mood, col) => {
      const x = GW * col + GW / 2, y = GH * row + GH * 0.86;
      botty(x, y, { s: 0.3, hat, mood, key: 'g' + row + col });
      if (row === 0) txt(mood, x, 26, 22, PR.creamL, { align: 'center', weight: 800 });
      if (col === 0) txt(hat, 10, GH * row + 40, 20, PR.mustard, { weight: 800 });
    });
  });
};

SCENES.place = () => {
  prWall('#1f2a36', { streak: 300 });
  prCircuit(80, 420, 920, 760, 'pc');
  prFloor(1500, PR.char, { trim: false });
  prSpeech(470, 560, 640, 200, 820, 980, 'AI là gì?', { key: 'sp1' });
  botty(880, 1790, { hat: 'headset', mood: 'happy', hand: { x: -300, y: -330 }, hold: propChip(-0.2), key: 'pl' });
};

SCENES.side = () => {
  prWall(PR.plum, { streak: 400 });
  prFloor(1500, PR.floor, { trim: false });
  botty(600, 1460, { view: 'side', walk: true, mood: 'wow', hat: 'drone', key: 'sd' });
  botty(230, 1760, { s: 0.5, flip: true, mood: 'flat', hat: 'tinfoil', hold: propPhone(-0.1), key: 'sd2' });
  botty(930, 1800, { s: 0.42, mood: 'neutral', hat: 'vr', hold: propWrench(-0.3), key: 'sd3' });
};

const ERA_LIST = [[0, 5, () => SCENES.grid()], [5, 8, () => SCENES.place()], [8, DURATION, () => SCENES.side()]];
const ERA_BG = ['#2b3b5e', '#1f2a36', PR.plum];
const BRIDGES = [];
const TIMELINE = {
  fps: FPS, width: W, height: H, duration: DURATION, bpm: 90,
  shots: [{ id: 1, key: 'grid', era: 0, t0: 0, t1: 5, title: 'grid' }, { id: 2, key: 'place', era: 1, t0: 5, t1: 8, title: 'place' }, { id: 3, key: 'side', era: 2, t0: 8, t1: DURATION, title: 'side' }],
  cuts: [5, 8], morphs: [], cues: {},
  board: [{ t: 1, title: 'grid', sound: '', next: 'cut' }, { t: 6, title: 'place', sound: '', next: 'cut' }, { t: 9, title: 'side', sound: '', next: '' }],
};
window.TIMELINE = TIMELINE;
