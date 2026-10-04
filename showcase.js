/* Portfolio spreads use the same verified project data as the archive. */
function portfolioHomeMarkup(){
 const archive=experiences.filter(p=>!p.parent);
 return `<article class="portfolio-home">
 <section class="portfolio-hero" aria-labelledby="home-title">
  <div class="hero-topline"><span>SEONGMIN PYEON / PORTFOLIO</span><span>QUALITY · MATERIALS · DATA</span></div>
  <div class="hero-copy"><p class="home-kicker">편성민의 경험과 기록</p><h1 id="home-title">현장에서 시작해,<br><span>데이터로 읽다.</span></h1><p class="hero-intro">소재를 이해하고, 공정을 살피고, 데이터로 확인합니다.<br>품질관리 · 소재 연구 · 데이터 분석을 잇는 경험을 담았습니다.</p><button class="home-text-link" data-home-scroll="selected-work">프로젝트 둘러보기 <span>↘</span></button></div>
  <div class="hero-object"><span class="object-coordinate">FIG. 01 / MIM COMPONENT</span><iframe src="artifacts/parts-3d/index.html?hero=1" title="MIM 부품의 사진 기반 3D 재구성" loading="eager"></iframe><div class="object-caption"><span>금속의 형태를 관찰하다</span><small>사진 기반 형상 재구성 · 실제 CAD 및 치수와 다름</small></div></div>
  <div class="hero-bottom"><span>금오공과대학교 · 신소재공학과</span><span>SCROLL TO EXPLORE ↓</span><span>SELECTED WORK / 01—03</span></div>
 </section>
 <section class="selected-work" id="selected-work" aria-labelledby="selected-title"><div class="home-section-heading"><h2 id="selected-title">Selected work<span>선택한 경험</span></h2><p>현장의 질문에서 분석의 결과까지.</p></div>
 <article class="work-spread field-spread"><div class="spread-copy"><span class="spread-index">01 / FIELD</span><h3>작은 부품에서<br>공정 전체를 보다.</h3><p>MIM 공정 품질관리 인턴십</p><div class="spread-description">금속 분말이 제품이 되기까지.<br>공정 흐름과 측정·검사 경험을 함께 기록했습니다.</div><a class="spread-link" href="#mim">현장 경험 읽기 <span>↗</span></a><small>계림금속 / 2026.01–02</small></div><div class="field-visual"><div class="field-visual-heading"><span>METAL INJECTION MOLDING</span><span>PROCESS NOTE</span></div><div class="process-orbit" aria-label="MIM 공정 흐름: 혼합, 사출, 탈지, 소결"><div class="process-center">MIM<small>분말에서 부품으로</small></div><span class="orbit-step step-one">01<span>혼합</span></span><span class="orbit-step step-two">02<span>사출</span></span><span class="orbit-step step-three">03<span>탈지</span></span><span class="orbit-step step-four">04<span>소결</span></span></div><div class="field-footnote">공정을 이해하고, 측정으로 확인하다.<span>QUALITY CONTROL ↗</span></div></div></article>
 <article class="work-spread materials-spread"><div class="materials-visual"><span class="visual-kicker">Fe–Si / MATERIAL STUDY</span><div class="material-compositions"><span>Fe</span><span>3.5<small>wt% Si</small></span><span>6.5<small>wt% Si</small></span></div><div class="material-chart">${alloyMetricCharts()}</div><span class="visual-source">발표자료 기준 · 열간 압연 전후 측정 결과</span></div><div class="spread-copy"><span class="spread-index">02 / MATERIALS</span><h3>조성을 바꾸고,<br>변화를 확인하다.</h3><p>고규소 Fe–Si 합금 설계</p><div class="spread-description">조성과 공정에 따라 달라지는 소재의 특성.<br>경도와 기공률을 비교하며 그 변화를 살폈습니다.</div><a class="spread-link" href="#alloy">연구 과정 살펴보기 <span>↗</span></a><a class="spread-secondary" href="#xrd">함께 보기 · 세라믹 칼 XRD 분석 ↗</a></div></article>
 <article class="work-spread data-spread"><div class="spread-copy"><span class="spread-index">03 / DATA</span><h3>표면의 차이를<br>데이터의 언어로.</h3><p>선박 도장 불량 분류 AI</p><div class="spread-description">5개 표면 상태의 이미지 분류.<br>모델 학습부터 예측 결합, 최종 제출까지 이어지는 교육 프로젝트입니다.</div><a class="spread-link" href="#coating">분석과 결과 보기 <span>↗</span></a><a class="spread-secondary" href="#sejong">함께 보기 · 세종상권나침반 ↗</a></div><div class="data-visual"><div class="data-visual-heading"><span>COATING CLASSIFICATION</span><span>TEST SET / 1,000</span></div><div class="data-score"><span>FINAL SUBMISSION F1</span><strong>0.970<span>905</span></strong><small>발표자료에 기록된 교육 프로젝트 제출 점수</small></div><div class="prediction-bars" aria-label="최종 예측 분포">${[['Scratch',357],['Peeling',310],['Normal',168],['Blister',88],['Inclusion',77]].map(([name,count])=>`<div><span>${name}</span><i style="--prediction:${count/357*100}%"></i><b>${count}</b></div>`).join('')}</div><span class="data-footnote">5 CLASSES / FINAL PREDICTIONS</span></div></article>
 </section>
 <section class="home-archive" id="home-archive" aria-labelledby="archive-title"><div class="home-section-heading"><h2 id="archive-title">The archive<span>경험 전체 보기</span></h2><p>연구, 실습, 그리고 직접 만든 결과물.</p></div><div class="home-archive-list">${archive.map((p,i)=>`<a href="#${p.id}"><span class="archive-number">${String(i+1).padStart(2,'0')}</span><h3>${p.title}</h3><span class="archive-category">${p.category}</span><span class="archive-year">${p.shortDate}</span><span class="archive-arrow">↗</span></a>`).join('')}</div></section>
 <section class="home-about" id="home-contact" aria-labelledby="about-title"><div><span class="home-kicker">ABOUT & CONTACT</span><h2 id="about-title">편성민<span>Seongmin Pyeon</span></h2><p>금오공과대학교 신소재공학과<br>품질관리 · 소재 연구 · 데이터 분석</p></div><div class="about-details"><p>현장에서 관찰한 것과 분석으로 확인한 것을<br>하나의 포트폴리오에 연결합니다.</p><dl><div><dt>DATA</dt><dd>Python · NumPy · pandas · scikit-learn</dd></div><div><dt>AI & VISION</dt><dd>PyTorch · torchvision</dd></div><div><dt>QUALITY</dt><dd>치수 측정 · 3차원 측정 · 표면조도 · X-ray · C/S 분석</dd></div></dl><a class="contact-email" href="mailto:psm000125@naver.com">psm000125@naver.com <span>↗</span></a><a class="contact-phone" href="tel:01087548353">010-8754-8353</a></div></section>
 </article>`;
}
function portfolioProjectVisual(id){
 if(id==='mim')return `<div class="journal-visual journal-metal"><iframe src="artifacts/parts-3d/index.html?hero=1" title="MIM 부품의 사진 기반 형상 재구성" loading="lazy"></iframe><small>사진 기반 형상 재구성 · 실제 CAD 및 치수와 다름</small></div>`;
 if(id==='alloy')return `<div class="journal-visual journal-chart">${alloyMetricCharts()}</div>`;
 if(id==='xrd')return `<div class="journal-visual journal-chart">${xrdPhaseChart()}</div>`;
 if(id==='coating')return `<div class="journal-visual journal-result">${coatingResultVisual()}</div>`;
 if(id==='energy')return `<div class="journal-visual journal-result">${energyLayerVisual()}</div>`;
 return '';
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-home-scroll]');if(!button)return;
 const target=button.dataset.homeScroll;
 const scroll=()=>document.getElementById(target)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 if(document.body.classList.contains('showcase-home'))scroll();else{location.hash='profile';requestAnimationFrame(()=>requestAnimationFrame(scroll));}
});
