import React, { useContext, useEffect } from 'react';
import { 
    Outlet,
    useNavigate,
} from "react-router-dom";

// Components
import LogoutLink from '../components/LogoutLink'
import Notice from '../components/Notice'

// Contexts
import { AuthContext } from '../contexts/AuthProvider'
import { NoticeContext } from '../contexts/NoticeProvider'

function Root() {
  const { user } = useContext(AuthContext)
  const { deleteNotice, notice } = useContext(NoticeContext)
  const navigate = useNavigate()
  const isName = !!user?.name

  // If not logged in, make user login or register.
  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="Root">
      {notice && 
        <Notice
        close = {deleteNotice}
        message = {notice.message}
        type = {notice.type}
        />
      }
      {user &&
        <LogoutLink />
      }
      <Outlet />
      <header className="Root-header">
        <h1>Hello{isName ? ', '+user.name : ''}!</h1>
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
