import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './MainPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const TOKEN = true

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage prop="main" token = {TOKEN} />
  },
  {
    path: "/ab",
    element: <MainPage prop="ab" token = {TOKEN} />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
