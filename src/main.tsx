import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./router/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClients";

const DOM = ReactDOM.createRoot(document.getElementById("root")!);
DOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_CLIENT_ID!}>
        <Router />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
