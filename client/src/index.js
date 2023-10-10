import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './css/index.css'
import reportWebVitals from './reportWebVitals'

// Routes
//TODO: Should I consolidate destroyUser into user?
import { action as destroyAction } from './routes/destroyUser.jsx'
import ErrorPage from './routes/errorPage.jsx'
import Index from './routes/index.jsx'
import Root from './routes/root.jsx'
import User, {
  loader as userLoader,
  action as userAction,
} from "./routes/user.jsx";

// Router
//TODO: Add <Index> and <EditContact>.
const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    path: '/',
    children: [
      { index: true, element: <Index /> },
      {
        path: "users/:userId",
        element: <User />, 
        loader: userLoader,
        action: userAction,
      },
      // {
      //   path: "users/:userId/edit",
      //   element: <EditContact />,
      //   loader: userLoader,
      //   action: editAction,
      // },
      {
        path: "users/:userId/destroy",
        action: destroyAction,
        errorElement: <div>Oops!  There was an error.</div>
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
