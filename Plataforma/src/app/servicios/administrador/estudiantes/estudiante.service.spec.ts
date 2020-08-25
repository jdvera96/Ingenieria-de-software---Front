import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { EstudianteService } from './estudiante.service';

describe('EstudianteService', () => {
  let service: EstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(EstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de creación de estudiantes por parte del administrador esta activo', () => {
    expect(service.crearEstudiante("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtención de todos estudiantes por parte del administrador esta activo', () => {
    expect(service.obtenerTodosEstudiantes()).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener información de un estudiante específico por parte del administrador esta activo', () => {
    expect(service.obtenerInfoEstudiante("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de actualizar información de un estudiante específico por parte del administrador esta activo', () => {
    expect(service.actualizarInfoEstudiante("activo","activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de eliminar un estudiante específico por parte del administrador esta activo', () => {
    expect(service.eliminarEstudiante("activo")).toBeTruthy();
  });

});
