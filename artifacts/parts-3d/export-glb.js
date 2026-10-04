/* Minimal glTF 2.0 exporter for the triangle meshes used in this collection. */
(function(root){
  'use strict';
  root.partsToGLB=function(group,name){
    const T=root.THREE,groups=new Map();group.updateMatrixWorld(true);
    group.traverse(mesh=>{
      if(!mesh.isMesh)return;
      const key=mesh.material;
      if(!groups.has(key))groups.set(key,{positions:[],normals:[]});
      const out=groups.get(key);let geo=mesh.geometry.clone();if(geo.index){const flat=geo.toNonIndexed();geo.dispose();geo=flat;}
      geo.applyMatrix4(mesh.matrixWorld);const p=geo.attributes.position,n=geo.attributes.normal;
      for(let i=0;i<p.count;i++){out.positions.push(p.getX(i),p.getY(i),p.getZ(i));out.normals.push(n.getX(i),n.getY(i),n.getZ(i));}geo.dispose();
    });
    const doc={asset:{version:'2.0',generator:'Photo-based parts archive',extras:{note:'Approximate geometry reconstructed from photos. Arbitrary scale; dimensions and unseen features are inferred.'}},scene:0,scenes:[{nodes:[0]}],nodes:[{name,mesh:0}],meshes:[{name,primitives:[]}],materials:[],buffers:[{byteLength:0}],bufferViews:[],accessors:[]};
    const chunks=[];let byteOffset=0;
    function attribute(values,bounds){
      const a=new Float32Array(values),bufferView=doc.bufferViews.length;
      doc.bufferViews.push({buffer:0,byteOffset,byteLength:a.byteLength,target:34962});chunks.push(new Uint8Array(a.buffer));byteOffset+=a.byteLength;
      const accessor={bufferView,componentType:5126,count:values.length/3,type:'VEC3'};
      if(bounds){accessor.min=[Infinity,Infinity,Infinity];accessor.max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<values.length;i++){const c=i%3;accessor.min[c]=Math.min(accessor.min[c],values[i]);accessor.max[c]=Math.max(accessor.max[c],values[i]);}}
      doc.accessors.push(accessor);return doc.accessors.length-1;
    }
    for(const [mat,data]of groups){
      const material=doc.materials.length;doc.materials.push({name:'Silver '+material,pbrMetallicRoughness:{baseColorFactor:[mat.color.r,mat.color.g,mat.color.b,1],metallicFactor:mat.metalness,roughnessFactor:mat.roughness}});
      doc.meshes[0].primitives.push({attributes:{POSITION:attribute(data.positions,true),NORMAL:attribute(data.normals,false)},material,mode:4});
    }
    doc.buffers[0].byteLength=byteOffset;
    const json=new TextEncoder().encode(JSON.stringify(doc)),jsonLength=Math.ceil(json.length/4)*4,binLength=Math.ceil(byteOffset/4)*4,total=12+8+jsonLength+8+binLength;
    const result=new Uint8Array(total),view=new DataView(result.buffer);view.setUint32(0,0x46546c67,true);view.setUint32(4,2,true);view.setUint32(8,total,true);view.setUint32(12,jsonLength,true);view.setUint32(16,0x4e4f534a,true);result.fill(32,20,20+jsonLength);result.set(json,20);
    const binStart=20+jsonLength;view.setUint32(binStart,binLength,true);view.setUint32(binStart+4,0x004e4942,true);let offset=binStart+8;for(const c of chunks){result.set(c,offset);offset+=c.length;}return result;
  };
})(typeof window!=='undefined'?window:globalThis);
