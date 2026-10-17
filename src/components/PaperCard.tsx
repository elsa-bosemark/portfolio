import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./PaperCard.css";

export default function PaperCard({ children, className = "", flush = false, to }: {
  children: ReactNode; className?: string; flush?: boolean; to?: string;
}) {
  const classes = `paper-card${flush ? " paper-card--media" : ""}${className ? ` ${className}` : ""}`;
  return to ? <Link to={to} className={classes}>{children}</Link> : <div className={classes}>{children}</div>;
}
