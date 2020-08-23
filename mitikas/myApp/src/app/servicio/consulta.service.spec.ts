import { TestBed } from '@angular/core/testing';
import {Location} from "@angular/common";
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { ConsultaService } from './consulta.service';


describe('ConsultaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide:Location},
      {provide: UrlSerializer},
      {provide: ActivatedRoute},
      {provide:HttpClient}
    ],
  }));

  it('should be created', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service).toBeTruthy();
  });

  it('Se puede obtener cursos', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerCursos() == null).toBeFalsy;
  });

  it('Clases - Calificaciones - Estudiante', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerClase("asd","asd")).toBeUndefined();
  });

  it('Asistencias - Estudiante', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerAsistencias("asd","asd")).toBeUndefined();
  });

  it('Curso - Compra', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerCursobyId(0)).toBeUndefined();
  });

  it('Países', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerDataPaises() == null).toBeFalsy();
  });

  it('Ciudades', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerDataCiudades() == null).toBeFalsy();
  });

  it('Enviar -Registro', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.enviarRegistro("al")).toBeUndefined();
  });

  it('Ingresar ', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.ingresar("al")).toBeUndefined();
  });

  it('Notificaciones Activadas ', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.habilitarNotificaciones()).toBeUndefined();
  });

  it('Promociones ', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerPromociones()).toBeUndefined();
  });

  it('Mis Clases', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.obtenerMisClases("asd")).toBeUndefined();
  });

  it('Pago', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.crearPago("asd")).toBeUndefined();
  });

  it('Compra', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service.crearCompra("asd","asd","asd")).toBeUndefined();
  });

});