import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CursosService {
 
  constructor(private http : HttpClient) { }

  obtenerCursos(){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/cursos")
  }
}
