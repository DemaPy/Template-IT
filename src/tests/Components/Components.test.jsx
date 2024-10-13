import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Components from "../../pages/Components/Components";
import Component from "../../pages/Components/pages/Component";

afterEach(cleanup);

describe("A truthy statement", () => {
  it("should render Components component", () => {
    render(<Components />);
    expect(screen.getByText("Components")).toBeInTheDocument()
  });

  it("should render Component component", () => {
    const result = render(<Component />);
    const testId = result.container.querySelector('data-test-id')
    expect(testId).toBe("component-sidebar")
  });
});
