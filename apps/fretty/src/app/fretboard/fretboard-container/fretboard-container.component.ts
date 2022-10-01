import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateFretboardConfig } from '@store/settings/settings.actions';
import { SettingsState } from '@store/settings/settings.state';
import { FretboardSettings } from '../fretboard-settings/fretboard-settings';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
  encapsulation: ViewEncapsulation.None, // https://github.com/tailwindlabs/tailwindcss.com/pull/759
})
export class FretboardContainerComponent {
  fretboard$ = this.store.select(SettingsState.fretboard);

  constructor(private readonly store: Store) {}

  settingsChanged(settings: FretboardSettings): void {
    this.store.dispatch(new UpdateFretboardConfig(settings));
  }
}
