import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupRef=new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    uname: new FormControl(),
    pass: new FormControl(),
  });
  msg:string=""
  
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  makeUser(){
    let fname = this.signupRef.get("firstName")?.value
    let lname = this.signupRef.get("lastName")?.value
    let uname = this.signupRef.get("uname")?.value
    let pass = this.signupRef.get("pass")?.value
    let user = new User(fname,lname,uname,pass)
    console.log(user)
    if (fname == null || lname == null || uname == null || pass == null) {
      this.msg="Please Fill Out All Fields"
    }
    else {
    sessionStorage.setItem("user", JSON.stringify(user));
    this.router.navigate(["login"]);
    }
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
