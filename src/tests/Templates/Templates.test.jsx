import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, it } from "vitest";
import Templates from "../../pages/Templates/Templates";
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

describe("Test Templates component", () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <QueryClientProvider client={queryClient}>
          <Templates />
        </QueryClientProvider>
      ),
    },
  ]);
  it("Templates component has been rendered", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Templates")).toBeInTheDocument();
  });

  it("Templates component match snapshot", () => {
    const result = render(<RouterProvider router={router} />);
    expect(result).toMatchSnapshot()
  })
});
