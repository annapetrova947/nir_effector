import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Effector Benchmark title', () => {
  render(<App />);
  const title = screen.getByText(/Effector Benchmark/i);
  expect(title).toBeInTheDocument();
});