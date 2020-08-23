import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsistenciasPage } from './asistencias.page';
import {Location} from "@angular/common";
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute,ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';

describe('AsistenciasPage', () => {
  let component: AsistenciasPage;
  let fixture: ComponentFixture<AsistenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciasPage ],
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
          }
        },
        {provide:HttpClient},
        {provide:ActivatedRouteSnapshot}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component.datos == null).toBeFalse();
  });

  
});
