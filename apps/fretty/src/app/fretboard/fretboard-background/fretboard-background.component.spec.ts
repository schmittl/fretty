import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fretboard } from '@fretty/music';

import { FretboardBackgroundComponent } from './fretboard-background.component';

describe('FretboardBackgroundComponent', () => {
  let component: FretboardBackgroundComponent;
  let fixture: ComponentFixture<FretboardBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardBackgroundComponent);
    component = fixture.componentInstance;
    component.fretboard = new Fretboard();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
