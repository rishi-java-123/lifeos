import React from 'react';
import {Folder,Pill,Wallet,Bell,Home,Receipt,ShoppingCart,Users,Bot,CheckCircle2} from 'lucide-react';
import {Card} from '../../components/Common';
export default function HomeDashboard({data,setTab}){return <main>
 <section className="hello"><div><h1>Good Morning 👋</h1><p>Have a productive day!</p></div><div className="weather">☀️<b>28°C</b><small>Patna</small></div></section>
 <Card cls="ask"><div><b>Ask me anything...</b><small>e.g. Where is my passport?</small></div><button onClick={()=>setTab('assistant')}><Bot size={20}/></button></Card>
 <div className="sectionTitle"><b>Quick Access</b><span>Tap any module</span></div><div className="quick">{[[Folder,'Documents','documents'],[Pill,'Medicines','medicines'],[Wallet,'Expenses','expenses'],[Bell,'Reminders','reminders'],[Home,'Home Inventory','inventory'],[Receipt,'Bills & Subscriptions','bills'],[ShoppingCart,'Shopping List','shopping'],[Users,'Family','family']].map(([I,t,id])=><button key={t} onClick={()=>setTab(id)}><I size={24}/><span>{t}</span></button>)}</div>
 <div className="sectionTitle"><b>Upcoming Reminders</b><button onClick={()=>setTab('reminders')}>View all</button></div><Card>{data.tasks.map(x=><div className="row" key={x.id}><CheckCircle2 className={x.done?'ok':''} size={20}/><div><b>{x.title}</b><small>{x.date}</small></div><em>{x.done?'Done':'Upcoming'}</em></div>)}</Card>
 <div className="sectionTitle"><b>Today's Medicines</b><button onClick={()=>setTab('medicines')}>View all</button></div><Card>{data.meds.map(x=><div className="row" key={x.id}><Pill size={20}/><div><b>{x.name}</b><small>{x.dose}</small></div><em className={x.taken?'okText':''}>{x.taken?'Taken':x.time}</em></div>)}</Card>
 </main>}
