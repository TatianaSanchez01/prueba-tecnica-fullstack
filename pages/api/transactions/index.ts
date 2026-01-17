import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { fromNodeHeaders } from 'better-auth/node';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const transactions = await prisma.transaction.findMany({
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      });

      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    if (session.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    const { amount, description, date } = req.body;

    if (amount === undefined || !description || !date) {
      return res.status(400).json({
        message: 'Amount, description, and date are required',
      });
    }

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          amount: parseFloat(amount),
          description,
          date: new Date(date),
          userId: session.user.id,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      return res.status(500).json({ message: 'Error creating transaction' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
