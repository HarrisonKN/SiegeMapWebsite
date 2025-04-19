import { render, screen, fireEvent } from '@testing-library/react';
import AuthPage from './UserLoginRegPage';

describe('AuthPage', () => {
  test('renders login form by default', () => {
    render(<AuthPage />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Confirm Password/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('switches to register form', () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText(/Register/i));
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('switches back to login form', () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText(/Register/i));
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Confirm Password/i)).not.toBeInTheDocument();
  });

  test('can fill and submit login form', () => {
    render(<AuthPage />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    // Add assertions for what should happen on submit if you implement handlers
  });

  test('can fill and submit register form', () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText(/Register/i));
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));
    // Add assertions for what should happen on submit if you implement handlers
  });

  // Example for validation (if you add it)
  test('shows error if passwords do not match on register', () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText(/Register/i));
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'different' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));
    // expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });
});