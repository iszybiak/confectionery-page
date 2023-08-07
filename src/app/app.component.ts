import {Component, OnInit} from '@angular/core';
import {Product} from "./product";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "./product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public products: Product[] ;
  // public editProduct: Product;
  // public deleteProduct: Product;

  constructor(private productService: ProductService){
    this.products = [];
  }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        console.log(this.products);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(product: Product | null, mode: string): void {
    const container = document.getElementById('mainContainer');
    if (container !== null) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        console.log(document.getElementById('addProductModal'))
        button.setAttribute('data-target', '#addProductModal');
      }
      if (mode === 'edit') {
        console.log("Edit")
        button.setAttribute('data-target', '#editProductModal');
      }
      if (mode === 'delete') {
        button.setAttribute('data-target', '#deleteProductModal');
      }
      container.appendChild(button);
      button.click();
    }else {
      console.log("Błąd")
    }
  }

}
