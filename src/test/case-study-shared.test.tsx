import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CaseStudyNextProjects from "../components/CaseStudyNextProjects";
import CaseStudyGradient from "../components/CaseStudyGradient";

describe("shared case-study elements", () => {
  it("shows the other projects and a home action", () => {
    render(<MemoryRouter><CaseStudyNextProjects current="carta" /></MemoryRouter>);
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "View case study" })).toHaveAttribute("href", "/case-study/focal");
    expect(screen.queryByRole("link", { name: /COVID-19/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/");
  });

  it("renders case-study gradients without a canvas", () => {
    const { container } = render(<CaseStudyGradient project="carta" />);
    expect(container.querySelector("canvas")).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(container.firstElementChild).toHaveClass("folio-project-gradient");
  });
});
