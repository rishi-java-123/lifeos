import React,{useEffect} from 'react';
import {Sparkles,ArrowRight,LogIn,ShieldCheck,CheckCircle2,Pill,Receipt,Users,Wallet,Bot,HeartHandshake,Bell,BrainCircuit,Folder,CalendarDays,FileText,Home,Play,ChevronRight} from 'lucide-react';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';
import PromoVideo from '../../components/PromoVideo';

const features=[
 ['tasks','Tasks & Reminders',CheckCircle2,'Plan your day, set reminders and never miss what matters.','softGreen'],
 ['bills','Bills & Subscriptions',Receipt,'Track due dates, recurring payments and subscriptions.','softOrange'],
 ['documents','Documents',Folder,'Keep important files organized and easy to find.','softBlue'],
 ['finance','Finance Tracking',Wallet,'Capture expenses quickly and understand your month.','softPurple'],
 ['ai','AI Life Builder',Sparkles,'Describe what you need and create a personal module.','softPink'],
 ['family','Family & Sharing',Users,'Keep important family dates and responsibilities together.','softCyan']
];
export default function LandingPage({go,scrollTarget}){
 useEffect(()=>{if(scrollTarget){setTimeout(()=>document.getElementById(scrollTarget)?.scrollIntoView({behavior:'smooth'}),40)}},[scrollTarget]);
 return <div className="publicPage"><PublicHeader go={go}/><div className="publicShell">
  <section className="hero">
   <div className="heroCopy"><span className="eyebrow"><Sparkles size={15}/> Your life. Your needs. Your own smart space.</span><h1>One place to run <span>your life.</span></h1><p>Life OS brings tasks, bills, documents, money, reminders and personal tools together — with AI that adapts to the way you live.</p><div className="heroButtons"><button className="primary heroCta" onClick={()=>go('register')}>Get Started for Free <ArrowRight size={18}/></button><button className="secondary" onClick={()=>go('demo')}><Play size={17}/> Watch Demo</button></div><div className="trustRow"><span><ShieldCheck size={16}/> Privacy-first design</span><span><CheckCircle2 size={16}/> No card required</span></div></div>
   <div className="heroMock"><div className="mockTop"><div><small>Good morning 👋</small><b>Your day is under control</b></div><span>🔔</span></div><div className="mockAsk"><BrainCircuit size={23}/><div><b>Tell Life OS what you need</b><small>“Create a journal to track mood and gratitude.”</small></div></div><div className="mockGrid"><button onClick={()=>go('feature-ai')}><Sparkles/><span>AI Builder</span></button><button onClick={()=>go('feature-bills')}><Receipt/><span>Bills</span></button><button onClick={()=>go('family-info')}><Users/><span>Family</span></button><button onClick={()=>go('feature-finance')}><Wallet/><span>Expenses</span></button></div><div className="mockReminder"><CheckCircle2/><div><b>Car Insurance Renewal</b><small>Due this week</small></div><em>Upcoming</em></div></div>
  </section>

  <section className="videoShowcase" id="video-demo"><div className="sectionHeading"><span className="eyebrow"><Play size={14}/> See Life OS in action</span><h2>From everyday chaos to one intelligent place.</h2><p>See how Life OS brings your information together, lets AI build around your needs, and keeps what matters accessible.</p></div><PromoVideo/><div className="videoActions"><button className="primary" onClick={()=>go('register')}>Create Your Life OS <ArrowRight size={17}/></button><button className="secondary" onClick={()=>go('demo')}>Try the AI Builder Demo <Sparkles size={16}/></button></div></section>

  <section id="features" className="landingSection"><div className="sectionHeading"><span className="eyebrow">Everything you need</span><h2>All areas of your life, organized beautifully</h2><p>Use quick entry for speed, and AI when you want Life OS to adapt to you.</p></div><div className="featureGrid">{features.map(([id,title,Icon,desc,cls])=><button className="featureCard" key={id} onClick={()=>go(id==='family'?'family-info':'feature-'+id)}><span className={'featureIcon '+cls}><Icon/></span><div><h3>{title}</h3><p>{desc}</p><span className="learnLink">Learn more <ChevronRight size={14}/></span></div></button>)}</div></section>

  <section id="how" className="howSection"><div className="sectionHeading"><span className="eyebrow">Simple in 3 steps</span><h2>How Life OS works</h2><p>You do not need to learn a complicated system. Start small and let it grow with you.</p></div><div className="howGrid"><button onClick={()=>go('register')}><span>1</span><UserRoundIcon/><h3>Create your account</h3><p>Sign up in seconds and start with a clean personal workspace.</p></button><button onClick={()=>go('demo')}><span>2</span><Sparkles/><h3>Add what matters</h3><p>Quick-add known information or ask AI Builder to create something custom.</p></button><button onClick={()=>go('demo')}><span>3</span><Bell/><h3>Stay ahead</h3><p>Life OS surfaces important bills, dates and reminders before they are missed.</p></button></div><div className="howAction"><button className="secondary" onClick={()=>go('demo')}>See interactive demo <ArrowRight size={16}/></button></div></section>

  <section className="benefits"><button onClick={()=>go('family-info')}><HeartHandshake/><h3>For you and your family</h3><p>Track birthdays, relationships and important responsibilities together.</p></button><button onClick={()=>go('feature-tasks')}><Bell/><h3>Never miss important things</h3><p>Keep bills, renewals, tasks and routines visible before they become urgent.</p></button><button onClick={()=>go('feature-ai')}><Bot/><h3>AI that adapts to your life</h3><p>Create a journal, car tracker, home manager or whatever you actually need.</p></button></section>

  <section className="finalCta"><span className="eyebrow">Start small. Add more when you need it.</span><h2>Your life, organized around you.</h2><p>Quick Add + AI Builder, side by side.</p><button className="primary heroCta" onClick={()=>go('register')}>Start free <ArrowRight size={18}/></button></section>
 </div><PublicFooter go={go}/></div>
}
function UserRoundIcon(){return <div className="simpleGlyph">👤</div>}
