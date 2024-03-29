import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { Segment } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './css/index.css'
import reportWebVitals from './reportWebVitals'

// Contexts
import { AdminProvider } from './contexts/AdminProvider.jsx'
import { AuthProvider } from './contexts/AuthProvider.jsx'
import { NoticeProvider } from './contexts/NoticeProvider.jsx'

// Style Library (wrappers from CSS libraries, like SUI)

// Routes
import Admin from './routes/admin.jsx'
import EditUser from './routes/editUser.jsx'
import ErrorPage from './routes/errorPage.jsx'
import Login from './routes/login.jsx'
import Logout from './routes/logout.jsx'
// import Index from './routes/index.jsx'
import Root from './routes/root.jsx'
import User from "./routes/user.jsx";

// Redux
import { apiSlice } from './features/api/apiSlice'

// Router
//TODO: Add <Index>.
export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    path: '/',
    children: [
      // { index: true, element: <Index /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ]
  },
  {
    path: "users/:userId",
    element: <User />,
    errorElement: <ErrorPage />,
  },
  {
    path: "users/:userId/edit",
    element: <EditUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "users/new",
    element: <EditUser isNew />,
    errorElement: <ErrorPage />,
  },
  {
    path: "users/:userId/destroy",
  },
  {
    path: "/admin",
    element: <AdminProvider> <Admin /> </AdminProvider>,
    errorElement: <ErrorPage />, /* TODO: Make this more DRY with /'s errorElement. */
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // NOTE: Not using strict mode, because I'll get this warning from Semantic UI:
  // Warning: findDOMNode is deprecated in StrictMode.
  // Not sure how to fix this without forking SUI, which I don't want to do.
    <ApiProvider api={apiSlice}>
      <NoticeProvider>
          <AuthProvider>
            <Segment className='MainSegment' padded>
              <RouterProvider router={router} >
              </RouterProvider>
            </Segment>
          </AuthProvider>
      </NoticeProvider>
    </ApiProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
