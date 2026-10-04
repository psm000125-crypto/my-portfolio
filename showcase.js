/* Existing experience data stays the source of every project and measured value. */
function labEquipmentVisual(compact=false){
 return `<figure class="lab-equipment${compact?' compact':''}" data-reveal>
  <img src="artifacts/equipment-gallery/images/optical-3d.jpg" alt="비접촉 3D 측정 장비" width="1120" height="1684" loading="lazy" decoding="async">
  <div class="equipment-shade" aria-hidden="true"></div>
  <div class="equipment-label"><span>OBSERVATION / 01</span><strong>형상을 읽는 시선.</strong></div>
 </figure>`;
}
function labArchiveVisual(id){
 if(id==='academy')return '<svg viewBox="0 0 240 100" role="img" aria-label="선박과 전기 교육을 표현한 도식"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M28 59h184l-22 23H51zM66 59V34h78v25M85 34V22h38v12M149 59V43h31v16M99 22V12M28 91q15-8 30 0t30 0t30 0t30 0t30 0t30 0"/><path d="M77 43h12m8 0h12m8 0h12M77 51h12m8 0h12m8 0h12"/><path d="M170 14l-9 16h12l-9 15"/></g></svg>';
 if(id==='mim')return '<svg viewBox="0 0 240 100" role="img" aria-label="환형 부품의 치수 측정을 표현한 도식"><g fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="120" cy="48" rx="49" ry="25"/><ellipse cx="120" cy="48" rx="23" ry="12"/><path d="M71 48v15c0 14 22 25 49 25s49-11 49-25V48M97 48v11c0 7 10 12 23 12s23-5 23-12V48M65 17h110M71 10v13M169 10v13M48 27v61M41 27h14M41 88h14"/><path d="M76 17l6-3m-6 3l6 3m82-3l-6-3m6 3l-6 3"/></g></svg>';
 if(id==='coating')return '<div class="mini-classifier" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>';
 if(id==='alloy')return '<svg viewBox="0 0 240 100" role="img" aria-label="금속 시편의 압연과 조직 변화를 표현한 도식"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="100" cy="25" r="17"/><circle cx="100" cy="75" r="17"/><path d="M24 43h66l10 4h112v6H100l-10 4H24zM112 25h22m-5-4l5 4-5 4M88 75H66m5-4l-5 4 5 4"/><path d="M34 43v14M48 43v14M62 43v14M76 43v14M144 47v6M164 47v6M184 47v6"/><circle cx="100" cy="25" r="3"/><circle cx="100" cy="75" r="3"/></g></svg>';
 if(id==='xrd')return '<svg viewBox="0 0 240 100" role="img" aria-label="X선 분석을 표현한 개념도"><path d="M0 80H40L46 24L50 80H90L98 8L102 80H143L150 40L155 80H190L197 58L202 80H240" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
 if(id==='energy')return '<div class="mini-layers" aria-hidden="true"><i></i><i></i><i></i></div>';
 if(id==='sejong')return '<div class="mini-map" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>';
 if(id==='fitness')return '<svg viewBox="0 0 240 100" role="img" aria-label="운동 신호를 표현한 개념도"><path d="M0 60Q20 5 40 60T80 60T120 60T160 60T200 60T240 60" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
 return '<div class="mini-academy" aria-hidden="true">學<span>FIELD NOTES</span></div>';
}
function portfolioHomeMarkup(){
 const archive=experiences.filter(p=>!p.parent);
 return `<article class="portfolio-home lab-home">
 <section class="home-about" id="home-profile" aria-labelledby="profile-title"><div data-reveal><span class="home-kicker">PROFILE</span><h2 id="profile-title">편성민<span>Seongmin Pyeon</span></h2><p>금오공과대학교 신소재공학과<br>품질관리 · 소재 연구 · 데이터 분석</p></div><div class="about-details" data-reveal><p>현장에서 관찰한 것과 분석으로 확인한 것을<br>하나의 포트폴리오에 연결합니다.</p><dl><div><dt>DATA</dt><dd>Python · NumPy · pandas · scikit-learn</dd></div><div><dt>AI & VISION</dt><dd>PyTorch · torchvision</dd></div><div><dt>QUALITY</dt><dd>치수 측정 · 3차원 측정 · 표면조도 · X-ray · C/S 분석</dd></div></dl><a class="contact-email" href="mailto:psm000125@naver.com">psm000125@naver.com <span>↗</span></a><a class="contact-phone" href="tel:01087548353">010-8754-8353</a></div></section>
 <section class="portfolio-hero" aria-labelledby="home-title">
  <div class="hero-topline"><span>SEONGMIN PYEON / PORTFOLIO</span><span>QUALITY · MATERIALS · DATA</span></div>
  <div class="hero-watermark" aria-hidden="true">MATERIAL</div>
  <div class="hero-copy"><p class="home-kicker">편성민의 경험과 기록</p><h1 id="home-title">현장에서 시작해,<br><span>데이터로 읽다.</span></h1><p class="hero-intro">소재를 이해하고, 공정을 살피고, 데이터로 확인합니다.<br>품질관리 · 소재 연구 · 데이터 분석을 잇는 경험을 담았습니다.</p><button class="home-text-link" data-home-scroll="selected-work">프로젝트 둘러보기 <span>↘</span></button></div>
  <div class="hero-object">
   <div class="specimen-guide" aria-hidden="true"><span class="specimen-cross cross-a">+</span><span class="specimen-cross cross-b">+</span><span class="specimen-axis">OBSERVE / ROTATE / EXPLORE</span></div>
   <span class="object-coordinate">FIG. 01 / MIM COMPONENT</span>
   <iframe src="artifacts/parts-3d/index.html?hero=1&lab=1" title="MIM 부품의 사진 기반 3D 재구성" loading="eager"></iframe>
   <div class="object-caption"><span>금속의 형태를 관찰하다</span><small>사진 기반 형상 재구성 · 실제 CAD 및 치수와 다름</small></div>
   <span class="specimen-note">SCROLL TO CHANGE THE VIEW</span>
  </div>
  <div class="hero-bottom"><span>금오공과대학교 · 신소재공학과</span><span>SCROLL TO EXPLORE ↓</span><span>SELECTED WORK / 01—03</span></div>
 </section>
 <nav class="lab-chapters" aria-label="대표 경험 구간"><span>THE EXPLORATION</span><button data-home-scroll="field-work">01 · 현장</button><button data-home-scroll="materials-work">02 · 소재</button><button data-home-scroll="data-work">03 · 데이터</button><div class="lab-scroll-track" aria-hidden="true"><i></i></div></nav>
 <section class="selected-work" id="selected-work" aria-labelledby="selected-title">
  <div class="home-section-heading" data-reveal><h2 id="selected-title">From observation<br><em>to understanding.</em><span>관찰에서 이해까지</span></h2><p>현장의 질문에서 분석의 결과까지.</p></div>
  <article class="work-spread field-spread" id="field-work" data-chapter="field">
   <div class="spread-copy" data-reveal><span class="spread-index">01 / FIELD</span><h3>작은 부품에서<br>공정 전체를 보다.</h3><p>MIM 공정 품질관리 인턴십</p><div class="spread-description">금속 분말이 제품이 되기까지.<br>공정 흐름과 측정·검사 경험을 함께 기록했습니다.</div><a class="spread-link" href="#mim" data-project-transition>현장 경험 읽기 <span>↗</span></a><small>계림금속 / 2026.01–02</small><ol class="lab-process" aria-label="MIM 공정 흐름"><li>혼합</li><li>사출</li><li>탈지</li><li>소결</li></ol></div>
   <div class="spread-image" style="view-transition-name:project-mim">${labEquipmentVisual()}</div>
   <div class="chapter-word" aria-hidden="true">OBSERVE.</div>
  </article>
  <article class="work-spread materials-spread" id="materials-work" data-chapter="materials">
   <div class="materials-visual" data-reveal style="view-transition-name:project-alloy"><span class="visual-kicker">Fe–Si / MATERIAL STUDY</span><div class="material-compositions"><span>Fe</span><span>3.5<small>wt% Si</small></span><span>6.5<small>wt% Si</small></span></div><div class="material-chart">${alloyMetricCharts()}</div><span class="visual-source">발표자료 기준 · 열간 압연 전후 측정 결과</span></div>
   <div class="spread-copy" data-reveal><span class="spread-index">02 / MATERIALS</span><h3>조성을 바꾸고,<br>변화를 확인하다.</h3><p>고규소 Fe–Si 합금 설계</p><div class="spread-description">조성과 공정에 따라 달라지는 소재의 특성.<br>경도와 기공률을 비교하며 그 변화를 살폈습니다.</div><a class="spread-link" href="#alloy" data-project-transition>연구 과정 살펴보기 <span>↗</span></a><a class="spread-secondary" href="#xrd" data-project-transition>함께 보기 · 세라믹 칼 XRD 분석 ↗</a></div>
   <div class="chapter-word" aria-hidden="true">MEASURE.</div>
  </article>
  <article class="work-spread data-spread" id="data-work" data-chapter="data">
   <div class="spread-copy" data-reveal><span class="spread-index">03 / DATA</span><h3>표면의 차이를<br>데이터의 언어로.</h3><p>선박 도장 불량 분류 AI</p><div class="spread-description">5개 표면 상태의 이미지 분류.<br>모델 학습부터 예측 결합, 최종 제출까지 이어지는 교육 프로젝트입니다.</div><a class="spread-link" href="#coating" data-project-transition>분석과 결과 보기 <span>↗</span></a><a class="spread-secondary" href="#sejong" data-project-transition>함께 보기 · 세종상권나침반 ↗</a></div>
   <div class="data-visual" data-reveal style="view-transition-name:project-coating"><div class="data-visual-heading"><span>COATING CLASSIFICATION</span><span>TEST SET / 1,000</span></div><div class="data-score"><span>FINAL SUBMISSION F1</span><strong>0.970<span>905</span></strong><small>발표자료에 기록된 교육 프로젝트 제출 점수</small></div><div class="prediction-bars" aria-label="최종 예측 분포">${[['Scratch',357],['Peeling',310],['Normal',168],['Blister',88],['Inclusion',77]].map(([name,count])=>`<div><span>${name}</span><i style="--prediction:${count/357*100}%"></i><b>${count}</b></div>`).join('')}</div><span class="data-footnote">5 CLASSES / FINAL PREDICTIONS</span></div>
   <div class="chapter-word" aria-hidden="true">INTERPRET.</div>
  </article>
 </section>
 <section class="home-archive" id="home-archive" aria-labelledby="archive-title"><div class="home-section-heading" data-reveal><h2 id="archive-title">Further explorations<span>경험 전체 보기</span></h2><p>연구, 실습, 그리고 직접 만든 결과물.</p></div><div class="lab-archive-grid">${archive.map((p,i)=>`<a class="lab-project-card" href="#${p.id}" data-project-transition data-reveal><div class="lab-card-visual" data-preview="${p.id}">${labArchiveVisual(p.id)}<span class="card-visual-label">PROJECT CONCEPT</span></div><div class="lab-card-meta"><span>${String(i+1).padStart(2,'0')} / ${p.category}</span><span>↗</span></div><h3>${p.title}</h3><small>${p.shortDate}</small></a>`).join('')}</div></section>
 </article>`;
}
function portfolioProjectVisual(id){
 let visual='';
 if(id==='mim')visual=labEquipmentVisual(true);
 else if(id==='alloy')visual=alloyMetricCharts();
 else if(id==='xrd')visual=xrdPhaseChart();
 else if(id==='coating')visual=coatingResultVisual();
 else if(id==='energy')visual=energyLayerVisual();
 else visual=`<div class="journal-concept" data-preview="${id}">${labArchiveVisual(id)}<small>프로젝트 주제를 표현한 개념 시각화</small></div>`;
 return `<div class="journal-visual lab-journal-visual ${['alloy','xrd'].includes(id)?'journal-chart':'journal-result'}" style="view-transition-name:project-${id}" data-reveal>${visual}</div>`;
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-home-scroll]');if(!button)return;
 const target=button.dataset.homeScroll;
 const scroll=()=>document.getElementById(target)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 if(document.body.classList.contains('showcase-home'))scroll();else{location.hash='profile';requestAnimationFrame(()=>requestAnimationFrame(scroll));}
});
