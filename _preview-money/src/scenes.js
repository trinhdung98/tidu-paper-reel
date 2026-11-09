// Preview of the Tidu Money pig: t < 5 a hat × mood grid; 5–8 the pig in place with a prop; t >= 8 side view walking
const SCENES = {};
const HATS = ['bowler', 'tophat', 'visor', 'mortar', 'nonla', 'newsboy', 'party'];
const MOODS = ['neutral', 'happy', 'wow', 'flat'];
const GW = W / 4, GH = H / 7;

SCENES.grid = () => {
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: false });
  HATS.forEach((hat, row) => {
    MOODS.forEach((mood, col) => {
      const x = GW * col + GW / 2, y = GH * row + GH * 0.82;
      piggy(x, y, { s: 0.36, hat, mood, key: 'g' + row + col });
      if (row === 0) txt(mood, x, 26, 22, PR.creamL, { align: 'center', weight: 800 });
      if (col === 0) txt(hat, 10, GH * row + 40, 20, PR.mustard, { weight: 800 });
    });
  });
};

SCENES.place = () => {
  prWall(PR.plum, { streak: 300 });
  prFloor(1500, PR.woodD, { trim: false });
  prCounter('TIẾT KIỆM', '500K', 540, 760, { s: 1.1 });
  prCoin(250, 1180, 70, 'c1'); prCoin(400, 1240, 56, 'c2');
  piggy(880, 1790, { hat: 'tophat', mood: 'happy', hand: { x: -320, y: -330 }, hold: propBill(-0.5), key: 'pl' });
};

SCENES.side = () => {
  prWall(PR.slate, { streak: 400 });
  prFloor(1500, PR.floor, { trim: false });
  piggy(600, 1500, { view: 'side', walk: true, mood: 'wow', hat: 'nonla', hold: propCoin(), key: 'sd' });
  piggy(230, 1760, { s: 0.5, flip: true, mood: 'flat', hat: 'visor', hold: propCalc(0.15), key: 'sd2' });
};

const ERA_LIST = [[0, 5, () => SCENES.grid()], [5, 8, () => SCENES.place()], [8, DURATION, () => SCENES.side()]];
const ERA_BG = ['#2b3b5e', PR.plum, PR.slate];
const BRIDGES = [];
const TIMELINE = {
  fps: FPS, width: W, height: H, duration: DURATION, bpm: 90,
  shots: [{ id: 1, key: 'grid', era: 0, t0: 0, t1: 5, title: 'grid' }, { id: 2, key: 'place', era: 1, t0: 5, t1: 8, title: 'place' }, { id: 3, key: 'side', era: 2, t0: 8, t1: DURATION, title: 'side' }],
  cuts: [5, 8], morphs: [], cues: {},
  board: [{ t: 1, title: 'grid', sound: '', next: 'cut' }, { t: 6, title: 'place', sound: '', next: 'cut' }, { t: 9, title: 'side', sound: '', next: '' }],
};
window.TIMELINE = TIMELINE;
