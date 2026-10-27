import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage2027 from "../components/Homepage2027";
import SiteFooter from "../components/SiteFooter";

vi.mock("../components/GlassPointer", () => ({ default: () => null }));

describe("Figma homepage", () => {
  const scrollIntoView = vi.fn();
  beforeEach(() => { Element.prototype.scrollIntoView = scrollIntoView; scrollIntoView.mockClear(); });
  afterEach(cleanup);

  it("renders four featured projects without exposing the internal Amazon tool name", () => {
    render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: "Hi, I’m Elsa" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Selected work" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "NDA-protected work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Public case studies" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI workflows for branded content" })).toBeInTheDocument();
    expect(screen.queryByText(/A\+ Content Manager/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View SafeBites case study" })).not.toBeInTheDocument();
    for (const [project, slug] of [["Carta", "carta"], ["Focal", "focal"]]) {
      expect(screen.getByRole("link", { name: `View ${project} case study` })).toHaveAttribute("href", `/case-study/${slug}`);
    }
  });

  it("uses the updated introduction and Experience titles in the work subtitles", () => {
    const { container } = render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    expect(container.querySelector(".paper-lead")).toHaveTextContent(/^Product designer focused on AI interactions/);
    for (const subtitle of [
      "Member of Technical Staff · Intern · Summer 2026",
      "User Experience Designer · Intern · Summer 2025",
      "Design Lead · UI/UX Designer · 2024–2026",
      "Product Designer · Intern · Summer 2024",
    ]) expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Side projects" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View National Park Service case study" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View Big Local News case study" })).not.toBeInTheDocument();
  });

  it("scrolls local navigation without following a conflicting hash route", () => {
    render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    const about = screen.getByRole("link", { name: "About" });
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    fireEvent(about, event);
    expect(event.defaultPrevented).toBe(true);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("keeps the résumé and LinkedIn links external and safely opened", () => {
    render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    for (const name of [/View résumé/, /Connect on LinkedIn/]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("sends the header connection link to the footer rather than the introduction", () => {
    const { container } = render(<MemoryRouter><Homepage2027 /><SiteFooter /></MemoryRouter>);
    const footer = container.querySelector("footer#connect")!;
    const scroll = vi.fn();
    footer.scrollIntoView = scroll;
    expect(container.querySelectorAll("#connect")).toHaveLength(1);
    fireEvent.click(screen.getByRole("link", { name: "Contact" }));
    expect(scroll).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("retains the interactive AI cursor and two introduction highlights", () => {
    const { container } = render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    const cursor = screen.getByRole("button", { name: "Highlight the introduction" });
    expect(cursor).toHaveAttribute("aria-pressed", "false");
    expect(container.querySelectorAll(".cursor-highlight")).toHaveLength(2);
    fireEvent.click(cursor);
    expect(screen.getByRole("button", { name: "Remove the introduction highlights" })).toHaveAttribute("aria-pressed", "true");
  });

  it("does not include an audio toggle", () => {
    render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    expect(screen.queryByRole("button", { name: /sound effects/i })).not.toBeInTheDocument();
  });

  it("reverses cutout relief and restores it on a second click", () => {
    const { container } = render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    const cutouts = screen.getAllByRole("button", { name: /Reverse paper cutout/ });
    expect(cutouts).toHaveLength(33);
    const image = cutouts[0].querySelector("img")!;
    const original = image.getAttribute("src");
    fireEvent.click(cutouts[0]);
    expect(cutouts[0]).toHaveAttribute("aria-pressed", "true");
    expect(image).toHaveAttribute("src", original);
    const alternate = cutouts[0].querySelector<HTMLImageElement>("img.paper-relief-alternate")!;
    expect(alternate.src).toMatch(/^data:image\/svg\+xml/);
    const svg = decodeURIComponent(alternate.src.split(",").slice(1).join(","));
    expect(svg).not.toContain("undefined");
    const outerFilter = svg.match(/<filter id="filter0_[\s\S]*?<\/filter>/)?.[0];
    expect(outerFilter).toContain('operator="arithmetic"');
    expect(outerFilter).toContain('result="effect8_innerShadow');
    fireEvent.click(cutouts[0]);
    expect(cutouts[0]).toHaveAttribute("aria-pressed", "false");
    expect(image).toHaveAttribute("src", original);
    expect(container.querySelector(".paper-masthead .paper-header-follower")).toBeInTheDocument();
  });
});
