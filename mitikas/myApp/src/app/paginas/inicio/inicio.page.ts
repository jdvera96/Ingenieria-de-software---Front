import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/servicio/consulta.service';
//import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  email: string;
  password: string;

  constructor(public alertController: AlertController, public nav: NavController, private activatedRoute: ActivatedRoute, public consulta: ConsultaService, private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false, 'first');
    
  }

  login() {
    let postData = {
      "username": this.email,
      "password": this.password
    }

    this.consulta.ingresar(postData).subscribe(data => {
      localStorage.setItem("token", data["token"]);
      this.presentAlert("Bienvenido", "Ingreso exitoso", "");
      this.consulta.habilitarNotificaciones().subscribe(data => {
        console.log("Registrado con:"+data);
      }
      ,error => {
          console.log("El error es: ",error);
      });
      
      this.openCursos();
    }, error => {
      this, this.presentAlert("Error", "Ingreso fallido.", "Usuario o contraseña incorrecta");
    });

  }

  openCursos() {
    this.nav.navigateForward(`tabs/tab1`);
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


}
