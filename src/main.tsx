import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DataTable from "./components/organisms/DataTable.tsx";
import Cart from "./components/pages/Cart.tsx";
// import AddToCartForm from "./components/molecules/AddToCartForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error: Not Found 404!</div>,
  },
  {
    path: "/about",
    element: <div>About us</div>,
  },
  {
    path: "/read-excel",
    element: <DataTable />,
  },
  {
    path: "/get-low-stock-products",
    element: <DataTable />,
  },
  {
    path: "/products",
    element: <Cart />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
