import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProgressiveImage from "../components/ProgressiveImage";

afterEach(cleanup);
describe("progressive images", () => {
  it("keeps a loading surface until the image loads", () => {
    render(<ProgressiveImage src="/example.png" alt="Project overview" width={800} height={600} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(screen.getByRole("status")).toHaveTextContent("Loading image");
    fireEvent.load(image);
    expect(image).toHaveAttribute("data-ready", "true");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
  it("shows an honest error rather than an endless loader", () => {
    render(<ProgressiveImage src="/missing.png" alt="Project overview" />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status")).toHaveTextContent("Image unavailable");
  });
});
