import { render, screen } from '@testing-library/react';
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from '../features/api/apiSlice';

import { AuthProvider } from '../contexts/AuthProvider.jsx'
import ErrorPage from './errorPage';
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'

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
    <ApiProvider api={apiSlice}>
      <NoticeProvider>
        <AuthProvider>
            <ErrorPage />
        </AuthProvider>
      </NoticeProvider>
    </ApiProvider> 
  );
  const element = screen.getByText(/Error/i);
  expect(element).toBeInTheDocument();
});
