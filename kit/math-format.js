F_HEAD = '"Be Vietnam Pro", sans-serif';
F_CHIP = 'Bevan, serif';
const MF_BEATS = NARRATIVE.beats;
const MF_HATS = ['mortar','explorer','builder','crown','party'];
const MF_TIMES = MF_BEATS.map((b,i) => ({t0:i ? CUT(b.lines[0].id) : 0,t1:i+1<MF_BEATS.length ? CUT(MF_BEATS[i+1].lines[0].id) : DURATION}));
function mfText(str,x,y,width,size=44,color=PR.ink,maxLines=3) {
  const words=String(str).split(/\s+/);
  let rows,fontSize=size;
  do {
    rows=[''];
    for(const word of words) {
      const k=rows.length-1,next=rows[k] ? rows[k]+' '+word : word;
      if(txtW(next,fontSize)>width && rows[k]) rows.push(word); else rows[k]=next;
    }
    if(rows.length<=maxLines && rows.every((r)=>txtW(r,fontSize)<=width)) break;
    fontSize-=2;
  } while(fontSize>20);
  rows.forEach((r,i)=>txt(r,x,y+(i-(rows.length-1)/2)*fontSize*1.35,fontSize,color,{align:'center',base:'middle'}));
  return fontSize;
}
function mfCard(str,x,y,w,h,{fill=PR.creamL,size=44,color=PR.ink}={}) {
  pp(pR(x-w/2,y-h/2,w,h,18),fill,{key:'mf-card-'+x+'-'+y});
  if(str) mfText(str,x,y,w-48,size,color,Math.max(1,Math.floor((h-26)/(size*1.35))));
}
function mfArrow(x1,y1,x2,y2,u=1,color=PR.mustard) {
  u=clamp(u);
  const x=lerp(x1,x2,u),y=lerp(y1,y2,u),a=Math.atan2(y2-y1,x2-x1);
  chalkLine([[x1,y1],[x,y]],1,{color,w:8});
  if(u>0.03) withT(x,y,a,1,()=>pp(pG([[0,0],[-22,-12],[-22,12]]),color,{shadow:false}));
}
function mfLine(b) {
  let index=0;
  b.lines.forEach((l,i)=>{if(TT>=VL(l.id).t0) index=i;});
  const line=VL(b.lines[index].id);
  return {index,line,u:seg(TT,line.t0,line.t1)};
}
function mfOwl(i,{x=875,y=1790,s=0.6,mood='calm',hat=MF_HATS[i%MF_HATS.length],...options}={}) {
  tidu(x,y,{s,mood,hat,key:'mf-owl',...options});
}
function mfWorld(i) {
  prWall(i%2 ? '#305957' : '#355f5a',{panels:false,streak:460});
  prFloor(1670,PR.woodD,{trim:false});
  for(let k=0;k<5;k++) pp(pE(420+k*60,355,k===i?12:7,k===i?12:7),k<=i?PR.mustard:'#8aa5a0',{shadow:false});
}
const SCENES={};
const SPLITS=[];
const SHOT_LIST=MF_BEATS.map((b,i)=>[MF_TIMES[i].t0,b.stage]);
const ERA_LIST=MF_BEATS.map((b,i)=>[MF_TIMES[i].t0,MF_TIMES[i].t1,()=>SCENES[b.stage]()]);
function mfInstall(draw,{mascot=true,title=(b)=>b.title}={}) {
  if(mascot){CHIP_MAX=2;CHIP_MAXX=680;}
  MF_BEATS.forEach((b,i)=>{
    SCENES[b.stage]=()=>{
      mfWorld(i);
      draw(b,i);
      if(mascot) mfOwl(i,{mood:i===3?'happy':'calm'});
      prSign(title(b,i).toLocaleUpperCase('vi'),{kicker:'TIDU MATH · '+NARRATIVE_FORMAT.id});
      if(VOICE.preview) mfText('PREVIEW · TIMING ƯỚC LƯỢNG',540,1440,740,22,PR.creamL,1);
      const thinking=NARRATIVE_FORMAT.id==='F05' && b.stage==='thinking';
      if(!thinking || TT<VL(b.lines.at(-1).id).t1) prChips();
    };
  });
}
const TIMELINE={
  width:W,height:H,fps:FPS,duration:DURATION,frames:NFRAMES,loop:LOOP_T,safe:SAFE,format:NARRATIVE_FORMAT.id,preview:!!VOICE.preview,
  shots:MF_BEATS.map((b,i)=>({id:i+1,key:b.stage,era:i,...MF_TIMES[i],title:b.title})),
  cuts:SHOT_LIST.slice(1).map(([t])=>t),morphs:[],cues:{},
  acts:[{name:NARRATIVE_FORMAT.name,role:'journey',t0:0,t1:DURATION}],
  board:MF_BEATS.map((b,i)=>({t:(MF_TIMES[i].t0+MF_TIMES[i].t1)/2,title:b.title,sound:'',next:'cut'})),
  narration:VOICE.lines.map((l)=>({t0:l.t0,t1:l.t1,text:l.text})),
};
window.TIMELINE=TIMELINE;
