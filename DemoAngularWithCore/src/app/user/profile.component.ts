import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service';
import { TOASTR_TOKEN,Toastr } from './../common/toastr.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'profile.component.html',
  styles: [`
    em { float: right; padding-left: 10px; color: #E05C65;}
    .error input{ background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999}
    .error ::-moz-placeholder { color: #999}
    .error :-moz-placeholder { color: #999}
    .error :ms-input-placeholder { color: #999}    
  `
]
})
export class ProfileComponent implements OnInit {
  constructor(private router:Router, private authService:AuthService,
    @Inject(TOASTR_TOKEN)  private toastr: Toastr){
    
  }
  
  profileForm:FormGroup
  private firstName: FormControl
  private lastName: FormControl
  
  ngOnInit(): void {
    this.firstName= new FormControl(this.authService.currentUser.firstName,[Validators.required,Validators.pattern('[a-zAZ].*')])
    this.lastName=new FormControl(this.authService.currentUser.lastName,Validators.required)

    this.profileForm= new FormGroup({
      firstName: this.firstName,  
      lastName: this.lastName
    })
  }

  validateFirstName():boolean{
    return this.firstName.valid || this.firstName.untouched
  }
  validateLastName():boolean{
    return this.lastName.valid || this.lastName.untouched
  }
  saveProfile(formValues){
   if(this.profileForm.valid){
      this.authService.updateCurrentUser(formValues.firstName,formValues.lastName)
      this.toastr.success('Profile saved')
   }
  }  

  cancel() {
    this.router.navigate(['events'])
  }
      
}