import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState, type ReactElement, type HTMLAttributes } from "react";
import HeaderFollower from "./HeaderFollower";

const svgSources = import.meta.glob("../../public/portfolio-2027/mosaic-tile*.svg", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const reversedSources = new Map<string, string>();

function reverseSvg(source: string) {
  const name = source.split("/").pop()!;
  if (reversedSources.has(name)) return reversedSources.get(name)!;
  const original = svgSources[`../../public/portfolio-2027/${name}`];
  if (!original) return source;
  const reversed = original.replace(/<filter\b[\s\S]*?<\/filter>/g, filter => {
    // The rectangle's surrounding inset relief stays fixed; only its inner shape toggles.
    if (/id="filter0_/.test(filter)) return filter;
    const inset = filter.includes('operator="arithmetic"');
    const last = [...filter.matchAll(/result="(effect[^"]+)"/g)].at(-1)?.[1];
    if (inset) {
      return filter
        .replace(/<feComposite\b[^>]*\/>/g, "")
        .replace(/<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"\/>/, '<feFlood flood-opacity="0" result="shape"/>')
        .replace("</filter>", `<feBlend in="SourceGraphic" in2="${last}"/></filter>`);
    }
    return filter
      .replace(/(<feFlood[^>]*\/>)/, '$1<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>')
      .replace(/(<feGaussianBlur[^>]*\/>)/g, '$1<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>')
      .replace(/in2="BackgroundImageFix" result="effect/g, 'in2="shape" result="effect')
      .replace(new RegExp(`<feBlend mode="normal" in="SourceGraphic" in2="${last}" result="shape"/>`), "");
  });
  const url = `data:image/svg+xml,${encodeURIComponent(reversed)}`;
  reversedSources.set(name, url);
  return url;
}

function ReliefTile({ tile, index }: { tile: ReactElement<HTMLAttributes<HTMLElement>>; index: number }) {
  const [pressed, setPressed] = useState(false);
  const root = useRef<HTMLButtonElement>(null);
  const imageChild = Children.toArray(tile.props.children).find(child => isValidElement(child) && child.type === "img") as ReactElement<{ src: string }> | undefined;
  const source = imageChild ? svgSources[`../../public/portfolio-2027/${imageChild.props.src.split("/").pop()}`] : undefined;
  const strength = useMemo(() => {
    const filter = source?.match(/<filter id="filter1_[\s\S]*?<\/filter>/)?.[0];
    const alphas = filter ? [...filter.matchAll(/<feColorMatrix(?![^>]*in="SourceAlpha")[^>]*values="([^"]+)"/g)].map(match => Number(match[1].trim().split(/\s+/)[18])) : [];
    return filter ? Math.min(1, Math.max(0, ...alphas) / .4) : undefined;
  }, [source]);
  useEffect(() => {
    const shape = root.current?.querySelector<HTMLElement>(":scope > div[data-node-id]");
    const originalLayer = shape ?? root.current?.querySelector<HTMLImageElement>("img");
    if (!originalLayer) return;
    const alternate = originalLayer.cloneNode(true) as HTMLElement;
    originalLayer.classList.add("paper-relief-original");
    alternate.classList.add("paper-relief-alternate");
    alternate.setAttribute("aria-hidden", "true");
    const shadowElements = shape ? [shape, ...shape.querySelectorAll<HTMLElement>("div")] : [];
    const alternateElements = [alternate, ...alternate.querySelectorAll<HTMLElement>("div")];
    // Read all computed shadows before writing any styles. Toggle only opacity later.
    const shadows = shadowElements.map(element => getComputedStyle(element).boxShadow);
    const shadow = shadows.find(value => value && value !== "none");
    if (root.current) {
      root.current.dataset.initialDepth = shadow?.includes("inset") ? "inset" : "raised";
      if (shadow) {
        const alphas = [...shadow.matchAll(/rgba\([^)]*,\s*([\d.]+)\)/g)].map(match => Number(match[1]));
        root.current.dataset.shadowStrength = String(Math.min(1, Math.max(0, ...alphas) / .4));
      }
    }
    shadowElements.forEach((element, index) => {
      const original = shadows[index];
      if (!original || original === "none") return;
      element.dataset.originalShadow = original;
      alternateElements[index].style.boxShadow = original.split(/,(?![^()]*\))/).map(layer => layer.includes("inset") ? layer.replace(/\binset\s*/g, "") : `inset ${layer.trim()}`).join(", ");
    });
    if (alternate instanceof HTMLImageElement) {
      alternate.src = reverseSvg(alternate.getAttribute("src")!);
      void alternate.decode?.().catch(() => {});
    }
    originalLayer.after(alternate);
    return () => { alternate.remove(); originalLayer.classList.remove("paper-relief-original"); };
  }, []);
  const toggle = () => {
    setPressed(!pressed);
  };
  return <button {...tile.props} ref={root} type="button" data-shadow-strength={strength} aria-label={`Reverse paper cutout ${index + 1} shadow`} aria-pressed={pressed}
    onClick={toggle}>{tile.props.children}</button>;
}

const imgMosaicTile00 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile00.svg`;
const imgMosaicTile03 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile03.svg`;
const imgMosaicTile06 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile06.svg`;
const imgMosaicTile09 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile09.svg`;
const imgMosaicTile12 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile12.svg`;
const imgMosaicTile15 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile15.svg`;
const imgMosaicTile18 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile18.svg`;
const imgMosaicTile21 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile21.svg`;
const imgMosaicTile24 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile24.svg`;
const imgMosaicTile27 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile27.svg`;
const imgMosaicTile210 = `${import.meta.env.BASE_URL}portfolio-2027/mosaic-tile210.svg`;

export default function PaperMosaic() {
  const mosaic = (
<div className="paper-mosaic" data-node-id="94:78" data-name="Editable paper mosaic / native Figma relief">
            <div className="absolute h-[108.667px] left-[16px] top-[16px] w-[117.091px]" data-node-id="94:79" data-name="Mosaic tile / 0-0">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile00} />
            </div>
            <div className="absolute h-[108.667px] left-[145.09px] overflow-clip rounded-[10px] top-[16px] w-[117.091px]" data-node-id="94:82" data-name="Mosaic tile / 0-1">
              <div aria-hidden className="absolute bg-[#f5f9fb] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#eef5fa] left-[23.77px] rounded-[29.48px] shadow-[4.432px_7.977px_11.085px_0px_rgba(184,193,199,0.2),4.432px_3.545px_5.625px_0px_rgba(184,193,199,0.1),4.432px_4.136px_6.287px_0px_rgba(184,193,199,0.12),4.432px_5.17px_7.445px_0px_rgba(184,193,199,0.14),-2.954px_-9.306px_10.754px_0px_rgba(251,253,254,0.25),-2.954px_-5.441px_7.06px_0px_rgba(251,253,254,0.18),-2.954px_-4.633px_5.795px_0px_rgba(251,253,254,0.15),-2.954px_-4.198px_4.991px_0px_rgba(251,253,254,0.12)] size-[69.547px] top-[19.56px]" data-node-id="99:79" data-name="Soft raised tile / supplied outer shadow" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(184,193,199,0.1),inset_5.855px_5.464px_8.306px_0px_rgba(184,193,199,0.12),inset_5.855px_6.831px_9.836px_0px_rgba(184,193,199,0.14),inset_5.855px_10.538px_13.333px_0px_rgba(184,193,199,0.2),inset_-3.903px_-12.295px_14.207px_0px_rgba(251,253,254,0.25),inset_-3.903px_-7.188px_9.327px_0px_rgba(251,253,254,0.18),inset_-3.903px_-6.121px_7.656px_0px_rgba(251,253,254,0.15),inset_-3.903px_-5.546px_6.594px_0px_rgba(251,253,254,0.12)]" />
            </div>
            <div className="absolute h-[108.667px] left-[274.18px] overflow-clip pointer-events-none rounded-[10px] top-[16px] w-[117.091px]" data-node-id="94:84" data-name="Mosaic tile / 0-2">
              <div aria-hidden className="absolute bg-[#f8faf9] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="99:80" data-name="Recessed panel / supplied inner shadow">
                <div aria-hidden className="absolute bg-[#f4f8f6] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(187,195,191,0.04),inset_4.432px_4.136px_6.287px_0px_rgba(187,195,191,0.05),inset_4.432px_5.17px_7.445px_0px_rgba(187,195,191,0.06),inset_4.432px_7.977px_10.092px_0px_rgba(187,195,191,0.09),inset_-2.954px_-9.306px_10.754px_0px_rgba(252,253,252,0.11),inset_-2.954px_-5.441px_7.06px_0px_rgba(252,253,252,0.08),inset_-2.954px_-4.633px_5.795px_0px_rgba(252,253,252,0.06),inset_-2.954px_-4.198px_4.991px_0px_rgba(252,253,252,0.05)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(187,195,191,0.04),inset_5.855px_5.464px_8.306px_0px_rgba(187,195,191,0.05),inset_5.855px_6.831px_9.836px_0px_rgba(187,195,191,0.06),inset_5.855px_10.538px_13.333px_0px_rgba(187,195,191,0.09),inset_-3.903px_-12.295px_14.207px_0px_rgba(252,253,252,0.11),inset_-3.903px_-7.188px_9.327px_0px_rgba(252,253,252,0.08),inset_-3.903px_-6.121px_7.656px_0px_rgba(252,253,252,0.06),inset_-3.903px_-5.546px_6.594px_0px_rgba(252,253,252,0.05)]" />
            </div>
            <div className="absolute h-[108.667px] left-[403.27px] top-[16px] w-[117.091px]" data-node-id="94:86" data-name="Mosaic tile / 0-3">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile03} />
            </div>
            <div className="absolute h-[108.667px] left-[532.36px] overflow-clip rounded-[10px] top-[16px] w-[117.091px]" data-node-id="94:87" data-name="Mosaic tile / 0-4">
              <div aria-hidden className="absolute bg-[#fbfbf9] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#fafaf7] left-[23.77px] rounded-[27.28px] shadow-[4.432px_7.977px_11.085px_0px_rgba(197,195,184,0.02),4.432px_3.545px_5.625px_0px_rgba(197,195,184,0.01),4.432px_4.136px_6.287px_0px_rgba(197,195,184,0.01),4.432px_5.17px_7.445px_0px_rgba(197,195,184,0.01),-2.954px_-9.306px_10.754px_0px_rgba(254,253,251,0.03),-2.954px_-5.441px_7.06px_0px_rgba(254,253,251,0.02),-2.954px_-4.633px_5.795px_0px_rgba(254,253,251,0.02),-2.954px_-4.198px_4.991px_0px_rgba(254,253,251,0.01)] size-[69.547px] top-[19.56px]" data-node-id="106:75" data-name="Soft relief / continuous center" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(197,195,184,0.01),inset_5.855px_5.464px_8.306px_0px_rgba(197,195,184,0.01),inset_5.855px_6.831px_9.836px_0px_rgba(197,195,184,0.01),inset_5.855px_10.538px_13.333px_0px_rgba(197,195,184,0.02),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,253,251,0.03),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,253,251,0.02),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,253,251,0.02),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,253,251,0.01)]" />
            </div>
            <div className="absolute h-[108.667px] left-[661.45px] overflow-clip pointer-events-none rounded-[10px] top-[16px] w-[117.091px]" data-node-id="94:88" data-name="Mosaic tile / 0-5">
              <div aria-hidden className="absolute bg-[#fafafb] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="106:76" data-name="Soft relief / continuous center">
                <div aria-hidden className="absolute bg-[#f9f8fa] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(192,189,197,0.01),inset_4.432px_4.136px_6.287px_0px_rgba(192,189,197,0.01),inset_4.432px_5.17px_7.445px_0px_rgba(192,189,197,0.01),inset_4.432px_7.977px_10.092px_0px_rgba(192,189,197,0.02),inset_-2.954px_-9.306px_10.754px_0px_rgba(253,252,254,0.02),inset_-2.954px_-5.441px_7.06px_0px_rgba(253,252,254,0.02),inset_-2.954px_-4.633px_5.795px_0px_rgba(253,252,254,0.01),inset_-2.954px_-4.198px_4.991px_0px_rgba(253,252,254,0.01)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(192,189,197,0.01),inset_5.855px_5.464px_8.306px_0px_rgba(192,189,197,0.01),inset_5.855px_6.831px_9.836px_0px_rgba(192,189,197,0.01),inset_5.855px_10.538px_13.333px_0px_rgba(192,189,197,0.02),inset_-3.903px_-12.295px_14.207px_0px_rgba(253,252,254,0.02),inset_-3.903px_-7.188px_9.327px_0px_rgba(253,252,254,0.02),inset_-3.903px_-6.121px_7.656px_0px_rgba(253,252,254,0.01),inset_-3.903px_-5.546px_6.594px_0px_rgba(253,252,254,0.01)]" />
            </div>
            <div className="absolute h-[108.667px] left-[790.55px] top-[16px] w-[117.091px]" data-node-id="94:89" data-name="Mosaic tile / 0-6">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile06} />
            </div>
            <div className="absolute h-[108.667px] left-[919.64px] overflow-clip rounded-[10px] top-[16px] w-[117.091px]" data-node-id="94:90" data-name="Mosaic tile / 0-7">
              <div aria-hidden className="absolute bg-[#f9fafa] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#f6f9f8] left-[23.77px] rounded-[27.28px] shadow-[4.432px_7.977px_11.085px_0px_rgba(187,195,191,0.04),4.432px_3.545px_5.625px_0px_rgba(187,195,191,0.02),4.432px_4.136px_6.287px_0px_rgba(187,195,191,0.02),4.432px_5.17px_7.445px_0px_rgba(187,195,191,0.03),-2.954px_-9.306px_10.754px_0px_rgba(252,253,252,0.04),-2.954px_-5.441px_7.06px_0px_rgba(252,253,252,0.03),-2.954px_-4.633px_5.795px_0px_rgba(252,253,252,0.03),-2.954px_-4.198px_4.991px_0px_rgba(252,253,252,0.02)] size-[69.547px] top-[19.56px]" data-node-id="106:78" data-name="Soft relief / continuous center" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(187,195,191,0.02),inset_5.855px_5.464px_8.306px_0px_rgba(187,195,191,0.02),inset_5.855px_6.831px_9.836px_0px_rgba(187,195,191,0.03),inset_5.855px_10.538px_13.333px_0px_rgba(187,195,191,0.04),inset_-3.903px_-12.295px_14.207px_0px_rgba(252,253,252,0.04),inset_-3.903px_-7.188px_9.327px_0px_rgba(252,253,252,0.03),inset_-3.903px_-6.121px_7.656px_0px_rgba(252,253,252,0.03),inset_-3.903px_-5.546px_6.594px_0px_rgba(252,253,252,0.02)]" />
            </div>
            <div className="absolute h-[108.667px] left-[1048.73px] overflow-clip pointer-events-none rounded-[10px] top-[16px] w-[117.091px]" data-node-id="94:91" data-name="Mosaic tile / 0-8">
              <div aria-hidden className="absolute bg-[#fbf9f8] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="99:81" data-name="Recessed panel / supplied inner shadow">
                <div aria-hidden className="absolute bg-[#faf6f4] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(199,191,188,0.05),inset_4.432px_4.136px_6.287px_0px_rgba(199,191,188,0.06),inset_4.432px_5.17px_7.445px_0px_rgba(199,191,188,0.07),inset_4.432px_7.977px_10.092px_0px_rgba(199,191,188,0.1),inset_-2.954px_-9.306px_10.754px_0px_rgba(254,252,252,0.13),inset_-2.954px_-5.441px_7.06px_0px_rgba(254,252,252,0.09),inset_-2.954px_-4.633px_5.795px_0px_rgba(254,252,252,0.08),inset_-2.954px_-4.198px_4.991px_0px_rgba(254,252,252,0.06)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(199,191,188,0.05),inset_5.855px_5.464px_8.306px_0px_rgba(199,191,188,0.06),inset_5.855px_6.831px_9.836px_0px_rgba(199,191,188,0.07),inset_5.855px_10.538px_13.333px_0px_rgba(199,191,188,0.1),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,252,252,0.13),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,252,252,0.09),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,252,252,0.08),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,252,252,0.06)]" />
            </div>
            <div className="absolute h-[108.667px] left-[1177.82px] top-[16px] w-[117.091px]" data-node-id="94:93" data-name="Mosaic tile / 0-9">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile09} />
            </div>
            <div className="absolute h-[108.667px] left-[1306.91px] overflow-clip rounded-[10px] top-[16px] w-[117.091px]" data-node-id="94:96" data-name="Mosaic tile / 0-10">
              <div aria-hidden className="absolute bg-[#f7f6fa] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#f1eef7] left-[23.77px] rounded-[29.48px] shadow-[4.432px_7.977px_11.085px_0px_rgba(192,189,197,0.32),4.432px_3.545px_5.625px_0px_rgba(192,189,197,0.16),4.432px_4.136px_6.287px_0px_rgba(192,189,197,0.19),4.432px_5.17px_7.445px_0px_rgba(192,189,197,0.23),-2.954px_-9.306px_10.754px_0px_rgba(253,252,254,0.4),-2.954px_-5.441px_7.06px_0px_rgba(253,252,254,0.29),-2.954px_-4.633px_5.795px_0px_rgba(253,252,254,0.24),-2.954px_-4.198px_4.991px_0px_rgba(253,252,254,0.2)] size-[69.547px] top-[19.56px]" data-node-id="99:83" data-name="Soft raised tile / supplied outer shadow" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(192,189,197,0.16),inset_5.855px_5.464px_8.306px_0px_rgba(192,189,197,0.19),inset_5.855px_6.831px_9.836px_0px_rgba(192,189,197,0.23),inset_5.855px_10.538px_13.333px_0px_rgba(192,189,197,0.32),inset_-3.903px_-12.295px_14.207px_0px_rgba(253,252,254,0.4),inset_-3.903px_-7.188px_9.327px_0px_rgba(253,252,254,0.29),inset_-3.903px_-6.121px_7.656px_0px_rgba(253,252,254,0.24),inset_-3.903px_-5.546px_6.594px_0px_rgba(253,252,254,0.2)]" />
            </div>
            <div className="absolute h-[108.667px] left-[16px] overflow-clip rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:98" data-name="Mosaic tile / 1-0">
              <div aria-hidden className="absolute bg-[#f5f9f7] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#edf5f1] left-[23.77px] rounded-[29.48px] shadow-[4.432px_7.977px_11.085px_0px_rgba(187,195,191,0.28),4.432px_3.545px_5.625px_0px_rgba(187,195,191,0.14),4.432px_4.136px_6.287px_0px_rgba(187,195,191,0.16),4.432px_5.17px_7.445px_0px_rgba(187,195,191,0.2),-2.954px_-9.306px_10.754px_0px_rgba(252,253,252,0.34),-2.954px_-5.441px_7.06px_0px_rgba(252,253,252,0.24),-2.954px_-4.633px_5.795px_0px_rgba(252,253,252,0.2),-2.954px_-4.198px_4.991px_0px_rgba(252,253,252,0.17)] size-[69.547px] top-[19.56px]" data-node-id="99:84" data-name="Soft raised tile / supplied outer shadow" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(187,195,191,0.14),inset_5.855px_5.464px_8.306px_0px_rgba(187,195,191,0.16),inset_5.855px_6.831px_9.836px_0px_rgba(187,195,191,0.2),inset_5.855px_10.538px_13.333px_0px_rgba(187,195,191,0.28),inset_-3.903px_-12.295px_14.207px_0px_rgba(252,253,252,0.34),inset_-3.903px_-7.188px_9.327px_0px_rgba(252,253,252,0.24),inset_-3.903px_-6.121px_7.656px_0px_rgba(252,253,252,0.2),inset_-3.903px_-5.546px_6.594px_0px_rgba(252,253,252,0.17)]" />
            </div>
            <div className="absolute h-[108.667px] left-[145.09px] overflow-clip pointer-events-none rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:100" data-name="Mosaic tile / 1-1">
              <div aria-hidden className="absolute bg-[#fbf8f7] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="99:85" data-name="Recessed panel / supplied inner shadow">
                <div aria-hidden className="absolute bg-[#faf4f2] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(199,191,188,0.09),inset_4.432px_4.136px_6.287px_0px_rgba(199,191,188,0.1),inset_4.432px_5.17px_7.445px_0px_rgba(199,191,188,0.13),inset_4.432px_7.977px_10.092px_0px_rgba(199,191,188,0.17),inset_-2.954px_-9.306px_10.754px_0px_rgba(254,252,252,0.22),inset_-2.954px_-5.441px_7.06px_0px_rgba(254,252,252,0.16),inset_-2.954px_-4.633px_5.795px_0px_rgba(254,252,252,0.13),inset_-2.954px_-4.198px_4.991px_0px_rgba(254,252,252,0.11)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(199,191,188,0.09),inset_5.855px_5.464px_8.306px_0px_rgba(199,191,188,0.1),inset_5.855px_6.831px_9.836px_0px_rgba(199,191,188,0.13),inset_5.855px_10.538px_13.333px_0px_rgba(199,191,188,0.17),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,252,252,0.22),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,252,252,0.16),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,252,252,0.13),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,252,252,0.11)]" />
            </div>
            <div className="absolute h-[108.667px] left-[274.18px] top-[136.67px] w-[117.091px]" data-node-id="94:102" data-name="Mosaic tile / 1-2">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile12} />
            </div>
            <div className="absolute h-[108.667px] left-[403.27px] overflow-clip rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:105" data-name="Mosaic tile / 1-3">
              <div aria-hidden className="absolute bg-[#fafafb] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#f9f9fa] left-[23.77px] rounded-[27.28px] shadow-[4.432px_7.977px_11.085px_0px_rgba(192,189,197,0.01),4.432px_3.545px_5.625px_0px_rgba(192,189,197,0.01),4.432px_4.136px_6.287px_0px_rgba(192,189,197,0.01),4.432px_5.17px_7.445px_0px_rgba(192,189,197,0.01),-2.954px_-9.306px_10.754px_0px_rgba(253,252,254,0.02),-2.954px_-5.441px_7.06px_0px_rgba(253,252,254,0.01),-2.954px_-4.633px_5.795px_0px_rgba(253,252,254,0.01),-2.954px_-4.198px_4.991px_0px_rgba(253,252,254,0.01)] size-[69.547px] top-[19.56px]" data-node-id="106:79" data-name="Soft relief / continuous center" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(192,189,197,0.01),inset_5.855px_5.464px_8.306px_0px_rgba(192,189,197,0.01),inset_5.855px_6.831px_9.836px_0px_rgba(192,189,197,0.01),inset_5.855px_10.538px_13.333px_0px_rgba(192,189,197,0.01),inset_-3.903px_-12.295px_14.207px_0px_rgba(253,252,254,0.02),inset_-3.903px_-7.188px_9.327px_0px_rgba(253,252,254,0.01),inset_-3.903px_-6.121px_7.656px_0px_rgba(253,252,254,0.01),inset_-3.903px_-5.546px_6.594px_0px_rgba(253,252,254,0.01)]" />
            </div>
            <div className="absolute h-[108.667px] left-[532.36px] overflow-clip pointer-events-none rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:106" data-name="Mosaic tile / 1-4">
              <div aria-hidden className="absolute bg-[#fafbfb] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="106:80" data-name="Soft relief / continuous center">
                <div aria-hidden className="absolute bg-[#f9fafb] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(184,193,199,0),inset_4.432px_4.136px_6.287px_0px_rgba(184,193,199,0),inset_4.432px_5.17px_7.445px_0px_rgba(184,193,199,0),inset_4.432px_7.977px_10.092px_0px_rgba(184,193,199,0),inset_-2.954px_-9.306px_10.754px_0px_rgba(251,253,254,0),inset_-2.954px_-5.441px_7.06px_0px_rgba(251,253,254,0),inset_-2.954px_-4.633px_5.795px_0px_rgba(251,253,254,0),inset_-2.954px_-4.198px_4.991px_0px_rgba(251,253,254,0)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_6.831px_9.836px_0px_rgba(184,193,199,0),inset_5.855px_10.538px_13.333px_0px_rgba(184,193,199,0),inset_-3.903px_-12.295px_14.207px_0px_rgba(251,253,254,0),inset_-3.903px_-7.188px_9.327px_0px_rgba(251,253,254,0),inset_-3.903px_-6.121px_7.656px_0px_rgba(251,253,254,0),inset_-3.903px_-5.546px_6.594px_0px_rgba(251,253,254,0)]" />
            </div>
            <div className="absolute h-[108.667px] left-[661.45px] top-[136.67px] w-[117.091px]" data-node-id="94:107" data-name="Mosaic tile / 1-5">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile15} />
            </div>
            <div className="absolute h-[108.667px] left-[790.55px] overflow-clip rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:108" data-name="Mosaic tile / 1-6">
              <div aria-hidden className="absolute bg-[#fbfbfb] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#fbfafa] left-[23.77px] rounded-[27.28px] shadow-[4.432px_7.977px_11.085px_0px_rgba(199,191,188,0.01),4.432px_3.545px_5.625px_0px_rgba(199,191,188,0),4.432px_4.136px_6.287px_0px_rgba(199,191,188,0),4.432px_5.17px_7.445px_0px_rgba(199,191,188,0),-2.954px_-9.306px_10.754px_0px_rgba(254,252,252,0.01),-2.954px_-5.441px_7.06px_0px_rgba(254,252,252,0.01),-2.954px_-4.633px_5.795px_0px_rgba(254,252,252,0),-2.954px_-4.198px_4.991px_0px_rgba(254,252,252,0)] size-[69.547px] top-[19.56px]" data-node-id="106:82" data-name="Soft relief / continuous center" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(199,191,188,0),inset_5.855px_5.464px_8.306px_0px_rgba(199,191,188,0),inset_5.855px_6.831px_9.836px_0px_rgba(199,191,188,0),inset_5.855px_10.538px_13.333px_0px_rgba(199,191,188,0.01),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,252,252,0.01),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,252,252,0.01),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,252,252,0),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,252,252,0)]" />
            </div>
            <div className="absolute h-[108.667px] left-[919.64px] overflow-clip pointer-events-none rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:109" data-name="Mosaic tile / 1-7">
              <div aria-hidden className="absolute bg-[#fbfbf9] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="106:83" data-name="Soft relief / continuous center">
                <div aria-hidden className="absolute bg-[#fafaf7] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(197,195,184,0.01),inset_4.432px_4.136px_6.287px_0px_rgba(197,195,184,0.01),inset_4.432px_5.17px_7.445px_0px_rgba(197,195,184,0.01),inset_4.432px_7.977px_10.092px_0px_rgba(197,195,184,0.02),inset_-2.954px_-9.306px_10.754px_0px_rgba(254,253,251,0.03),inset_-2.954px_-5.441px_7.06px_0px_rgba(254,253,251,0.02),inset_-2.954px_-4.633px_5.795px_0px_rgba(254,253,251,0.02),inset_-2.954px_-4.198px_4.991px_0px_rgba(254,253,251,0.01)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(197,195,184,0.01),inset_5.855px_5.464px_8.306px_0px_rgba(197,195,184,0.01),inset_5.855px_6.831px_9.836px_0px_rgba(197,195,184,0.01),inset_5.855px_10.538px_13.333px_0px_rgba(197,195,184,0.02),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,253,251,0.03),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,253,251,0.02),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,253,251,0.02),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,253,251,0.01)]" />
            </div>
            <div className="absolute h-[108.667px] left-[1048.73px] top-[136.67px] w-[117.091px]" data-node-id="94:110" data-name="Mosaic tile / 1-8">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile18} />
            </div>
            <div className="absolute h-[108.667px] left-[1177.82px] overflow-clip rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:113" data-name="Mosaic tile / 1-9">
              <div aria-hidden className="absolute bg-[#f6f9fb] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#eff6fa] left-[23.77px] rounded-[29.48px] shadow-[4.432px_7.977px_11.085px_0px_rgba(184,193,199,0.21),4.432px_3.545px_5.625px_0px_rgba(184,193,199,0.11),4.432px_4.136px_6.287px_0px_rgba(184,193,199,0.13),4.432px_5.17px_7.445px_0px_rgba(184,193,199,0.15),-2.954px_-9.306px_10.754px_0px_rgba(251,253,254,0.26),-2.954px_-5.441px_7.06px_0px_rgba(251,253,254,0.19),-2.954px_-4.633px_5.795px_0px_rgba(251,253,254,0.16),-2.954px_-4.198px_4.991px_0px_rgba(251,253,254,0.13)] size-[69.547px] top-[19.56px]" data-node-id="99:88" data-name="Soft raised tile / supplied outer shadow" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(184,193,199,0.11),inset_5.855px_5.464px_8.306px_0px_rgba(184,193,199,0.13),inset_5.855px_6.831px_9.836px_0px_rgba(184,193,199,0.15),inset_5.855px_10.538px_13.333px_0px_rgba(184,193,199,0.21),inset_-3.903px_-12.295px_14.207px_0px_rgba(251,253,254,0.26),inset_-3.903px_-7.188px_9.327px_0px_rgba(251,253,254,0.19),inset_-3.903px_-6.121px_7.656px_0px_rgba(251,253,254,0.16),inset_-3.903px_-5.546px_6.594px_0px_rgba(251,253,254,0.13)]" />
            </div>
            <div className="absolute h-[108.667px] left-[1306.91px] overflow-clip pointer-events-none rounded-[10px] top-[136.67px] w-[117.091px]" data-node-id="94:115" data-name="Mosaic tile / 1-10">
              <div aria-hidden className="absolute bg-[#f5f9f7] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="99:89" data-name="Recessed panel / supplied inner shadow">
                <div aria-hidden className="absolute bg-[#edf5f1] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(187,195,191,0.16),inset_4.432px_4.136px_6.287px_0px_rgba(187,195,191,0.19),inset_4.432px_5.17px_7.445px_0px_rgba(187,195,191,0.23),inset_4.432px_7.977px_10.092px_0px_rgba(187,195,191,0.32),inset_-2.954px_-9.306px_10.754px_0px_rgba(252,253,252,0.4),inset_-2.954px_-5.441px_7.06px_0px_rgba(252,253,252,0.29),inset_-2.954px_-4.633px_5.795px_0px_rgba(252,253,252,0.24),inset_-2.954px_-4.198px_4.991px_0px_rgba(252,253,252,0.2)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(187,195,191,0.16),inset_5.855px_5.464px_8.306px_0px_rgba(187,195,191,0.19),inset_5.855px_6.831px_9.836px_0px_rgba(187,195,191,0.23),inset_5.855px_10.538px_13.333px_0px_rgba(187,195,191,0.32),inset_-3.903px_-12.295px_14.207px_0px_rgba(252,253,252,0.4),inset_-3.903px_-7.188px_9.327px_0px_rgba(252,253,252,0.29),inset_-3.903px_-6.121px_7.656px_0px_rgba(252,253,252,0.24),inset_-3.903px_-5.546px_6.594px_0px_rgba(252,253,252,0.2)]" />
            </div>
            <div className="absolute h-[108.667px] left-[16px] overflow-clip pointer-events-none rounded-[10px] top-[257.33px] w-[117.091px]" data-node-id="94:117" data-name="Mosaic tile / 2-0">
              <div aria-hidden className="absolute bg-[#faf9f3] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="99:90" data-name="Recessed panel / supplied inner shadow">
                <div aria-hidden className="absolute bg-[#f7f5ea] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(197,195,184,0.14),inset_4.432px_4.136px_6.287px_0px_rgba(197,195,184,0.16),inset_4.432px_5.17px_7.445px_0px_rgba(197,195,184,0.2),inset_4.432px_7.977px_10.092px_0px_rgba(197,195,184,0.27),inset_-2.954px_-9.306px_10.754px_0px_rgba(254,253,251,0.34),inset_-2.954px_-5.441px_7.06px_0px_rgba(254,253,251,0.24),inset_-2.954px_-4.633px_5.795px_0px_rgba(254,253,251,0.2),inset_-2.954px_-4.198px_4.991px_0px_rgba(254,253,251,0.17)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(197,195,184,0.14),inset_5.855px_5.464px_8.306px_0px_rgba(197,195,184,0.16),inset_5.855px_6.831px_9.836px_0px_rgba(197,195,184,0.2),inset_5.855px_10.538px_13.333px_0px_rgba(197,195,184,0.27),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,253,251,0.34),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,253,251,0.24),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,253,251,0.2),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,253,251,0.17)]" />
            </div>
            <div className="absolute h-[108.667px] left-[145.09px] top-[257.33px] w-[117.091px]" data-node-id="94:119" data-name="Mosaic tile / 2-1">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile21} />
            </div>
            <div className="absolute h-[108.667px] left-[274.18px] overflow-clip rounded-[10px] top-[257.33px] w-[117.091px]" data-node-id="94:122" data-name="Mosaic tile / 2-2">
              <div aria-hidden className="absolute bg-[#f8fafb] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#f5f8fa] left-[23.77px] rounded-[29.48px] shadow-[4.432px_7.977px_11.085px_0px_rgba(184,193,199,0.06),4.432px_3.545px_5.625px_0px_rgba(184,193,199,0.03),4.432px_4.136px_6.287px_0px_rgba(184,193,199,0.04),4.432px_5.17px_7.445px_0px_rgba(184,193,199,0.04),-2.954px_-9.306px_10.754px_0px_rgba(251,253,254,0.07),-2.954px_-5.441px_7.06px_0px_rgba(251,253,254,0.05),-2.954px_-4.633px_5.795px_0px_rgba(251,253,254,0.04),-2.954px_-4.198px_4.991px_0px_rgba(251,253,254,0.04)] size-[69.547px] top-[19.56px]" data-node-id="99:92" data-name="Soft raised tile / supplied outer shadow" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(184,193,199,0.03),inset_5.855px_5.464px_8.306px_0px_rgba(184,193,199,0.04),inset_5.855px_6.831px_9.836px_0px_rgba(184,193,199,0.04),inset_5.855px_10.538px_13.333px_0px_rgba(184,193,199,0.06),inset_-3.903px_-12.295px_14.207px_0px_rgba(251,253,254,0.07),inset_-3.903px_-7.188px_9.327px_0px_rgba(251,253,254,0.05),inset_-3.903px_-6.121px_7.656px_0px_rgba(251,253,254,0.04),inset_-3.903px_-5.546px_6.594px_0px_rgba(251,253,254,0.04)]" />
            </div>
            <div className="absolute h-[108.667px] left-[403.27px] overflow-clip pointer-events-none rounded-[10px] top-[257.33px] w-[117.091px]" data-node-id="94:124" data-name="Mosaic tile / 2-3">
              <div aria-hidden className="absolute bg-[#fafbfb] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="106:84" data-name="Soft relief / continuous center">
                <div aria-hidden className="absolute bg-[#f9fafa] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(187,195,191,0.01),inset_4.432px_4.136px_6.287px_0px_rgba(187,195,191,0.01),inset_4.432px_5.17px_7.445px_0px_rgba(187,195,191,0.01),inset_4.432px_7.977px_10.092px_0px_rgba(187,195,191,0.01),inset_-2.954px_-9.306px_10.754px_0px_rgba(252,253,252,0.01),inset_-2.954px_-5.441px_7.06px_0px_rgba(252,253,252,0.01),inset_-2.954px_-4.633px_5.795px_0px_rgba(252,253,252,0.01),inset_-2.954px_-4.198px_4.991px_0px_rgba(252,253,252,0.01)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(187,195,191,0.01),inset_5.855px_5.464px_8.306px_0px_rgba(187,195,191,0.01),inset_5.855px_6.831px_9.836px_0px_rgba(187,195,191,0.01),inset_5.855px_10.538px_13.333px_0px_rgba(187,195,191,0.01),inset_-3.903px_-12.295px_14.207px_0px_rgba(252,253,252,0.01),inset_-3.903px_-7.188px_9.327px_0px_rgba(252,253,252,0.01),inset_-3.903px_-6.121px_7.656px_0px_rgba(252,253,252,0.01),inset_-3.903px_-5.546px_6.594px_0px_rgba(252,253,252,0.01)]" />
            </div>
            <div className="absolute h-[108.667px] left-[532.36px] top-[257.33px] w-[117.091px]" data-node-id="94:125" data-name="Mosaic tile / 2-4">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile24} />
            </div>
            <div className="absolute h-[108.667px] left-[661.45px] overflow-clip rounded-[10px] top-[257.33px] w-[117.091px]" data-node-id="94:126" data-name="Mosaic tile / 2-5">
              <div aria-hidden className="absolute bg-[#fbfbfb] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#fbfbfb] left-[23.77px] rounded-[27.28px] shadow-[4.432px_7.977px_11.085px_0px_rgba(197,195,184,0),4.432px_3.545px_5.625px_0px_rgba(197,195,184,0),4.432px_4.136px_6.287px_0px_rgba(197,195,184,0),4.432px_5.17px_7.445px_0px_rgba(197,195,184,0),-2.954px_-9.306px_10.754px_0px_rgba(254,253,251,0),-2.954px_-5.441px_7.06px_0px_rgba(254,253,251,0),-2.954px_-4.633px_5.795px_0px_rgba(254,253,251,0),-2.954px_-4.198px_4.991px_0px_rgba(254,253,251,0)] size-[69.547px] top-[19.56px]" data-node-id="106:86" data-name="Soft relief / continuous center" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(197,195,184,0),inset_5.855px_5.464px_8.306px_0px_rgba(197,195,184,0),inset_5.855px_6.831px_9.836px_0px_rgba(197,195,184,0),inset_5.855px_10.538px_13.333px_0px_rgba(197,195,184,0),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,253,251,0),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,253,251,0),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,253,251,0),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,253,251,0)]" />
            </div>
            <div className="absolute h-[108.667px] left-[790.55px] overflow-clip pointer-events-none rounded-[10px] top-[257.33px] w-[117.091px]" data-node-id="94:127" data-name="Mosaic tile / 2-6">
              <div aria-hidden className="absolute bg-[#fbfbfb] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="106:87" data-name="Soft relief / continuous center">
                <div aria-hidden className="absolute bg-[#fbfbfb] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(192,189,197,0),inset_4.432px_4.136px_6.287px_0px_rgba(192,189,197,0),inset_4.432px_5.17px_7.445px_0px_rgba(192,189,197,0),inset_4.432px_7.977px_10.092px_0px_rgba(192,189,197,0),inset_-2.954px_-9.306px_10.754px_0px_rgba(253,252,254,0.01),inset_-2.954px_-5.441px_7.06px_0px_rgba(253,252,254,0),inset_-2.954px_-4.633px_5.795px_0px_rgba(253,252,254,0),inset_-2.954px_-4.198px_4.991px_0px_rgba(253,252,254,0)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(192,189,197,0),inset_5.855px_5.464px_8.306px_0px_rgba(192,189,197,0),inset_5.855px_6.831px_9.836px_0px_rgba(192,189,197,0),inset_5.855px_10.538px_13.333px_0px_rgba(192,189,197,0),inset_-3.903px_-12.295px_14.207px_0px_rgba(253,252,254,0.01),inset_-3.903px_-7.188px_9.327px_0px_rgba(253,252,254,0),inset_-3.903px_-6.121px_7.656px_0px_rgba(253,252,254,0),inset_-3.903px_-5.546px_6.594px_0px_rgba(253,252,254,0)]" />
            </div>
            <div className="absolute h-[108.667px] left-[919.64px] top-[257.33px] w-[117.091px]" data-node-id="94:128" data-name="Mosaic tile / 2-7">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile27} />
            </div>
            <div className="absolute h-[108.667px] left-[1048.73px] overflow-clip rounded-[10px] top-[257.33px] w-[117.091px]" data-node-id="94:129" data-name="Mosaic tile / 2-8">
              <div aria-hidden className="absolute bg-[#f9fafa] inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute bg-[#f6f9f8] left-[23.77px] rounded-[29.48px] shadow-[4.432px_7.977px_11.085px_0px_rgba(187,195,191,0.08),4.432px_3.545px_5.625px_0px_rgba(187,195,191,0.04),4.432px_4.136px_6.287px_0px_rgba(187,195,191,0.05),4.432px_5.17px_7.445px_0px_rgba(187,195,191,0.06),-2.954px_-9.306px_10.754px_0px_rgba(252,253,252,0.1),-2.954px_-5.441px_7.06px_0px_rgba(252,253,252,0.07),-2.954px_-4.633px_5.795px_0px_rgba(252,253,252,0.06),-2.954px_-4.198px_4.991px_0px_rgba(252,253,252,0.05)] size-[69.547px] top-[19.56px]" data-node-id="99:93" data-name="Soft raised tile / supplied outer shadow" />
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(187,195,191,0.04),inset_5.855px_5.464px_8.306px_0px_rgba(187,195,191,0.05),inset_5.855px_6.831px_9.836px_0px_rgba(187,195,191,0.06),inset_5.855px_10.538px_13.333px_0px_rgba(187,195,191,0.08),inset_-3.903px_-12.295px_14.207px_0px_rgba(252,253,252,0.1),inset_-3.903px_-7.188px_9.327px_0px_rgba(252,253,252,0.07),inset_-3.903px_-6.121px_7.656px_0px_rgba(252,253,252,0.06),inset_-3.903px_-5.546px_6.594px_0px_rgba(252,253,252,0.05)]" />
            </div>
            <div className="absolute h-[108.667px] left-[1177.82px] overflow-clip pointer-events-none rounded-[10px] top-[257.33px] w-[117.091px]" data-node-id="94:131" data-name="Mosaic tile / 2-9">
              <div aria-hidden className="absolute bg-[#fbf8f7] inset-0 rounded-[10px]" />
              <div className="absolute left-[23.77px] rounded-[10px] size-[69.547px] top-[19.56px]" data-node-id="99:94" data-name="Recessed panel / supplied inner shadow">
                <div aria-hidden className="absolute bg-[#faf5f3] inset-0 rounded-[10px]" />
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_4.432px_3.545px_5.625px_0px_rgba(199,191,188,0.11),inset_4.432px_4.136px_6.287px_0px_rgba(199,191,188,0.13),inset_4.432px_5.17px_7.445px_0px_rgba(199,191,188,0.15),inset_4.432px_7.977px_10.092px_0px_rgba(199,191,188,0.21),inset_-2.954px_-9.306px_10.754px_0px_rgba(254,252,252,0.26),inset_-2.954px_-5.441px_7.06px_0px_rgba(254,252,252,0.19),inset_-2.954px_-4.633px_5.795px_0px_rgba(254,252,252,0.16),inset_-2.954px_-4.198px_4.991px_0px_rgba(254,252,252,0.13)]" />
              </div>
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_5.855px_4.684px_7.432px_0px_rgba(199,191,188,0.11),inset_5.855px_5.464px_8.306px_0px_rgba(199,191,188,0.13),inset_5.855px_6.831px_9.836px_0px_rgba(199,191,188,0.15),inset_5.855px_10.538px_13.333px_0px_rgba(199,191,188,0.21),inset_-3.903px_-12.295px_14.207px_0px_rgba(254,252,252,0.26),inset_-3.903px_-7.188px_9.327px_0px_rgba(254,252,252,0.19),inset_-3.903px_-6.121px_7.656px_0px_rgba(254,252,252,0.16),inset_-3.903px_-5.546px_6.594px_0px_rgba(254,252,252,0.13)]" />
            </div>
            <div className="absolute h-[108.667px] left-[1306.91px] top-[257.33px] w-[117.091px]" data-node-id="94:133" data-name="Mosaic tile / 2-10">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMosaicTile210} />
            </div>
          </div>
  );
  return <>{cloneElement(mosaic, { children: Children.map(mosaic.props.children, (tile, index) => <ReliefTile key={index} tile={tile} index={index} />) })}<HeaderFollower /></>;
}

