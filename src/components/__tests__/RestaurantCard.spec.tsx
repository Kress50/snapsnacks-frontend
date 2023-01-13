/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import RestaurantCard from "../UI/RestaurantCard";

describe("RestaurantCard", () => {
  it("renders with props", () => {
    render(
      <RestaurantCard
        id={1}
        image="test.jpg"
        name="nameTest"
        categoryName="categoryTest"
      />
    );
    screen.getByText("nameTest");
    screen.getByText("categoryTest");
  });
});
