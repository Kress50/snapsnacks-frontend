/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import { Logo } from "../UI/Logo";

describe("Logo", () => {
  it("renders with props", () => {
    const { container } = render(<Logo size="test" />);
    expect(container.firstChild).toHaveClass("test");
  });
});
