import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useLayoutEffect(() => {
    const target = state?.scrollTo && document.getElementById(state.scrollTo);
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
