import React,{useRef,useState} from 'react';
import {Play,Pause,Volume2,Maximize2} from 'lucide-react';

export default function PromoVideo({compact=false}){
  const ref=useRef(null);
  const [playing,setPlaying]=useState(false);
  const toggle=()=>{
    const el=ref.current;
    if(!el)return;
    if(el.paused){el.play();setPlaying(true)}else{el.pause();setPlaying(false)}
  };
  const fullscreen=()=>{
    const el=ref.current;
    if(!el)return;
    if(el.requestFullscreen) el.requestFullscreen();
    else if(el.webkitEnterFullscreen) el.webkitEnterFullscreen();
  };
  return <div className={'promoVideo '+(compact?'promoVideoCompact':'')}>
    <div className="promoVideoFrame">
      <video
        ref={ref}
        src="/media/lifeos-demo.mp4"
        poster="/media/lifeos-demo-poster.jpg"
        playsInline
        preload="metadata"
        onPlay={()=>setPlaying(true)}
        onPause={()=>setPlaying(false)}
        onEnded={()=>setPlaying(false)}
        aria-label="Life OS product overview video"
      />
      {!playing&&<button className="promoPlay" onClick={toggle} aria-label="Play Life OS video"><Play size={28} fill="currentColor"/></button>}
      <div className="promoControls">
        <button onClick={toggle} aria-label={playing?'Pause video':'Play video'}>{playing?<Pause size={17}/>:<Play size={17}/>}</button>
        <span><Volume2 size={16}/> Voice + instrumental music</span>
        <button onClick={fullscreen} aria-label="Full screen"><Maximize2 size={17}/></button>
      </div>
    </div>
  </div>
}
