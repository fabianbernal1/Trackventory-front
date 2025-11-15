import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from 'src/app/services/stock.service';
import { Stock, StockId } from 'src/app/models/stock';
import { ProductVariation } from 'src/app/models/productVariation';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';
import { ProductVariationService } from 'src/app/services/product-variation.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-stock-create-edit',
  templateUrl: './stock-create-edit.component.html',
  styleUrls: ['./stock-create-edit.component.css']
})
export class StockCreateEditComponent implements OnInit {

  stock: Stock = {
    id: {
      store: { storeId: 0, name: '', address: '' ,enabled: true},
      variation: {
        variationId: '',
        color: {
          id: 0,
          name: '',
          hexCode: '',
          enabled: true
        },
        product: {
          productId: '',
          name: '',
          purchasePrice: 0,
          salePrice: 0,
          profitMargin: 0,
          category: null,
          enabled: true
        },
        enabled: true
      },
    },
    quantity: 0,
    enabled: true
  };

  productVariations: ProductVariation[] = [];
  isEditMode = false;

  constructor(
    private stockService: StockService,
    public dialogRef: MatDialogRef<StockCreateEditComponent>,
    private productVariationService: ProductVariationService,
    private storeService: StoreService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.stock) {
      this.stock = { ...data.stock }; // Copia del stock para edición
      this.isEditMode = true;
    } else {
      this.storeService.getStoreById(data.storeId).subscribe({
        next: (store) => {
          this.stock.id.store = store;
        },
        error: (err) => console.error('Error obteniendo la tienda', err)
      });
    }
  }

  ngOnInit(): void {
    this.loadProductVariations();
  }

  loadProductVariations(): void {
    this.productVariationService.getActiveProductVariations().subscribe({
      next: (variations) => {
        this.productVariations = variations;
        console.log(variations);
      },
      error: (err) => console.error('Error cargando las variaciones de producto', err)
    });
  }

  onSave(): void {
    const storeId = this.stock.id.store.storeId;
    const variationCode = this.stock.id.variation.variationId;

    if (this.isEditMode) {
      this.stockService.updateStock(storeId, variationCode, this.stock)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
            this.alertService.showSuccess('Stock actualizado correctamente');
          },
          error: (err) => {
            console.error('Error actualizando el stock', err);
            this.alertService.showError(err?.error);
          }
        });
    } else {
      this.stockService.createStock(this.stock)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
            this.alertService.showSuccess('Stock creado correctamente');
          },
          error: (err) => {
            console.error('Error creando el stock', err);
            this.alertService.showError(err?.error);
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  compareVariations(v1: ProductVariation, v2: ProductVariation): boolean {
    return v1 && v2 ? v1.variationId === v2.variationId : v1 === v2;
  }
}
