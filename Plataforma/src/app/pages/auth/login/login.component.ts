import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  elemento: string;
  inputText;
  public correo: string;
  public password: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  logearse(){
    this.correo=$('#correo').val();
    this.password=$('#password').val();
    console.log('valor del correo: ',this.correo);
    console.log('valor del pass: ',this.password);
  }

  verificarCredenciales(){

  }

}
