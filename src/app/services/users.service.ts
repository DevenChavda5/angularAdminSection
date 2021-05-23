import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { HeaderComponent } from '../header/header.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements CanActivate {

  private usersList = []
  private isUserLoggedIn = new Subject<boolean>();
  private observeUserSession: Observable<any>;

  constructor(private route: Router) {
    this.observeUserSession = this.isUserLoggedIn.asObservable();

    this.usersList.push({ id: 1, name: 'a', email: 'a@gmail.com', country: 'India', date: new Date().toDateString(), status: 'Active' })
    this.usersList.push({ id: 2, name: 'b', email: 'b@gmail.com', country: 'India', date: new Date().toDateString(), status: 'Active' })
    this.usersList.push({ id: 3, name: 'c', email: 'c@gmail.com', country: 'India', date: new Date().toDateString(), status: 'Active' })
    this.usersList.push({ id: 4, name: 'd', email: 'd@gmail.com', country: 'India', date: new Date().toDateString(), status: 'Active' })
    this.usersList.push({ id: 5, name: 'e', email: 'e@gmail.com', country: 'India', date: new Date().toDateString(), status: 'Active' })
    this.usersList.push({ id: 6, name: 'f', email: 'f@gmail.com', country: 'India', date: new Date().toDateString(), status: 'Active' })
    this.usersList.push({ id: 7, name: 'g', email: 'g@gmail.com', country: 'India', date: new Date().toDateString(), status: 'Active' })
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.observeUserSession;
  }

  redirectLoggedInTo() {

  }
  addUserToList(userDetails: Object) {
    const obj = JSON.parse(JSON.stringify(userDetails))
    if (this.usersList.findIndex(p => p.id == obj.id) >= 0) {
      alert('TeamMate is there already!');
      return;
    } else {
      this.usersList.push(userDetails);
      // this.usersList.splice(5, 0, userDetails); can add like this too, for this need index so used push(will add at last)
    }
  }

  updateUserByIndex(index: number, userDetails: Object) {
    this.usersList.splice(Number(index), 1);
    this.usersList.splice(Number(index), 0, Object.assign(userDetails, { date: new Date().toDateString(), status: 'Active' }))
  }

  deleteUserFromList(i: number) {
    this.usersList.splice(i, 1);
    console.warn(this.usersList);
  }

  loginUser() {
    this.isUserLoggedIn.next(true);
    this.route.navigateByUrl('das');
  }

  logOutUser() {
    localStorage.clear();
    this.isUserLoggedIn.next(false);
  }

  getObs() {
    return this.observeUserSession;
  }

  getSub() {
    return this.isUserLoggedIn;
  }

  getUsersList() {
    return this.usersList;
  }
}
