import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fretboard } from '@fretty/music';

import { FretboardSvgComponent } from './fretboard-svg.component';

describe('FretboardSvgComponent', () => {
  let component: FretboardSvgComponent;
  let fixture: ComponentFixture<FretboardSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardSvgComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardSvgComponent);
    component = fixture.componentInstance;
    component.fretboard = new Fretboard();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
