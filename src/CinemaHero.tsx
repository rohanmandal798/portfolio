import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import {profile} from './content';
gsap.registerPlugin(ScrollTrigger);
const chapters=[
 {title:['CLOUD & DEVOPS','ENGINEER.'],label:'BUILDING THE FOUNDATION',description:'Learning cloud infrastructure, Linux administration and automation through practical, documented work.'},
 {title:['SYSTEM & NETWORK','ADMINISTRATOR.'],label:'INFRASTRUCTURE IN PRACTICE',description:'Supporting systems, networks and users with reliable troubleshooting and administration.'},
 {title:['CYBERSECURITY','GRADUATE.'],label:'SECURITY FIRST',description:'Applying foundations in penetration testing, secure networks and vulnerability assessment with a practical, ethical mindset.'},
];
export function Hero(){
 const root=useRef<HTMLElement>(null);
 const [chapter,setChapter]=useState(0);const [ready,setReady]=useState(false);const [failed,setFailed]=useState(false);const [progress,setProgress]=useState(0);const [intro,setIntro]=useState(true);
 useEffect(()=>{
  let cancelled=false;let exitTimer:ReturnType<typeof setTimeout>;
  const urls=[profile.portrait];
  let settled=0;const done=()=>{settled++;if(!cancelled)setProgress(Math.round(settled/(urls.length+1)*100));};
  const resources=urls.map(async src=>{
   const img=new Image();img.src=src;
   try{await img.decode();if(!cancelled&&src===profile.portrait)setReady(true);return true;}
   catch{if(!cancelled&&src===profile.portrait)setFailed(true);return false;}
   finally{done();}
  });
  resources.push(document.fonts.ready.then(()=>true,()=>false).finally(done));
  Promise.all(resources).then(()=>{if(cancelled)return;exitTimer=setTimeout(()=>setIntro(false),200);});
  const timeout=setTimeout(()=>{if(!cancelled)setIntro(false);},10000);
  return()=>{cancelled=true;clearTimeout(timeout);clearTimeout(exitTimer);};
 },[]);
 useEffect(()=>{
  if(intro)return;
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   // One trigger drives pinning, text, and progress while the portrait remains fixed.
   const trigger=ScrollTrigger.create({trigger:root.current,start:'top top',end:()=>`+=${Math.max(1800,innerHeight*3)}`,pin:true,anticipatePin:1,invalidateOnRefresh:true,
    onUpdate:self=>{setChapter(Math.min(2,Math.floor(self.progress*3)));root.current?.style.setProperty('--chapter-progress',String(self.progress));},
   });
   return()=>trigger.kill();
  });
  return()=>mm.revert();
 },[intro]);
 return <>
 {intro&&<div className="cinema-loader" role="status" aria-label={`Loading experience, ${progress} percent`}><div className="loader-top"><span>INITIALIZING EXPERIENCE</span><span>PORTFOLIO / 2026</span></div><div className="loader-center"><strong>ROHAN.</strong><span>SECURITY MINDED. READY TO EXPLORE.</span><b>{progress}<small>%</small></b></div><div className="loader-bottom"><div className="loader-track"><i style={{transform:`scaleX(${progress/100})`}}/></div><span>{failed?'CONTINUING WITHOUT PORTRAIT':'LOADING VISUALS & TYPOGRAPHY'}</span></div></div>}
 <section id="home" className="cinema-hero" ref={root} aria-label="Introduction">
  <div className="cinema-spotlight" aria-hidden="true"/>
  <div className={`cinema-portrait ${ready?'is-ready':''}`}><img src={profile.portrait} width={1080} height={1470} alt="Studio-style portrait of Rohan Mandal in a white T-shirt" fetchPriority="high" onLoad={()=>setReady(true)} onError={()=>setFailed(true)}/></div>
  {failed&&<p className="cinema-image-error">Portrait unavailable.<br/>Explore the work below.</p>}
  <div className="cinema-title"><p className="cinema-kicker">HI, I'M <span>ROHAN.</span></p><h1 className="cinema-heading" aria-label="Aspiring Cloud and DevOps engineer, System and Network Administrator, cybersecurity graduate"><span key={chapter} aria-hidden="true">{chapters[chapter].title.map(line=><span key={line}>{line}</span>)}</span></h1></div>
  <div className="cinema-description" key={'description-'+chapter}><span>{chapters[chapter].label}</span><p>{chapters[chapter].description}</p></div>
  <a className="cinema-scroll" href="#about"><ArrowDown size={14}/><span>SCROLL TO KNOW THE STORY</span></a>
  <div className="cinema-actions"><a className="button cinema-primary" href="#projects">View my work <ArrowUpRight size={15}/></a><a className="button cinema-secondary" href="#contact">Let's connect <ArrowUpRight size={15}/></a></div>
  <div className="cinema-chapters" aria-hidden="true">{chapters.map((_,i)=><span className={chapter===i?'current':''} key={i}>0{i+1}</span>)}</div>
  <div className="cinema-progress" aria-hidden="true"><i/></div>
 </section></>;
}
