import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultKey, defaultKeys, defaultScale, defaultScales, Scale } from '@fretty/music';
import { FretboardSettings } from './fretboard-settings';

@Component({
  selector: 'fretty-fretboard-settings',
  templateUrl: './fretboard-settings.component.html',
})
export class FretboardSettingsComponent {
  scales = defaultScales.map((scale) => scale.name);
  keys = defaultKeys;

  @Input()
  selectedScale = defaultScale.name;
  @Input()
  selectedKey = defaultKey;

  @Output()
  settingsChanged = new EventEmitter<FretboardSettings>();

  onScaleChanged(scale: string): void {
    this.settingsChanged.emit({ scale });
  }

  onKeyChanged(key: string): void {
    this.settingsChanged.emit({ key });
  }
}
