import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Campaigns from "../../pages/Campaigns/Campaigns";
import Campaign from "../../pages/Campaigns/pages/Campaign";
import { expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

afterEach(cleanup);
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
  },
});

describe("Test Main Components", () => {
  it("should render Campaigns component", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <QueryClientProvider client={queryClient}>
            <Campaigns />
          </QueryClientProvider>
        ),
      },
    ]);
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Campaigns")).toBeInTheDocument();
  });

  it("should render Campaigns loading skeleton", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <QueryClientProvider client={queryClient}>
            <Campaigns />
          </QueryClientProvider>
        ),
      },
    ]);
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("campaigns-loading")).toBeInTheDocument();
  });

  it("should render Campaign component", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <QueryClientProvider client={queryClient}>
            <Campaign />
          </QueryClientProvider>
        ),
      },
    ]);
    render(<RouterProvider router={router} />);
  });

  it("should render Campaign loading skeleton", () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <QueryClientProvider client={queryClient}>
            <Campaigns />
          </QueryClientProvider>
        ),
      },
    ]);
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("campaigns-loading")).toBeInTheDocument();
  });
});
