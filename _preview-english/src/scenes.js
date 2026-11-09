// Preview of the Tidu English parrot: t < 5 a hat × mood grid; 5–8 a classroom with the props; t >= 8 side view walking
const SCENES = {};
const HATS = ['mortar', 'guard', 'crown', 'cap', 'pirate', 'wizard', 'party'];
const MOODS = ['neutral', 'happy', 'wow', 'flat'];
const GW = W / 4, GH = H / 7;

SCENES.grid = () => {
  prWall(PR.plum, { panel: 'rgba(255,255,255,0.04)', streak: false });
  HATS.forEach((hat, row) => {
    MOODS.forEach((mood, col) => {
      const x = GW * col + GW / 2, y = GH * row + GH * 0.86;
      polly(x, y, { s: 0.34, hat, mood, key: 'g' + row + col });
      if (row === 0) txt(mood, x, 26, 22, PR.creamL, { align: 'center', weight: 800 });
      if (col === 0) txt(hat, 10, GH * row + 40, 20, PR.mustard, { weight: 800 });
    });
  });
};

SCENES.place = () => {
  prWall('#c9b28a', { streak: 300 });
  prFloor(1500, PR.woodD, { trim: false });
  prSpeech(470, 640, 640, 220, 820, 1040, 'Hello! I am Polly.', { key: 'sp1' });
  prBlock(200, 1380, 'A', PR.red, 1, -0.06); prBlock(380, 1400, 'B', PR.blue, 1, 0.04); prBlock(290, 1230, 'C', PR.green, 0.9, 0.02);
  polly(880, 1800, { hat: 'cap', mood: 'happy', hand: { x: -310, y: -360 }, hold: propCard('A', -0.2), key: 'pl' });
};

SCENES.side = () => {
  prWall(PR.slate, { streak: 400 });
  prFloor(1500, PR.floor, { trim: false });
  polly(600, 1480, { view: 'side', walk: true, mood: 'wow', hat: 'pirate', key: 'sd' });
  polly(230, 1770, { s: 0.5, flip: true, mood: 'flat', hat: 'wizard', hold: propBook(-0.1), key: 'sd2' });
};

const ERA_LIST = [[0, 5, () => SCENES.grid()], [5, 8, () => SCENES.place()], [8, DURATION, () => SCENES.side()]];
const ERA_BG = [PR.plum, '#c9b28a', PR.slate];
const BRIDGES = [];
const TIMELINE = {
  fps: FPS, width: W, height: H, duration: DURATION, bpm: 90,
  shots: [{ id: 1, key: 'grid', era: 0, t0: 0, t1: 5, title: 'grid' }, { id: 2, key: 'place', era: 1, t0: 5, t1: 8, title: 'place' }, { id: 3, key: 'side', era: 2, t0: 8, t1: DURATION, title: 'side' }],
  cuts: [5, 8], morphs: [], cues: {},
  board: [{ t: 1, title: 'grid', sound: '', next: 'cut' }, { t: 6, title: 'place', sound: '', next: 'cut' }, { t: 9, title: 'side', sound: '', next: '' }],
};
window.TIMELINE = TIMELINE;
