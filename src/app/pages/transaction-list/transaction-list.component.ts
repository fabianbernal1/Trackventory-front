import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transactions } from 'src/app/models/trasanctions';
import { TransactionDetails } from 'src/app/models/transactionDetails';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transactions[] = [];
  transactionDetails: TransactionDetails[] = [];
  selectedTransactionId: number | null = null;
  totalTransactionValue: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  // Cargar todas las transacciones
  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe((data: Transactions[]) => {
      this.transactions = data;
    });
  }

  // Cargar detalles de una transacción específica y calcular total
  loadTransactionDetails(transactionId: number): void {
    this.transactionService.getTransactionDetailsByTransactionId(transactionId).subscribe((details: TransactionDetails[]) => {
      this.transactionDetails = details;
      this.totalTransactionValue = this.calculateTotalValue(details);
    });
  }

  // Calcular el valor total de la transacción sumando los valores de cada detalle
  calculateTotalValue(details: TransactionDetails[]): number {
    return details.reduce((sum, detail) => sum + (detail.total || 0), 0);
  }

  // Mostrar/Ocultar detalles
  toggleDetails(transactionId: number): void {
    if (this.selectedTransactionId === transactionId) {
      this.selectedTransactionId = null;
    } else {
      this.selectedTransactionId = transactionId;
      this.loadTransactionDetails(transactionId);
    }
  }
}
