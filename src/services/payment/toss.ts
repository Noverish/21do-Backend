import { TOSS_SECRET_KEY } from '@src/envs';
import axios, { AxiosRequestConfig } from 'axios';
import Joi from 'joi';

const secretKeyBase64 = Buffer.from(TOSS_SECRET_KEY + ':').toString('base64');

export async function paymentToss(params: paymentToss.Params): Promise<paymentToss.Result> {
  const value: paymentToss.Params = await paymentToss.schema.validateAsync(params);

  const { paymentKey, orderId, amount } = value;

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `https://api.tosspayments.com/v1/payments/${paymentKey}`,
    data: { orderId, amount },
    headers: {
      'Authorization': `Basic ${secretKeyBase64}`,
      'Content-Type': 'application/json',
    }
  }

  return (await axios(config)).data;
}

export namespace paymentToss {
  export interface Params {
    paymentKey: string;
    orderId: string;
    amount: number;
  }

  export const schema = Joi.object({
    paymentKey: Joi.string().required(),
    orderId: Joi.string().required(),
    amount: Joi.number().required(),
  })

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
  
  export type Result = {
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
}
