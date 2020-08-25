import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { GestionPersonasComponent } from './gestion-personas.component';

describe('GestionPersonasComponent', () => {
  let component: GestionPersonasComponent;
  let fixture: ComponentFixture<GestionPersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPersonasComponent ],
      imports: [
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
