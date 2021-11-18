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

@Component({
  selector: 'app-fee-receipt',
  templateUrl: './fee-receipt.component.html',
  styleUrls: ['./fee-receipt.component.css']
})
export class FeeReceiptComponent implements OnInit {
  // @ts-ignore
  // @ts-ignore
  reasons: Array<any> = []
  initialCosts: Array<Cost> = []
  finalCosts: Array<Cost> = []
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
  isRateId: boolean = false;
  isFeeReceiptId: boolean = false;
  //Rate
  rate_id: any;
  selected_rate_type = 'efectiva';
  percentage: any
    //rateterm: getNumberOfDays(selected_rate_plazo)
  discount_date: any;

  //Datos del recibo por honorarios
  issue_date:any
  payment_date:any
  net_worth :any
    //retention:get_retention



  push_initial_adapted_costs(id_reason: number, value: number){
    let reason = this.getReasonById(Number(id_reason))
    this.initial_adapted_costs.push(new Adapted_cost(reason, Number(id_reason), value))
    this.initialCosts.push(new Cost(true, value, true))
  }

  push_final_adapted_costs(id_reason: number, value: number){
    let reason = this.getReasonById(Number(id_reason))
    this.final_adapted_costs.push(new Adapted_cost(reason, Number(id_reason), value))
    this.finalCosts.push(new Cost(false, value, true))
  }

  getReasonById(id: number){
    return this.reasons[id-1].description;
  }

  constructor(private router: Router, private route: ActivatedRoute,
              private walletApiService: WalletService,
              private reasonService: ReasonService,
              private rateService: RateService,
              private feeReceiptService: FeeReceiptService,
              private costService: CostService) { }


  ngOnInit(): void {
    this.getWallet()
    this.getReasons()
  }

  getReasons(){
    this.reasonService.getReasons()
      .subscribe((response: any ) =>{
        this.reasons = response.content;
        console.log(this.reasons);
      });
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
    this.walletId = Number(this.route.snapshot.paramMap.get('walletId'));
    this.walletApiService.getWalletById(this.walletId)
      .subscribe((response:any)=>{
        this.wallet = response;
        console.log(this.walletId)
        console.log(this.wallet)
        this.isLoaded = true;
      })
  }

  saveItems(){
    this.saveRate()
  }

  saveRate(){
    let rate_type = (this.selected_rate_type=='efectiva')
    console.log(this.discount_date)
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
    this.discount_date=""
    this.initial_cost_value=""
    this.final_cost_value=""
    this.final_adapted_costs =[]
    this.initial_adapted_costs=[]
    this.finalCosts=[]
    this.initialCosts=[]
  }
}
