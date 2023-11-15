import { render, screen } from '@testing-library/react';
import ErrorPage from './errorPage';
import { AuthProvider } from '../contexts/AuthProvider.jsx'
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
    <NoticeProvider>
      <AuthProvider>
        <ErrorPage />
      </AuthProvider>
    </NoticeProvider>
  );
  const element = screen.getByText(/Error/i);
  expect(element).toBeInTheDocument();
});
