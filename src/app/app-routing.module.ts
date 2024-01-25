import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CatGenerationPageComponent } from './pages/cat-generation-page/cat-generation-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '', 
    component: ProductPageComponent
  },
  {
    path: 'catgeneration', 
    component: CatGenerationPageComponent
  },
  {
    path: 'signup', 
    component: SignupPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
