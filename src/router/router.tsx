import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Templates from "../pages/Templates/Templates";
import WithNavBar from "../layouts/WithNavBar";
import Token from "../pages/Token/Token";
import LoginGuard from "@/guards/Login";
import Login from "@/pages/Login/Login";
import { ErrorPage } from "@/pages/Error/Error";
import Access from "@/pages/Access/Access";
import { Container } from "@/components/Container";
import { Suspense, lazy } from "react";
import TemplateSkeleton from "@/pages/Templates/pages/components/TemplateSkeleton";
import CampaignSkeleton from "@/pages/Campaigns/components/CampaignSkeleton";
import ComponentSkeleton from "@/pages/Components/components/ComponentSkeleton";
import RegisterSkeleton from "@/pages/Register/RegisterSkeleton";
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton";
import CampaignsSkeleton from "@/pages/Campaigns/components/CampaignsSkeleton";

const LazyTemplate = lazy(() => import("../pages/Templates/pages/Template"));
const LazyCampaign = lazy(() => import("../pages/Campaigns/pages/Campaign"));
const LazyCampaigns = lazy(() => import("../pages/Campaigns/Campaigns"));
const LazyComponent = lazy(() => import("../pages/Components/pages/Component"));
const LazyComponents = lazy(() => import("../pages/Components/Components"));

const LazyRegister = lazy(() => import("../pages/Register/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <WithNavBar />,
    errorElement: <ErrorPage message="Router error happend" path="/" />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <LoginGuard>
            <Home />
          </LoginGuard>
        ),
      },
      {
        path: "/templates",
        element: (
          <LoginGuard>
            <Container>
              <Templates />
            </Container>
          </LoginGuard>
        ),
      },
      {
        path: "/templates/:id",
        element: (
          <LoginGuard>
            <Container>
              <Suspense fallback={<TemplateSkeleton />}>
                <LazyTemplate />
              </Suspense>
            </Container>
          </LoginGuard>
        ),
      },
      {
        path: "/campaigns",
        element: (
          <LoginGuard>
            <Container>
              <Suspense fallback={<CampaignsSkeleton />}>
                <LazyCampaigns />
              </Suspense>
            </Container>
          </LoginGuard>
        ),
      },
      {
        path: "/campaigns/:id",
        element: (
          <LoginGuard>
            <Container>
              <Suspense fallback={<CampaignSkeleton />}>
                <LazyCampaign />
              </Suspense>
            </Container>
          </LoginGuard>
        ),
      },
      {
        path: "/components",
        element: (
          <LoginGuard>
            <Container>
              <Suspense fallback={<ComponentsSkeleton />}>
                <LazyComponents />
              </Suspense>
            </Container>
          </LoginGuard>
        ),
      },
      {
        path: "/components/:id",
        element: (
          <LoginGuard>
            <Container>
              <Suspense fallback={<ComponentSkeleton />}>
                <LazyComponent />
              </Suspense>
            </Container>
          </LoginGuard>
        ),
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
  {
    path: "/register",
    element: (
      <Suspense fallback={<RegisterSkeleton />}>
        <LazyRegister />
      </Suspense>
    ),
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
