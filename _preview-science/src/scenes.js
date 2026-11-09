// Preview of the Tidu Science flask: t < 5 a hat × mood grid; 5–8 a lab with the props; t >= 8 side view walking
const SCENES = {};
const HATS = ['goggles', 'astronaut', 'mortar', 'propeller', 'hardhat', 'explorer', 'party'];
const MOODS = ['neutral', 'happy', 'wow', 'flat'];
const GW = W / 4, GH = H / 7;

SCENES.grid = () => {
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: false });
  HATS.forEach((hat, row) => {
    MOODS.forEach((mood, col) => {
      const x = GW * col + GW / 2, y = GH * row + GH * 0.8;
      flasky(x, y, { s: 0.36, hat, mood, key: 'g' + row + col });
      if (row === 0) txt(mood, x, 26, 22, PR.creamL, { align: 'center', weight: 800 });
      if (col === 0) txt(hat, 10, GH * row + 40, 20, PR.mustard, { weight: 800 });
    });
  });
};

SCENES.place = () => {
  prWall(PR.slate, { streak: 300 });
  prFloor(1500, PR.woodD, { trim: false });
  prBoard(90, 460, 900, 640, 'pb');
  chalk('H₂O', 220, 760, 130, 1);
  prAtom(720, 740, 170, 'at');
  flasky(880, 1790, { hat: 'goggles', mood: 'wow', hand: { x: -300, y: -300 }, hold: propTube(-0.3), key: 'pl' });
};

SCENES.side = () => {
  prWall(PR.plum, { streak: 400 });
  prFloor(1500, PR.floor, { trim: false });
  flasky(600, 1480, { view: 'side', walk: true, mood: 'happy', hat: 'astronaut', key: 'sd' });
  flasky(230, 1770, { s: 0.5, flip: true, mood: 'flat', hat: 'hardhat', hold: propMagnet(0.1), key: 'sd2' });
};

const ERA_LIST = [[0, 5, () => SCENES.grid()], [5, 8, () => SCENES.place()], [8, DURATION, () => SCENES.side()]];
const ERA_BG = ['#2b3b5e', PR.slate, PR.plum];
const BRIDGES = [];
const TIMELINE = {
  fps: FPS, width: W, height: H, duration: DURATION, bpm: 90,
  shots: [{ id: 1, key: 'grid', era: 0, t0: 0, t1: 5, title: 'grid' }, { id: 2, key: 'place', era: 1, t0: 5, t1: 8, title: 'place' }, { id: 3, key: 'side', era: 2, t0: 8, t1: DURATION, title: 'side' }],
  cuts: [5, 8], morphs: [], cues: {},
  board: [{ t: 1, title: 'grid', sound: '', next: 'cut' }, { t: 6, title: 'place', sound: '', next: 'cut' }, { t: 9, title: 'side', sound: '', next: '' }],
};
window.TIMELINE = TIMELINE;
