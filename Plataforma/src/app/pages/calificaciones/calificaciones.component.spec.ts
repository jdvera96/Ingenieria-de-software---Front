import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { CalificacionesComponent } from './calificaciones.component';

describe('CalificacionesComponent', () => {
  let component: CalificacionesComponent;
  let fixture: ComponentFixture<CalificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener todass las tareas correspondientes a una clase que no existe', () => {
    expect(component.objectTareas).toBeUndefined();
  });

  it('Obtener todos las estudiantes que realizaron una tarea que no existe', () => {
    expect(component.objectEstudiantes).toBeUndefined();
  });

});
