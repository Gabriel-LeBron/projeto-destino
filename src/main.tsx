import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";

import "@/index.css";
import { ROUTES } from "./paths";
import ContactPage from "./pages/contato/ContactPage";
import LandingPage from "./pages/landingPage/LandingPage";
import App from "./App";
import Cadastro from "./pages/auth/Cadastro";
import Login from "./pages/auth/Login";
import Viagem from "./pages/viagen/Viagem";
import ViagensCadastradas from "./pages/relatorio/ViagensCadastradas";
import Relatorio from "./pages/relatorio/Dashboard";
import Validar from "./pages/validar/Validar";

const router = createBrowserRouter([
  {
    path: ROUTES.LANDINGPAGE,
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ROUTES.CONTATO,
        element: <ContactPage />,
      },
      {
        path: ROUTES.VIAGEM,
        element: <Viagem />,
      },
      {
        path: ROUTES.VIAGENS_CADASTRADAS,
        element: <ViagensCadastradas />,
      },
      {
        path: ROUTES.RELATORIO,
        element: <Relatorio />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Cadastro />,
  },
  {
    path: ROUTES.VALIDAR,
    element: <Validar />,
  },
  {
    path: "*",
    element: (
      <div className="text-center p-10">404 - Página não encontrada</div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
