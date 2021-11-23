import { Component, OnInit } from '@angular/core';
import {NewWalletComponent} from "../new-wallet/new-wallet.component";
import {WalletService} from "../../services/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditWalletComponent} from "../edit-wallet/edit-wallet.component";

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
        this.len = response['totalElements'];
      })
  }
  editWallet(walletId: number, name: number, description: number, walletCurrencyType: boolean, walletTir: number, walletTotalValue: number): void {
    this.dialog.open(EditWalletComponent, {data: {userId: this.userId,
        walletId: walletId,
        name: name,
        description: description,
        currency_type: walletCurrencyType,
        tir: walletTir,
        total_value: walletTotalValue}});
  }
  deleteWallet(walletId: number): void {
    this.walletService.deleteWallet(walletId).subscribe( () => {
      window.location.reload(true);
    });
  }
  openDialog(): void {
    this.dialog.open(NewWalletComponent, {data: {userId: this.userId}});
  }
  navigateToWallet(walletId:number): void {
    this.router.navigate([`/user/${this.userId}/wallets/${walletId}`]).then(() => null);
  }
}
