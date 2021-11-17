import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WalletService} from "../../services/wallet.service";
import {ReasonService} from "../../services/reason.service";
import {Cost} from "../../models/cost";
import {Adapted_cost} from "../../models/adapted_cost";

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
  selected_rate_type = 'efectiva';
  selected_rate_plazo = 'anu';
  selected_capitalization ='anu';
  total_to_receive : any;
  isLoaded: boolean = false;
  wallet: any;
  initial_cost_value: any;
  final_cost_value: any;
  initial_adapted_costs: Array<Adapted_cost> = [];
  final_adapted_costs: Array<Adapted_cost> = [];
  selected_initial_cost: string="";
  selected_final_cost: string="";

  push_initial_adapted_costs(id_reason: string, value: number){
    let reason = this.getReasonById(Number(id_reason))
    this.initial_adapted_costs.push(new Adapted_cost(reason, Number(id_reason), value))
    this.initialCosts.push(new Cost(false, value, true))
  }

  push_final_adapted_costs(id_reason: string, value: number){
    let reason = this.getReasonById(Number(id_reason))
    this.final_adapted_costs.push(new Adapted_cost(reason, Number(id_reason), value))
    this.initialCosts.push(new Cost(true, value, true))
  }

  getReasonById(id: number){
    return this.reasons[id-1].description;
  }

  constructor(private router: Router, private route: ActivatedRoute,
              private walletApiService: WalletService,
              private reasonService: ReasonService ) { }


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
    return 0.08*this.total_to_receive;
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
    let walletId = Number(this.route.snapshot.paramMap.get('walletId'));
    this.walletApiService.getWalletById(walletId)
      .subscribe((response:any)=>{
        this.wallet = response;
        console.log(walletId)
        console.log(this.wallet)
        this.isLoaded = true;
      })
  }
}
