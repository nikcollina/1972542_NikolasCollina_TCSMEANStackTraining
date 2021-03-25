import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()                   
export class MyAuthGaurd implements CanActivate {
    constructor(public router:Router) { }
    canActivate(){
      let obj = sessionStorage.getItem("token");
      if(obj!=null){
          return true;
      }else {
          this.router.navigate(["login"]);
          return false;
      }
    }
}