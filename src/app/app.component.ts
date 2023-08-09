import {Component, OnInit} from '@angular/core';
import {Product} from "./product";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "./product.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public products: Product[] ;
  isMelting: boolean = false;
  isNoGluten: boolean = false;
  isNoSugar: boolean = false;
  isKeto: boolean = false;
  isVegan: boolean = false;
  img: String = "/img/default.jpg"
  imgPreview: string | undefined;
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

  onFileChange(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.img = selectedFile.name;
      this.imgPreview = URL.createObjectURL(selectedFile);
    }
  }


  public onAddProduct(addForm: NgForm): void{
    // @ts-ignore
    document.getElementById("add-product-form").click();
    addForm.value.imgSrc = "/img/" +this.img
    this.productService.addProduct(addForm.value).subscribe({
      next: (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public onUpdateProduct(productId: number, product: Product): void {
    this.productService.updateProduct(productId, product).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProducts();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteEmloyee(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProducts();
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
        button.setAttribute('data-target', '#addProductModal');
      }
      if (mode === 'edit') {
        button.setAttribute('data-target', '#editProductModal');
      }
      if (mode === 'delete') {
        button.setAttribute('data-target', '#deleteProductModal');
      }
      container.appendChild(button);
      button.click();
    }
  }


}
