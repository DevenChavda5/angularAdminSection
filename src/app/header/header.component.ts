import { UsersService } from './../services/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  static isUserSignInKey = 'isUserSignedIn'
  static isUserNameKey = 'loggedInUserName'
  signedInUserName: string;
  showRoutes: boolean;
  takTill: Subject<boolean> = new Subject();// for kill subscriber when componant destroy
  constructor(private route: Router, private userS: UsersService) {
    if (localStorage.getItem(HeaderComponent.isUserSignInKey) === 't' && localStorage.getItem(HeaderComponent.isUserNameKey)) {
      this.signedInUserName = localStorage.getItem(HeaderComponent.isUserNameKey);
      this.showRoutes = true
    }
    this.userS.getObs().pipe(takeUntil(this.takTill))
      .subscribe((ob) => {
        this.showRoutes = ob;
        if (ob && localStorage.getItem(HeaderComponent.isUserSignInKey) === 't' && localStorage.getItem(HeaderComponent.isUserNameKey)) {
          this.signedInUserName = localStorage.getItem(HeaderComponent.isUserNameKey);
          //this.showRoutes = true
        }
      })
    // this.userS.getSub().pipe(takeUntil(this.takTill))
    //   .subscribe((ob) => {
    //     console.warn('GET SUB');
    //     console.warn(ob);
    //   })
  }
  ngOnDestroy(): void {
    this.takTill.next(false)
    this.takTill.complete()
  }

  ngOnInit(): void {
  }

  changeShowRoutes(bol: boolean) {
    this.showRoutes = bol;
  }

  logOutUser() {
    this.userS.logOutUser();
  }
}

