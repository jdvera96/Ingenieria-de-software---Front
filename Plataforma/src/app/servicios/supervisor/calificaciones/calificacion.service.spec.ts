import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { CalificacionService } from './calificacion.service';

describe('CalificacionService', () => {
  let service: CalificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
    service = TestBed.inject(CalificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todas las tareas de una clase por parte del supervisor está activo', () => {
    expect(service.obtenerTareas("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todas las calificaciones de los estudiantes correspondiente a una tarea parte del supervisor está activo', () => {
    expect(service.obtenerCalificaciones_Estudiantes("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de asignar una calificaion en una tarea a un estudiante por parte del supervisor está activo', () => {
    expect(service.asignarCalificacion("activo","activo","activo")).toBeTruthy();
  });

});
