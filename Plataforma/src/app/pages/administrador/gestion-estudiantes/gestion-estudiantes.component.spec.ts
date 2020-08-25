import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionEstudiantesComponent } from './gestion-estudiantes.component';
import {HttpClientTestingModule,} from '@angular/common/http/testing';

describe('GestionEstudiantesComponent', () => {
  let component: GestionEstudiantesComponent;
  let fixture: ComponentFixture<GestionEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEstudiantesComponent ],

      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener todos los estudiantes - administrador', () => {
    console.log(component.obtenerTodos());
    expect(component.estudiantesObject).not.toBe(null);
  });

});
