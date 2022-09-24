import { Component, Input } from '@angular/core';
import { Fretboard } from '@fretty/music';
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
}
