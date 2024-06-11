import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Templates from "../pages/Templates/Templates";
import WithNavBar from "../layouts/WithNavBar";
import Template from "../pages/Templates/pages/Template";
import Token from "../pages/Token/Token";
import LoginGuard from "@/guards/Login";
import Campaigns from "@/pages/Campaigns/Campaigns";
import Campaign from "@/pages/Campaigns/pages/Campaign";
import Components from "@/pages/Components/Components";
import Component from "@/pages/Components/pages/Component";
import Login from "@/pages/Login/Login";
import Error from "@/pages/Error/Error";
import Access from "@/pages/Access/Access";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WithNavBar />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/templates",
        element: <LoginGuard><Templates /></LoginGuard>,
      },
      {
        path: "/templates/:id",
        element: <LoginGuard><Template /></LoginGuard>,
      },
      {
        path: "/campaigns",
        element: <LoginGuard><Campaigns /></LoginGuard>,
      },
      {
        path: "/campaigns/:id",
        element: <LoginGuard><Campaign /></LoginGuard>,
      },
      {
        path: "/components",
        element: <LoginGuard><Components /></LoginGuard>,
      },
      {
        path: "/components/:id",
        element: <LoginGuard><Component /></LoginGuard>,
      },
      {
        path: "/token/",
        element: <Token />,
      },
      {
        path: "/access-denied/",
        element: <Access />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
