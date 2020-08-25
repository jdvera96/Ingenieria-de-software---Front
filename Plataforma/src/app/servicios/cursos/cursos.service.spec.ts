import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { CursosService } from './cursos.service';

describe('CursosService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
  });

  it('should be created', () => {
    const service: CursosService = TestBed.get(CursosService);
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de obtención de todos los cursos asignados a un profesor este activo', () => {
    const service: CursosService = TestBed.get(CursosService);
    expect(service.obtenerCursos("activo")).toBeTruthy();
  });

});
