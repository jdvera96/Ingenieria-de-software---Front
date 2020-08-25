import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { TareasSpService } from './tareas-sp.service';

describe('TareasSpService', () => {
  let service: TareasSpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
    service = TestBed.inject(TareasSpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todas las tareas de una clase está activo', () => {
    expect(service.obtenerTareas("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todas las sesiones de una clase está activo', () => {
    expect(service.obtenerSesiones("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener información de una sesión específica está activo', () => {
    expect(service.obtenerInfoSesion("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de registrar una tarea a una sesión por parte del supervisor está activo', () => {
    expect(service.registrarTarea("activo","activo","activo","activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener información de una tarea específica está activo', () => {
    expect(service.obtenerInfoTarea("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de eleiminar una tarea está activo', () => {
    expect(service.eliminarTarea("activo")).toBeTruthy();
  });

});
