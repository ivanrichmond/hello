import React, { useContext, useEffect, useMemo } from 'react';
import _ from 'lodash'
import { 
    Outlet,
    useNavigate,
} from "react-router-dom";

// Components
import AppLoader from '../styleLibrary/AppLoader';
import UserSettingsLink from '../components/UserSettingsLink'
import LogoutLink from '../components/LogoutLink'
import Notice from '../components/Notice'

// Contexts
import { AuthContext } from '../contexts/AuthProvider'
import { NoticeContext } from '../contexts/NoticeProvider'

//TODO: Take these RTK Query items out and use AuthContext.
import { useGetCurrentUserQuery } from '../features/api/apiSlice'

function Root() {
  const navigate = useNavigate()
  // const { currentUser, isCurrentUserLoading } = useContext(AuthContext)
  const { 
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError, 
  } = useGetCurrentUserQuery()
  if(isCurrentUserError){
    console.error(currentUserError?.toString())
  }
  const isLoggedIn = useMemo(() => !_.isEmpty(currentUser), [currentUser])
  
  // TODO: This is throwing errors.  Fix.
  const { deleteNotice, notice } = useContext(NoticeContext)
  
  // If you're not logged in, this is a time to remove all notices, 
  // otherwise we can end up with residual notices saying your 
  // UN/PW is wrong or something, which may have been true pre-logout
  // but are no longer true.
  useEffect(() => {
    if(!isLoggedIn) deleteNotice()
  }, [deleteNotice, isLoggedIn, notice])
  
  const isName = !!currentUser?.name
  
  // If not logged in, make user login or register.
  useEffect(() => {
    if(!isLoggedIn && !isCurrentUserLoading) {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isCurrentUserLoading])

  return isCurrentUserLoading ? 
    (
      <AppLoader />
    )
    :
    (
    <div className="Root">
      {notice && 
        <Notice
        close = {deleteNotice}
        message = {notice?.message}
        type = {notice?.type}
        />
      }
      {isLoggedIn &&
        <>
          <LogoutLink />
          <UserSettingsLink />
        </>
      }
      <Outlet />
      <header className="Root-header">
        <h1>Hello{isName ? ', '+currentUser.name : ''}!</h1>
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
