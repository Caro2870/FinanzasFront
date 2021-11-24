import {Component, Inject, OnInit} from '@angular/core';
import {Wallet} from "../../models/wallet";
import {WalletService} from "../../services/wallet.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }
  save(): void {
    if(this.currency_type == null || this.description == null || this.name == null) {
      this.toastr.info('Completa todos los campos', 'Atención', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
    const newWallet = new Wallet(this.currency_type, this.description, this.name, 0, 0);
    this.walletService.createWalletByUserId(this.data.userId, newWallet).subscribe((response: any) => {
      this.router.navigate([`/user/${this.data.userId}/wallets/${response.id}`]).then(() => null);
      this.dialogRef.close();
    });
  }
}
