import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import {Location} from "@angular/common";
import {UrlSerializer} from '@angular/router';

import { AppComponent } from './app.component';

class MockPlatform {
  ready: jasmine.Spy<any>;
  backButton: any;
}
class MockBackButton {
  subscribeWithPriority: jasmine.Spy<any>;
}

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, mockPlatform,mockBackButton;
  

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy});
    mockPlatform = new MockPlatform();
    mockPlatform.ready = platformReadySpy;
    mockBackButton = new MockBackButton();
    mockBackButton.subscribeWithPriority = jasmine.createSpy('subscribeWithPriority', (priority, fn) => {});
    mockPlatform.backButton = mockBackButton;
 
    
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
       
        { provide:Firebase},
        { provide:Location},
        {provide: UrlSerializer},
        {provide: MockPlatform, useValue: mockPlatform}
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    /*expect(mockPlatform).toHaveBeenCalled();
    await mockPlatform;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();*/
  });

  // TODO: add more tests!
  

});
