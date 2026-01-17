import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { fromNodeHeaders } from 'better-auth/node';
import { UpdateTransactionRequest } from '@/lib/transactions/transaction.requests';

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

  const { id } = req.query;

  if (req.method === 'GET') {
    const transaction = await prisma.transaction.findUnique({
      where: { id: String(id) },
    });

    return res.status(200).json(transaction);
  }

  if (req.method === 'PUT') {
    const payload: UpdateTransactionRequest = req.body;

    const updated = await prisma.transaction.update({
      where: { id: String(id) },
      data: payload,
    });

    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.transaction.delete({
      where: { id: String(id) },
    });

    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
