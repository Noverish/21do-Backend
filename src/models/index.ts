export interface UserDTO {
  userId: number;
  username?: string;
  name?: string;
  phone?: string;
  addDate: string;
  regDate?: string;
}

export interface MarriageDTO {
  marriageId: number;
  male: UserDTO;
  lady: UserDTO;
  location: string;
  account: string;
  bank: string;
}

export interface TransactionDTO {
  transactionId: number;
  amount: number;
  date: string;
}

export interface TicketDTO {
  ticketId: number;
  marriage: MarriageDTO;
  isUsed: boolean;
}

export interface GuestbookDTOForUser {
  guestbookId: number;
  marriage: MarriageDTO;
  transaction?: TransactionDTO;
  belong?: string;
  msg?: string;
  isOnline: boolean;
}
