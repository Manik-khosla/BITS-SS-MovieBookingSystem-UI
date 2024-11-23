import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { User } from './signup/user';
import { LoginService } from './login/login.service';
import { LocalStorageService } from './session/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  isUserLoggedIn: boolean = false;
  LoggedInUserDetails: User = new User;
  name: any;

  constructor(private router: Router, private localStorage: LocalStorageService, private loginService: LoginService) {
    if (localStorage.getJWTToken()) {
      this.isUserLoggedIn = true;
      this.GetUserDetails();
    } else {
      this.loginService.getLoginStatus().subscribe(res => {
        this.isUserLoggedIn = res;
        console.log("In App component set Property isUserLoggedIn " + this.isUserLoggedIn)
        this.GetUserDetails()
      })
    }
    
  }

  Login() {
    this.router.navigate(['login']);
    document.getElementById("navbar-toggle-btn")?.click();
  }

  async GetUserDetails() {
    if(this.LoggedInUserDetails.email) {
     var name = this.LoggedInUserDetails.email.split("@")[0];
      return this.LoggedInUserDetails;
    }else {
    await this.loginService.getLoggedInUserDetails().then(userInfo => {
        this.LoggedInUserDetails.email = userInfo.user.email;
        this.LoggedInUserDetails.id = userInfo.user.id
        var name = this.LoggedInUserDetails.email.split("@")[0];
        this.router.navigate(['../home']);
      })
      return this.LoggedInUserDetails;
    }
  }

  SignupNewUser() {
    this.router.navigate(['signup']);
    document.getElementById("navbar-toggle-btn")?.click();
  }

  LogoutUser() {
    this.loginService.logoutUser().subscribe(response => {
      if (response.message == "Signed out successfully") {
        this.isUserLoggedIn = false;
        this.localStorage.DeleteJWTToken();
        this.router.navigate(['main'])
      }
    })
  }
 
}
