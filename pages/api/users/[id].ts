import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { fromNodeHeaders } from 'better-auth/node';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (session.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user' });
    }
  } else if (req.method === 'PUT') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { name, role } = body;

    if (!name && !role) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(role && { role }),
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user' });
    }
  } else if (req.method === 'DELETE') {
    // Prevent deleting yourself (optional but good practice)
    if (session.user.id === id) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }

    try {
      await prisma.user.delete({
        where: { id },
      });
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
