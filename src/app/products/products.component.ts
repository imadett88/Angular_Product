import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products :Array<Product>=[];
  public keyword: string="";
  totalPages : number = 0;
  pageSize : number = 3;
  currentPage : number = 1;
  //products! : demande le compilateur de ignoré  | products$ : variable observable
  constructor(private productService:ProductService, private router : Router) {
  }

  ngOnInit() {
    this.searchProducts();
  }


    searchProducts(){

    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next : (resp) => {
          this.products=resp.body as Product[]; //!ignoré le type
          let totalProducts:number =parseInt(resp.headers.get('x-total-count')!); //parseInt : int => string
          this.totalPages = Math.floor(totalProducts / this.pageSize); //Math.floor => supp les virgules ,,,,
          if(totalProducts % this.pageSize !=0 ){
            this.totalPages = this.totalPages+1;
          }
        },
        error : err => {
          console.log(err);
        }
      })

      //this.products=this.productService.getProducts().pipe();
      //.pipe() => pour la gestion des erreurs

  }

  handleCheckProduct(product: Product) {
    this.productService.checkProducts(product).subscribe({
      next :updatedProduct => {
        product.checked=!product.checked;
        //this.getProducts();
      }
    })
  }

    handleDelete(product: Product) {
    if(confirm("Etes voUs sûre?"))
    this.productService.deleteProduct(product).subscribe({
        next:value => {
          //this.getProducts();
            this.products=this.products.filter(p=>p.id!=product.id);
        }
    })
    }

    // searchProducts() {
    //   this.currentPage=1;
    //   this.totalPages=0;
    //   this.productService.searchProducts(this.keyword,this.currentPage, this.pageSize).subscribe({
    //       next: value => {
    //           this.products=value;
    //       }
    //   })
    // }

    handleGoToPage(page: number) {
        this.currentPage=page;
        this.searchProducts();
    }

    handleEdit(product: Product) {
      this.router.navigateByUrl(`/editProduct/${product.id}`)
    }
}
