import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
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
  it("Templates component has been rendered", () => {
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
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Templates")).toBeInTheDocument();
  });
});
