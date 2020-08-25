import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { ProfesorService } from './profesor.service';

describe('ProfesorService', () => {
  let service: ProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
    service = TestBed.inject(ProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de creación de profesores por parte del administrador esta activo', () => {
    expect(service.crearProfesor("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtención de todos los profesores por parte del administrador esta activo', () => {
    expect(service.obtenerTodosProfesores()).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener información de un profesor específico por parte del administrador esta activo', () => {
    expect(service.obtenerInfoProfesor("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de actualizar información de un profesor específico por parte del administrador esta activo', () => {
    expect(service.actualizarInfoProfesor("activo","activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de eliminar un profesor específico por parte del administrador esta activo', () => {
    expect(service.eliminarProfesor("activo")).toBeTruthy();
  });

});
