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

  fretboard = this.createFretboard();

  showNote = (note: string): boolean => {
    return scaleIncludes(this.selectedScale, this.selectedKey, note);
  };

  updateFretboard(): void {
    this.fretboard = this.createFretboard();
  }

  private createFretboard(): Fretboard {
    return new Fretboard({
      frets: 24,
      scale: this.selectedScale.name,
      key: this.selectedKey,
    });
  }
}
