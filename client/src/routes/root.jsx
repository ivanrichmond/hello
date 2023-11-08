import React, { useEffect } from 'react';
import { 
    Outlet,
    useNavigate,
} from "react-router-dom";

import { useAuth } from '../contexts/AuthProvider'

function Root() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // If not logged in, make user login or register.
  useEffect(() => {
    if(!user) navigate('/login')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="Root">
      <Outlet />
      <header className="Root-header">
        <h1>Hello!</h1>
        <p>A springboard for a Javascript app, containing everything needed front-end, back-end, DB, etc. to create a new JS app.  It says "hello" to you, or someone, maybe the world.</p>
        <p>Hello is not about saying hello.  
        It's built around the concept that even the simplest professional application has many needs
        that are not directly related to the goal of the application, such as logging, error handling,
        routing, server-side DB, client-side DB, etc., etc.
        As such, Hello is an application that has everything but a main goal,
        so that all someone who wants a Node/React application would have to do is install Hello,
        and then get on with building the main goal of their application.
        Hello uses saying hello as a placeholder for whatever goal engineers put it to.</p>
      </header>
    </div>
  );
}

export default Root;
