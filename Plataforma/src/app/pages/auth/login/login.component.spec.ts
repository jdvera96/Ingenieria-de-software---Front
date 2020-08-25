import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,} from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
// Import module
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
