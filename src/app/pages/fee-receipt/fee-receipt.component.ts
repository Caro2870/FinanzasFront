import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WalletService} from "../../services/wallet.service";
import {ReasonService} from "../../services/reason.service";
import {Cost} from "../../models/cost";
import {Adapted_cost} from "../../models/adapted_cost";
import {RateService} from "../../services/rate.service";
import {Rate} from "../../models/rate";
import {FeeReceiptService} from "../../services/fee-receipt.service";
import {FeeReceipt} from "../../models/fee-receipt";
import {CostService} from "../../services/cost.service";
import {MatDialog} from "@angular/material/dialog";
import {Wallet} from "../../models/wallet";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-fee-receipt',
  templateUrl: './fee-receipt.component.html',
  styleUrls: ['./fee-receipt.component.css']
})
export class FeeReceiptComponent implements OnInit {
  // @ts-ignore
  // @ts-ignore
  reasons: Array<any> = []
  filtered_reasons:  Array<any> = []
  initialCosts: Array<Cost> = []
  finalCosts: Array<Cost> = []
  receipts: Array<any> = []
  selected_rate_plazo = 'anu';
  selected_capitalization ='di';
  isLoaded: boolean = false;
  wallet: any;
  active_discount_date: boolean = false;
  initial_cost_value: any;
  final_cost_value: any;
  initial_adapted_costs: Array<Adapted_cost> = [];
  final_adapted_costs: Array<Adapted_cost> = [];
  selected_initial_cost = 1;
  selected_final_cost =1;
  walletId: any;
  userId: any;
  isRateId: boolean = false;
  isFeeReceiptId: boolean = false;
  //Rate
  rate_id: any;
  selected_rate_type = 'efectiva';
  selected_value_expressed_initial_type = 'in_efec'
  selected_value_expressed_final_type = 'in_efec'
  percentage: any
    //rateterm: getNumberOfDays(selected_rate_plazo)
  discount_date: any;

  //Datos del recibo por honorarios
  issue_date:any
  payment_date:any
  net_worth :any
    //retention:get_retention

  wallet_currency: any
  wallet_is_empty: any

  id_starting_reasons:  Array<number> = []
  id_final_reasons:  Array<number> = []


  push_initial_adapted_costs(id_reason: number, value: number, value_type: string){
    if (this.id_starting_reasons.some(reasonId => reasonId == id_reason)){
      const dialogRef = this.dialog.open(ReasonsErrorDialog);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if (value<0){
      this.toastr.error('Este valor debe ser mayor a 0', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
    else{
      let value_ty = (value_type == 'in_efec')
      let reason = this.getReasonById(Number(id_reason))
      this.initial_adapted_costs.push(new Adapted_cost(reason, Number(id_reason), value))
      this.initialCosts.push(new Cost(true, value, value_ty))
      this.id_starting_reasons.push(id_reason)
      this.initial_cost_value = ''
    }
  }

  push_final_adapted_costs(id_reason: number, value: number, value_type: string){
    if (this.id_final_reasons.some(reasonId => reasonId == id_reason)){
      const dialogRef = this.dialog.open(ReasonsErrorDialog);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if (value<0){
      this.toastr.error('Este valor debe ser mayor a 0', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
    else{
      let value_ty = (value_type == 'in_efec')
      let reason = this.getReasonById(Number(id_reason))
      this.final_adapted_costs.push(new Adapted_cost(reason, Number(id_reason), value))
      this.finalCosts.push(new Cost(false, value, value_ty))
      this.id_final_reasons.push(id_reason)
      this.final_cost_value = ''
    }
  }

  getReasonById(id: number){
    return this.reasons[id-1].description;
  }

  constructor(private router: Router, private route: ActivatedRoute,
              private walletApiService: WalletService,
              private reasonService: ReasonService,
              private rateService: RateService,
              private feeReceiptService: FeeReceiptService,
              private costService: CostService,
              public dialog: MatDialog,
              private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getWallet()
    this.getReasons()
  }

  getReasons(){
    this.reasonService.getReasons()
      .subscribe((response: any ) =>{
        this.reasons = response.content;
        this.filtered_reasons.push(this.reasons[0])
        this.filtered_reasons.push(this.reasons[5])
        this.filtered_reasons.push(this.reasons[9])
        console.log(this.reasons);
      });
  }

  getFeeReceiptsByWalletId(){
    this.feeReceiptService.getReceiptsByWalletId(this.walletId)
      .subscribe((response: any ) =>{
          this.receipts = response.content;
          console.log(this.receipts)
          this.active_discount_date = (this.receipts[0]==null)
        console.log(this.active_discount_date)
        if(!this.active_discount_date)  {
          this.discount_date = this.receipts[0].rate.discount_date
          this.discount_date = this.discount_date.substring(0,10)
        }
          console.log(this.discount_date)
        }
      )
  }

  updateWallet(){
    console.log("RESULTADOS DEL WALLET")
    this.walletApiService.updateWallet(this.userId, this.walletId,
      new Wallet(this.wallet_currency,this.wallet.description, this.wallet.name, this.wallet.tir,
        this.wallet.total_value)).subscribe(data=>{
      this.router.navigate([`/user/${this.userId}/wallets/${this.walletId}/results`]).then(() => null);
      console.log(data)
    })
  }

  getRetention(){
    return 0.08*this.net_worth;
  }

  getNumberOfDays(selected_text: any){
    switch(selected_text) {
      case 'anu':
        return 360;
      case 'sem':
        return 180;
      case 'cuatrim':
        return 120;
      case 'trim':
        return 90;
      case 'bim':
        return 60;
      case 'men':
        return 30;
      case 'quin':
        return 15;
      case 'di':
        return 1;
      default:
        return 0;
    }
  }

  getWallet(): void{
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.walletId = Number(this.route.snapshot.paramMap.get('walletId'));
    this.walletApiService.getWalletByUserIdAndWalletId(this.userId,this.walletId)
      .subscribe((response:any)=>{
        this.wallet = response;
        console.log(this.walletId)
        console.log(this.wallet)
        this.wallet_currency =  response.currency_type
        this.getFeeReceiptsByWalletId();
        this.isLoaded = true;
      })
  }

  saveItems(){
    this.saveRate()
  }

  saveRate(){
    let rate_type = (this.selected_rate_type=='efectiva')
    console.log(this.discount_date)
    if (this.issue_date==null||this.payment_date==null|| this.net_worth==null||this.selected_rate_type==null||
    this.percentage==null || this.selected_rate_plazo == null || this.discount_date == null){
      this.toastr.info('Completa todos los campos', 'Atención', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      console.log(this.net_worth)
    }
    else if (this.net_worth <0 || this.percentage < 0){
      this.toastr.error('Todos los valores númericos deben ser mayores a 0', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
    else{
      this.rateService.saveRate(new Rate(this.getNumberOfDays(this.selected_capitalization), this.discount_date, this.percentage,
        this.getNumberOfDays(this.selected_rate_plazo),rate_type)).subscribe(
        data => {
          this.rate_id = data.id
          console.log(data)
          this.isRateId = true
          this.active_discount_date = true
          this.saveFeeReceipt()
        }
      )
    }
  }

  saveFeeReceipt(){
    if (this.isRateId){
      this.feeReceiptService.saveFeeReceipt( new FeeReceipt(true, this.issue_date, this.net_worth,
        this.payment_date, this.getRetention(), this.getTotalFinalCosts(), this.getTotalInitialCosts()),
        this.rate_id, this.walletId).subscribe(
        data =>{
          this.isFeeReceiptId = true
          console.log(data)
          console.log("mi rateid ", this.rate_id)
          this.isRateId=false;
          this.saveCosts(data.id)
          this.updateFeeReceipt(data.id)
        }
      )
    }
  }

  updateFeeReceipt(feeReceiptId: number){
    this.feeReceiptService.updateFeeReceipt( new FeeReceipt(true, this.issue_date, this.net_worth,
      this.payment_date, this.getRetention(), this.getTotalFinalCosts(), this.getTotalInitialCosts()),
      this.rate_id,this.walletId,feeReceiptId).subscribe(data=>{
        console.log(data)
      this.toastr.success('Recibo agregado con éxito', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.final_adapted_costs = []
      this.finalCosts = []
      this.id_final_reasons = []
      this.initial_adapted_costs = []
      this.initialCosts = []
      this.id_starting_reasons = []
    })
  }

  saveCosts(fee_receipt_id: number){
    if(this.isFeeReceiptId){
      for (let _i = 0; _i < this.initialCosts.length; _i++) {
        let initial_cost = this.initialCosts[_i];
        let adapted_initial_cost = this.initial_adapted_costs[_i];
        this.saveCost(initial_cost, adapted_initial_cost.id_reason, fee_receipt_id)
      }
      for (let _i = 0; _i < this.finalCosts.length; _i++) {
        let final_cost = this.finalCosts[_i];
        let adapted_final_cost = this.final_adapted_costs[_i];
        this.saveCost(final_cost, adapted_final_cost.id_reason, fee_receipt_id)
      }
    }
  }

  saveCost(cost: Cost, reason_id:number, fee_receipt_id: number){
    this.costService.saveCost(cost, reason_id, fee_receipt_id).subscribe(
      data =>{
        console.log(data)
      }
    )
  }

  getTotalFinalCosts(){
    let sum = 0
    this.final_adapted_costs.forEach((final_adapted: Adapted_cost) => {
      sum += final_adapted.value
    });
    return sum
  }

  getTotalInitialCosts(){
    let sum = 0
    this.initial_adapted_costs.forEach((initial_adapted: Adapted_cost) => {
      sum += initial_adapted.value
    });
    return sum
  }
  resetData(){
    this.issue_date=""
    this.payment_date=""
    this.net_worth=""
    this.percentage = ""
    //this.discount_date=""
    this.initial_cost_value=""
    this.final_cost_value=""
    this.final_adapted_costs =[]
    this.initial_adapted_costs=[]
    this.finalCosts=[]
    this.initialCosts=[]
    this.id_final_reasons = []
    this.id_starting_reasons = []
  }
  deleteInitialItem(id: number){
    this.id_starting_reasons.splice(id, 1)
    this.initial_adapted_costs.splice(id, 1)
    this.initialCosts.splice(id, 1)
    console.log("Hola, ",id)
  }
  deleteFinalItem(id: number){
    this.id_final_reasons.splice(id, 1)
    this.final_adapted_costs.splice(id, 1)
    this.finalCosts.splice(id, 1)
    console.log("Hola, ",id)
  }
  openIssueDateDialog() {
    const dialogRef = this.dialog.open(IssueDateDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openPaymentDateDialog() {
    const dialogRef = this.dialog.open(PaymentDateDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openTotalToReceiveDialog() {
    const dialogRef = this.dialog.open(TotalToReceiveDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openRetentionDialog() {
    const dialogRef = this.dialog.open(RetentionDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDaysPerYearDialog() {
    const dialogRef = this.dialog.open(DaysPerYearDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openPlazoDeTasaDialog() {
    const dialogRef = this.dialog.open(PlazoDeTasaDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openTasaEfectivaDialog() {
    const dialogRef = this.dialog.open(TasaEfectivaDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDiscountDateDialog() {
    const dialogRef = this.dialog.open(DiscountDateDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openStartingReasonDialog() {
    const dialogRef = this.dialog.open(StartingReasonDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openFinalReasonDialog() {
    const dialogRef = this.dialog.open(FinalReasonDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openValueExpressedDialog() {
    const dialogRef = this.dialog.open(ValueExpressedDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openCapitalizationPeriodDialog() {
    const dialogRef = this.dialog.open(CapitalizationPeriodDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'issue-date-dialog',
  templateUrl: 'issue-date-dialog.html',
})
export class IssueDateDialog {}

@Component({
  selector: 'payment-date-dialog',
  templateUrl: 'payment-date-dialog.html',
})
export class PaymentDateDialog {}

@Component({
  selector: 'total-to-receive-dialog',
  templateUrl: 'total-to-receive-dialog.html',
})
export class TotalToReceiveDialog {}

@Component({
  selector: 'retention-dialog',
  templateUrl: 'retention-dialog.html',
})
export class RetentionDialog {}

@Component({
  selector: 'days-per-year-dialog',
  templateUrl: 'days-per-year-dialog.html',
})
export class DaysPerYearDialog {}

@Component({
  selector: 'plazo-de-tasa-dialog',
  templateUrl: 'plazo-de-tasa-dialog.html',
})
export class PlazoDeTasaDialog {}

@Component({
  selector: 'tasa-efectiva-dialog',
  templateUrl: 'tasa-efectiva-dialog.html',
})
export class TasaEfectivaDialog {}

@Component({
  selector: 'discount-date-dialog',
  templateUrl: 'discount-date-dialog.html',
})
export class DiscountDateDialog {}

@Component({
  selector: 'starting-reason-dialog',
  templateUrl: 'starting-reason-dialog.html',
})
export class StartingReasonDialog {}

@Component({
  selector: 'final-reason-dialog',
  templateUrl: 'final-reason-dialog.html',
})
export class FinalReasonDialog {}

@Component({
  selector: 'value-expressed-dialog',
  templateUrl: 'value-expressed-dialog.html',
})
export class ValueExpressedDialog {}

@Component({
  selector: 'capitalization-period-dialog',
  templateUrl: 'capitalization-period-dialog.html',
})
export class CapitalizationPeriodDialog {}

@Component({
  selector: 'reasons-error-dialog',
  templateUrl: 'reasons-error-dialog.html',
})
export class ReasonsErrorDialog {}
