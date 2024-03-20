import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './MainPage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Hello from './components/Form/UnAuth/HelloPage.jsx'
import Registration from './components/Form/Registration/RegistrationPage.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

const TOKEN = true

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage children={Hello} token={TOKEN} />
  },
  {
    path: "/registration",
    element: <MainPage children={Registration} token={TOKEN} />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
