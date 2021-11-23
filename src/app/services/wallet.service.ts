import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Wallet} from "../models/wallet";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

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
  getWalletById(id:number):Observable<any>{
    console.log(`${this.basePath}/${id}/wallets/`)
    return this.http.get<any>(`${this.basePath}/${id}/wallets/`)
      .pipe(retry(2), catchError(this.handleError));
  }
  updateWallet(userId: number, walletId:number, wallet: Wallet):Observable<any>{
    return this.http.put<any>(`${this.basePath}/users/${userId}/wallets/${walletId}`, wallet)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAllWalletsByUserId(userId:number):Observable<any>{
    return this.http.get<any>(`${this.basePath}/users/${userId}/wallets/`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  createWalletByUserId(userId:number, item:any): Observable<Wallet> {
    return this.http.post<any>(`${this.basePath}/wallets/user/${userId}/`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteWallet(walletId: number): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/wallets/${walletId}`, this.httpOptions);
  }
}
