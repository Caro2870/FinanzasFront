import {Component, OnInit, ViewChild} from '@angular/core';
import {FeeReceiptService} from "../../services/fee-receipt.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Wallet} from "../../models/wallet";
import * as _ from "lodash";
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  walletId!: number;
  userId!: number;
  wallet!: any;
  walletTir!: any;
  walletTotalValue!: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['discountDate',
    'nominal_value',
    'payment_date',
    'days',
    'retention',
    'tasa_efectiva_a_dias',
    'discount_rate',
    'discount',
    'total_starting_costs',
    'total_final_costs',
    'netWorth',
    'received_value',
    'delivered_value',
    'tcea',
    'action'];

  constructor(private walletService: WalletService, private feeReceiptService: FeeReceiptService, private router: Router, private route: ActivatedRoute) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.walletId = Number(this.route.snapshot.paramMap.get('walletId'));
    this.wallet = {} as Wallet;
  }

  ngOnInit(): void {
    this.getWalletById();
    this.getAllFeeReceipts();
  }
  getAllFeeReceipts(): void {
    this.feeReceiptService.getReceiptsByWalletId(this.walletId)
      .subscribe((response: any) => {
        if (!response){
          return;
        }
        this.dataSource = new MatTableDataSource(response.content);
      });
  }
  getWalletById(): void {
    this.walletService.getWalletById(this.walletId)
      .subscribe((response:any) => {
        if (!response){
          return;
        }
        this.wallet = _.cloneDeep(response);
        this.walletTotalValue = this.wallet.total_value.toFixed(2);
        this.walletTir = (this.wallet.tir*100).toFixed(7);
      });
  }
  navigateToWallet(): void {
    this.router.navigate([`/user/${this.userId}/wallets/${this.walletId}`]).then(() => null);
  }
  deleteFeeReceipt(feeReceiptId: number): void {
    this.feeReceiptService.deleteFeeReceipt(feeReceiptId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== feeReceiptId ? o : false;
      });
      this.walletService.updateWallet(this.userId, this.walletId,
        new Wallet(this.wallet.id,this.wallet.description, this.wallet.name, this.wallet.tir,
          this.wallet.total_value)).subscribe(()=>{
        window.location.reload(true);
      })
    });
  }
}
