import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { MousePointer2 } from "lucide-react";
import { useDisplayPreferences } from "./DisplayPreferences";
const GlassPointer = lazy(() => import("./GlassPointer"));
const pointerFallback = <MousePointer2 size={32} fill="#000" stroke="none" strokeWidth={0} aria-hidden="true" />;

class PointerFallbackBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? pointerFallback : this.props.children; }
}

const smooth = (t: number) => { const p=Math.max(0,Math.min(1,t)); return p*p*(3-2*p); };
export default function HeroAssembly({ children, paper = false, masthead }: { children: ReactNode; paper?: boolean; masthead?: ReactNode }) {
  const { reduced } = useDisplayPreferences();
  const [glassReady, setGlassReady] = useState(false);
  const [highlighted,setHighlighted]=useState(false);
  const root=useRef<HTMLDivElement>(null), pointer=useRef<HTMLButtonElement>(null), dot=useRef<HTMLSpanElement>(null);
  const action=useRef<{start:number; erase:boolean}|null>(null);
  const arrivalHandled=useRef(false);
  const pressedAt = useRef<number | null>(null);
  const wake = useRef<() => void>(() => {});
  useEffect(()=>{
    if (!glassReady && !reduced) return;
    const timer=window.setTimeout(()=>{
      if(arrivalHandled.current)return;
      arrivalHandled.current=true;
      setHighlighted(true);
      if(reduced){
        root.current?.querySelectorAll<HTMLElement>(".cursor-highlight").forEach(mark=>mark.style.setProperty("--cursor-mark","1"));
      } else {
        action.current={start:performance.now(),erase:false};
        wake.current();
      }
    },1000);
    return ()=>window.clearTimeout(timer);
  },[reduced, glassReady]);
  useEffect(()=>{
    let frame=0;
    let visible = true, disposed = false;
    const marks=Array.from(root.current!.querySelectorAll<HTMLElement>(".cursor-highlight"));
    let home={x:0,y:0};
    let cursorScale = 1;
    let positions: {mark: HTMLElement; left: number; right: number; bottom: number}[]=[];
    const measure=()=>{
      if(disposed)return;
      const box=root.current!.getBoundingClientRect(), target=dot.current!.getBoundingClientRect();
      const greeting = root.current!.querySelector("h1");
      cursorScale = greeting ? Math.min(1, Math.max(.4, parseFloat(getComputedStyle(greeting).fontSize) / 106)) : 1;
      home={x:target.left-box.left+target.width/2,y:target.top-box.top+target.height/2};
      positions=marks.map(mark=>{const rect=mark.getBoundingClientRect();return {mark,left:rect.left-box.left,right:rect.right-box.left,bottom:rect.bottom-box.top-3};});
      wake.current();
    };
    const tick=(now:number)=>{
      frame=0;
      const idleX = reduced ? 0 : Math.sin(now*.0008)*1.8*cursorScale;
      const idleY = reduced ? 0 : Math.cos(now*.001)*1.5*cursorScale;
      const idleRotation = reduced ? 0 : Math.sin(now*.00065)*6;
      let x=home.x + idleX, y=home.y + idleY, rotation=idleRotation;
      if(action.current && !reduced && marks.length){
        const t=(now-action.current.start)/1000;
        const ordered=action.current.erase?[...positions].reverse():positions;
        const strokes=ordered.map(({mark,left,right,bottom})=>{
          return {mark,a:{x:action.current!.erase?right:left,y:bottom},b:{x:action.current!.erase?left:right,y:bottom}};
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
        x=pos.x+9*grip*cursorScale + idleX*(1-grip);
        y=pos.y+9*grip*cursorScale + idleY*(1-grip);
        rotation=idleRotation*(1-grip);
        if(t>=duration) action.current=null;
      }
      let scale = cursorScale;
      if (pressedAt.current !== null) {
        const elapsed = now - pressedAt.current;
        if (elapsed < 220 && !reduced) {
          scale = cursorScale * (1 - .12 * Math.sin(Math.PI * elapsed / 220));
        } else if (elapsed >= 220) pressedAt.current = null;
      }
      pointer.current!.style.transform=`translate(${x-24}px,${y-24}px) rotate(${rotation}deg) scale(${scale})`;
      if(visible && !document.hidden && !reduced)frame=requestAnimationFrame(tick);
    };
    wake.current=()=>{if(!disposed && visible && !document.hidden && !frame)frame=requestAnimationFrame(tick);};
    const observer=typeof ResizeObserver!=="undefined"?new ResizeObserver(measure):undefined;
    observer?.observe(root.current!);
    const intersection=typeof IntersectionObserver!=="undefined"?new IntersectionObserver(([entry])=>{
      visible=entry.isIntersecting;
      if(visible)wake.current();else{cancelAnimationFrame(frame);frame=0;}
    }):undefined;
    intersection?.observe(root.current!);
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake.current();};
    document.addEventListener("visibilitychange",visibility);
    window.addEventListener("resize",measure);
    void document.fonts?.ready.then(measure);
    measure();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer?.disconnect();intersection?.disconnect();document.removeEventListener("visibilitychange",visibility);window.removeEventListener("resize",measure);wake.current=()=>{};};
  },[reduced]);
  const activate=()=>{
    if (pressedAt.current === null) pressedAt.current = performance.now();
    if(action.current)return;
    arrivalHandled.current=true;
    const next=!highlighted;setHighlighted(next);
    const marks=root.current!.querySelectorAll<HTMLElement>(".cursor-highlight");
    if(reduced){marks.forEach(mark=>mark.style.setProperty("--cursor-mark",next?"1":"0"));return;}
    action.current={start:performance.now() + 220,erase:!next};
    wake.current();
  };
  const greeting = <h1 id={paper ? "paper-greeting" : "hero-title"} className={paper ? undefined : "folio-greeting"} aria-label={paper ? "Hi, I’m Elsa" : "Hi, I’m Elsa."}><span aria-hidden="true">H<span className="assembly-letter assembly-i">ı<span ref={dot} className="assembly-i-dot" style={{visibility:"hidden"}}/></span>, I’m Elsa{paper ? "" : "."}</span></h1>;
  return <div className={paper ? "paper-hero-assembly" : "hero-assembly"} ref={root}>
    {paper ? <section className="paper-masthead" aria-labelledby="paper-greeting">{masthead}{greeting}</section> : greeting}
    <div className={paper ? "paper-intro-anchor" : "folio-intro-anchor"}>{children}</div>
    <button ref={pointer} type="button" className="greeting-glass-cursor" onPointerDown={() => { pressedAt.current = performance.now(); }} onClick={activate} aria-pressed={highlighted} aria-label={highlighted?"Remove the introduction highlights":"Highlight the introduction"} title={highlighted?"Remove highlights":"Highlight a thought"}><PointerFallbackBoundary onFailure={() => setGlassReady(true)}><Suspense fallback={pointerFallback}><GlassPointer onReady={() => setGlassReady(true)} /></Suspense></PointerFallbackBoundary></button>
  </div>;
}
