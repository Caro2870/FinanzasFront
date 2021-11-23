import { Component, OnInit } from '@angular/core';
import {LoginUsuario} from "../../models/login-usuario";
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  userData!: any;
  password!: string;
  roles: string[] = [];
  errMsj!: string;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        console.log(data)
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.toastr.success('Bienvenido ' + this.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(this.nombreUsuario)

        this.userService.getUserByUserName(this.nombreUsuario)
          .subscribe((response:any) => {
            this.userData = _.cloneDeep(response);
            console.log(this.nombreUsuario)
            this.router.navigate([`user/${this.userData.id}/main`])
          });
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate([`login`])
      }
    );

  }
}
