import { render, screen } from '@testing-library/react';
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import Login from './login';
import { AuthProvider } from '../contexts/AuthProvider.jsx'
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'
import store from '../data/store'
import { apiSlice } from '../features/api/apiSlice'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders Login', () => {
  render(
      <ReduxProvider store = {store}>
        <ApiProvider api={apiSlice}>
          <NoticeProvider>
              <AuthProvider>
                <Login />
              </AuthProvider>
          </NoticeProvider>
        </ApiProvider>
      </ReduxProvider>
  );
  const element = screen.getByText(/Login/i);
  expect(element).toBeInTheDocument();
});
