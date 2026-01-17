import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { fromNodeHeaders } from 'better-auth/node';
import { CreateTransactionRequest } from '@/lib/transactions/transaction.requests';

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
    const transactions = await prisma.transaction.findMany({
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { date: 'desc' },
    });

    return res.status(200).json(transactions);
  }

  if (req.method === 'POST') {
    const { amount, description, date }: CreateTransactionRequest = req.body;

    if (!amount || !description || !date) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        amount,
        description,
        date: new Date(date),
      },
    });

    return res.status(201).json(transaction);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
