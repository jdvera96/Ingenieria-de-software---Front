import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { GestionSupervisoresComponent } from './gestion-supervisores.component';


describe('GestionSupervisoresComponent', () => {
  let component: GestionSupervisoresComponent;
  let fixture: ComponentFixture<GestionSupervisoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSupervisoresComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener todos los supervisores - administrador', () => {
    expect(component.supervisorObject).not.toBe(null);
  });
});
