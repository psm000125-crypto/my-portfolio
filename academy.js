// Curriculum scope: supplied lecture PDFs + A-class schedule.
// Personal actions and outcomes: confirmed experience records only.
const academy = experiences.find(project => project.id === 'academy');
Object.assign(academy, {
  date: '2026.07.06 — 2026.10.08',
  shortDate: '2026.07 — 10.08',
  summary: '총 402시간의 Ocean Transformation 과정에서 선박·조선공학, 전기전자, AX·DX를 학습하고 현장 실습과 팀 PBL을 진행했습니다. 교과 교육, 기관별 실습, 프로젝트를 세 과정 아래에 나눠 정리했습니다.',
  branches: [
    ['선박 교과 교육', '선박의 설계와 건조 과정을 이해하다', '07.06–07.23 조선공학 과정에서 배운 기본설계·성능·구조·의장·생산과 시운전입니다. 교재의 원리와 현직자 교육 내용을 과목별로 정리했으며, 조선소 견학과 승선 관찰은 별도 활동에서 볼 수 있습니다.', [
      ['선박 기본설계와 주요 치수', '선박의 부양·적재·자항 기능을 바탕으로 선종과 운항 목적에 맞는 선형, 주요 치수, 기본 배치를 학습했습니다. 전장 LOA·수선간장 LBP, 형폭 B·형깊이 D·흘수 T를 구분하고, 배치도에서 화물창·기관실·탱크가 차지하는 공간을 살폈습니다.', '설계흘수는 운항 성능의 설계 기준, 하계 만재흘수는 적재량과 관련된 기준, 구조흘수는 선체 강도 계산의 기준으로 구분했습니다. 선속·연료소모량·재화중량·화물용량 등 계약 보증사항이 기본설계와 연결되는 과정도 다뤘습니다.'],
      ['선박계산과 복원성', '배수량을 경하중량과 재화중량으로 나누고, 무게중심 G와 부력중심 B의 위치가 선박의 평형에 미치는 영향을 학습했습니다. 선박이 기울면 부력중심이 이동하며, 무게와 부력의 작용선 사이 거리인 복원정 GZ가 복원 모멘트와 연결되는 원리를 다뤘습니다.', '초기 횡복원성과 종복원성, 메타센터 M과 GM, 적재 상태에 따른 무게중심 변화를 학습했습니다. 손상복원성에서는 구획의 침수와 탱크·화물창 배치가 흘수·트림·횡경사에 미치는 영향을 살폈습니다. 경사시험과 중사시험의 목적도 구분했습니다.'],
      ['선박 저항과 자항 성능', '전저항을 조파·마찰·형상·공기저항으로 나눠 학습했습니다. 구상선수와 선체 체적분포가 파 발생에, 선미 유동과 압력회복이 형상저항에 영향을 주는 원리를 다뤘습니다. Flow Control Fin과 Pre-Swirl Duct는 프로펠러로 들어가는 유동을 개선하는 장치로 살폈습니다.', '저항시험은 선체, 프로펠러 단독시험은 추진기, 자항시험은 선체와 추진기의 상호작용을 평가하는 과정으로 구분했습니다. 모형선과 실선의 차이를 설명하는 Reynolds 수·Froude 수, 마찰 보정과 추진효율을 통해 속도–출력 관계를 추정하는 흐름을 학습했습니다.'],
      ['내항 성능과 파랑 중 선박 운동', '내항 성능을 파도가 있는 해상에서 선박이 움직이고 임무를 수행하는 능력으로 학습했습니다. 규칙파의 파고·주기와 불규칙파의 파 스펙트럼을 구분하고, 파랑 외력에 대한 선박의 운동 응답을 다뤘습니다.', '병진 운동인 전후동요·좌우동요·상하동요와 회전 운동인 횡동요·종동요·선수동요의 6자유도를 구분했습니다. 부가질량·유체 감쇠·복원력의 역할, 파랑 중 부가저항과 탱크 내 슬로싱, 횡동요를 줄이는 장치의 원리도 교과에서 살폈습니다.'],
      ['조종 성능과 운동 특성', '침로 유지·침로 변경·속도 변경을 조종 성능의 세 영역으로 구분했습니다. 타와 추진기의 작용에 따라 선박이 선회하거나 정지하는 과정, 제어 조건에 따른 운동 안정성을 학습했습니다.', '선회시험은 선회 궤적과 종거·횡거·선회직경을, 지그재그 시험은 타각 변경 뒤의 선수각 응답을, 급후진 정지시험은 정지 궤적과 이동거리를 확인하는 시험으로 다뤘습니다. 조종 시뮬레이션을 모형시험·해상 시운전 결과와 비교해 검증하는 흐름도 살폈습니다.'],
      ['선체 구조와 강도 평가', '선박구조설계 교재와 현직자 교육에서 종강도·횡강도·국부강도, 강도와 강성의 차이를 학습했습니다. 해수압과 화물 하중이 판에서 보강재, 주요 지지부재, 선체 전체로 전달되는 구조를 살폈습니다.', '보강판 구조에서는 보강재가 판의 굽힘 강성을 높이고 좌굴을 억제하는 역할을 다뤘습니다. 평강·앵글·T형 보강재와 거더·플로어의 구성을 살피고, 호깅과 새깅에 따라 갑판과 선저의 인장·압축 상태가 바뀌는 원리를 학습했습니다.', '부재 치수를 정하는 Scantling과 형상·재료·경계조건·하중조건을 이용하는 구조해석의 역할을 구분했습니다. 항복·좌굴·피로의 발생 원리, 전체 구조를 보는 Coarse Mesh와 응력 집중 부위를 보는 Fine Mesh, 중앙단면도·구조배치도·외판전개도의 역할을 다뤘습니다.'],
      ['선박 소음과 진동', '진동의 변위·속도·가속도, 시간 영역과 주파수 영역의 표현을 학습했습니다. 질량·스프링·감쇠로 구성한 1자유도 계를 통해 고유진동수와 공진을 살피고, 소음의 데시벨 표현과 측정 위치를 다뤘습니다.', '주기관·추진기 등 가진원에서 구조를 거쳐 선실·선교로 전달되는 경로를 구분했습니다. 방진 마운트와 차음, 진동 보상기·밸런서 등 제어 방법을 살폈으며, 선내 소음과 수중 방사소음의 평가 대상이 다르다는 점도 학습했습니다.'],
      ['선박 의장과 시스템 통합', '선박 의장을 선체가 운항·화물 취급·생활·안전 기능을 수행하도록 장비와 배관을 구성하는 과정으로 학습했습니다. 추진·조타·계류 장치, 화물 하역과 밸러스트 배관, 기관·전기·선실 설비를 기능별로 구분했습니다.', '의장시스템 교재에서는 사이드 스러스터, 방화도어, HVAC 등 장비의 기능과 배치 조건을 다뤘습니다. 배관·장비·전선이 한 공간에서 연결되므로 설치 공간, 작업 순서, 운전·점검 접근성과 안전 조건을 함께 고려하는 시스템 통합 관점으로 정리했습니다.'],
      ['선박 생산·건조와 블록 공법', '강재 가공에서 소조립·판넬·대조립으로 이어지는 내업공정과, 완성 블록을 탑재해 선체를 만드는 외업공정을 학습했습니다. 생산설계와 도면독도 교육을 통해 부재·블록·탑재 위치가 연결되는 흐름을 살폈습니다.', '선행의장·선행도장을 블록 단계에서 진행하는 이유와 탑재·진수·안벽의장·시운전의 연결을 다뤘습니다. 착공 W/C, 기공 K/L, 진수 L/C, 인도 D/L을 주요 절점으로 구분하고, 조립·용접·검사와 도장 결함 사례를 건조 공정 안에서 살폈습니다.'],
      ['선박 시운전과 성능 확인', '시운전을 건조된 선박을 인도하기 전에 장비와 운항 성능을 확인하는 과정으로 학습했습니다. 안벽 시운전은 계류 상태에서 장비·계통의 작동을, 해상 시운전은 항해 중 선속·조종·기관 성능 등을 확인하는 단계로 구분했습니다.', '기관·선장·전장 분야별로 주기관·발전기·보일러, 화물·밸러스트·갑판 장비, 전기·항해·통신 장비를 점검하는 역할을 다뤘습니다. 선속시험의 환경 영향과 왕복 시험을 통한 조류 영향 보정, 소음·진동 확인, 승선 인원과 안전관리의 중요성도 학습했습니다.'],
      ['실무 설계와 생산관리', '현직자 교육에서 선체·선장·기관·전장 설계가 맡는 대상과 설계 코디네이션의 역할을 구분했습니다. 분야별 설계가 배치와 장비 조건을 조율하는 과정, 함정의 선행연구·기본설계·상세설계·건조 단계, 발전용 중형엔진과 추진용 대형엔진의 구분을 다뤘습니다.', '생산관리에서는 공기·순서·부하를 함께 관리하는 일정 계획을 학습했습니다. 내업의 작업장별 물량 배분과 부하 평준화, 외업의 호선별 절점 관리, 선후 공정의 연결과 지연 위험 대응을 다뤘습니다. 안전체험 교육도 받았습니다.']
    ]],
    ['전기전자 교과 교육', '선박의 전력·배전·추진·제어', '전기전자 교재와 교과를 중심으로 정리했습니다. 연수원 배선·고전압 실습과 MASTC PLC 실습은 별도 활동으로 구분했습니다.', [
      ['전기공학 기초와 전기기기', '전기공학 기초와 회로, 전동기·발전기·변압기를 학습했습니다. 전기기기 교재에서는 직류기의 구조와 원리, 발전기와 전동기의 특성, 손실·효율·정격을 다뤘습니다.'],
      ['시퀀스 제어와 PLC 기초', '시퀀스 제어의 순차 동작과 논리회로, 기본·응용회로를 학습했습니다. PLC 교재에서는 스위치와 a·b·c 접점, 릴레이와 자기유지회로, 타이머·카운터, 시퀀스 제어회로 설계를 다뤘습니다. 직접 배선한 회로와 PLC 입·출력 확인은 기관별 실습에 정리했습니다.'],
      ['선박 전력시스템과 주·비상 배전반', '선박 전력시스템과 배전계통, 전력반·제어시스템을 학습했습니다. 주·비상 배전반의 종류와 패널 구성, 발전설비의 안전장치, 고전압 배전시스템의 개폐장치·변압기·보호기기 구성을 다뤘습니다.'],
      ['전력변환과 전기추진', '선박전력전자 교재에서 DC–AC 인버터와 전기추진선박의 전력변환 구성을 학습했습니다. 발전·배전·인버터·추진전동기가 연결되는 시스템을 다뤘고, 선박 전기시스템과 전기추진 교과로 이어졌습니다.'],
      ['선박 통신과 친환경 에너지원', '선박 통신·네트워크 인터페이스, 유·무선 통신과 통신시스템 구성요소를 학습했습니다. 친환경 선박 교재에서는 연료전지·배터리, 전기추진선박의 AC·DC 배전과 추진 시스템을 다뤘습니다. 시간표의 친환경 선박 기술·환경 규제 교육도 함께 이수했습니다.']
    ]],
    ['AX·DX 교과 교육', '현장의 데이터를 AI 문제로 연결하다', 'Python 데이터 처리에서 AI 모델과 산업 데이터 보안까지 학습한 디지털·AI 전환 교과입니다. 직접 개발한 도장 불량 분류 모델은 PBL 활동으로 구분했습니다.', [
      ['Python 데이터 처리와 EDA', 'Python 기초, Pandas 데이터프레임, 행·열 선택과 정제, groupby·pivot·merge, 그래프와 시계열 데이터를 학습했습니다. 머신러닝 워크플로와 EDA에서는 문제 정의, 결측치·이상치, 특성과 상관관계, 전처리와 모델 평가의 연결을 다뤘습니다.'],
      ['머신러닝과 모델 평가', '인공지능·머신러닝·딥러닝의 관계와 지도·비지도 학습, 회귀·분류의 기초를 학습했습니다. 입력 데이터와 예측 대상을 정하고 학습·평가하는 과정을 다뤘습니다.'],
      ['딥러닝과 컴퓨터비전', '퍼셉트론과 다층·심층신경망의 구조, 가중치·편향과 신경망 학습을 다뤘습니다. 컴퓨터비전 교재에서는 CNN의 합성곱·풀링 계층, 구현과 시각화, 이미지 인식 활용을 학습했습니다.'],
      ['RNN·LSTM과 자연어처리', '순서가 있는 데이터와 텍스트 처리, RNN·LSTM·GRU, Seq2Seq와 어텐션을 학습했습니다. 자연어처리 교과에서는 언어모형과 LLM을 다뤘으며, 이미지 입력과 시퀀스 입력에 필요한 모델 구조의 차이를 살폈습니다.'],
      ['강화학습과 심층 강화학습', '에이전트·환경·보상, MDP, 정책·가치함수, 몬테카를로와 시간차 학습, SARSA·Q 학습을 다뤘습니다. 심층 강화학습에서는 신경망을 이용한 Q 학습과 DQN, 정책 그래디언트·REINFORCE, 행동-비평가와 A2C를 학습했습니다.'],
      ['산업·AI 데이터 보안', '기밀성·무결성·가용성, 인코딩과 암호화의 차이, AES와 운용 모드, RSA·하이브리드 암호, 해시·전자서명을 학습했습니다. AI에 데이터를 전달할 때의 개인정보 비식별화와 프롬프트 인젝션 방어 원칙도 교과에서 다뤘습니다.']
    ]]
  ]
});

// Separate the generator exercise from the high-voltage equipment exercise.
const maritimeStory = experiences.find(project => project.id === 'ocean').branches[1];
const generatorSection = maritimeStory[3][1];
maritimeStory[3] = [maritimeStory[3][0],
  ['발전기 특성과 부하 비교', generatorSection[1]],
  ['고압 배전반과 MV AC DRIVE', generatorSection[2], '고압 배전반에서는 접지 스위치·Safety Key·도어 개폐 조건을 확인했습니다. MV AC DRIVE에서는 제어반·제동 초퍼·냉각장치까지 살피고 단선도와 인터록 도면을 통해 전력·제어·보호 흐름을 정리했습니다.']
];

const academyTracks = [
  {id:'ship', title:'선박', period:'07.06–07.23', description:'설계 · 성능 · 생산·건조 · 현장 관찰', activities:[
    {id:'ship-course', title:'조선공학 교과 교육', date:'07.06–07.23', project:'academy', story:0},
    {id:'ship-field', title:'조선소 견학·선박 관찰', date:'조선소 07.23 · 승선 관찰', project:'ocean', story:0}
  ]},
  {id:'electrical', title:'전기전자', period:'07.24–08.25', description:'전력 · 배전 · 추진 · 시퀀스·PLC', activities:[
    {id:'electrical-course', title:'전기전자 교과 교육', date:'07.24–08.25 · 기관 실습 별도', project:'academy', story:1},
    {id:'maritime', title:'한국해양수산연수원', date:'07.30–07.31 · 용당캠퍼스', project:'ocean', story:1},
    {id:'mastc', title:'한국해양대학교 MASTC', date:'08.18–08.19', project:'ocean', story:2}
  ]},
  {id:'axdx', title:'AX·DX', period:'08.26–09.14', description:'데이터 처리 · AI 모델 · 산업 데이터 보안', activities:[
    {id:'axdx-course', title:'AX·DX 교과 교육', date:'08.26–09.03 · 생성형 AI 09.10–09.14', project:'academy', story:2},
    {id:'coating-pbl', title:'선박 도장 불량 분류 PBL', date:'09.07–09.09', project:'coating', story:0}
  ]}
];

const academyDisclosureState = new Map();
function rememberAcademyMenu(panel) {
  panel.querySelectorAll('.academy-tree details').forEach(details => {
    academyDisclosureState.set(details.dataset.track || details.dataset.activity, details.open);
  });
}

function bindAcademyMenu(panel) {
 panel.querySelectorAll('.academy-tree details').forEach(details=>{
  const summary=details.querySelector(':scope > summary'),body=summary.nextElementSibling;
  const toggle=summary.querySelector('.nav-academy-toggle');
  const syncToggle=()=>{if(toggle){toggle.setAttribute('aria-expanded',String(details.open));toggle.setAttribute('aria-label',details.open?'아카데미 과정 접기':'아카데미 과정 펼치기');toggle.textContent=details.open?'−':'+';}};
  details.addEventListener('toggle',syncToggle);
  syncToggle();
  let animation=null,closing=false,fade=null;
  summary.addEventListener('click',event=>{
   if(event.target.closest('a'))return;
   if(event.target.closest('.nav-academy-toggle')){event.preventDefault();summary.click();return;}
   if(reducedMotion())return;
   event.preventDefault();
   const opening=!details.open||closing,start=details.getBoundingClientRect().height;
   animation?.cancel();fade?.cancel();closing=!opening;
   details.open=true;
   const end=opening?details.getBoundingClientRect().height:summary.getBoundingClientRect().height;
   details.style.overflow='hidden';
   animation=details.animate([{height:start+'px'},{height:end+'px'}],{duration:260,easing:'cubic-bezier(.2,.8,.2,1)'});
   fade=body.animate([{opacity:opening?0:1,transform:opening?'translateY(-5px)':'translateY(0)'},{opacity:opening?1:0,transform:opening?'translateY(0)':'translateY(-5px)'}],{duration:220,easing:'ease-out'});
   const running=animation;
   running.finished.then(()=>{
    if(animation!==running)return;
    details.open=opening;closing=false;details.style.overflow='';animation=null;
    academyDisclosureState.set(details.dataset.track||details.dataset.activity,opening);
   }).catch(()=>{});
  });
 });
}

function academyMenuMarkup(projectId, selection='', sectionIndex=null) {
  const route='#'+projectId+(selection?'/'+selection:'')+(sectionIndex!==null?'/section-'+sectionIndex:'');
  const link=(href,title,className='academy-leaf')=>`<a class="branch-link ${className}${href===route?' active':''}" href="${href}"${href===route?' aria-current="page"':''}>${escapeHTML(title)}</a>`;
  return `<div class="branch-group academy-tree"><h2>아카데미 활동</h2>${academyTracks.map(track=>{
    const activeTrack=track.activities.some(activity=>activity.project===projectId&&(projectId!=='academy'&&!selection||selection==='story-'+activity.story||projectId==='coating'&&selection.startsWith('work-')));
    return `<details class="academy-track" data-track="${track.id}"${activeTrack||academyDisclosureState.get(track.id)?' open':''}><summary><strong>${track.title}</strong><small>${track.period}</small></summary><div class="academy-activities">${track.activities.map(activity=>{
      const project=experiences.find(item=>item.id===activity.project), story=project.branches[activity.story];
      const active=projectId===activity.project&&(selection==='story-'+activity.story||selection?.startsWith('work-'));
      const href='#'+project.id+'/story-'+activity.story;
      return `<details class="academy-activity" data-activity="${activity.id}"${active||academyDisclosureState.get(activity.id)?' open':''}><summary><strong>${activity.title}</strong><small>${activity.date}</small></summary><div class="academy-leaves">${link(href,'활동 전체 보기','academy-all')}${story[3].map((section,index)=>link(href+'/section-'+index,section[0])).join('')}${project.id==='coating'?project.works.map(work=>link('#coating/work-'+work.id,work.title,'academy-leaf academy-artifact')).join(''):''}</div></details>`;
    }).join('')}</div></details>`;
  }).join('')}</div>`;
}

function academyOverviewMarkup() {
  return `<section class="academy-overview" aria-label="아카데미 과정"><p class="academy-overview-label">아카데미 활동 · 과정별 살펴보기</p><div class="academy-cards">${academyTracks.map((track,index)=>`<a href="#academy/story-${index}"><span>${track.period}</span><h3>${track.title}</h3><p>${track.description}</p><small>${track.activities.map(activity=>activity.title).join(' · ')}</small><b aria-hidden="true">↗</b></a>`).join('')}</div><p class="academy-schedule-note">한국해양수산연수원 07.30–31 · MASTC 08.18–19 · 팀 PBL 09.07–09</p></section>`;
}

function academyNavigationMarkup(projectId,selection='') {
 const inAcademy=projectId==='academy'||experiences.find(p=>p.id===projectId)?.parent==='academy';
 const activeActivity=activity=>activity.project===projectId&&(selection==='story-'+activity.story||projectId==='coating'&&selection.startsWith('work-'));
 const open=inAcademy||academyDisclosureState.get('nav-academy');
 const overviewActive=projectId==='academy'&&!selection;
 return `<div class="academy-tree nav-academy-group"><details class="nav-academy" data-activity="nav-academy"${open?' open':''}><summary><a class="nav-academy-title${overviewActive?' active':''}" href="#academy"${overviewActive?' aria-current="page"':''}><span class="nav-academy-number">01</span><span><strong>${escapeHTML(academy.title)}</strong><small>${academy.shortDate}</small></span></a><button type="button" class="nav-academy-toggle" aria-label="아카데미 과정 ${open?'접기':'펼치기'}" aria-expanded="${!!open}" aria-controls="nav-academy-body">${open?'−':'+'}</button></summary><div id="nav-academy-body" class="nav-academy-body">${academyTracks.map(track=>{
  const selected=track.activities.some(activeActivity);
  return `<details class="nav-academy-track" data-track="nav-${track.id}"${selected||academyDisclosureState.get('nav-'+track.id)?' open':''}><summary><strong>${track.title}</strong><small>${track.period}</small></summary><div class="nav-academy-activities">${track.activities.map(activity=>`<a class="nav-activity${activeActivity(activity)?' active':''}" href="#${activity.project}/story-${activity.story}"${activeActivity(activity)?' aria-current="page"':''}><strong>${activity.title}</strong><small>${activity.date}</small></a>`).join('')}</div></details>`;
 }).join('')}</div></details></div>`;
}
