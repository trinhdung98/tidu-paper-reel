F_HEAD = '"Be Vietnam Pro", sans-serif';
F_CHIP = 'Bevan, serif';
const NF_BEATS = NARRATIVE.beats;
const NF_CHANNEL = NARRATIVE.channel || 'math';
const NF_MASCOTS = { math:tidu, money:piggy, mind:brainy, science:flasky, english:polly, tech:botty };
const NF_HATS = {
  math:['mortar','explorer','builder','crown','party'], money:['bowler','visor','newsboy','mortar','party'],
  mind:['detective','nightcap','beret','mortar','halo'], science:['explorer','goggles','hardhat','mortar','party'],
  english:['cap','pirate','wizard','mortar','crown'], tech:['headset','beanie','vr','mortar','party'],
};
const NF_WALLS = { math:'#355555', money:'#36523f', mind:'#3e3b59', science:'#30485b', english:'#36526b', tech:'#293e50' };
const NF_TIMES = NF_BEATS.map((b, i) => ({
  t0:i ? CUT(b.lines[0].id) : 0,
  t1:i + 1 < NF_BEATS.length ? CUT(NF_BEATS[i + 1].lines[0].id) : DURATION,
}));
const NF_PREVIEW = VOICE.preview === true;

function nfText(str, x, y, width, size = 42, color = PR.ink, maxLines = 3) {
  const words = String(str).split(/\s+/);
  let rows, fontSize = size;
  do {
    rows = [''];
    for (const word of words) {
      const i = rows.length - 1, next = rows[i] ? rows[i] + ' ' + word : word;
      if (txtW(next, fontSize) > width && rows[i]) rows.push(word);
      else rows[i] = next;
    }
    if (rows.length <= maxLines && rows.every((r) => txtW(r, fontSize) <= width)) break;
    fontSize -= 2;
  } while (fontSize > 12);
  rows.forEach((r, i) => txt(r, x, y + (i - (rows.length - 1) / 2) * fontSize * 1.35, fontSize, color, { align:'center', base:'middle' }));
}
function nfCard(str, x, y, w, h, color = PR.creamL, size = 42, inkColor = PR.ink) {
  pp(pR(x - w / 2, y - h / 2, w, h, 18), color, { key:'nf-card-' + x + '-' + y });
  if (str) nfText(str, x, y, w - 48, size, inkColor, Math.max(1, Math.floor((h - 30) / (size * 1.35))));
}
function nfArrow(x1, y1, x2, y2, fraction = 1, color = PR.mustard) {
  const x = lerp(x1, x2, fraction), y = lerp(y1, y2, fraction), a = Math.atan2(y2 - y1, x2 - x1);
  chalkLine([[x1,y1],[x,y]], 1, { color, w:8 });
  withT(x, y, a, fraction > 0.05 ? 1 : 0, () => pp(pG([[0,0],[-22,-12],[-22,12]]), color, { shadow:false }));
}
function nfLine(b) {
  let index = 0;
  b.lines.forEach((l, i) => { if (TT >= VL(l.id).t0) index = i; });
  const line = VL(b.lines[index].id);
  return { index, line, u:seg(TT, line.t0, line.t1) };
}
function nfMascot(i, mood = 'calm', x = 875, y = 1790, s = 0.52) {
  NF_MASCOTS[NF_CHANNEL](x, y, { s, hat:NF_HATS[NF_CHANNEL][i], mood, key:'nf-mascot' });
}
function nfWorld(i) {
  prWall(NF_WALLS[NF_CHANNEL], { panels:false, streak:460 });
  prFloor(1660, PR.woodD, { trim:false });
  pp(pR(90, 1335, 800, 12, 3), PR.woodL, { key:'nf-shelf' });
  for (let j = 0; j < 5; j++) {
    pp(pE(420 + j * 60, 365, j === i ? 12 : 7, j === i ? 12 : 7), j <= i ? PR.mustard : '#7c9292', { shadow:false });
  }
}
function nfHundredths(x, y, n, color) {
  pp(pR(x - 145, y - 145, 290, 290, 10), PR.paperW, { key:'nf-grid' });
  for (let k = 0; k < 100; k++) pp(pR(x - 134 + (k % 10) * 27, y - 134 + Math.floor(k / 10) * 27, 24, 24, 2), k < n ? color : '#d7dacf', { shadow:false, tex:false });
}
function nfQuestion(b, i) {
  const v = b.visual, { index, line } = nfLine(b), labels = v.items;
  const rule = i === 1 ? v.misconception : i === 3 ? v.answer : v.question;
  nfCard(rule, 540, 540, 800, 210, i === 1 ? '#f4d7b4' : PR.creamL, 48);
  labels.forEach((label, k) => {
    const x = labels.length === 1 ? 540 : 350 + k * 380;
    nfCard(label, x, 790, 340, 110, k ? '#bbd8e6' : '#a9d6c6', 60);
    const n = v.groups?.[k];
    if (Number.isInteger(n)) {
      const shaded = i === 2 && index === 0 ? Math.round(n * seg(TT, line.t0, line.t1)) : n;
      nfHundredths(x, 1030, shaded, k ? PR.blue : PR.green);
    } else {
      pp(pE(x, 1040, 120, 120), k ? PR.blue : PR.teal, { key:'nf-unknown-' + k });
      nfText('?', x, 1040, 180, 110, PR.paperW, 1);
    }
  });
  if (i === 1) nfText('Hiểu lầm cần kiểm tra', 540, 1265, 760, 30, PR.creamL, 1);
  if (i === 2) nfText('Cùng một đơn vị: phần một trăm', 540, 1265, 760, 32, PR.creamL, 1);
  if (i === 3) prCheck(890, 665, VL(b.lines[0].id).t0, 36);
  if (i === 4) nfText('Tự thử với hai số mới', 540, 1265, 760, 34, PR.creamL, 1);
}
function nfJar(x, y, amount) {
  pp(pR(x - 105, y - 140, 210, 270, 35), PR.glassD, { key:'nf-jar' });
  pp(pR(x - 115, y - 155, 230, 32, 8), PR.woodL, { key:'nf-lid' });
  for (let k = 0; k < amount; k++) prCoin(x - 60 + (k % 3) * 60, y + 90 - Math.floor(k / 3) * 45, 25, 'nf-save-' + k);
}
function nfBike(x, y) {
  [-75,75].forEach((d) => { pp(pE(x + d, y, 52, 52), PR.char); pp(pE(x + d, y, 38, 38), PR.creamL, { shadow:false }); });
  chalkLine([[x-75,y],[x-25,y-90],[x+35,y],[x-75,y],[x+35,y],[x+75,y-100],[x+75,y]], 1, { color:PR.orange, w:10 });
  pp(pR(x-50,y-100,60,12,4), PR.char);
}
function nfStory(b, i) {
  const v = b.visual, { index, u } = nfLine(b);
  const dialogue = i === 2 && v.subject === 'savings' && index < 3 ? 'Đợi cuối tuần mới để dành?' : v.dialogue;
  nfCard(dialogue, 540, 510, 780, 170, PR.creamL, 44);
  nfMascot(i, v.mood, 345, 1220, 0.82);
  nfText(v.name, 345, 1280, 260, 40, PR.creamL, 1);
  if (v.subject !== 'savings') {
    v.items.forEach((s,k) => nfCard(s, 740, 760 + k * 170, 330, 130, PR.creamL, 34));
  } else if (i === 0) {
    nfBike(750, 900);
    prCoin(750, 1090, 40);
  } else if (i === 1) {
    nfCard('', 745, 960, 270, 230, PR.brown);
    pp(pR(720,940,150,65,10), PR.tan, { key:'nf-wallet-clasp' });
    v.items.forEach((s, k) => nfText(s, 745, 720 + k * 65, 290, 27, PR.creamL, 1));
  } else {
    const saved = i === 2 ? (index >= Math.max(1, b.lines.length - 2) ? 4 : 0) : 8;
    nfJar(750, 970, saved);
    if (i === 2 && saved) prCoin(750, lerp(710, 820, u), 28, 'nf-deposit');
    if (i >= 3) nfBike(750, 690);
    nfText(v.items.join(' · '), 730, 1230, 330, 28, PR.creamL, 2);
  }
  if (NARRATIVE.fictional === true) nfText('Truyện minh họa hư cấu', 540, 1400, 760, 25, PR.creamL, 1);
  nfArrow(130, 1300, 880, 1300, seg(TT, NF_TIMES[0].t0, NF_TIMES[4].t1), PR.mustard);
}
function nfCompare(b, i) {
  const v = b.visual, { index } = nfLine(b);
  [v.left,v.right].forEach((s,k) => nfCard(s, 350 + k * 380, 520, 340, 130, k ? '#bbd8e6' : '#a9d6c6', 46));
  v.rows.forEach((row, k) => {
    const y = 710 + k * 175, active = i >= 2 && k === Math.min(index, v.rows.length - 1);
    nfText(row.label, 540, y - 48, 730, 29, PR.creamL, 1);
    [row.left,row.right].forEach((s,j) => nfCard(i === 2 && k > index ? '?' : s, 350 + j * 380, y + 20, 340, 110, active ? PR.yellow : PR.creamL, 34));
  });
  nfCard(v.condition, 540, 1290, 800, 130, PR.creamL, 34);
}
function nfCircuit(b, i) {
  const v = b.visual, { index, u } = nfLine(b);
  if (i === 0 && v.subject === 'circuit') {
    pp(pG([[400,730],[680,730],[890,430],[190,430]]),'#ebd58d',{key:'nf-beam',shadow:false,tex:0.25});
    pp(pR(400,730,280,430,28),PR.blue,{key:'nf-flashlight'});
    pp(pR(370,690,340,90,18),PR.char,{key:'nf-flashlight-head'});
    pp(pR(445,850,190,100,18),PR.creamL,{key:'nf-flashlight-switch'});
    nfText('BẬT',540,900,150,40,PR.ink,1);
    nfCard(v.detail,540,1290,800,130,PR.creamL,34);
    return;
  }
  if (v.subject !== 'circuit') {
    v.layers.forEach((s,k) => {
      const y = 570 + k * 150;
      nfCard(s, 540, y, 640, 110, k === (i === 1 ? Math.min(index,v.layers.length-1) : v.active) ? PR.yellow : PR.creamL, 42);
      if (k) nfArrow(540, y - 90, 540, y - 60);
    });
  } else {
    const closed = i === 0 || i === 4 || (i === 2 && index > 0) || (i === 3 && index < b.lines.length - 1);
    const active = i === 1 ? Math.min(index, v.layers.length - 1) : v.active;
    chalkLine([[320,800],[320,570],[730,570],[730,760],[730,960]], 1, { color:closed ? PR.mustard : PR.grey, w:14 });
    chalkLine([[730,1010],[730,1180],[320,1180],[320,960]], 1, { color:closed ? PR.mustard : PR.grey, w:14 });
    pp(pR(260,800,120,160,12), active === 0 ? PR.yellow : PR.green, { key:'nf-battery' });
    pp(pR(288,782,64,18,3), PR.tech, { key:'nf-terminal' });
    nfText('+', 320, 830, 90, 44, PR.ink, 1);
    nfText('−', 320, 935, 90, 44, PR.ink, 1);
    pp(pE(730,690,75,95), closed ? PR.yellow : PR.glassD, { key:'nf-bulb' });
    pp(pR(685,760,90,38,6), PR.techK, { key:'nf-bulb-base' });
    chalkLine([[730,960],[closed ? 730 : 820,closed ? 1010 : 940]], 1, { color:PR.orange, w:15 });
    [[320,715,0],[535,515,1],[760,1080,2],[730,860,3]].forEach(([x,y,k]) => nfCard(v.layers[k],x,y,k===2 ? 240 : 220,70,k===active ? PR.yellow : PR.creamL,30));
    if (closed && (i === 3 || i === 4)) {
      const phase = (Math.max(0, TT - VL(b.lines[0].id).t0) % 3) / 3;
      const points = [[320,800],[320,570],[730,570],[730,960],[730,1010],[730,1180],[320,1180],[320,960]];
      const position = phase * points.length, k = Math.floor(position), a = points[k], z = points[(k + 1) % points.length];
      pp(pE(lerp(a[0], z[0], position - k), lerp(a[1], z[1], position - k), 16,16), PR.creamL, { shadow:false });
    }
    if (i === 1) nfArrow(415, 650, 635, 650, u);
  }
  nfCard(v.detail, 540, 1290, 800, 130, PR.creamL, 34);
}
function nfQuiz(b, i) {
  const v = b.visual, thinking = NF_BEATS[2], start = VL(thinking.lines.at(-1).id).t1;
  const answerTime = VL(NF_BEATS[3].lines[0].id).t0;
  const revealed = i >= 3 && TT >= answerTime;
  nfCard(v.question, 540, 535, 800, 225, PR.creamL, 44);
  if (i >= 1) v.choices.forEach((s,k) => {
    const x = 350 + (k % 2) * 380, y = 810 + Math.floor(k / 2) * 190;
    ctx.save();
    if (revealed && k !== v.correct) ctx.globalAlpha = 0.5;
    nfCard(s, x, y, 340, 145, revealed && k === v.correct ? '#a9d6c6' : PR.creamL, 66);
    ctx.restore();
    if (revealed && k === v.correct) prCheck(x + 130, y - 62, answerTime, 30);
  });
  if (i === 0 && v.subject === 'cookies') {
    for (let k = 0; k < 3; k++) {
      const x = 270 + k * 270;
      nfCard('', x, 970, 220, 200, PR.tan);
      for (let n = 0; n < 4; n++) pp(pE(x - 45 + (n % 2) * 90, 925 + Math.floor(n / 2) * 90, 28,28), PR.brown, { key:'nf-cookie-' + k + n });
    }
  } else if (i === 0) {
    nfCard('?', 540, 970, 520, 300, PR.yellow, 150);
  }
  if (i === 2) {
    const remaining = Math.max(0, Math.ceil(v.countdown - Math.max(0,TT-start)));
    nfCard(TT < start ? 'Chuẩn bị suy nghĩ' : remaining ? String(remaining) : 'Hết giờ', 540, 1240, 700, 150, PR.yellow, remaining ? 80 : 40);
  }
  if (i >= 3 && revealed) nfCard(v.explanation, 540, 1240, 800, 160, '#a9d6c6', 38);
}
function nfPlant(x, y, p, ghost = false) {
  ctx.save();
  if (ghost) ctx.globalAlpha = 0.3;
  pp(pE(x,y,150 + Math.min(p,0.2)*90,95 + Math.min(p,0.2)*60,-0.3),PR.tan,{ key:'nf-seed' });
  if (p > 0.2) chalkLine([[x,y+25],[x-15,y+65],[x+10,y+150*clamp((p-0.2)/0.3)],[x-35,y+185*clamp((p-0.2)/0.3)]],1,{color:PR.creamL,w:12});
  if (p > 0.45) {
    const height = 340 * clamp((p-0.45)/0.55);
    chalkLine([[x,y],[x+15,y-height/2],[x,y-height]],1,{color:PR.green,w:20});
    if (p > 0.7) {
      const s = clamp((p-0.7)/0.3);
      pp(pE(x-55*s,y-height+45*s,72*s,30*s,0.45),PR.green);
      pp(pE(x+60*s,y-height+30*s,78*s,32*s,-0.45),PR.green);
    }
  }
  ctx.restore();
}
function nfTransform(b, i) {
  const v = b.visual, { index, line } = nfLine(b);
  const previous = i ? NF_BEATS[i-1].visual.progress : v.progress;
  let p = lerp(previous,v.progress,seg(TT,NF_TIMES[i].t0,Math.max(NF_TIMES[i].t0+0.1,VL(b.lines.at(-1).id).t1)));
  if (i === 2) p = lerp(previous,v.progress,(index + seg(TT,line.t0,line.t1))/b.lines.length);
  nfCard(v.trigger,540,510,800,140,PR.creamL,40);
  if (v.subject === 'plant') {
    withT(300,980,0,0.5,() => nfPlant(0,0,0,true));
    nfPlant(690,980,p);
    nfText(v.before,300,1190,300,30,PR.creamL,1);
    const label = p < 0.2 ? 0 : p < 0.45 ? 1 : p < 0.6 ? 2 : p < 0.95 ? 3 : 4;
    nfText(p >= 0.95 ? v.after : v.labels[Math.min(v.labels.length-1,label)],690,1190,380,30,PR.creamL,2);
  } else {
    nfCard(v.before,350,890,340,240,PR.glassD,40);
    nfCard(v.after,730,890,340,240,PR.teal,40);
    nfArrow(450,1100,630,1100,p);
  }
  pp(pR(170,1270,740,20,10),PR.grey,{key:'nf-progress-back'});
  if (p > 0) pp(pR(170,1270,740*p,20,10),PR.green,{key:'nf-progress',shadow:false});
  nfText('Các bước minh họa, không theo tỉ lệ thời gian',540,1375,760,25,PR.creamL,2);
}
function nfFriction(x,y,slide,kind = 'ball',t0 = E0) {
  pp(pR(x-165,y+115,330,20,5),PR.woodL,{key:'nf-ground'});
  const u = seg(TT,t0,t0+3), shift = slide ? 70 * u : 0;
  withT(x+shift,y,0,1,() => {
    if (kind === 'shoe') {
      pp(pG([[-115,60],[-115,-60],[-40,-75],[0,0],[115,30],[135,75],[-115,75]]),PR.orange,{key:'nf-shoe'});
      pp(pR(-120,75,260,28,8),PR.creamL,{key:'nf-sole'});
      for(let k=0;k<3;k++) chalkLine([[-30+k*25,-25+k*15],[-65+k*25,15+k*15]],1,{color:PR.creamL,w:8});
    } else if (kind === 'bike') {
      nfBike(0,55);
      pp(pR(50,-25,60,16,5),PR.red,{key:'nf-brake'});
    } else if (kind === 'knot') {
      chalkLine([[-130,50],[-50,50],[0,-30],[50,50],[130,50]],1,{color:PR.creamL,w:14});
      chalkLine([[-120,-30],[-50,-30],[0,50],[50,-30],[slide ? 135 : 90,slide ? -65 : -30]],1,{color:PR.orange,w:14});
      if(!slide) pp(pE(0,10,25,25),PR.tan,{key:'nf-knot'});
    } else pp(pE(-70,55,55,55),PR.orange,{key:'nf-ball'});
  });
  if (slide) nfArrow(x-100,y-130,x+120,y-130,1,PR.mustard);
  else for(let k=0;k<7;k++) pp(pR(x-145+k*44,y+98,12,18,3),PR.tan,{shadow:false});
}
function nfWhatIf(b, i) {
  const v = b.visual, { index, line } = nfLine(b), real = i >= 3;
  nfCard(real ? 'THỰC TẾ' : 'GIẢ ĐỊNH',540,470,760,95,real ? '#a9d6c6' : PR.yellow,42);
  nfText(real ? v.reality : v.hypothesis,540,625,760,42,PR.creamL,3);
  if(v.subject === 'friction') {
    const kind = i === 2 ? ['shoe','ball','bike','knot'][Math.min(index,3)] : i === 3 ? (index === 1 ? 'bike' : 'shoe') : 'shoe';
    nfFriction(350,890,false,kind,line.t0);
    nfFriction(730,890,!real,kind,line.t0);
    nfText('Có ma sát',350,1060,300,30,PR.creamL,1);
    nfText(real ? 'Đối chiếu mô hình' : 'Bỏ ma sát bề mặt',730,1060,330,30,PR.creamL,2);
  }
  const notes = i < 2 ? v.assumptions : i === 2 ? [v.consequences[Math.min(index,v.consequences.length-1)]] : i === 3 ? [v.reality] : [v.takeaway];
  nfCard(notes.join(' · '),540,1230,800,180,PR.creamL,34);
  if(!real) nfText('Các điều kiện khác giữ nguyên',540,1390,760,28,PR.creamL,1);
}
const NF_DRAW = { F01:nfQuestion,F02:nfStory,F03:nfCompare,F04:nfCircuit,F05:nfQuiz,F06:nfTransform,F07:nfWhatIf };
const SCENES = {};
NF_BEATS.forEach((b,i) => {
  SCENES[b.stage] = () => {
    nfWorld(i);
    NF_DRAW[NARRATIVE_FORMAT.id](b,i);
    if (NARRATIVE_FORMAT.id !== 'F02') nfMascot(i,i===3 ? 'happy' : 'calm');
    const waitingAnswer = NARRATIVE_FORMAT.id === 'F05' && b.stage === 'answer' && TT < VL(b.lines[0].id).t0;
    prSign(waitingAnswer ? 'ĐỐI CHIẾU ĐÁP ÁN' : b.title.toLocaleUpperCase('vi'),{kicker:'TIDU ' + NF_CHANNEL.toUpperCase() + ' · ' + NARRATIVE_FORMAT.id});
    if(NF_PREVIEW) nfText('PREVIEW · TIMING ƯỚC LƯỢNG',540,1440,740,22,PR.creamL,1);
    const thinking = NARRATIVE_FORMAT.id === 'F05' && b.stage === 'thinking';
    const silent = thinking && TT >= VL(b.lines.at(-1).id).t1;
    if(!silent) prChips();
  };
});
const SPLITS = [];
const SHOT_LIST = NF_BEATS.map((b,i) => [NF_TIMES[i].t0,b.stage]);
const ERA_LIST = NF_BEATS.map((b,i) => [NF_TIMES[i].t0,NF_TIMES[i].t1,() => SCENES[b.stage]()]);
function SFX_CUES() {
  const cues = [];
  if(NARRATIVE_FORMAT.id === 'F05') {
    const b=NF_BEATS[2], start=VL(b.lines.at(-1).id).t1;
    for(let k=0;k<b.visual.countdown;k++) cues.push({k:'tick',t:start+k});
    cues.push({k:'chime',t:VL(NF_BEATS[3].lines[0].id).t0});
  }
  return cues;
}
const TIMELINE = {
  width:W,height:H,fps:FPS,duration:DURATION,frames:NFRAMES,loop:LOOP_T,safe:SAFE,format:NARRATIVE_FORMAT.id,preview:NF_PREVIEW,
  shots:NF_BEATS.map((b,i) => ({id:i+1,key:b.stage,era:i,...NF_TIMES[i],title:b.title})),
  cuts:SHOT_LIST.slice(1).map(([t]) => t),morphs:[],cues:{},
  acts:[{name:NARRATIVE_FORMAT.name,role:'journey',t0:0,t1:DURATION}],
  board:NF_BEATS.map((b,i) => ({t:(NF_TIMES[i].t0+NF_TIMES[i].t1)/2,title:b.title,sound:'',next:'cut'})),
  narration:VOICE.lines.map((l) => ({t0:l.t0,t1:l.t1,text:l.text})),
};
window.TIMELINE = TIMELINE;
