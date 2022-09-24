import { Component, Input } from '@angular/core';
import { Fretboard } from '@fretty/music';
import { FretboardBaseComponent } from '../fretboard-base.component';

@Component({
  selector: 'fretty-fretboard-svg',
  templateUrl: './fretboard-svg.component.html',
  styleUrls: ['./fretboard-svg.component.scss'],
})
export class FretboardSvgComponent extends FretboardBaseComponent {
  @Input()
  fretboard!: Fretboard;
}
