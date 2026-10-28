/* AVRON homepage behaviors, scoped from original main.js and slider-active.js.
   Settings retain the original starts, offsets, durations and easing. */
(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
window.tsTemplateMotion={source:'AVRON main.js / slider-active.js',pins:[],sliders:[]};
const ready=()=>{
 if(!window.gsap||!window.ScrollTrigger)return;
 gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin);
 let desktopContext=null,splits=[];
 const desktopQuery=matchMedia('(min-width:1200px)'),motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
 function configureMotion(){
  if(desktopContext){desktopContext.revert();desktopContext=null;}
  splits.forEach(split=>split.revert());splits=[];
  window.tsSmoother?.kill();window.tsSmoother=null;
  window.tsTemplateMotion.pins=[];
  if(desktopQuery.matches&&!motionQuery.matches){
   if(matchMedia('(pointer:fine)').matches)window.tsSmoother=ScrollSmoother.create({smooth:1.35,effects:true,smoothTouch:.1,ignoreMobileResize:true});
   desktopContext=gsap.context(()=>{
  $$('.tp-service-panel').forEach((section,index)=>{
   ScrollTrigger.create({id:`service-${index}`,trigger:section,pin:section,scrub:1,start:`top ${150+index*120}px`,end:'bottom 120%',endTrigger:'.tp-service-pin',pinSpacing:false});
   tsTemplateMotion.pins.push(`service-${index}`);
  });
  $$('.tp-panel-pin').forEach((section,index)=>{
   ScrollTrigger.create({id:`process-${index}`,trigger:section,pin:section,scrub:1,start:section.dataset.start||'top 10%',end:section.dataset.end||'bottom 99%',endTrigger:'.tp-panel-pin-area',pinSpacing:false});
   tsTemplateMotion.pins.push(`process-${index}`);
  });
  if($('.tp-video-area'))gsap.timeline({scrollTrigger:{id:'montage-zoom',trigger:'.tp-video-area',scrub:1,pin:true,start:'top 40px',end:'+=100%'}}).to('.tp-video-thumb-wrap',{scale:3.2,ease:'none'});
  const panels=gsap.utils.toArray('.tp-funfact-panel');
  if(panels.length)gsap.to(panels,{xPercent:-100*(panels.length-1),ease:'none',scrollTrigger:{id:'horizontal-facts',trigger:'.tp-funfact-panel-wrap',start:'top 70px',pin:true,scrub:1,end:()=>'+='+$('.tp-funfact-panel-wrap').offsetWidth}});
 // Original character entrance, directional fades and paragraph line rotation.
  $$('.tp-char-animation').forEach(el=>{const split=new SplitText(el,{type:'chars,words'});splits.push(split);gsap.set(el,{perspective:300});gsap.from(split.chars,{scrollTrigger:{trigger:el,start:'top 90%',end:'bottom 60%',toggleActions:'play none none none'},duration:1,delay:.5,x:100,autoAlpha:0,stagger:.05})});
  $$('.tp_fade_anim').forEach(el=>{const direction=el.dataset.fadeFrom||'bottom',offset=Number(el.dataset.fadeOffset||40);let vars={opacity:0,ease:el.dataset.ease||'power2.out',duration:Number(el.dataset.duration||.75),delay:Number(el.dataset.delay||.15),x:direction==='left'?-offset:direction==='right'?offset:0,y:direction==='top'?-offset:direction==='bottom'?offset:0};if((el.dataset.onScroll||'1')==='1')vars.scrollTrigger={trigger:el,start:'top 85%'};gsap.from(el,vars)});
  $$('.tp_text_anim p').forEach(el=>{const split=new SplitText(el,{type:'lines'});splits.push(split);gsap.set(el,{perspective:400});gsap.from(split.lines,{scrollTrigger:{trigger:el,start:'top 90%',end:'bottom 60%',toggleActions:'play none none none'},duration:1,delay:.2,opacity:0,rotationX:-80,force3D:true,transformOrigin:'top center -50',stagger:.1})});
  $$('.tp_text_invert').forEach(el=>{const split=new SplitText(el,{type:'lines'});splits.push(split);split.lines.forEach(line=>gsap.to(line,{backgroundPositionX:0,ease:'none',scrollTrigger:{trigger:line,scrub:1,start:'top 85%',end:'bottom center'}}))});
   });
  }
  ScrollTrigger.refresh();
 }
 configureMotion();desktopQuery.addEventListener('change',configureMotion);motionQuery.addEventListener('change',configureMotion);
 // Original continuous Swiper marquee. Reduced-motion visitors retain a static strip.
 // Repeating service phrases are decorative, so duplicate the phrase cycle to keep
 // the original continuous loop populated at wide monitor sizes.
 const strip=$('.tp-text-slide-active .swiper-wrapper');strip.innerHTML+=strip.innerHTML;
 const marquee=new Swiper('.tp-text-slide-active',{loop:!reduce,freeMode:true,slidesPerView:'auto',spaceBetween:30,centeredSlides:true,allowTouchMove:false,speed:4000,autoplay:reduce?false:{delay:1,disableOnInteraction:true}});tsTemplateMotion.sliders.push(marquee);
 // Two supplied recommendations: preserve draggable, tilted cards without inventing slides.
 const reviews=new Swiper('.tp-testimonial-slider-active',{slidesPerView:1,loop:false,spaceBetween:18,speed:450,autoHeight:true,centeredSlides:false,grabCursor:true,keyboard:{enabled:true,onlyInViewport:true},navigation:{prevEl:'.ts-review-prev',nextEl:'.ts-review-next'},breakpoints:{768:{slidesPerView:2},1200:{slidesPerView:2,spaceBetween:0,centeredSlides:true,autoHeight:false}},a11y:{enabled:true}});tsTemplateMotion.sliders.push(reviews);
 const syncReducedSliders=()=>{reviews.params.speed=motionQuery.matches?0:450;if(motionQuery.matches){marquee.autoplay?.stop();marquee.setTransition(0)}else marquee.autoplay?.start()};motionQuery.addEventListener('change',syncReducedSliders);syncReducedSliders();
 // Original WebGL displacement hover on project images, with readable image fallback.
 if(!reduce&&matchMedia('(min-width:1200px)').matches&&window.hoverEffect&&location.protocol!=='file:'&&matchMedia('(pointer:fine)').matches){
  $$('.tp--hover-img').forEach(target=>{const img=target.querySelector('img');const setup=()=>{
   if(!img.naturalWidth)return;
   try{let effect=new hoverEffect({parent:target,intensity:Number(target.dataset.intensity||.6),speedIn:Number(target.dataset.speedin||1),speedOut:Number(target.dataset.speedout||1),image1:img.src,image2:img.src,displacementImage:target.dataset.displacement,imagesRatio:img.naturalHeight/img.naturalWidth,hover:false});target.closest('.tp--hover-item').addEventListener('mouseenter',()=>effect.next());target.closest('.tp--hover-item').addEventListener('mouseleave',()=>effect.previous());target.classList.add('ts-webgl-ready')}catch(e){target.classList.remove('ts-webgl-ready')}
   };if(img.complete)setup();else img.addEventListener('load',setup,{once:true});
  });
 }
 function goToSection(hash,smooth=true){
  const target=document.getElementById(hash.slice(1));if(!target)return;
  const animate=smooth&&!motionQuery.matches;
  if(window.tsSmoother)tsSmoother.scrollTo(target,animate,'top 105px');
  else window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+scrollY-88),behavior:animate?'smooth':'instant'});
 }
 $$('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{const hash=a.getAttribute('href');if(!hash||hash==='#'||!document.getElementById(hash.slice(1)))return;event.preventDefault();goToSection(hash);history.replaceState(null,'',hash)}));
 window.addEventListener('hashchange',()=>goToSection(location.hash));
 requestAnimationFrame(()=>requestAnimationFrame(()=>{ScrollTrigger.refresh();if(location.hash)goToSection(location.hash,false)}));
 window.addEventListener('scroll',()=>$('#header-sticky')?.classList.toggle('header-sticky',scrollY>=20),{passive:true});
 ScrollTrigger.refresh();window.tsTemplateMotion.ready=true;
};
if(document.readyState==='complete')document.fonts.ready.then(ready);else window.addEventListener('load',()=>document.fonts.ready.then(ready),{once:true});
})();
