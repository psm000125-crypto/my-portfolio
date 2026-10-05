/* Collection membership changes presentation only; experience records stay intact. */
const experienceCollections = [
 {id:'academy', title:'아카데미', projects:['academy']},
 {id:'internship', title:'인턴십', projects:['mim']},
 {id:'campus', title:'학내 프로젝트', projects:['alloy','xrd','energy']},
 {id:'ai', title:'AI 프로젝트', projects:['sejong','fitness']}
];
const collectionDisclosure = new Map();
const collectionBrace = '<svg class="collection-brace" viewBox="0 0 20 160" preserveAspectRatio="none" aria-hidden="true"><path d="M18 1C7 1 7 12 7 25V60C7 73 4 80 1 80C4 80 7 87 7 100V135C7 148 7 159 18 159" fill="none" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>';
const collectionProjectTitle = project => project.id==='alloy'?'종합설계 · 고규소 Fe–Si 합금':project.title;
function collectionNavigationMarkup(projectId, selection) {
 const existing = document.querySelectorAll('#experience-nav .nav-collection');
 existing.forEach(group=>collectionDisclosure.set(group.dataset.collection,group.open));
 return experienceCollections.map((collection,index)=>{
  if(collection.id==='academy')return academyNavigationMarkup(projectId,selection);
  if(collection.id==='internship')return navLink(experiences.find(p=>p.id==='mim'),index);
  const active=collection.projects.includes(projectId);
  const open=active||collectionDisclosure.get(collection.id)===true;
  return `<details class="nav-collection" data-collection="${collection.id}"${open?' open':''}><summary><span class="num">${number(index)}</span><strong>${collection.title}</strong><span class="collection-toggle" aria-hidden="true"></span></summary><div class="nav-collection-body">${collection.projects.map(id=>{
   const project=experiences.find(p=>p.id===id);
   return `<a class="nav-item nav-collection-link" href="#${id}" data-id="${id}"><span><strong>${escapeHTML(collectionProjectTitle(project))}</strong></span><span class="arrow">↗</span></a>`;
  }).join('')}</div></details>`;
 }).join('');
}
function collectionArchiveMarkup() {
 return experienceCollections.map(collection=>`<section class="archive-collection" data-collection="${collection.id}" aria-labelledby="collection-${collection.id}"><header class="archive-collection-heading"><h3 id="collection-${collection.id}">${collection.title}</h3><span>${String(collection.projects.length).padStart(2,'0')}</span></header><div class="archive-collection-body">${collection.projects.length>1?collectionBrace:''}<div class="lab-archive-grid">${collection.projects.map(id=>{
  const project=experiences.find(p=>p.id===id);
  return `<a class="lab-project-card" href="#${id}" data-project-transition data-reveal data-field="${collection.id}"><div class="lab-card-visual" data-preview="${id}">${labArchiveVisual(id)}</div><div class="lab-card-meta"><span>${project.category}</span><span>↗</span></div><h3>${collectionProjectTitle(project)}</h3></a>`;
 }).join('')}</div></div></section>`).join('');
}
function experienceCoverGraphic(id, compact=false) {
 const guides='<g class="cover-guides"><circle cx="300" cy="220" r="174"/><circle cx="300" cy="220" r="145" stroke-dasharray="2 9"/><path d="M92 400h416M92 393v14M508 393v14M300 28v18M290 37h20M300 394v18M290 403h20"/></g>';
 let diagram='';
 if(id==='mim')diagram=`<g class="cover-specimen"><ellipse cx="300" cy="185" rx="118" ry="65"/><ellipse cx="300" cy="185" rx="55" ry="31"/><path d="M182 185v70c0 36 53 65 118 65s118-29 118-65v-70M245 185v45c0 17 25 31 55 31s55-14 55-31v-45"/><path d="M208 208v69M392 208v69" opacity=".35"/></g><g class="cover-probe"><path d="M470 112H356v34M346 146h20M470 102v20"/><circle cx="356" cy="149" r="3"/></g><g class="cover-measure"><path d="M172 92h256M182 78v29M418 78v29M147 185v135M138 185h18M138 320h18"/><path d="m182 92 9-5m-9 5 9 5m227-5-9-5m9 5-9 5"/></g>`;
 if(id==='alloy')diagram=`<g class="cover-roll cover-roll-top"><circle cx="286" cy="139" r="61"/><circle cx="286" cy="139" r="9"/><path d="M286 90v20M335 139h-20M286 188v-20M237 139h20"/></g><g class="cover-roll cover-roll-bottom"><circle cx="286" cy="279" r="61"/><circle cx="286" cy="279" r="9"/><path d="M286 230v20M335 279h-20M286 328v-20M237 279h20"/></g><path class="cover-draw" d="M96 195h140l50 9h230v10H286l-50 9H96z"/><g class="cover-grains"><path d="M116 195v28M144 195v28M172 195v28M200 195v28M352 204v10M394 204v10M436 204v10M478 204v10"/></g><path d="M394 168h84m-8-6 8 6-8 6M220 254h-84m8-6-8 6 8 6" opacity=".55"/>`;
 if(id==='xrd')diagram=`
  <g class="xrd-knife">
   <path class="cover-material-solid" d="M72 141h130v70H72q-17 0-17-17v-36q0-17 17-17Z"/>
   <path class="cover-material-soft" d="M202 141h321q-24 43-98 59t-223 19Z"/>
   <path d="M202 211q191 2 274-35" opacity=".4"/>
   <circle cx="86" cy="176" r="5" opacity=".5"/>
   <circle cx="315" cy="181" r="5"/><circle cx="468" cy="168" r="5"/>
   <path d="M315 200v37M468 187v50" opacity=".4"/>
  </g>
  <g class="xrd-instrument"><path d="m220 52 22-10 12 26-22 10ZM495 68l12-26 22 10-12 26"/><path d="m229 53 7 14M513 53l-7 14" opacity=".5"/></g>
  <g class="xrd-measurement xrd-measurement-body"><path class="xrd-beam" d="m242 76 73 105L499 76"/><circle class="xrd-measured-point" cx="315" cy="181" r="12"/></g>
  <g class="xrd-measurement xrd-measurement-edge"><path class="xrd-beam" d="m242 76 226 92 31-92"/><circle class="xrd-measured-point" cx="468" cy="168" r="12"/></g>
  <g class="cover-diagram-labels"><text x="216" y="30">X선</text><text x="315" y="264" text-anchor="middle">몸통</text><text x="468" y="264" text-anchor="middle">날 끝</text></g>`;
 if(id==='energy')diagram=`
  <g class="energy-battery">
   <path class="cover-material-soft" d="M104 162h328v166H104Z"/>
   <path class="cover-material-soft" d="m104 162 36-28h328l-36 28Z"/>
   <path class="cover-material-solid" d="m432 162 36-28v166l-36 28Z"/>
   <path class="energy-battery-terminal" d="m451 212 17-13h22v52l-17 13h-22Z"/>
   <path class="cover-diagram-guide" d="M451 212h22v52M473 212l17-13"/>
   <rect x="126" y="184" width="284" height="122" rx="5"/>
   <g class="energy-battery-cells">${[0,1,2,3].map(i=>`<rect x="${141+i*65}" y="198" width="58" height="94" rx="3"/>`).join('')}</g>
   <path class="energy-battery-charge" d="m287 187-49 67h37l-17 49 61-76h-39Z"/>
   <path class="cover-diagram-guide" d="M126 174h56M350 316h60"/>
  </g>
  `;
 if(id==='sejong')diagram=`
  <g class="sejong-street-map">
   <path class="sejong-waterway" d="M96 87c107 36-36 115 44 148s40 48 12 80"/>
   <path class="cover-diagram-guide" d="M60 115h296M64 192h292M65 278h290M88 82v225M216 82v227M304 82v229"/>
   <g class="sejong-buildings">${[[110,94,32,34],[171,96,27,31],[239,92,41,43],[323,91,29,45],[108,151,38,26],[159,149,34,28],[237,153,44,23],[323,149,27,26],[170,212,26,45],[234,211,46,36],[321,216,30,38],[86,290,38,18],[241,290,38,18]].map(([x,y,w,h],i)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" style="--building-delay:${.3+i*.06}s"/>`).join('')}</g>
   <g class="sejong-candidates">${[[123,143],[243,115],[329,180],[174,249],[273,271]].map(([x,y],i)=>i===0||i===4?`<g class="sejong-selected-site" style="--site-delay:${i===0?'0':'-2.8'}s"><circle class="sejong-site-halo" cx="${x}" cy="${y}" r="20"/><circle class="sejong-site-point" cx="${x}" cy="${y}" r="12"/></g>`:`<circle cx="${x}" cy="${y}" r="5" style="--point-delay:${-i*.85}s"/>`).join('')}</g>
  </g>`;
 if(id==='fitness')diagram=`
  <g class="fitness-machine-frame"><path d="M105 77v269M221 77v269M78 348h170M140 46h45"/><path class="fitness-cable" d="M162 46v162"/></g>
  <g class="fitness-moving-stack">
   ${[0,1,2,3].map(i=>`<rect class="fitness-weight-plate" x="88" y="${210+i*28}" width="150" height="21" rx="2"/>`).join('')}
  </g>
  <g class="fitness-sensor-link"><path d="M243 250h54m-7-6 7 6-7 6"/></g>
  <g class="fitness-waveform">
   <path class="cover-diagram-guide" d="M315 145v171h249M315 252h249"/>
   <path class="fitness-threshold" d="M315 204h249"/>
   <path class="fitness-signal-reference" d="M315 252h24q12 0 23-18 7-8 13 9 11 15 24-23 12-65 24-43 17 30 25 75 10 61 27 30 10-17 17-30 10-17 20-8 9 9 15 8h37"/>
   <path class="fitness-signal-read" d="M315 252h24q12 0 23-18 7-8 13 9 11 15 24-23 12-65 24-43 17 30 25 75 10 61 27 30 10-17 17-30 10-17 20-8 9 9 15 8h37"/>
   <circle class="fitness-peak-marker" cx="418" cy="170" r="10"/>
  </g>`;
 const archiveViewBoxes={alloy:'70 55 470 310',xrd:'35 5 515 275',energy:'80 106 435 250',sejong:'45 65 330 270',fitness:'60 30 535 335'};
 const viewBox=compact?archiveViewBoxes[id]:(id==='sejong'?'20 50 380 285':'0 0 600 450');
 return `<svg class="experience-cover-graphic cover-${id}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${compact||['xrd','energy','sejong','fitness'].includes(id)?'':guides}<g class="cover-drawing">${diagram}</g></svg>`;
}
function experienceResourceIcon(type) {
 const paths=type==='story'?'<path d="M28 20h32l20 9 20-9h32v64h-32L80 93 60 84H28zM80 29v64M40 36h18M40 47h18M102 36h18M102 47h18"/>':type==='parts3d'?'<path d="m80 14 39 23v45L80 105 41 82V37zM41 37l39 23 39-23M80 60v45"/>':type==='map'?'<path d="m28 32 35-12 34 12 35-12v66l-35 12-34-12-35 12zM63 20v66M97 32v66"/><circle cx="81" cy="57" r="10"/>':type==='demo'?'<rect x="60" y="13" width="42" height="87" rx="6"/><path d="M67 58h8l5-19 8 34 5-15h5M73 90h16"/>':type==='equipment'?'<circle cx="79" cy="57" r="30"/><circle cx="79" cy="57" r="14"/><path d="M42 15h74M49 10v12M109 10v12M31 29v56M25 29h12M25 85h12"/>':type==='slides'?'<rect x="39" y="20" width="82" height="58"/><path d="M47 86h82V28M55 94h82V36M51 37h31M51 48h53M51 59h40"/>':'<path d="M31 83h100M39 76V50h17v26M72 76V34h17v42M105 76V19h17v57"/>';
 return `<svg viewBox="0 0 160 115" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">${paths}</svg>`;
}
function experienceResourcesMarkup(project) {
 const entries=[...project.branches.map((branch,index)=>({href:`#${project.id}/story-${index}`,title:branch[0],description:branch[1],type:'story'})),...project.works.map(work=>({href:`#${project.id}/work-${work.id}`,title:work.title,description:work.description,type:work.type}))];
 return `<nav class="experience-resources" aria-label="${escapeHTML(project.title)} 살펴보기">${entries.map((entry,index)=>`<a class="experience-resource" href="${entry.href}"><div class="resource-visual"><span>${number(index)}</span>${experienceResourceIcon(entry.type)}</div><h3>${escapeHTML(entry.title)}</h3>${entry.description!==entry.title?`<p>${escapeHTML(entry.description)}</p>`:''}<b aria-hidden="true">↗</b></a>`).join('')}</nav>`;
}
