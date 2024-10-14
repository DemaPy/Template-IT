import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, it } from "vitest";
import Components from "../../pages/Components/Components";
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

describe("Test Components component", () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <QueryClientProvider client={queryClient}>
          <Components />
        </QueryClientProvider>
      ),
    },
  ]);
  it("Components component has been rendered", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("Components component match snapshot", () => {
    const result = render(<RouterProvider router={router} />);
    expect(result).toMatchSnapshot();
  });
});
