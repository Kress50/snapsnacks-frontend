/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import { FormError } from "../UI/FormError";

describe("FormError", () => {
  it("renders with props", () => {
    render(<FormError errorMessage="test" />);
    screen.getByText("test");
  });
});
