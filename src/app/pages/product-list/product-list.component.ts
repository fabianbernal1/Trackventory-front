import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/productCategory';
import { CategoryService } from 'src/app/services/category.service';
import { AlertService } from 'src/app/services/alert.service'; // Asegúrate de importar tu servicio correctamente


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: ProductCategory[] = [];

  filters = {
    productId: '',
    name: '',
    purchasePrice: undefined as number | undefined,
    salePrice: undefined as number | undefined,
    categoryId: ''
  };



  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // Cargar todos los productos inicialmente
    this.loadProducts();

    // Cargar todas las categorías para el filtro
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Método para cargar productos con o sin filtros
  loadProducts(): void {
    const { productId, name, purchasePrice, salePrice, categoryId } = this.filters;
    this.productService.getFilteredProducts(productId, name, purchasePrice, salePrice, categoryId)
      .subscribe(products => {
        this.products = products;
      });

  }

  // Aplicar los filtros
  applyFilters(): void {
    this.loadProducts(); // Recargar la lista de productos con los filtros aplicados
  }

  // Limpiar los filtros
  clearFilters(): void {
    this.filters = {
      productId: '',
      name: '',
      purchasePrice: undefined as number | undefined,
      salePrice: undefined as number | undefined,
      categoryId: ''
    };
    this.loadProducts(); // Recargar la lista de productos sin filtros
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(product => product.productId !== productId);
        this.alertService.showSuccess();
      },
      (error) => {
        this.alertService.showError();
        console.error('Error al eliminar el producto', error);
      }
    );
  }

}
