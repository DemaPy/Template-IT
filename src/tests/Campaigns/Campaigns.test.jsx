import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Campaigns from "../../pages/Campaigns/Campaigns";
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

describe("Test Campaigns component", () => {
  it("Campaigns component has been rendered", () => {
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
});
