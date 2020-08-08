import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http : HttpClient) { }

  obtenerTareas(id_clase: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/alltareas/"+id_clase);
  }

  obtenerSesiones(id_clase: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/sesiones/"+id_clase);
  }

  registrarTarea(id_profesor,id_sesion,titulo,descripcion){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/creartarea",{
      "nombre_tarea": titulo,
      "descripcion_tarea": descripcion,
      "id_sesion": id_sesion,
      "id_profesor": id_profesor
  });
  }
}
