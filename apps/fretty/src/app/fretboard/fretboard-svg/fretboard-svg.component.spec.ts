import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fretboard } from '@fretty/music';
import { FretboardNoteComponent } from '../fretboard-note/fretboard-note.component';

import { FretboardSvgComponent } from './fretboard-svg.component';

describe('FretboardSvgComponent', () => {
  let component: FretboardSvgComponent;
  let fixture: ComponentFixture<FretboardSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardSvgComponent, FretboardNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardSvgComponent);
    component = fixture.componentInstance;
    component.fretboard = new Fretboard();
    component.showNote = () => true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
