import React from 'react';
import {X} from 'lucide-react';
export const Card=({children,onClick,cls=''})=><div className={'card '+cls} onClick={onClick}>{children}</div>;
export const Top=({title,onBack})=><div className="top"><button onClick={onBack||(()=>window.dispatchEvent(new Event('lifeos-home')))}><span>‹</span></button><h2>{title}</h2></div>;
export const Stat=({n,t})=><div className="stat"><strong>{n}</strong><small>{t}</small></div>;
export function Modal({title,close,children}){return <div className="overlay"><div className="modal"><button className="close" onClick={close}><X/></button><h2>{title}</h2>{children}</div></div>}
export function Input({name,label,type='text',required=true}){return <label className="field"><span>{label}</span><input name={name} type={type} required={required}/></label>}
