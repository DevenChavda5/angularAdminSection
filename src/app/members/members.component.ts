import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass'],
  providers: [UsersService]
})
export class MembersComponent implements OnInit, CanActivate {

  membersList: Array<object> = [];
  headingsList = ['Id', 'Name', 'Email', 'Country', 'Date', 'Status'];
  showAddNewUserBoxes = false;
  showBtnTxt = '';
  addTeamMateFormG: FormGroup;
  id: AbstractControl;
  name: AbstractControl;
  email: AbstractControl;
  country: AbstractControl;

  constructor(private userS: UsersService) {
    this.membersList = userS.getUsersList()
    this.addTeamMateFormG = new FormGroup({
      id: new FormControl('', [Validators.required,]),
      name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.email, Validators.required]),
      country: new FormControl('', [Validators.required,]),
    });
    this.id = this.addTeamMateFormG.get('id');
    this.name = this.addTeamMateFormG.get('name');
    this.email = this.addTeamMateFormG.get('email');
    this.country = this.addTeamMateFormG.get('country');

    this.id.setValue('11')
    this.name.setValue('z')
    this.email.setValue('z@gmail.com')
    this.country.setValue('India')
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userS.getObs();
  }

  addOrEditUser(index: string | number) {
    if (String(index).includes('add')) {
      if (this.showBtnTxt.includes('Update')) {
        this.showAddNewUserBoxes = false;
        this.userS.updateUserByIndex(Number(index), this.addTeamMateFormG.value)
        this.addTeamMateFormG.reset()
      } else {
        console.warn('Adddddddddddd');
        this.showAddNewUserBoxes = false;
        // console.warn('Add');
        this.userS.addUserToList(Object.assign(this.addTeamMateFormG.value, { date: new Date().toDateString(), status: 'Active' }));
        this.addTeamMateFormG.reset()
      }
    } else if (index >= 0) {
      this.showAddNewUserBoxes = true;
      this.showBtnTxt = 'Update TeamMate'
      this.addTeamMateFormG.patchValue(this.membersList[index])
    }
  }

  deleteUser(id: any) {
    this.userS.deleteUserFromList(id);
  }

  createMember() {
    this.showBtnTxt = 'Add Teammate'
    this.showAddNewUserBoxes = !this.showAddNewUserBoxes;
    this.addTeamMateFormG.reset()
  }

  ngOnInit(): void {
  }

}
