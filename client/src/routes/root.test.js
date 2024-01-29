import { render, screen } from '@testing-library/react';
import React from 'react'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { Segment } from 'semantic-ui-react'

import { apiSlice } from '../features/api/apiSlice';
import Root from './root';
import { AuthProvider } from '../contexts/AuthProvider.jsx'
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders hello!', () => {
  render(
    <ApiProvider api={apiSlice}>
      <NoticeProvider>
        <AuthProvider>
          <Segment className='MainSegment' padded>
            <Root test />
          </Segment>
        </AuthProvider>
      </NoticeProvider>
    </ApiProvider> 
  );
  const element = screen.getByText(/hello!/i);
  expect(element).toBeInTheDocument();
});
