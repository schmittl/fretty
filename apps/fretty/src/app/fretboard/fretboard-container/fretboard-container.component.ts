import { Component, ViewEncapsulation } from '@angular/core';
import { defaultKey, defaultScale, Fretboard } from '@fretty/music';
import { FretboardSettings } from '../fretboard-settings/fretboard-settings';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
  encapsulation: ViewEncapsulation.None, // https://github.com/tailwindlabs/tailwindcss.com/pull/759
})
export class FretboardContainerComponent {
  fretboard = new Fretboard({
    frets: 12,
    scale: defaultScale.name,
    key: defaultKey,
  });

  settingsChanged(settings: FretboardSettings): void {
    this.fretboard = new Fretboard({
      frets: 12,
      scale: settings.scale,
      key: settings.key,
    });
  }
}
