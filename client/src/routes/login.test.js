import { render, screen } from '@testing-library/react';
import Login from './login';
import { AuthProvider } from '../contexts/AuthProvider.jsx'
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders Login', () => {
  render(
    <NoticeProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </NoticeProvider>
  );
  const element = screen.getByText(/Login/i);
  expect(element).toBeInTheDocument();
});
