import { Component, EventEmitter, Output } from '@angular/core';
import { defaultKey, defaultKeys, defaultScale, defaultScales, Scale } from '@fretty/music';
import { FretboardSettings } from './fretboard-settings';

@Component({
  selector: 'fretty-fretboard-settings',
  templateUrl: './fretboard-settings.component.html',
})
export class FretboardSettingsComponent {
  scales = defaultScales;
  keys = defaultKeys;

  selectedScale = defaultScale;
  selectedKey = defaultKey;

  @Output()
  settingsChanged = new EventEmitter<FretboardSettings>();

  onSettingsChanged(): void {
    this.settingsChanged.emit({ scale: this.selectedScale.name, key: this.selectedKey });
  }

  compareScale(a: Scale, b: Scale): boolean {
    return a === b || a?.name === b?.name;
  }
}
