/* Educational schematics, not a vessel simulation or measured performance. */
function shipProfileDrawing() {
 return `<g class="ship-profile"><path class="ship-solid" d="M80 190H650L605 270H148Z"/><path d="M170 190V125H280V190M194 125V92H256V125M226 92V57M280 155H572V190M305 155V120H548V155M305 120V100H548V120"/><path class="ship-fine" d="M105 220H633M138 249H617M195 142H212M227 142H244M305 165H548M325 155V190M385 155V190M445 155V190M505 155V190"/><circle cx="167" cy="225" r="7"/><circle cx="203" cy="225" r="7"/><circle cx="239" cy="225" r="7"/></g>`;
}
function shipDimensionMarkup() {
 return `<div class="ship-plate ship-dimensions" data-dimension="length"><div class="ship-plate-heading"><span>선체의 치수</span><span>측면 / 단면</span></div><svg viewBox="0 48 800 310" role="img" aria-labelledby="ship-dimension-title"><title id="ship-dimension-title">선박 측면과 단면의 전장, 형폭, 형깊이, 흘수 개념도</title><g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">${shipProfileDrawing()}<path class="ship-waterline" d="M50 233H690"/><g class="ship-measure ship-length"><path d="M80 305H650M80 293V317M650 293V317M80 285V197M650 285V197"/></g><g class="ship-cross-section"><path class="ship-solid" d="M711 125H781V246Q746 290 711 246Z"/><path class="ship-waterline" d="M695 220H797"/><g class="ship-measure ship-breadth"><path d="M711 99H781M711 91V107M781 91V107"/></g><g class="ship-measure ship-depth"><path d="M690 125V265M684 125H696M684 265H696"/></g><g class="ship-measure ship-draft"><path d="M790 220V265M784 220H796M784 265H796"/></g></g></g><g class="ship-svg-labels"><text class="ship-length ship-measure" x="365" y="345">전장 · LOA</text><text class="ship-breadth ship-measure" x="746" y="76">B</text><text class="ship-depth ship-measure" x="680" y="200">D</text><text class="ship-draft ship-measure" x="780" y="307">T</text><text x="746" y="345">단면</text></g></svg><div class="ship-controls" role="group" aria-label="선박 치수 선택">${[['length','전장 LOA'],['breadth','형폭 B'],['depth','형깊이 D'],['draft','흘수 T']].map(([id,label],i)=>`<button type="button" data-ship-dimension="${id}" aria-pressed="${!i}">${label}</button>`).join('')}</div><p class="ship-control-caption" data-dimension-caption aria-live="polite">선수에서 선미까지, 선박 전체의 길이.</p></div>`;
}
function shipStabilityMarkup() {
 return `<div class="ship-plate ship-stability" data-heel="upright"><div class="ship-plate-heading"><span>무게와 부력</span><span>선체 단면</span></div><svg viewBox="0 43 700 285" role="img" aria-labelledby="ship-stability-title"><title id="ship-stability-title">직립과 경사 상태의 무게중심 G, 부력중심 B와 복원정 GZ 개념도</title><defs><marker id="ship-force-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker></defs><path class="ship-sea-fill" d="M35 190H665V330H35Z"/><path class="ship-waterline" d="M35 190H665"/><g class="ship-heeling-hull"><path class="ship-section-hull" d="M215 100H485L448 242Q350 293 252 242Z"/><path class="ship-section-ribs" d="M237 135H463M246 169H455"/></g><g class="ship-force weight"><path d="M350 154V259" marker-end="url(#ship-force-arrow)"/><circle cx="350" cy="148" r="5"/><text x="325" y="150">G</text><text x="260" y="310">무게 ↓</text></g><g class="ship-force buoyancy"><path d="M350 218V108" marker-end="url(#ship-force-arrow)"/><circle cx="350" cy="225" r="5"/><text x="375" y="239">B</text></g><text class="ship-buoyancy-label" x="485" y="62">부력 ↑</text><path class="ship-gz" d="M350 277H420M350 271V283M420 271V283"/><text class="ship-gz" x="389" y="315">GZ</text></svg><div class="ship-controls" role="group" aria-label="선체 경사 상태 선택"><button type="button" data-ship-heel="upright" aria-pressed="true">직립</button><button type="button" data-ship-heel="heeled" aria-pressed="false">경사</button></div><p class="ship-control-caption" data-heel-caption aria-live="polite">직립 상태에서는 무게와 부력의 작용선이 같은 선 위에 놓입니다.</p><small class="ship-concept-note">안정한 선박의 복원 원리를 단순화한 개념도</small></div>`;
}
const shipMotionModes = [
 ['surge','전후동요','앞뒤로 이동','병진'],['sway','좌우동요','좌우로 이동','병진'],['heave','상하동요','위아래로 이동','병진'],
 ['roll','횡동요','선수–선미 축을 중심으로 회전','회전'],['pitch','종동요','좌우 축을 중심으로 회전','회전'],['yaw','선수동요','수직 축을 중심으로 회전','회전']
];
function shipMotionMarkup() {
 return `<div class="ship-motion-exhibit"><div class="ship-motion-graphic"><span>6 DEGREES OF FREEDOM</span><div class="ship-motion-space"><svg class="ship-motion-vessel" viewBox="0 0 800 360" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">${shipProfileDrawing()}</g></svg><div class="ship-motion-reference" aria-hidden="true"></div></div><p data-motion-caption aria-live="polite">병진 3방향 · 회전 3방향</p><small>선박 운동의 방향을 보여주는 개념 애니메이션</small></div><div class="ship-motion-controls" role="group" aria-label="선박 운동 선택">${shipMotionModes.map(([id,label,description,kind])=>`<button type="button" data-ship-motion="${id}" aria-pressed="false"><span>${kind}</span><strong>${label}</strong><small>${description}</small></button>`).join('')}<button type="button" class="ship-motion-stop" data-ship-stop>움직임 멈추기</button></div></div>`;
}
function shipBuildMarkup() {
 const stages=['블록 제작','조립·탑재','의장·진수','시운전'];
 return `<div class="ship-build-exhibit"><div class="ship-build-graphic"><div class="ship-plate-heading"><span>블록에서 선박으로</span><span data-build-label>블록 제작</span></div><svg viewBox="0 0 800 365" role="img" aria-labelledby="ship-build-title"><title id="ship-build-title">세 개의 선체 블록이 합쳐지고 의장, 진수, 시운전으로 이어지는 건조 개념도</title><g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><g class="ship-build-block block-a"><path class="ship-solid" d="M80 210H265V280H146Z"/><path d="M104 239H265M167 210V280M224 210V280"/></g><g class="ship-build-block block-b"><path class="ship-solid" d="M265 210H480V280H265Z"/><path d="M265 239H480M324 210V280M394 210V280M454 210V280"/></g><g class="ship-build-block block-c"><path class="ship-solid" d="M480 210H680L624 280H480Z"/><path d="M480 239H654M525 210V280M587 210V280"/></g><g class="ship-build-outfit"><path d="M170 210V133H283V210M193 133V92H260V133M227 92V53M305 210V155H569V210M330 155V126H540V155"/><path class="ship-fine" d="M185 153H268M185 177H268M325 175H548M325 192H548"/></g><path class="ship-build-sea ship-waterline" d="M45 307q30-10 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0"/><path class="ship-build-trial" d="M90 347H680M666 338L680 347L666 356"/></g></svg><div class="ship-build-track" aria-hidden="true"><i></i></div></div><div class="ship-build-stages" role="group" aria-label="건조 단계 선택">${stages.map((label,i)=>`<button type="button" data-ship-build="${i}" aria-pressed="${!i}"><span>0${i+1}</span>${label}</button>`).join('')}</div><p class="ship-control-caption">블록 단계의 선행의장·선행도장 → 탑재 → 진수 → 안벽의장 → 시운전</p></div>`;
}
function shipCourseMarkup(story) {
 const sections=story[3];
 const topic=(i,visual=academyCourseVisualMarkup(0,i),wide=false)=>`<section class="ship-topic${wide?' ship-topic-motion':''}" id="activity-academy-story-0-section-${i}" tabindex="-1"><h4>${escapeHTML(sections[i][0])}</h4><div class="ship-topic-body"><div class="story-section-copy">${sections[i].slice(1).map(p=>`<p>${escapeHTML(p)}</p>`).join('')}</div><div class="ship-topic-visual">${visual}</div></div></section>`;
 const topics=indices=>indices.map(i=>topic(i)).join('');
 return `<article class="story-content story-article enriched-story visual-academy ship-course"><header class="ship-course-header"><p>선박 교과 교육</p><h2>선박을 설계하고,<br><em>바다를 이해하다.</em></h2><div class="ship-course-contents"><a href="#academy/story-0" data-ship-jump="ship-scene-design">01 설계</a><a href="#academy/story-0" data-ship-jump="ship-scene-motion">02 움직임</a><a href="#academy/story-0" data-ship-jump="ship-scene-build">03 건조</a></div></header><div class="story-notes"><section class="ship-scene" id="ship-scene-design" aria-labelledby="ship-design-heading"><header class="ship-scene-header"><span>01 / DESIGN</span><h3 id="ship-design-heading">치수에서 구조로.</h3><p>길이·폭·깊이·흘수, 그리고 그 안에 놓이는 공간과 설비.</p></header>${topic(0,shipDimensionMarkup())}<div class="ship-design-concepts"><div><span>배치</span><strong>화물창 · 기관실 · 탱크</strong></div><div><span>구조</span><strong>판 → 보강재 → 선체</strong></div><div><span>의장</span><strong>추진 · 화물 · 생활 · 안전</strong></div></div><div class="ship-course-reading">${topics([5,7])}</div></section><section class="ship-scene" id="ship-scene-motion" aria-labelledby="ship-motion-heading"><header class="ship-scene-header"><span>02 / MOTION</span><h3 id="ship-motion-heading">기울고, 되돌아오다.</h3><p>무게와 부력의 관계에서 파랑 중 움직임과 조종까지.</p></header>${topic(1,shipStabilityMarkup())}<div class="ship-course-reading">${topic(3,shipMotionMarkup(),true)}${topics([2,4,6])}</div></section><section class="ship-scene" id="ship-scene-build" aria-labelledby="ship-build-heading"><header class="ship-scene-header"><span>03 / BUILD</span><h3 id="ship-build-heading">조각이 모여, 한 척으로.</h3><p>제작한 블록이 선체가 되고, 장비와 운항 성능을 확인하기까지.</p></header>${topic(8,shipBuildMarkup())}<div class="ship-course-reading">${topics([9,10])}</div></section></div></article>`;
}
function bindShipCourse(root) {
 const course=root.querySelector('.ship-course');if(!course)return ()=>{};
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const dimensions={length:'선수에서 선미까지, 선박 전체의 길이.',breadth:'선체 단면에서 살펴보는 폭.',depth:'선체의 기준선에서 갑판까지의 깊이.',draft:'수면 아래 잠긴 깊이 · 설계·만재·구조 기준'};
 const pressed=(selector,button)=>course.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let motionTimer=0,raf=0,manualBuild=false,buildElapsed=0,buildLast=0,buildVisible=false,tracksVisible=false;
 const motion=course.querySelector('.ship-motion-vessel');
 const stop=()=>{clearTimeout(motionTimer);motion.removeAttribute('data-motion');pressed('[data-ship-motion]',null);};
 const build=course.querySelector('.ship-build-exhibit');
 const setBuild=value=>{
  build.style.setProperty('--assembly',String(Math.min(1,value*2)));
  build.style.setProperty('--outfit',String(Math.max(0,Math.min(1,(value-.4)*4))));
  build.style.setProperty('--launch',String(Math.max(0,Math.min(1,(value-.65)*4))));
  build.style.setProperty('--trial',String(Math.max(0,Math.min(1,(value-.85)*7))));
  build.style.setProperty('--build-progress',String(value));
  const stage=value>=.9?3:value>=.6?2:value>=.2?1:0;
  const buttons=[...course.querySelectorAll('[data-ship-build]')];
  pressed('[data-ship-build]',buttons[stage]);
  course.querySelector('[data-build-label]').textContent=['블록 제작','조립·탑재','의장·진수','시운전'][stage];
 };
 const buildDuration=16000;
 const tick=now=>{
  raf=0;
  if(!buildVisible||manualBuild||document.hidden||preference.matches)return;
  if(buildLast)buildElapsed+=Math.min(now-buildLast,100);
  buildLast=now;
  setBuild(Math.min(1,buildElapsed/buildDuration));
  if(buildElapsed<buildDuration)raf=requestAnimationFrame(tick);
 };
 const resumeBuild=()=>{buildLast=0;if(buildVisible&&!manualBuild&&!document.hidden&&!preference.matches&&!raf&&buildElapsed<buildDuration)raf=requestAnimationFrame(tick);};
 const update=()=>{if(preference.matches){cancelAnimationFrame(raf);raf=0;setBuild(1);}else resumeBuild();};
 // Trim unused SVG headroom so the drawing starts alongside the first text line.
 course.querySelectorAll('.academy-illustration>svg').forEach(svg=>{
  const boxes=[...svg.querySelectorAll('path,rect,text,circle')].filter(e=>!e.closest('defs')&&!e.classList.contains('ship-track-marker')).map(e=>e.getBBox());
  const box={y:Math.min(...boxes.map(b=>b.y))};box.height=Math.max(...boxes.map(b=>b.y+b.height))-box.y;
  const view=svg.viewBox.baseVal;
  const top=Math.max(0,box.y-4);
  svg.setAttribute('viewBox',`${view.x} ${top} ${view.width} ${Math.max(1,box.y+box.height+8-top)}`);
 });
 const figureSets=[];
 course.querySelectorAll('.academy-practice-visuals').forEach((group,setIndex)=>{
  const figures=[...group.querySelectorAll(':scope > figure')];if(figures.length<2)return;
  const labels=setIndex===0?['하중 전달','보강판 구조']:['저항 구분','모형시험'];
  const tabs=document.createElement('div');tabs.className='ship-figure-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','개념도 선택');
  figures.forEach((figure,i)=>{
   const id=`ship-figure-${setIndex}-${i}`;
   figure.id=id;figure.setAttribute('role','tabpanel');figure.setAttribute('aria-labelledby',id+'-tab');figure.hidden=i>0;
   const button=document.createElement('button');button.type='button';button.id=id+'-tab';button.dataset.shipFigure=String(i);button.setAttribute('role','tab');button.setAttribute('aria-controls',id);button.setAttribute('aria-selected',String(!i));button.tabIndex=i?-1:0;button.textContent=labels[i]||figure.querySelector('strong').textContent;
   tabs.append(button);
  });
  group.prepend(tabs);figureSets.push({group,figures,tabs});
 });
 const selectFigure=(set,index)=>{
  set.figures.forEach((figure,i)=>{figure.hidden=i!==index;const button=set.tabs.children[i];button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;});
 };
 const replay=document.createElement('button');replay.type='button';replay.className='ship-track-toggle';replay.dataset.shipBuildReplay='';replay.textContent='건조 과정 다시 보기';build.append(replay);
 const tracks=course.querySelector('.ship-steering-tracks');
 if(tracks){const button=document.createElement('button');button.type='button';button.className='ship-track-toggle';button.dataset.shipTracks='';button.textContent='조종 궤적 멈추기';button.setAttribute('aria-pressed','false');tracks.closest('figure').append(button);}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.target===build){buildVisible=entry.isIntersecting&&entry.intersectionRatio>=.55;if(buildVisible)resumeBuild();else{cancelAnimationFrame(raf);raf=0;buildLast=0;}}
  else{tracksVisible=entry.isIntersecting&&entry.intersectionRatio>=.55;entry.target.toggleAttribute('data-running',tracksVisible&&!document.hidden&&!preference.matches);}
 }),{threshold:.55});
 observer.observe(build);if(tracks)observer.observe(tracks);
 const onKey=event=>{
  const tab=event.target.closest('[data-ship-figure]');if(!tab)return;
  const set=figureSets.find(set=>set.tabs.contains(tab));const count=set.figures.length;let index=Number(tab.dataset.shipFigure);
  if(event.key==='ArrowRight')index=(index+1)%count;else if(event.key==='ArrowLeft')index=(index+count-1)%count;else if(event.key==='Home')index=0;else if(event.key==='End')index=count-1;else return;
  event.preventDefault();selectFigure(set,index);set.tabs.children[index].focus();
 };
 const onClick=event=>{
  const button=event.target.closest('button');
  const jump=event.target.closest('[data-ship-jump]');
  if(jump){if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();course.querySelector('#'+jump.dataset.shipJump)?.scrollIntoView({behavior:preference.matches?'instant':'smooth',block:'start'});return;}
  if(!button)return;
  if(button.hasAttribute('data-ship-build-replay')){manualBuild=false;buildElapsed=0;buildLast=0;setBuild(preference.matches?1:0);resumeBuild();}
  if(button.hasAttribute('data-ship-figure')){const set=figureSets.find(set=>set.tabs.contains(button));selectFigure(set,Number(button.dataset.shipFigure));}
  if(button.hasAttribute('data-ship-tracks')){const paused=tracks.toggleAttribute('data-paused');button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'조종 궤적 재생':'조종 궤적 멈추기';}
  if(button.dataset.shipDimension){course.querySelector('.ship-dimensions').dataset.dimension=button.dataset.shipDimension;pressed('[data-ship-dimension]',button);course.querySelector('[data-dimension-caption]').textContent=dimensions[button.dataset.shipDimension];}
  if(button.dataset.shipHeel){course.querySelector('.ship-stability').dataset.heel=button.dataset.shipHeel;pressed('[data-ship-heel]',button);course.querySelector('[data-heel-caption]').textContent=button.dataset.shipHeel==='upright'?'직립 상태에서는 무게와 부력의 작용선이 같은 선 위에 놓입니다.':'선체가 기울면 부력중심이 이동하고, 작용선 사이의 거리 GZ가 복원 모멘트와 연결됩니다.';}
  if(button.dataset.shipMotion){stop();const mode=shipMotionModes.find(m=>m[0]===button.dataset.shipMotion);course.querySelector('[data-motion-caption]').textContent=`${mode[1]} · ${mode[2]}`;pressed('[data-ship-motion]',button);if(!preference.matches){void motion.getBoundingClientRect();motion.dataset.motion=mode[0];motionTimer=setTimeout(()=>motion.removeAttribute('data-motion'),4400);}}
  if(button.hasAttribute('data-ship-stop')){stop();course.querySelector('[data-motion-caption]').textContent='병진 3방향 · 회전 3방향';}
  if(button.hasAttribute('data-ship-build')){manualBuild=true;cancelAnimationFrame(raf);raf=0;setBuild([0,.4,.75,1][Number(button.dataset.shipBuild)]);}
 };
 const onPreference=()=>{stop();if(tracks)tracks.toggleAttribute('data-running',tracksVisible&&!preference.matches&&!document.hidden);update();};
 const onVisibility=()=>{if(document.hidden){stop();cancelAnimationFrame(raf);raf=0;buildLast=0;if(tracks)tracks.removeAttribute('data-running');}else{resumeBuild();if(tracks)tracks.toggleAttribute('data-running',tracksVisible&&!preference.matches);}};
 course.addEventListener('click',onClick);course.addEventListener('keydown',onKey);preference.addEventListener('change',onPreference);document.addEventListener('visibilitychange',onVisibility);
 update();
 return ()=>{stop();cancelAnimationFrame(raf);observer.disconnect();course.removeEventListener('click',onClick);course.removeEventListener('keydown',onKey);preference.removeEventListener('change',onPreference);document.removeEventListener('visibilitychange',onVisibility);};
}
