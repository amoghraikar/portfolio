(()=>{
const BLOCKS='░▒▓█▄▀■□▪▫◆◇●○╳╱╲┼┤├┬┴┐└┘┌ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-=+*/\\[]{}:;!?$%#@'.split('');
const EXT=['DAT','BIN','SYS','TMP','RAW','LOG','CFG','LUT','OBJ','GLSL','FX','ONNX','RS','PY','SOL'];
const WORDS=['SIGNAL','MEMORY','VECTOR','MOTION','CURSOR','TRACKER','SHADER','CAMERA','BUFFER','MATRIX','GLITCH','FRAME','DEPTH','MESH','NOISE','POINTER','SCANLINE','TEXTURE','KERNEL','INPUT','OUTPUT','CACHE','FIELD','TRACE'];

const projects={
  0:{name:'KARATCORE_ERP.EXE',type:'FULL-STACK',href:'https://github.com/amoghraikar/karatcore',category:'fullstack'},
  1:{name:'MENTRA_AI.SYS',type:'AI & CV',href:'https://github.com/amoghraikar/mentra-ai',category:'aicv'},
  2:{name:'BLOCKCHAIN_POW.PY',type:'BLOCKCHAIN',href:'https://github.com/amoghraikar/mini-blockchain',category:'blockchain'},
  3:{name:'FASTAPI_ROUTER.BIN',type:'SYSTEMS',href:'https://github.com/amoghraikar',category:'systems'},
  4:{name:'GAZE_ESTIMATE.ONNX',type:'AI & CV',href:'https://github.com/amoghraikar',category:'aicv'},
  5:{name:'PROOF_OF_WORK.SOL',type:'BLOCKCHAIN',href:'https://github.com/amoghraikar',category:'blockchain'},
  6:{name:'FLUTTER_CORE.DART',type:'FULL-STACK',href:'https://github.com/amoghraikar',category:'fullstack'},
  7:{name:'POSTGRES_SCHEMA.SQL',type:'SYSTEMS',href:'https://github.com/amoghraikar',category:'systems'},
  8:{name:'ATTENTION_NET.PT',type:'AI & CV',href:'https://github.com/amoghraikar',category:'aicv'},
  9:{name:'CRYPTO_LEDGER.BIN',type:'BLOCKCHAIN',href:'https://github.com/amoghraikar',category:'blockchain'},
  10:{name:'CONTAINER_DEV.CFG',type:'SYSTEMS',href:'https://github.com/amoghraikar',category:'systems'},
  11:{name:'PORTFOLIO_V2.JSX',type:'FULL-STACK',href:'../index.html',category:'fullstack'},
  12:{name:'LINUX_DAEMON.SH',type:'SYSTEMS',href:'https://github.com/amoghraikar',category:'systems'},
  13:{name:'NEURAL_VISION.PY',type:'AI & CV',href:'https://github.com/amoghraikar',category:'aicv'},
  14:{name:'SHA256_MINER.RS',type:'BLOCKCHAIN',href:'https://github.com/amoghraikar',category:'blockchain'},
  15:{name:'ERP_AUTH_JWT.DAT',type:'FULL-STACK',href:'https://github.com/amoghraikar',category:'fullstack'},
  16:{name:'GPU_INFERENCE.CUDA',type:'AI & CV',href:'https://github.com/amoghraikar',category:'aicv'},
  17:{name:'P2P_NETWORK.GO',type:'BLOCKCHAIN',href:'https://github.com/amoghraikar',category:'blockchain'},
  18:{name:'REDIS_CACHE.SYS',type:'SYSTEMS',href:'https://github.com/amoghraikar',category:'systems'},
  19:{name:'KOTLIN_SERVICE.KT',type:'FULL-STACK',href:'https://github.com/amoghraikar',category:'fullstack'}
};

const rows=[],host=document.getElementById('fileRows'),status=document.getElementById('status'),dirViewport=document.querySelector('.dir-viewport');
let cursorX=-1,cursorY=-1,cursorRow=null;

function dataFor(i){
  const p=projects[i],ext=p?p.name.split('.').pop():EXT[i%EXT.length];
  const name=p?p.name:`${WORDS[i%WORDS.length]}_${WORDS[(i*7+3)%WORDS.length]}_${String(i+1).padStart(3,'0')}.${ext}`;
  const year=2023+Math.floor(Math.random()*3);
  const month=1+Math.floor(Math.random()*12);
  const day=1+Math.floor(Math.random()*28);
  return{
    date:`${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}-${year}`,
    time:`${String(8+i%14).padStart(2,'0')}:${String((i*13)%60).padStart(2,'0')}`,
    size:(16384+(i*12347)%980000).toLocaleString('en-US'),
    type:p?p.type:ext,
    name,
    p
  };
}

function markup(d){
  return `<span class="row-scroll-inner"><span>${d.name}</span><span class="type">${d.type}</span><span>${d.date}</span><span>${d.time}</span><span class="size">${d.size}</span></span>`;
}

function noise(n){
  return Array.from({length:n},()=>{
    const c=BLOCKS[Math.random()*BLOCKS.length|0];
    return Math.random()<.38?`<b class="arial-noise">${c}</b>`:c;
  }).join('');
}

function chaosMarkup(d){
  const lengths=[d.name.length,d.type.length,d.date.length,d.time.length,d.size.length];
  return `<span class="row-scroll-inner">${lengths.map((n,j)=>`<span${j===1?' class="type"':j===4?' class="size"':''}>${noise(n)}</span>`).join('')}</span>`;
}

for(let i=0;i<22;i++){
  const d=dataFor(i),el=document.createElement(d.p?'a':'div');
  el.className='dir-row';
  el.dataset.category=d.p?.category||'';
  if(d.p){
    el.href=d.p.href;
    el.setAttribute('aria-label',d.name);
    if(d.p.href.startsWith('http')) {
      el.setAttribute('target','_blank');
      el.setAttribute('rel','noopener noreferrer');
    }
  }
  el.innerHTML=chaosMarkup(d);
  host.appendChild(el);
  rows.push({el,d});
}

const rowHoverSound=new Audio('assets/sounds/onscroll.mp3');
rowHoverSound.preload='auto';
rowHoverSound.volume=.45;
function playRowSound(){
  rowHoverSound.pause();
  rowHoverSound.currentTime=0;
  rowHoverSound.play().catch(()=>{});
}
rows.forEach(({el})=>el.addEventListener('pointerenter',playRowSound));

const scrambleTimers=[];
function updateCursorRow(){
  if(cursorRow)cursorRow.classList.remove('cursor-hit');
  const hit=document.elementFromPoint(cursorX,cursorY);
  cursorRow=hit&&hit.closest('.dir-row');
  if(cursorRow)cursorRow.classList.add('cursor-hit');
}

rows.forEach(({el,d},i)=>setTimeout(()=>{
  el.classList.add('revealed','scrambling');
  let hue=(i*31)%360;
  el.style.setProperty('--row-color',`hsl(${hue} 100% 65%)`);
  scrambleTimers[i]=setInterval(()=>{
    el.innerHTML=chaosMarkup(d);
    hue=(hue+47)%360;
    el.style.setProperty('--row-color',`hsl(${hue} 100% 65%)`);
  },38);
  const box=dirViewport.getBoundingClientRect(),visibleRows=Math.max(1,Math.floor((box.height-30)/78));
  if(i>=visibleRows)dirViewport.scrollTop=(i-visibleRows+1)*78;
  requestAnimationFrame(updateCursorRow);
},i*4));

function prepareRoll(el){
  [...(el.querySelector('.row-scroll-inner')?.children||[])].forEach(cell=>{
    if(cell.tagName!=='SPAN')return;
    const text=cell.textContent;
    cell.classList.add('roll-cell');
    cell.textContent='';
    const track=document.createElement('span');
    track.className='roll-track';
    track.innerHTML=`<span class="roll-copy">${text}</span><span class="roll-copy">${text}</span>`;
    cell.appendChild(track);
  });
}

function revealFinal(){
  let order=0;
  document.querySelectorAll('.prompt,.volume-part,.dir-head span,.dir-row.keeper .roll-copy').forEach(el=>{
    const nodes=[...el.childNodes].filter(n=>n.nodeType===3);
    nodes.forEach(node=>{
      const frag=document.createDocumentFragment();
      [...node.textContent].forEach(char=>{
        const s=document.createElement('i');
        s.className='terminal-char';
        s.style.fontStyle='normal';
        s.style.setProperty('--char-delay',`${order++*2}ms`);
        s.textContent=char===' '?'\u00a0':char;
        frag.appendChild(s);
      });
      node.replaceWith(frag);
    });
  });
}

const revealEnd=22*4+180;
let introScrollLock=true;
setTimeout(()=>{
  status.textContent='ISOLATING EXECUTABLE PROJECTS';
  rows.forEach(({el,d},i)=>{
    if(d.p){
      clearInterval(scrambleTimers[i]);
      el.innerHTML=markup(d);
      el.classList.remove('scrambling');
      el.classList.add('keeper');
      prepareRoll(el);
      return;
    }
    setTimeout(()=>{
      clearInterval(scrambleTimers[i]);
      el.classList.add('erasing');
    },Math.random()*180);
  });
  setTimeout(()=>{
    dirViewport.scrollTo({top:0,behavior:'smooth'});
    setTimeout(()=>{
      rows.forEach(({el,d})=>{if(!d.p)el.remove()});
      status.textContent=Object.keys(projects).length+' PROJECT FILES READY';
      revealFinal();
      dirViewport.scrollTop=0;
      introScrollLock=false;
      syncRetroScrollbar();
    },180);
  },250);
},revealEnd);

const terminalStatusLine=document.getElementById('terminalStatusLine');
const volumeDrive=document.getElementById('volumeDrive');
const volumeDirectory=document.getElementById('volumeDirectory');

const terminalMessages=[
  ['Volume in drive C is AMOGH_CORE','Directory of C:\\AMOGH\\LABZ',0],
  ['MEMORY CHECK 640K OK','KERNEL AMOGH.SYS ACTIVE',0],
  ['FASTAPI GATEWAY ONLINE','ROUTER DISPATCH 0042MS',0],
  ['BLOCKCHAIN NODE ACTIVE','PROOF-OF-WORK VERIFIED',0],
  ['COMPUTER VISION PRIMED','GAZE ATTENTION LOCKED',0],
  ['KARATCORE ERP DAEMON','FINANCIAL BUS NOMINAL',0],
  ['SYSTEM KERNEL 4D.77 OK','PYTHON 3.12 ENGINE READY',0],
  ['VECTOR TABLE LOADED','IRQ 07 ROUTED TO AMOGH_LABZ',0],
  ['SECTOR MAP VERIFIED','NO BAD CLUSTERS FOUND',0],
  ['CACHE MODE TURBO','DOCKER RUNTIME RUNNING',0],
  ['POSTGRES DB READY','CONNECTION POOL MOUNTED',0],
  ['SIGNAL LOCK ACQUIRED','PACKET TRACE 0019MS',0],
  ['FLUTTER ENGINE LOADED','MOBILE UI FRAMEBUFFER OK',0],
  ['NEURAL WEIGHTS SYNCED','LOSS 0.0142 STABLE',0],
  ['SCANLINE CLOCK 15KHZ','PHOSPHOR DECAY NORMAL',0],
  ['EXEC TABLE MOUNTED','PROJECT INDEX RESOLVED',0],
  ['REMOTE NODE ANSWERED','LATENCY 0014MS',0],
  ['WARNING: HIGH FOCUS DETECTED','STUDY CYCLE OPTIMAL',0],
  ['WARNING: GAS LIMIT REACHED','CONTRACT BLOCK MINED',0],
  ['WARNING: BUFFER OVERRUN','FRAME 0x00FF RE-ROUTED',1],
  ['WARNING: INCOMING API REQUEST','BEARER AUTH VALIDATED',0],
  ['WARNING: GHOST PROCESS','PID 0777 STILL ACTIVE',1]
];

const terminalNoise='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-=+*/\\[]{}<>:;!?$%#@░▒▓█'.split('');
let terminalMessageIndex=0,terminalScrambleTimer=0;

function scrambleTerminalStatus(){
  let next;
  do{next=Math.floor(Math.random()*terminalMessages.length)}while(next===terminalMessageIndex);
  terminalMessageIndex=next;
  const [leftTarget,rightTarget,warning]=terminalMessages[next];
  let frame=0;
  clearInterval(terminalScrambleTimer);
  terminalStatusLine.classList.add('is-scrambling');
  terminalStatusLine.classList.toggle('is-warning',Boolean(warning));
  const scramble=(element,target)=>{
    const reveal=Math.floor((frame/17)*target.length);
    element.textContent=[...target].map((char,index)=>index<reveal?char:(char===' '?' ':terminalNoise[Math.random()*terminalNoise.length|0])).join('');
  };
  terminalScrambleTimer=setInterval(()=>{
    frame++;
    scramble(volumeDrive,leftTarget);
    scramble(volumeDirectory,rightTarget);
    if(frame>=18){
      clearInterval(terminalScrambleTimer);
      volumeDrive.textContent=leftTarget;
      volumeDirectory.textContent=rightTarget;
      terminalStatusLine.classList.remove('is-scrambling');
    }
  },32);
}
setInterval(scrambleTerminalStatus,5000);

const chatterLine=document.getElementById('chatterLine');
const spyChatterNames=['ALAN TURING','ADA LOVELACE','TIM BERNERS-LEE','DENNIS RITCHIE','LINUS TORVALDS','GRACE HOPPER','JOHN VON NEUMANN','CLAUDE SHANNON','MARGARET HAMILTON','KEN THOMPSON','GUIDO VAN ROSSUM','SATOSHI NAKAMOTO','JAMES GOSLING','BRENDAN EICH','RICHARD STALLMAN','DONALD KNUTH','NIKLAUS WIRTH','BJARNE STROUSTRUP','VINT CERF','LESLIE LAMPORT','EDSGER DIJKSTRA','BARBARA LISKOV','AMOGH RAIKAR','CYBERPUNK AGENT','NEO','TRINITY','MORPHEUS'];
let chatterScrambleTimer=0;

function scrambleTo(target,iridescent){
  chatterLine.classList.toggle('iridescent',Boolean(iridescent));
  const totalFrames=12,lockFrame=[...target].map(()=>2+Math.floor(Math.random()*totalFrames));
  let frame=0;
  clearInterval(chatterScrambleTimer);
  chatterScrambleTimer=setInterval(()=>{
    frame++;
    chatterLine.textContent=[...target].map((char,index)=>char===' '?' ':(frame>=lockFrame[index]?char:terminalNoise[Math.random()*terminalNoise.length|0])).join('');
    if(frame>=totalFrames){
      clearInterval(chatterScrambleTimer);
      chatterLine.textContent=target;
    }
  },28);
}

function scrambleChatter(){
  const name=spyChatterNames[Math.random()*spyChatterNames.length|0];
  const verb=Math.random()<.5?'CONNECTED TO CORE':'LOGGED OUT FROM NODE';
  scrambleTo(`${name} ${verb}`,false);
}

if(chatterLine){
  const geoProviders=[
    {url:'https://ipapi.co/json/',read:d=>d&&d.country_name},
    {url:'https://ipwho.is/',read:d=>d&&d.success!==false&&d.country},
    {url:'https://get.geojs.io/v1/ip/geo.json',read:d=>d&&d.country}
  ];
  const tryProvider=i=>{
    if(i>=geoProviders.length)return Promise.resolve(null);
    return fetch(geoProviders[i].url).then(r=>r.json()).then(d=>geoProviders[i].read(d)||null).catch(()=>null).then(country=>country||tryProvider(i+1));
  };
  tryProvider(0).then(country=>{
    scrambleTo(`DEVELOPER SESSION ACTIVE \\ ${country?country.toUpperCase():'LOCAL WORKSTATION'}`,true);
  }).finally(()=>{
    setInterval(scrambleChatter,8000);
  });
}

const pointer=document.getElementById('chaosPointer');
const nativeCursors=['default','pointer','crosshair','cell','help','progress','wait','text','vertical-text','alias','copy','move','grab','zoom-in','zoom-out','not-allowed','context-menu'];
function changeCursor(){
  document.documentElement.style.setProperty('--chaos-cursor',nativeCursors[Math.random()*nativeCursors.length|0]);
  setTimeout(changeCursor,120+Math.random()*620);
}
changeCursor();

const asciiStage=document.getElementById('asciiStage');
const figletRenders=[
  {
    font:"ansi_shadow",
    art:" █████╗ ███╗   ███╗ ██████╗  ██████╗ ██╗  ██╗    ██╗      █████╗ ██████╗ ███████╗\n██╔══██╗████╗ ████║██╔═══██╗██╔════╝ ██║  ██║    ██║     ██╔══██╗██╔══██╗╚══███╔╝\n███████║██╔████╔██║██║   ██║██║  ███╗███████║    ██║     ███████║██████╔╝  ███╔╝ \n██╔══██║██║╚██╔╝██║██║   ██║██║   ██║██╔══██║    ██║     ██╔══██║██╔══██╗ ███╔╝  \n██║  ██║██║ ╚═╝ ██║╚██████╔╝╚██████╔╝██║  ██║    ███████╗██║  ██║██████╔╝███████╗\n╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝"
  },
  {
    font:"slant",
    art:"    ___    __  _______  ________ __  __     __    ___    ____ _____\n   /   |  /  |/  / __ \\/ ____/ // / / /    / /   /   |  / __ )__  /\n  / /| | / /|_/ / / / / / __/ // /_/ /    / /   / /| | / __  | / / \n / ___ |/ /  / / /_/ / /_/ / __  /_/     / /___/ ___ |/ /_/ / / /__\n/_/  |_/_/  /_/\\____/\\____/_/ /_(_)     /_____/_/  |_/_____/ /____/"
  },
  {
    font:"cyberlarge",
    art:" _______ _______  _____   ______ _     _       _       _______ ______  ______\n |_____| |  |  | |     | |  ____ |_____|       |       |_____| |_____]  ____/\n |     | |  |  | |_____| |_____| |     | _____ |_____  |     | |_____] /_____"
  },
  {
    font:"doom",
    art:"  ___  ___  ___________ _   _   _       ___  ______ ______\n / _ \\ |  \\/  |  _  |  __ \\ | | | | |     / _ \\ | ___ \\___  /\n/ /_\\ \\| .  . | | | | |  \\/ | |_| | |    / /_\\ \\| |_/ /  / / \n|  _  || |\\/| | | | | | __  |  _  | |    |  _  || ___ \\ / /  \n| | | || |  | \\ \\_/ / |_\\ \\ | | | | |____| | | || |_/ // /___\n\\_| |_/\\_|  |_/\\___/ \\____/ \\_| |_/\\_____/\\_| |_/\\____/ \\_____/"
  },
  {
    font:"banner3-D",
    art:"'###::::'##::::'##::'#######:::'######:::'##::::'##::::'##::::::::::'###::::'########::'########:\n'## ##::: ###::'###:'##.... ##:'##... ##:: ##:::: ##:::: ##:::::::::'## ##::: ##.... ##:..... ##::\n'##:. ##:: ####'####: ##:::: ##: ##:::..::: ##:::: ##:::: ##::::::::'##:. ##:: ##:::: ##::::: ##:::\n'##:::. ##: ## ### ##: ##:::: ##: ##::'####: #########:::: ##:::::::'##:::. ##: ########::::: ##::::\n#########: ##. #: ##: ##:::: ##: ##::: ##:: ##.... ##:::: ##::::::: #########: ##.... ##::: ##:::::\n##.... ##: ##:.:: ##: ##:::: ##: ##::: ##:: ##:::: ##:::: ##::::::: ##.... ##: ##:::: ##:: ##::::::\n##:::: ##: ##:::: ##:. #######::. ######::: ##:::: ##:::: ########: ##:::: ##: ########:: ########:\n..:::::..::..:::::..:::.......::::......::::..:::::..:::::........::..:::::..::........:::........::"
  },
  {
    font:"big",
    art:"          __  __  ____   _____ _    _   _               ____ ______ \n    /\\   |  \/  |/ __ \\ / ____| |  | | | |        /\\   |  _ \\___  / \n   /  \\  | \\  / | |  | | |  __| |__| | | |       /  \\  | |_) | / /  \n  / /\\ \\ | |\\/| | |  | | | |_ |  __  | | |      / /\\ \\ |  _ < / /   \n / ____ \\| |  | | |__| | |__| | |  | | | |____ / ____ \\| |_) / /__  \n/_/    \\_\\_|  |_|\\____/ \\_____|_|  |_| |______/_/    \\_\\____/_____| "
  },
  {
    font:"isometric1",
    art:"      ___           ___           ___           ___           ___                    ___       ___           ___           ___     \n     /\\  \\         /\\__\\         /\\  \\         /\\  \\         /\\__\\                  /\\__\\     /\\  \\         /\\  \\         /\\  \\    \n    /::\\  \\       /::|  |       /::\\  \\       /::\\  \\       /:/__/                 /:/  /    /::\\  \\       /::\\  \\        \\:\\  \\   \n   /:/\\:\\  \\     /:|:|  |      /:/\\:\\  \\     /:/\\:\\  \\     /::\\  \\                /:/  /    /:/\\:\\  \\     /:/\\:\\  \\        \\:\\  \\  \n  /::\\~\\:\\  \\   /:/|:|  |__   /:/  \\:\\  \\   /:/  \\:\\  \\   /:/\\:\\  \\              /:/  /    /::\\~\\:\\  \\   /::\\~\\:\\__\\        \\:\\  \\ \n /:/\\:\\ \\:\\__\\ /:/ |:| /\\__\\ /:/__/ \\:\\__\\ /:/__/ \\:\\__\\ /:/__\\:\\__\\            /:/__/    /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:|__| _______\:\\__\\\n \\/__\\:\\/:/  / \\/__|:|/:/  / \\:\\  \\ /:/  / \\:\\  \\ /:/  / \\:\\  \\ /:/  /            \\:\\  \\    \\/__\\:\\/:/  / \\:\\~\\:\\/:/  / \\::::::::/__/\n      \\::/  /      |:/:/  /   \\:\\  /:/  /   \\:\\  /:/  /   \\:\\  /:/  /              \\:\\  \\        \\::/  /   \\:\\ \\::/  /   \\:\\~~\\~~    \n      /:/  /       |::/  /     \\:\\/:/  /     \\:\\/:/  /     \\:\\/:/  /                \\:\\  \\       /:/  /     \\:\\/:/  /     \\:\\  \\     \n     /:/  /        /:/  /       \\::/  /       \\::/  /       \\::/  /                  \\:\\__\\     /:/  /       \\::/__/       \\:\\__\\    \n     \\/__/         \\/__/         \\/__/         \\/__/         \\/__/                    \\/__/     \\/__/         ~~            \\/__/    "
  }
];

let asciiFrame=0,asciiRun=0;
function showAscii(e){
  if(!e.currentTarget.classList.contains('keeper'))return;
  cancelAnimationFrame(asciiFrame);
  const run=++asciiRun;
  const render=figletRenders[Math.random()*figletRenders.length|0];
  const art=render.art;
  const start=performance.now();
  asciiStage.textContent='█';
  asciiStage.dataset.figletFont=render.font;
  asciiStage.style.color=`hsl(${Math.random()*360} 100% 67%)`;
  asciiStage.classList.add('show');
  function typeAscii(now){
    if(run!==asciiRun)return;
    const count=Math.min(art.length,Math.max(1,Math.floor((now-start)*2.5)));
    asciiStage.textContent=art.slice(0,count)+(count<art.length?'█':'');
    if(count<art.length)asciiFrame=requestAnimationFrame(typeAscii);
  }
  asciiFrame=requestAnimationFrame(typeAscii);
}

function hideAscii(){
  asciiRun++;
  cancelAnimationFrame(asciiFrame);
  asciiStage.classList.remove('show');
  asciiStage.textContent='';
}

rows.forEach(({el,d})=>{
  if(!d.p)return;
  el.addEventListener('pointerenter',showAscii);
  el.addEventListener('pointerleave',hideAscii);
  el.addEventListener('focus',showAscii);
  el.addEventListener('blur',hideAscii);
});

const trail=document.getElementById('cursorTrail');
const ctx=trail.getContext('2d');
const trailPoints=[];
let previous=null,turnHorizontal=true;

function sizeTrail(){
  const d=devicePixelRatio||1;
  trail.width=innerWidth*d;
  trail.height=innerHeight*d;
  trail.style.width=innerWidth+'px';
  trail.style.height=innerHeight+'px';
  ctx.setTransform(d,0,0,d,0,0);
}
sizeTrail();
addEventListener('resize',sizeTrail);

addEventListener('pointermove',e=>{
  cursorX=e.clientX;
  cursorY=e.clientY;
  updateCursorRow();
  const now=performance.now(),next={x:e.clientX,y:e.clientY,t:now};
  if(previous){
    const elbow=turnHorizontal?{x:next.x,y:previous.y,t:now}:{x:previous.x,y:next.y,t:now};
    trailPoints.push({...previous,t:now},elbow,next);
    turnHorizontal=!turnHorizontal;
  }else trailPoints.push(next);
  previous=next;
  if(trailPoints.length>360)trailPoints.splice(0,trailPoints.length-360);
});

function drawTrail(now){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  while(trailPoints.length&&now-trailPoints[0].t>1400)trailPoints.shift();
  ctx.lineCap='square';
  ctx.lineJoin='miter';
  for(let i=1;i<trailPoints.length;i++){
    const a=trailPoints[i-1],b=trailPoints[i],age=now-b.t,alpha=Math.max(0,1-age/1400),hue=(now*.16+i*11)%360;
    ctx.strokeStyle=`hsla(${hue},100%,58%,${alpha})`;
    ctx.lineWidth=1.2+alpha*1.8;
    ctx.beginPath();
    ctx.moveTo(a.x,a.y);
    ctx.lineTo(b.x,b.y);
    ctx.stroke();
  }
  requestAnimationFrame(drawTrail);
}
requestAnimationFrame(drawTrail);

const retroScrollbar=document.getElementById('retroScrollbar');
const retroScrollTrack=document.getElementById('retroScrollTrack');
const retroScrollThumb=document.getElementById('retroScrollThumb');
const retroScrollUp=document.getElementById('retroScrollUp');
const retroScrollDown=document.getElementById('retroScrollDown');
const scrollCue=document.getElementById('scrollCue');
const scrollCueUp=document.getElementById('scrollCueUp');
const promptLine=document.querySelector('.prompt');

function positionRetroScrollbar(){
  if(!retroScrollbar)return;
  const box=dirViewport.getBoundingClientRect(),barHeight=Math.min(507,Math.max(52,box.height-30));
  retroScrollbar.style.left=Math.round(box.right-28)+'px';
  retroScrollbar.style.top=Math.round(box.top+30)+'px';
  retroScrollbar.style.height=barHeight+'px';
}

function positionScrollCue(){
  if(!scrollCue)return;
  const box=dirViewport.getBoundingClientRect();
  scrollCue.style.left=Math.round(box.left+box.width/2-22)+'px';
  scrollCue.style.top=Math.round(box.bottom)+'px';
}

function positionScrollCueUp(){
  if(!scrollCueUp)return;
  const box=dirViewport.getBoundingClientRect(),baselineY=promptLine?promptLine.getBoundingClientRect().bottom:box.top;
  scrollCueUp.style.left=Math.round(box.left+box.width/2-22)+'px';
  scrollCueUp.style.top=Math.round(baselineY-44)+'px';
}

function syncRetroScrollbar(){
  if(!retroScrollbar)return;
  positionRetroScrollbar();
  positionScrollCue();
  positionScrollCueUp();
  const maxScroll=Math.max(0,dirViewport.scrollHeight-dirViewport.clientHeight),scrolled=introScrollLock?false:dirViewport.scrollTop>2;
  dirViewport.classList.toggle('has-scroll-top',scrolled);
  dirViewport.classList.toggle('has-scroll-bottom',dirViewport.scrollTop<maxScroll-2);
  scrollCue?.classList.toggle('hide',scrolled);
  scrollCueUp?.classList.toggle('hide',!scrolled);
  retroScrollThumb.value=maxScroll?Math.round(dirViewport.scrollTop/maxScroll*1000):0;
}

dirViewport.addEventListener('scroll',syncRetroScrollbar,{passive:true});
retroScrollThumb?.addEventListener('input',()=>{
  const maxScroll=Math.max(0,dirViewport.scrollHeight-dirViewport.clientHeight);
  dirViewport.scrollTop=Number(retroScrollThumb.value)/1000*maxScroll;
});
retroScrollUp?.addEventListener('click',()=>{
  dirViewport.scrollTop=Math.max(0,dirViewport.scrollTop-78);
});
retroScrollDown?.addEventListener('click',()=>{
  dirViewport.scrollTop=Math.min(dirViewport.scrollHeight-dirViewport.clientHeight,dirViewport.scrollTop+78);
});

addEventListener('wheel',event=>{
  if(Math.abs(event.deltaY)<=Math.abs(event.deltaX))return;
  const maxScroll=Math.max(0,dirViewport.scrollHeight-dirViewport.clientHeight);
  if(!maxScroll)return;
  event.preventDefault();
  dirViewport.scrollTop=Math.max(0,Math.min(maxScroll,dirViewport.scrollTop+event.deltaY));
  syncRetroScrollbar();
},{passive:false});

const buttons=document.querySelectorAll('.nav-pill[data-filter]');
const empty=document.getElementById('empty');
buttons.forEach(b=>b.addEventListener('click',()=>{
  if(b.getAttribute('aria-disabled')==='true')return;
  buttons.forEach(x=>x.classList.toggle('active',x===b));
  let shown=0;
  rows.forEach(({el,d})=>{
    if(!d.p)return;
    const yes=b.dataset.filter==='all'||d.p.category===b.dataset.filter;
    el.hidden=!yes;
    if(yes)shown++;
  });
  empty.classList.toggle('show',!shown);
  requestAnimationFrame(syncRetroScrollbar);
}));

const filterNav=document.querySelector('.labzNav');
function updateHorizontalCue(el){
  if(!el)return;
  const max=Math.max(0,el.scrollWidth-el.clientWidth);
  el.classList.toggle('has-scroll-left',el.scrollLeft>2);
  el.classList.toggle('has-scroll-right',el.scrollLeft<max-2);
}

function updateHorizontalCues(){
  updateHorizontalCue(filterNav);
  updateHorizontalCue(dirViewport);
  rows.forEach(({el})=>updateHorizontalCue(el));
  syncRetroScrollbar();
}

[filterNav,dirViewport].forEach(el=>el?.addEventListener('scroll',()=>updateHorizontalCue(el),{passive:true}));
rows.forEach(({el})=>el.addEventListener('scroll',()=>updateHorizontalCue(el),{passive:true}));
addEventListener('resize',updateHorizontalCues);
requestAnimationFrame(updateHorizontalCues);
setTimeout(updateHorizontalCues,700);

let projectLeaving=false;
rows.forEach(({el,d},index)=>{
  if(!d.p)return;
  el.style.setProperty('--exit-delay',`${.24+index*.07}s`);
  el.addEventListener('click',event=>{
    if(el.getAttribute('target')==='_blank') return;
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
    event.preventDefault();
    if(projectLeaving)return;
    projectLeaving=true;
    hideAscii();
    document.body.classList.add('project-exit');
    setTimeout(()=>document.body.classList.add('project-fade'),520);
    setTimeout(()=>{location.href=el.href},1120);
  });
});

const homeLink=document.querySelector('.tokonoma-logo-link');
homeLink?.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
  event.preventDefault();
  if(projectLeaving)return;
  try{sessionStorage.setItem('tokonoma-nav-fall-through-seen','1')}catch(_){}
  projectLeaving=true;
  hideAscii();
  homeLink.classList.add('show-bye');
  document.body.classList.add('home-exit');
  setTimeout(()=>document.body.classList.add('project-fade'),520);
  setTimeout(()=>{location.href=homeLink.href},1120);
});

addEventListener('pageshow',()=>{
  projectLeaving=false;
  document.body.classList.remove('home-exit','project-exit','project-fade');
  homeLink?.classList.remove('show-bye');
  updateHorizontalCues();
});

const agencyName=document.getElementById('agencyName');
const agencies=['RAW','ISRO','DRDO','FBI','CIA','NSA','SECRET SERVICE','DHS','INTERPOL','MI6','GCHQ','DGSE','BND'];
let currentAgency=0,agencyRolling=false;

function changeAgency(){
  if(!agencyName||agencyRolling)return;
  let next;
  do{next=Math.floor(Math.random()*agencies.length)}while(next===currentAgency);
  currentAgency=next;
  agencyRolling=true;
  const incoming=document.createElement('span');
  incoming.className='agency-name-next';
  incoming.textContent=agencies[next];
  agencyName.appendChild(incoming);
  requestAnimationFrame(()=>requestAnimationFrame(()=>agencyName.classList.add('is-rolling')));
  setTimeout(()=>{
    agencyName.querySelector('.agency-name-current')?.remove();
    incoming.className='agency-name-current';
    agencyName.classList.remove('is-rolling');
    agencyRolling=false;
  },580);
}
setInterval(changeAgency,5000);

const asciiBase=figletRenders.slice(),asciiTreatments=[
  ['boxed',art=>{const lines=art.split('\n'),w=Math.max(...lines.map(line=>line.length));return `╔${'═'.repeat(w+2)}╗\n${lines.map(line=>`║ ${line.padEnd(w)} ║`).join('\n')}\n╚${'═'.repeat(w+2)}╝`}],
  ['terminal',art=>art.split('\n').map((line,i)=>`${String(i+1).padStart(2,'0')}> ${line}`).join('\n')],
  ['signal',art=>art.split('\n').map((line,i)=>`${i%2?'▓▒':'░▒'} ${line} ${i%2?'▒░':'▒▓'}`).join('\n')],
  ['bracket',art=>art.split('\n').map(line=>`[ ${line} ]`).join('\n')],
  ['scan',art=>art.split('\n').map((line,i)=>`${i%3===0?'──':'  '}${line}${i%3===0?'──':''}`).join('\n')],
  ['echo',art=>art.split('\n').map(line=>`${line}\n  ${line.replace(/\S/g,'░')}`).join('\n')],
  ['matrix',art=>art.split('\n').map((line,i)=>`${'01'[i%2]}│${line}│${'10'[i%2]}`).join('\n')]
];
asciiBase.forEach(render=>asciiTreatments.forEach(([name,treat])=>figletRenders.push({font:`${render.font}-${name}`,art:treat(render.art)})));

function syncScrollEndMask(){
  const max=Math.max(0,dirViewport.scrollHeight-dirViewport.clientHeight);
  dirViewport.classList.toggle('at-scroll-end',max<=0||dirViewport.scrollTop>=max-4);
}
dirViewport.addEventListener('scroll',syncScrollEndMask,{passive:true});
addEventListener('resize',syncScrollEndMask);
requestAnimationFrame(syncScrollEndMask);

const desktopNotice=document.querySelector('.desktop-view-notice');
if(desktopNotice){
  const shrug='<span class="notice-shrug">¯\\_(ツ)_/¯</span>';
  const gap='\u00a0\u00a0\u00a0\u00a0';
  const bigGap='\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0';
  const phrase=`BEST VIEWED ON DESKTOP${gap}${shrug}${gap}INTERACTIVE TERMINAL${gap}${shrug}${gap}ENJOY BRO`;
  const block=Array(4).fill(phrase).join(bigGap)+bigGap;
  desktopNotice.innerHTML=`<div class="desktop-view-notice-track"><span>${block}</span><span aria-hidden="true">${block}</span></div>`;
}

(function(){
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  const labzNav=document.querySelector('.labzNav');
  if(!labzNav)return;
  const MAX_TILT=8,PERSPECTIVE=900,BASE_TRANSFORM='translateX(-50%)';
  labzNav.addEventListener('mousemove',e=>{
    const rect=labzNav.getBoundingClientRect();
    const px=(e.clientX-rect.left)/rect.width;
    const py=(e.clientY-rect.top)/rect.height;
    const rotateY=(px-.5)*2*MAX_TILT;
    const rotateX=(.5-py)*2*MAX_TILT;
    labzNav.style.transform=`${BASE_TRANSFORM} perspective(${PERSPECTIVE}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });
  labzNav.addEventListener('mouseleave',()=>{labzNav.style.transform=BASE_TRANSFORM});
})();

})();
