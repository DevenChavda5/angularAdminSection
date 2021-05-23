import { UsersService } from './../services/users.service';
import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  authedUser: { email: string; pass: string; }; //object has email & pass for auth check(test)
  userForm: FormGroup;
  userName: AbstractControl;//email form abstract control
  userEmail: AbstractControl;//email form abstract control
  userPass: AbstractControl;//password form abstract control

  constructor(private route: Router, private userS: UsersService) {
    if (localStorage.getItem(HeaderComponent.isUserSignInKey) == 't') {
      this.userS.loginUser();
      //new HeaderComponent(this.route).showRoutes = true;
    }
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      userEmail: new FormControl('', [Validators.email, Validators.required]),
      userPass: new FormControl('', [Validators.required, Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
      ),]),
    });
    this.userName = this.userForm.get('userName')
    this.userEmail = this.userForm.get('userEmail')
    this.userPass = this.userForm.get('userPass')

    this.userName.setValue('User User')
    this.userEmail.setValue('a@gmail.com')
    this.userPass.setValue('Pramod@12345')

    this.authedUser = {
      email: 'a@gmail.com',
      pass: 'Pramod@12345'
    }
  }

  loginUser() {
    if (this.userForm.valid && this.authedUser.email !== this.userEmail.value || this.authedUser.pass !== this.userPass.value) {
      console.warn('user is not in list');
    } else {
      console.warn('user is in list');
      localStorage.setItem(HeaderComponent.isUserNameKey, this.userName.value);
      localStorage.setItem(HeaderComponent.isUserSignInKey, 't');
      new HeaderComponent(this.route,this.userS).showRoutes = true;
      this.userS.loginUser();
    }
  }

  ngOnInit(): void {
  }

}
