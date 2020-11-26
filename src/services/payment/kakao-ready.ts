import { KAKAO_ADMIN_KEY } from '@src/envs';
import axios, { AxiosRequestConfig } from 'axios';
import Joi from 'joi';
import querystring from 'querystring';

export async function paymentKakaoReady(params: paymentKakaoReady.Params): Promise<paymentKakaoReady.Result> {
  const value: paymentKakaoReady.Params = await paymentKakaoReady.schema.validateAsync(params);

  const { approval_url, fail_url, cancel_url, amount, itemName } = value;

  const body = {
    cid: 'TC0ONETIME',
    partner_order_id: 'partner_order_id',
    partner_user_id: 'partner_user_id',
    item_name: itemName,
    quantity: 1,
    total_amount: amount,
    vat_amount: 0,
    tax_free_amount: 0,
    approval_url,
    fail_url,
    cancel_url,
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

  return (await axios(config)).data;
}

export namespace paymentKakaoReady {
  export interface Params {
    itemName: string;
    approval_url: string;
    fail_url: string;
    cancel_url: string;
    amount: number;
  }

  export const schema = Joi.object({
    itemName: Joi.string().required(),
    fail_url: Joi.string().required(),
    approval_url: Joi.string().required(),
    cancel_url: Joi.string().required(),
    amount: Joi.number().required(),
  })

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
