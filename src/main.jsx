import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Result from './pages/result/Result'

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "resultado/:username",
    Component: Result,
  },
  {
    path: "*",
    element: <h1>404 | Pagina não encontrada.</h1>,
  }
]);

//Component não precisa da <>
//Element precisa.

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/