import React,{useMemo,useState} from 'react';
import {
  Sparkles,ArrowRight,Play,Plane,Hotel,WalletCards,Luggage,MapPin,
  AlertTriangle,BookOpen,Camera,CheckCircle2,RotateCcw,CalendarDays,
  Clock3,Heart,Route,ReceiptText,CloudSun,NotebookPen,Home
} from 'lucide-react';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../../components/PublicFooter';
import PromoVideo from '../../components/PromoVideo';

const travelPrompt='I am planning a 5-day trip to Goa. Help me manage flights, hotel, places to visit, budget, packing, daily notes and memories.';

const moduleSections=[
  ['Trip overview',CalendarDays,'Dates, travellers and trip status'],
  ['Flights & hotel',Plane,'Bookings, check-in and important times'],
  ['Itinerary',Route,'A flexible day-by-day plan'],
  ['Budget',WalletCards,'Expenses and remaining trip budget'],
  ['Packing',Luggage,'Things to carry before you leave'],
  ['Documents',ReceiptText,'Tickets, IDs and reservations'],
  ['Daily notes',NotebookPen,'Quick memories while you travel'],
  ['Travel journal',BookOpen,'A story Life OS can create after the trip']
];

function StepRail({step}){
  const labels=['Build','Plan','Travel','Journal','My Life'];
  const index={builder:0,module:0,plan:1,travel:2,journal:3,portal:4}[step]??0;
  return <div className="travelStepRail" aria-label="Travel demo progress">
    {labels.map((label,i)=><div className={`travelStep ${i<=index?'active':''}`} key={label}>
      <span>{i<index?'✓':i+1}</span><b>{label}</b>
    </div>)}
  </div>
}

function Builder({idea,setIdea,onBuild}){
  return <section className="travelDemoPanel travelBuilderPanel">
    <div className="travelPanelTitle">
      <span className="travelIcon purple"><Sparkles size={20}/></span>
      <div><small>AI Builder</small><h2>What would you like Life OS to create?</h2></div>
    </div>
    <textarea aria-label="Travel module request" value={idea} onChange={e=>setIdea(e.target.value)}/>
    <div className="travelSuggestionRow">
      <button onClick={()=>setIdea(travelPrompt)}>✈️ Plan a trip</button>
      <button onClick={()=>setIdea('Create a weekend travel planner with a small budget and packing list.')}>🧳 Weekend trip</button>
      <button onClick={()=>setIdea('Create a family vacation planner with bookings, budget, itinerary and shared memories.')}>👪 Family vacation</button>
    </div>
    <button className="primary travelPrimary" onClick={onBuild}><Sparkles size={16}/> Build my travel space</button>
    <p className="travelHint">This demo is local and uses sample information. Nothing is uploaded or sent anywhere.</p>
  </section>
}

function ModuleCreated({onCreate}){
  return <section className="travelDemoPanel">
    <div className="travelSuccess"><CheckCircle2 size={22}/><span>Life OS understood your request</span></div>
    <div className="travelModuleHero">
      <div className="travelModuleEmoji">✈️</div>
      <div><small>AI-created module</small><h2>Goa Travel Space</h2><p>5 days · Sep 12–16 · Personal travel workspace</p></div>
      <span className="travelStatus">Ready</span>
    </div>
    <div className="travelModuleGrid">
      {moduleSections.map(([name,Icon,desc])=><article key={name}>
        <span><Icon size={18}/></span><div><b>{name}</b><small>{desc}</small></div>
      </article>)}
    </div>
    <div className="travelAiNote"><Sparkles size={18}/><div><b>I also connected the pieces.</b><p>Flight times can affect your itinerary, expenses update your budget, and notes can later become your travel journal.</p></div></div>
    <button className="primary travelPrimary" onClick={onCreate}>Create My Travel Space <ArrowRight size={16}/></button>
  </section>
}

function PlanTrip({onStart}){
  const packing=[['Photo ID',true],['Phone charger',true],['Sunglasses',true],['Beachwear',true],['Power bank',false],['Medicines',false]];
  return <section className="travelDemoPanel">
    <div className="travelDashboardHead">
      <div><small>My Life / Travel</small><h2>✈️ Goa Trip</h2><p>Sep 12–16 · 5 days</p></div>
      <span className="travelStatus blue">Upcoming</span>
    </div>
    <div className="travelInsight"><Sparkles size={18}/><div><b>Your flight is tomorrow at 8:20 AM.</b><p>Two packing items are still unchecked. Leave by 5:45 AM to allow enough airport time.</p></div></div>

    <div className="travelPlanGrid">
      <article className="travelMiniCard"><Plane size={19}/><small>Flight</small><b>PNQ → GOI</b><span>Sep 12 · 8:20 AM</span></article>
      <article className="travelMiniCard"><Hotel size={19}/><small>Hotel</small><b>Casa Sol, Anjuna</b><span>Check-in · 2:00 PM</span></article>
      <article className="travelMiniCard"><WalletCards size={19}/><small>Budget</small><b>₹35,000</b><span>₹8,400 planned</span></article>
      <article className="travelMiniCard"><CloudSun size={19}/><small>Weather</small><b>29°C</b><span>Warm · light showers</span></article>
    </div>

    <div className="travelTwoCol">
      <div className="travelListCard"><div className="travelCardHeading"><b>Day 1 plan</b><span>Sep 12</span></div>
        <p><Clock3 size={15}/> 10:10 AM · Arrive in Goa</p>
        <p><Hotel size={15}/> 2:00 PM · Hotel check-in</p>
        <p><MapPin size={15}/> 5:30 PM · Anjuna Beach sunset</p>
        <p><Heart size={15}/> 8:00 PM · Dinner near the beach</p>
      </div>
      <div className="travelListCard"><div className="travelCardHeading"><b>Packing</b><span>4/6 ready</span></div>
        {packing.map(([x,done])=><p key={x} className={done?'done':''}><CheckCircle2 size={15}/>{x}</p>)}
      </div>
    </div>
    <button className="primary travelPrimary" onClick={onStart}>Start the trip <Plane size={16}/></button>
  </section>
}

function DuringTrip({onComplete}){
  const [fixed,setFixed]=useState(false);
  const [noteAdded,setNoteAdded]=useState(false);
  const [expenseAdded,setExpenseAdded]=useState(false);
  return <section className="travelDemoPanel">
    <div className="travelDashboardHead">
      <div><small>Day 1 · Goa</small><h2>Your trip is live</h2><p>Life OS keeps the plan flexible while you enjoy the day.</p></div>
      <span className="travelStatus green">In progress</span>
    </div>

    <div className={`travelComplication ${fixed?'resolved':''}`}>
      {fixed?<CheckCircle2 size={21}/>:<AlertTriangle size={21}/>}
      <div><b>{fixed?'Itinerary updated':'Flight delayed by 2 hours'}</b>
        <p>{fixed?'Hotel check-in stays the same. Anjuna sunset moved to tomorrow morning and today becomes a relaxed Panjim evening.':'Your arrival now overlaps with the original beach plan. Life OS can reorganize Day 1 without losing anything.'}</p>
      </div>
      {!fixed&&<button onClick={()=>setFixed(true)}><Sparkles size={15}/> Fix with AI</button>}
    </div>

    <div className="travelNowGrid">
      <article>
        <span className="travelIcon orange"><ReceiptText size={18}/></span>
        <small>Quick expense</small><h3>{expenseAdded?'₹1,200 · Dinner':'Add dinner expense'}</h3>
        <p>{expenseAdded?'Food · Day 1 · budget updated':'Keep the budget current in seconds.'}</p>
        <button disabled={expenseAdded} onClick={()=>setExpenseAdded(true)}>{expenseAdded?'Added ✓':'Add ₹1,200'}</button>
      </article>
      <article>
        <span className="travelIcon pink"><Camera size={18}/></span>
        <small>Capture a memory</small><h3>{noteAdded?'Amazing sunset at Anjuna':'Save a travel moment'}</h3>
        <p>{noteAdded?'😊 Great · ⭐ Trip highlight · Anjuna Beach':'A quick note can become part of your journal later.'}</p>
        <button disabled={noteAdded} onClick={()=>setNoteAdded(true)}>{noteAdded?'Saved ✓':'Add sample note'}</button>
      </article>
    </div>

    {(noteAdded||expenseAdded)&&<div className="travelAiNote"><Sparkles size={18}/><div><b>Life OS connected your new information.</b><p>{expenseAdded?'Your remaining trip budget is now ₹25,400. ':''}{noteAdded?'Your Anjuna note is marked as a trip highlight and will be available for your journal.':''}</p></div></div>}
    <button className="primary travelPrimary" onClick={onComplete}>Finish sample trip <ArrowRight size={16}/></button>
  </section>
}

function Journal({onAdd}){
  return <section className="travelDemoPanel">
    <div className="travelSuccess"><Sparkles size={22}/><span>Your Goa trip is complete. Life OS turned the experience into something you can keep.</span></div>
    <div className="journalCover">
      <div className="journalCoverIcon">📔</div>
      <small>Travel Journal</small><h2>Goa · September</h2><p>5 days · 8 places · 12 memories</p>
    </div>
    <div className="journalStory">
      <article><span>DAY 1</span><h3>Arrival, a delay and an unexpected evening</h3><p>The flight arrived late, so the beach plan moved. The slower evening in Panjim became a surprisingly good start to the trip.</p></article>
      <article><span>DAY 2</span><h3>Beach morning & Anjuna sunset</h3><p>Warm weather, good food and an amazing sunset at Anjuna — saved as one of the trip highlights.</p></article>
      <article><span>TRIP SNAPSHOT</span><h3>₹28,600 spent · ₹6,400 under budget</h3><p>Favourite memory: Anjuna sunset · Places to revisit: 3 · Notes captured: 12</p></article>
    </div>
    <div className="travelAiNote"><BookOpen size={18}/><div><b>Your journal remains connected to the original trip.</b><p>Bookings, notes, expenses and memories can stay together without the user copying the same information into another app.</p></div></div>
    <button className="primary travelPrimary" onClick={onAdd}>Add journal to My Life <ArrowRight size={16}/></button>
  </section>
}

function Portal({onRestart,go}){
  return <section className="travelDemoPanel portalDemo">
    <div className="travelDashboardHead">
      <div><small>My Life</small><h2>Your portal evolved with your life.</h2><p>The module you created, the trip you managed and the journal you kept now live together.</p></div>
    </div>
    <div className="portalModuleGrid">
      <article><span>💰</span><div><b>Money</b><small>Monthly overview</small></div></article>
      <article><span>🧾</span><div><b>Bills</b><small>3 upcoming</small></div></article>
      <article><span>📄</span><div><b>Documents</b><small>18 saved</small></div></article>
      <article className="newModule"><span>✈️</span><div><b>Goa Trip</b><small>Completed · Sep 12–16</small></div><em>Created by you</em></article>
      <article className="newModule journal"><span>📔</span><div><b>Goa Travel Journal</b><small>12 memories · New</small></div><em>Added after trip</em></article>
      <article><span>＋</span><div><b>Create anything</b><small>Tell AI what you need</small></div></article>
    </div>
    <div className="portalMessage"><Sparkles size={21}/><div><b>Your life changes. Your Life OS changes with you.</b><p>Create what you need. Manage what matters. Keep what you want to remember.</p></div></div>
    <div className="travelFinalActions">
      <button className="secondary" onClick={onRestart}><RotateCcw size={15}/> Restart demo</button>
      <button className="primary" onClick={()=>go('register')}>Create your Life OS <ArrowRight size={15}/></button>
    </div>
  </section>
}

export default function DemoPage({go}){
  const [idea,setIdea]=useState(travelPrompt);
  const [step,setStep]=useState('builder');

  const restart=()=>{setIdea(travelPrompt);setStep('builder')};
  const title=useMemo(()=>({
    builder:['Create something your life actually needs.','This sample shows how a user can create a travel portal and keep using the same module before, during and after a trip.'],
    module:['AI created a travel space from one sentence.','No separate travel app, spreadsheet, notes app and budget sheet are required for this sample.'],
    plan:['Before travel: everything in one place.','Bookings, packing, budget and itinerary stay connected.'],
    travel:['During travel: adapt without losing the fun.','Life OS can help with complications while making it easy to capture expenses and memories.'],
    journal:['After travel: turn activity into a memory.','The same information becomes a meaningful travel journal instead of disappearing after the trip.'],
    portal:['And it becomes part of your Life OS.','The user-created module and journal now appear beside the rest of the user’s everyday life.']
  }[step]),[step]);

  return <div className="publicPage">
    <PublicHeader go={go}/>
    <main className="infoPage travelDemoPage">
      <section className="infoHero travelInfoHero">
        <span className="eyebrow"><Sparkles size={15}/> End-to-end AI Builder experience</span>
        <h1>{title[0]}</h1>
        <p>{title[1]}</p>
      </section>

      <StepRail step={step}/>

      {step==='builder'&&<Builder idea={idea} setIdea={setIdea} onBuild={()=>setStep('module')}/>}
      {step==='module'&&<ModuleCreated onCreate={()=>setStep('plan')}/>}
      {step==='plan'&&<PlanTrip onStart={()=>setStep('travel')}/>}
      {step==='travel'&&<DuringTrip onComplete={()=>setStep('journal')}/>}
      {step==='journal'&&<Journal onAdd={()=>setStep('portal')}/>}
      {step==='portal'&&<Portal onRestart={restart} go={go}/>}

      <section className="demoVideoSection travelVideoFooter">
        <div className="demoVideoHeading"><Play size={18}/><div><b>Life OS product overview</b><small>See the broader product idea after trying the interactive story.</small></div></div>
        <PromoVideo/>
      </section>
    </main>
    <PublicFooter go={go}/>
  </div>
}
