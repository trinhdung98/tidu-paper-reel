// Preview of the Tidu Mind brain: t < 5 a hat × mood grid; 5–8 a therapy room with the props; t >= 8 side view walking
const SCENES = {};
const HATS = ['nightcap', 'detective', 'mortar', 'beret', 'phones', 'halo', 'party'];
const MOODS = ['neutral', 'happy', 'wow', 'flat'];
const GW = W / 4, GH = H / 7;

SCENES.grid = () => {
  prWall('#2e4f4f', { panel: 'rgba(255,255,255,0.04)', streak: false });
  HATS.forEach((hat, row) => {
    MOODS.forEach((mood, col) => {
      const x = GW * col + GW / 2, y = GH * row + GH * 0.8;
      brainy(x, y, { s: 0.34, hat, mood, key: 'g' + row + col });
      if (row === 0) txt(mood, x, 26, 22, PR.creamL, { align: 'center', weight: 800 });
      if (col === 0) txt(hat, 10, GH * row + 40, 20, PR.mustard, { weight: 800 });
    });
  });
};

SCENES.place = () => {
  prWall('#2b3b5e', { streak: 300 });
  prFloor(1500, PR.woodD, { trim: false });
  prCouch(380, 1330, 0.8);
  prThought(420, 640, 560, 300, 760, 1150, 'Tại sao mình trì hoãn?', { key: 'th1' });
  brainy(880, 1790, { hat: 'detective', mood: 'wow', hand: { x: -300, y: -300 }, hold: propGlass(-0.4), key: 'pl' });
};

SCENES.side = () => {
  prWall(PR.plum, { streak: 400 });
  prFloor(1500, PR.floor, { trim: false });
  brainy(600, 1480, { view: 'side', walk: true, mood: 'happy', hat: 'nightcap', key: 'sd' });
  brainy(230, 1770, { s: 0.5, flip: true, mood: 'flat', hat: 'halo', hold: propNotebook(-0.15), key: 'sd2' });
};

const ERA_LIST = [[0, 5, () => SCENES.grid()], [5, 8, () => SCENES.place()], [8, DURATION, () => SCENES.side()]];
const ERA_BG = ['#2e4f4f', '#2b3b5e', PR.plum];
const BRIDGES = [];
const TIMELINE = {
  fps: FPS, width: W, height: H, duration: DURATION, bpm: 90,
  shots: [{ id: 1, key: 'grid', era: 0, t0: 0, t1: 5, title: 'grid' }, { id: 2, key: 'place', era: 1, t0: 5, t1: 8, title: 'place' }, { id: 3, key: 'side', era: 2, t0: 8, t1: DURATION, title: 'side' }],
  cuts: [5, 8], morphs: [], cues: {},
  board: [{ t: 1, title: 'grid', sound: '', next: 'cut' }, { t: 6, title: 'place', sound: '', next: 'cut' }, { t: 9, title: 'side', sound: '', next: '' }],
};
window.TIMELINE = TIMELINE;
