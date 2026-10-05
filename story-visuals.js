// Visual explanations use the same confirmed experience facts as the narrative.
// Schematics describe a process; they are not reconstructed measurement data.
function storyFlow(title, steps, caption = '') {
  return `<figure class="story-diagram"><figcaption><strong>${escapeHTML(title)}</strong>${caption ? `<small>${escapeHTML(caption)}</small>` : ''}</figcaption><ol class="story-process" style="--steps:${steps.length}">${steps.map(([name, detail], i) => `<li><span>${number(i)}</span><strong>${escapeHTML(name)}</strong><small>${escapeHTML(detail)}</small></li>`).join('')}</ol></figure>`;
}
function storyMetrics(items) {
  return `<dl class="story-metrics">${items.map(([value, label]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl>`;
}
function storyComparisonChart(title, unit, rows, caption) {
  const max = Math.max(...rows.map(row => row[1]));
  return `<figure class="story-bar-chart"><figcaption><strong>${escapeHTML(title)}</strong><small>${escapeHTML(caption)}</small></figcaption><div class="story-bar-rows">${rows.map(([label, value]) => `<div><span>${escapeHTML(label)}</span><i style="--value:${value / max * 100}%" aria-hidden="true"></i><strong>${value} <small>${escapeHTML(unit)}</small></strong></div>`).join('')}</div></figure>`;
}
function energyNetworkLines(y,height,width=212) {
  return Array.from({length:8},(_,i)=>`<path d="M${14+i*width/8} ${y}q28 ${height/4} 4 ${height/2}t4 ${height/2}"/>`).join('');
}
function energyStackGraphic() {
  return `<svg class="energy-stack-graphic" viewBox="0 0 240 540" preserveAspectRatio="xMidYMid meet" role="img" aria-label="다공성 CNT 상부층, 전이층, Co 도핑 ZnO/CNT 하부층이 리튬 금속 위에 연속적으로 연결된 단면 개념도">
    <g class="energy-cross-band band-growth"><rect x="8" y="1" width="224" height="148"/><g class="energy-network-lines">${energyNetworkLines(2,147)}</g></g>
    <g class="energy-cross-band band-transition"><rect x="8" y="149" width="224" height="150"/><g class="energy-network-lines">${energyNetworkLines(149,150)}</g>${[0,1,2,3,4,5].map(i=>`<circle cx="${30+i*36}" cy="${212+(i%2)*35}" r="${4+i%3}"/>`).join('')}</g>
    <g class="energy-cross-band band-nucleation"><rect x="8" y="299" width="224" height="150"/><g class="energy-network-lines">${energyNetworkLines(299,150)}</g>${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<g class="energy-cross-particle"><circle cx="${28+(i%6)*36}" cy="${340+Math.floor(i/6)*66}" r="9"/><circle cx="${31+(i%6)*36}" cy="${337+Math.floor(i/6)*66}" r="2"/></g>`).join('')}</g>
    <g class="energy-cross-band band-electrode"><rect x="8" y="449" width="224" height="90"/></g>
  </svg>`;
}
function energyHorizontalStackGraphic() {
  const network = (x, width) => `<g class="energy-network-lines">${Array.from({length:8}, (_, i) => `<path d="M${x} ${16+i*20}q${width/4} 28 ${width/2} 4t${width/2} 4"/>`).join('')}</g>`;
  return `<svg class="energy-stack-graphic" viewBox="0 0 882 184" preserveAspectRatio="xMidYMid meet" role="img" aria-label="왼쪽의 리튬 금속 전극부터 Co 도핑 ZnO/CNT 하부층, 전이층, 다공성 CNT 상부층으로 이어지는 단면 개념도">
    <g class="energy-cross-band band-electrode"><rect x="2" y="8" width="110" height="168"/></g>
    <g class="energy-cross-band band-nucleation"><rect x="112" y="8" width="256" height="168"/>${network(112,256)}${Array.from({length:12}, (_, i) => `<g class="energy-cross-particle"><circle cx="${142+(i%6)*39}" cy="${58+Math.floor(i/6)*68}" r="10"/><circle cx="${145+(i%6)*39}" cy="${55+Math.floor(i/6)*68}" r="2"/></g>`).join('')}</g>
    <g class="energy-cross-band band-transition"><rect x="368" y="8" width="256" height="168"/>${network(368,256)}${Array.from({length:6}, (_, i) => `<circle cx="${394+i*39}" cy="${72+(i%2)*40}" r="${4+i%3}"/>`).join('')}</g>
    <g class="energy-cross-band band-growth"><rect x="624" y="8" width="256" height="168"/>${network(624,256)}</g>
  </svg>`;
}
function energyLayerVisual({ horizontal = false } = {}) {
  const layers = [
    ['growth', '상부층', '다공성 CNT', '전도 경로 유지 · 표면 성장 억제'],
    ['transition', '전이층', 'ZnO/CNT ↔ CNT', '하부층에서 상부층으로 점진적인 연결'],
    ['nucleation', '하부층', 'Co-doped ZnO/CNT', '리튬 친화성 · 초기 핵 생성 유도']
  ];
  const substrate = '<li class="story-substrate"><span>전극</span><strong>Li metal</strong><small>리튬 금속 음극</small></li>';
  const layerButtons = (horizontal ? [...layers].reverse() : layers).map(([id, level, material, role]) => `<li><button class="energy-layer-button" type="button" data-energy-layer="${id}" data-energy-level="${level}" data-energy-material="${material}" data-energy-role="${role}" aria-pressed="${id === 'nucleation'}"><span>${level}</span><strong>${material}</strong><small>${role}</small></button></li>`).join('');
  return `<figure class="story-diagram energy-layer-exhibit${horizontal ? ' energy-layer-horizontal' : ''}" data-energy-layer="nucleation"><figcaption><strong>제안한 3층 경사 계면층</strong><small>문헌 기반 설계안 · ${horizontal ? '전극에서 상부층까지 왼쪽에서 오른쪽으로 이어지는 구조' : '전극 가까이에서 위로 이어지는 구조'}</small></figcaption><div class="energy-layer-layout"><div class="energy-layer-diagram">${horizontal ? energyHorizontalStackGraphic() : energyStackGraphic()}</div><ol class="story-layer-stack energy-layer-stack" aria-label="3층 경사 계면층의 역할 선택">${horizontal ? substrate + layerButtons : layerButtons + substrate}</ol></div><p class="energy-layer-reading" aria-live="polite"><span>하부층 · Co-doped ZnO/CNT</span><strong>리튬 친화성 · 초기 핵 생성 유도</strong></p></figure>`;
}
function bindEnergyLayers(scope = document) {
  scope.querySelectorAll('.energy-layer-exhibit').forEach(exhibit => {
    if (exhibit.dataset.energyBound) return;
    const buttons = [...exhibit.querySelectorAll('.energy-layer-button')];
    const reading = exhibit.querySelector('.energy-layer-reading');
    if (!buttons.length || !reading) return;
    exhibit.dataset.energyBound = 'true';
    const select = button => {
      buttons.forEach(candidate => candidate.setAttribute('aria-pressed', String(candidate === button)));
      exhibit.dataset.energyLayer = button.dataset.energyLayer;
      reading.innerHTML = `<span>${escapeHTML(button.dataset.energyLevel)} · ${escapeHTML(button.dataset.energyMaterial)}</span><strong>${escapeHTML(button.dataset.energyRole)}</strong>`;
      if (!reducedMotion()) reading.animate([{ opacity: .35, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 180, easing: 'ease-out' });
    };
    buttons.forEach(button => button.addEventListener('click', () => select(button)));
  });
}
function energyLiteratureVisual() {
  const rows = [['Co/ZnO', 8], ['ZnO', 13], ['무코팅 Cu', 62]];
  const cycles = [['Co/ZnO', 41], ['ZnO', 43], ['무코팅 Cu', 51]];
  return `<div class="story-chart-pair">${storyComparisonChart('초기 핵 형성 과전압', 'mV', rows, 'Co 도핑 ZnO 선행논문의 구리 집전체 비교값')}${storyComparisonChart('30사이클 전압 히스테리시스', 'mV', cycles, '같은 선행연구에서 보고한 문헌 수치')}</div>`;
}
function alloySampleVisual() {
  const rows = ['Pure Fe', 'Fe–3.5 wt% Si', 'Fe–4.5 wt% Si', 'Fe–6.5 wt% Si'];
  return `<figure class="story-diagram"><figcaption><strong>4개 조성 × 압연 전후 = 8종 시편</strong><small>조성과 공정 단계를 구분해 전후 비교</small></figcaption><div class="story-table-wrap"><table class="story-sample-table"><thead><tr><th scope="col">조성</th><th scope="col">열간압연 전</th><th scope="col">열간압연 후</th></tr></thead><tbody>${rows.map(label => `<tr><th scope="row">${label}</th><td><span class="sample-stage">소결 시편</span></td><td><span class="sample-stage rolled">압연 시편</span></td></tr>`).join('')}</tbody></table></div>${storyMetrics([['약 6시간', '한 차례 열처리 소요'], ['1개월', '프로젝트 시작 지연']])}</figure>`;
}
function fitnessSignalVisual() {
  const signal='M40 115H85Q108 115 126 63Q140 13 159 60Q179 122 204 125Q220 124 237 93Q249 64 264 95Q282 122 312 115H500';
  return `<figure class="story-diagram fitness-signal-exhibit"><figcaption><strong>센서 신호와 횟수 판정은 별개의 단계</strong><small>z축 봉우리 검출 원리</small></figcaption><svg class="story-signal" viewBox="0 0 520 210" role="img" aria-label="주 봉우리와 작은 진동을 시간 순서로 읽는 가속도 신호의 개념도"><path d="M40 25V165H500" fill="none" stroke="#bdbdbd"/><path class="sensor-signal-trace" id="fitness-motion-signal" d="${signal}" pathLength="1" fill="none" stroke="#171717" stroke-width="3"/><path d="M40 85H500" stroke="#9c9c9c" stroke-dasharray="5 6"/><path class="sensor-signal-reference" d="${signal}"/><path class="sensor-reading-cursor" d="M40 25V165"/><circle class="sensor-motion-peak" cx="145" cy="43" r="5" fill="#171717"/><circle class="sensor-noise-peak" cx="251" cy="82" r="5" fill="#737373"/><circle class="sensor-peak-ring" cx="145" cy="43" r="12"/><text x="16" y="20">z축</text><text x="460" y="190">시간</text><text x="172" y="37">동작 봉우리</text><text x="285" y="74">작은 진동</text><text x="363" y="105">판정 임계값</text></svg>${storyFlow('카운팅 로직', [['센서 입력', '중량 스택의 상하 움직임'], ['신호 정리', '잡음 필터 적용'], ['횟수 판정', '봉우리와 임계값 비교']])}</figure>`;
}
function coatingResultVisual() {
  const classes = [['스크래치', 'Scratch', 357, 'scratch'], ['도막떨어짐', 'Peeling', 310, 'peeling'], ['양품', 'Normal', 168, 'normal'], ['부풀음', 'Blister', 88, 'blister'], ['이물질포함', 'Inclusion', 77, 'inclusion']];
  return `<figure class="story-diagram coating-result"><figcaption><strong>1,000건의 최종 예측</strong><small>테스트 세트의 클래스별 예측 수 · 학습 데이터 비율 아님</small></figcaption><div class="prediction-strip" aria-hidden="true">${classes.map(([, , count, key]) => `<span class="class-${key}" style="flex:${count}"></span>`).join('')}</div><ul class="prediction-distribution">${classes.map(([label, english, count, key]) => `<li class="class-${key}"><span class="class-dot" aria-hidden="true"></span><span>${label}<small>${english}</small></span><strong>${count}<small>${(count / 10).toFixed(1)}%</small></strong></li>`).join('')}</ul>${storyMetrics([['0.970905', '교육 프로젝트 최종 F1'], ['3개 모델', '검증 F1 가중 소프트보팅']])}</figure>`;
}
function xrdSpecimenVisual() {
  return `<figure class="story-diagram xrd-specimens"><figcaption><strong>3종의 칼 × 2개 분석 위치</strong><small>가격대별 몸통·날 끝의 총 6개 측정 위치</small></figcaption><svg viewBox="0 0 480 130" role="img" aria-label="세라믹 칼의 몸통과 날 끝 분석 위치"><path d="M32 38h112v52H32q-12 0-12-12V50q0-12 12-12" fill="#64748b"/><path d="M144 38h302q-35 60-302 52Z" fill="#e0f2f1" stroke="#0f766e" stroke-width="2"/><circle cx="238" cy="60" r="8" fill="#0f766e"/><circle cx="355" cy="75" r="8" fill="#c76b24"/><path d="M238 52V18M355 84v23" stroke="#94a3b8"/><text x="217" y="14">몸통</text><text x="336" y="125">날 끝</text></svg><div class="specimen-matrix"><span>가격대</span><span>몸통</span><span>날 끝</span>${['저가', '중가', '고가'].map(label => `<strong>${label}</strong><span class="specimen-body">●</span><span class="specimen-edge">●</span>`).join('')}</div>${storyFlow('측정 전 시편 준비', [['절단', '약 1~1.5 cm'], ['세척', '알코올 · 초음파'], ['위치 정렬', '몸통과 날 끝']])}</figure>`;
}
function xrdAnalysisVisual() {
  return storyFlow('측정에서 상분율 계산까지', [['초기 XRD', '가격대 3종 · 6개 위치'], ['열화 시험', '110℃ 수증기 · 100시간'], ['XRD 재측정', '동일 위치의 전후 비교'], ['FullProf', 'CIF 기반 리트벨트 정련']], '실험 패턴과 이론 패턴을 비교한 분석 절차');
}
function energyContactGraphic(graded) {
  return `<svg class="energy-contact-graphic" viewBox="0 0 260 225" role="img" aria-label="${graded?'CNT 상부층과 전이층, ZnO/CNT 하부층이 리튬 금속 위에 연결된 구조':'CNT층과 리튬 금속 사이에 접촉 틈이 생길 수 있는 구조'}"><g class="energy-cross-band band-growth"><rect x="14" y="18" width="232" height="48"/><g class="energy-network-lines">${energyNetworkLines(18,48,230)}</g></g>
    ${graded?`<g class="energy-cross-band band-transition"><rect x="14" y="66" width="232" height="46"/><g class="energy-network-lines">${energyNetworkLines(66,46,230)}</g></g><g class="energy-cross-band band-nucleation"><rect x="14" y="112" width="232" height="46"/>${[0,1,2,3,4,5,6].map(i=>`<circle cx="${30+i*33}" cy="135" r="7"/>`).join('')}</g>`:`<path class="energy-contact-gap" d="M14 75H246M14 149H246"/><text x="130" y="104" class="energy-gap-label">석출·박리 후</text><text x="130" y="127" class="energy-gap-label">접촉 틈 발생 가능</text>`}
    <g class="energy-cross-band band-electrode"><rect x="14" y="158" width="232" height="44"/></g><g class="energy-band-labels"><text x="130" y="47">${graded?'CNT 상부층':'다공성 CNT'}</text>${graded?'<text x="130" y="94">전이층</text><text x="130" y="141">ZnO/CNT 하부층</text>':''}<text x="130" y="184">Li metal</text></g></svg>`;
}
function energyContactVisual() {
  return `<figure class="story-diagram energy-contact"><figcaption><strong>CNT 단독층에서 경사 구조로</strong><small>GZCNT 선행연구의 계면 접촉과 층별 역할</small></figcaption><div class="interface-comparison"><section><h4>CNT 단독층</h4>${energyContactGraphic(false)}<p>전도 경로를 제공하지만 장기 계면 접촉을 함께 검토해야 합니다.</p></section><section><h4>GZCNT 경사층</h4>${energyContactGraphic(true)}<p>하부의 리튬 친화성과 상부의 성장 억제 기능을 연결합니다.</p></section></div></figure>`;
}
function storySectionVisualMarkup(project, story, index) {
  const branch = project.branches.indexOf(story);
  if (project.id === 'academy') {
    return academyCourseVisualMarkup(branch,index);
  }
  if (project.id === 'alloy') {
    if (index === 0) return alloySampleVisual();
    if (index === 1) return storyFlow('분말에서 판재까지', [['혼합', '19 rpm · 15분 / IPA 1%'], ['분말압연', '롤갭 0.8 mm'], ['소결', '질소 / 1,150℃ · 1시간'], ['열간압연', '800℃ / 패스당 15%']], '최종 두께 1 mm · 이후 조직과 물성 측정');
    return `<div class="story-result-charts">${alloyMetricCharts()}</div>`;
  }
  if (project.id === 'coating') {
    if (index === 0) return academyFlowVisual('pbl-input','학습 입력을 정리한 순서', [['5개 클래스', '양품 + 4개 불량'], ['이미지 정리', '224×224 RGB'], ['불균형 대응', '가중치 손실 · Label Smoothing']]);
    if (index === 1) return coatingResultVisual();
    return academyFlowVisual('pbl-review','모델의 판단을 이미지에서 확인', [['오분류 확인', '분류한 이미지 검토'], ['원인 사례', '반사광을 결함으로 판단'], ['분류 보완', '결함과 반사광 색 구분']]);
  }
  if (project.id === 'ocean') {
    if (branch === 2 && index === 1) return academyFlowVisual('field-mastc','실습에서 선박 설비 관찰로', [['전기추진·제어', '장치 기능과 동작 확인'], ['선박 견학', '실습선 · 전기추진선박'], ['설비 배치', '선박 안의 장치 연결']]);
    if (branch === 1 || branch === 2) return `<div class="academy-practice-visuals">${academyPracticeVisualMarkup(branch,index)}</div>`;
    if (branch === 0) return academyFieldVisual(index);
  }
  if (project.id === 'sejong') {
    if (index === 0) return `<figure class="story-diagram"><figcaption><strong>수집 데이터와 지도 표시 단위를 구분</strong><small>원자료 수집량과 현재 공개 지도의 표시 수</small></figcaption><dl class="story-compare-list"><div><dt>API 수집 단계</dt><dd>첫 페이지 1,000건 → 전체 페이지 상가 15,816건 / 주차장 690건</dd></div><div><dt>현재 지도</dt><dd>실제 점포 8,881개 / 비교 가능한 상가 건물 491개</dd></div><div><dt>분류 검토</dt><dd>업소명·인허가 업태·상권업종 → 공통 음식군 → 원자료 표본 대조</dd></div></dl></figure>`;
    if (index === 1) return `<figure class="story-diagram"><figcaption><strong>평일 점심의 간편식 구매 장면</strong><small>사용자가 비중을 조정하는 6개 지도 지표</small></figcaption><ul class="story-indicator-grid">${[['업무시설', '가까운 기관·회사'], ['정류장 접근성', '정류장까지의 거리'], ['경쟁 완화', '동일 음식군 점포'], ['주차 여건', '주변 주차면'], ['사업체 밀도', '주변 기존 사업체'], ['생활편의시설', '소매·의료·생활서비스']].map(([name, detail]) => `<li><strong>${name}</strong><span>${detail}</span></li>`).join('')}</ul></figure>`;
    return `${storyFlow('가중치를 선택에서 비교로 연결', [['조건 설정', '6개 지표의 가중치 조절'], ['후보 제안', '상위 상가 건물 5곳'], ['나란히 비교', '선택한 2개 건물의 지표']])}<a class="story-related-link" href="#sejong/work-map">실제 지도에서 가중치 바꿔보기 ↗</a>`;
  }
  if (project.id === 'fitness') {
    if (index === 0) return fitnessSignalVisual();
    return `<figure class="story-diagram"><figcaption><strong>빠른 동작에서 발견한 중복 카운팅</strong><small>실제 운동 횟수와 앱 결과를 세트별로 대조</small></figcaption><div class="story-count-comparison"><div><span>실제 동작</span><strong>1회</strong></div><span aria-hidden="true">→</span><div><span>발견한 오검출</span><strong>2회</strong></div></div>${storyFlow('반복 시험', [['횟수 대조', '실제 세트와 앱 카운트'], ['조건 조정', '임계값 / 잡음 필터'], ['다시 시험', '중복 계산 감소 확인']])}</figure>`;
  }
  if (project.id === 'xrd') {
    if (index === 0) return xrdSpecimenVisual();
    if (index === 1) return xrdAnalysisVisual();
    return xrdPhaseChart();
  }
  if (project.id === 'energy') {
    if (index === 0) return energyContactVisual();
    if (index === 1) return energyLayerVisual();
    return energyLiteratureVisual();
  }
  return '';
}
function mimMaterialVisual() {
  const states = [
    ['혼련', 'Feedstock', '<circle cx="40" cy="45" r="10"/><circle cx="67" cy="35" r="8"/><circle cx="90" cy="53" r="12"/><circle cx="64" cy="67" r="10"/>'],
    ['사출', 'Green part', '<path d="M30 25h70v55H30z"/><path d="M55 45h20v15H55z" class="mim-cutout" fill="#fafafa"/>'],
    ['탈지', 'Brown part', '<path d="M30 25h70v55H30z" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/><circle cx="45" cy="40" r="3"/><circle cx="84" cy="69" r="3"/><circle cx="43" cy="66" r="3"/><path d="M55 45h20v15H55z" fill="none" stroke="currentColor"/>'],
    ['소결', '소결품', '<path d="M37 30h56v45H37z"/><path d="M57 47h16v12H57z" class="mim-cutout" fill="#fafafa"/>']
  ];
  return `<figure class="story-diagram"><figcaption><strong>공정 단계별 시편의 상태</strong></figcaption><ol class="mim-material-flow" role="tablist" aria-label="MIM 공정">${states.map(([name, part, shape], i) => `<li role="presentation"><button type="button" role="tab" id="mim-tab-${i}" aria-label="${name}" aria-controls="mim-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><svg viewBox="0 0 130 100" aria-hidden="true">${shape}</svg><strong>${name}</strong><span>${part}</span></button></li>`).join('')}</ol></figure>`;
}
function mimInspectionVisual() {
  return `<figure class="story-diagram mim-inspection"><figcaption><strong>측정 위치와 방법을 맞추고 비교</strong><small>내경 · 외경 · 길이의 측정 위치</small></figcaption><svg class="story-dimension" viewBox="0 0 480 225" role="img" aria-label="원통형 부품의 내경 외경 길이 측정 위치 개념도"><defs><marker id="measure-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" class="mim-measure"/></marker></defs><path class="mim-part-shell" d="M105 60h250v95H105z"/><ellipse class="mim-part-face" cx="105" cy="108" rx="24" ry="48"/><ellipse class="mim-part-bore" cx="105" cy="108" rx="12" ry="25"/><path d="M105 25h250M65 60v95M105 83v50" class="mim-measure" marker-start="url(#measure-arrow)" marker-end="url(#measure-arrow)"/><path class="mim-guide" d="M105 20v34M355 20v34M58 60h32M58 155h32"/><text x="216" y="18">길이</text><text x="22" y="111">외경</text><text x="134" y="112">내경</text></svg><dl class="story-compare-list mim-inspection-tools"><div><dt>선별·치수</dt><dd><span>디지털 게이지</span><span>버니어 캘리퍼스</span></dd></div><div><dt>형상·좌표</dt><dd><span>형상측정기</span><span>접촉·비접촉 3D 측정</span></dd></div><div><dt>검사</dt><dd><span>누출 / 표면조도</span><span>밀도 / 탄소·황</span></dd></div></dl></figure>`;
}
function mimRecordVisual() {
  return `<figure class="story-diagram"><figcaption><strong>로트별 기록에서 확인한 조건 차이</strong><small>부적합률과 공정이동전표를 함께 대조</small></figcaption>${storyMetrics([['10~30℃', '소결 온도 차이'], ['3~4시간', '장입·탈로 시간 차이']])}${storyFlow('검사에서 공정 검토로', [['재측정', '측정 위치와 방법 통일'], ['로트 대조', '부적합률 / 결합제 제거량'], ['조건 전달', '검토할 로트와 조건을 담당자에게']])}</figure>`;
}
