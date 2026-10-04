/* Photo-based visual approximations. Dimensions below are arbitrary modeling
 * units, not measured dimensions; unseen topology is deliberately simplified. */
(function(root){
  'use strict';
  const T=root.THREE;
  if(!T)return;
  const TAU=Math.PI*2;
  const silver=new T.MeshStandardMaterial({color:0xc4c9c9,metalness:.82,roughness:.3});
  const machined=new T.MeshStandardMaterial({color:0xdce0df,metalness:.88,roughness:.23});
  const cast=new T.MeshStandardMaterial({color:0xaeb7b8,metalness:.68,roughness:.4});
  function add(g,geo,mat=silver,x=0,y=0,z=0){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);g.add(m);return m;}
  function lathe(g,profile,mat=silver,start=0,length=TAU){return add(g,new T.LatheGeometry(profile.map(p=>new T.Vector2(...p)),128,start,length),mat);}
  function annulus(g,outer,inner,bottom,height,mat=silver,start=0,length=TAU){
    return lathe(g,[[inner,bottom],[outer-.012,bottom],[outer,bottom+.012],[outer,bottom+height-.012],[outer-.012,bottom+height],[inner+.01,bottom+height],[inner,bottom+height-.01],[inner,bottom]],mat,start,length);
  }
  function circle(r,x=0,y=0){const s=new T.Shape();s.absarc(x,y,r,0,TAU,false);return s;}
  function hole(shape,r,x=0,y=0){const h=new T.Path();h.absarc(x,y,r,0,TAU,true);shape.holes.push(h);}
  function extrude(g,shape,height,y=0,mat=silver,bevel=.015){
    const geo=new T.ExtrudeGeometry(shape,{depth:height,bevelEnabled:bevel>0,bevelSegments:3,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:48});
    geo.rotateX(-Math.PI/2);return add(g,geo,mat,0,y,0);
  }
  function rect(x,y,w,h,r=.05){
    const s=new T.Shape();s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
  }
  function boltDimple(g,x,z,y,r=.055){const s=circle(r);hole(s,r*.73);const m=extrude(g,s,.015,y,machined,.004);m.position.x=x;m.position.z=z;}
  function rings(){
    const g=new T.Group();
    annulus(g,1.5,1.04,0,.055,machined);
    // Skirt slots are real gaps with radial end walls, not dark decals.
    const n=8,gap=.08;
    for(let i=0;i<n;i++){
      const a=i*TAU/n+gap,b=(i+1)*TAU/n-gap;
      const s=new T.Shape();s.absarc(0,0,1.5,a,b,false);s.absarc(0,0,1.04,b,a,true);s.closePath();extrude(g,s,.10,.055,silver,.004);
    }
    annulus(g,1.5,1.04,.155,.075,machined);
    const pos=[];
    function tri(a,b,c){pos.push(...a,...b,...c);}
    for(let row=0;row<8;row++){
      const r=1.073+row*.054, count=Math.round(TAU*r/.051);
      for(let k=0;k<count;k++){
        const a=(k+(row%2)*.5)*TAU/count,da=.021/r;
        const p=[r*Math.cos(a),.245,r*Math.sin(a)];
        const corners=[[r-.022,a],[r,a+da],[r+.022,a],[r,a-da]].map(([q,t])=>[q*Math.cos(t),.23,q*Math.sin(t)]);
        for(let j=0;j<4;j++)tri(corners[j],p,corners[(j+1)%4]);
      }
    }
    const knurl=new T.BufferGeometry();knurl.setAttribute('position',new T.Float32BufferAttribute(pos,3));knurl.computeVertexNormals();add(g,knurl,silver);
    return g;
  }
  function tshaft(){
    const g=new T.Group();
    extrude(g,rect(-1.28,-.25,2.56,.5,.045),.25,-.125,cast,.035);
    const shaft=lathe(g,[[0,-.98],[.19,-.98],[.215,-.945],[.215,.78],[.2,.84],[0,.84]],cast);
    shaft.rotation.x=Math.PI/2;
    const end=lathe(g,[[.20,-.91],[.23,-.91],[.23,-.85],[.20,-.85],[.20,-.91]],machined);end.rotation.x=Math.PI/2;
    const collar=lathe(g,[[.20,.36],[.27,.36],[.27,.45],[.20,.45],[.20,.36]],silver);collar.rotation.x=Math.PI/2;
    return g;
  }
  function lobedOutline(){
    const s=new T.Shape();for(let i=0;i<=192;i++){const a=i/192*TAU,r=1.0+.115*Math.pow((Math.cos(4*a)+1)/2,3);const x=r*Math.cos(a),y=r*Math.sin(a);if(i===0)s.moveTo(x,y);else s.lineTo(x,y);}s.closePath();return s;
  }
  function lobed(){
    const g=new T.Group();
    const base=lobedOutline();hole(base,.20);extrude(g,base,.13,0,cast,.02);
    const wall=lobedOutline();hole(wall,.79);extrude(g,wall,.29,.13,silver,.02);
    annulus(g,.36,.20,.13,.18,machined);
    annulus(g,.81,.76,.16,.045,machined);
    for(let i=0;i<4;i++){const a=i*Math.PI/2;boltDimple(g,Math.cos(a)*.99,Math.sin(a)*.99,.429,.065);}
    return g;
  }
  function slot(shape,start,span,radius,width){
    const end=start+span,h=new T.Path();
    h.absarc(0,0,radius+width/2,start,end,false);
    h.absarc(radius*Math.cos(end),radius*Math.sin(end),width/2,end,end+Math.PI,false);
    h.absarc(0,0,radius-width/2,end,start,true);
    h.absarc(radius*Math.cos(start),radius*Math.sin(start),width/2,start+Math.PI,start+TAU,false);
    h.closePath();shape.holes.push(h);
  }
  function round(){
    const g=new T.Group(),face=circle(1.03);hole(face,.17);
    for(let i=0;i<3;i++){const a=i*TAU/3;slot(face,a+.18,.83,.61,.18);hole(face,.07,.62*Math.cos(a+1.55),.62*Math.sin(a+1.55));}
    extrude(g,face,.23,0,silver,.02);
    annulus(g,1.04,.93,.025,.09,machined);
    annulus(g,.285,.17,.23,.035,machined);
    return g;
  }
  function housing(){
    const g=new T.Group();
    annulus(g,1.22,.9,0,.17,machined);
    lathe(g,[[.9,.12],[1.04,.14],[.44,1.49],[.42,1.5],[.31,1.5],[.31,1.25],[.78,.17],[.9,.12]],cast);
    for(let i=0;i<12;i++){
      const s=new T.Shape();s.moveTo(.40,1.47);s.lineTo(.48,1.47);s.lineTo(1.15,.19);s.lineTo(.87,.19);s.closePath();
      const geo=new T.ExtrudeGeometry(s,{depth:.052,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.012,bevelThickness:.012});geo.translate(0,0,-.026);
      const rib=add(g,geo,silver);rib.rotation.y=i*TAU/12;
    }
    annulus(g,.43,.31,1.45,.2,machined);annulus(g,.49,.31,1.62,.1,machined);
    annulus(g,.44,.31,1.72,.34,machined);annulus(g,.46,.31,2.035,.045,machined);
    const lug=rect(.32,-.11,.34,.22,.065);hole(lug,.054,.53,0);extrude(g,lug,.13,1.78,silver,.018);
    return g;
  }
  function bracket(){
    const g=new T.Group(),base=new T.Shape();
    base.moveTo(-1.17,-.65);base.lineTo(.70,-.65);base.quadraticCurveTo(1.13,-.65,1.13,-.22);base.lineTo(1.13,.3);base.quadraticCurveTo(1.13,.68,.72,.68);base.lineTo(-1.17,.68);base.lineTo(-1.17,.32);base.lineTo(-.65,.32);base.lineTo(-.65,-.28);base.lineTo(-1.17,-.28);base.closePath();hole(base,.23,.7,-.24);
    extrude(g,base,.22,0,cast,.035);
    const wall=new T.Shape(),cx=.08,cy=.24,start=-.06,end=Math.PI*1.08;
    wall.absarc(cx,cy,.68,start,end,false);wall.absarc(cx,cy,.41,end,start,true);wall.closePath();extrude(g,wall,.67,.22,silver,.035);
    extrude(g,rect(-1.13,-.63,.26,1.29,.035),.17,.22,cast,.02);
    for(let i=0;i<5;i++){const a=.15+i*.66;boltDimple(g,cx+.548*Math.cos(a),-(cy+.548*Math.sin(a)),.927,.044);}
    return g;
  }
  const definitions=[
    {id:'wheel',title:'Wheel',english:'WHEEL',description:'형상측정기로 반지름·길이·각도·곡률을 확인한 Wheel 부품입니다.',features:['중앙이 열린 환형 구조','상부의 반복 표면 패턴','측면의 작은 슬롯'],build:rings},
    {id:'flow-shaft-h300',title:'유동 샤프트 H300',english:'FLOW SHAFT H300',description:'인턴 기록에 남은 유동 샤프트 H300의 외형을 기준으로 연결한 모델입니다.',features:['가로로 뻗은 평판','양쪽으로 이어지는 축','축 끝단의 단차'],build:tshaft},
    {id:'gyeongchang-guide',title:'경창 가이드',english:'GYEONGCHANG GUIDE',description:'인턴 기록에 남은 경창 가이드와 연결한 외형 모델입니다.',features:['네 방향의 외곽 돌기','안쪽으로 파인 원형 공간','중앙 관통부'],build:lobed},
    {id:'valve-sleeve',title:'밸브 슬리브',english:'VALVE SLEEVE',description:'인턴 기록에 남은 밸브 슬리브와 연결한 외형 모델입니다.',features:['돌기가 없는 원형 외곽','중앙의 작은 관통부','상부의 곡선형 개구'],build:round},
    {id:'nozzle-housing',title:'Nozzle Housing',english:'NOZZLE HOUSING',description:'원뿔형 리브 구조를 기준으로 붙인 포트폴리오용 명칭입니다.',features:['방사형 보강 리브','단차가 있는 원통형 목','중앙 개구와 원형 플랜지'],build:housing},
    {id:'mounting-bracket',title:'Mounting Bracket',english:'MOUNTING BRACKET',description:'비대칭 곡면 지지 구조를 기준으로 붙인 포트폴리오용 명칭입니다.',features:['C자 형태의 곡면 벽','바닥의 원형 관통부','측면으로 뻗은 지지부'],build:bracket}
  ];
  function build(index){const g=definitions[index].build();g.name=definitions[index].id;const box=new T.Box3().setFromObject(g),center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3());g.position.sub(center);const wrap=new T.Group();wrap.add(g);wrap.scale.setScalar(3.15/Math.max(size.x,size.y,size.z));wrap.userData={photoBased:true,units:'arbitrary; not measured',...definitions[index],build:undefined};return wrap;}
  root.PartsModels={definitions,build,materials:[silver,machined,cast]};
})(typeof window!=='undefined'?window:globalThis);
