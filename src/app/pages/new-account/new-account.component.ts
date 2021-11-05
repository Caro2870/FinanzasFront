import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  nombreUsuario!: string;
  password!: string;
  email!: string;
  birth_date!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
