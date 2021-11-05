import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";
import {NewAccountComponent} from "./pages/new-account/new-account.component";

const routes: Routes = [

  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: NewAccountComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



