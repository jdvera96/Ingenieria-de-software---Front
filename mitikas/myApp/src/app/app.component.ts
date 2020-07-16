import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Firebase } from '@ionic-native/firebase/ngx';
/*import { ConsultarService } from './servicioFCM/consultar.service';*/

import { MenuController,NavController } from '@ionic/angular';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    control: number;
    control2: number;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private firebase: Firebase,
        private statusBar: StatusBar,
        private nav: NavController,
        public menuCtrl: MenuController
    ) {
        this.initializeApp();
    }

    ngOnInit(): void {
        let token = localStorage.getItem("token");
        if(token != null && token!="" ){
            this.nav.navigateForward(`tabs/tab1`);
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.firebase.hasPermission()
                .then(result => {
                    console.log('resultados: ', result);
                    if (result) {
                        console.log('tiene permisos aparentemete')
                    } else {
                        console.log('no tiene permisos')
                    }

                })
                .catch(errPromesa => {
                    console.log('error al recibir la promesa')
                })

            this.firebase.grantPermission()
                .then(dataPermisos => {
                    console.log('permisos obtenidos');
                    console.log(dataPermisos);
                })
                .catch(errPermisos => {
                    console.log('error al pedir permisos');
                    console.log('error: ', errPermisos)
                })
            this.firebase.getToken()
                .then(token => {
                    localStorage.setItem("FCMtoken",token);
                    console.log("El token es:", token);
                });
            this.firebase.onNotificationOpen()
                .subscribe(data => console.log(`User opened a notification ${data}`));

            this.firebase.onTokenRefresh()
                .subscribe((token: string) => console.log(`Got a new token ${token}`));
            /*this.firebase.hasPermission()
                .then(result => {
                    console.log('resultados: ', result);
                    if (result) {
                        console.log('tiene permisos aparentemete')
                    } else {
                        console.log('no tiene permisos')
                    }

                })
                .catch(errPromesa => {
                    console.log('error al recibir la promesa')
                })

            this.firebase.grantPermission()
                .then(dataPermisos => {
                    console.log('permisos obtenidos');
                    console.log(dataPermisos);
                })
                .catch(errPermisos => {
                    console.log('error al pedir permisos');
                    console.log('error: ', errPermisos)
                })


            console.log('------------------------------------------------------');
            this.firebase.getToken()
                .then(token => {
                    console.log(`The token is ${token}`);
                    this.control2 = 1;
                    console.log(localStorage.getItem("id_device_unique"));

                    if (this.control == 0) {
                        this.control = 1;
                        let idunico = localStorage.getItem("id_device_unique");
                        console.log('ID UUNICO ' + idunico);
                        this.consultar.insertarToken(token, idunico).subscribe((data) => {
                            var anydata = <any>data;
                            let resultado = JSON.stringify(anydata);

                            console.log('-------------' + resultado);
                        });

                    } else {
                        console.log('no hay')
                    }

                    console.log('se inserto en la base');

                    //guardo el token obtenido en el local storage
                    //localStorage.setItem('token_fcm',token);           
                }
                ) // save the token server-side and use it to push notifications to this device
                .catch(error => {
                    console.error('Error getting token', error);
                    this.control2 = 0;

                });

            this.firebase.onNotificationOpen()
                .subscribe(function (data) {
                    console.log(`User opened a notification ${data}`);
                });

            this.firebase.onTokenRefresh()
                .subscribe((token: string) => {
                    console.log(`-Got a new token ${token}`);
                    console.log(localStorage.getItem("id_device_unique"));

                    if (this.control2 == 1) {
                        if (this.control == 1) {
                            let idUnico = localStorage.getItem("id_device_unique");
                            this.consultar.updateToken(token, idUnico).subscribe((data) => {
                                console.log(data);
                                console.log('actualizacion exitosa');
                            });
                        }
                    } else {

                        let idunico = localStorage.getItem("id_device_unique");
                        console.log('ID UUNICO ' + idunico);
                        this.consultar.insertarToken(token, idunico).subscribe((data) => {
                            var anydata = <any>data;
                            let resultado = JSON.stringify(anydata);

                            console.log('-------------' + resultado);
                        });

                    }



                    console.log('-Token actualizado en el localStorage');
                    console.log('datos en el local storage')
                    console.log(localStorage.getItem('id_device_unique'));
                    console.log('fin de todo')

                }
                );*/
        });
    }

}
