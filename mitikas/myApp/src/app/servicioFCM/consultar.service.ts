import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultarService {

  constructor(public http:HttpClient) { }

  obtenerNotificaciones(){
      return this.http.get('https://shielded-sands-02071.herokuapp.com/api/notificaciones');
  }

  insertarToken(token: string,idDevice:string){
    let body={Device: idDevice,Token: token }
    return this.http.post('https://shielded-sands-02071.herokuapp.com/api/token/insert',body);
  }

  updateToken(token: string,idDevice:string){
    let body={Device: idDevice,Token: token }
    return this.http.post('https://shielded-sands-02071.herokuapp.com/api/token/update',body);
  }

  consultarIdDevice(idDevice:string){
    let url='https://shielded-sands-02071.herokuapp.com/api/token/'+idDevice
    return this.http.get(url);
  }
}

