import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  contactRef=new FormGroup({
    cname: new FormControl(),
    pnumber: new FormControl(),
  });
  contacts : Contact[] = [];
  constructor(public router:Router) { }

  userInfo = JSON.parse(sessionStorage.getItem("user") || "");
  ngOnInit(): void {
  }
  addContact(){
    let cname = this.contactRef.get("cname")?.value
    let pnumber = this.contactRef.get("pnumber")?.value
    let contact = new Contact(cname,pnumber)
    this.contacts.push(contact)
    console.log(this.contacts)
  }

  logOut(){
    sessionStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
  

}
class Contact {
  constructor(public cname:string,public pnumber:string) {}

}

