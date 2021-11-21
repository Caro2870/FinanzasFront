import { Component, OnInit } from '@angular/core';
import {map, shareReplay} from "rxjs/operators";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  userId!: number;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }
  navigateToMain(): void {
    this.router.navigate([`/user/${this.userId}/main`]).then(() => null);
  }
  navigateToWallets(): void {
    this.router.navigate([`/user/${this.userId}/wallets`]).then(() => null);
  }
  navigateToQa(): void {
    this.router.navigate([`/user/${this.userId}/qa`]).then(() => null);
  }
}
