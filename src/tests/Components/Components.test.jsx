import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
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
  it("Components component has been rendered", () => {
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
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Components")).toBeInTheDocument();
  });
});
