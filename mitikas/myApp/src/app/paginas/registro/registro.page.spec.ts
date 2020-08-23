import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Location,LocationStrategy} from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegistroPage } from './registro.page';
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute,Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPage],
      imports: [IonicModule.forRoot(),ReactiveFormsModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide:Location},
        {provide: UrlSerializer},
	      {provide: ActivatedRoute},
        {provide:HttpClient},
        {provide:LocationStrategy},
        {provide:Router}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
