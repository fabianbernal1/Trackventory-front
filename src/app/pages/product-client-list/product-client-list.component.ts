import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from 'src/app/models/stock';
import { ProductCategory } from 'src/app/models/productCategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-client-list',
  templateUrl: './product-client-list.component.html',
  styleUrls: ['./product-client-list.component.css']
})
export class ProductClientListComponent implements OnInit {

  stocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  categories: ProductCategory[] = [];

  filters = {
    name: '',
    salePrice: undefined as number | undefined,
    categoryId: ''
  };

  loading = true;

  constructor(
    private stockService: StockService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadStocks();
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  loadStocks(): void {
    this.stockService.getActiveStocks().subscribe({
      next: (data) => {
        // Filtrar solo productos habilitados
        this.stocks = data.filter(s => s.id.variation.product.enabled);
        this.filteredStocks = [...this.stocks];
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const { name, salePrice, categoryId } = this.filters;

    this.filteredStocks = this.stocks.filter(s => {
      const product = s.id.variation.product;

      return (
        (name ? product.name.toLowerCase().includes(name.toLowerCase()) : true) &&
        (salePrice ? product.salePrice <= salePrice : true) &&
        (categoryId ? product.category?.id === Number(categoryId) : true)
      );
    });
  }

  clearFilters(): void {
    this.filters = {
      name: '',
      salePrice: undefined,
      categoryId: ''
    };
    this.filteredStocks = [...this.stocks];
  }
}
