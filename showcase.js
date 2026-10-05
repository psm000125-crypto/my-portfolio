/* Existing experience data stays the source of every project and measured value. */
function labEquipmentVisual(compact=false){
 return `<figure class="lab-equipment${compact?' compact':''}" data-reveal>
  <img src="artifacts/equipment-gallery/images/optical-3d.jpg" alt="비접촉 3D 측정 장비" width="1120" height="1684" loading="lazy" decoding="async">
  <div class="equipment-shade" aria-hidden="true"></div>
  <div class="equipment-label"><span>OBSERVATION / 01</span><strong>형상을 읽는 시선.</strong></div>
 </figure>`;
}
function mimIntroductionMarkup(overview=false){
 const project=experiences.find(item=>item.id==='mim');
 const titleTag=overview?'h1':'h3';
 const leadTag=overview?'h2':'p';
 return `<div class="mim-introduction-copy${overview?' case-heading-copy':' spread-copy'}">
  <span class="mim-introduction-kicker">01 / FIELD</span>
  <${titleTag} class="project-title mim-introduction-title">작은 부품에서<br> 공정 전체를 보다.</${titleTag}>
  <${leadTag} class="project-lead mim-introduction-lead">${escapeHTML(project.title)} 인턴십</${leadTag}>
  <p class="mim-introduction-description">금속 분말이 제품이 되기까지.<br>공정 흐름과 측정·검사 경험을 함께 기록했습니다.</p>
 </div>
 <figure class="mim-introduction-photo"><img src="artifacts/equipment-gallery/images/optical-3d.jpg" alt="비접촉 3D 측정 장비" width="1120" height="1684" loading="${overview?'eager':'lazy'}" decoding="async"></figure>`;
}
function labArchiveVisual(id){
 if(['alloy','xrd','energy','sejong','fitness'].includes(id))return experienceCoverGraphic(id);
 if(id==='academy')return '<svg viewBox="0 0 240 100" role="img" aria-label="선박과 전기 교육을 표현한 도식"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M28 59h184l-22 23H51zM66 59V34h78v25M85 34V22h38v12M149 59V43h31v16M99 22V12M28 91q15-8 30 0t30 0t30 0t30 0t30 0t30 0"/><path d="M77 43h12m8 0h12m8 0h12M77 51h12m8 0h12m8 0h12"/><path d="M170 14l-9 16h12l-9 15"/></g></svg>';
 if(id==='mim')return '<svg viewBox="0 0 240 100" role="img" aria-label="환형 부품의 치수 측정을 표현한 도식"><g fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="120" cy="48" rx="49" ry="25"/><ellipse cx="120" cy="48" rx="23" ry="12"/><path d="M71 48v15c0 14 22 25 49 25s49-11 49-25V48M97 48v11c0 7 10 12 23 12s23-5 23-12V48M65 17h110M71 10v13M169 10v13M48 27v61M41 27h14M41 88h14"/><path d="M76 17l6-3m-6 3l6 3m82-3l-6-3m6 3l-6 3"/></g></svg>';
 if(id==='coating')return '<div class="mini-classifier" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>';
 return '<div class="mini-academy" aria-hidden="true">學<span>FIELD NOTES</span></div>';
}
function portfolioHomeMarkup(){
 const archive=experiences.filter(p=>!p.parent);
 return `<article class="portfolio-home lab-home">
 <section class="home-about" id="home-profile" aria-labelledby="profile-title"><div><span class="home-kicker">PROFILE / 01</span><h2 id="profile-title">편성민<span>Seongmin Pyeon</span></h2><p>금오공과대학교 신소재공학과<br>품질관리 · 소재 연구 · 데이터 분석</p></div><div class="about-details"><dl><div><dt>DATA</dt><dd>Python · NumPy · pandas · scikit-learn</dd></div><div><dt>AI & VISION</dt><dd>PyTorch · torchvision</dd></div><div><dt>QUALITY</dt><dd>치수 측정 · 3차원 측정 · 표면조도 · X-ray · C/S 분석</dd></div></dl><div class="profile-contact"><span class="contact-email">psm000125@naver.com</span><span class="contact-phone">010-8754-8353</span></div></div></section>
 <section class="portfolio-hero" aria-labelledby="home-title">
  <div class="hero-topline"><span>SEONGMIN PYEON / PORTFOLIO</span><span>QUALITY · MATERIALS · DATA</span></div>
  <div class="hero-watermark" aria-hidden="true">MATTER.</div>
  <div class="hero-copy"><p class="home-kicker"><i></i> FIELD / MATERIALS / DATA</p><h1 id="home-title">현장에서 시작해,<br><span>데이터로 읽다.</span></h1><button class="home-text-link" data-home-scroll="selected-work">프로젝트 둘러보기 <span>↘</span></button></div>
  <div class="hero-object">
   <div class="specimen-guide" aria-hidden="true"><span class="specimen-cross cross-a">+</span><span class="specimen-cross cross-b">+</span><span class="specimen-axis">MIM / SPECIMEN 01</span></div>
   <span class="object-coordinate">01 / WHEEL</span>
   <iframe src="artifacts/parts-3d/index.html?hero=1&lab=1&v=20261004-refinement" title="MIM 부품의 사진 기반 3D 재구성" loading="eager"></iframe>
   <span class="specimen-note">드래그로 회전</span>
  </div>
  <div class="hero-bottom"><span>OBSERVE → MEASURE → INTERPRET</span><span>SCROLL TO EXPLORE ↓</span><span>SELECTED WORK / 01—03</span></div>
 </section>
 <nav class="lab-chapters" aria-label="대표 경험 구간"><span>SELECTED WORK</span><button data-home-scroll="field-work">01 · 현장</button><button data-home-scroll="materials-work">02 · 소재</button><button data-home-scroll="data-work">03 · 데이터</button><div class="lab-scroll-track" aria-hidden="true"><i></i></div></nav>
 <section class="selected-work" id="selected-work" aria-labelledby="selected-title">
  <div class="home-section-heading" data-reveal><h2 id="selected-title">A closer look.<span>관찰에서 이해까지</span></h2><span class="section-count">01 — 03</span></div>
  <article class="work-spread field-spread mim-introduction" id="field-work" data-chapter="field">
   ${mimIntroductionMarkup()}
  </article>
  <article class="work-spread materials-spread" id="materials-work" data-chapter="materials">
   <div class="materials-visual" data-reveal style="view-transition-name:project-alloy"><span class="visual-kicker">Fe–Si / MATERIAL STUDY</span><div class="material-compositions"><span>Fe</span><span>3.5<small>wt% Si</small></span><span>6.5<small>wt% Si</small></span></div><div class="metric-controls" role="group" aria-label="합금 비교 지표"><button type="button" data-metric="0" aria-pressed="true">경도</button><button type="button" data-metric="1" aria-pressed="false">기공률</button></div><div class="material-chart">${alloyMetricCharts()}</div></div>
   <div class="spread-copy" data-reveal><span class="spread-index">02 / MATERIALS</span><h3>조성을 바꾸고,<br>변화를 확인하다.</h3><p>고규소 Fe–Si 합금 설계</p><div class="spread-description">조성과 공정에 따라 달라지는 소재의 특성.<br>경도와 기공률을 비교하며 그 변화를 살폈습니다.</div><a class="spread-link" href="#alloy" data-project-transition>연구 과정 살펴보기 <span>↗</span></a><a class="spread-secondary" href="#xrd" data-project-transition>함께 보기 · 세라믹 칼 XRD 분석 ↗</a></div>
   <div class="chapter-word" aria-hidden="true">MEASURE.</div>
  </article>
  <article class="work-spread data-spread" id="data-work" data-chapter="data">
   <div class="spread-copy" data-reveal><span class="spread-index">03 / DATA</span><h3>표면의 차이를<br>데이터의 언어로.</h3><p>선박 도장 불량 분류 AI</p><div class="spread-description">5개 표면 상태의 이미지 분류.<br>모델 학습부터 예측 결합, 최종 제출까지 이어지는 교육 프로젝트입니다.</div><a class="spread-link" href="#coating/story-0" data-project-transition>분석과 결과 보기 <span>↗</span></a><a class="spread-secondary" href="#sejong" data-project-transition>함께 보기 · 세종상권나침반 ↗</a></div>
   ${coatingPredictionCardMarkup(true)}
   <div class="chapter-word" aria-hidden="true">INTERPRET.</div>
  </article>
 </section>
 <section class="home-archive" id="home-archive" aria-labelledby="archive-title"><div class="home-section-heading" data-reveal><h2 id="archive-title">The collection.<span>경험 전체 보기</span></h2><span class="section-count">${String(archive.length).padStart(2,'0')} PROJECTS</span></div><div class="archive-controls" role="group" aria-label="경험 분야 선택">${[{id:'all',title:'전체'},...experienceCollections].map(({id,title})=>`<button type="button" data-filter="${id}" aria-pressed="${id==='all'}">${title}</button>`).join('')}</div><div class="archive-collections">${collectionArchiveMarkup()}</div><p class="archive-status sr-only" aria-live="polite"></p></section>
 </article>`;
}
function portfolioProjectVisual(id){
 let visual='';
 if(id==='mim')visual=labEquipmentVisual(true);
 else if(id==='alloy')visual=alloyMetricCharts();
 else if(id==='xrd')visual=xrdPhaseChart();
 else if(id==='coating')visual=coatingResultVisual();
 else if(id==='energy')visual=energyLayerVisual();
 else if(id==='fitness')visual=fitnessOverviewVisual();
 else if(id==='sejong')visual=sejongOverviewVisual();
 else visual=`<div class="journal-concept" data-preview="${id}">${labArchiveVisual(id)}</div>`;
 return `<div class="journal-visual lab-journal-visual ${['alloy','xrd'].includes(id)?'journal-chart':'journal-result'}" style="view-transition-name:project-${id}" data-reveal>${visual}</div>`;
}
function fitnessOverviewVisual(){
 return `<section class="overview-exhibit fitness-exhibit" aria-label="운동 횟수 측정 흐름"><header><span>MOTION → SIGNAL → COUNT</span><h3>움직임을 한 번의 카운트로.</h3></header><div class="fitness-pipeline"><div class="stack-assembly" aria-label="중량 스택과 휴대전화"><svg viewBox="0 0 180 230" role="img" aria-label="웨이트 머신의 중량 스택에 놓인 휴대전화"><path d="M35 20v190M145 20v190M20 212h140M90 0v56" fill="none" stroke="currentColor" stroke-width="3"/><g class="stack-plates" fill="currentColor"><rect x="24" y="105" width="132" height="18" rx="3"/><rect x="24" y="129" width="132" height="18" rx="3"/><rect x="24" y="153" width="132" height="18" rx="3"/><rect x="24" y="177" width="132" height="18" rx="3"/></g><rect x="73" y="58" width="34" height="44" rx="5" fill="#f5f3ed" stroke="currentColor" stroke-width="2"/><path d="M80 80h4l4-9 6 18 4-9h3" fill="none" stroke="#b85432" stroke-width="2"/></svg><span>중량 스택 · 센서 입력</span></div><div class="count-logic"><ol><li><span>01</span><strong>z축 가속도</strong><small>상하 움직임 읽기</small></li><li><span>02</span><strong>신호 필터</strong><small>작은 진동 정리</small></li><li><span>03</span><strong>봉우리 판정</strong><small>임계값으로 횟수 구분</small></li></ol><a href="#fitness/work-counter-demo" class="exhibit-link">직접 움직임 시험하기 <span>↗</span></a></div></div></section>`;
}
function sejongOverviewVisual(){
 return `<section class="overview-exhibit sejong-exhibit" aria-label="세종상권나침반 분석 흐름"><header><span>SEJONG / LOCATION INTELLIGENCE</span><h3>데이터에서, 선택할 수 있는 입지로.</h3></header><div class="sejong-overview-stats"><div><strong>8,881</strong><span>점포</span></div><span class="overview-arrow" aria-hidden="true">→</span><div><strong>491</strong><span>비교 가능한 상가 건물</span></div></div><div class="sejong-indicators">${['업무시설','정류장 접근성','경쟁 완화','주차 여건','사업체 밀도','생활편의시설'].map((label,i)=>`<span><b>${String(i+1).padStart(2,'0')}</b>${label}</span>`).join('')}</div><footer><p>6개 지표의 가중치 조절 → 후보 5곳 → 건물 2곳 비교</p><a href="#sejong/work-map" class="exhibit-link">지도에서 비교하기 <span>↗</span></a></footer></section>`;
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-home-scroll]');if(!button)return;
 const target=button.dataset.homeScroll;
 const scroll=()=>document.getElementById(target)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 if(document.body.classList.contains('showcase-home'))scroll();else{location.hash='profile';requestAnimationFrame(()=>requestAnimationFrame(scroll));}
});
