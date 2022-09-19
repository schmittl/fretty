import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretboardSvgComponent } from './fretboard-svg.component';

describe('FretboardSvgComponent', () => {
  let component: FretboardSvgComponent;
  let fixture: ComponentFixture<FretboardSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
