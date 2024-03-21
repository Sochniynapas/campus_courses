import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './MainPage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Hello from './components/Form/UnAuth/HelloPage.jsx'
import Registration from './components/Form/Registration/RegistrationPage.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Authorization from './components/Form/Authorization/AuthorizationPage.jsx'
import Profile from './components/Form/Profile/ProfilePage.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage children={Hello} />
  },
  {
    path: "/registration",
    element: <MainPage children={Registration} />
  },
  {
    path: "/login",
    element: <MainPage children={Authorization} />
  },
  {
    path: "/profile",
    element: <MainPage children={Profile} />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
