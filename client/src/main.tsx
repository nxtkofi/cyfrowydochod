import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccessPage from "./pages/AccessPage";
import OfferPage from "./pages/OfferPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StaticElementsWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/access",
        element: <AccessPage />,
      },
      {
        path: "/offer",
        element: <OfferPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function StaticElementsWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
