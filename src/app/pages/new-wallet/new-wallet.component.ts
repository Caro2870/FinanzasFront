import {Component, Inject, OnInit} from '@angular/core';
import {Wallet} from "../../models/wallet";
import {WalletService} from "../../services/wallet.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-wallet',
  templateUrl: './new-wallet.component.html',
  styleUrls: ['./new-wallet.component.css']
})
export class NewWalletComponent implements OnInit {

  name!: string;
  description!: string;
  currency_type!: boolean;

  constructor(private walletService: WalletService,
              public dialogRef: MatDialogRef<NewWalletComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }
  save(): void {
    const newWallet = new Wallet(this.currency_type, this.description, this.name, 0, 0);
    this.walletService.createWalletByUserId(this.data.userId, newWallet).subscribe((response: any) => {
      this.router.navigate([`/user/${this.data.userId}/wallets/${response.id}`]).then(() => null);
      this.dialogRef.close();
    });
  }
}
