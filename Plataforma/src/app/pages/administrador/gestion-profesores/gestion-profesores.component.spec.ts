import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { GestionProfesoresComponent } from './gestion-profesores.component';

describe('GestionProfesoresComponent', () => {
  let component: GestionProfesoresComponent;
  let fixture: ComponentFixture<GestionProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionProfesoresComponent ],
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener todos los profesores - administrador', () => {
    console.log(component.obtenerTodos());
    expect(component.profesoresObject).not.toBe(null);
  });
});
