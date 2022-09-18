import { Component } from '@angular/core';
import { Fretboard } from '@fretty/music';
import { Note, ScaleType } from '@tonaljs/tonal';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
})
export class FretboardContainerComponent {
  fretboard = new Fretboard({
    frets: 12,
  });

  private scale = ScaleType.get('major');
  private key = 'E';

  showNote(note: string): boolean {
    const scale = this.scale.intervals.map(Note.transposeFrom(this.key));
    return scale.includes(note);
  }
}
