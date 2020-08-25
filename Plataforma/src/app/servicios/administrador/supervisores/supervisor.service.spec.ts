import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { SupervisorService } from './supervisor.service';

describe('SupervisorService', () => {
  let service: SupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
    service = TestBed.inject(SupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de creación de supervisores por parte del administrador esta activo', () => {
    expect(service.crearSupervisor("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtención de todos los supervisores por parte del administrador esta activo', () => {
    expect(service.obtenerTodosSupervisor()).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener información de un supervisor específico por parte del administrador esta activo', () => {
    expect(service.obtenerInfoSupervisor("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de actualizar información de un supervisor específico por parte del administrador esta activo', () => {
    expect(service.actualizarInfoSupervisor("activo","activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de eliminar un supervisor específico por parte del administrador esta activo', () => {
    expect(service.eliminarSupervisor("activo")).toBeTruthy();
  });

});
