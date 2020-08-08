import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisCursosPage } from './mis-cursos.page';
import {Location} from "@angular/common";
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';


describe('MisCursosPage', () => {
  let component: MisCursosPage;
  let fixture: ComponentFixture<MisCursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCursosPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide:Location},
        {provide: UrlSerializer},
	      {provide: ActivatedRoute},
        {provide:HttpClient}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MisCursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
