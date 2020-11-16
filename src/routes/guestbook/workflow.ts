import { Guestbook, Ticket, Transaction } from '@src/entity';
import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/workflow', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as {
    marriageId?: number;
    personId?: number;
    userId?: number;
    guestbook?: {
      name: string;
      belong: string;
      msg: string;
    };
    isOnline: boolean;
    amount?: number;
  };

  const { amount, guestbook, userId, marriageId } = body;

  const result = {
    transactionId: undefined,
    guestbookId: undefined,
    ticketId: undefined,
  }

  if (amount) {
    const insertResult = await Transaction.insert({
      fromUserId: body.userId,
      fromName: body.guestbook?.name,
      toMarriageId: body.marriageId,
      toPerson: body.personId,
      amount: amount,
      isOnline: body.isOnline,
    })
    result.transactionId = insertResult.identifiers[0].transactionId;
  }

  if (guestbook && marriageId) {
    const insertResult = await Guestbook.insert({
      marriageId,
      userId: body.userId,
      name: guestbook.name,
      belong: guestbook.belong,
      msg: guestbook.msg,
      isOnline: body.isOnline,
    })
    result.guestbookId = insertResult.identifiers[0].guestbookId;
  }

  if (amount && userId && marriageId) {
    const insertResult = await Ticket.insert({
      userId,
      marriageId,
    })
    result.ticketId = insertResult.identifiers[0].ticketId;
  }
  
  res.status(200);
  res.json(result);
});

export default router;