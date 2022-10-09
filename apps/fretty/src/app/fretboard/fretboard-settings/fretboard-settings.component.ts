import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultKey, defaultKeys, defaultScale } from '@fretty/music';
import { FretboardSettings } from './fretboard-settings';

@Component({
  selector: 'fretty-fretboard-settings',
  templateUrl: './fretboard-settings.component.html',
})
export class FretboardSettingsComponent {
  keys = defaultKeys;

  @Input()
  selectedScale = defaultScale.name;
  @Input()
  selectedKey = defaultKey;

  @Output()
  settingsChanged = new EventEmitter<FretboardSettings>();
  @Output()
  searchClicked = new EventEmitter<void>();

  onKeyChanged(key: string): void {
    this.settingsChanged.emit({ key });
  }

  onSearchClicked(): void {
    this.searchClicked.emit();
  }
}
