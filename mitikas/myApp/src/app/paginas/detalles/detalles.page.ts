import { Component, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//importamos el servicio 
import {ConsultaService} from '../../servicio/consulta.service';
import { NavController, AlertController } from '@ionic/angular';
//declare const pay: any;
declare var paypal: any;
@Component({
    selector: 'app-detalles',
    templateUrl: './detalles.page.html',
    styleUrls: ['./detalles.page.scss']
})
export class DetallesPage implements AfterViewChecked  {
  addScript: boolean = false;
  paypalLoad: boolean = true;
  
  finalAmount: number = 1;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AS5b0QtwuULsZR4lDfJtLxOZH_pLFgEtO8ida32DabWAwbLbB1T_deRsuzak6yP6Sz-HyNAxfSeOZrKS',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.precio, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        console.log(this.id)
        var idString = this.id.toString();
        let datos = {
          "asistencia": "false",
          "id_profesor": "0945345674",
          "id_estudiante" : "0911111111" ,
          "id_curso" : idString,
          "id_supervisor" : "0945345674" 
         
  }
        let options = {
          headers: {
            'Content-Type': 'application/json'
          }
    
        };

        this.http.post("https://patricioxavi10.pythonanywhere.com/api/crearClase", datos,options)
        .subscribe(data => {
          console.log(data);
          
         }, error => {
          console.log(error);
        });


        this.presentAlertConfirm();
        console.log("Pago con exito")
      })
    }
  };

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¡Felicidades!',
      message: 'El pago se ha realizado con éxito',
      buttons: [
        {
          text: 'Ir a mis cursos',
          handler: () => {
            this.nav.navigateRoot(`/tabs/tab3`);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#boton');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


  id: number;
    titulo: string;
    short: string;
    descripcion: string;
    imagen: string;
    sesiones: number;
    precio: number;
    data: any[];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(public nav: NavController,private activatedRoute: ActivatedRoute, public consulta: ConsultaService,public http: HttpClient,public alertController: AlertController){ 
        const num=this.activatedRoute.snapshot.paramMap.get('id');
        this.id=parseInt(num, 10);
        this.consulta.obtenerCursobyId(this.id).subscribe((data)=>{
            var anydata=<any>data;
            this.data=anydata;
            console.log(this.data);
            this.precio=this.data['precio'];
            this.imagen=this.data['imagen'];
            this.descripcion=this.data['descripcion'];
            this.sesiones=this.data['num_sesiones'];
            this.short=this.descripcion;
            console.log(this.data['precio']);
          });
        }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  
    ionViewWillEnter() {
 
                
    }

}
