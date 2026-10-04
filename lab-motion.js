/* Motion enhances the document; every section stays visible without JavaScript. */
let disposePortfolioMotion=()=>{};
function bindPortfolioMotion(root){
 disposePortfolioMotion();
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const disposers=[];
 const reveals=[...root.querySelectorAll('[data-reveal],.story-visual,.story-section')];
 const showAll=()=>reveals.forEach(element=>{element.classList.remove('will-reveal');element.classList.add('is-visible');});
 let observer;
 if(!preference.matches&&'IntersectionObserver' in window){
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add('is-visible');observer.unobserve(entry.target);
  }),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  reveals.forEach(element=>{element.classList.add('will-reveal');observer.observe(element);});
  disposers.push(()=>observer.disconnect());
 }else showAll();
 const hero=root.querySelector('.portfolio-hero');
 const frame=hero?.querySelector('iframe');
 let raf=0,previousProgress=-1;
 const update=()=>{
  raf=0;
  if(!hero?.isConnected)return;
  const rect=hero.getBoundingClientRect();
  const progress=Math.min(1,Math.max(0,-rect.top/Math.max(1,rect.height-innerHeight*.3)));
  const pageProgress=Math.min(1,Math.max(0,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)));
  root.style.setProperty('--page-progress',String(pageProgress));
  if(preference.matches){hero.style.setProperty('--hero-progress','0');return;}
  hero.style.setProperty('--hero-progress',String(progress));
  if(rect.bottom>0&&rect.top<innerHeight&&Math.abs(previousProgress-progress)>.001){
   frame?.contentWindow?.postMessage({type:'portfolio-specimen-progress',progress},location.origin);
   previousProgress=progress;
  }
 };
 const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update);};
 if(hero){
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  frame?.addEventListener('load',()=>{previousProgress=-1;onScroll();},{once:true});
  onScroll();
  disposers.push(()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);});
 }
 const chapters=[...root.querySelectorAll('[data-chapter]')];
 if(chapters.length&&'IntersectionObserver' in window){
  const chapterObserver=new IntersectionObserver(entries=>{
   for(const entry of entries){if(!entry.isIntersecting)continue;
    root.querySelectorAll('.lab-chapters button').forEach(button=>{
     const active=button.dataset.homeScroll===entry.target.id;
     button.classList.toggle('is-current',active);
     active?button.setAttribute('aria-current','location'):button.removeAttribute('aria-current');
    });
   }
  },{rootMargin:'-25% 0px -45% 0px',threshold:0});
  chapters.forEach(chapter=>chapterObserver.observe(chapter));
  disposers.push(()=>chapterObserver.disconnect());
 }
 const change=()=>{if(preference.matches){observer?.disconnect();showAll();}previousProgress=-1;onScroll();};
 preference.addEventListener('change',change);
 disposers.push(()=>preference.removeEventListener('change',change));
 disposePortfolioMotion=()=>disposers.forEach(dispose=>dispose());
}
/* Same-document transitions progressively enhance ordinary, bookmarkable links. */
document.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const home=event.target.closest('.brand');
 if(home&&document.body.classList.contains('showcase-home')){event.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
 const link=event.target.closest('[data-project-transition]');
 if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const href=link.getAttribute('href');
 if(!href?.startsWith('#')||href===location.hash)return;
 event.preventDefault();
 const card=link.closest('.lab-project-card'),preview=card?.querySelector('.lab-card-visual');
 const id=href.slice(1).split('/')[0];
 // Only one element may own a transition name at a time.
 const existing=document.querySelector(`[style*="view-transition-name:project-${id}"]`);
 if(preview&&existing)existing.style.viewTransitionName='none';
 if(preview)preview.style.viewTransitionName='project-'+id;
 const transition=document.startViewTransition(()=>{location.hash=href;render();});
 transition.finished.catch(()=>{});
});
