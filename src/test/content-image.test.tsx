import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContentImage from "../components/ContentImage";

describe("incremental content images", () => {
  it("reserves space and reveals independently of page text", () => {
    render(<><p>Page content</p><ContentImage src="/example.png" alt="Example" width={800} height={600} /></>);
    const image = screen.getByRole("img");
    expect(screen.getByText("Page content")).toBeVisible();
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("width", "800");
    expect(image).toHaveAttribute("data-ready", "false");
    fireEvent.load(image);
    expect(image).toHaveAttribute("data-ready", "true");
  });
  it("lets hero images load eagerly and clears the loading treatment on failure", () => {
    render(<ContentImage src="/hero.png" alt="Hero" loading="eager" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("loading", "eager");
    fireEvent.error(image);
    expect(image).toHaveAttribute("data-ready", "true");
  });
});
