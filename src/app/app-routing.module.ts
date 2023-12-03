import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },
  {
    path: "products", component: ProductsComponent
  },
  {
    path: "newProduct", component: NewProductComponent
  },
  {
    path: "editProduct/:id", component: EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
