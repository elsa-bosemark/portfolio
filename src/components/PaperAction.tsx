import type { ReactNode, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./PaperAction.css";

export const resumeUrl = "https://drive.google.com/file/d/16_tL-tuJBZhH0Asrn7B6ovjwlVOgvQiC/view?usp=drive_link";
export const linkedinUrl = "https://www.linkedin.com/in/elsa-bosemark/";

export default function PaperAction({ children, href, to, secondary = false, presentation = false, className: extraClass = "", onClick, icon, label }: {
  children: ReactNode; href?: string; to?: string; secondary?: boolean; presentation?: boolean; className?: string; onClick?: MouseEventHandler<HTMLButtonElement>; icon?: ReactNode; label?: string;
}) {
  const className = `paper-action${secondary ? " paper-action--secondary" : ""}${extraClass ? ` ${extraClass}` : ""}`;
  const content = <>{children}{icon ?? <ArrowUpRight size={17} aria-hidden="true" />}</>;
  // An image link can show the same action without nesting another interactive link.
  if (presentation) return <span className={className} aria-hidden="true">{content}</span>;
  if (onClick) return <button type="button" className={className} onClick={onClick} aria-label={label}>{content}</button>;
  return to ? <Link className={className} to={to}>{content}</Link>
    : <a className={className} href={href} target="_blank" rel="noopener noreferrer">{content}<span className="sr-only"> (opens in a new tab)</span></a>;
}
