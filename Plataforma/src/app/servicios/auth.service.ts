import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { 

  }

  obtenerLogin(correo: string, password: string){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/auth/login/user",{username: correo, password: password})
  }

}
