import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setJWTToken(token: string) {
    localStorage.setItem('AccessToken', token);
    console.log("JWT Token set Successfully");
    }
  
    getJWTToken(){
    return localStorage.getItem('AccessToken');
    }
  
    DeleteJWTToken() {
      localStorage.removeItem('AccessToken');
      console.log("JWT Token deleted Successfully");
    }
}
