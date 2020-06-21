import { Injectable } from '@angular/core';

//importacion del modulo http
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  db_platos=[{"id":1,"grupo":"Encebollado","tipo":"Normal","precio":2.85},
          {"id":2,"grupo":"Encebollado","tipo":"Bestia Jumbo","precio":8.00},
          {"id":3,"grupo":"Encebollado","tipo":"Bestia Normal","precio":6.00},
          {"id":4,"grupo":"Encebollado","tipo":"Jumbo","precio":4.50},
          {"id":5,"grupo":"Encebollado","tipo":"Jumbo Mixto","precio":6.50},
          {"id":6,"grupo":"Encebollado","tipo":"Junior","precio":2.25},
          {"id":7,"grupo":"Encebollado","tipo":"Mixto","precio":5.00},
          {"id":8,"grupo":"Encebollado","tipo":"Tarrina Llena","precio":4.50},
          {"id":9,"grupo":"Guatita","tipo":"Simple","precio":3.50},
          {"id":10,"grupo":"Guatita","tipo":"Con Arroz","precio":3.80},
          {"id":11,"grupo":"Guatita","tipo":"Con Camaron y Arroz","precio":5.20},
          {"id":12,"grupo":"Cazuela","tipo":"Con Camaron","precio":6.00},
          {"id":13,"grupo":"Cazuela","tipo":"Con Pescado","precio":4.50},
          {"id":14,"grupo":"Cazuela","tipo":"Marinera","precio":7.50},
          {"id":15,"grupo":"Cazuela","tipo":"Mixta (Camaron y Pescado)","precio":6.50},
          {"id":16,"grupo":"Bollo","tipo":"Pescado","precio":2.50},
          {"id":17,"grupo":"Bollo","tipo":"Mixto (Camaron y Pescado)","precio":3.75},
          {"id":18,"grupo":"Ceviche","tipo":"Camaron y Pescado","precio":6.50},
          {"id":19,"grupo":"Ceviche","tipo":"Cangrejo","precio":8.00},
          {"id":20,"grupo":"Ceviche","tipo":"Concha","precio":8.00},
          {"id":21,"grupo":"Ceviche","tipo":"Pescado Curtido","precio":4.50},
          {"id":22,"grupo":"Ceviche","tipo":"Marinero","precio":8.00},
          {"id":23,"grupo":"Ceviche","tipo":"Mixto (Camaron y Pescado)","precio":7.50},
          {"id":24,"grupo":"Ceviche","tipo":"Pez Express Premium","precio":12.00},
          {"id":25,"grupo":"Banderas","tipo":"Completa","precio":6.00},
          {"id":26,"grupo":"Banderas","tipo":"Pez Express Premium","precio":10.00},
          {"id":27,"grupo":"Banderas","tipo":"Re-Completa","precio":7.00},
          {"id":28,"grupo":"Banderas","tipo":"Sencilla","precio":5.00},
          {"id":29,"grupo":"Encocados","tipo":"Con Camaron","precio":5.50},
          {"id":30,"grupo":"Encocados","tipo":"Con Pescado","precio":4.50},
          {"id":31,"grupo":"Encocados","tipo":"Mixto (Camaron y Pescado)","precio":6.50},
          {"id":32,"grupo":"Arroces","tipo":"Con Camaron","precio":7.50},
          {"id":33,"grupo":"Arroces","tipo":"Con Cangrejo","precio":12.00},
          {"id":34,"grupo":"Arroces","tipo":"Con Concha","precio":8.00},
          {"id":35,"grupo":"Arroces","tipo":"Con Filete de Pescado","precio":5.00},
          {"id":36,"grupo":"Arroces","tipo":"Marinero","precio":8.00},
          {"id":37,"grupo":"Extras","tipo":"Pan","precio":0.25},
          {"id":38,"grupo":"Extras","tipo":"Chifle","precio":0.85},
          {"id":39,"grupo":"Extras","tipo":"Salsa de ají","precio":1.00},
          {"id":40,"grupo":"Bebidas","tipo":"Agua","precio":0.75},
          {"id":41,"grupo":"Bebidas","tipo":"Coca Cola","precio":1.14},
          {"id":42,"grupo":"Bebidas","tipo":"Coca Cola","precio":1.14},
          {"id":43,"grupo":"Bebidas","tipo":"Fanta","precio":1.14},
          {"id":44,"grupo":"Bebidas","tipo":"Fiora Fresa","precio":1.14},
          {"id":45,"grupo":"Bebidas","tipo":"Fiora Manzana","precio":1.14},
          {"id":46,"grupo":"Bebidas","tipo":"Gallito","precio":1.14},
          {"id":47,"grupo":"Bebidas","tipo":"Inka Kola","precio":1.14},
          {"id":48,"grupo":"Bebidas","tipo":"Manzana","precio":1.14},
          {"id":49,"grupo":"Bebidas","tipo":"Pepsi","precio":1.14},
          {"id":50,"grupo":"Bebidas","tipo":"Seven Up","precio":1.14},
          {"id":51,"grupo":"Bebidas","tipo":"Sprite","precio":1.14},
          {"id":52,"grupo":"Bebidas","tipo":"Tropical","precio":1.14},
          {"id":53,"grupo":"Bebidas","tipo":"Fuze Tea","precio":1.14},
          {"id":54,"grupo":"Bebidas","tipo":"Guitig","precio":0.75},
          {"id":55,"grupo":"Bebidas","tipo":"Coca Cola Light","precio":1.70},
          {"id":56,"grupo":"Bebidas","tipo":"Coca Cola Zero","precio":1.70},
          {"id":57,"grupo":"Bebidas","tipo":"Manzana Light","precio":1.14},
          {"id":58,"grupo":"Bebidas","tipo":"Pepsi Light","precio":1.70},
          {"id":59,"grupo":"Bebidas","tipo":"Seven Up Light","precio":1.70},
          {"id":60,"grupo":"Bebidas","tipo":"Sprite Zero","precio":1.14},
          {"id":61,"grupo":"Bebidas","tipo":"Tropical Light","precio":1.70},
          {"id":62,"grupo":"Bebidas","tipo":"Lomonada","precio":1.14},
          {"id":63,"grupo":"Bebidas","tipo":"Naranja","precio":1.14},
          {"id":64,"grupo":"Bebidas","tipo":"Naranjilla","precio":1.14},
          {"id":65,"grupo":"Bebidas","tipo":"Nectar Durazno","precio":1.14},
          {"id":66,"grupo":"Bebidas","tipo":"Nectar Mora","precio":1.14},
          {"id":67,"grupo":"Bebidas","tipo":"Maracuya","precio":1.75},
          {"id":68,"grupo":"Bebidas","tipo":"Mora","precio":1.75},
          {"id":69,"grupo":"Bebidas","tipo":"Naranja","precio":1.75},
          {"id":70,"grupo":"Bebidas","tipo":"Naranjilla","precio":1.75},
          {"id":71,"grupo":"Bebidas","tipo":"Pilsener Ligth","precio":2.00},
          {"id":72,"grupo":"Bebidas","tipo":"Club Verde","precio":2.00}
          ]
        

  constructor(public http:HttpClient) { }

  obtenerTipoPlatos(){
    let tipoPlatos= [];
    let tipoActual =""
    for (let i=0;i<this.db_platos.length;i++) {
      if(this.db_platos[i]["grupo"]!=tipoActual){
        tipoPlatos.push(this.db_platos[i]["grupo"]);
        tipoActual = this.db_platos[i]["grupo"];
      }
    }
    return tipoPlatos;
  }
  obtenerPlatosPorTipo(plato:String){
    let platosPorTipo= [];
    for (let i=0;i<this.db_platos.length;i++) {
      if(this.db_platos[i]["grupo"]==plato){
        platosPorTipo.push(this.db_platos[i]);
      }
    }
    return platosPorTipo;

  }

  obtenerGruposPlatos(){
    return this.http.get('https://shielded-sands-02071.herokuapp.com/api/grupos');
  }

  obtenerPlatosPorGrupo(id){
    let url='https://shielded-sands-02071.herokuapp.com/api/platos/'+id;
    return this.http.get(url);
  }
}
