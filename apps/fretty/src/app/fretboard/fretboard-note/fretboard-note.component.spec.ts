import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretboardNoteComponent } from './fretboard-note.component';

describe('FretboardNoteComponent', () => {
  let component: FretboardNoteComponent;
  let fixture: ComponentFixture<FretboardNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
