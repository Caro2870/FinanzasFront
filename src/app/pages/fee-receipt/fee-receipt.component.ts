import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-fee-receipt',
  templateUrl: './fee-receipt.component.html',
  styleUrls: ['./fee-receipt.component.css']
})
export class FeeReceiptComponent implements OnInit {
  // @ts-ignore
  // @ts-ignore

  isLoaded: boolean = false;
  wallet: any;

  constructor(private router: Router, private route: ActivatedRoute,
              private walletApiService: WalletService) { }

  ngOnInit(): void {
    this.getWallet()
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
