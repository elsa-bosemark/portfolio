import { useEffect, useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisplayPreferences } from "./DisplayPreferences";
import "./SiteNavigation.css";

export default function SiteNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { reduced } = useDisplayPreferences();
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === "/";
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (home || target === "connect") {
      document.getElementById(target)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    } else navigate("/", { state: { scrollTo: target } });
  };
  return <nav className={`paper-navigation${home ? "" : " paper-navigation--page"}`} data-scrolled={scrolled} aria-label="Main navigation">
    <div className="paper-navigation-pill">
      <a href="#/" onClick={event => jumpTo(event, "work")}>Work</a>
      <a href="#/" onClick={event => jumpTo(event, "about")}>About</a>
      <a href={home ? "#connect" : "#/"} onClick={event => jumpTo(event, "connect")}>Let’s connect</a>
    </div>
  </nav>;
}
