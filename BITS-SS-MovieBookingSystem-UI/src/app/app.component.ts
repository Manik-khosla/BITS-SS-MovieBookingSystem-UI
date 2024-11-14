import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  isUserLoggedIn: boolean = false

  constructor(private router: Router) {
    
  }

  Login() {
    this.router.navigate(['login']);
    document.getElementById("navbar-toggle-btn")?.click();
  }

  SignupNewUser() {
    this.router.navigate(['signup']);
    document.getElementById("navbar-toggle-btn")?.click();
  }
 
}
