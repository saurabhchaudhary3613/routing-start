import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DummyComponent } from './dummy.component';
import { DummyService } from './dummy.service';
import { DataService } from '../shared/data.service';

describe('Component: Dummy', () => {
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent]
    });
  })

  it('should create the app', () => {
    console.log('dummy');
    let fixture = TestBed.createComponent(DummyComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use the user name from service', () => {
    let fixture = TestBed.createComponent(DummyComponent);
    let app = fixture.debugElement.componentInstance;
    let dummyService = fixture.debugElement.injector.get(DummyService);
    fixture.detectChanges();
    expect(dummyService.user.name).toEqual(app.user.name);
  });
  it('should display user name if user is logged in ', () => {
    let fixture = TestBed.createComponent(DummyComponent);
    let app = fixture.debugElement.componentInstance;
    // let dummyService = fixture.debugElement.injector.get(DummyService);
    app.isLoggedIn = true;
    fixture.detectChanges();
    console.log(app.user.name);
    let complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector('p').textContent).toContain('Saurabh');
  });
  it('should\'t display user name if user is not logged in ', () => {
    let fixture = TestBed.createComponent(DummyComponent);
    let app = fixture.debugElement.componentInstance;
    // let dummyService = fixture.debugElement.injector.get(DummyService);
    app.isLoggedIn = false;
    fixture.detectChanges();
    console.log(app.user.name);
    let complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector('p').textContent).not.toContain('Saurabh');
  });
  it('should not fectch data successfully if not called successfully', () => {
    let fixture = TestBed.createComponent(DummyComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
      fixture.detectChanges();
      expect(app.data).toBe(undefined);
  });
  it('should fectch data successfully if called successfully', async(() => {
    let fixture = TestBed.createComponent(DummyComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(app.data).toBe('Data');
      });
  }));
  it('should fectch data successfully if called successfully', fakeAsync(() => {
    let fixture = TestBed.createComponent(DummyComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
      fixture.detectChanges();
      tick();
      expect(app.data).toBe('Data');
  }));

});
