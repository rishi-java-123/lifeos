import React,{useState} from 'react';
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import InfoPage from './InfoPage';
import PricingPage from './PricingPage';
import BlogPage from './BlogPage';
import DemoPage from './DemoPage';

export default function PublicSite({screen,setScreen,onAuthenticated}){
 const [message,setMessage]=useState('');
 const [scrollTarget,setScrollTarget]=useState('');
 const go=(target,anchor='')=>{setMessage('');setScrollTarget(anchor);setScreen(target);window.scrollTo({top:0,behavior:'smooth'})};
 const register=e=>{e.preventDefault();const f=new FormData(e.currentTarget);const password=String(f.get('password')||''),confirm=String(f.get('confirm')||'');if(password.length<6){setMessage('Password must be at least 6 characters.');return}if(password!==confirm){setMessage('Passwords do not match.');return}const user={name:String(f.get('name')||''),email:String(f.get('email')||'').toLowerCase(),password};localStorage.setItem('lifeos_user',JSON.stringify(user));localStorage.setItem('lifeos_session',user.email);onAuthenticated()};
 const signin=e=>{e.preventDefault();const f=new FormData(e.currentTarget);const email=String(f.get('email')||'').toLowerCase(),password=String(f.get('password')||'');let user=null;try{user=JSON.parse(localStorage.getItem('lifeos_user')||'null')}catch{}if(!user||user.email!==email||user.password!==password){setMessage('Email or password is incorrect. Register first if you do not have an account.');return}localStorage.setItem('lifeos_session',email);onAuthenticated()};
 if(screen==='signin') return <AuthPage mode="signin" onSubmit={signin} message={message} go={go}/>;
 if(screen==='register') return <AuthPage mode="register" onSubmit={register} message={message} go={go}/>;
 if(screen==='pricing') return <PricingPage go={go}/>;
 if(screen==='blog') return <BlogPage go={go}/>;
 if(screen==='demo') return <DemoPage go={go}/>;
 if(screen.startsWith('feature-')||screen==='family-info'||screen==='security') return <InfoPage screen={screen} go={go}/>;
 return <LandingPage go={go} scrollTarget={scrollTarget}/>;
}
