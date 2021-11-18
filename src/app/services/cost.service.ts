import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Cost} from "../models/cost";
import {Adapted_cost} from "../models/adapted_cost";

@Injectable({
  providedIn: 'root'
})
export class CostService {

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
  public saveCost(cost: Cost, reason_id:number, fee_receipt_id: number): Observable<any> {
    return this.http.post<any>(`${this.basePath}/cost/reasons/${reason_id}/fee_recepeit/${fee_receipt_id}`, cost);
  }
}
