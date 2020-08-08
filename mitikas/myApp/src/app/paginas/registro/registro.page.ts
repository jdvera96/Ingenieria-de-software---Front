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


  validarData(){
    let arregloInvalidos=[];


    //validando
    let resultado_nombres=this.validarNombres(this.nombres);
    let resultado_apellidos=this.validarApellidos(this.apelllidos);
    let resultado_fecha=this.validarFechaNacimiento(this.fecha_nacimiento);
    let resultado_cedula=this.validarCedula(this.cedula);
    let resultado_direccion=this.validarDireccion(this.direccion);
    let resultado_telefono=this.validarTelefono(this.telefono);
    let resultado_correo=this.validarCorreo(this.email);
    let resultado_password=this.validarContrasena(this.password);


    //resultados
    arregloInvalidos.push(resultado_nombres);
    arregloInvalidos.push(resultado_apellidos);
    arregloInvalidos.push(resultado_fecha);
    arregloInvalidos.push(resultado_cedula);
    arregloInvalidos.push(resultado_direccion);
    arregloInvalidos.push(resultado_telefono);
    arregloInvalidos.push(resultado_correo);
    arregloInvalidos.push(resultado_password);

    console.log(arregloInvalidos);

    let resultados=[];

    for(let i=0;i<arregloInvalidos.length;i+=1){
      let elemento=arregloInvalidos[i];
      if(elemento.indexOf('correct')==-1){
        resultados.push(elemento);
      }
    }


    if(resultados.length!=0){
      let alerta="";
      for(let i=0;i<resultados.length;i+=1){
        alerta=alerta.concat(resultados[i],'\n');
      }

      console.log(alerta);
      alert(`Error en registro \nVerifique los siguientes campos: \n\n${alerta}`);
    }else{
      this.enviarData();
    }

  }

  validarNombres(nombre: string){
      let abecedarioMinus=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
      let abecedarioMayus=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  
      if(nombre==undefined){
        return 'Nombres invalidos';
      }else if(nombre.length==0){
        return 'Nombres invalidos'
      }

      for(let i=0;i<nombre.length;i+=1){
        let elemento=nombre[i];
        let posicion1=abecedarioMinus.indexOf(elemento);
        let posicion2=abecedarioMayus.indexOf(elemento);

        if(posicion1==-1 && posicion2==-1){
          return 'Nombres invalido';
        }
      }
  
      return 'Nombres correcto';

    }


  validarApellidos(nombre: string){
    let abecedarioMinus=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
    let abecedarioMayus=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    if(nombre==undefined){
      return 'Apellidos invalidos';
    }else if(nombre.length==0){
      return 'Apellidos invalidos'
    }

    for(let i=0;i<nombre.length;i+=1){
      let elemento=nombre[i];
      let posicion1=abecedarioMinus.indexOf(elemento);
      let posicion2=abecedarioMayus.indexOf(elemento);

      if(posicion1==-1 && posicion2==-1){
        return 'Apellidos invalido';
      }
    }

    return 'Apellidos correcto';

  }

  validarFechaNacimiento(fecha: string){
    if(fecha==undefined){
      return 'fecha de nacimiento invalida';
    }

    console.log(Date.now());
    console.log();

    if(Date.parse(fecha)>Date.now()){
      return 'fecha de nacimiento invalida';
    }

    return 'fecha correcta';
  
  }

  validarCedula(cedula: string){
    if(cedula==undefined){
      return 'Cedula invalida';
    }
    let verificador=parseInt(cedula[9], 10);
    let sumaPar=0
    let sumaImpar=0

    for(let posicion=0; posicion<9; posicion+=1){
        let numero=parseInt(cedula[posicion], 10);

        if(posicion%2==0){
            let duplico=numero*2
            if(duplico>9){
                duplico=duplico-9
              }
            sumaImpar+=duplico
          }else{
            sumaPar=sumaPar+numero
          }

    }
    let sumaTotal=sumaPar+sumaImpar
    let decenaSuperior=((Math.trunc(sumaTotal/10))+1)*10

    let resta=decenaSuperior-sumaTotal
    if(resta==verificador){
        return "Cedula correcto";
    }
    else{
        return "Cedula invalida";
    }
  }


  validarDireccion(direccion :string){
    if(direccion==undefined){
      return 'Direccion invalida';
    }else if(direccion.length<5){
      return 'Direccion invalida';
    }else if(direccion.length>100){
      return 'Direccion invalida'
    }

    return 'Direccion correcta'

  }

  validarTelefono(celular: string){

    let arregloNumeros=['0','1','2','3','4','5','6','7','8','9']

    if(celular==undefined){
      return 'Telefono invalido'
    }else if(celular.length==0){
      return 'Telefono invalido'
    }else if(celular.length!=10){
      return 'Telefono invalido'
    }

    if(celular.slice(0,2)!='09'){
      return 'Telefono invalido'
    }

    for(let i=0;i<celular.length;i+=1){
      let elemento=celular[i];
      let posicion=arregloNumeros.indexOf(elemento);
      
      if(posicion==-1){
        return 'Telefono invalido';
      }

    }

    return 'Telefono correcto';

  }

  validarCorreo(correo: string){

    let abecedarioMinus=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']    

    if(correo==undefined){
      return 'Correo invalido';
    }else if(correo.length==0){
      return 'Correo invalido';
    }else if(correo.length<5){
      return 'Correo invalido';
    }

    let cantidadArroba=0;
    for(let i=0;i<correo.length;i+=1){
      let elemento=correo[i];
      if(elemento=='@'){
        cantidadArroba+=1;
      }
    }


    if(cantidadArroba!=1){
      return 'Correo invalido';
    }

    let limite=correo.indexOf('@');
    for(let i=0;i<limite;i+=1){
      if(correo[i]=='.'){
        return 'Correo invalido';
      }
    }

    if(correo.indexOf('@.')!=-1 || correo.indexOf('..')!=-1 || abecedarioMinus.indexOf(correo[correo.length-1])==-1){
      return 'Correo invalido'
    }

    return 'Correo correcto';
  }

  validarContrasena(password: string){

    let retorno='Contraseña debe tener: ';

    let abecedarioMayus=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    let numeros=['0','1','2','3','4','5','6','7','8','9']
    if(password==undefined){
      return 'Contraseña invalida';
    }
    
    if(password.length<8){
       retorno =retorno.concat('\n -Al menos 8 caracteres');
       
    }
    
    if(abecedarioMayus.indexOf(password[0])==-1){
      retorno =retorno.concat('\n -Iniciar con Mayuscula');
    }

    let contador=0;
    for(let i=0;i<password.length;i+=1){
      if(numeros.indexOf(password[i])!=-1){
        contador+=1;
      }
    }


    if(contador==0){
      retorno =retorno.concat('\n -Al menos un numero');
    }

    if(retorno.length!=23){
      return retorno;
    }else{
      return 'Contraseña correcta';
    }
  }

  enviarData() {

    let postData = {
      "email": this.email,
      "password": this.password,
      "rol": "estudiante",
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
