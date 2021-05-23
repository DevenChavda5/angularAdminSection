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
export class MembersComponent implements OnInit {

  membersList = [];
  headingsList = ['Id', 'Name', 'Email', 'Country', 'Date', 'Status'];
  showAddNewUserBoxes = false;
  showAddUserBtn = false;
  showEditUserBtn = false;
  addTeamMateFormG: FormGroup;
  id: AbstractControl;
  name: AbstractControl;
  email: AbstractControl;
  country: AbstractControl;

  constructor(private userS: UsersService) {
    this.membersList = userS.getUsersList();

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

    // this.id.setValue('11')
    // this.name.setValue('z')
    // this.email.setValue('z@gmail.com')
    // this.country.setValue('India')
  }

  addUser() {
    this.showAddNewUserBoxes = false;
    this.showAddUserBtn = false;
    if (this.membersList.findIndex((x) => x.id == this.addTeamMateFormG.value.id) < 0) {//-1 means there is no user so need to add
      this.userS.addUserToList(Object.assign(this.addTeamMateFormG.value, { date: new Date().toDateString(), status: 'Active' }));
      this.addTeamMateFormG.reset()
    }
  }

  editUser(index: number) {
    localStorage.setItem('i', String(index));
    this.showAddNewUserBoxes = true;
    this.showEditUserBtn = true;
    this.showAddUserBtn = false;
    this.addTeamMateFormG.patchValue(this.membersList[index])
  }
  updateUser() {
    this.showAddNewUserBoxes = false;
    this.showEditUserBtn = false;
    this.userS.updateUserByIndex(Number(localStorage.getItem('i')), this.addTeamMateFormG.value)
    this.addTeamMateFormG.reset()
  }

  deleteUser(id: any) {
    this.userS.deleteUserFromList(id);
  }

  createMember() {
    this.showAddNewUserBoxes = !this.showAddNewUserBoxes;
    this.showAddUserBtn = true;
    this.showEditUserBtn = false;
    this.addTeamMateFormG.reset()
  }

  ngOnInit(): void {
  }

}
