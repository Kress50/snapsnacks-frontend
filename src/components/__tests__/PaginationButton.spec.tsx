/* eslint-disable testing-library/no-node-access */
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { fireEvent, render } from "@testing-library/react";
import PaginationButton from "../UI/PaginationButton";

describe("PaginationButton", () => {
  it("renders with props", () => {
    const mockFunction = jest.fn();
    render(<PaginationButton arrow={faArrowDown} func={mockFunction} />);
    const button = document.querySelector("button") as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockFunction).toBeCalledTimes(1);
  });
});
