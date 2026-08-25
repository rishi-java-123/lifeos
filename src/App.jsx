import React,{useEffect,useMemo,useState} from 'react';
import {Home,Search,Plus,Bot,UserRound,Bell} from 'lucide-react';
import PublicSite from './pages/public/PublicSite';
import HomeDashboard from './pages/app/HomeDashboard';
import {Inventory,Medicines,Bills,Expenses,Family,Reminders,Documents,Shopping} from './pages/app/Modules';
import {Assistant,SearchPage,Profile} from './pages/app/UtilityPages';
import {Modal,Input} from './components/Common';
import {seed} from './data/seed';
import {loadData,saveData} from './utils/storage';

export default function App(){
 const [data,setData]=useState(loadData),[tab,setTab]=useState('home'),[modal,setModal]=useState(null),[query,setQuery]=useState('');
 const [screen,setScreen]=useState(()=>localStorage.getItem('lifeos_session')?'app':'landing');
 useEffect(()=>saveData(data),[data]);
 useEffect(()=>{const goHome=()=>setTab('home');window.addEventListener('lifeos-home',goHome);return()=>window.removeEventListener('lifeos-home',goHome)},[]);
 const total=useMemo(()=>data.expenses.reduce((s,x)=>s+x.amount,0),[data.expenses]);
 const nav=[['home','Home',Home],['search','Search',Search],['add','',Plus],['assistant','Assistant',Bot],['profile','Profile',UserRound]];
 const toggleMed=id=>setData(d=>({...d,meds:d.meds.map(x=>x.id===id?{...x,taken:!x.taken}:x)}));
 const addItem=e=>{e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,items:[...d.items,{id:Date.now(),name:f.get('name'),cat:f.get('cat')||'General',room:f.get('room')||'Home'}]}));setModal(null)};
 const addExpense=e=>{e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,expenses:[...d.expenses,{id:Date.now(),name:f.get('name'),cat:f.get('cat')||'Other',amount:Number(f.get('amount')||0)}]}));setModal(null)};
 const addFamily=e=>{e.preventDefault();const f=new FormData(e.currentTarget);setData(d=>({...d,family:[...(d.family||[]),{id:Date.now(),name:f.get('name'),relationship:f.get('relationship'),dob:f.get('dob')||'',phone:f.get('phone')||''}]}));setModal(null)};
 const reset=()=>{setData(seed);localStorage.removeItem('lifeos')};
 const signOut=()=>{localStorage.removeItem('lifeos_session');setScreen('landing');setTab('home')};
 if(screen!=='app') return <PublicSite screen={screen} setScreen={setScreen} onAuthenticated={()=>setScreen('app')}/>;
 const pages={home:<HomeDashboard data={data} setTab={setTab}/>,search:<SearchPage data={data} query={query} setQuery={setQuery}/>,assistant:<Assistant data={data}/>,profile:<Profile reset={reset} signOut={signOut}/>,inventory:<Inventory data={data} setData={setData} setModal={setModal} setTab={setTab}/>,medicines:<Medicines data={data} toggleMed={toggleMed}/>,bills:<Bills data={data}/>,expenses:<Expenses data={data} total={total} setModal={setModal}/>,family:<Family data={data} setData={setData} setModal={setModal}/>,reminders:<Reminders data={data}/>,documents:<Documents/>,shopping:<Shopping/>};
 return <div className="app">
  <header><div className="brand"><span className="flower">✣</span><div><b>LifeOS</b><small>Your Personal Life Assistant</small></div></div><Bell size={22}/></header>
  {pages[tab]||pages.home}
  {modal==='item'&&<Modal title="Add Home Item" close={()=>setModal(null)}><form onSubmit={addItem}><Input name="name" label="Item name"/><Input name="cat" label="Category"/><Input name="room" label="Room / location"/><button className="primary">Add Item</button></form></Modal>}
  {modal==='family'&&<Modal title="Add Family Member" close={()=>setModal(null)}><form onSubmit={addFamily}><Input name="name" label="Name"/><label className="field"><span>Relationship</span><select name="relationship" required><option>Father</option><option>Mother</option><option>Wife</option><option>Husband</option><option>Son</option><option>Daughter</option><option>Brother</option><option>Sister</option><option>Other</option></select></label><Input name="dob" label="Date of Birth" type="date" required={false}/><Input name="phone" label="Phone (optional)" required={false}/><button className="primary">Add Family Member</button></form></Modal>}
  {modal==='expense'&&<Modal title="Add Expense" close={()=>setModal(null)}><form onSubmit={addExpense}><Input name="name" label="Expense"/><Input name="amount" label="Amount" type="number"/><Input name="cat" label="Category"/><button className="primary">Add Expense</button></form></Modal>}
  <nav>{nav.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>id==='add'?setModal('expense'):setTab(id)}><Icon size={21}/>{label&&<span>{label}</span>}</button>)}</nav>
 </div>
}
