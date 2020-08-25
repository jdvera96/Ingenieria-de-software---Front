import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { CursoComponent } from './curso.component';

describe('CursoComponent', () => {
  let component: CursoComponent;
  let fixture: ComponentFixture<CursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
