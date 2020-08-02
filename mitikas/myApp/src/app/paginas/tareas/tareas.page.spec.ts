import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Location} from "@angular/common";
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import { TareasPage } from './tareas.page';

describe('TareasPage', () => {
  let component: TareasPage;
  let fixture: ComponentFixture<TareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide:Location},
        {provide: UrlSerializer},
	      {provide: ActivatedRoute},
        {provide:HttpClient}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
