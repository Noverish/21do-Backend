import { KAKAO_ADMIN_KEY } from '@src/envs';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IsInt, IsString, validateOrReject } from 'class-validator';
import querystring from 'querystring';

export async function paymentReady(params: paymentReady.Params): Promise<paymentReady.Result> {
  await validateOrReject(new paymentReady.Params(params));

  const { origin, amount, itemName } = params;

  const body = {
    cid: 'TC0ONETIME',
    partner_order_id: 'partner_order_id',
    partner_user_id: 'partner_user_id',
    item_name: itemName,
    quantity: 1,
    total_amount: amount,
    vat_amount: 0,
    tax_free_amount: 0,
    approval_url: `${origin}/payment-result.html?status=success`,
    fail_url: `${origin}/payment-result.html?status=failure`,
    cancel_url: `${origin}/payment-result.html?status=cancel`,
  }

  const bodyString = querystring.stringify(body);

  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://kapi.kakao.com/v1/payment/ready',
    data: bodyString,
    headers: {
      Authorization: `KakaoAK ${KAKAO_ADMIN_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
  }

  const result: AxiosResponse = await axios(config);
  return result.data;
}

export namespace paymentReady {
  export class Params {
    constructor(obj: object) {
      Object.assign(this, obj);
    }

    @IsString()
    itemName: string;

    @IsString()
    origin: string;

    @IsInt()
    amount: number;
  }

  export interface Result {
    tid: string;
    next_redirect_app_url: string;
    next_redirect_mobile_url: string;
    next_redirect_pc_url: string;
    android_app_scheme: string;
    ios_app_scheme: string;
    created_at: string;
  }
}
