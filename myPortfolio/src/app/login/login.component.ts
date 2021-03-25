import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRef=new FormGroup({
    user: new FormControl(),
    pass: new FormControl(),
  });
  msg:string=""
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  loginAttempt(){
    this.router.navigate(["portfolio"]);
  }
  checkUser() {
    let user = this.loginRef.get("user")?.value
    let pass = this.loginRef.get("pass")?.value
    let userInfo = new User("","","","")
    try {
      let user = JSON.parse(sessionStorage.getItem("user") || "");
      userInfo = new User(user.firstName,user.lastName,user.user,user.pass) 
    }
    catch(e) {
      let userInfo=""
    }
    if (userInfo.getuser() != "") {
      if (user == userInfo.getuser() && pass == userInfo.getpass()) {
        this.msg = "Successful Login"
        sessionStorage.setItem("token","123");
        this.router.navigate(["portfolio"]);
      }
      else {
        this.msg = "Unsuccessful Try Again"
      }
    }
    else {
      this.msg = "Please Sign Up"
    }
  }


  goSignUp() {
    this.router.navigate(["signup"]);
  }

}
class User {
  constructor(public firstName:string,public lastName:string,private user:string,private pass:string) {}
  getuser() : string {
      console.log(this.user)
      return this.user
  }
  getpass() : string {
      console.log(this.pass)
      return this.pass
  }

}