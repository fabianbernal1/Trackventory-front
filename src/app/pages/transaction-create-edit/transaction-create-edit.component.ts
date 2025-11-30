import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transactions } from 'src/app/models/trasanctions';
import { TransactionDetails } from 'src/app/models/transactionDetails';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { TransactionTypes } from 'src/app/models/transactionTypes';
import { TransactionOrigins } from 'src/app/models/transactionOrigins';
import { UserService } from 'src/app/services/user.service';
import { TransactionTypesService } from 'src/app/services/transaction-types.service';
import { TransactionOriginsService } from 'src/app/services/transaction-origins.service';

@Component({
  selector: 'app-transaction-create-edit',
  templateUrl: './transaction-create-edit.component.html',
  styleUrls: ['./transaction-create-edit.component.css']
})
export class TransactionCreateEditComponent implements OnInit {

  transaction: Transactions = {
    id: 0,
    buyer: undefined,
    seller: undefined,
    date: new Date(),
    transactionType: undefined,
    transactionOrigin: undefined,
    enabled: true
  };

  transactionDetails: TransactionDetails[] = [];
  newTransactionDetail: TransactionDetails = { id: 0, transaction: this.transaction, stock: null, quantity: 1,discount_percentage: 0, total: 0,enabled: true };

  stocks: Stock[] = [];
  users: User[] = [];
  transactionTypes: TransactionTypes[] = [];
  transactionOrigins: TransactionOrigins[] = [];

  editMode = false;

  constructor(
    private transactionService: TransactionService,
    private stockService: StockService,
    private userService: UserService,
    private transactionTypesService: TransactionTypesService,
    private transactionOriginsService: TransactionOriginsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.loadStocks();
    this.loadUsers();
    this.loadTransactionTypes();
    this.loadTransactionOrigins();

    if (id) {
      this.editMode = true;
      this.transactionService.getTransactionById(+id).subscribe(data => {
        this.transaction = data;
        this.loadTransactionDetails();
      });
    }
  }

  loadTransactionDetails(): void {
    this.transactionService.getTransactionDetailsByTransactionId(this.transaction.id).subscribe(data => {
      this.transactionDetails = data;
    });
  }

  loadStocks(): void {
    this.stockService.getActiveStocks().subscribe(data => {
      this.stocks = data.filter(s => s.quantity > 0);
    });
  }

  loadUsers(): void {
    this.userService.getActiveUsers().subscribe(data => this.users = data);
  }

  loadTransactionTypes(): void {
    this.transactionTypesService.getActiveTransactionTypes().subscribe(data => this.transactionTypes = data);
  }

  loadTransactionOrigins(): void {
    this.transactionOriginsService.getActiveTransactionOrigins().subscribe(data => this.transactionOrigins = data);
  }

  onSubmit(): void {
    if (!this.transaction.buyer || !this.transaction.seller || !this.transaction.transactionType || !this.transaction.transactionOrigin) {
      this.alertService.showError('Debe completar todos los campos.');
      return;
    }

    this.transactionService.saveTransaction(
      { transactionDetails: this.transactionDetails, buyerId: this.transaction.buyer.id, sellerId: this.transaction.seller.id, transactionType: this.transaction.transactionType.id, transactionOrigin: this.transaction.transactionOrigin.id, transactionDate: this.transaction.date, enabled: this.transaction.enabled }    ).subscribe({
      next: () => {
        this.alertService.showSuccess();
        this.router.navigate(['/transactions']);
      },
      error: err => {
        this.alertService.showError(err?.error);
        console.error('Error al guardar transacción', err);
      }
    });
  }

  addTransactionDetail(): void {
  if (this.newTransactionDetail.stock && this.newTransactionDetail.quantity > 0) {
    
    // Determinar precio según tipo de transacción
    let basePrice = 0;
    const typeId = this.transaction.transactionType?.id;

    if (typeId === 1 || typeId === 4) {
      basePrice = this.newTransactionDetail.stock.id.variation.product.salePrice;
    } else if (typeId === 2 || typeId === 3) {
      basePrice = this.newTransactionDetail.stock.id.variation.product.purchasePrice;
    } else {
      basePrice = this.newTransactionDetail.stock.id.variation.product.salePrice;
    }

    const qty = this.newTransactionDetail.quantity;
    const discount = this.newTransactionDetail.discount_percentage ?? 0;

    const subtotal = basePrice * qty;
    const total = subtotal - (subtotal * (discount / 100));

    this.newTransactionDetail.total = total;

    this.transactionDetails.push({ ...this.newTransactionDetail });
    this.transactionDetails = [...this.transactionDetails];

    this.newTransactionDetail = { id: 0, transaction: this.transaction, stock: null, quantity: 1, total: 0, discount_percentage: 0, enabled: true };
  } else {
    this.alertService.showError('Debe llenar los campos del detalle.');
  }
}


  deleteTransactionDetail(id: number): void {
    this.transactionDetails = this.transactionDetails.filter(d => d.id !== id);
  }

  validateQuantity(): void {
    const max = this.newTransactionDetail.stock?.quantity || Infinity;
    if (this.newTransactionDetail.quantity > max) this.newTransactionDetail.quantity = max;
    if (this.newTransactionDetail.quantity < 1) this.newTransactionDetail.quantity = 1;
  }

  get totalTransactionValue(): number {
    return this.transactionDetails.reduce((t, d) => t + (d.total || 0), 0);
  }
}
