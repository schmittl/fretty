import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fretboard } from '@fretty/music';
import { FretboardNoteComponent } from '../fretboard-note/fretboard-note.component';

import { FretboardNotesComponent } from './fretboard-notes.component';

describe('FretboardNotesComponent', () => {
  let component: FretboardNotesComponent;
  let fixture: ComponentFixture<FretboardNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardNotesComponent, FretboardNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardNotesComponent);
    component = fixture.componentInstance;
    component.fretboard = new Fretboard();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
