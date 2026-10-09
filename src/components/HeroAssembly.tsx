import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDisplayPreferences } from "./DisplayPreferences";
import GlassPointer from "./GlassPointer";
import { CursorSounds } from "./CursorSounds";

const smooth = (t: number) => { const p=Math.max(0,Math.min(1,t)); return p*p*(3-2*p); };
export default function HeroAssembly({ children }: { children: ReactNode }) {
  const { reduced } = useDisplayPreferences();
  const [highlighted,setHighlighted]=useState(false);
  const root=useRef<HTMLDivElement>(null), pointer=useRef<HTMLButtonElement>(null), dot=useRef<HTMLSpanElement>(null);
  const action=useRef<{start:number; erase:boolean}|null>(null);
  const arrivalHandled=useRef(false);
  const pressedAt = useRef<number | null>(null);
  const sounds = useRef<CursorSounds | null>(null);
  useEffect(() => () => { sounds.current?.dispose(); sounds.current = null; }, []);
  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      if(arrivalHandled.current)return;
      arrivalHandled.current=true;
      setHighlighted(true);
      if(reduced){
        root.current?.querySelectorAll<HTMLElement>(".cursor-highlight").forEach(mark=>mark.style.setProperty("--cursor-mark","1"));
      } else {
        action.current={start:performance.now(),erase:false};
      }
    },700);
    return ()=>window.clearTimeout(timer);
  },[reduced]);
  useEffect(()=>{
    let frame=0;
    const tick=(now:number)=>{
      const box=root.current!.getBoundingClientRect(), target=dot.current!.getBoundingClientRect();
      const home={x:target.left-box.left+target.width/2,y:target.top-box.top+target.height/2};
      const marks=Array.from(root.current!.querySelectorAll<HTMLElement>(".cursor-highlight"));
      const idleX = reduced ? 0 : Math.sin(now*.0008)*1.8;
      const idleY = reduced ? 0 : Math.cos(now*.001)*1.5;
      const idleRotation = reduced ? 0 : Math.sin(now*.00065)*6;
      let x=home.x + idleX, y=home.y + idleY, rotation=idleRotation;
      if(action.current && !reduced){
        const t=(now-action.current.start)/1000;
        const ordered=action.current.erase?[...marks].reverse():marks;
        const strokes=ordered.map(mark=>{
          const rect=mark.getBoundingClientRect();
          return {mark,a:{x:(action.current!.erase?rect.right:rect.left)-box.left,y:rect.bottom-box.top-3},b:{x:(action.current!.erase?rect.left:rect.right)-box.left,y:rect.bottom-box.top-3}};
        });
        const sweep=1.4, transit=.55;
        const returnStart=1.25+strokes.length*sweep+(strokes.length-1)*transit;
        const duration=returnStart+1.4;
        const interpolate=(a:{x:number;y:number},b:{x:number;y:number},p:number,lift=0)=>({x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p-Math.sin(p*Math.PI)*lift});
        const location=(seconds:number)=>{
          if(seconds<1.25){
            return interpolate(home,strokes[0].a,smooth(seconds/1.25),36);
          }
          for(let i=0;i<strokes.length;i++){
            const start=1.25+i*(sweep+transit);
            if(seconds<start+sweep)return interpolate(strokes[i].a,strokes[i].b,smooth((seconds-start)/sweep));
            if(i<strokes.length-1 && seconds<start+sweep+transit)return interpolate(strokes[i].b,strokes[i+1].a,smooth((seconds-start-sweep)/transit),12);
          }
          return interpolate(strokes[strokes.length-1].b,home,smooth((seconds-returnStart)/1.4),48);
        };
        const pos=location(t);
        strokes.forEach(({mark},i)=>{
          const progress=smooth((t-1.25-i*(sweep+transit))/sweep);
          mark.style.setProperty("--cursor-mark",String(action.current!.erase?1-progress:progress));
        });
        // Keep the cursor upright, with its tip on the highlight while sweeping.
        const grip=smooth(t/1.25)*(1-smooth((t-returnStart)/1.4));
        x=pos.x+9*grip + idleX*(1-grip);
        y=pos.y+9*grip + idleY*(1-grip);
        rotation=idleRotation*(1-grip);
        if(t>=duration) action.current=null;
      }
      let scale = 1;
      if (pressedAt.current !== null) {
        const elapsed = now - pressedAt.current;
        if (elapsed < 220 && !reduced) {
          scale = 1 - .12 * Math.sin(Math.PI * elapsed / 220);
        } else if (elapsed >= 220) pressedAt.current = null;
      }
      pointer.current!.style.transform=`translate(${x-24}px,${y-24}px) rotate(${rotation}deg) scale(${scale})`;
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[reduced]);
  const activate=()=>{
    sounds.current ??= new CursorSounds();
    sounds.current.press();
    if (pressedAt.current === null) pressedAt.current = performance.now();
    if(action.current)return;
    arrivalHandled.current=true;
    const next=!highlighted;setHighlighted(next);
    const marks=root.current!.querySelectorAll<HTMLElement>(".cursor-highlight");
    if(reduced){marks.forEach(mark=>mark.style.setProperty("--cursor-mark",next?"1":"0"));return;}
    action.current={start:performance.now() + 220,erase:!next};
    sounds.current.sweep(marks.length, !next);
  };
  return <div className="hero-assembly" ref={root}>
    <h1 id="hero-title" className="folio-greeting" aria-label="Hi, I’m Elsa."><span aria-hidden="true">H<span className="assembly-letter assembly-i">ı<span ref={dot} className="assembly-i-dot" style={{visibility:"hidden"}}/></span>, I’m Elsa.</span></h1>
    <div className="folio-intro-anchor">{children}</div>
    <button ref={pointer} type="button" className="greeting-glass-cursor" onPointerDown={() => { pressedAt.current = performance.now(); }} onClick={activate} aria-pressed={highlighted} aria-label={highlighted?"Remove the highlights":"Highlight technology easier to understand and more meaningful to use"} title={highlighted?"Remove highlights":"Highlight a thought"}><GlassPointer/></button>
  </div>;
}
