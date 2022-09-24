import { Component, ViewEncapsulation } from '@angular/core';
import { defaultKey, defaultKeys, defaultScale, defaultScales, Fretboard } from '@fretty/music';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
  encapsulation: ViewEncapsulation.None, // https://github.com/tailwindlabs/tailwindcss.com/pull/759
})
export class FretboardContainerComponent {
  scales = defaultScales;
  keys = defaultKeys;

  selectedScale = defaultScale;
  selectedKey = defaultKey;

  fretboard = this.createFretboard();

  updateFretboard(): void {
    this.fretboard = this.createFretboard();
  }

  private createFretboard(): Fretboard {
    return new Fretboard({
      frets: 12,
      scale: this.selectedScale.name,
      key: this.selectedKey,
    });
  }
}
