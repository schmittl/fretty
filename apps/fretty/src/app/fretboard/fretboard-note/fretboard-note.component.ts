import { Component, Input } from '@angular/core';

@Component({
  // need to use attribute selector so this component works with svg elements
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[fretty-fretboard-note]',
  templateUrl: './fretboard-note.component.html',
})
export class FretboardNoteComponent {
  @Input()
  note = '';
  @Input()
  size = 40;
}
