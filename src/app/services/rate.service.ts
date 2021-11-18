import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {NuevoUsuario} from "../models/nuevo-usuario";
import {Rate} from "../models/rate";

@Injectable({
  providedIn: 'root'
})
export class RateService {

  basePath ='https://finanzasbricava.herokuapp.com/api/rates';
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
  public saveRate(rate: Rate): Observable<any> {
    return this.http.post<any>(this.basePath, rate);
  }
}
