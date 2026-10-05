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
  return `<details class="nav-collection" data-collection="${collection.id}"${open?' open':''}><summary><span class="num">${number(index)}</span><strong>${collection.title}</strong><span class="collection-toggle" aria-hidden="true"></span></summary><div class="nav-collection-body">${collectionBrace}${collection.projects.map(id=>{
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
function experienceCoverGraphic(id) {
 const guides='<g class="cover-guides"><circle cx="300" cy="220" r="174"/><circle cx="300" cy="220" r="145" stroke-dasharray="2 9"/><path d="M92 400h416M92 393v14M508 393v14M300 28v18M290 37h20M300 394v18M290 403h20"/></g>';
 let diagram='';
 if(id==='mim')diagram=`<g class="cover-specimen"><ellipse cx="300" cy="185" rx="118" ry="65"/><ellipse cx="300" cy="185" rx="55" ry="31"/><path d="M182 185v70c0 36 53 65 118 65s118-29 118-65v-70M245 185v45c0 17 25 31 55 31s55-14 55-31v-45"/><path d="M208 208v69M392 208v69" opacity=".35"/></g><g class="cover-probe"><path d="M470 112H356v34M346 146h20M470 102v20"/><circle cx="356" cy="149" r="3"/></g><g class="cover-measure"><path d="M172 92h256M182 78v29M418 78v29M147 185v135M138 185h18M138 320h18"/><path d="m182 92 9-5m-9 5 9 5m227-5-9-5m9 5-9 5"/></g>`;
 if(id==='alloy')diagram=`<g class="cover-roll cover-roll-top"><circle cx="286" cy="139" r="61"/><circle cx="286" cy="139" r="9"/><path d="M286 90v20M335 139h-20M286 188v-20M237 139h20"/></g><g class="cover-roll cover-roll-bottom"><circle cx="286" cy="279" r="61"/><circle cx="286" cy="279" r="9"/><path d="M286 230v20M335 279h-20M286 328v-20M237 279h20"/></g><path class="cover-draw" d="M96 195h140l50 9h230v10H286l-50 9H96z"/><g class="cover-grains"><path d="M116 195v28M144 195v28M172 195v28M200 195v28M352 204v10M394 204v10M436 204v10M478 204v10"/></g><path d="M394 168h84m-8-6 8 6-8 6M220 254h-84m8-6-8 6 8 6" opacity=".55"/>`;
 if(id==='xrd')diagram=`<g class="cover-crystal"><path d="m300 120 84 48v97l-84 48-84-48v-97zM216 168l84 48 84-48M300 216v97M300 120v96M216 265l84-49 84 49"/>${[[300,120],[384,168],[384,265],[300,313],[216,265],[216,168],[300,216]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6"/>`).join('')}</g><g class="cover-ray"><path d="m108 97 150 95M258 192l170-99M248 206l197 25"/><circle cx="258" cy="192" r="11"/></g><path class="cover-trace" d="M96 360h64l10-36 8 36h50l9-76 9 76h72l10-49 9 49h52l7-23 7 23h91"/>`;
 if(id==='energy')diagram=`<g class="cover-layer cover-layer-top"><path d="m150 136 150-67 150 67-150 67zM150 136v22l150 67 150-67v-22M300 203v22"/>${[0,1,2,3,4].map(i=>`<path d="m${183+i*27} ${121-i*12} 125 56" opacity=".5"/>`).join('')}</g><g class="cover-layer cover-layer-middle"><path d="m150 219 150-67 150 67-150 67zM150 219v22l150 67 150-67v-22M300 286v22"/></g><g class="cover-layer cover-layer-base"><path d="m150 302 150-67 150 67-150 67zM150 302v22l150 67 150-67v-22M300 369v22"/></g><g class="cover-ion"><circle cx="270" cy="30" r="5"/><circle cx="330" cy="60" r="5"/><circle cx="386" cy="35" r="5"/><path d="M270 45v25M330 75v25M386 50v25"/></g>`;
 if(id==='sejong')diagram=`<g class="cover-map"><path d="m114 114 128-38 126 41 123-34v235l-123 41-126-42-128 38zM242 76v241M368 117v242"/><path d="m114 210 377-46M153 343l19-222M292 333l33-230M404 347l29-248M114 282l377-43" opacity=".45"/><path class="cover-route" d="m172 220 109-39 44 82 103-23" stroke-dasharray="5 7"/></g>${[[172,220],[281,181],[325,263],[428,240]].map(([x,y],i)=>`<g class="cover-pin" style="--pin-delay:${i*.7}s"><circle cx="${x}" cy="${y}" r="18"/><circle cx="${x}" cy="${y}" r="5"/><circle class="cover-pulse" cx="${x}" cy="${y}" r="18"/></g>`).join('')}`;
 if(id==='fitness')diagram=`<path d="M158 82v282M322 82v282M134 365h212M240 53v72" opacity=".6"/><g class="cover-stack"><rect x="162" y="205" width="156" height="23" rx="2"/><rect x="162" y="237" width="156" height="23" rx="2"/><rect x="162" y="269" width="156" height="23" rx="2"/><rect x="162" y="301" width="156" height="23" rx="2"/><rect x="220" y="132" width="40" height="63" rx="6"/><path d="M228 164h5l5-12 7 24 5-12h4"/></g><path d="M372 106v246M365 106h14M365 352h14" opacity=".4"/><path class="cover-signal" d="M399 345v-55l20-12 12-90 12 87 20 15 10-56 12 56 19 7v48"/><g class="cover-pulse-dot"><circle cx="431" cy="188" r="7"/><circle cx="473" cy="234" r="5"/></g>`;
 return `<svg class="experience-cover-graphic cover-${id}" viewBox="0 0 600 450" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${guides}<g class="cover-drawing">${diagram}</g></svg>`;
}
function experienceResourceIcon(type) {
 const paths=type==='story'?'<path d="M28 20h32l20 9 20-9h32v64h-32L80 93 60 84H28zM80 29v64M40 36h18M40 47h18M102 36h18M102 47h18"/>':type==='parts3d'?'<path d="m80 14 39 23v45L80 105 41 82V37zM41 37l39 23 39-23M80 60v45"/>':type==='map'?'<path d="m28 32 35-12 34 12 35-12v66l-35 12-34-12-35 12zM63 20v66M97 32v66"/><circle cx="81" cy="57" r="10"/>':type==='demo'?'<rect x="60" y="13" width="42" height="87" rx="6"/><path d="M67 58h8l5-19 8 34 5-15h5M73 90h16"/>':type==='equipment'?'<circle cx="79" cy="57" r="30"/><circle cx="79" cy="57" r="14"/><path d="M42 15h74M49 10v12M109 10v12M31 29v56M25 29h12M25 85h12"/>':type==='slides'?'<rect x="39" y="20" width="82" height="58"/><path d="M47 86h82V28M55 94h82V36M51 37h31M51 48h53M51 59h40"/>':'<path d="M31 83h100M39 76V50h17v26M72 76V34h17v42M105 76V19h17v57"/>';
 return `<svg viewBox="0 0 160 115" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">${paths}</svg>`;
}
function experienceResourcesMarkup(project) {
 const entries=[...project.branches.map((branch,index)=>({href:`#${project.id}/story-${index}`,title:branch[0],description:branch[1],type:'story'})),...project.works.map(work=>({href:`#${project.id}/work-${work.id}`,title:work.title,description:work.description,type:work.type}))];
 return `<nav class="experience-resources" aria-label="${escapeHTML(project.title)} 살펴보기">${entries.map((entry,index)=>`<a class="experience-resource" href="${entry.href}"><div class="resource-visual"><span>${number(index)}</span>${experienceResourceIcon(entry.type)}</div><h3>${escapeHTML(entry.title)}</h3>${entry.description!==entry.title?`<p>${escapeHTML(entry.description)}</p>`:''}<b aria-hidden="true">↗</b></a>`).join('')}</nav>`;
}
