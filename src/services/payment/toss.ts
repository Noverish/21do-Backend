import { Transaction } from '@src/entity';
import { TOSS_SECRET_KEY } from '@src/envs';
import { TransactionDTO } from '@src/models';
import axios, { AxiosRequestConfig } from 'axios';
import { IsInt, IsString, validateOrReject } from 'class-validator';

const secretKeyBase64 = Buffer.from(TOSS_SECRET_KEY + ':').toString('base64');

export async function paymentToss(params: paymentToss.Params): Promise<paymentToss.Result> {
  await validateOrReject(new paymentToss.Params(params));

  const { paymentKey, orderId, amount } = params;

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `https://api.tosspayments.com/v1/payments/${paymentKey}`,
    data: { orderId, amount },
    headers: {
      'Authorization': `Basic ${secretKeyBase64}`,
      'Content-Type': 'application/json',
    }
  }

  const tossResult: TossResult = (await axios(config)).data;

  const insertResult = await Transaction.insert({ amount });
  const id = insertResult.identifiers[0].transactionId;
  const transaction = await Transaction.findOne(id);
  return await transaction.toDTO();
}

export namespace paymentToss {
  export class Params {
    constructor(obj: object) {
      Object.assign(this, obj);
    }

    @IsString()
    paymentKey: string;

    @IsInt()
    orderId: number;

    @IsInt()
    amount: number;
  }

  export type Result = TransactionDTO;
}

type TossResultCard = {
  company: string,
  number: string,
  installmentPlanMonths: number,
  approveNo: string,
  useCardPoint: boolean,
  cardType: string,
  ownerType: string,
  receiptUrl: string
}

type TossResult = {
  paymentKey: string,
  orderId: string,
  mId: string,
  currency: string,
  method: '카드' | '가상계좌' | '휴대폰',
  totalAmount: number,
  balanceAmount: number,
  status: 'READY' | 'IN_PROGRESS' | 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED' | 'ABORTED' | 'PARTIAL_CANCELED',
  requestedAt: string,
  approvedAt: string,
  useDiscount: boolean,
  discountAmount: number | null,
  useEscrow: boolean,
  useCashReceipt: boolean,
  card: TossResultCard,
  virtualAccount: null,
  cashReceipt: null,
  cancels: any[] | null,
  secret: string | null
}