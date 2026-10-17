import { useState, type ImgHTMLAttributes } from "react";

/** Native lazy loading: text stays visible and intrinsic dimensions reserve space. */
export default function ContentImage({ className = "", onLoad, onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [ready, setReady] = useState(false);
  return <img {...props} loading={props.loading ?? "lazy"} decoding="async"
    className={`content-image ${className}`} data-ready={ready}
    ref={image => { if (image?.complete && image.naturalWidth && !ready) setReady(true); }}
    onLoad={event => { setReady(true); onLoad?.(event); }}
    onError={event => { setReady(true); onError?.(event); }} />;
}
