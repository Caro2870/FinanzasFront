import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";
import {FeeReceiptComponent} from "./pages/fee-receipt/fee-receipt.component";
import {SidenavComponent} from "./pages/sidenav/sidenav.component";
import {LandingComponent} from "./pages/landing/landing.component";

const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistroComponent },
  { path: 'fee-receipt', component: FeeReceiptComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
