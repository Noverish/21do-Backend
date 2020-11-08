import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { KAKAO_ADMIN_KEY } from '@src/envs';
import querystring from 'querystring';

export function PaymentReadyService(params: PaymentReadyService.Params): Promise<PaymentReadyService.Result> {
  return new Promise((resolve, reject) => {

    const { origin, amount } = params;

    const body = {
      cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: '초코파이',
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

    axios(config)
      .then((result: AxiosResponse) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export namespace PaymentReadyService {
  export interface Params {
    origin: string;
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
