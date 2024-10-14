import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Campaigns from "../../pages/Campaigns/Campaigns";
import { expect, it } from "vitest";
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

describe("Test Campaigns component", () => {
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
  it("Campaigns component has been rendered", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Campaigns")).toBeInTheDocument();
  });

  it("Campaigns component match snapshot", () => {
    const result = render(<RouterProvider router={router} />);
    expect(result).toMatchSnapshot();
  });
});
