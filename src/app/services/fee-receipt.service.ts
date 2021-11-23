import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Rate} from "../models/rate";
import {FeeReceipt} from "../models/fee-receipt";

@Injectable({
  providedIn: 'root'
})
export class FeeReceiptService {

  basePath ='https://finanzasbricava.herokuapp.com/api';
  constructor(private http:HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  public saveFeeReceipt(feeReceipt: FeeReceipt, rateId: number, walletId: number): Observable<any> {
    return this.http.post<any>(`${this.basePath}/feeRecepeit/rates/${rateId}/wallet/${walletId}`, feeReceipt);
  }
  public updateFeeReceipt(feeReceipt: FeeReceipt, rateId: number, walletId: number, feeReceiptId: number): Observable<any> {
    return this.http.put<any>(`${this.basePath}/rates/${rateId}/wallets/${walletId}/feeReceipts/${feeReceiptId}`, feeReceipt);
  }
  public getReceiptsByWalletId(walletId: number){
    return this.http.get<any>(`${this.basePath}/wallets/${walletId}/feeReceipts`)
  }
  deleteFeeReceipt(feeReceiptId: number): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/feeReceipts/${feeReceiptId}`, this.httpOptions);
  }
}
