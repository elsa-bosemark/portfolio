import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaperAction from "../components/PaperAction";

afterEach(cleanup);
describe("shared paper actions", () => {
  it("supports an accessible native action button with the same secondary styling", () => {
    const click = vi.fn();
    render(<PaperAction secondary onClick={click} label="Back to top">Back to top</PaperAction>);
    const button = screen.getByRole("button", { name: "Back to top" });
    expect(button).toHaveClass("paper-action", "paper-action--secondary");
    fireEvent.click(button);
    expect(click).toHaveBeenCalledOnce();
  });
  it("uses the same button styling for linked actions and image overlays", () => {
    const { container } = render(<MemoryRouter>
      <PaperAction to="/" secondary>Secondary action</PaperAction>
      <PaperAction presentation secondary className="paper-case-cursor">View case study</PaperAction>
    </MemoryRouter>);
    const link = screen.getByRole("link");
    const overlay = container.querySelector(".paper-case-cursor")!;
    for (const element of [link, overlay]) {
      expect(element).toHaveClass("paper-action", "paper-action--secondary");
      expect(element.querySelector("svg")).toHaveAttribute("width", "17");
    }
    expect(overlay.tagName).toBe("SPAN");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });
});
