import { TestBed } from '@angular/core/testing';
import {Location} from "@angular/common";
import {UrlSerializer} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { ConsultaService } from './consulta.service';


describe('ConsultaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide:Location},
      {provide: UrlSerializer},
      {provide: ActivatedRoute},
      {provide:HttpClient}
    ],
  }));

  it('should be created', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service).toBeTruthy();
  });
});