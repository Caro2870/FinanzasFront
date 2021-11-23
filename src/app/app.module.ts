import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//external

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login/login.component';
import {
  CapitalizationPeriodDialog,
  DaysPerYearDialog, DiscountDateDialog, FinalReasonDialog,
  IssueDateDialog, PlazoDeTasaDialog,
  RetentionDialog, StartingReasonDialog, TasaEfectivaDialog,
  TotalToReceiveDialog, ValueExpressedDialog
} from "./pages/fee-receipt/fee-receipt.component";
import { RegistroComponent } from './auth/registro/registro.component';
import { MenuComponent } from './menu/menu/menu.component';
import { IndexComponent } from './index/index.component';
import {interceptorProvider} from "./interceptors/prod-interceptor.service";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { FooterComponent } from './pages/footer/footer.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepicker} from "@angular/material/datepicker";
import {MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import { FeeReceiptComponent } from './pages/fee-receipt/fee-receipt.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MainComponent } from './pages/main/main.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {PaymentDateDialog} from "./pages/fee-receipt/fee-receipt.component";
import {YouTubePlayerModule} from "@angular/youtube-player";
import { WalletComponent } from './pages/wallet/wallet.component';
import { NewWalletComponent } from './pages/new-wallet/new-wallet.component';
import { ResultComponent } from './pages/result/result.component';
import {MatTableModule} from "@angular/material/table";
import { QuestionsComponent } from './pages/questions/questions.component';
import { EditWalletComponent } from './pages/edit-wallet/edit-wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    FooterComponent,
    FeeReceiptComponent,
    SidenavComponent,
    LandingComponent,
    MainComponent,
    IssueDateDialog,
    PaymentDateDialog,
    TotalToReceiveDialog,
    RetentionDialog,
    DaysPerYearDialog,
    PlazoDeTasaDialog,
    TasaEfectivaDialog,
    DiscountDateDialog,
    StartingReasonDialog,
    FinalReasonDialog,
    ValueExpressedDialog,
    CapitalizationPeriodDialog,
    WalletComponent,
    NewWalletComponent,
    ResultComponent,
    QuestionsComponent,
    EditWalletComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatOptionModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        BrowserModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        YouTubePlayerModule,
        MatTableModule,
        // ToastrModule added
    ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
