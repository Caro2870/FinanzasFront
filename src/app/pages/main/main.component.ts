import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {UserService} from "../../services/user.service";
import {Wallet} from "../../models/wallet";
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userData!: any;
  userId!: number;
  isLoaded: boolean;
  isEmpty!: boolean;
  wallet: Wallet;
  wallets: Array<Wallet>;
  walletId!: number;

  constructor(private userService: UserService, private walletService: WalletService, private router: Router, private route: ActivatedRoute) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.wallet = {} as Wallet;
    this.wallets = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.retrieveUser();
    this.retrieveWallet();
    this.retrieveLastWallet();
  }
  retrieveUser(): void {
    this.userId= Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.userId)
    this.userService.getUserById(this.userId)
      .subscribe((response:any) => {
        this.userData = _.cloneDeep(response);
        this.isLoaded = true;
      });
  }
  retrieveWallet(): void {
    this.walletService.getAllWalletsByUserId(this.userId)
      .subscribe((response:any) => {
        let countWallets = response['totalElements'];
        if(countWallets==0){
          this.isEmpty = true;
          return;
        } else {
          this.isEmpty = false;
          this.walletId = response['content'][countWallets-1]['id'];
          this.retrieveLastWallet();
        }
      });
  }
  retrieveLastWallet(): void {
    this.walletService.getWalletById(this.walletId)
      .subscribe((response:any) => {
        if (!response){
          return;
        }
        this.wallet = _.cloneDeep(response);
        this.wallet.name = this.wallet.name.toUpperCase();
      });
  }
  navigateToWallet(): void {
    this.router.navigate([`/user/${this.userId}/wallets/${this.walletId}`]).then(() => null);
  }
  navigateToAllWalletsByUserId(): void {
    this.router.navigate([`/user/${this.userId}/wallets`]).then(() => null);
  }
}
