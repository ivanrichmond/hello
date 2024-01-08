import { render, screen } from '@testing-library/react';
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from '../features/api/apiSlice';
import Root from './root';
import { AuthProvider } from '../contexts/AuthProvider.jsx'
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'
import store from '../data/store'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders hello!', () => {
  render(
    <ReduxProvider store = {store}>
      <ApiProvider api={apiSlice}>
        <NoticeProvider>
            <AuthProvider>
              <Root />
            </AuthProvider>
        </NoticeProvider>
      </ApiProvider>
    </ReduxProvider>
  );
  const element = screen.getByText(/hello!/i);
  expect(element).toBeInTheDocument();
});
