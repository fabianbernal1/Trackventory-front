import { Component, OnInit } from '@angular/core';
import { TransactionOriginsService } from 'src/app/services/transaction-origins.service';
import { AlertService } from 'src/app/services/alert.service';
import { TransactionOrigins } from 'src/app/models/transactionOrigins';

@Component({
  selector: 'app-transaction-origins-list',
  templateUrl: './transaction-origins-list.component.html',
  styleUrls: ['./transaction-origins-list.component.css']
})
export class TransactionOriginsListComponent implements OnInit {

  transactionOrigins: TransactionOrigins[] = [];

  constructor(
    private transactionOriginsService: TransactionOriginsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadTransactionOrigins();
  }

  loadTransactionOrigins(): void {
    this.transactionOriginsService.getTransactionOrigins().subscribe(
      (data: TransactionOrigins[]) => {
        this.transactionOrigins = data;
      },
      (error) => {
        console.error('Error al cargar los orígenes de transacción', error);
        this.alertService.showError();
      }
    );
  }

  deleteTransactionOrigin(id: number): void {
    this.transactionOriginsService.deleteTransactionOrigin(id).subscribe(
      () => {
        this.transactionOrigins = this.transactionOrigins.filter(origin => origin.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el origen de transacción', error);
        this.alertService.showError();
      }
    );
  }
}
