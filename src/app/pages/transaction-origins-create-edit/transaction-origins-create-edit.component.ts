import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionOriginsService } from 'src/app/services/transaction-origins.service';
import { AlertService } from 'src/app/services/alert.service';
import { TransactionOrigins } from 'src/app/models/transactionOrigins';

@Component({
  selector: 'app-transaction-origins-create-edit',
  templateUrl: './transaction-origins-create-edit.component.html',
  styleUrls: ['./transaction-origins-create-edit.component.css']
})
export class TransactionOriginsCreateEditComponent implements OnInit {

  transactionOrigin: TransactionOrigins = {
    id: 0,
    name: '',
    description: '',
    enabled: true
  };

  editMode = false;

  constructor(
    private transactionOriginsService: TransactionOriginsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      this.editMode = true;
      this.transactionOriginsService.getTransactionOriginById(id).subscribe({
        next: (data: TransactionOrigins) => {
          this.transactionOrigin = data;
        },
        error: (err) => {
          console.error('Error al cargar el origen de transacción', err);
          this.alertService.showError(err?.error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.transactionOriginsService.updateTransactionOrigin(this.transactionOrigin.id, this.transactionOrigin).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/transactionOrigins']);
        },
        error: (err) => {
          console.error('Error actualizando el origen de transacción', err);
          this.alertService.showError(err?.error);
        }
      });
    } else {
      this.transactionOriginsService.createTransactionOrigin(this.transactionOrigin).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/transactionOrigins']);
        },
        error: (err) => {
          console.error('Error creando el origen de transacción', err);
          this.alertService.showError(err?.error);
        }
      });
    }
  }
}
