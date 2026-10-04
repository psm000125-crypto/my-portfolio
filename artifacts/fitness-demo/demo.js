const {RepDetector, demoSample} = window.FitnessCounter;
const $ = id => document.getElementById(id);
const detector = new RepDetector();
const canvas = $('signal-chart'), ctx = canvas.getContext('2d');
let running = false, time = 0, simulationTarget = 0, lastFrame = null, frameId = 0;
let scenario = 'normal', source = 'demo', samples = [], sensorTimer = 0;
let baseline = null, sensorStart = 0, sensorOffset = 0;
const pad = value => String(value).padStart(2, '0');

function draw() {
  const width = canvas.clientWidth, height = canvas.clientHeight;
  if (!width || !height) return;
  const dpr = window.devicePixelRatio || 1;
  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const x = t => 28 + (t - Math.max(0, time - 8)) / 8 * (width - 40);
  const y = value => 15 + (5 - Math.max(-1, Math.min(5, value))) / 6 * (height - 36);
  ctx.font = '10px sans-serif'; ctx.fillStyle = '#66696c'; ctx.strokeStyle = '#d4dde3'; ctx.lineWidth = 1;
  for (const value of [0, 2, 4]) {
    ctx.beginPath(); ctx.moveTo(27,y(value)); ctx.lineTo(width-10,y(value)); ctx.stroke(); ctx.fillText(String(value),8,y(value)+3);
  }
  ctx.fillText('m/s²', 2, 10); ctx.fillText('최근 8초', width-56,height-2);
  ctx.strokeStyle='#8d765b'; ctx.setLineDash([4,5]); ctx.beginPath(); ctx.moveTo(28,y(detector.threshold)); ctx.lineTo(width-10,y(detector.threshold)); ctx.stroke(); ctx.setLineDash([]);
  for (const [key,color,lineWidth] of [['raw','#a6b4bf',1.2],['filtered','#244b70',2]]) {
    ctx.strokeStyle=color; ctx.lineWidth=lineWidth; ctx.beginPath();
    samples.forEach((sample,i)=> i ? ctx.lineTo(x(sample.time),y(sample[key])) : ctx.moveTo(x(sample.time),y(sample[key])));
    ctx.stroke();
  }
  ctx.fillStyle='#244b70';
  samples.filter(s=>s.counted).forEach(s=>{ctx.beginPath();ctx.arc(x(s.time),y(s.filtered),3.5,0,Math.PI*2);ctx.fill();});
}
function update() {
  $('rep-count').value=pad(detector.count);
  $('confirmed-count').value=pad(detector.count);
  $('raw-count').value=pad(detector.candidates);
  $('elapsed').textContent=`${pad(Math.floor(time/60))}:${pad(Math.floor(time%60))}`;
  draw();
}
function feed(value, at) {
  const sample=detector.sample(value,at);
  if (!sample) return;
  time=at; samples.push({...sample,time:at});
  samples=samples.filter(s=>s.time>=time-8);
}
function frame(now) {
  if (!running || source!=='demo') return;
  if (lastFrame!==null) {
    simulationTarget+=Math.min((now-lastFrame)/1000,0.1);
    while (time+1/60<=simulationTarget) {
      const at=time+1/60, signal=demoSample(at,scenario==='fast');
      feed(signal.value,at);
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) $('weight-stack').setAttribute('transform',`translate(0 ${-signal.lift*38})`);
    }
    update();
  }
  lastFrame=now; frameId=requestAnimationFrame(frame);
}
function stop() {
  running=false; lastFrame=null;
  cancelAnimationFrame(frameId); clearTimeout(sensorTimer);
  document.body.classList.remove('running');
  $('play').textContent=source==='demo'?'시연 시작':'측정 시작';
  $('state-label').textContent='일시정지';
}
function reset() {
  detector.reset(); time=0; simulationTarget=0; samples=[]; lastFrame=null; baseline=null;
  sensorOffset=0; sensorStart=0;
  $('weight-stack').setAttribute('transform','translate(0 0)'); update();
}
function start() {
  running=true; document.body.classList.add('running');
  $('play').textContent='일시정지'; $('state-label').textContent=source==='demo'?'동작 시연 중':'센서 입력 대기';
  if (source==='demo') {simulationTarget=time;lastFrame=null;frameId=requestAnimationFrame(frame);}
  else {
    sensorOffset=time;sensorStart=0;
    sensorTimer=setTimeout(()=>{if(running){stop();$('sensor-help').textContent='센서 데이터가 없습니다. 휴대전화에서 새 창으로 열거나 시연 모드를 이용하세요.';}},5000);
  }
}
$('play').onclick=()=>running?stop():start();
$('reset').onclick=()=>{stop();reset();$('state-label').textContent='시연 준비';};
document.querySelectorAll('[data-scenario]').forEach(button=>{
  button.onclick=()=>{
    stop();source='demo';scenario=button.dataset.scenario;reset();
    document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    $('source-label').textContent='SIMULATION';$('signal-source').textContent='시뮬레이션 신호';
    $('machine-caption').textContent='중량 스택의 상하 움직임 · 개념도';
    $('sensor-help').textContent='휴대전화에서는 센서 입력으로도 시험할 수 있습니다.';
    start();
  };
});
for(const id of ['threshold','cooldown']) {
  $(id).oninput=()=>{
    detector.threshold=Number($('threshold').value);detector.cooldown=Number($('cooldown').value)/1000;
    $('threshold-value').value=`${detector.threshold.toFixed(1)} m/s²`;
    $('cooldown-value').value=`${$('cooldown').value} ms`;
    // Start a new comparison when its judgment criteria change.
    reset();update();
  };
}
window.addEventListener('devicemotion',event=>{
  if(!running||source!=='sensor')return;
  let value=event.acceleration?.z;
  if(value===null||value===undefined) {
    const z=event.accelerationIncludingGravity?.z;
    if(!Number.isFinite(z))return;
    if(baseline===null)baseline=z;
    baseline+=0.02*(z-baseline);value=z-baseline;
  }
  if(!Number.isFinite(value))return;
  clearTimeout(sensorTimer);
  const now=performance.now()/1000;if(!sensorStart)sensorStart=now;
  feed(value,sensorOffset+now-sensorStart);update();
  $('state-label').textContent='센서 측정 중';
  sensorTimer=setTimeout(()=>{stop();$('sensor-help').textContent='센서 입력이 멈췄습니다. 측정 시작을 눌러 다시 연결하세요.';},5000);
});
$('sensor').onclick=async()=>{
  stop();
  if(!window.isSecureContext||!window.DeviceMotionEvent){$('sensor-help').textContent='센서 연결은 HTTPS의 지원 휴대전화 브라우저에서 사용할 수 있습니다. 여기서는 시연 시작을 눌러보세요.';return;}
  try {
    if(typeof DeviceMotionEvent.requestPermission==='function'){
      const permission=await DeviceMotionEvent.requestPermission();
      if(permission!=='granted')throw new Error('denied');
    }
    source='sensor';reset();
    document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed','false'));
    $('source-label').textContent='SENSOR';$('signal-source').textContent='실시간 휴대전화 입력';
    $('machine-caption').textContent='센서 연결 모드 · 위 그림은 설치 개념도';
    $('sensor-help').textContent='z축 방향으로 천천히 움직여보세요. 시연 버튼으로 시뮬레이션에 돌아갈 수 있습니다.';
    start();
  }catch{$('sensor-help').textContent='센서 접근이 허용되지 않았습니다. 시연 모드로도 동작을 확인할 수 있습니다.';}
};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)stop();});
new ResizeObserver(draw).observe(canvas);
function reportHeight() {
  if(window.parent!==window)window.parent.postMessage({type:'fitness-demo-height',height:Math.ceil(document.querySelector('.demo').getBoundingClientRect().height)},location.origin==='null'?'*':location.origin);
}
new ResizeObserver(reportHeight).observe(document.querySelector('.demo'));
update();
