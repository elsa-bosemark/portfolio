import { useState, type ImgHTMLAttributes } from "react";

/** Preserves the parent's image layout while offering a quiet loading surface. */
export default function ProgressiveImage({ className = "", alt = "", onLoad, onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  return <>
    <img {...props} alt={alt} loading={props.loading ?? "lazy"} decoding="async"
      ref={image => { if (image?.complete && image.naturalWidth > 0 && state === "loading") setState("ready"); }}
      className={`progressive-image ${className}`} data-ready={state === "ready"}
      onLoad={event => { setState("ready"); onLoad?.(event); }}
      onError={event => { setState("error"); onError?.(event); }} />
    {state !== "ready" && <span className="image-loading" role="status"><span>{state === "error" ? "Image unavailable" : "Loading image…"}</span></span>}
  </>;
}
