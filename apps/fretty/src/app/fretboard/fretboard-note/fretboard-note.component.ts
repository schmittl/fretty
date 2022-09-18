import { Component, Input } from '@angular/core';

@Component({
  selector: 'fretty-fretboard-note',
  templateUrl: './fretboard-note.component.html',
})
export class FretboardNoteComponent {
  @Input()
  note = '';
  @Input()
  show = true;
}
