import { Component, Input } from '@angular/core';
import { Fretboard } from '@fretty/music';

@Component({
  selector: 'fretty-fretboard-scale',
  templateUrl: './fretboard-scale.component.html',
})
export class FretboardScaleComponent {
  @Input()
  fretboard!: Fretboard;
}
