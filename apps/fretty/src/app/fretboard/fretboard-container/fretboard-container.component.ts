import { Component } from '@angular/core';
import { defaultKey, defaultKeys, defaultScale, defaultScales, Fretboard, scaleIncludes } from '@fretty/music';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
})
export class FretboardContainerComponent {
  scales = defaultScales;
  keys = defaultKeys;

  selectedScale = defaultScale;
  selectedKey = defaultKey;

  fretboard = new Fretboard({
    frets: 12,
  });

  showNote = (note: string): boolean => {
    return scaleIncludes(this.selectedScale, this.selectedKey, note);
  };
}
