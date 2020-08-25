import { TestBed } from '@angular/core/testing';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { NotificacionesService } from './notificaciones.service';

describe('NotificacionesService', () => {
  let service: NotificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient},
        {provide:HttpHandler}
      ],
    });
    service = TestBed.inject(NotificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verificación de que el servcio de envio de notificaciones por parte del supervisor está activo', () => {
    expect(service.enviarNotificacion("activo")).toBeTruthy();
  });

});
