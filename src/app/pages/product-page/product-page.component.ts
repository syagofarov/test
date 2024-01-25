import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {
  title = 'my-app';
  loading = true;
  selectedCategory = '';
  search = '';
  itemsPerPage = 10; // Количество продуктов на странице
  currentPage = 1; // Текущая страница
  totalProducts = 100; // Общее количество продуктов
  is_filter = true;
  is_search = false;

  products: IProduct[] = [];
  categories: string[] = [];

  constructor(private productsService: ProductService) {
  }

  filterProductsByCategory(category: string): void {
    this.loading = true;
    this.productsService.getProductsByCategory(category).subscribe(productsApi => {
      this.products = productsApi.products;
      this.totalProducts = productsApi.total;
      this.loading = false;
    });
  }

  searchProductsByText(search: string): void {
    this.loading = true;
    this.productsService.searchProducts(search).subscribe(productsApi => {
      this.products = productsApi.products;
      this.totalProducts = productsApi.total;
      this.loading = false;
    });
  }

  clearFilter(): void {
    this.loading = true;
    this.selectedCategory = '';
    this.currentPage = 1;
    this.productsService.getProducts(0, 10).subscribe(productsApi => {
      this.products = productsApi.products;
      this.totalProducts = productsApi.total;
      this.loading = false;
    });
  }

  onCategoryChange(): void {
    this.currentPage = 1; // Сбросить текущую страницу при изменении категории
    if (this.selectedCategory !== '') {
      this.filterProductsByCategory(this.selectedCategory);
    } else {
      this.loadProducts();
    }
  }
  
  onSearchChange(): void {
    // const term = (event.target as HTMLInputElement).value;
    // this.search = term;
    this.currentPage = 1; // Сбросить текущую страницу при изменении категории
    if (this.search !== '') {
      this.searchProductsByText(this.search);
    } else {
      this.loadProducts();
    }
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    if (this.selectedCategory !== '') {
      this.filterProductsByCategory(this.selectedCategory);
    } else {
      this.loadProducts();
    }
  }

  private loadProducts(): void {
    this.loading = true;
    this.productsService.getProducts((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage).subscribe(productsApi => {
      this.products = productsApi.products;
      this.totalProducts = productsApi.total;
      this.loading = false;
    });
  }

  getTotalPages(): number {
    return Math.ceil(this.totalProducts / this.itemsPerPage);
  }

  activateFilter(): void {
    this.search = '';
    this.selectedCategory = '';
    this.is_filter = true;
    this.is_search = false;
    this.loadProducts();
  }

  activateSearch(): void {
    this.search = '';
    this.selectedCategory = '';
    this.is_filter = false;
    this.is_search = true;
    this.loadProducts();
  }

  ngOnInit(): void {
    this.loading = true;

    this.productsService.getProducts(0, 10).subscribe( productsApi => {
      this.products = productsApi.products;
    })

    this.productsService.getCategories().subscribe (categories => {
      this.categories = categories
      this.loading = false;
    })
  }
}
