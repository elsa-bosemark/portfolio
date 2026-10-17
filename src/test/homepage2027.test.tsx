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

  it("renders all five projects without exposing the internal Amazon tool name", () => {
    render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: "Hi, I’m Elsa" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "NDA-protected work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI workflows for branded content" })).toBeInTheDocument();
    expect(screen.queryByText(/A\+ Content Manager/)).not.toBeInTheDocument();
    for (const project of ["Carta", "Focal", "SafeBites"]) {
      expect(screen.getByRole("link", { name: `View ${project} case study` })).toHaveAttribute("href", `/case-study/${project.toLowerCase()}`);
    }
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
    fireEvent.click(screen.getByRole("link", { name: "Let’s connect" }));
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

  it("offers a stable sound toggle in the header navigation", () => {
    const { container } = render(<MemoryRouter><Homepage2027 /></MemoryRouter>);
    const button = container.querySelector<HTMLButtonElement>(".paper-navigation .paper-sound-toggle")!;
    expect(button).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-label", "Enable sound effects");
    expect(localStorage.getItem("portfolio-sound")).toBe("off");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-label", "Mute sound effects");
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
