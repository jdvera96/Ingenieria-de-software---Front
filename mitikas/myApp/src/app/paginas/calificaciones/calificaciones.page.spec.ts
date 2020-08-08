import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Location} from "@angular/common";
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import { CalificacionesPage } from './calificaciones.page';

describe('CalificacionesPage', () => {
  let component: CalificacionesPage;
  let fixture: ComponentFixture<CalificacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide:Location},
        {provide: UrlSerializer},
        {provide: ActivatedRoute,
          useValue: 
          {
            snapshot:
              {
              url: [{ path: 1 }, { path: 2 }]
               }
          }},
        {provide:HttpClient}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy(CalificacionesPage);
  });
});
