import React from 'react'
import { 
    Form, 
    useNavigate,
    useParams,
} from "react-router-dom";

import AppButton from '../styleLibrary/AppButton'
import AppGrid from '../styleLibrary/AppGrid'
import AppLoader from '../styleLibrary/AppLoader';
import { useGetUserQuery } from '../features/api/apiSlice';
import { useNotice } from '../contexts/NoticeProvider'

export default function User() {
    const { createNotice } = useNotice()
    const { id } = useParams()
    const { data: user, isLoading, isError, error  } = useGetUserQuery(id)
    console.debug('user', user)
    const navigate = useNavigate()

    if(isError){
      createNotice(`CANNOT GET USER ${id}: `+error?.message, 'error')
    }
    
    return isLoading ? 
      <AppLoader />
    : (
      <AppGrid>
      <AppGrid.Row>
        <AppGrid.Column>
          <label htmlFor={'name'}>Name: </label>
        </AppGrid.Column>
        
        <AppGrid.Column>
          {user.name}
        </AppGrid.Column>
      </AppGrid.Row>
      <AppGrid.Row>
        <AppGrid.Column>
          <label htmlFor={'username'}>Username: </label>
        </AppGrid.Column>
        
        <AppGrid.Column>
          {user.username}
        </AppGrid.Column>
      </AppGrid.Row>

      <AppGrid.Row>
        <AppGrid.Column>
          <Form action="edit">
              <AppButton color="green" type="submit">Edit</AppButton>
          </Form>
        </AppGrid.Column>
        
        <AppGrid.Column>
          <AppButton 
          color = "red"
          type="button"
          onClick={() => {
              navigate(-1)
          }}
          >
            Cancel
          </AppButton>
        </AppGrid.Column>
      </AppGrid.Row>
      </AppGrid>
    );
}
