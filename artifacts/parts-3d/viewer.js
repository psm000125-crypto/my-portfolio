(function(){
  'use strict';
  const heroMode=new URLSearchParams(location.search).get('hero')==='1';
  const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
  let heroMotionSeconds=0;
  if(heroMode)document.body.classList.add('hero-mode');
  const $=s=>document.querySelector(s),load=$('#load-state');
  if(!window.THREE||!window.PartsModels){load.textContent='3D 라이브러리를 불러오지 못했습니다. vendor 폴더와 함께 페이지를 열어 주세요.';return;}
  const T=THREE,defs=PartsModels.definitions,canvas=$('#scene'),stage=$('#stage');
  let renderer;
  try{renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});}
  catch(e){load.textContent='이 브라우저에서 3D 화면을 열 수 없습니다. 하드웨어 가속을 켜거나 WebGL을 지원하는 브라우저에서 열어 주세요.';return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,6.3);
  // Softboxes in an environment scene create broad metallic highlights without downloads.
  const room=new T.Scene();room.background=new T.Color(0x505957);
  const panels=[[-3,5,4,6,5,3.4],[4,1,2,2,6,2.1],[-4,-2,-3,4,3,1.5],[0,5,-4,6,2,4]];
  for(const [x,y,z,w,h,intensity]of panels){const p=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(intensity,intensity,intensity),side:T.DoubleSide}));p.position.set(x,y,z);p.lookAt(0,0,0);room.add(p);}
  const pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromScene(room,.055);scene.environment=environment.texture;pmrem.dispose();room.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
  scene.add(new T.HemisphereLight(0xeef7ff,0x52534a,.85));
  const key=new T.DirectionalLight(0xfff5e5,1.8);key.position.set(-3,5,4);scene.add(key);
  const fill=new T.DirectionalLight(0xdbefff,1.1);fill.position.set(4,-1,2);scene.add(fill);
  const rim=new T.DirectionalLight(0xffffff,1.7);rim.position.set(2,4,-4);scene.add(rim);
  const pivot=new T.Group();scene.add(pivot);
  const models=defs.map((_,i)=>PartsModels.build(i));let current=0,auto=false,wire=false,dirty=true,inView=true,lastTime=0;
  const radii=models.map(model=>{model.updateMatrixWorld(true);let radius=0;const p=new T.Vector3();model.traverse(m=>{if(!m.isMesh)return;const a=m.geometry.attributes.position;for(let i=0;i<a.count;i++){p.fromBufferAttribute(a,i).applyMatrix4(m.matrixWorld);radius=Math.max(radius,p.length());}});return radius;});
  const initialQ=new T.Quaternion().setFromEuler(new T.Euler(.53,-.48,.015,'XYZ'));
  const viewQuats={iso:initialQ,front:new T.Quaternion(),top:new T.Quaternion().setFromEuler(new T.Euler(Math.PI/2,0,0)),bottom:new T.Quaternion().setFromEuler(new T.Euler(-Math.PI/2,0,0))};
  const viewLabels={iso:'기본 시점',front:'정면',top:'윗면',bottom:'아랫면'};
  let zoomRatio=1;
  function fitDistance(){const halfVertical=T.MathUtils.degToRad(camera.fov/2),halfHorizontal=Math.atan(Math.tan(halfVertical)*camera.aspect);return radii[current]/Math.sin(Math.min(halfVertical,halfHorizontal))*1.19;}
  function resized(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=fitDistance()*zoomRatio;camera.updateProjectionMatrix();dirty=true;}
  new ResizeObserver(resized).observe(stage);
  function zoom(factor){zoomRatio=T.MathUtils.clamp(zoomRatio*factor,.64,2.14);camera.position.z=fitDistance()*zoomRatio;$('#zoom-value').textContent=Math.round(100/zoomRatio)+'%';dirty=true;}
  function setAuto(value){auto=value;$('#auto')?.setAttribute('aria-pressed',String(auto));dirty=true;}
  function freeView(){document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed','false'));$('#view-label').textContent='자유 회전';}
  function preset(name){pivot.quaternion.copy(viewQuats[name]);pivot.position.set(0,0,0);setAuto(false);$('#view-label').textContent=viewLabels[name];document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===name)));dirty=true;}
  function reset(){zoomRatio=1;camera.position.z=fitDistance();$('#zoom-value').textContent='100%';preset('iso');}
  function select(index){
    current=index;pivot.clear();pivot.add(models[index]);const d=defs[index];
    $('#part-number').textContent=String(index+1).padStart(2,'0');$('#part-english').textContent=d.english;$('#part-title').textContent=d.title;$('#part-description').textContent=d.description;
    $('#part-features').replaceChildren(...d.features.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
    document.querySelectorAll('.part-card').forEach((b,i)=>b.setAttribute('aria-pressed',String(index===i)));
    canvas.setAttribute('aria-label',d.title+' 3D 모델. 드래그 또는 방향키로 회전, 휠 또는 더하기와 빼기 키로 확대와 축소');
    $('#announcement').textContent=d.title+' 선택됨';reset();history.replaceState(null,'','#'+d.id);
  }
  // Render real geometry for the selector thumbnails with the same lighting.
  renderer.setPixelRatio(1);renderer.setSize(240,150,false);camera.aspect=240/150;camera.position.z=7.5;camera.updateProjectionMatrix();pivot.quaternion.copy(initialQ);
  if(!heroMode)defs.forEach((d,i)=>{
    pivot.clear();pivot.add(models[i]);renderer.render(scene,camera);
    const button=document.createElement('button');button.type='button';button.className='part-card';button.setAttribute('aria-label',d.title+' 선택');button.setAttribute('aria-pressed','false');
    const number=document.createElement('span');number.className='card-number';number.textContent=String(i+1).padStart(2,'0');
    const img=document.createElement('img');img.src=canvas.toDataURL('image/png');img.alt='';img.width=240;img.height=150;
    const title=document.createElement('strong');title.textContent=d.title;button.title=d.title+' · '+d.english;const dot=document.createElement('span');dot.className='selected-dot';
    button.append(number,img,title,dot);button.addEventListener('click',()=>select(i));$('#part-list').append(button);
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));resized();
  const startIndex=defs.findIndex(d=>d.id===location.hash.slice(1));select(startIndex<0?0:startIndex);load.hidden=true;
  if(heroMode&&!motionPreference.matches)setAuto(true);
  motionPreference.addEventListener('change',e=>{if(e.matches)setAuto(false);});
  // The thumbnails render through the same canvas. Draw the selected model once
  // before the next animation frame so the final thumbnail never flashes first.
  renderer.render(scene,camera);dirty=false;
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>preset(b.dataset.view)));
  $('#zoom-in').onclick=()=>zoom(.86);$('#zoom-out').onclick=()=>zoom(1/.86);
  $('#reset')?.addEventListener('click',reset);
  $('#auto')?.addEventListener('click',()=>{setAuto(!auto);if(auto)freeView();});
  $('#wire')?.addEventListener('click',()=>{wire=!wire;PartsModels.materials.forEach(m=>{m.wireframe=wire;});$('#wire').setAttribute('aria-pressed',String(wire));dirty=true;});
  function rotate(dx,dy){const length=Math.hypot(dx,dy);if(!length)return;const q=new T.Quaternion().setFromAxisAngle(new T.Vector3(dy,dx,0).normalize(),length*.008);pivot.quaternion.premultiply(q).normalize();freeView();dirty=true;}
  const pointers=new Map();let pinch=0;
  canvas.addEventListener('pointerdown',e=>{if(heroMode&&e.pointerType!=='mouse')return;if(e.pointerType==='mouse'&&e.button!==0)return;canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});setAuto(false);pinch=0;});
  canvas.addEventListener('pointermove',e=>{const last=pointers.get(e.pointerId);if(!last)return;const dx=e.clientX-last.x,dy=e.clientY-last.y;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){rotate(dx,dy);}else if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(pinch>0&&distance>0)zoom(pinch/distance);pinch=distance;}});
  function release(e){pointers.delete(e.pointerId);pinch=0;}
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  if(!heroMode)canvas.addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(T.MathUtils.clamp(e.deltaY,-200,200)*.0018));},{passive:false});
  canvas.addEventListener('keydown',e=>{let handled=true;switch(e.key){case 'ArrowLeft':setAuto(false);rotate(-12,0);break;case 'ArrowRight':setAuto(false);rotate(12,0);break;case 'ArrowUp':setAuto(false);rotate(0,-12);break;case 'ArrowDown':setAuto(false);rotate(0,12);break;case '+':case '=':zoom(.86);break;case '-':zoom(1/.86);break;case 'r':case 'R':reset();break;default:handled=false;}if(handled)e.preventDefault();});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();load.hidden=false;load.textContent='3D 화면 연결이 중단되었습니다. 페이지를 새로고침해 주세요.';});
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;dirty=true;}).observe(stage);
  function frame(time){requestAnimationFrame(frame);const delta=Math.min((time-lastTime)/1000,.05);lastTime=time;if(document.hidden||!inView)return;if(auto){pivot.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),delta*(heroMode?.12:.20)));dirty=true;if(heroMode){heroMotionSeconds+=delta;if(heroMotionSeconds>=4)setAuto(false);}}if(dirty){renderer.render(scene,camera);dirty=false;}}
  requestAnimationFrame(frame);
})();
