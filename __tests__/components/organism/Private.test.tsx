/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Private from '@/components/organism/Private';
import { authClient } from '@/lib/auth/client';
import { getUserRole } from '@/lib/auth/auth.helpers';
import { Enum_RoleName } from '@prisma/client';

// ─────────────────────────────────────────────
// Mocks
// ─────────────────────────────────────────────
jest.mock('@/lib/auth/client', () => ({
  authClient: {
    useSession: jest.fn(),
  },
}));

jest.mock('@/lib/auth/auth.helpers', () => ({
  getUserRole: jest.fn(),
}));

describe('Private component', () => {
  const mockedUseSession = authClient.useSession as jest.Mock;
  const mockedGetUserRole = getUserRole as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when user role is allowed', () => {
    mockedUseSession.mockReturnValue({
      data: { user: { role: Enum_RoleName.ADMIN } },
    });

    mockedGetUserRole.mockReturnValue(Enum_RoleName.ADMIN);

    render(
      <Private allowedRoles={[Enum_RoleName.ADMIN]}>
        <div>Contenido privado</div>
      </Private>
    );

    expect(screen.getByText('Contenido privado')).toBeInTheDocument();
  });

  it('does NOT render children when user role is not allowed', () => {
    mockedUseSession.mockReturnValue({
      data: { user: { role: Enum_RoleName.USER } },
    });

    mockedGetUserRole.mockReturnValue(Enum_RoleName.USER);

    render(
      <Private allowedRoles={[Enum_RoleName.ADMIN]}>
        <div>Contenido privado</div>
      </Private>
    );

    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });

  it('does NOT render children when session is null', () => {
    mockedUseSession.mockReturnValue({
      data: null,
    });

    mockedGetUserRole.mockReturnValue('GUEST');

    render(
      <Private allowedRoles={[Enum_RoleName.ADMIN]}>
        <div>Contenido privado</div>
      </Private>
    );

    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });
});
