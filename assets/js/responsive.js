/* Native touch interactions and reversible, viewport-aware enhancements. */
(()=>{'use strict';
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const compact=matchMedia('(max-width:1199px)'),phone=matchMedia('(max-width:767px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
 const stack=$('.ts-dashboard-stack'),proofs=$$('.ts-proof-card');
 if(stack){
  stack.setAttribute('aria-label','Dashboard results');stack.setAttribute('tabindex','0');
  const controls=document.createElement('div');controls.className='ts-proof-controls';controls.setAttribute('aria-label','Choose dashboard');
  proofs.forEach((card,i)=>{const button=document.createElement('button');button.type='button';button.textContent=String(i+1).padStart(2,'0');button.setAttribute('aria-label',`Show ${['shop management','creator and affiliate','GMV Max'][i]} dashboard`);button.addEventListener('click',()=>{stack.scrollTo({left:card.offsetLeft-proofs[0].offsetLeft,behavior:reduce.matches?'instant':'smooth'})});controls.append(button)});
  stack.after(controls);
  const updateProof=()=>{let nearest=0,distance=Infinity;proofs.forEach((card,i)=>{const d=Math.abs(card.offsetLeft-proofs[0].offsetLeft-stack.scrollLeft);if(d<distance){distance=d;nearest=i}});[...controls.children].forEach((b,i)=>b.setAttribute('aria-current',String(i===nearest)))};
  stack.addEventListener('scroll',updateProof,{passive:true});updateProof();
  stack.addEventListener('keydown',e=>{if(!compact.matches||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();stack.scrollBy({left:(proofs[0].offsetWidth+18)*(e.key==='ArrowRight'?1:-1),behavior:reduce.matches?'instant':'smooth'})});
 }
 const grid=$('.tp-project-area .row.gx-135');grid?.classList.add('ts-project-grid');
 const services=$$('.tp-service-panel'),projects=$$('.tp-project-item');
 $$('.tp-funfact-panel').forEach(panel=>{
  const compactFact=document.createElement('div');compactFact.className='ts-responsive-fact';
  const value=document.createElement('strong');value.textContent=panel.querySelector('.tp-funfact-number')?.textContent.trim();
  const title=document.createElement('h3');title.textContent=panel.querySelector('.tp-funfact-title')?.textContent.trim();
  compactFact.append(value,title);
  ['.ts-fact-context','.ts-fact-link'].forEach(selector=>{const source=panel.querySelector(selector);if(source)compactFact.append(source.cloneNode(true))});
  panel.append(compactFact);panel.classList.add('ts-has-compact');
 });
 const steps=$$('.tp-work-item'),growth=$$('.ts-growth-node');let observer,frame=0;
 const updateStacks=()=>{
  [services,projects].forEach(cards=>cards.forEach((card,i)=>{
   card.style.setProperty('--stack-index',String(i));
   const permitted=compact.matches&&!reduce.matches&&(cards===services||phone.matches);
   card.classList.toggle('ts-stack-card',permitted&&card.offsetHeight+88+i*10+24<innerHeight);
  }));
 };
 function progress(){
  frame=0;if(!compact.matches)return;
  let current=0;steps.forEach((step,i)=>{if(step.getBoundingClientRect().top<innerHeight*.68)current=i});
  steps.forEach((step,i)=>{step.classList.toggle('is-reached',reduce.matches||i<=current);step.classList.toggle('is-active',!reduce.matches&&i===current);if(i===current)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current')});
  $('.tp-work-wrapper')?.style.setProperty('--process-progress',String(reduce.matches?1:(current+1)/Math.max(1,steps.length)));
  const distances=growth.map(node=>{const r=node.getBoundingClientRect();return Math.abs(r.top+r.height/2-innerHeight*.55)}),nearest=Math.min(...distances);
  growth.forEach((node,i)=>node.classList.toggle('is-active',reduce.matches||distances[i]<nearest+2));$('.ts-growth-stage')?.setAttribute('data-active',growth.map((_,i)=>i).filter(i=>reduce.matches||distances[i]<nearest+2).join(' '));
 }
 const requestProgress=()=>{if(!frame)frame=requestAnimationFrame(progress)};
 const reveals=$$('.ts-about-counters>div,.ts-wall-shot,.ts-responsive-fact,.ts-growth-node');
 function configure(){
  observer?.disconnect();reveals.forEach(el=>el.classList.remove('ts-reveal','is-pending'));
  updateStacks();
  if(compact.matches&&!reduce.matches){
   observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('is-pending');observer.unobserve(entry.target)}}),{threshold:.12});
   reveals.forEach((el,i)=>{el.classList.add('ts-reveal');if(el.getBoundingClientRect().top>innerHeight*.92)el.classList.add('is-pending');el.style.setProperty('--reveal-delay',`${(i%2)*70}ms`);observer.observe(el)});
  }
  progress();
 }
 window.addEventListener('scroll',requestProgress,{passive:true});
 let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{updateStacks();requestProgress()},180)},{passive:true});
 [compact,phone,reduce].forEach(query=>query.addEventListener('change',configure));
 window.addEventListener('load',configure,{once:true});document.fonts?.ready.then(configure);
 // Lazy image dimensions can change whether a sticky card fits.
 $$('.tp-project-thumb img,.tp-service-thumb img').forEach(img=>img.addEventListener('load',updateStacks,{once:true}));
 const pagination=document.createElement('div');pagination.className='ts-review-pagination';pagination.setAttribute('aria-live','polite');$('.ts-review-controls')?.before(pagination);
 function connectReviews(){const swiper=$('.tp-testimonial-slider-active')?.swiper;if(!swiper)return;const update=()=>{pagination.textContent=`${swiper.activeIndex+1} / ${swiper.slides.length}`};swiper.on('slideChange',update);update()}
 window.addEventListener('load',()=>document.fonts.ready.then(connectReviews),{once:true});
 configure();
})();
