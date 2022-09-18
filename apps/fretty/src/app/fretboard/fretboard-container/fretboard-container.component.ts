import { Component } from '@angular/core';
import { Fretboard } from '@fretty/music';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
})
export class FretboardContainerComponent {
  fretboard = new Fretboard({
    frets: 12,
  });
}
