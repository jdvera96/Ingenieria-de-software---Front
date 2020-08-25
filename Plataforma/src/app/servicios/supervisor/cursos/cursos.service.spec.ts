import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { CursosService } from './cursos.service';

describe('CursosService', () => {
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
    service = TestBed.inject(CursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todos los cursos creados por un supervisor está activo', () => {
    expect(service.obtenerCursos("activo")).toBeTruthy();
  });

  it('Verificación de que el servcio de obtener todos los clases creadas por un supervisor está activo', () => {
    expect(service.obtenerListado("activo")).toBeTruthy();
  });

});
