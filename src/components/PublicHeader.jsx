import React,{useState} from 'react';
import {Menu,X} from 'lucide-react';
import LifeOSLogo from "./LifeOSLogo";
const links=[['Features','features'],['How it Works','how'],['For Families','family-info'],['Security','security'],['Pricing','pricing'],['Blog','blog']];
export default function PublicHeader({go}){
 const [open,setOpen]=useState(false);
 const navigate=(target)=>{setOpen(false); if(target==='features'||target==='how'){go('landing',target)}else go(target)};
 return <header className="publicHeader"><div className="publicHeaderInner">
   <button className="publicBrand" onClick={()=>go('landing')} aria-label="Life OS home"><LifeOSLogo variant="mark" /><b>Life OS</b></button>
   <div className={'publicNav '+(open?'open':'')}>{links.map(([label,target])=><button key={target} onClick={()=>navigate(target)}>{label}</button>)}</div>
   <div className="publicActions"><button className="textBtn" onClick={()=>go('signin')}>Log in</button><button className="primary compact" onClick={()=>go('register')}>Get Started</button><button className="menuBtn" onClick={()=>setOpen(x=>!x)}>{open?<X/>:<Menu/>}</button></div>
 </div></header>
}
