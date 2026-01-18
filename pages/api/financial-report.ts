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

  if (session.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
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

      // Calculate aggregated data
      const totalBalance = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      const totalIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const totalExpenses = Math.abs(
        transactions
          .filter((t) => t.amount < 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0)
      );

      return res.status(200).json({
        transactions,
        totalBalance,
        totalIncome,
        totalExpenses,
      });
    } catch {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
