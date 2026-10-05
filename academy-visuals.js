// Redrawn teaching schematics. No simulated values are presented as measured results.
function eduText(x,y,text,kind='label') {
  return `<text class="edu-${kind}" x="${x}" y="${y}" text-anchor="middle">${escapeHTML(text)}</text>`;
}
function eduNode(x,y,w,h,title,subtitle='') {
  return `<rect class="edu-node" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>${eduText(x+w/2,y+h/2+(subtitle?-5:5),title)}${subtitle?eduText(x+w/2,y+h/2+19,subtitle,'small'):''}`;
}
function eduArrow(key,path,soft=false) {
  return `<path class="edu-arrow${soft?' edu-soft':''}" d="${path}" marker-end="url(#${key}-arrow)"/>`;
}
function eduFigure(key,title,description,body,source,height=320) {
  const id='edu-'+key;
  // The source stays with each call for provenance, without a repeated display footer.
  return `<figure class="story-diagram academy-illustration"><figcaption><strong>${escapeHTML(title)}</strong><small>${escapeHTML(description)}</small></figcaption><svg viewBox="0 0 500 ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${escapeHTML(title)}</title><desc id="${id}-desc">${escapeHTML(description)} 교육 내용의 관계를 재구성한 개념도입니다.</desc><defs><marker id="${id}-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" class="edu-arrowhead"/></marker></defs>${body(id)}</svg></figure>`;
}
function eduShip(y=115,mastRise=98) {
  return `<path class="edu-hull" d="M40 ${y}H452L420 ${y+60}H103Z"/><path class="edu-outline" d="M92 ${y}V${y-36}H147V${y-70}H204V${y}M166 ${y-70}V${y-mastRise}M60 ${y+72}q25-12 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0"/><path class="edu-wire" d="M220 ${y+5}v48M287 ${y+5}v48M354 ${y+5}v48"/>`;
}
function academyShipVisual(index) {
  if(index===0) return eduFigure('ship-0','선체의 치수와 설계 기준','길이·폭·깊이·흘수를 배치와 운항 조건에 연결',()=>
    `${eduShip(136)}${eduText(338,111,'선체 · 구조')}<path class="edu-wire" d="M40 219H452M40 212v14M452 212v14"/>${eduText(250,247,'전장 LOA · 수선간장 LBP')}${eduNode(15,266,220,58,'형폭 B · 형깊이 D','선체의 폭과 깊이')}${eduNode(265,266,220,58,'흘수 T','설계 · 만재 · 구조 기준')}`,
    '선박기본설계 교재 · 주요 치수 / 실무 조선설계',345);
  if(index===1) return eduFigure('ship-1','무게·부력과 복원정 GZ','기울어진 선체에서 두 힘의 작용선 사이 거리를 표시',key=>
    `<path class="edu-hull" d="M127 104L365 140L334 201L150 173Z"/><path class="edu-wire" d="M38 164H462M215 149V236M295 130V236"/>
    <circle class="edu-arrowhead" cx="215" cy="150" r="4"/><circle class="edu-arrowhead" cx="295" cy="187" r="4"/>
    ${eduArrow(key,'M215 156V214')}${eduArrow(key,'M295 181V107')}${eduText(194,143,'G')}${eduText(316,197,'B')}${eduText(191,244,'무게','small')}${eduText(329,96,'부력','small')}
    <path class="edu-outline" d="M215 230H295M215 224v12M295 224v12"/>${eduText(255,265,'복원정 GZ')}${eduText(250,32,'무게중심 G · 부력중심 B')}${eduNode(62,287,376,52,'복원 모멘트 = 선박 무게 × GZ')}`,
    '복원성 교재 · 횡복원성 / 선박기본설계 · GZ',355);
  if(index===2) return eduFigure('ship-2-resistance','선박에 작용하는 저항의 구분','수면·선체 표면·압력 차·노출부를 구분',()=>
    `${eduNode(15,12,220,65,'조파저항','파를 만드는 데 쓰이는 에너지')}${eduNode(265,12,220,65,'공기저항','수면 위 노출부의 압력 차')}${eduShip(160,78)}${eduText(340,135,'선형 · 유동')}${eduNode(15,255,220,65,'마찰저항','선체 표면의 점성·전단응력')}${eduNode(265,255,220,65,'형상저항','선수·선미 압력 차와 박리')}`,
    '저항·자항 교재 / 현직자 실무 교육 · 저항의 구분',340)
    +eduFigure('ship-2-tests','선속 성능을 보는 세 모형시험','선체·추진기·상호작용을 함께 보며 실선 성능을 추정',key=>
    `${eduNode(15,48,140,83,'저항시험','선체')}${eduNode(180,48,140,83,'단독시험','프로펠러')}${eduNode(345,48,140,83,'자항시험','선체 + 프로펠러')}
    ${eduArrow(key,'M85 137V184H250V221')}${eduArrow(key,'M250 137V176')}${eduArrow(key,'M415 137V184H258')}${eduNode(78,230,344,70,'실선 속도–출력 관계','상사법칙 · 마찰 보정 · 추진효율')}`,
    '현직자 실무 교육 · 저항시험·단독시험·자항시험',325);
  if(index===3) return eduFigure('ship-3','파랑 중 운동의 6자유도','병진 세 방향과 회전 세 방향을 나누어 표현',key=>
    `<path class="edu-hull" d="M132 133Q227 90 349 113L379 134L350 155Q230 177 132 133Z"/><path class="edu-wire" d="M156 133H347M233 113v44"/>
    ${eduArrow(key,'M255 133H430')}${eduArrow(key,'M250 130V42')}${eduArrow(key,'M247 137L155 197')}${eduText(443,170,'전후','small')}${eduText(289,39,'상하','small')}${eduText(112,215,'좌우','small')}
    ${eduNode(15,244,220,67,'병진 운동','전후 · 좌우 · 상하동요')}${eduNode(265,244,220,67,'회전 운동','횡 · 종 · 선수동요')}`,
    '내항 교재 · Ship Motions in Waves',335);
  if(index===4) return eduFigure('ship-4','선회·지그재그·정지 궤적','조종 시험마다 확인하는 응답을 구분',()=>
    `<g class="ship-steering-tracks"><path class="edu-outline" d="M88 127V80C88 23 175 22 175 78S88 137 88 80M218 30C265 52 175 76 230 98S284 137 230 155M356 30V132"/><circle class="ship-track-marker ship-track-turn" r="5"/><circle class="ship-track-marker ship-track-zigzag" r="5"/><circle class="ship-track-marker ship-track-stop" r="5"/></g>
    <path class="edu-wire" d="M344 132H368M344 140H368M356 149V164"/>
    ${eduText(132,198,'선회')}${eduText(132,224,'종거 · 선회직경','small')}${eduText(247,198,'지그재그')}${eduText(247,224,'선수각 응답','small')}${eduText(380,198,'급후진')}${eduText(380,224,'정지거리','small')}${eduNode(54,263,392,51,'침로 유지 · 침로 변경 · 속도 변경')}`,
    '조종운동 교재 · 조종 시험 / 현직자 실무 교육',335);
  if(index===5) return eduFigure('ship-5','하중이 선체로 전달되는 구조','판·보강재·주요 지지부재의 계층 관계',key=>
    `${eduText(250,24,'해수압 · 화물 하중')}${eduArrow(key,'M250 32V51')}${eduNode(120,59,260,45,'판 · Plate')}${eduArrow(key,'M250 110V128')}${eduNode(120,136,260,45,'보강재 · Stiffener')}${eduArrow(key,'M250 187V205')}${eduNode(120,213,260,45,'주요 지지부재 · PSM')}${eduArrow(key,'M250 264V282')}${eduNode(80,290,340,45,'선체 전체 · 종·횡강도')}${eduText(250,369,'항복 · 좌굴 · 피로를 구분해 평가','small')}`,
    '선박구조설계 교재 · 선체 구조 / 현직자 실무 교육',395)
    +eduFigure('ship-5-panel','보강판을 지지하는 보강재','보강재의 단면과 판의 연결을 단순화',()=>
    `<path class="edu-hull" d="M70 107H430V119H70Z"/><path class="edu-outline" d="M133 107V65M237 107V65H265M362 107V65M341 65H383"/>
    ${eduText(133,151,'평강')}${eduText(250,151,'앵글')}${eduText(362,151,'T형')}${eduText(250,33,'판 위에 연결된 보강재 단면')}
    ${eduNode(30,192,210,67,'면 외 하중','굽힘 강성 확보')}${eduNode(260,192,210,67,'면 내 압축','좌굴 억제')}${eduText(250,303,'거더 · 플로어는 지지 간격을 줄임','small')}`,
    '선박구조설계 교재 · 보강판 구조',325);
  if(index===6) return eduFigure('ship-6','소음·진동의 발생과 전달 경로','발생원·경로·수음 지점에 맞춰 제어 방법을 구분',key=>
    `${eduNode(15,25,140,70,'발생원','주기관 · 추진기')}${eduArrow(key,'M162 60H173')}${eduNode(180,25,140,70,'전달 경로','선체 구조 · 공기')}${eduArrow(key,'M327 60H338')}${eduNode(345,25,140,70,'수음 지점','선실 · 선교')}
    <path class="edu-wire" d="M85 97V135M250 97V135M415 97V135"/>${eduNode(15,142,140,62,'가진 제어','밸런서 · 보상기')}${eduNode(180,142,140,62,'경로 제어','방진 · 차음')}${eduNode(345,142,140,62,'영향 확인','측정 위치 · 기준')}${eduNode(65,250,370,52,'주파수 · 고유진동수 · 공진')}`,
    '소음진동 교재 · 진동 기초 및 제어 방법',325);
  if(index===7) return eduFigure('ship-7','의장이 연결하는 선박 기능','장비 이름보다 기능·배치·안전 조건으로 묶어 보기',()=>
    `${eduNode(15,18,220,73,'추진 · 조타 · 계류','추진기 · 타 · 스러스터')}${eduNode(265,18,220,73,'화물 · 밸러스트','하역 장비 · 탱크 · 배관')}${eduNode(15,128,220,73,'생활 · 공조','선실 · HVAC')}${eduNode(265,128,220,73,'안전 · 방화','소화 설비 · 방화도어')}
    <path class="edu-wire" d="M125 96V108H375V96M125 205V224H375V205M250 110V125M250 225V252"/>${eduNode(36,259,428,52,'설치 공간 · 작업 순서 · 점검 접근성')}`,
    '선박의장시스템 교재 · 시스템 통합 / 현직자 실무 교육',335);
  if(index===8) return eduFigure('ship-8','블록이 선체로 이어지는 건조 흐름','제작·조립·탑재를 거쳐 의장과 시운전으로 연결',key=>
    `<path class="edu-outline" d="M52 63h66v50H52zM153 63h66v50h-66zM254 63h66v50h-66z"/><path class="edu-wire" d="M74 63v50M96 63v50M175 63v50M197 63v50M276 63v50M298 63v50"/>${eduText(85,45,'설계')}${eduText(186,45,'제작')}${eduText(287,45,'조립')}${eduArrow(key,'M328 88H445V200')}${eduShip(215)}${eduText(340,197,'선체 · 의장 설비')}${eduArrow(key,'M249 305V333')}${eduText(249,358,'시운전 · 운전 상태 확인')}`,
    '선박 생산과 건조 교재 · 블록 제작·탑재 / 현직자 실무 교육',380);
  if(index===9) return eduFigure('ship-9','인도 전 두 단계의 성능 확인','안벽에서는 장비·계통, 해상에서는 운항 성능을 확인',key=>
    `${eduNode(25,20,450,58,'공사 완료 · 시운전 준비')}${eduArrow(key,'M250 84V107')}${eduNode(25,115,450,70,'안벽 시운전','기관 · 갑판 · 전기·항해·통신 장비')}${eduArrow(key,'M250 191V214')}${eduNode(25,222,450,70,'해상 시운전','선속 · 조종 성능 · 실제 운전 상태')}${eduArrow(key,'M250 298V321')}${eduNode(25,329,450,48,'성능 확인 · 선주 인도')}`,
    '선박 시운전 교재 · 업무 흐름 / 현직자 실무 교육',400);
  if(index===10) return eduFigure('ship-10','공기·순서·부하를 함께 보는 생산관리','한 가지 일정이 아니라 작업장과 선후 공정의 관계를 관리',key=>
    `${eduNode(15,25,140,70,'공기','작업 기간')}${eduNode(180,25,140,70,'순서','선후 공정')}${eduNode(345,25,140,70,'부하','작업장별 물량')}${eduArrow(key,'M85 101V143H250V169')}${eduArrow(key,'M250 101V135')}${eduArrow(key,'M415 101V143H258')}
    ${eduNode(63,178,374,61,'일정 계획 · 위험 대응','물량 배분 · 부하 평준화 · 절점 관리')}${eduArrow(key,'M250 245V268')}${eduNode(63,277,374,48,'내업 ↔ 외업의 진행 상황 점검')}`,
    '현직자 실무 교육 · 조선 생산관리의 이해',345);
  return '';
}
function academyElectricalVisual(index) {
  if(index===0) return eduFigure('electric-0','발전기와 전동기의 에너지 변환','회전 운동과 전기에너지의 변환 방향을 비교',key=>
    `<circle class="edu-outline" cx="250" cy="144" r="61"/><circle class="edu-node" cx="250" cy="144" r="34"/><path class="edu-wire" d="M245 129l23 15-23 15zM189 144H152M311 144h38"/>${eduText(250,63,'회전형 전기기기')}${eduText(65,137,'기계')}${eduText(65,160,'에너지')}${eduText(435,137,'전기')}${eduText(435,160,'에너지')}${eduArrow(key,'M109 109H178')}${eduArrow(key,'M322 109H391')}${eduText(250,23,'발전기: 회전 → 전기')}${eduArrow(key,'M391 185H322',true)}${eduArrow(key,'M178 185H109',true)}${eduText(250,236,'전동기: 전기 → 회전')}${eduNode(102,260,296,44,'구조 · 특성 · 손실 · 효율 · 정격')}`,
    '전기기기 교재 · 직류기의 원리와 구조');
  if(index===1) return eduFigure('electric-1','자기유지회로의 접점과 코일','시작 버튼과 자기유지 접점을 병렬로 구성한 예',()=>
    `<path class="edu-wire" d="M38 55v195M462 55v195M38 97h62M120 97h94M236 97h146M427 97h35M168 97v96h46M236 193h112V97"/>
    <path class="edu-outline" d="M100 80v34M120 80v34M93 111l34-28M214 80v34M236 80v34M214 176v34M236 176v34"/>
    <circle class="edu-outline" cx="404" cy="97" r="23"/>${eduText(404,103,'KM')}${eduText(110,48,'정지 · b접점')}${eduText(225,48,'기동 · a접점')}${eduText(254,235,'KM 보조접점 · 자기유지')}${eduText(250,289,'스위치 → 접점 논리 → 코일 동작')}`,
    '시퀀스 제어·PLC 기초 교재 · 자기유지회로');
  if(index===2) return eduFigure('electric-2','주·비상 배전계통의 역할','주전원과 비상전원을 구분한 배전 구성',key=>
    `${eduNode(30,12,190,62,'주발전기','주전원')}${eduNode(280,12,190,62,'비상발전기','비상전원')}${eduArrow(key,'M125 78V108')}${eduArrow(key,'M375 78V108')}${eduNode(30,114,190,68,'주배전반 · MSBD','분배 · 개폐 · 보호')}${eduNode(280,114,190,68,'비상배전반 · ESBD','비상전력 분배')}${eduArrow(key,'M125 187V238')}${eduArrow(key,'M375 187V238')}${eduNode(30,244,190,56,'주전원 부하','추진 · 선내 설비')}${eduNode(280,244,190,56,'비상전원 부하','비상 시 필요한 설비')}`,
    '주·비상 배전반·고전압 계통 교재 · 기능 중심의 단순화');
  if(index===3) return eduFigure('electric-3','전력변환에서 전기추진까지','정류·직류 링크·인버터를 거쳐 전동기로 연결',key=>
    `<circle class="edu-outline" cx="64" cy="57" r="29"/>${eduText(64,63,'~')}${eduText(178,28,'교류')}${eduArrow(key,'M97 57H259')}${eduNode(266,22,196,70,'정류부','AC → DC')}${eduArrow(key,'M365 97V129')}${eduNode(266,135,196,65,'DC Link','직류 링크')}${eduArrow(key,'M260 168H199')}${eduNode(28,135,166,65,'인버터','DC → AC')}${eduArrow(key,'M111 205V251')}
    <circle class="edu-outline" cx="111" cy="281" r="25"/>${eduText(111,287,'M')}${eduArrow(key,'M142 281H270')}${eduNode(282,246,196,65,'추진전동기','전기 → 회전')}${eduText(68,111,'입력 전원')}`,
    '선박전력전자·친환경 전기추진 교재 · 상세 보호회로 생략',330);
  return eduFigure('electric-4','통신과 에너지원이 연결된 선박 시스템','정보 전달 경로와 전력 공급 경로를 구분',key=>
    `${eduNode(17,20,150,67,'센서·장치','운전 정보')}${eduNode(198,20,284,67,'선박 통신·네트워크','유선 · 무선 인터페이스')}${eduArrow(key,'M171 53H191',true)}${eduArrow(key,'M340 92V120',true)}${eduNode(198,127,284,51,'제어·운전 정보 전달')}
    ${eduNode(17,221,150,64,'연료전지·배터리','전기에너지')}${eduNode(198,221,130,64,'배전·변환','전력 전달')}${eduNode(361,221,121,64,'추진·부하','동력·설비')}${eduArrow(key,'M171 253H191')}${eduArrow(key,'M332 253H354')}`,
    '선박통신·연료전지와 배터리·친환경 전기추진 교재');
}
function eduPixels(x,y,size,rows=5) {
  return Array.from({length:rows*rows},(_,i)=>`<rect class="edu-pixel${(i*3+i%rows)%5<2?' is-dark':''}" x="${x+(i%rows)*size}" y="${y+Math.floor(i/rows)*size}" width="${size-2}" height="${size-2}"/>`).join('');
}
function academyAIVisual(index) {
  if(index===0) return eduFigure('ai-0','원자료가 학습 데이터로 바뀌는 과정','표의 정리·결측 확인·특성 구성을 데이터 준비로 연결',key=>
    `<rect class="edu-node" x="27" y="18" width="185" height="119" rx="4"/><path class="edu-wire" d="M27 50h185M27 79h185M27 108h185M87 18v119M149 18v119"/>${eduText(57,41,'열')}${eduText(118,41,'열')}${eduText(179,41,'열')}${eduText(118,98,'?','muted')}${eduArrow(key,'M220 77H273')}${eduNode(280,37,193,81,'정제·EDA','결측 · 이상치 · 분포')}${eduArrow(key,'M374 125V177')}${eduNode(280,184,193,81,'특성·학습 데이터','선택 · 집계 · 결합')}${eduText(113,172,'원자료 · 데이터프레임')}${eduText(113,215,'?  결측 여부 확인','small')}${eduText(113,245,'교과의 처리 흐름','small')}`,
    'Python 데이터 처리·머신러닝 워크플로와 EDA 교재');
  if(index===1) return eduFigure('ai-1','입력·모델·예측·평가의 관계','학습 결과를 평가하고 데이터와 모델을 다시 검토',key=>
    `${eduNode(22,20,166,64,'입력 데이터','특성 X')}${eduNode(312,20,166,64,'정답 데이터','목표 y')}${eduArrow(key,'M105 90V119H183')}${eduArrow(key,'M395 90V119H313')}${eduNode(190,91,116,60,'모델 학습')}${eduArrow(key,'M250 156V182')}${eduNode(155,188,190,61,'예측 · 평가','회귀 / 분류')}${eduArrow(key,'M152 217H54V103',true)}${eduText(92,267,'데이터 재검토','small')}${eduText(386,205,'회귀 → 수치','small')}${eduText(386,235,'분류 → 범주','small')}`,
    '머신러닝 기초·워크플로 교재');
  if(index===2) return eduFigure('ai-2','CNN이 이미지 특징을 읽는 구조','이미지 → 합성곱·활성화 → 풀링 → 분류',key=>
    `${eduPixels(22,46,17,5)}${eduText(64,177,'입력 이미지')}${eduArrow(key,'M112 87H146')}
    <path class="edu-feature" d="M161 30h77v94h-77zM171 40h77v94h-77zM181 50h77v94h-77z"/>${eduText(209,177,'합성곱·ReLU')}${eduArrow(key,'M267 87H298')}${eduPixels(310,59,19,3)}${eduText(336,177,'풀링')}${eduArrow(key,'M371 87H401')}
    <circle class="edu-outline" cx="441" cy="46" r="11"/><circle class="edu-outline" cx="441" cy="86" r="11"/><circle class="edu-outline" cx="441" cy="126" r="11"/>${eduText(441,177,'분류')}${eduNode(33,225,434,61,'공간 패턴을 특징으로 추출','최종 클래스 예측으로 연결')}`,
    '컴퓨터비전 교재 · CNN 전체 구조 · 예시 픽셀 패턴');
  if(index===3) return eduFigure('ai-3','RNN이 순서 정보를 전달하는 방식','현재 입력과 이전 상태를 다음 시점으로 연결',key=>
    `${[30,190,350].map((x,i)=>`${eduNode(x,95,120,67,i===0?'이전 시점':i===1?'현재 시점':'다음 시점','RNN 상태')}${eduText(x+60,245,['입력 x₁','입력 x₂','입력 x₃'][i])}${eduArrow(key,`M${x+60} 220V169`)}`).join('')}${eduArrow(key,'M156 128H183')}${eduArrow(key,'M316 128H343')}${eduText(169,75,'상태 전달','small')}${eduText(330,75,'상태 전달','small')}${eduText(250,25,'시계열 · 텍스트 · 이벤트 로그')}${eduText(250,299,'LSTM · Seq2Seq · 어텐션으로 확장','small')}`,
    '텍스트 처리와 RNN·LSTM·Seq2Seq 교재');
  if(index===4) return eduFigure('ai-4','에이전트와 환경의 학습 순환','행동을 보내고 상태·보상을 받아 정책을 학습',key=>
    `${eduNode(30,104,161,85,'에이전트','정책 · 가치함수')}${eduNode(309,104,161,85,'환경','상태 변화')}${eduArrow(key,'M113 98V42H391V98')}${eduText(250,31,'행동 aₜ')}${eduArrow(key,'M391 195V260H113V195',true)}${eduText(250,285,'다음 상태 · 보상')}${eduText(250,153,'상호작용','small')}${eduText(250,313,'Q 학습 → DQN · 정책 기반 학습','small')}`,
    '강화학습·심층 강화학습 교재',335);
  return eduFigure('ai-5','AI 활용 전에 나누어 확인할 데이터 보호','저장 보호·내용 비식별화·입력 검토를 구분',key=>
    `<path class="edu-outline" d="M59 32v-8a24 24 0 0 1 48 0v8"/><rect class="edu-node" x="43" y="32" width="79" height="56" rx="6"/><circle class="edu-arrowhead" cx="82" cy="52" r="5"/><path class="edu-wire" d="M82 57v15"/>${eduText(82,119,'암호화')}${eduArrow(key,'M130 59H190')}${eduNode(199,25,267,67,'데이터 보호','AES · RSA · 해시 / 무결성')}${eduArrow(key,'M332 99V130')}${eduNode(199,137,267,67,'개인정보 비식별화','민감한 내용 가리기')}${eduArrow(key,'M332 211V239')}${eduNode(199,246,267,58,'AI 입력 검토','프롬프트 보호 원칙')}${eduText(81,198,'기밀성','small')}${eduText(81,231,'무결성','small')}${eduText(81,264,'가용성','small')}`,
    '산업·AI 데이터 보안 교재');
}
function academyCourseVisualMarkup(branch,index) {
  return branch===0?`<div class="academy-ship-visuals academy-practice-visuals">${academyShipVisual(index)}</div>`:branch===1?academyElectricalVisual(index):academyAIVisual(index);
}

// These practice illustrations use confirmed records; waveforms show ideal phase relationships.
function eduWave(x,y,width,amplitude,phase=0,cycles=1.5,kind='r') {
  const points=Array.from({length:121},(_,i)=>{
    const t=i/120;
    return `${i?'L':'M'}${(x+t*width).toFixed(2)} ${(y-amplitude*Math.sin(t*cycles*2*Math.PI+phase)).toFixed(2)}`;
  }).join('');
  return `<path class="edu-wave edu-wave-${kind}" d="${points}"/>`;
}
function academyWiringPracticeVisual() {
  return eduFigure('practice-wiring','주회로와 보조회로의 연결','전동기 전력 공급과 자기유지·고장 모사를 나눠 표시',()=>
    `${eduText(95,24,'R · S · T / 주회로')}${eduNode(20,42,150,55,'MCCB')}${eduNode(20,124,150,55,'전자접촉기')}${eduNode(20,206,150,55,'과부하계전기')}
    <path class="edu-wire" d="M85 99v23M95 99v23M105 99v23M85 181v23M95 181v23M105 181v23M85 263v19M95 263v19M105 263v19"/>
    <circle class="edu-outline" cx="95" cy="311" r="25"/>${eduText(95,317,'M')}${eduText(95,367,'유도전동기')}
    ${eduText(355,46,'보조회로 · 고장 모사')}${eduText(265,95,'정지','small')}${eduText(325,70,'과부하','small')}${eduText(325,95,'접점 개방','fault')}${eduText(385,95,'기동','small')}
    <path class="edu-wire" d="M230 120v160M480 120v160M230 140h25M275 140h40M335 140h40M395 140h30M465 140h15M350 140v100h25M395 240h10V140"/>
    <path class="edu-outline" d="M255 126v28M275 126v28M250 153l30-26M375 126v28M395 126v28M375 226v28M395 226v28"/>
    <path class="edu-fault-line" d="M315 126v28M335 126v28M315 140l14-18"/>
    <circle class="edu-outline" cx="445" cy="140" r="20"/>${eduText(445,146,'KM','small')}${eduText(445,182,'코일','small')}${eduText(385,275,'KM 자기유지','small')}
    ${eduText(355,301,'접점 개방 → 기동 불가','fault')}${eduNode(228,320,254,62,'단자별 저항·전압','멀티테스터로 이상 구간 비교')}`,
    '연수원 배선·고장 진단 실습 기록',400);
}
function academyGeneratorPracticeVisual() {
  const phases=eduFigure('practice-generator','발전기 조건 조정과 3상 파형','회전속도·계자전류를 바꾸며 파형과 위상차를 확인',key=>
    `${eduNode(20,20,130,53,'원동기')}${eduArrow(key,'M155 46H177')}${eduNode(185,20,130,53,'동기발전기')}${eduArrow(key,'M322 46H343')}${eduNode(350,20,130,53,'계측회로')}${eduText(250,110,'회전속도 · 계자전류 조정','small')}
    <path class="edu-axis" d="M48 155V285H470M48 220H470"/>
    ${eduWave(53,220,407,44,0,1.5,'r')}${eduWave(53,220,407,44,-2*Math.PI/3,1.5,'s')}${eduWave(53,220,407,44,2*Math.PI/3,1.5,'t')}
    ${eduText(48,143,'전압','small')}${eduText(447,309,'시간','small')}${eduText(90,333,'R상','phase-r')}${eduText(230,333,'S상','phase-s')}${eduText(365,333,'T상','phase-t')}`,
    '연수원 발전기 실습 기록 · 3상 위상 관계',350);
  const loads=eduFigure('practice-loads','R·L·C 부하의 전압·전류 위상','이상적인 단일 부하에서 동상·지연·선행 관계를 비교',()=>
    `<path class="edu-wave edu-wave-v" d="M185 20H208"/>${eduText(250,25,'전압','small')}<path class="edu-wave edu-wave-i" d="M343 20H366"/>${eduText(410,25,'전류','small')}
    ${[['저항 R','동상',0],['유도 L','전류 지연',-Math.PI/2],['용량 C','전류 선행',Math.PI/2]].map(([title,detail,phase],i)=>{
      const y=80+i*105;
      return `${eduText(71,y-5,title)}${eduText(71,y+22,detail,'small')}<path class="edu-axis" d="M162 ${y-38}V${y+38}H478M162 ${y}H478"/>${eduWave(172,y,294,28,0,1.25,'v')}${eduWave(172,y,294,18,phase,1.25,'i')}`;
    }).join('')}`,
    '연수원 부하 비교 실습 기록 · 이상적 R·L·C 위상 관계',345);
  return phases+loads;
}
function academyDrivePracticeVisual() {
  const power=eduFigure('practice-drive','MV AC DRIVE의 전력과 제어 경로','전력 공급은 실선, Gate Drive 제어 신호는 점선으로 구분',key=>
    `${eduNode(20,20,150,55,'입력 전원')}${eduArrow(key,'M95 81V112')}${eduNode(20,120,150,65,'DC Link','PRE-Charge')}${eduArrow(key,'M95 191V212')}${eduNode(20,220,150,65,'IGBT 인버터')}${eduArrow(key,'M95 291V299')}
    <circle class="edu-outline" cx="95" cy="330" r="25"/>${eduText(95,337,'M')}${eduText(95,379,'전동기')}
    ${eduNode(260,120,210,65,'제어반')}${eduArrow(key,'M365 191V212',true)}${eduNode(260,220,210,65,'Gate Drive','IGBT 구동 신호')}${eduArrow(key,'M252 253H178',true)}
    ${eduNode(260,325,210,55,'제동 초퍼 · 냉각','장치 위치·구조 관찰')}`,
    '연수원 MV AC DRIVE 실습 기록',400);
  const protection=eduFigure('practice-protection','고압 배전반에서 확인한 보호 요소','각 요소의 관계를 단선도와 인터록 도면으로 대조',()=>
    `${eduNode(20,20,210,68,'VCB 위치','Test / Service')}${eduNode(270,20,210,68,'접지 스위치','CME')}
    <path class="edu-wire edu-soft" d="M125 90V105H210V118M375 90V105H290V118M210 166V185H125V200M290 166V185H375V200"/>
    ${eduNode(100,118,300,48,'단선도 · 인터록 도면 대조')}${eduNode(20,200,210,68,'Safety Key','안전 키')}${eduNode(270,200,210,68,'도어 개폐 조건','보호 조건 확인')}`,
    '연수원 고압 배전반 실습 기록 · 보호 요소의 관계',290);
  return power+protection;
}
function academyPlcPracticeVisual() {
  return eduFigure('practice-plc','PLC 입력과 표시등 출력의 대응','회로도·작성한 논리·실제 출력을 함께 확인',key=>
    `<rect class="edu-node" x="20" y="70" width="100" height="115" rx="6"/><circle class="edu-outline" cx="70" cy="108" r="16"/><path class="edu-wire" d="M70 84v9M53 108h34"/>
    ${eduText(70,166,'입력')}${eduText(70,211,'입력 조건','small')}${eduArrow(key,'M128 126H177')}
    <rect class="edu-node" x="185" y="70" width="135" height="115" rx="6"/>${eduText(252,106,'PLC')}${eduText(252,136,'작성한 논리','small')}<path class="edu-wire" d="M208 153h87M208 166h54"/>
    ${eduArrow(key,'M328 126H395')}<circle class="edu-node" cx="430" cy="126" r="27"/><path class="edu-outline" d="M411 107l38 38M411 145l38-38"/>${eduText(430,181,'표시등')}${eduText(430,211,'출력 상태','small')}
    ${eduArrow(key,'M430 220V238H290V252',true)}${eduArrow(key,'M210 252V238H70V220',true)}${eduNode(80,260,340,62,'회로도 ↔ 논리 ↔ 출력','입력 조건과 표시등 동작 대조')}`,
    '한국해양대학교 MASTC PLC 실습 기록',340);
}
function academyPracticeVisualMarkup(branch,index) {
  if(branch===2)return academyPlcPracticeVisual();
  return index===0?academyWiringPracticeVisual():index===1?academyGeneratorPracticeVisual():academyDrivePracticeVisual();
}

function bindAcademyVisuals(root) {
  const course=root.querySelector('.visual-academy:not(.ship-course),.visual-ocean');
  if(!course)return ()=>{};
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const figures=[...course.querySelectorAll('.academy-illustration')].filter(figure=>!figure.closest('.ship-course'));
  const figureSets=[];
  let observer;
  const reveal=(figure,swapped=false)=>{
    if(!figure||figure.hidden)return;
    figure.setAttribute('data-academy-visible','');
    if(swapped&&!preference.matches){
      figure.removeAttribute('data-academy-swap');
      void figure.offsetWidth;
      figure.setAttribute('data-academy-swap','');
    }
  };
  course.querySelectorAll('.academy-practice-visuals').forEach((group,groupIndex)=>{
    if(group.closest('.ship-course'))return;
    const groupFigures=[...group.querySelectorAll(':scope > .academy-illustration')];
    if(groupFigures.length<2)return;
    const tabs=document.createElement('div');
    tabs.className='academy-figure-tabs';
    tabs.setAttribute('role','tablist');
    tabs.setAttribute('aria-label','학습 도식 선택');
    const buttons=groupFigures.map((figure,figureIndex)=>{
      const button=document.createElement('button');
      const label=figure.querySelector('strong')?.textContent?.trim()||('도식 '+(figureIndex+1));
      const panelId='academy-diagram-'+groupIndex+'-'+figureIndex;
      button.type='button';
      button.className='academy-figure-tab';
      button.dataset.academyFigure=figureSets.length+':'+figureIndex;
      button.setAttribute('role','tab');
      button.setAttribute('aria-controls',panelId);
      button.setAttribute('aria-selected',String(figureIndex===0));
      button.tabIndex=figureIndex===0?0:-1;
      button.textContent=label;
      figure.id=panelId;
      figure.setAttribute('role','tabpanel');
      figure.hidden=figureIndex!==0;
      tabs.append(button);
      return button;
    });
    group.before(tabs);
    figureSets.push({figures:groupFigures,buttons});
  });
  const selectFigure=(set,index)=>{
    set.figures.forEach((figure,figureIndex)=>{
      const active=figureIndex===index;
      figure.hidden=!active;
      set.buttons[figureIndex].setAttribute('aria-selected',String(active));
      set.buttons[figureIndex].tabIndex=active?0:-1;
      if(active)reveal(figure,true);
    });
  };
  const onClick=event=>{
    const button=event.target.closest('[data-academy-figure]');
    if(!button||!course.contains(button))return;
    const [setIndex,figureIndex]=button.dataset.academyFigure.split(':').map(Number);
    selectFigure(figureSets[setIndex],figureIndex);
  };
  const onKey=event=>{
    const button=event.target.closest('[data-academy-figure]');
    if(!button||!course.contains(button)||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();
    const [setIndex,figureIndex]=button.dataset.academyFigure.split(':').map(Number);
    const set=figureSets[setIndex];
    const next=(figureIndex+(event.key==='ArrowRight'?1:-1)+set.buttons.length)%set.buttons.length;
    selectFigure(set,next);
    set.buttons[next].focus();
  };
  if(preference.matches)figures.forEach(figure=>reveal(figure));
  else if('IntersectionObserver'in window){
    observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting||entry.target.hidden)return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    }),{threshold:.45});
    figures.filter(figure=>!figure.hidden).forEach(figure=>observer.observe(figure));
  }else figures.forEach(figure=>reveal(figure));
  course.addEventListener('click',onClick);
  course.addEventListener('keydown',onKey);
  return ()=>{
    observer?.disconnect();
    course.removeEventListener('click',onClick);
    course.removeEventListener('keydown',onKey);
  };
}
