import { useEffect, useRef } from 'react';
export function Cursor(){
 const dot=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches)return;
  const el=dot.current!;
  const move=(e:PointerEvent)=>{el.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;el.style.opacity='1';};
  const over=(e:PointerEvent)=>{const target=e.target as HTMLElement;const active=Boolean(target.closest('a,button'));el.classList.toggle('active',active);el.textContent=target.closest('.project')?'VIEW':'';};
  const leave=()=>{el.style.opacity='0';};
  document.addEventListener('pointermove',move);document.addEventListener('pointerover',over);document.addEventListener('pointerleave',leave);
  return()=>{document.removeEventListener('pointermove',move);document.removeEventListener('pointerover',over);document.removeEventListener('pointerleave',leave);};
 },[]);
 return <div className="custom-cursor" ref={dot} aria-hidden="true"/>;
}

