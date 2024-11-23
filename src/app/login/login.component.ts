import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  userEmail: string = '';
  password: string = '';
  access_token!: string;
  ErrorMessage!: string;
  static SuccessMessage: any;

  constructor(private router: Router , private loginService: LoginService) {}

  LoginUser(userEmail: string,password : string) {
    console.log("userEmail:" + userEmail);
    console.log("password:"+ password);
    this.loginService.loginUser(userEmail,password).subscribe(
      res=> {
        if(res.body.access_token) {
          this.access_token = res.body.access_token;
          console.log("Access token Received -" + this.access_token);
          this.loginService.setAccessToken(this.access_token);
          this.loginService.updateLoginStatus();
          this.router.navigate(['home']);
        }
      },
      errorResponse => {
        for(var key in errorResponse.error) {
        if(errorResponse.error){
        this.ErrorMessage = errorResponse.error['error']
        const myToast = bootstrap.Toast.getOrCreateInstance('#showErrorMsg') 
        myToast.show()
        }
      }
      }
    );
    }  
}
