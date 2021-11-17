import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistroComponent} from "./auth/registro/registro.component";
import {FeeReceiptComponent} from "./pages/fee-receipt/fee-receipt.component";
import {SidenavComponent} from "./pages/sidenav/sidenav.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {MainComponent} from "./pages/main/main.component";

const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistroComponent },
  //{ path: 'fee-receipt', component: FeeReceiptComponent},
  { path: 'user/:id/main', component: MainComponent },
  //{ path: 'user/:id/wallets', component: MainComponent },
  { path: 'user/:id/wallets/:walletId', component: FeeReceiptComponent },
  //{ path: 'user/:id/wallets/:walletId/results', component: MainComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
