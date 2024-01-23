import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from '../features/api/apiSlice';

import { AuthProvider } from '../contexts/AuthProvider.jsx'
import ErrorPage from './errorPage';
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'
import store from '../data/store'

const mockedUsedNavigate = jest.fn();
const mockedUsedRouteError = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useRouteError: () => mockedUsedRouteError.mockReturnValue(new Error()),
}));

const original = console.error

beforeEach(() => {
  console.error = jest.fn();
})

afterEach(() => {
  console.error = original
})

test('renders Error', () => {
  render(
    <ReduxProvider store={store}>
      <ApiProvider api={apiSlice}>
        <NoticeProvider>
          <AuthProvider>
              <ErrorPage />
          </AuthProvider>
        </NoticeProvider>
      </ApiProvider> 
    </ReduxProvider>
  );
  const element = screen.getByText(/Error/i);
  expect(element).toBeInTheDocument();
});
