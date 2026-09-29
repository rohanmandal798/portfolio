import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function usePageMotion(reduced: boolean | null){
 useEffect(()=>{
  if(reduced) return;
  const context=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>('.section-heading, .about-layout, .contact-layout > div:first-child').forEach(el=>{
    gsap.from(el,{y:28,opacity:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
   });
   gsap.utils.toArray<HTMLElement>('.stats, .skill-list, .pillar-grid, .career-timeline, .cert-grid').forEach(el=>{
    gsap.from(el.children,{y:18,opacity:0,stagger:.075,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
   });
  });
  const refresh=()=>ScrollTrigger.refresh();
  document.fonts.ready.then(refresh);
  return()=>context.revert();
 },[reduced]);
}

