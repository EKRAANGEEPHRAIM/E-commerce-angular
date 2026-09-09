import { Component } from '@angular/core';
import {FormsModule, } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj : any = [
   {
    userName: '',
    passWord:''
   }
  ]

constructor(private router: Router  ){}


  onLogin() {
    if(this.loginObj.userName == "admin" && this.loginObj.passWord == "33455") {
this.router.navigateByUrl('/product')
    }
    else{
      alert('wrong credentials')
    }
  }
}
