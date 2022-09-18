import { Component } from '@angular/core';
import { Fretboard, keys, scales } from '@fretty/music';
import { Note, ScaleType } from '@tonaljs/tonal';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
})
export class FretboardContainerComponent {
  scales = scales;
  keys = keys;

  selectedScale = ScaleType.get('aeolian');
  selectedKey = 'C';

  fretboard = new Fretboard({
    frets: 12,
  });

  showNote(note: string): boolean {
    if (this.selectedScale.empty) {
      return true;
    }
    const scaleNotes = this.selectedScale.intervals
      .map(Note.transposeFrom(this.selectedKey))
      .map((note) => Note.simplify(note));
    return scaleNotes.includes(note) || scaleNotes.includes(Note.enharmonic(note));
  }
}
