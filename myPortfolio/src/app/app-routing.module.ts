import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SignupComponent } from './signup/signup.component';
import { MyAuthGaurd } from './myauthguard';

const routes: Routes = [
  {path:"\login",component:LoginComponent},
  {path:"\signup",component:SignupComponent},
  {path:"\portfolio",component:PortfolioComponent,canActivate:[MyAuthGaurd]},
  {path:"",redirectTo:"\login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
