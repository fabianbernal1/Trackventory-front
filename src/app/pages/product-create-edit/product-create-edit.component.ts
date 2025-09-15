import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductCategory } from 'src/app/models/productCategory';
import { MatDialog } from '@angular/material/dialog';
import { ProductVariationService } from 'src/app/services/product-variation.service';
import { ProductVariation } from 'src/app/models/productVariation';
import { ProductVariationCreateEditComponent } from '../product-variation-create-edit/product-variation-create-edit.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.css']
})
export class ProductCreateEditComponent implements OnInit {

  product: Product = {
    productId: '',
    name: '',
    purchasePrice: 0,
    salePrice: 0,
    profitMargin: 0,
    category: null,
    enabled: true
  };

  productVariations: ProductVariation[] = [];
  categories: ProductCategory[] = [];
  editMode = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private productVariationService: ProductVariationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.loadCategories();

    if (productId) {
      this.editMode = true;
      this.productService.getProductById(productId).subscribe((data: Product) => {
        this.product = data;
        this.loadProductVariations();
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getActiveCategories().subscribe((categories: ProductCategory[]) => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.productService.updateProduct(this.product.productId, this.product).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error actualizando el producto', err);
          this.alertService.showError(err?.error);
        }
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error creando el producto', err);
          this.alertService.showError(err?.error);
        }
      });
    }
  }

  // Variaciones
  loadProductVariations(): void {
    this.productVariationService.getProductVariationsByProductReference(this.product.productId)
      .subscribe(variations => {this.productVariations = variations
      });
  }

  openAddVariationDialog(): void {
    const dialogRef = this.dialog.open(ProductVariationCreateEditComponent, {
      width: '400px',
      data: { productId: this.product.productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProductVariations();
      }
    });
  }

  openEditVariationDialog(variation: ProductVariation): void {
    const dialogRef = this.dialog.open(ProductVariationCreateEditComponent, {
      width: '400px',
      data: { productVariation: variation, productId: this.product.productId }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadProductVariations();
    });
  }

  deleteVariation(code: string): void {
    this.productVariationService.deleteProductVariation(code).subscribe({
      next: () => {
        this.alertService.showSuccess();
        this.loadProductVariations();
      },
      error: (err) => {
        console.error('Error eliminando la variacion', err);
        this.alertService.showError(err?.error);
        this.loadProductVariations();
      }
    });
  }

  compareCategories(c1: ProductCategory, c2: ProductCategory): boolean { return c1.id === c2.id; }
}
