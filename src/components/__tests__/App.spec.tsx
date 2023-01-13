import { render, screen, waitFor } from "@testing-library/react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../App";

jest.mock("../../routers/LoggedOutRouter", () => () => "logged-out");
jest.mock("../../routers/LoggedInRouter", () => () => "logged-in");

describe("App", () => {
  it("renders LoggedOutRouter", () => {
    render(<App />);
    screen.getByText("logged-out");
  });
  it("renders LoggedInRouter", async () => {
    render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
      screen.getByText("logged-in");
    });
  });
});
