import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";
import GlassPointer from "./GlassPointer";

const smooth = (t: number) => { const p=Math.max(0,Math.min(1,t)); return p*p*(3-2*p); };
export default function HeroAssembly({ children }: { children: ReactNode }) {
  const { reduced } = useDisplayPreferences();
  const [highlighted,setHighlighted]=useState(false);
  const root=useRef<HTMLDivElement>(null), pointer=useRef<HTMLButtonElement>(null), dot=useRef<HTMLSpanElement>(null);
  const action=useRef<{start:number; erase:boolean}|null>(null);
  useEffect(()=>{
    let frame=0;
    const tick=(now:number)=>{
      const box=root.current!.getBoundingClientRect(), target=dot.current!.getBoundingClientRect();
      const home={x:target.left-box.left+target.width/2,y:target.top-box.top+target.height/2};
      const mark=root.current!.querySelector<HTMLElement>(".cursor-highlight")!;
      let x=home.x, y=home.y, rotation=0;
      if(action.current && !reduced){
        const t=(now-action.current.start)/1000;
        const rect=mark.getBoundingClientRect();
        const a={x:(action.current.erase?rect.right:rect.left)-box.left,y:rect.bottom-box.top-3};
        const b={x:(action.current.erase?rect.left:rect.right)-box.left,y:a.y};
        const location=(seconds:number)=>{
          if(seconds<1.25){
            const p=smooth(seconds/1.25);
            return {x:home.x+(a.x-home.x)*p,y:home.y+(a.y-home.y)*p-Math.sin(p*Math.PI)*36};
          }
          if(seconds<2.65){const p=smooth((seconds-1.25)/1.4);return {x:a.x+(b.x-a.x)*p,y:a.y};}
          const p=smooth((seconds-2.65)/1.4);
          return {x:b.x+(home.x-b.x)*p,y:b.y+(home.y-b.y)*p-Math.sin(p*Math.PI)*48};
        };
        const pos=location(t);
        const progress=smooth((t-1.25)/1.4);
        mark.style.setProperty("--cursor-mark",String(action.current.erase?1-progress:progress));
        // Keep the cursor upright, with its tip on the highlight while sweeping.
        const grip=smooth(t/1.25)*(1-smooth((t-2.65)/1.4));
        x=pos.x+9*grip; y=pos.y+9*grip;
        if(t>=4.05){action.current=null;rotation=0;x=home.x;y=home.y;}
      } else if(!reduced) {
        x+=Math.sin(now*.0008)*1.8; y+=Math.cos(now*.001)*1.5;
        rotation=Math.sin(now*.00065)*6;
      }
      pointer.current!.style.transform=`translate(${x-24}px,${y-24}px) rotate(${rotation}deg)`;
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[reduced]);
  const activate=()=>{
    if(action.current)return;
    const next=!highlighted;setHighlighted(next);
    const mark=root.current!.querySelector<HTMLElement>(".cursor-highlight")!;
    if(reduced){mark.style.setProperty("--cursor-mark",next?"1":"0");return;}
    action.current={start:performance.now(),erase:!next};
  };
  return <div className="hero-assembly" ref={root}>
    <h1 id="hero-title" className="folio-greeting" aria-label="Hi, I’m Elsa."><span aria-hidden="true">H<span className="assembly-letter assembly-i">ı<span ref={dot} className="assembly-i-dot" style={{visibility:"hidden"}}/></span>, I’m Elsa.</span></h1>
    <div className="folio-intro-anchor">{children}</div>
    <button ref={pointer} type="button" className="greeting-glass-cursor" onClick={activate} aria-pressed={highlighted} aria-label={highlighted?"Remove the highlight":"Highlight AI works alongside us"} title={highlighted?"Remove highlight":"Highlight a thought"}><GlassPointer/></button>
  </div>;
}
