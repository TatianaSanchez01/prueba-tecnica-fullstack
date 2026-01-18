import { render, screen } from '@testing-library/react';
import { getIcon } from '@/components/icons/IconMap';
import '@testing-library/jest-dom';

// Mock de lucide-react para verificar que se renderizan los iconos correctos
jest.mock('lucide-react', () => ({
  Users: ({ size, className }: any) => (
    <svg data-testid='users-icon' width={size} height={size} className={className} />
  ),
  ChartColumnDecreasing: ({ size, className }: any) => (
    <svg data-testid='chart-bar-icon' width={size} height={size} className={className} />
  ),
  Coins: ({ size, className }: any) => (
    <svg data-testid='cash-icon' width={size} height={size} className={className} />
  ),
}));

describe('getIcon', () => {
  it('debe retornar el icono de usuarios cuando se pasa "users"', () => {
    const icon = getIcon('users');
    render(<div>{icon}</div>);
    const svg = screen.getByTestId('users-icon');
    expect(svg).toBeInTheDocument();
  });

  it('debe retornar el icono de gráfico cuando se pasa "chart-bar"', () => {
    const icon = getIcon('chart-bar');
    render(<div>{icon}</div>);
    const svg = screen.getByTestId('chart-bar-icon');
    expect(svg).toBeInTheDocument();
  });

  it('debe retornar el icono de dinero cuando se pasa "cash"', () => {
    const icon = getIcon('cash');
    render(<div>{icon}</div>);
    const svg = screen.getByTestId('cash-icon');
    expect(svg).toBeInTheDocument();
  });

  it('debe retornar undefined para un nombre de icono desconocido', () => {
    const icon = getIcon('unknown');
    expect(icon).toBeUndefined();
  });
});
