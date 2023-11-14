import { render, screen } from '@testing-library/react';
import Root from './root';
import { AuthProvider } from '../contexts/AuthProvider.jsx'
import { NoticeProvider } from '../contexts/NoticeProvider.jsx'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders hello', () => {
  render(
    <NoticeProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </NoticeProvider>
  );
  const element = screen.getByText(/hello!/i);
  expect(element).toBeInTheDocument();
});
