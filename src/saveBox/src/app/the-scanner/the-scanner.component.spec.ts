import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheScannerComponent } from './the-scanner.component';

describe('TheScannerComponent', () => {
  let component: TheScannerComponent;
  let fixture: ComponentFixture<TheScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
