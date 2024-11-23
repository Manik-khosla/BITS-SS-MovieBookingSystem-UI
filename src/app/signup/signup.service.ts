import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { URLGenerator } from '../URLGenerator';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  errorMessage!: String; 
  constructor(private http: HttpClient) {}

  signupUser(user: User) {
    var payload = {
      "user" : {
        "email": user.email,
        "password": user.password,
      }
    }
   return this.http.post<any> (URLGenerator.SignupURL, payload, {responseType: 'json', observe : 'body'})
  }
}
