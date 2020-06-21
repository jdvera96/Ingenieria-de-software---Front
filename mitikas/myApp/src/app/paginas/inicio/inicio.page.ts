import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/servicio/consulta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  email:string;
  password: string;

  constructor(public alertController: AlertController,public nav: NavController, private activatedRoute: ActivatedRoute, public consulta: ConsultaService) { }

  ngOnInit() {
  }

  login(){
    let postData = {
      "username": this.email,
      "password": this.password
    }

    this.consulta.ingresar(postData).subscribe(data => {
      localStorage.setItem("token",data["token"]);
      this.presentAlert("Bienvenido","Ingreso exitoso","");
      this.openCursos();
    }, error => {
      this,this.presentAlert("Error","Ingreso fallido.","Usuario o contraseña incorrecta");
    });

  }

  openCursos() { 
    this.nav.navigateForward(`tabs/tab1`);
  }

  async presentAlert(titulo, subtitulo,mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  

}
