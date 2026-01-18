import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/users/index';
import handlerId from '../../pages/api/users/[id]';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// Mock dependencies
jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn().mockResolvedValue({
        user: { role: 'USER' },
      }),
    },
  },
}));

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('/api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET returns 403 if user is not ADMIN', async () => {
    auth.api.getSession().mockResolvedValue({
      user: { role: 'USER' },
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(403);
    expect(res._getJSONData()).toEqual({ message: 'Forbidden: Admins only' });
  });

  test('GET returns 200 and users list if user is ADMIN', async () => {
    auth.api.getSession().mockResolvedValue({
      user: { role: 'ADMIN' },
    });
    prisma.user.findMany.mockResolvedValue([
      { id: '1', name: 'Test User' },
    ]);

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toHaveLength(1);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });
});

describe('/api/users/[id]', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('PUT updates user if requester is ADMIN', async () => {
        (auth.api.getSession as jest.Mock).mockResolvedValue({
            user: { role: 'ADMIN' },
        });
        (prisma.user.update as jest.Mock).mockResolvedValue({
            id: '123',
            name: 'Updated Name',
        });

        const { req, res } = createMocks({
            method: 'PUT',
            query: { id: '123' },
            body: { name: 'Updated Name' },
        });

        await handlerId(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({ id: '123', name: 'Updated Name' });
        expect(prisma.user.update).toHaveBeenCalledWith(expect.objectContaining({
            where: { id: '123' },
            data: { name: 'Updated Name' }
        }));
    });
});
