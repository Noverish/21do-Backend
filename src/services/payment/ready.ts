import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { kakaoAdminKey } from '@src/credentials';
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
      approval_url: `${origin}/payment/success`,
      fail_url: `${origin}/payment/fail`,
      cancel_url: `${origin}/payment/cancel`,
    }

    const bodyString = querystring.stringify(body);

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://kapi.kakao.com/v1/payment/ready',
      data: bodyString,
      headers: {
        Authorization: `KakaoAK ${kakaoAdminKey}`,
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

  interface Amount {
    total: number; // 전체 결제 금액
    tax_free: number; // 비과세 금액
    vat: number; // 부가세 금액
    point: number; // 사용한 포인트 금액
    discount: number; // 할인 금액
  }

  interface CardInfo {
    purchase_corp: string // 매입 카드사 한글명
    purchase_corp_code: string // 매입 카드사 코드
    issuer_corp: string // 카드 발급사 한글명
    issuer_corp_code: string // 카드 발급사 코드
    kakaopay_purchase_corp: string // 카카오페이 매입사명
    kakaopay_purchase_corp_code: string // 카카오페이 매입사 코드
    kakaopay_issuer_corp: string // 카카오페이 발급사명
    kakaopay_issuer_corp_code: string // 카카오페이 발급사 코드
    bin: string // 카드 BIN
    card_type: string // 카드 타입
    install_month: string // 할부 개월 수
    approved_id: string // 카드사 승인번호
    card_mid: string // 카드사 가맹점 번호
    interest_free_install: string // 무이자할부 여부(Y/N)
    card_item_code: string // 카드 상품 코드
  }

  type ResultCommon = {
    aid: string; // 요청 고유 번호
    tid: string; // 요청 고유 번호
    cid: string; // 가맹점 코드
    partner_order_id: string; // 가맹점 주문번호, 최대 100자
    partner_user_id: string; // 가맹점 회원 id, 최대 100자
    amount: Amount; // 결제 금액 정보
    item_name: string; // 상품 이름, 최대 100자
    item_code: string; // 상품 코드, 최대 100자
    quantity: number; // 	상품 수량
    approved_at: string; // 결제 준비 요청 시각
    created_at: string; // 결제 승인 시각
  }

  type ResultCard = {
    card_info: CardInfo; // 결제 상세 정보, 결제수단이 카드일 경우만 포함
    payment_method_type: 'CARD'; // 결제 수단, CARD 또는 MONEY 중 하나
  }

  type ResultMoney = {
    payment_method_type: 'MONEY'; // 결제 수단, CARD 또는 MONEY 중 하나
  }

  export type Result = ResultCommon & (ResultCard | ResultMoney);
}