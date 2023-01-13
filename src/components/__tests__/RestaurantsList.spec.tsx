/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import RestaurantsList from "../RestaurantsList";

describe("RestaurantsList", () => {
  it("renders with props", () => {
    render(<RestaurantsList data={undefined} />);
  });
});
