import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
 templateUrl:'./login.component.html',
 styles: [`
  em{ float: right; pad-left: 10px; color: #E05C65;}`]
})
export class LoginComponent{

    constructor(private authService: AuthService,private router: Router){
    }
    userName
    password
    mouseoverLogin
    onSubmit(ngForm){
        this.authService.loginUser(ngForm.userName,ngForm.password)
        this.router.navigate(['events'])
    }
    cancel(){
        this.router.navigate(['events'])
    }
}