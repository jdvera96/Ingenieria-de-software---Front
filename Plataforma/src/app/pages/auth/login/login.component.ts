import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import {AuthService} from '../../../servicios/auth.service'

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
  constructor(private servicioApiLogin : AuthService) { }

  ngOnInit(): void {
  }


  logearse(){
    this.correo=$('#correo').val();
    this.password=$('#password').val();
    console.log('valor del correo: ',this.correo);
    console.log('valor del pass: ',this.password);

    this.verificarCredenciales();
    
  }

  verificarCredenciales(){
      this.servicioApiLogin.obtenerLogin(this.correo,this.password).subscribe(response=>{
        console.log('resultado: ',response);
        
        if(response["rol"]){

          let valor=response["rol"]+"-"+response["nombre"]+"-"+response["apellido"]+"-"+response["cedula"];
          localStorage.setItem('login-mitikas',valor);
          location.href="http://localhost:4200/";
        }else{
          console.log('credenciales invalidas');
        }

      });
      
  }

}
