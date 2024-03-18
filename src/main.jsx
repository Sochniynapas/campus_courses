import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './MainPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Hello from './components/Form/UnAuth/HelloPage.jsx'

const TOKEN = true

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage children={Hello} token = {TOKEN} />
  },
  {
    path: "/ab",
    element: <MainPage children={Hello} token = {TOKEN} />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
