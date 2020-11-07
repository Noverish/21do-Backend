import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { KAKAO_ADMIN_KEY } from '@src/envs';
import querystring from 'querystring';

export function PaymentApproveService(params: PaymentApproveService.Params): Promise<PaymentApproveService.Result> {
  return new Promise((resolve, reject) => {
    const { pg_token, tid } = params;

    const body = {
      cid: 'TC0ONETIME',
      tid,
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      pg_token,
    }

    const bodyString = querystring.stringify(body);

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://kapi.kakao.com/v1/payment/approve',
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

export namespace PaymentApproveService {
  export interface Params {
    pg_token: string;
    tid: string;
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