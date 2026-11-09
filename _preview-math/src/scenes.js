// Preview of the Tidu Math owl: t < 5 a hat × mood grid on the slate wall; t >= 5 the owl in place in a scene
const SCENES = {};
const HATS = ['mortar', 'propeller', 'chef', 'builder', 'crown', 'party', 'explorer'];
const MOODS = ['neutral', 'happy', 'wow', 'flat'];
const GW = W / 4, GH = H / 7;

SCENES.grid = () => {
  prWall(PR.slate, { streak: false });
  HATS.forEach((hat, row) => {
    MOODS.forEach((mood, col) => {
      const x = GW * col + GW / 2, y = GH * row + GH * 0.9;
      tidu(x, y, { s: 0.36, hat, mood, key: 'g' + row + col });
      if (row === 0) txt(mood, x, 26, 22, PR.navy, { align: 'center', weight: 800 });
      if (col === 0) txt(hat, 10, GH * row + 40, 20, PR.creamL, { weight: 800 });
    });
  });
};

SCENES.place = () => {
  prWall('#2b3b5e', { panel: 'rgba(255,255,255,0.04)', streak: 300 });
  prFloor(1500, PR.woodD, { trim: false });
  prBoard(90, 460, 900, 640, 'pb');
  chalk('3 + 4 = 7', 300, 820, 120, 1);
  tidu(880, 1800, { hat: 'propeller', mood: 'wow', hand: { x: -330, y: -340 }, hold: propStick(-0.5), key: 'pl' });
};
SCENES.side = () => {
  prWall('#583656', { streak: 400 });
  prFloor(1500, PR.floor, { trim: false });
  tidu(560, 1500, { view: 'side', walk: true, mood: 'happy', hat: 'explorer', hold: propPencil(-0.3), key: 'sd' });
  tidu(220, 1760, { s: 0.5, flip: true, mood: 'flat', hat: 'chef', key: 'sd2' });
};
const ERA_LIST = [[0, 5, () => SCENES.grid()], [5, 8, () => SCENES.place()], [8, DURATION, () => SCENES.side()]];
const ERA_BG = [PR.slate, '#2b3b5e', '#583656'];
const BRIDGES = [];
const TIMELINE = {
  fps: FPS, width: W, height: H, duration: DURATION, bpm: 90,
  shots: [{ id: 1, key: 'grid', era: 0, t0: 0, t1: 5, title: 'grid' }, { id: 2, key: 'place', era: 1, t0: 5, t1: 8, title: 'place' }, { id: 3, key: 'side', era: 2, t0: 8, t1: DURATION, title: 'side' }],
  cuts: [5, 8], morphs: [], cues: {},
  board: [{ t: 1, title: 'grid', sound: '', next: 'cut' }, { t: 6, title: 'place', sound: '', next: 'cut' }, { t: 9, title: 'side', sound: '', next: '' }],
};
window.TIMELINE = TIMELINE;
