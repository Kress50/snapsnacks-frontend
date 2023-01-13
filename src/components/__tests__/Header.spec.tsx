/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "@testing-library/react";
import Header from "../Header";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { ME_QUERY } from "../../hooks/useMeQuery";

describe("Header", () => {
  it("renders verify banner", async () => {
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      render(
        <BrowserRouter>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: ME_QUERY,
                },
                result: {
                  data: {
                    me: {
                      id: 1,
                      email: "",
                      role: "",
                      verified: false,
                    },
                  },
                },
              },
            ]}
          >
            <Header />
          </MockedProvider>
        </BrowserRouter>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    screen.getByText("Please verify your email");
  });
});
