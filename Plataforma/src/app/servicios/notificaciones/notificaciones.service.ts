import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient) { }

  enviarNotificacion(objeto){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/sendnotificacion",{
      "titulo":objeto.titulo ,
      "body" : objeto.descripcion});
  }
}

