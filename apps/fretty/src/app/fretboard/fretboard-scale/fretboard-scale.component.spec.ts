import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fretboard } from '@fretty/music';
import { SharedModule } from '../../shared/shared.module';

import { FretboardScaleComponent } from './fretboard-scale.component';

describe('FretboardScaleComponent', () => {
  let component: FretboardScaleComponent;
  let fixture: ComponentFixture<FretboardScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardScaleComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardScaleComponent);
    component = fixture.componentInstance;
    component.fretboard = new Fretboard();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
