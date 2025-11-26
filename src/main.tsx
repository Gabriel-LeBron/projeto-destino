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
import Viagem from "./pages/usuario/Viagem";
import ViagensCadastradas from "./pages/administracao/pacote/registro/ViagensCadastradas";
import Relatorio from "./pages/administracao/dashboard/Dashboard";
import Validar from "./pages/administracao/usuario/Validar";
import ProductPage from "./pages/Busca/pacote/Pacote";
import CadastrarViagem from "./components/administracao/CadastrarViagem";
import VisualizarViagem from "./pages/usuario/VisualizarViagem";
import BuscarViagens from "./pages/Busca/BuscarPacotes";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ConfirmacaoPage from "./pages/checkout/confirmacao/Confirmacao";
import RegistrarPacoteFoto from "./pages/administracao/pacote/registro/RegistrarPacoteFoto";
import PacotesFotoLista from "./pages/administracao/pacote/listas/PacotesFotoLista";
import Dashboard from "./pages/administracao/dashboard/Dashboard";
import AdminLayout from "./pages/administracao/AdminLayout";
import HotelLista from "./pages/administracao/pacote/listas/HotelLista";
import TransporteLista from "./pages/administracao/pacote/listas/TransporteLista";
import RegistrarHotel from "./pages/administracao/pacote/registro/RegistrarHotel";
import RegistrarTransporte from "./pages/administracao/pacote/registro/RegistrarTransporte";
import Pacote from "./pages/Busca/pacote/Pacote";
import BuscarPacotes from "./pages/Busca/BuscarPacotes";

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
        path: ROUTES.BUSCAR_PACOTES,
        element: <BuscarPacotes />,
      },
      {
        path: ROUTES.PACOTE_DETALHES,
        element: <Pacote />,
      },
      {
        path: `${ROUTES.VIAGEM}/visualizar`,
        element: <VisualizarViagem />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <CheckoutPage />,
      },
      {
        path: ROUTES.CONFIRMACAO,
        element: <ConfirmacaoPage />,
      },
      {
        path: "/administracao",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "viagens-cadastradas", element: <ViagensCadastradas /> },
          { path: "viagens-cadastradas/novo", element: <CadastrarViagem /> },
          {
            path: "viagens-cadastradas/editar/:id",
            element: <CadastrarViagem />,
          },
          { path: "hoteis", element: <HotelLista /> },
          { path: "hoteis/novo", element: <RegistrarHotel /> },
          { path: "hoteis/editar/:id", element: <RegistrarHotel /> },
          { path: "transportes", element: <TransporteLista /> },
          { path: "transportes/novo", element: <RegistrarTransporte /> },
          { path: "transportes/editar/:id", element: <RegistrarTransporte /> },
          { path: "pacotes-foto", element: <PacotesFotoLista /> },
          { path: "pacotes-foto/novo", element: <RegistrarPacoteFoto /> },
          { path: "pacotes-foto/editar/:id", element: <RegistrarPacoteFoto /> },
        ],
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
