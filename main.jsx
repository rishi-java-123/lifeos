import React,{useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Home,Search,Plus,Bot,UserRound,Folder,Receipt,ShoppingCart,Users,FileText,Pill,Bell,Wallet,CalendarDays,CheckCircle2,Trash2,ChevronRight,MapPin,Package,Clock, X} from 'lucide-react';
import './styles.css';

const seed={
 tasks:[{id:1,title:'Car Insurance Renewal',date:'23 May 2026',done:false},{id:2,title:'Electricity Bill Payment',date:'26 May 2026',done:false},{id:3,title:'Vitamin D Medicine',date:'Today, 8:00 AM',done:true}],
 items:[{id:1,name:'Camera',cat:'Electronics',room:'Study Room'},{id:2,name:'Power Drill Machine',cat:'Tools',room:'Store Room'},{id:3,name:'First Aid Kit',cat:'Medical',room:'Kitchen Cabinet'}],
 bills:[{id:1,name:'Electricity Bill',provider:'Bihar State Power',amount:1250,due:'26 May 2026'},{id:2,name:'Internet Bill',provider:'Airtel Fiber',amount:799,due:'28 May 2026'},{id:3,name:'Mobile Postpaid',provider:'Jio',amount:599,due:'30 May 2026'},{id:4,name:'Netflix Subscription',provider:'Entertainment',amount:649,due:'1 Jun 2026'}],
 expenses:[{id:1,name:'BigBasket',cat:'Groceries',amount:1250},{id:2,name:'Uber',cat:'Transport',amount:320},{id:3,name:'Zomato',cat:'Dining',amount:650}],
 meds:[{id:1,name:'Vitamin D3 60K',dose:'1 Tablet · After Breakfast',time:'8:00 AM',taken:true},{id:2,name:'Omega 3',dose:'1 Capsule · After Lunch',time:'1:00 PM',taken:true},{id:3,name:'Calcium Tablet',dose:'1 Tablet · After Dinner',time:'8:00 PM',taken:false}]
};
function load(){try{return JSON.parse(localStorage.getItem('lifeos')||'null')||seed}catch{return seed}}
function save(d){localStorage.setItem('lifeos',JSON.stringify(d))}
const money=n=>'₹'+Number(n).toLocaleString('en-IN');

function App(){
 const [data,setData]=useState(load),[tab,setTab]=useState('home'),[modal,setModal]=useState(null),[query,setQuery]=useState('');
 useEffect(()=>save(data),[data]);
 useEffect(()=>{const goHome=()=>setTab('home');window.addEventListener('lifeos-home',goHome);return()=>window.removeEventListener('lifeos-home',goHome)},[]);
 const total=useMemo(()=>data.expenses.reduce((s,x)=>s+x.amount,0),[data.expenses]);
 const nav=[['home','Home',Home],['search','Search',Search],['add','',Plus],['assistant','Assistant',Bot],['profile','Profile',UserRound]];
 const toggleTask=id=>setData(d=>({...d,tasks:d.tasks.map(x=>x.id===id?{...x,done:!x.done}:x)}));
 const toggleMed=id=>setData(d=>({...d,meds:d.meds.map(x=>x.id===id?{...x,taken:!x.taken}:x)}));
 const addItem=e=>{e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,items:[...d.items,{id:Date.now(),name:f.get('name'),cat:f.get('cat')||'General',room:f.get('room')||'Home'}]}));setModal(null)};
 const addExpense=e=>{e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,expenses:[...d.expenses,{id:Date.now(),name:f.get('name'),cat:f.get('cat')||'Other',amount:Number(f.get('amount')||0)}]}));setModal(null)};
 const reset=()=>{setData(seed);localStorage.removeItem('lifeos')};
 return <div className="app">
  <header><div className="brand"><span className="flower">✣</span><div><b>LifeOS</b><small>Your Personal Life Assistant</small></div></div><Bell size={22}/></header>
  {tab==='home'&&<HomePage data={data} setTab={setTab} toggleTask={toggleTask} setModal={setModal}/>}
  {tab==='search'&&<SearchPage data={data} query={query} setQuery={setQuery}/>} 
  {tab==='assistant'&&<Assistant data={data}/>} 
  {tab==='profile'&&<Profile reset={reset}/>} 
  {tab==='inventory'&&<Inventory data={data} setData={setData} setModal={setModal} setTab={setTab}/>} 
  {tab==='medicines'&&<Medicines data={data} toggleMed={toggleMed}/>} 
  {tab==='bills'&&<Bills data={data}/>} 
  {tab==='expenses'&&<Expenses data={data} total={total} setModal={setModal}/>} 
  {tab==='reminders'&&<Reminders data={data}/>} 
  {modal==='item'&&<Modal title="Add Home Item" close={()=>setModal(null)}><form onSubmit={addItem}><Input name="name" label="Item name"/><Input name="cat" label="Category"/><Input name="room" label="Room / location"/><button className="primary">Add Item</button></form></Modal>}
  {modal==='expense'&&<Modal title="Add Expense" close={()=>setModal(null)}><form onSubmit={addExpense}><Input name="name" label="Expense"/><Input name="amount" label="Amount" type="number"/><Input name="cat" label="Category"/><button className="primary">Add Expense</button></form></Modal>}
  <nav>{nav.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>id==='add'?setModal('expense'):setTab(id)}><Icon size={21}/>{label&&<span>{label}</span>}</button>)}</nav>
 </div>
}
const Card=({children,onClick,cls=''})=><div className={'card '+cls} onClick={onClick}>{children}</div>;
function HomePage({data,setTab,toggleTask,setModal}){return <main>
 <section className="hello"><div><h1>Good Morning 👋</h1><p>Have a productive day!</p></div><div className="weather">☀️<b>28°C</b><small>Patna</small></div></section>
 <Card cls="ask"><div><b>Ask me anything...</b><small>e.g. Where is my passport?</small></div><button onClick={()=>setTab('assistant')}><Bot size={20}/></button></Card>
 <div className="sectionTitle"><b>Quick Access</b><span>Edit</span></div><div className="quick">{[[Folder,'Documents','docs'],[Pill,'Medicines','medicines'],[Wallet,'Expenses','expenses'],[Bell,'Reminders','reminders'],[Home,'Home Inventory','inventory'],[Receipt,'Bills & Subscriptions','bills'],[ShoppingCart,'Shopping List',''],[Users,'Family','']].map(([I,t,id])=><button key={t} onClick={()=>id&&setTab(id)}><I size={24}/><span>{t}</span></button>)}</div>
 <div className="sectionTitle"><b>Upcoming Reminders</b><span>View all</span></div><Card>{data.tasks.map(x=><div className="row" key={x.id}><CheckCircle2 className={x.done?'ok':''} size={20}/><div><b>{x.title}</b><small>{x.date}</small></div><em>{x.done?'Done':'Upcoming'}</em></div>)}</Card>
 <div className="sectionTitle"><b>Today's Medicines</b><span onClick={()=>setTab('medicines')}>View all</span></div><Card>{data.meds.map(x=><div className="row" key={x.id}><Pill size={20}/><div><b>{x.name}</b><small>{x.dose}</small></div><em className={x.taken?'okText':''}>{x.taken?'Taken':x.time}</em></div>)}</Card>
 </main>}
function Inventory({data,setData,setModal,setTab}){return <main><Top title="Home Inventory" onBack={()=>setTab('home')}/><div className="searchbox"><Search size={18}/><input placeholder="Search items..."/></div><div className="stats"><Stat n={data.items.length} t="Total Items"/><Stat n="8" t="Expiring Soon"/><Stat n="5" t="Low Stock"/></div><div className="sectionTitle"><b>Recently Added</b><span>View all</span></div><Card>{data.items.map(x=><div className="row" key={x.id}><Package size={22}/><div><b>{x.name}</b><small>{x.cat} · {x.room}</small></div><button className="iconBtn" onClick={()=>setData(d=>({...d,items:d.items.filter(i=>i.id!==x.id)}))}><Trash2 size={16}/></button></div>)}</Card><button className="primary wide" onClick={()=>setModal('item')}>＋ Add Item</button></main>}
function Medicines({data,toggleMed}){return <main><Top title="Medicines" onBack={()=>window.dispatchEvent(new Event('lifeos-home'))}/><div className="datebar">Sun　Mon　 <b>Tue</b>　Wed　Thu　Fri　Sat</div><h3>Today's Schedule</h3><Card>{data.meds.map(x=><div className="row" key={x.id}><Pill size={20}/><div><b>{x.name}</b><small>{x.dose}</small></div><button className={x.taken?'pill done':'pill'} onClick={()=>toggleMed(x.id)}>{x.taken?'Taken':'Mark'}</button></div>)}</Card></main>}
function Bills({data}){return <main><Top title="Bills & Subscriptions" onBack={()=>window.dispatchEvent(new Event('lifeos-home'))}/><Card cls="total"><small>Total Due</small><strong>{money(data.bills.reduce((s,x)=>s+x.amount,0))}</strong><span>This Month</span></Card>{data.bills.map(x=><Card key={x.id} cls="bill"><div><b>{x.name}</b><small>{x.provider} · Due {x.due}</small></div><strong>{money(x.amount)}</strong></Card>)}</main>}
function Expenses({data,total,setModal}){return <main><Top title="Expenses" onBack={()=>window.dispatchEvent(new Event('lifeos-home'))}/><Card cls="total"><small>Total Expenses</small><strong>{money(total)}</strong><span>Local data · this device</span></Card><Card><h3>Recent Transactions</h3>{data.expenses.map(x=><div className="row" key={x.id}><Receipt size={20}/><div><b>{x.name}</b><small>{x.cat}</small></div><strong>{money(x.amount)}</strong></div>)}</Card><button className="primary wide" onClick={()=>setModal('expense')}>＋ Add Expense</button></main>}
function Reminders({data}){return <main><Top title="Reminders" onBack={()=>window.dispatchEvent(new Event('lifeos-home'))}/>{data.tasks.map(x=><Card key={x.id} cls="bill"><div><b>{x.title}</b><small>{x.date}</small></div><ChevronRight/></Card>)}</main>}
function Assistant({data}){const [q,setQ]=useState('Where is my passport?');const answer=q.toLowerCase().includes('passport')?'I can search your local LifeOS inventory. In this demo, passport is not stored yet. Add it under Home Inventory or Documents.':q.toLowerCase().includes('expense')?`Your local expenses total ${money(data.expenses.reduce((s,x)=>s+x.amount,0))}.`:'I can help with your tasks, inventory, bills, medicines and expenses stored on this device.';return <main><Top title="AI Assistant" onBack={()=>window.dispatchEvent(new Event('lifeos-home'))}/><div className="chat"><div className="bubble user">{q}</div><div className="bubble">{answer}</div><div className="suggestions"><button onClick={()=>setQ('Where is my passport?')}>Where is my passport?</button><button onClick={()=>setQ('Show my expenses')}>Show my expenses</button><button onClick={()=>setQ('What reminders do I have?')}>Show reminders</button></div></div></main>}
function SearchPage({data,query,setQuery}){const all=[...data.items.map(x=>({name:x.name,sub:`Inventory · ${x.room}`})),...data.bills.map(x=>({name:x.name,sub:`Bill · ${x.provider}`})),...data.meds.map(x=>({name:x.name,sub:`Medicine · ${x.time}`})),...data.tasks.map(x=>({name:x.title,sub:`Reminder · ${x.date}`}))];const r=all.filter(x=>(x.name+' '+x.sub).toLowerCase().includes(query.toLowerCase()));return <main><Top title="Search" onBack={()=>window.dispatchEvent(new Event('lifeos-home'))}/><div className="searchbox"><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search LifeOS..."/></div><Card>{r.map((x,i)=><div className="row" key={i}><Search size={19}/><div><b>{x.name}</b><small>{x.sub}</small></div></div>)}</Card></main>}
function Profile({reset}){return <main><Top title="Profile" onBack={()=>window.dispatchEvent(new Event('lifeos-home'))}/><Card><div className="profile"><div className="avatar">R</div><div><h2>My LifeOS</h2><p>Personal workspace · offline</p></div></div></Card><Card><h3>Data</h3><p>All demo data is saved in your browser using localStorage. No backend or account is required.</p><button className="danger" onClick={reset}>Reset Demo Data</button></Card></main>}
const Top=({title,onBack})=><div className="top"><button onClick={onBack||(()=>window.dispatchEvent(new Event('lifeos-home')))}><span>‹</span></button><h2>{title}</h2></div>;
const Stat=({n,t})=><div className="stat"><strong>{n}</strong><small>{t}</small></div>;
function Modal({title,close,children}){return <div className="overlay"><div className="modal"><button className="close" onClick={close}><X/></button><h2>{title}</h2>{children}</div></div>}
function Input({name,label,type='text'}){return <label className="field"><span>{label}</span><input name={name} type={type} required/></label>}
createRoot(document.getElementById('root')).render(<App/>);
