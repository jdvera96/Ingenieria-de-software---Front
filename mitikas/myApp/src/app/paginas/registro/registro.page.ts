import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/servicio/consulta.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  countryData: any[];


  cityData: any[];
  cities: any[];

  countrySelected: any;
  citySelected: any;
  nombres: string;
  apelllidos: string;
  cedula: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  escolaridad: string;
  sexo: string;
  grupo_excluido: string;
  email: string
  password: string;


  constructor(public alertController: AlertController, public nav: NavController, private activatedRoute: ActivatedRoute, public consulta: ConsultaService) {
    this.inicializarPaises();
    this.inicializarCiudades();
  }

  inicializarPaises() {
    this.consulta.obtenerDataPaises().subscribe((data) => {
      var anydata = <any>data;
      this.countryData = anydata;
    });
  }

  inicializarCiudades() {
    this.consulta.obtenerDataCiudades().subscribe((data) => {
      var anydata = <any>data;
      this.cityData = anydata;
    });

  }

  setCitiesValues(countrySelected) {
    this.cities = this.cityData.filter(ciudad => ciudad.country_id == countrySelected.id)
  }


  enviarData() {

    let postData = {
      "email": this.email,
      "password": this.password,
      "profile": {
        "nombres": this.nombres,
        "apellidos": this.apelllidos,
        "cedula": this.cedula,
        "fecha_nacimiento": this.fecha_nacimiento.split('T')[0],
        "direccion": this.direccion,
        "telefono": this.telefono,
        "escolaridad": this.escolaridad,
        "pais": this.countrySelected.name,
        "ciudad": this.citySelected.name,
        "sexo": this.sexo,
        "grupo_excluido": this.grupo_excluido
      }
    }
    this.consulta.enviarRegistro(postData).subscribe(data => {
      this.presentAlert("Bienvenido", "Registro exitoso", "Tu cuenta ha sido creado exitosamente");
      this.openCursos();

    }, error => {
      this.presentAlert("Error", "Registro fallido", "Los datos ingresados son incorrectos");
    });


  }

  async presentAlert(titulo, subtitulo, mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  openCursos() {
    this.nav.navigateForward("");
  }

  ngOnInit() {


  }

}
