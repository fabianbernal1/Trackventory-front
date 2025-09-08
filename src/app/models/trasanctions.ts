import { TransactionOrigins } from "./transactionOrigins";
import { TransactionTypes } from "./transactionTypes";
import { User } from "./user";

export interface Transactions {
    id: number;
    buyer?: User;
    seller?: User;
    date: Date;
    transactionType?: TransactionTypes;
    transactionOrigin?: TransactionOrigins;
    enabled: boolean;
  }
  