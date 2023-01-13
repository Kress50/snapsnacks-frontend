/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import Category from "../UI/Category";

describe("Category", () => {
  it("renders with props", () => {
    render(<Category image="test.jpg" name="test" />);
    screen.getByText("test");
    const img = document.querySelector("img") as HTMLImageElement;
    expect(img.src).toContain("test.jpg");
  });
});
