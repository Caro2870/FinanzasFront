import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";
import {NewAccountComponent} from "./pages/new-account/new-account.component";
import {FeeReceiptComponent} from "./pages/fee-receipt/fee-receipt.component";
import {SidenavComponent} from "./pages/sidenav/sidenav.component";

const routes: Routes = [

  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: NewAccountComponent },
  { path: 'fee-receipt', component: FeeReceiptComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
