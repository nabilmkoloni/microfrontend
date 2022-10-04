import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


export const routes:Routes = [

    {
      path:'',
      component:LoginComponent
    },

    {
        path:'Taxpayer',
        loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule)
    }


]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
