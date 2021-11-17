import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userData!: any;
  userId!: number;
  isLoaded: boolean = false;

  constructor(private userService: UserService, private router: Router,private route: ActivatedRoute) {
    this.userId= Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.retrieveUser();
  }
  retrieveUser(): void {
    this.userId= Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.userId)
    this.userService.getUserById(this.userId)
      .subscribe((response:any) => {
        this.userData = _.cloneDeep(response);
        this.isLoaded = true;
      });
  }
}
