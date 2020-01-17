import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisCursosPage } from './mis-cursos.page';

describe('MisCursosPage', () => {
  let component: MisCursosPage;
  let fixture: ComponentFixture<MisCursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCursosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisCursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
