import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { AsistenciaService } from './asistencia.service';

describe('AsistenciaService', () => {
  let service: AsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
    service = TestBed.inject(AsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todas las sesiones de una clase por parte del profesor está activo', () => {
    expect(service.obtenerSesiones("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todas las asistencias de los estudiantes a una sesion parte del profesor está activo', () => {
    expect(service.obtenerAsistencia_Estudiantes("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de asignar una asistencia en una sesion a un estudiante por parte del profesor está activo', () => {
    expect(service.asignarAsistencia("activo","activo","activo")).toBeTruthy();
  });

  });
