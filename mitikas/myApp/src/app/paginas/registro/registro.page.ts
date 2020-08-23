import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/servicio/consulta.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  get name() {
    return this.registrationForm.get('name');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get fechaNac() {
    return this.registrationForm.get('fechaNac');
  }

  get cedulaValid() {
    return this.registrationForm.get('cedulaValid');
  }

  get sexValid() {
    return this.registrationForm.get('sexValid');
  }

  get countryValid() {
    return this.registrationForm.get('countryValid');
  }

  get cityValid() {
    return this.registrationForm.get('cityValid');
  }

  get dirValid() {
    return this.registrationForm.get('dirValid');
  }

  get telValid() {
    return this.registrationForm.get('telValid');
  }

  get comunidadValid() {
    return this.registrationForm.get('comunidadValid');
  }

  get escolaridadValid() {
    return this.registrationForm.get('escolaridadValid');
  }

  get emailValid() {
    return this.registrationForm.get('emailValid');
  }

  get passValid() {
    return this.registrationForm.get('passValid');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'minlength', message: 'El nombre debe tener al menos 5 caracteres' },
      { type: 'maxlength', message: 'El nombre no debe tener más de 25 caracteres' },
      { type: 'pattern', message: 'Ingrese un nombre válido' }
    ],
    lastName: [
      { type: 'required', message: 'El apellido es requerido' },
      { type: 'minlength', message: 'El apellido debe tener al menos 5 caracteres' },
      { type: 'maxlength', message: 'El apellido no debe tener más de 25 caracteres' },
      { type: 'pattern', message: 'Ingrese un apellido válido' }
    ],
    fechaNac: [
      { type: 'required', message: 'La fecha de nacimiento es requerida' },
      { type: 'pattern', message: 'Ingrese una fecha valida' }
    ],
    cedulaValid: [
      { type: 'required', message: 'La identificación es requerida' },
      { type: 'minlength', message: 'Este campo debe tener al menos 10 caracteres' },
      { type: 'maxlength', message: 'Este campo no debe tener más de 10 caracteres' },
      { type: 'pattern', message: 'Ingrese una identificación válida' }
    ],
    sexValid: [
      { type: 'required', message: 'El género es requerido' }
    ],
    countryValid: [
      { type: 'required', message: 'El país es requerido' }
    ],
    cityValid: [
      { type: 'required', message: 'La ciudad es requerida' }
    ],
    dirValid: [
      { type: 'required', message: 'La dirección es requerida' },
      { type: 'minlength', message: 'La dirección debe tener al menos 5 caracteres' },
      { type: 'maxlength', message: 'La dirección no debe tener más de 100 caracteres' },
      { type: 'pattern', message: 'Ingrese un nombre válido' }
    ],
    telValid: [
      { type: 'required', message: 'El teléfono es requerido' },
      { type: 'minlength', message: 'Este campo debe tener al menos 10 dígitos' },
      { type: 'maxlength', message: 'Este campo no debe tener más de 10 dígitos' },
      { type: 'pattern', message: 'Ingrese un teléfono válido' }
    ],
    comunidadValid: [
      { type: 'required', message: 'La comunidad es requerida' }
    ],
    escolaridadValid: [
      { type: 'required', message: 'La escolaridad es requerida' }
    ],
    emailValid: [
      { type: 'required', message: 'El email es requerida' },
      { type: 'minlength', message: 'El email debe tener al menos 6 caracteres' },
      { type: 'maxlength', message: 'La dirección no debe tener más de 30 caracteres' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
    passValid: [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
      { type: 'maxlength', message: 'La contraseña debe tener máximo 20 caracteres' },
      { type: 'pattern', message: 'Debe incluir al menos un número, una letra mayúscula y una letra minúscula' }
    ]
  };

  registrationForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
      Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð' ]+$")]],
    lastName: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
      Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð' ]+$")]],
    fechaNac: ['', [
      Validators.required]],
    cedulaValid: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^[A-Z0-9]+$")]],
    sexValid: ['', [
      Validators.required]],
    countryValid: ['', [
      Validators.required]],
    cityValid: ['', [
      Validators.required]],
    dirValid: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð',-.: ]+$")]],
    telValid: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^[0-9]+$")]],
    comunidadValid: ['', [
      Validators.required]],
    escolaridadValid: ['', [
      Validators.required]],
    emailValid: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+")]],
    passValid: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern("^([a-zA-Z0-9]*([a-z]{1})+[a-zA-Z0-9]*([A-Z]{1})+[a-zA-Z0-9]*([0-9]{1})+[a-zA-Z0-9]*)|([a-zA-Z0-9]*([A-Z]{1})+[a-zA-Z0-9]*([0-9]{1})+[a-zA-Z0-9]*([a-z]{1})+[a-zA-Z0-9]*)|([a-zA-Z0-9]*([A-Z]{1})+[a-zA-Z0-9]*([a-z]{1})+[a-zA-Z0-9]*([0-9]{1})+[a-zA-Z0-9]*)|([a-zA-Z0-9]*([A-Z]{1})+[a-zA-Z0-9]*([0-9]{1})+[a-zA-Z0-9]*([a-z]{1})+[a-zA-Z0-9]*)|([a-zA-Z0-9]*([0-9]{1})+[a-zA-Z0-9]*([a-z]{1})+[a-zA-Z0-9]*([A-Z]{1})+[a-zA-Z0-9]*)|([a-zA-Z0-9]*([0-9]{1})+[a-zA-Z0-9]*([A-Z]{1})+[a-zA-Z0-9]*([a-z]{1})+[a-zA-Z0-9]*)$")]]
  });

  constructor(private formBuilder: FormBuilder, public alertController: AlertController, public nav: NavController, private activatedRoute: ActivatedRoute, public consulta: ConsultaService) {
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


  submit() {
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
    console.log(postData);
    this.consulta.enviarRegistro(postData).subscribe(data => {
      this.presentAlert("Bienvenido", "Registro exitoso", "Tu cuenta ha sido creado exitosamente");
      this.openCursos();

    }, error => {
      this.presentAlert("Error", "Registro fallido", "Los datos ingresados son incorrectos o el usuario ya existe");
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
