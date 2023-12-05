import { render, screen } from '@testing-library/react';
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import Login from './login';
import { AuthProvider } from '../contexts/AuthProvider.jsx'
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'
import store from '../data/store'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders Login', () => {
  render(
      <ReduxProvider store = {store}>
    <NoticeProvider>
        <AuthProvider>
          <Login />
        </AuthProvider>
    </NoticeProvider>
      </ReduxProvider>
  );
  const element = screen.getByText(/Login/i);
  expect(element).toBeInTheDocument();
});
