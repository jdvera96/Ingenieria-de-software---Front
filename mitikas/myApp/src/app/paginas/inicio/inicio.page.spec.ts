import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Location,LocationStrategy} from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InicioPage } from './inicio.page';
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute,Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [ InicioPage ],
  exports: [ InicioPage ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomModule {}

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioPage ],
      imports: [IonicModule.forRoot()],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide:Location},
        {provide: UrlSerializer},
	      {provide: ActivatedRoute},
        {provide:HttpClient},
        {provide:LocationStrategy},
        {provide:Router}
      ],
      
      
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
