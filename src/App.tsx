import React, {useEffect, useRef, useState} from 'react';
import {ArrowRight, ArrowUpRight, Check, Menu, Pause, Play, X} from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {motion, useReducedMotion} from 'motion/react';
import {Hero} from './CinemaHero';
import {certifications, experiences, pillars, profile, projects, skillGroups} from './content';
import './style.css';
import './refinements.css';
import './cinema.css';
import {usePageMotion} from './usePageMotion';

const navItems=[
 ['About','about'],['Skills','skills'],['Experience','experience'],['Projects','projects'],['Certs','certifications'],['Contact','contact'],
] as const;

export default function App(){
 const [marqueePaused,setMarqueePaused]=useState(false);
 const [menu,setMenu]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const [selected,setSelected]=useState<number|null>(null);
 const [status,setStatus]=useState('');
 const [active,setActive]=useState('');
 const form=useRef<HTMLFormElement>(null);
 const lenisRef=useRef<Lenis|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const menuButton=useRef<HTMLButtonElement>(null);
 const menuPanel=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 usePageMotion(reduced);

 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id);}),{rootMargin:'-20% 0px -65% 0px'});
  document.querySelectorAll('main > section[id]').forEach(el=>observer.observe(el));
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{if(menu||selected!==null)lenisRef.current?.stop();else lenisRef.current?.start();},[menu,selected]);
 useEffect(()=>{
  const navigate=(event:MouseEvent)=>{
   if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const link=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');if(!link)return;
   const hash=link.getAttribute('href')!;const target=document.getElementById(hash.slice(1));if(!target)return;
   event.preventDefault();setMenu(false);history.pushState(null,'',hash);
   requestAnimationFrame(()=>{
    ScrollTrigger.refresh();
    const top=hash==='#home'||hash==='#main'?0:target.getBoundingClientRect().top+window.scrollY-85;
    lenisRef.current?.resize();lenisRef.current?.start();lenisRef.current?.scrollTo(top,{force:true,immediate:true});
    window.scrollTo({top,behavior:'instant'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
   });
  };
  document.addEventListener('click',navigate);return()=>document.removeEventListener('click',navigate);
 },[]);
 useEffect(()=>{
  const update=()=>setScrolled(window.scrollY>30);update();addEventListener('scroll',update,{passive:true});
  if(reduced)return()=>removeEventListener('scroll',update);
  const lenis=new Lenis({anchors:false,duration:1.05});lenisRef.current=lenis;lenis.on('scroll',ScrollTrigger.update);
  const tick=(time:number)=>lenis.raf(time*1000);gsap.ticker.add(tick);
  return()=>{lenisRef.current=null;lenis.destroy();gsap.ticker.remove(tick);removeEventListener('scroll',update);};
 },[reduced]);
 useEffect(()=>{
  if(!menu)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';menuPanel.current?.querySelector('a')?.focus();
  const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenu(false);menuButton.current?.focus();}};
  document.addEventListener('keydown',key);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key);};
 },[menu]);
 useEffect(()=>{if(selected!==null)dialog.current?.showModal();},[selected]);

 function brief(){
  const data=new FormData(form.current!);
  return `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nSubject: ${data.get('subject')}\n\n${data.get('message')}`;
 }
 async function copyBrief(){
  if(!form.current?.reportValidity())return;
  try{await navigator.clipboard.writeText(brief());setStatus('Message copied. You can paste it into your preferred email service.');}
  catch{setStatus('Copy is unavailable in this browser. You can email Rohan directly using the address shown.');}
 }
 function contact(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();const data=new FormData(event.currentTarget);
  location.href=`mailto:${profile.email}?subject=${encodeURIComponent(String(data.get('subject')))}&body=${encodeURIComponent(brief())}`;
  setStatus('Your email app will open with this message. Send it there to contact Rohan.');
 }

 return <>
  <a className="skip" href="#main">Skip to content</a>
  <header className={scrolled?'site-header scrolled':'site-header'}>
   <a className="logo" href="#home" aria-label="Rohan home">Rohan<span className="brand-dot" aria-hidden="true">.</span></a>
   <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label,id])=><a key={id} aria-current={active===id?'location':undefined} href={'#'+id}>{label}</a>)}</nav>
   <a className="nav-cta" href="#contact">Let's connect <ArrowUpRight size={16}/></a>
   <button className="menu-toggle" ref={menuButton} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu?'Close menu':'Open menu'} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  </header>
  {menu&&<div id="mobile-menu" className="mobile-menu" ref={menuPanel} role="dialog" aria-modal="true" aria-label="Navigation">{navItems.map(([label,id],index)=><a key={id} href={'#'+id} onClick={()=>{setMenu(false);menuButton.current?.focus();}}><small>{String(index+1).padStart(2,'0')}</small>{label}<ArrowUpRight/></a>)}<span>SECURITY MINDED. ALWAYS LEARNING.</span></div>}

  <main id="main" inert={menu}>
   <Hero/>

   <section className="about section" id="about">
    <div className="section-marker"><span>01 / PROFILE</span><span>CLOUD · SYSTEMS · SECURITY</span></div>
    <div className="about-layout"><div className="side-note"><span className="asterisk">✳</span><p>Security conscious.<br/>Delivery focused.</p></div><div><h2>Infrastructure built<br/><em>to be dependable.</em></h2><p className="large-copy">I’m a System &amp; Network Administrator Intern at LD Cloud and a BSc (Hons) Ethical Hacking &amp; Cybersecurity graduate from Coventry University, United Kingdom.</p><p className="muted about-copy">My work spans Ubuntu servers, Nginx virtual hosting, Docker deployments, Jenkins pipelines, Zabbix monitoring and infrastructure troubleshooting. My degree developed foundations in penetration testing, secure networks and vulnerability assessment—skills I apply with a security-aware, documentation-first mindset.</p><div className="profile-meta"><span>{profile.location}</span><span>BSc (Hons) completed · Aug 2026</span><span>Open to DevOps &amp; cloud opportunities</span></div></div></div>
    <div className="about-details"><div><h3>What I can help with</h3><ul className="about-services"><li>AWS infrastructure setup and basic administration</li><li>Linux server setup, configuration, and troubleshooting</li><li>Docker and Docker Compose</li><li>CI/CD pipelines with GitHub Actions and Jenkins</li><li>Nginx and reverse proxy configuration</li><li>Git and GitHub workflows</li><li>Basic Kubernetes and container orchestration</li><li>Terraform infrastructure automation</li><li>Server monitoring with Prometheus, Grafana, and Zabbix</li><li>DNS, networking, and basic server security</li><li>Application deployment and troubleshooting</li></ul></div><div className="about-approach"><h3>My approach</h3><p>I focus on understanding the problem first, then implementing a simple, reliable, and maintainable solution. I’m comfortable following documentation, troubleshooting issues, learning unfamiliar technologies, and communicating clearly throughout the work.</p><p>If you need help with a small DevOps task, Linux server, AWS setup, Docker deployment, CI/CD pipeline, or infrastructure troubleshooting, I’d be happy to discuss your requirements.</p><p>I’m especially interested in building long-term working relationships with clients while continuing to grow my practical DevOps and cloud engineering experience.</p><a className="text-link" href="#contact">Discuss your requirements <ArrowUpRight size={18}/></a></div></div>
    <div className="pillar-grid">{pillars.map(([title,description],index)=><article key={title}><small>0{index+1}</small><h3>{title}</h3><p>{description}</p></article>)}</div>
    <div className="stats">{[['AWS','CLOUD & HOSTING'],['LINUX','SYSTEMS OPERATIONS'],['DOCKER','CONTAINER DELIVERY'],['ZABBIX','MONITORING & SECURITY']].map(([number,label])=><div key={label}><strong>{number}</strong><span>{label}</span></div>)}</div>
   </section>

   <div className="marquee" data-paused={marqueePaused} aria-label="AWS, Linux, networking, cybersecurity, Docker and DevOps"><div aria-hidden="true">{[0,1].map(n=><span key={n}>AWS CLOUD <b>✳</b> LINUX ADMINISTRATION <b>✳</b> NETWORKING <b>✳</b> CYBERSECURITY <b>✳</b> DEVOPS <b>✳</b> AUTOMATION <b>✳</b> </span>)}</div><button className="marquee-pause" aria-label={marqueePaused?'Play scrolling text':'Pause scrolling text'} aria-pressed={marqueePaused} onClick={()=>setMarqueePaused(!marqueePaused)}>{marqueePaused?<Play size={13}/>:<Pause size={13}/>}</button></div>

   <section className="skills section" id="skills">
    <div className="section-marker"><span>02 / TECHNICAL SKILLS</span><span>THE INFRASTRUCTURE TOOLKIT</span></div>
    <div className="section-heading"><h2>Practical skills.<br/><em>Focused path.</em></h2><p>Cloud, systems, networking and security—<br/>connected by a DevOps mindset.</p></div>
    <div className="skill-list">{skillGroups.map(([title,...items],i)=><div className="skill-row" key={title}><div><small>0{i+1}</small><h3>{title}</h3></div><p>{items.map(item=><span key={item}>{item}</span>)}</p></div>)}</div>
   </section>

   <section className="section experience-section" id="experience">
    <div className="section-marker"><span>03 / EXPERIENCE</span><span>LEARNING THROUGH PRACTICE</span></div>
    <div className="section-heading"><h2>Systems in practice.<br/><em>Security in mind.</em></h2><p>Hands-on work across administration,<br/>networking and cybersecurity.</p></div>
    <div className="career-timeline">{experiences.map((item,index)=><article className="career-card" key={item.role}><div className="career-index">0{index+1}</div><div className="career-main"><div className="career-heading"><div><h3>{item.role}{item.current&&<span>Current</span>}</h3>{item.company&&<p>{item.company}</p>}</div><p>{item.period}<br/>{item.location}</p></div><ul>{item.points.map(point=><li key={point}>{point}</li>)}</ul><div className="career-tech">{item.tech.map(tech=><span key={tech}>{tech}</span>)}</div></div></article>)}</div>
   </section>

   <section className="section work" id="projects">
    <div className="section-marker"><span>04 / FEATURED PROJECTS</span><span>BUILT TO LEARN. BUILT TO WORK.</span></div>
    <div className="section-heading"><h2>Hands-on.<br/><em>Purpose driven.</em></h2><p>Practical labs and tools across<br/>security, cloud and networking.</p></div>
    <div className="project-grid">{projects.map((project,index)=><motion.button whileHover={reduced?{}:{y:-5}} className={'project project-'+project.theme} key={project.title} onClick={()=>setSelected(index)} aria-label={'Read about '+project.title}><div className={'project-art '+project.theme}><div className="art-top"><span>{project.category}</span><ArrowUpRight size={22}/></div><span className="project-symbol" aria-hidden="true">{project.icon}</span><div className="infrastructure-lines" aria-hidden="true"><i/><i/><i/><i/></div><strong className="project-headline">{project.headline}</strong><span className="view-pill">EXPLORE PROJECT <ArrowUpRight size={14}/></span></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.category.replace(' × ',' / ')}</p></div><span className="project-number">/{project.year}</span></div><p className="project-summary">{project.description}</p><div className="project-stack">{project.tech.map(tech=><span key={tech}>{tech}</span>)}</div><span className="project-read">View project <ArrowUpRight size={16}/></span></motion.button>)}</div>
   </section>

   <section className="section certifications-section" id="certifications">
    <div className="section-marker"><span>05 / CREDENTIALS</span><span>CONTINUOUS PROFESSIONAL DEVELOPMENT</span></div>
    <div className="section-heading"><h2>Learning, applied.<br/><em>Skills validated.</em></h2><p>Training and practical simulations across<br/>cloud infrastructure and cybersecurity.</p></div>
    <div className="cert-grid">{certifications.map((cert,index)=><article className="cert-card" key={cert.name}><div className="cert-top"><small>0{index+1}</small><span>{cert.mark}</span></div><h3>{cert.name}</h3><p>{cert.issuer}</p><strong>{cert.status}</strong></article>)}</div>
   </section>

   <section className="contact section" id="contact">
    <div className="section-marker"><span>06 / GET IN TOUCH</span><span>OPEN TO OPPORTUNITIES</span></div>
    <div className="contact-layout"><div><h2>Let’s discuss<br/><em>the work.</em></h2><p>Whether you need help with a small DevOps task, a Linux server, AWS setup, Docker deployment, CI/CD pipeline, or infrastructure troubleshooting, I’d be glad to discuss your requirements.</p><a className="contact-email" href={'mailto:'+profile.email}>{profile.email}<ArrowUpRight size={18}/></a><div className="socials"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={16}/></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={16}/></a></div></div><form ref={form} onSubmit={contact}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Alex Smith" required maxLength={100}/></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="alex@example.com" required maxLength={254}/></label></div><label>Subject<input name="subject" placeholder="Project, role, or collaboration" required maxLength={150}/></label><label>Your message<textarea name="message" placeholder="Tell Rohan about your requirements…" required rows={4} maxLength={5000}/></label><div className="form-actions"><button className="button dark" type="submit">Send message<ArrowUpRight size={17}/></button><button className="copy-brief" type="button" onClick={copyBrief}>Copy message</button></div><p className="form-note" role="status">{status||'Opens your email app with the completed message.'}</p></form></div>
   </section>

   <section className="final-cta"><span className="eyebrow">SECURITY MINDED · ALWAYS LEARNING · BUILDING PRACTICALLY</span><a href="#contact">Open to<br/><em>opportunities.</em><ArrowUpRight aria-hidden="true"/></a><a className="button dark final-button" href="#contact">Connect with Rohan <ArrowUpRight size={17}/></a></section>
  </main>

  <footer inert={menu}><a className="logo" href="#home">Rohan<span className="brand-dot" aria-hidden="true">.</span></a><p>{profile.role}<br/>Aspiring Cloud &amp; DevOps Engineer · {profile.location}</p><div className="footer-socials"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12}/></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12}/></a></div><span>© 2026 ROHAN MANDAL</span><a href="#home">BACK TO TOP ↑</a></footer>

  <dialog ref={dialog} className="project-dialog" data-lenis-prevent onCancel={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget){dialog.current?.close();setSelected(null);}}} aria-labelledby="project-title">{selected!==null&&<><button className="dialog-close" aria-label="Close project" onClick={()=>{dialog.current?.close();setSelected(null);}}><X/></button><div className="eyebrow">{projects[selected].category}</div><h2 id="project-title">{projects[selected].title}</h2><p>{projects[selected].description}</p><ul className="dialog-outcomes">{projects[selected].outcomes.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul><div className="dialog-tech">{projects[selected].tech.map(tech=><span key={tech}>{tech}</span>)}</div><a className="text-link" href={projects[selected].url} target="_blank" rel="noreferrer">View on GitHub <ArrowRight/></a></>}</dialog>
 </>;
}
