import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {Location} from "@angular/common";
import {UrlSerializer,ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import { DetallesPage } from './detalles.page';

describe('DetallesPage', () => {
  let component: DetallesPage;
  let fixture: ComponentFixture<DetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide:Location},
        {provide: UrlSerializer},
        {provide: ActivatedRoute},
        {provide:HttpClient}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(1 + 1).toBe(2);
  });
});
