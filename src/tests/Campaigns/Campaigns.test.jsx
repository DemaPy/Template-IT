import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Campaigns from "../../pages/Campaigns/Campaigns";
import Campaign from "../../pages/Campaigns/pages/Campaign";
import { expect } from "vitest";

afterEach(cleanup);

describe("A truthy statement", () => {
  it("should be equal to 2", () => {
    expect(1 + 1).toEqual(2);
  });
  it("should render Campaigns component", () => {
    render(<Campaigns />);
    expect(screen.getByText("Campaigns")).toBeInTheDocument()
    expect(screen.getByText("create")).toBeInTheDocument()
  });
  it("should render Campaign component", () => {
    render(<Campaign />);
    screen.debug();
  });
});
