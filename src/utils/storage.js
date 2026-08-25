import {seed} from '../data/seed';
export function loadData(){try{return JSON.parse(localStorage.getItem('lifeos')||'null')||seed}catch{return seed}}
export function saveData(data){localStorage.setItem('lifeos',JSON.stringify(data))}
export function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
export function getUser(){try{return JSON.parse(localStorage.getItem('lifeos_user')||'null')}catch{return null}}
