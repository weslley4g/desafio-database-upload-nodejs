import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    let valueTotalInCome = 0;
    let valueTotalOutCome = 0;

    const transactions = await this.find();

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        valueTotalInCome += transaction.value;
      } else if (transaction.type === 'outcome') {
        valueTotalOutCome += transaction.value;
      }
    });

    const balance = {
      income: valueTotalInCome,
      outcome: valueTotalOutCome,
      total: valueTotalInCome - valueTotalOutCome,
    };

    return balance;
  }
}

export default TransactionsRepository;
