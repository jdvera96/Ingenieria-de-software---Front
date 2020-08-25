import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { AsistenciasComponent } from './asistencias.component';

describe('AsistenciasComponent', () => {
  let component: AsistenciasComponent;
  let fixture: ComponentFixture<AsistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciasComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener todas las sesiones de una clase que no existe', () => {
    expect(component.objectSesiones).toBeUndefined();
  });

  it('Obtener todas las asistencias de estudiantes por una sesion que no existe', () => {
    expect(component.objectEstudiantes).toBeUndefined();
  });

});
