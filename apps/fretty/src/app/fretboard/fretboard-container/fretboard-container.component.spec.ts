import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FretboardNoteComponent } from '../fretboard-note/fretboard-note.component';

import { FretboardContainerComponent } from './fretboard-container.component';

describe('FretboardContainerComponent', () => {
  let component: FretboardContainerComponent;
  let fixture: ComponentFixture<FretboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FretboardContainerComponent, FretboardNoteComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
