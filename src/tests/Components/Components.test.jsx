import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Components from "../../pages/Components/Components";
import Component from "../../pages/Components/pages/Component";

afterEach(cleanup);

describe("A truthy statement", () => {
  it("should be equal to 2", () => {
    expect(1 + 1).toEqual(2);
  });
  it("should render Components component", () => {
    render(<Components />);
    expect(screen.getByText("Components")).toBeInTheDocument()
  });
  it("should render Component component", () => {
    render(<Component />);
    screen.debug();
  });
});
