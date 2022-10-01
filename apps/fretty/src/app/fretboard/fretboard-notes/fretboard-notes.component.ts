import { Component, Input } from '@angular/core';
import { Fretboard, FretboardNote } from '@fretty/music';
import { NoteLabels } from '../../store/settings/settings.state';
import { FretboardBaseComponent } from '../fretboard-base.component';

@Component({
  // need to use attribute selector so this component works with svg elements
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[fretty-fretboard-notes]',
  templateUrl: './fretboard-notes.component.html',
})
export class FretboardNotesComponent extends FretboardBaseComponent {
  @Input()
  fretboard!: Fretboard;

  @Input()
  noteLabels!: NoteLabels;

  getNoteLabel(note: FretboardNote): string {
    switch (this.noteLabels) {
      case 'notes':
        return note.pitchclass;
      case 'intervals':
        return note.interval ? note.interval.replace(/(P|M)/, '') : '';
      default:
        return '';
    }
  }
}
