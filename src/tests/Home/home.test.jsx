import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Home from "../../pages/Home/Home";

afterEach(cleanup);

describe("A truthy statement", () => {
  it("should be equal to 2", () => {
    expect(1 + 1).toEqual(2);
  });
  it("should render Home component", () => {
    render(<Home />);
    screen.debug();
  });
});
