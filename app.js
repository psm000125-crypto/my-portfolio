const nav = document.querySelector('#experience-nav');
const fontLink=document.createElement('link');fontLink.rel='stylesheet';fontLink.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap';document.head.append(fontLink);
const view = document.querySelector('#main-view');
const panel = document.querySelector('#detail-panel');
const number = i => String(i + 1).padStart(2,'0');
const roots=experiences.filter(p=>!p.parent);
const navLink=(p,i,child=false)=>`<a class="nav-item${child?' nav-child':''}" href="#${p.id}" data-id="${p.id}"><span class="num">${child?'↳':number(i)}</span><span><strong>${p.title}</strong><small>${p.shortDate}</small></span><span class="arrow">›</span></a>`;
function renderNavigation(projectId,selection){
 rememberAcademyMenu(nav);
 nav.innerHTML=roots.map((p,i)=>p.id==='academy'?academyNavigationMarkup(projectId,selection):navLink(p,i)).join('');
 bindAcademyMenu(nav);
}
const crystal = `<div class="crystal-wrap" aria-hidden="true"><svg class="crystal" viewBox="0 0 180 220"><defs><linearGradient id="quartz" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fbe4df"/><stop offset=".55" stop-color="#FAF6F5" stop-opacity=".7"/><stop offset="1" stop-color="#bda2a4" stop-opacity=".35"/></linearGradient></defs><polygon points="90,8 151,66 140,156 77,211 29,145 36,63" fill="url(#quartz)"/><polygon points="90,8 102,86 36,63" fill="#fff8"/><polygon points="90,8 151,66 102,86" fill="#edbcbe88"/><polygon points="36,63 102,86 29,145" fill="#f9d4cb88"/><polygon points="102,86 151,66 140,156" fill="#c49c9e66"/><polygon points="102,86 140,156 77,211" fill="#ead6d344"/><polygon points="29,145 102,86 77,211" fill="#f8e7e280"/><line x1="36" y1="63" x2="140" y2="156"/><line x1="29" y1="145" x2="151" y2="66"/></svg></div>`;
function profile(){
 view.innerHTML=`
  <article class="resume-profile">
   <header class="resume-head">
    <div class="resume-kicker"><span>PROFILE</span><small>2026</small></div>
    <div class="resume-title-row"><h1>편성민</h1><p class="resume-name">Pyeon Seongmin</p></div>
    <p class="resume-role">품질관리 · 소재 연구 · 데이터 분석</p>
   </header>
   <div class="profile-content-grid">
    <section class="resume-facts" aria-labelledby="profile-facts-heading">
     <h2 id="profile-facts-heading">기본 정보</h2>
     <div><span>생년월일</span><strong>2002.04.17</strong></div>
     <div><span>학력</span><strong>금오공과대학교 신소재공학과</strong></div>
     <div class="active-fact"><span>활동</span><ul class="fact-list"><li>HD 현대중공업 Future Builder Academy</li><li>HD 선박 전기설비 운용 교육</li><li>계림금속 MIM 품질관리 인턴십</li></ul></div>
     <div><span>연락처</span><strong><a href="tel:01087548353">010-8754-8353</a></strong></div>
    </section>
    <section class="profile-aside" aria-labelledby="profile-archive-heading">
     <h2 id="profile-archive-heading">경험 아카이브</h2>
     <dl>
      <div><dt>FIELD</dt><dd><a class="profile-experience-link" href="#mim">MIM 공정 품질관리</a><a class="profile-experience-link" href="#academy">HD현대 Future Builder 아카데미</a></dd></div>
      <div><dt>MATERIALS</dt><dd><a class="profile-experience-link" href="#alloy">고규소 Fe–Si 합금 설계</a><a class="profile-experience-link" href="#xrd">세라믹 칼 X선 분석</a><a class="profile-experience-link" href="#energy">에너지재료설계</a></dd></div>
      <div><dt>DATA</dt><dd><a class="profile-experience-link" href="#sejong">세종상권나침반</a><a class="profile-experience-link" href="#coating">선박 도장 불량 분류 AI</a><a class="profile-experience-link" href="#fitness">운동 횟수 측정 앱</a></dd></div>
     </dl>
    </section>
   </div>
   <section class="resume-tools profile-tools" aria-labelledby="profile-tools-heading">
    <h2 id="profile-tools-heading">활용 도구</h2>
    <ul>
     <li><h3>Data &amp; Analysis</h3><p>Python · NumPy · pandas · scikit-learn</p></li>
     <li><h3>AI &amp; Vision</h3><p>PyTorch · torchvision</p></li>
     <li><h3>Materials &amp; Quality</h3><p>디지털 게이지 · 버니어 캘리퍼스<br>형상 측정기 · <span class="tool-term">접촉·비접촉 3차원 측정기</span><br>표면조도계 · X-ray</p></li>
    </ul>
   </section>
  </article>`;
 panel.replaceChildren();
}
const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const escapeHTML=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let currentProject=null,currentRoute=null,activeSlide=0;
function animateIn(element,delay=0){if(!reducedMotion())element.animate([{opacity:0,transform:'translate(28px,12px)'},{opacity:1,transform:'translate(0,0)'}],{duration:500,delay,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});}
function stat(label,value,detail){return `<article class="summary-stat"><span>${label}</span><strong>${value}</strong><small>${detail}</small></article>`;}
function xrdPhaseChart(){
 const rows=[['저가',76,30],['중가',78,42],['고가',84,65]];
 return `<figure class="evidence-chart xrd-phase-chart"><figcaption>정방정상 분율 <small>110℃ 수증기 100시간 전후 · 발표자료 기준</small></figcaption><div class="evidence-legend"><span>열화 전</span><span>열화 후</span></div><div class="evidence-chart-rows">${rows.map(([label,before,after])=>`<div class="evidence-chart-row"><b>${label}</b><div class="evidence-bar-pair"><div class="evidence-bar"><span style="--bar-value:${before}%"></span><strong>${before}%</strong></div><div class="evidence-bar after"><span style="--bar-value:${after}%"></span><strong>${after}%</strong></div></div></div>`).join('')}</div></figure>`;
}
function alloyMetricCharts(){
 const metrics=[
  {title:'비커스 경도',unit:'HV',max:310,rows:[['Pure Fe',70.5,219.0],['Fe-3.5 wt% Si',75.0,234.7],['Fe-6.5 wt% Si',79.8,308.7]]},
  {title:'기공률',unit:'%',max:5,rows:[['Pure Fe',3.537,3.191],['Fe-3.5 wt% Si',4.908,2.299],['Fe-6.5 wt% Si',3.090,2.752]]}
 ];
 return `<div class="alloy-chart-grid">${metrics.map(metric=>`<figure class="evidence-chart alloy-chart"><figcaption>${metric.title} <small>열간 압연 전후 · ${metric.unit}</small></figcaption><div class="evidence-legend"><span>압연 전</span><span>압연 후</span></div><div class="evidence-chart-rows">${metric.rows.map(([label,before,after])=>{const digits=metric.unit==='%'?3:1;return `<div class="evidence-chart-row"><b>${label}</b><div class="evidence-bar-pair"><div class="evidence-bar"><span style="--bar-value:${before/metric.max*100}%"></span><strong>${before.toFixed(digits)}${metric.unit==='HV'?' HV':'%'}</strong></div><div class="evidence-bar after"><span style="--bar-value:${after/metric.max*100}%"></span><strong>${after.toFixed(digits)}${metric.unit==='HV'?' HV':'%'}</strong></div></div></div>`;}).join('')}</div></figure>`).join('')}</div>`;
}
function summaryMarkup(id){
 if(id==='coating')return `<section class="project-summary coating-summary" aria-label="선박 도장 불량 분류 프로젝트 요약"><header class="summary-hero"><span class="summary-kicker">PROJECT SNAPSHOT</span><h3>선박 도장 불량 분류 AI</h3><p>5개 표면 상태를 분류하고, 여러 모델의 예측을 결합해 최종 제출 결과를 만들었습니다.</p></header><div class="summary-stats">${stat('TEST SET','1,000','최종 테스트 세트 이미지')}${stat('SUBMISSION SCORE','0.970905','발표자료에 기록된 제출 점수')}</div><section class="summary-panel"><div class="summary-section-heading"><span>01</span><div><h4>학습부터 최종 예측까지</h4><p>검증 단계를 나눠 보고, 최종 단계에서만 앙상블을 적용했습니다.</p></div></div><div class="summary-pipeline"><div class="pipeline-node"><b>INPUT</b><span>5개 표면 상태</span></div><i aria-hidden="true">→</i><div class="pipeline-node"><b>TRAIN</b><span>3개 모델 · K-Fold</span></div><i aria-hidden="true">→</i><div class="pipeline-node accent"><b>ENSEMBLE</b><span>4방향 TTA · OOF F1</span></div></div></section><section class="summary-panel split"><div><div class="summary-section-heading compact"><span>02</span><div><h4>최종 예측 분포</h4><p>테스트 세트 1,000건의 클래스별 예측입니다.</p></div></div><div class="distribution-chart" aria-label="최종 예측 분포"><div><label>Scratch <em>357</em></label><span><i style="--value:35.7%"></i></span></div><div><label>Peeling <em>310</em></label><span><i style="--value:31%"></i></span></div><div><label>Normal <em>168</em></label><span><i style="--value:16.8%"></i></span></div><div><label>Blister <em>88</em></label><span><i style="--value:8.8%"></i></span></div><div><label>Inclusion <em>77</em></label><span><i style="--value:7.7%"></i></span></div></div></div><aside class="summary-callout"><span>READING NOTE</span><p>4방향 TTA와 OOF F1 가중 soft voting은 각 모델의 예측을 단순 평균하지 않고 검증 성능을 반영해 결합한 방식입니다.</p></aside></section></section>`;
 if(id==='xrd')return `<section class="project-summary xrd-summary" aria-label="세라믹 칼 XRD 분석 프로젝트 요약"><header class="summary-hero"><span class="summary-kicker">PROJECT SNAPSHOT</span><h3>세라믹 칼 XRD 분석</h3><p>가격대 3종의 몸통과 날 끝에서 XRD 패턴과 열화 전후의 상분율을 비교했습니다.</p></header><div class="summary-stats">${stat('MEASUREMENT POINTS','6','가격대 3종 × 몸통과 날')}${stat('ANALYSIS','FullProf','리트벨트 정련 기반 상분율 정량화')}</div><section class="summary-panel"><div class="summary-section-heading"><span>01</span><div><h4>열화 전후의 상분율 변화</h4><p>세 가격대의 정방정상 분율을 같은 기준으로 비교했습니다.</p></div></div>${xrdPhaseChart()}</section><section class="summary-panel"><div class="summary-section-heading"><span>02</span><div><h4>소결온도를 나눠 추가 실험</h4><p>별도 제작 시편으로 조성 외 공정조건의 영향을 비교했습니다.</p></div></div>${storyFlow('추가 시편의 제조와 시험', [['분말 성형','YSZ / 일축가압'],['부분 소결','1,000℃ / 2시간'],['최종 소결','1,325℃와 1,425℃ / 각 2시간'],['열화 시험','110℃ 수증기 / 100시간']])}<dl class="story-compare-list"><div><dt>1,325℃ 소결 시편</dt><dd>저온열화 후 정방정상 94%</dd></div><div><dt>1,425℃ 소결 시편</dt><dd>저온열화 후 단사정상 30%</dd></div></dl></section></section>`;
 if(id==='energy')return `<section class="project-summary energy-summary" aria-label="Co-doped ZnO CNT 구배 코팅 설계 프로젝트 요약"><header class="summary-hero"><span class="summary-kicker">CONCEPT DESIGN</span><h3>Co-doped ZnO/CNT 경사 계면층 설계</h3><p>선행논문 2편의 구조와 성능을 비교해 3층 계면층을 제안했습니다.</p></header><div class="summary-stats">${stat('STRUCTURE','3층','하부층 · 전이층 · 상부층')}${stat('LITERATURE','2편','GZCNT 구조 / Co 도핑 ZnO 성능')}</div><section class="summary-panel energy-design-panel">${energyLayerVisual()}</section><section class="summary-panel energy-comparison-panel">${energyLiteratureVisual()}</section></section>`;
 if(id==='alloy')return `<section class="project-summary alloy-summary" aria-label="고규소 Fe Si 합금 연구 요약"><header class="summary-hero"><span class="summary-kicker">RESEARCH SNAPSHOT</span><h3>고규소 Fe-Si 합금 설계</h3><p>조성별 분말 압연·소결 시편을 열간 압연 전후로 비교해, 강도·기공률·미세조직·자기적 특성의 변화를 함께 정리했습니다.</p></header><div class="summary-stats">${stat('HARDNESS','79.8 → 308.7 HV','Fe-6.5 wt% Si · 열간 압연 전후')}${stat('SAMPLES','8','4개 조성 × 열간 압연 전후')}</div><section class="summary-panel"><div class="summary-section-heading"><span>01</span><div><h4>비교 범위와 제조 조건</h4><p>Pure Fe, Fe-3.5, Fe-4.5, Fe-6.5 wt% Si 조성을 비교했습니다. 수치 표는 동일 조성의 열간 압연 전과 후를 나란히 둔 결과입니다.</p></div></div><div class="research-flow"><span>분말 혼합 · 압연</span><i>→</i><span>1,150°C 소결</span><i>→</i><span>800°C 열간 압연</span><i>→</i><span>특성 측정 · 비교</span></div><p class="alloy-process-note">시편·열처리 일정 관리, 분말 압연·소결 참여, 열간 압연을 맡아 제조부터 결과 비교까지 연결했습니다.</p></section><section class="summary-panel alloy-result-panel"><div class="summary-section-heading compact"><span>02</span><div><h4>열간 압연 전후의 정량 결과</h4><p>세 조성에서 경도는 증가했고, 기공률은 감소했습니다. 값의 순서는 모두 <b>압연 전 → 열간 압연 후</b>입니다.</p></div></div>${alloyMetricCharts()}</section><section class="summary-panel alloy-evidence-panel"><div class="summary-section-heading compact"><span>03</span><div><h4>수치와 함께 확인한 관찰</h4><p>기계적 특성만 분리하지 않고 XRD·집합조직·투자율 결과를 같은 맥락에서 검토했습니다.</p></div></div><div class="alloy-evidence-grid"><article><span>XRD</span><strong>BCC α-Fe 유지</strong><p>모든 조성에서 (110), (200), (211) 피크를 확인했고, Pure Fe에서는 산화물 피크가 비교적 뚜렷했습니다.</p></article><article><span>TEXTURE</span><strong>&lt;100&gt;//RD 경향</strong><p>극점도 최대 강도는 1.2–1.35 m.r.d.로 약했지만, Si 함량이 늘수록 압연 방향을 따른 부분적인 경향을 관찰했습니다.</p></article><article><span>PERMEABILITY</span><strong>압연 후 전반적 개선 경향</strong><p>모든 시편은 주파수가 올라갈수록 투자율이 낮아졌고, 압연 전에는 Si 함량이 높을수록 투자율이 높아 Fe-6.5wt%Si가 가장 높았습니다.</p></article></div></section></section>`;
 return '';
}
function mimStoryMarkup(){
 const stages=[
  ['혼련','금속 분말과 바인더를 고르게 섞어 피드스톡을 만듭니다.','바인더는 분말이 금형 안으로 흐르고 성형체의 형태를 유지하도록 돕습니다. 현장에서 금속 분말과 바인더를 조합하는 혼련 공정을 견학했습니다.'],
  ['사출','피드스톡을 금형에 주입해 그린 파트로 성형합니다.','러너와 게이트를 거쳐 부품이 성형되는 과정을 확인했습니다. 금속 분말과 바인더가 함께 있는 그린 파트를 이후 공정의 시편과 나란히 비교했습니다.'],
  ['탈지','성형체의 바인더를 제거해 브라운 파트로 바꿉니다.','현장에서 연속 탈지·소결 설비의 흐름을 확인했습니다. 로트별 공정이동전표를 비교할 때는 탈지 단계의 결합제 제거량도 검토했습니다.'],
  ['소결','가열로 입자를 결합하고 치밀화한 뒤 최종 치수를 검사합니다.','소결품과 이전 단계의 시편을 비교해 상태와 강도 변화를 살폈습니다. 부품이 서로 닿거나 움직이면 치수와 조립부 형상에 문제가 생길 수 있다는 현장 설명도 확인했습니다.']
 ];
 return `<article class="story-content story-article enriched-story mim-story-content"><header class="story-header"><p class="story-kicker">공정과 품질관리</p><h2>검사값을 공정의 기록과 연결하다</h2><p class="story-intro">2026년 1~2월 계림금속 품질관리 인턴십에서 공정 단계별 시편을 비교하고, 치수·누출·조도 검사와 로트별 기록 검토에 참여했습니다.</p></header><div class="story-notes"><section class="story-note enriched-note mim-process-section"><div class="story-section-heading"><span>01</span><h3>공정 흐름과 시편의 상태</h3></div>${mimMaterialVisual()}<div class="mim-process-copy">${stages.map(([name,definition,observation],i)=>`<section class="mim-panel" role="tabpanel" id="mim-panel-${i}" aria-labelledby="mim-tab-${i}" tabindex="0" ${i?'hidden':''}><p class="mim-definition">${definition}</p><p class="mim-application">${observation}</p></section>`).join('')}</div></section><section class="story-note enriched-note"><div class="story-section-heading"><span>02</span><h3>같은 위치와 방법으로 다시 측정</h3></div><div class="story-section-body"><div class="story-section-copy"><p>디지털 게이지와 버니어 캘리퍼스로 부품을 선별하고 누출·표면조도 검사에 참여했습니다. Wheel의 반지름·길이·각도·곡률은 형상측정기로 확인했으며, 접촉식·비접촉식 3차원 측정으로 형상과 치수를 살폈습니다.</p><p>같은 부품의 재측정값에 편차가 나타나 측정 위치와 방법을 통일해 반복 측정했습니다. 아르키메데스법에 따른 밀도 확인, 전자저울의 중량·수량 확인, C/S 분석기의 탄소·황 측정도 경험하며 검사 목적에 맞는 도구와 방법을 구분했습니다.</p></div><div class="story-section-visual">${mimInspectionVisual()}</div></div></section><section class="story-note enriched-note"><div class="story-section-heading"><span>03</span><h3>부적합률을 로트별 공정 기록과 대조</h3></div><div class="story-section-body"><div class="story-section-copy"><p>같은 부품인데 특정 로트에서 부적합품이 많이 나오는 이유를 살피기 위해 로트별 부적합률과 공정이동전표를 대조했습니다. 탈지의 결합제 제거량, 소결 온도, 장입·탈로 시간에 차이가 있는지 함께 확인했습니다.</p><p>소결 온도는 약 10~30℃, 장입·탈로 시간은 약 3~4시간 차이가 나타난 로트를 확인하고, 검토할 로트와 조건을 공정 담당자에게 전달했습니다. 재검사할 대상을 정하는 일과 공정 조건을 검토하는 일을 구분하며 검사 결과를 활용했습니다.</p></div><div class="story-section-visual">${mimRecordVisual()}</div></div></section></div></article>`;
}
function bindMimTabs(content){
 const tabs=[...content.querySelectorAll('.mim-material-flow [role="tab"]')];
 const panels=[...content.querySelectorAll('.mim-panel')];
 let activeIndex=0,transition=0;
 const select=async index=>{
  if(index===activeIndex)return;
  const revision=++transition,previous=panels[activeIndex];
  previous.getAnimations().forEach(animation=>animation.cancel());
  if(!reducedMotion()){
   try{await previous.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-7px)'}],{duration:110,easing:'ease-in'}).finished;}catch{}
   if(revision!==transition)return;
  }
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});
  activeIndex=index;
  if(!reducedMotion())panels[index].animate([{opacity:0,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.2,.8,.2,1)'});
 };
 tabs.forEach((tab,index)=>{
  tab.onclick=()=>select(index);
  tab.onkeydown=event=>{
   let next=index;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();select(next);tabs[next].focus();
  };
 });
}
function storyMarkup(project,story,sectionIndex=null){
 if(project.id==='mim')return mimStoryMarkup(story);
 const sections=story[3]||[[story[0],story[2]]];
 const continuous=project.id==='academy'||project.parent==='academy',branch=project.branches.indexOf(story);
 return `<article class="story-content story-article enriched-story visual-${project.id}"><header class="story-header"><p class="story-kicker">${escapeHTML(story[0])}</p><h2>${escapeHTML(story[1])}</h2>${story[3]?`<p class="story-intro">${escapeHTML(story[2])}</p>`:''}</header><div class="story-notes">${sections.map((section,i)=>({section,i})).filter(item=>continuous||sectionIndex===null||item.i===sectionIndex).map(({section,i})=>`<section class="story-note enriched-note"${continuous?` id="activity-${project.id}-story-${branch}-section-${i}" tabindex="-1"`:''}><div class="story-section-heading"><span>${number(i)}</span><h3>${escapeHTML(section[0])}</h3></div><div class="story-section-body"><div class="story-section-copy">${section.slice(1).map(paragraph=>`<p>${escapeHTML(paragraph)}</p>`).join('')}</div><div class="story-section-visual">${storySectionVisualMarkup(project,story,i)}</div></div></section>`).join('')}</div></article>`;
}
function slideDeckMarkup(p){
 const deck=artifactDecks[p.id];
 return `<div class="artifact-heading"><h2>결과 발표자료</h2><div><a href="${deck.download}" download>공개용 발표자료 ↓</a></div></div><div class="slide-viewer" tabindex="0" role="region" aria-label="발표자료 슬라이드 뷰어"><img class="slide-image" src="${deck.slides[0]}" alt="${p.title} 발표자료 1페이지" loading="lazy" width="1280" height="720"><div class="slide-controls"><button type="button" id="slide-prev" aria-label="이전 슬라이드">←</button><label><span class="sr-only">슬라이드 선택</span><select id="slide-select">${deck.slides.map((_,n)=>`<option value="${n}">${n+1} / ${deck.slides.length}</option>`).join('')}</select></label><button type="button" id="slide-next" aria-label="다음 슬라이드">→</button></div></div>`;
}
function bindSlideDeck(content,p){
 const deck=artifactDecks[p.id];let selected=0;
 const change=n=>{selected=Math.max(0,Math.min(deck.slides.length-1,n));const img=content.querySelector('.slide-image');img.src=deck.slides[selected];img.alt=`${p.title} 발표자료 ${selected+1}페이지`;content.querySelector('#slide-select').value=selected;content.querySelector('#slide-prev').disabled=selected===0;content.querySelector('#slide-next').disabled=selected===deck.slides.length-1;};
 content.querySelector('#slide-prev').onclick=()=>change(selected-1);content.querySelector('#slide-next').onclick=()=>change(selected+1);content.querySelector('#slide-select').onchange=e=>change(Number(e.target.value));
 content.querySelector('.slide-viewer').onkeydown=e=>{if(e.target.tagName==='SELECT')return;if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();change(selected+(e.key==='ArrowRight'?1:-1));}};change(0);
}
function academyPblMarkup(p){
 return `${storyMarkup(p,p.branches[0])}<div class="academy-pbl-artifacts"><section class="academy-artifact-section" id="activity-coating-work-presentation-summary" tabindex="-1"><h2>프로젝트 요약</h2>${summaryMarkup(p.id)}</section><section class="academy-artifact-section" id="activity-coating-work-slides" tabindex="-1">${slideDeckMarkup(p)}</section><section class="academy-artifact-section" id="activity-coating-work-implementation" tabindex="-1"><h2>모델 예측 결과 · 구현 코드</h2><div class="model-implementation"><section class="model-predictions" aria-label="모델 예측 결과">${predictionMarkup()}</section><section class="model-code" aria-label="모델 구현 코드">${notebookMarkup()}</section></div></section></div>`;
}
let currentActivityRoute='';
function scrollAcademyActivity(projectId,selection,sectionIndex){
 const anchor=selection?.startsWith('work-')?`activity-${projectId}-${selection}`:sectionIndex!==null?`activity-${projectId}-${selection}-section-${sectionIndex}`:null;
 const target=anchor?document.getElementById(anchor):view.querySelector('.focus-content');
 if(!target)return;
 target.scrollIntoView({behavior:reducedMotion()?'instant':'smooth',block:'start'});
 if(anchor){
  const active=document.activeElement;
  if(active===document.body||panel.contains(active)||active.id.startsWith('activity-'))target.focus({preventScroll:true});
  if(!reducedMotion())target.animate([{backgroundColor:'#dbe7ee'},{backgroundColor:'transparent'}],{duration:1000,easing:'ease-out'});
 }
}
function bindReadingTabs(container,sections,labels,key,initial=0){
 if(sections.length<2)return;
 const tabs=document.createElement('div');
 tabs.className='reading-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','내용 선택');
 tabs.innerHTML=labels.map((label,i)=>`<button type="button" role="tab" id="${key}-tab-${i}" aria-controls="${key}-panel-${i}" aria-selected="${i===initial}" tabindex="${i===initial?0:-1}"><span>${number(i)}</span>${escapeHTML(label)}</button>`).join('');
 container.insertBefore(tabs,sections[0]);
 const buttons=[...tabs.children];
 sections.forEach((section,i)=>{section.classList.add('reading-panel');section.id=`${key}-panel-${i}`;section.setAttribute('role','tabpanel');section.setAttribute('aria-labelledby',`${key}-tab-${i}`);section.hidden=i!==initial;});
 let active=initial;
 const select=index=>{
  if(index===active)return;
  sections.forEach((section,i)=>{section.getAnimations().forEach(a=>a.cancel());section.hidden=i!==index;buttons[i].setAttribute('aria-selected',String(i===index));buttons[i].tabIndex=i===index?0:-1;});
  active=index;
  if(!reducedMotion())sections[index].animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});
 };
 buttons.forEach((button,i)=>{button.onclick=()=>select(i);button.onkeydown=event=>{let next=i;if(event.key==='ArrowRight')next=(i+1)%buttons.length;else if(event.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();select(next);buttons[next].focus();};});
}
function bindReadingView(content,project){
 const summary=content.querySelector('.project-summary');
 if(summary){
  const sections=[...summary.children].filter(e=>e.classList.contains('summary-panel'));
  const labels={coating:['학습 과정','예측 결과'],xrd:['상분율 변화','추가 실험'],energy:['코팅 구조','문헌 성능 비교'],alloy:['제조 조건','경도·기공률','재료 관찰']}[project.id];
  if(project.id==='coating')sections[0].append(summary.querySelector('.summary-callout'));
  else bindReadingTabs(summary,sections,labels,`${project.id}-summary`);
 }
}
function bindPagedCollection(container,pages,label){
 if(pages.length<2)return;
 const controls=document.createElement('div');controls.className='reading-pages';controls.setAttribute('aria-label',label);
 controls.innerHTML=`<button type="button" aria-label="이전 페이지">←</button><label><span class="sr-only">${escapeHTML(label)}</span><select>${pages.map((_,i)=>`<option value="${i}">${i+1} / ${pages.length}</option>`).join('')}</select></label><button type="button" aria-label="다음 페이지">→</button>`;
 container.before(controls);
 let active=0;const [previous,next]=controls.querySelectorAll('button'),select=controls.querySelector('select');
 const show=index=>{active=Math.max(0,Math.min(pages.length-1,index));container.replaceChildren(...pages[active]);select.value=active;previous.disabled=active===0;next.disabled=active===pages.length-1;};
 previous.onclick=()=>show(active-1);next.onclick=()=>show(active+1);select.onchange=()=>show(Number(select.value));show(0);
}
function bindArtifactPages(content){
 const notebook=content.querySelector('.notebook-view');
 if(notebook){
  const combined=Boolean(content.querySelector('.model-implementation')),pages=[],lineCount=combined?10:12;
  [...notebook.children].forEach(cell=>{const lines=cell.querySelector('code').textContent.split('\n');for(let i=0;i<lines.length;i+=lineCount){const page=cell.cloneNode(true);page.querySelector('code').textContent=lines.slice(i,i+lineCount).join('\n');page.querySelector('span').textContent+=` · ${i+1}–${Math.min(i+lineCount,lines.length)}행`;pages.push([page]);}});
  if(combined&&pages.length>1&&pages[0][0].querySelector('code').textContent.split('\n').length<=4){pages[0].push(...pages[1]);pages.splice(1,1);}
  bindPagedCollection(notebook,pages,'코드 페이지');
 }
}
function predictionMarkup(){
 return `<div class="artifact-heading"><h2>모델 예측 결과</h2><a href="artifacts/submission.csv" download>CSV ↓</a></div><div class="prediction-filter"><label>이미지 검색 <input id="prediction-search" type="search" placeholder="00001.jpg" aria-label="예측 이미지 검색"></label><label>분류 <select id="prediction-label"><option value="">전체</option>${[...new Set(artifactData.predictions.map(r=>r.label))].map(v=>`<option>${escapeHTML(v)}</option>`).join('')}</select></label></div><div class="prediction-table-wrap"><table class="prediction-table"><thead><tr><th>이미지</th><th>예측 분류</th></tr></thead><tbody id="prediction-rows"></tbody></table></div><div class="prediction-pagination" aria-label="예측 결과 페이지"><button type="button" id="prediction-prev">← 이전</button><span id="prediction-page" aria-live="polite"></span><button type="button" id="prediction-next">다음 →</button></div><p id="prediction-count" class="artifact-caption" aria-live="polite"></p>`;
}
function notebookMarkup(){
 return `<div class="artifact-heading"><h2>모델 구현 코드</h2><a href="artifacts/code.ipynb" download>Notebook ↓</a></div><div class="notebook-view">${artifactData.cells.map((c,n)=>`<section class="code-cell"><span>IN [${n+1}]</span><pre><code>${escapeHTML(c.source)}</code></pre></section>`).join('')}</div>`;
}
function bindPredictions(content){
 const pageSize=6;let page=0;
 const filter=()=>{
  const q=content.querySelector('#prediction-search').value.toLowerCase(),label=content.querySelector('#prediction-label').value;
  const rows=artifactData.predictions.filter(r=>r.image.toLowerCase().includes(q)&&(!label||r.label===label));
  const pageCount=Math.max(1,Math.ceil(rows.length/pageSize));page=Math.min(page,pageCount-1);
  content.querySelector('#prediction-rows').innerHTML=rows.slice(page*pageSize,(page+1)*pageSize).map(r=>`<tr><td>${escapeHTML(r.image)}</td><td>${escapeHTML(r.label)}</td></tr>`).join('');
  content.querySelector('#prediction-count').textContent=`${rows.length.toLocaleString()}개 결과`;
  content.querySelector('#prediction-page').textContent=`${page+1} / ${pageCount}`;
  content.querySelector('#prediction-prev').disabled=page===0;content.querySelector('#prediction-next').disabled=page===pageCount-1;
 };
 content.querySelector('#prediction-search').oninput=()=>{page=0;filter();};
 content.querySelector('#prediction-label').onchange=()=>{page=0;filter();};
 content.querySelector('#prediction-prev').onclick=()=>{page--;filter();};
 content.querySelector('#prediction-next').onclick=()=>{page++;filter();};filter();
}
function equipmentGalleryMarkup(){
 const equipmentPhotos=[
  {
   label:'DIMENSION SCREENING',
   title:'디지털 게이지 · 버니어 캘리퍼스',
   description:'부품 선별과 기본 치수 확인에 사용했습니다.',
   image:'https://upload.wikimedia.org/wikipedia/commons/e/e0/Messschieber2.jpg',
   alt:'버니어 캘리퍼스'
  },
  {
   label:'CONTACT 3D',
   title:'접촉식 3차원 측정기',
   description:'측정 좌표를 지정해 부품의 내경·외경·길이를 확인하는 데 사용했습니다.',
   image:'https://www.mitutoyo.co.jp/pim-assets/medias_converted/Highres/Mitutoyo/Media/Image/17_Coordinate%20Measuring%20Machines/21_0_191-139_CRYSTA-Apex%20V%20PLUS9106_202508_CG_4.jpg',
   alt:'접촉식 좌표 측정기 CMM을 사용하는 모습'
  },
  {
   label:'NON-CONTACT 3D · 장비 예시',
   title:'비접촉식 3차원 측정기',
   description:'광학식으로 부품의 형상과 치수를 확인했습니다.',
   image:'https://www.mitutoyo.co.jp/pim-assets/medias_converted/Highres/Mitutoyo/Media/Image/14_Vision%20Measuring%20Systems/31_0_363-109-30_QV-L202Z1L-D_202505_CG_1.jpg',
   alt:'비접촉식 광학 측정기 예시 — 측정 테이블과 광학부가 보이는 Mitutoyo Quick Vision Active'
  },
  {
   label:'FORM MEASUREMENT',
   title:'형상측정기',
   description:'부품의 반지름·길이·각도·곡률 등 형상값을 확인했습니다.',
   image:'https://www.zeiss.com/content/dam/iqs/united-states/systems/sfg/zeiss-rondcom-nex-product-picture.jpg/_jcr_content/renditions/original.image_file.1024.1024.278%2C0%2C1642%2C1364.file/zeiss-rondcom-nex-product-picture.jpg',
   alt:'원형도와 형상을 측정하는 형상측정기'
  },
  {
   label:'X-RAY INSPECTION',
   title:'X-ray 검사 장비',
   description:'부품 내부의 구조와 결함을 확인하는 X-ray 검사 작업을 관찰했습니다.',
   image:'https://asset.fujifilm.com/www/de/files/2024-02/983ebb57dfbace307918f06f3c5d0538/DynamIx_iXS.JPG',
   alt:'산업용 X-ray 검사 장비'
  },
  {
   label:'SURFACE INSPECTION',
   title:'표면조도 검사',
   description:'표면조도 검사와 선별 작업에 사용했습니다.',
   image:'https://content.ndtsupply.com/assets/Uploads/tr200-plus__FillWzQwMCw0MDBd.png',
   alt:'휴대형 표면조도 측정기'
  },
  {
   label:'MASS CHECK',
   title:'전자저울',
   description:'부품의 중량과 수량을 확인했습니다.',
   image:'https://upload.wikimedia.org/wikipedia/commons/2/22/Balance_electronique%281%29.JPG',
   alt:'디스플레이가 있는 전자저울'
  },
  {
   label:'LEAK INSPECTION',
   title:'누출 검사 설비',
   description:'누출 검사와 부적합품 선별 작업에 사용했습니다.',
   image:'https://atequsa.com/wp-content/uploads/2022/06/F600HP-FACE-1024x1024.jpg',
   alt:'압력식 누출 검사기'
  },
  {
   label:'ROCKWELL HARDNESS',
   title:'로크웰 경도기',
   description:'로크웰 스케일로 소재와 부품의 경도를 확인했습니다.',
   image:'https://tmteck.com.cn/Uploads/202011/5fae435cb8367.jpg',
   alt:'로크웰 경도기'
  },
  {
   label:'VICKERS HARDNESS',
   title:'비커스 경도기',
   description:'압흔을 바탕으로 비커스 경도를 측정했습니다.',
   image:'https://image.made-in-china.com/2f0j00jDyorVJqZzpt/Intelligent-Load-Cell-Automatically-Turret-Stationary-Digital-Vickers-Hardness-Tester-with-3-Objectives.jpg',
   alt:'비커스 경도기'
  },
  {
   label:'UNIVERSAL HARDNESS',
   title:'만능 경도기',
   description:'여러 경도 스케일을 적용할 수 있는 만능 경도기를 사용했습니다.',
   image:'https://industry.hlr.ua/assets/images/products/107/big/innovatest-nexus-605u-front.png',
   alt:'만능 경도기'
  },
  {
   label:'IMPACT TEST',
   title:'충격 시험기',
   description:'시편의 충격 특성을 확인하는 시험 장비를 사용했습니다.',
   image:'https://www.insize.com/pro-img/800/ITM-JA.jpg',
   alt:'충격 시험기'
  }
 ];
 const groups=[['치수·형상',equipmentPhotos.slice(0,4)],['품질검사·중량',equipmentPhotos.slice(4,8)],['경도·충격',equipmentPhotos.slice(8)]];
 return `<section class="equipment-gallery" aria-label="MIM 검사 장비">
   <header class="equipment-gallery-head"><h2>검사 장비 사진 아카이브</h2><p>12개 장비를 용도별로 정리했습니다. 사진을 누르면 크게 볼 수 있습니다.</p></header>
   ${groups.map(([title,items],i)=>`<section class="equipment-group" aria-labelledby="equipment-group-${i}"><div class="equipment-group-head"><h3 id="equipment-group-${i}">${title}</h3><span>${items.length}개 장비</span></div><div class="equipment-photo-grid">${items.map(item=>`<article class="equipment-photo-card">
    <a class="equipment-photo" href="${item.image}" target="_blank" rel="noopener" aria-label="${escapeHTML(item.title)} 사진 크게 보기">
     <img src="${item.image}" alt="${escapeHTML(item.alt)}" loading="eager">
    </a>
    <div class="equipment-photo-copy">
     <span>${escapeHTML(item.label)}</span>
     <h3>${escapeHTML(item.title)}</h3>
     <p>${escapeHTML(item.description)}</p>
    </div>
   </article>`).join('')}</div></section>`).join('')}
  </section>`;
}
function project(p){
 const overviewMeta=[p.date,p.subtitle,...(p.id==='mim'?[]:[p.role])];
 view.innerHTML=`<div class="project-overview"><div class="eyebrow">${p.category}</div><h1 class="project-title">${p.title}</h1><h2 class="project-lead">${p.lead}</h2><p class="project-description">${p.summary}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="overview-meta">${overviewMeta.map(item=>`<span>${item}</span>`).join('')}</div></div><div class="focus-content" id="focus-content" hidden></div>`;
 panel.innerHTML=`<div class="detail-label">EXPLORE THIS EXPERIENCE</div>${p.parent?'<a class="parent-link" href="#academy">← Future Builder 아카데미</a>':''}<a class="overview-link" href="#${p.id}">경험 개요 <span>↖</span></a>${p.children?`<div class="branch-group"><h2>아카데미 활동</h2>${p.children.map(id=>{const c=experiences.find(e=>e.id===id);return `<a class="branch-link" href="#${id}"><span class="branch-symbol">↗</span><span><strong>${c.title}</strong><small>${c.shortDate}</small></span></a>`;}).join('')}</div>`:''}${p.works.length?`<div class="branch-group"><h2>성과물</h2>${p.works.map(w=>`<a class="branch-link work-link" href="#${p.id}/work-${w.id}"><span class="branch-symbol">↗</span><span><strong>${w.title}</strong><small>${w.description}</small></span></a>`).join('')}</div>`:''}${p.branches.length?`<div class="branch-group"><h2>경험 속 이야기</h2>${p.branches.map((b,j)=>`<a class="branch-link story-link" href="#${p.id}/story-${j}"><span class="branch-symbol">·</span><span><strong>${b[0]}</strong></span></a>`).join('')}</div>`:''}<a class="back-profile" href="#profile">← 프로필</a>`;
 if(p.id==='academy')view.querySelector('.project-overview').insertAdjacentHTML('beforeend',academyOverviewMarkup());
}
function focusContent(p,selection,sectionIndex=null){
 const overview=view.querySelector('.project-overview'),content=view.querySelector('.focus-content');
 const work=selection?.startsWith('work-')?p.works.find(w=>'work-'+w.id===selection):null;
 const index=selection?.match(/^story-(\d+)$/)?.[1];
 const story=index!==undefined?p.branches[Number(index)]:null;
 const expanded=Boolean(work||story),wasExpanded=view.classList.contains('has-focus');
 // Animate the same overview into its smaller position, preserving context.
 const before=overview.getBoundingClientRect();
 view.classList.toggle('has-focus',expanded);
 document.querySelector('.workspace').classList.toggle('viewing-artifact',Boolean(work));
 document.querySelector('.workspace').classList.toggle('parts-3d-view',work?.type==='parts3d');
 document.querySelector('.workspace').classList.toggle('reading-view',Boolean(story||work?.type==='showcase'));
 document.querySelector('.workspace').classList.toggle('coating-view',p.id==='coating');
 content.hidden=!expanded;
 if(!expanded){content.innerHTML='';if(wasExpanded)animateIn(overview);return '';}
 const after=overview.getBoundingClientRect();
 if(!wasExpanded&&!reducedMotion())overview.animate([{transform:`translate(${before.left-after.left}px,${before.top-after.top}px) scale(1.12)`,opacity:.65},{transform:'translate(0,0) scale(1)',opacity:1}],{duration:520,easing:'cubic-bezier(.2,.8,.2,1)'});
 const title=work?work.title:sectionIndex!==null?story[3][sectionIndex][0]:story[0];
 content.innerHTML=work?.type==='parts3d'?'':`<div class="focus-toolbar"><span><b>${p.title}</b> · ${work?'SELECTED WORK':p.id==='academy'||p.parent==='academy'?'ACADEMY ACTIVITIES':'EXPERIENCE NOTES'}</span><a class="close-focus" href="#${p.id}" aria-label="상세 닫고 경험 개요로 돌아가기">개요로 돌아가기 ↖</a></div>`;
 if(story){
  content.innerHTML+=p.id==='coating'?academyPblMarkup(p):storyMarkup(p,story,sectionIndex);
  if(p.id==='mim')bindMimTabs(content);
  if(p.id==='coating'){bindPredictions(content);bindSlideDeck(content,p);}
 }
 else if(work.type==='map'){
  content.innerHTML+=`<div class="map-work"><div class="artifact-heading"><h2>${work.title}</h2><div><button class="expand-work" type="button" aria-pressed="false">지도 크게 보기 ⤢</button><a href="${work.src}" target="_blank" rel="noopener">새 창 ↗</a></div></div><p class="artifact-caption">기본 화면에서는 프로젝트 맥락과 함께 보고, 크게 보기에서는 지도가 중심이 되도록 전환할 수 있습니다.</p><iframe class="map-frame" src="${work.src}" title="세종 상권 지도 — 검색과 입지 가중치 비교"></iframe></div>`;
 }else if(work.type==='parts3d'){
  content.innerHTML+=`<iframe class="parts-3d-frame" src="${work.src}" title="관리 부품 6종 — 회전과 확대가 가능한 3D 아카이브" loading="lazy"></iframe>`;
 }else if(work.type==='equipment'){
  content.innerHTML+=equipmentGalleryMarkup();
 }else if(work.type==='demo'){
  content.innerHTML+=`<div class="artifact-heading"><h2>${work.title}</h2><div><a href="${work.src}" target="_blank" rel="noopener">새 창 ↗</a></div></div><iframe class="fitness-demo-frame" src="${work.src}" title="운동 횟수 측정 앱" allow="accelerometer; gyroscope"></iframe>`;
 }else if(work.type==='slides'){
  const deck=artifactDecks[p.id];activeSlide=0;
  content.innerHTML+=`<div class="artifact-heading"><h2>${work.title}</h2><div><button class="expand-work" type="button" aria-pressed="false">크게 보기 ⤢</button>${deck.download?`<a href="${deck.download}" download>${deck.download.endsWith('.pdf')?'프로젝트 요약 PDF':'공개용 PPTX'} ↓</a>`:''}</div></div><p class="artifact-caption">실제 발표자료를 원래 슬라이드 구성 그대로 제공합니다. 화살표 또는 페이지 선택으로 이동할 수 있습니다.</p><div class="slide-viewer" tabindex="0" role="region" aria-label="발표자료 슬라이드 뷰어"><img class="slide-image" src="${deck.slides[0]}" alt="${p.title} 발표자료 1페이지"><div class="slide-controls"><button type="button" id="slide-prev" aria-label="이전 슬라이드">←</button><label><span class="sr-only">슬라이드 선택</span><select id="slide-select">${deck.slides.map((_,n)=>`<option value="${n}">${n+1} / ${deck.slides.length}</option>`).join('')}</select></label><button type="button" id="slide-next" aria-label="다음 슬라이드">→</button></div></div>`;
  const changeSlide=n=>{activeSlide=Math.max(0,Math.min(deck.slides.length-1,n));const img=content.querySelector('.slide-image');img.src=deck.slides[activeSlide];img.alt=`${p.title} 발표자료 ${activeSlide+1}페이지`;content.querySelector('#slide-select').value=activeSlide;content.querySelector('#slide-prev').disabled=activeSlide===0;content.querySelector('#slide-next').disabled=activeSlide===deck.slides.length-1;};
  content.querySelector('#slide-prev').onclick=()=>changeSlide(activeSlide-1);content.querySelector('#slide-next').onclick=()=>changeSlide(activeSlide+1);content.querySelector('#slide-select').onchange=e=>changeSlide(Number(e.target.value));content.querySelector('.slide-viewer').onkeydown=e=>{if(e.target.tagName==='SELECT')return;if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();changeSlide(activeSlide+(e.key==='ArrowRight'?1:-1));}};changeSlide(0);
 }else if(work.type==='model'){
  content.innerHTML+=`<div class="model-implementation"><section class="model-predictions" aria-label="모델 예측 결과">${predictionMarkup()}</section><section class="model-code" aria-label="모델 구현 코드">${notebookMarkup()}</section></div>`;
  bindPredictions(content);
 }else if(work.type==='submission'){
  content.innerHTML+=predictionMarkup();bindPredictions(content);
 }else if(work.type==='showcase'){
  content.innerHTML+=`<div class="artifact-heading"><h2>${work.title}</h2></div><p class="artifact-caption">${work.description}</p>${summaryMarkup(p.id)}`;
 }else if(work.type==='pdf'){
  content.innerHTML+=`<div class="artifact-heading"><h2>${work.title}</h2><div><a href="${work.src}" target="_blank" rel="noopener">PDF 열기 ↗</a><a href="${work.src}" download>PDF 저장 ↓</a></div></div><p class="artifact-caption">${work.description}</p><a class="pdf-preview" href="${work.src}" target="_blank" rel="noopener"><img src="${work.preview}" alt="${p.title} 연구 요약 PDF 첫 페이지 미리보기"></a>`;
 }else if(work.type==='notebook'){
  content.innerHTML+=notebookMarkup();
 }
 const workspace=document.querySelector('.workspace'),expand=content.querySelector('.expand-work');
 if(work?.type==='map'&&expand){expand.onclick=()=>{const wide=!workspace.classList.contains('map-expanded');const update=()=>{workspace.classList.toggle('map-expanded',wide);view.classList.toggle('map-expanded',wide);expand.textContent=wide?'지도 작게 보기 ↙':'지도 크게 보기 ⤢';expand.setAttribute('aria-pressed',String(wide));};if(!reducedMotion()&&typeof document.startViewTransition==='function'){document.startViewTransition(update);}else update();window.scrollTo(0,0);};}
 else if(expand)expand.onclick=()=>{const wide=workspace.classList.toggle('work-expanded');expand.textContent=wide?'원래 크기 ↙':'크게 보기 ⤢';expand.setAttribute('aria-pressed',String(wide));};
 bindReadingView(content,p);bindArtifactPages(content);
 animateIn(content,wasExpanded?0:100);
 return title;
}
function render(){
 const [requested,rawSelection,rawSection]=location.hash.slice(1).split('/');
 const oldStory=rawSelection?.match(/^story-(\d+)$/);
 const selection=requested==='coating'&&['work-submission','work-notebook'].includes(rawSelection)?'work-implementation':oldStory&&Number(oldStory[1])>=(experiences.find(p=>p.id===requested)?.branches.length||0)
  ?`story-${requested==='ocean'&&Number(oldStory[1])===2?1:0}`:rawSelection;
 const i=experiences.findIndex(p=>p.id===requested),id=i<0?'profile':requested;
 const requestedStory=selection?.match(/^story-(\d+)$/),sectionMatch=rawSection?.match(/^section-(\d+)$/);
 const requestedSection=sectionMatch?Number(sectionMatch[1]):null;
 const sections=i>=0&&requestedStory?experiences[i].branches[Number(requestedStory[1])]?.[3]:null;
 const sectionIndex=(id==='academy'||experiences[i]?.parent==='academy')&&requestedSection!==null&&sections?.[requestedSection]?requestedSection:null;
 const route=id+'/'+(selection||'')+(sectionIndex!==null?'/section-'+sectionIndex:'');if(route===currentRoute)return;
 rememberAcademyMenu(panel);
 const academyProject=i>=0&&(id==='academy'||experiences[i].parent==='academy');
 const contentSelection=id==='coating'&&(requestedStory||experiences[i]?.works.some(w=>'work-'+w.id===selection))?'story-0':selection;
 const activityRoute=academyProject&&contentSelection?.startsWith('story-')?id+'/'+contentSelection:'';
 const preserveActivity=activityRoute&&activityRoute===currentActivityRoute&&view.querySelector('.story-article');
 const changed=currentProject!==id;currentRoute=route;
 if(!preserveActivity){document.querySelector('.workspace').classList.remove('work-expanded','map-expanded','reading-view','coating-view');view?.classList.remove('map-expanded');}
 let selectedTitle='';
 if(changed){view.classList.remove('has-focus');document.querySelector('.workspace').classList.remove('viewing-artifact');view.getAnimations().forEach(a=>a.cancel());i<0?profile():project(experiences[i]);animateIn(view);animateIn(panel,80);}
 if(i>=0){
  if(!preserveActivity)selectedTitle=focusContent(experiences[i],contentSelection,sectionIndex);
  else selectedTitle=sectionIndex!==null?sections[sectionIndex][0]:experiences[i].branches[Number(contentSelection.split('-')[1])][0];
  if(id==='coating'&&selection?.startsWith('work-'))selectedTitle=experiences[i].works.find(w=>'work-'+w.id===selection)?.title||selectedTitle;
 }
 if(i>=0&&(id==='academy'||experiences[i].parent==='academy')){
  panel.innerHTML=`<div class="detail-label">EXPLORE THIS ACADEMY</div><a class="overview-link" href="#academy">아카데미 개요 <span>↖</span></a>${academyMenuMarkup(id,selection,sectionIndex)}<a class="back-profile" href="#profile">← 프로필</a>`;
  bindAcademyMenu(panel);
 }
 currentActivityRoute=activityRoute;
 if(activityRoute){
  const entering=preserveActivity?[]:view.querySelector('.focus-content').getAnimations().map(animation=>animation.finished.catch(()=>{}));
  Promise.all(entering).then(()=>requestAnimationFrame(()=>{if(currentRoute===route)scrollAcademyActivity(id,selection,sectionIndex);}));
 }
 else window.scrollTo(0,0);
 currentProject=id;
 renderNavigation(id,selection);
 document.querySelectorAll('.nav-item,.profile-link').forEach(a=>{const active=a.getAttribute('href')==='#'+id;a.classList.toggle('active',active);active?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});
 panel.querySelectorAll('.branch-link,.overview-link').forEach(a=>{const active=a.getAttribute('href')==='#'+id+(selectedTitle?'/'+selection:'')+(sectionIndex!==null?'/section-'+sectionIndex:'');a.classList.toggle('active',active);active?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});
 document.querySelector('#location-label').textContent=i<0?'PROFILE / OVERVIEW':`ARCHIVE / ${number(i)}${selectedTitle?' / '+selectedTitle:''}`;
 document.title=i<0?'편성민 — Experience Archive':`${selectedTitle?selectedTitle+' · ':''}${experiences[i].title} — 편성민`;
 document.querySelector('#announcer').textContent=i<0?'프로필':(selectedTitle||experiences[i].title)+' 열림';
}
window.addEventListener('hashchange',render);
document.addEventListener('click',event=>{
 const link=event.target.closest('.academy-tree a');
 if(!link||link.getAttribute('href')!==location.hash||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 event.preventDefault();
 const [id,selection,section]=location.hash.slice(1).split('/');
 if(!selection){window.scrollTo({top:0,behavior:reducedMotion()?'instant':'smooth'});return;}
 scrollAcademyActivity(id,selection,section?.startsWith('section-')?Number(section.slice(8)):null);
});
window.addEventListener('message',event=>{
 const frame=document.querySelector('.fitness-demo-frame');
 if(event.origin!==location.origin||!frame||event.source!==frame.contentWindow||event.data?.type!=='fitness-demo-height')return;
 const height=Number(event.data.height);
 if(Number.isFinite(height)&&height>=300&&height<=2500)frame.style.height=`${height+4}px`;
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const workspace=document.querySelector('.workspace');if(workspace.classList.contains('map-expanded')||workspace.classList.contains('work-expanded')){document.querySelector('.expand-work')?.click();}else if(view.classList.contains('has-focus'))location.hash=currentProject;}});
render();
const drawer=document.querySelector('.navigation'),trigger=document.querySelector('.drawer-trigger');
const desktop=()=>matchMedia('(min-width:901px)').matches;
let drawerTimer;
function setDrawer(open){clearTimeout(drawerTimer);document.body.classList.toggle('drawer-open',open);trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'경험 목록 닫기':'경험 목록 열기');}
function closeDrawerSoon(){clearTimeout(drawerTimer);drawerTimer=setTimeout(()=>{if(!drawer.matches(':hover')&&!drawer.contains(document.activeElement)&&!trigger.matches(':hover'))setDrawer(false);},220);}
trigger.addEventListener('pointerenter',()=>{if(desktop())setDrawer(true);});trigger.addEventListener('click',()=>setDrawer(desktop()?true:!document.body.classList.contains('drawer-open')));
drawer.addEventListener('pointerenter',()=>{if(desktop())setDrawer(true);});drawer.addEventListener('pointerleave',()=>{if(desktop())closeDrawerSoon();});
trigger.addEventListener('pointerleave',()=>{if(desktop())closeDrawerSoon();});drawer.addEventListener('focusin',()=>setDrawer(true));drawer.addEventListener('focusout',closeDrawerSoon);
document.addEventListener('pointermove',e=>{if(desktop()&&e.pointerType==='mouse'&&e.clientX<36)setDrawer(true);});
drawer.addEventListener('click',e=>{if(e.target.closest('a'))e.target.closest('a').blur();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')setDrawer(false);});



