import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { TareasComponent } from './tareas.component';

describe('TareasComponent', () => {
  let component: TareasComponent;
  let fixture: ComponentFixture<TareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener todas los tareas pertenecientes a una clase que no existe', () => {
    expect(component.objectTareas).toBeUndefined();
  });

  it('Obtener todas los sesiones pertenecientes a una clase que no existe', () => {
    expect(component.objectSesiones).toBeUndefined();
  });

});
