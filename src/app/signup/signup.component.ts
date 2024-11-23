import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap'
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [User, Router]
})
export class SignupComponent {

  user: User;
  ErrorMessage!: any;
  SuccessMessage!: any;

  constructor(user:User, private signupService: SignupService, private router: Router) { 
    this.user = new User;
    }

  SignupUser(user: User) {
    this.user = user;
   console.log( " user details"   
   + "\nemail=" + user.email
   + "\npassword=" + user.password
  )
   
   this.signupService.signupUser(this.user).subscribe( response => {
    LoginComponent.SuccessMessage = 'user signup completed successfully';
    console.log(this.SuccessMessage);
    this.router.navigate(['login']);
},
  errorResponse => {
    for(var key in errorResponse.error.errors) {
    if(errorResponse.error.errors[key]){
    this.ErrorMessage = errorResponse.error.errors[key]
    const myToast = bootstrap.Toast.getOrCreateInstance('#showErrorMsg') 
    myToast.show()
    }
  }
  }
  )}

}
