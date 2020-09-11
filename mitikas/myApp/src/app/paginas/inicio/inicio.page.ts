import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController, Platform  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/servicio/consulta.service';
//import { Firebase } from '@ionic-native/firebase/ngx';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { environment } from './../../../environments/environment';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  email: string;
  password: string;
  subscription: boolean;

  isCaptchaInvalid = true;

  constructor(public alertController: AlertController, public nav: NavController, private activatedRoute: ActivatedRoute, public consulta: ConsultaService, private menu: MenuController,public platform: Platform) { }

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
      localStorage.setItem("id",data["cedula"]);
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

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }
  
  ionViewWillLeave() {
    this.platform.backButton.unsubscribe();
  }

  get siteKey(){
    return environment.recaptcha.sitekey;
  }

  captchaResolved(ev){
    console.log("Captcha resolved",ev);
    this.isCaptchaInvalid=false;
  }

}
