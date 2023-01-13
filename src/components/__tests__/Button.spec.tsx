/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import { Button } from "../UI/Button";

describe("Button", () => {
  it("renders with props", () => {
    render(<Button canClick={true} actionText="test" loading={false} />);
    screen.getByText("test");
  });
  it("renders with loading text", () => {
    const { container } = render(
      <Button canClick={false} actionText="" loading={true} />
    );
    expect(container.firstChild).toHaveClass("pointer-events-none");
    screen.getByText("Loading...");
  });
});
