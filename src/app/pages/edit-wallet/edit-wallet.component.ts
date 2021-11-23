import {Component, Inject, OnInit} from '@angular/core';
import {Wallet} from "../../models/wallet";
import {WalletService} from "../../services/wallet.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.css']
})
export class EditWalletComponent implements OnInit {

  name!: string;
  description!: string;
  currency_type!: boolean;

  constructor(private walletService: WalletService,
              public dialogRef: MatDialogRef<EditWalletComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = this.data.name;
    this.description = this.data.description;
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }
  save(): void {
    const editWallet = new Wallet(this.currency_type, this.description, this.name, this.data.tir, this.data.total_value);
    this.walletService.updateWallet(this.data.userId, this.data.walletId, editWallet).subscribe((response: any) => {
      window.location.reload(true);
      this.dialogRef.close();
    });
  }
}
