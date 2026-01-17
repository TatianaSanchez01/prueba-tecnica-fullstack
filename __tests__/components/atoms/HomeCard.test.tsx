import { render, screen } from '@testing-library/react';
import HomeCard from '@/components/atoms/HomeCard';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('lucide-react', () => ({
  Users: () => <svg data-testid='users-icon' />,
  ChartColumnDecreasing: () => <svg data-testid='chart-bar-icon' />,
  Coins: () => <svg data-testid='cash-icon' />,
}));

describe('HomeCard', () => {
  it('renders title and description', () => {
    render(
      <HomeCard
        title='Test Title'
        description='Test Description'
        url='/test'
        icon='users'
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders correct icon', () => {
    const { rerender } = render(
      <HomeCard title='Users' description='Test' url='/test' icon='users' />
    );
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();

    rerender(
      <HomeCard title='Chart' description='Test' url='/test' icon='chart-bar' />
    );
    expect(screen.getByTestId('chart-bar-icon')).toBeInTheDocument();

    rerender(
      <HomeCard title='Cash' description='Test' url='/test' icon='cash' />
    );
    expect(screen.getByTestId('cash-icon')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(
      <HomeCard title='Test' description='Test' url='/test' icon='users' />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });
});
