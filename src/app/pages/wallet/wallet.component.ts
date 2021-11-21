import { Component, OnInit } from '@angular/core';
import {NewWalletComponent} from "../new-wallet/new-wallet.component";
import {WalletService} from "../../services/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  wallets!: Array<any>;
  userId!: number;
  isEmpty!: boolean;
  len!: number;

  constructor(public walletService: WalletService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getAllWallets();
  }
  getAllWallets(): void {
    this.walletService.getAllWalletsByUserId(this.userId)
      .subscribe((response: any) => {
        if (!response){
          return;
        }
        this.wallets = response['content'];
        this.wallets.reverse();
        this.len = response['totalElements'];
      })
  }
  openDialog(): void {
    this.dialog.open(NewWalletComponent, {data: {userId: this.userId}});
  }
  navigateToWallet(walletId:number): void {
    this.router.navigate([`/user/${this.userId}/wallets/${walletId}`]).then(() => null);
  }
}
