import { Component, ViewEncapsulation } from '@angular/core';
import { Fretboard } from '@fretty/music';
import { Store } from '@ngxs/store';
import { UpdateFretboardConfig } from '../../store/settings/settings.actions';
import { SettingsState } from '../../store/settings/settings.state';
import { FretboardBaseComponent } from '../fretboard-base.component';
import { FretboardSettings } from '../fretboard-settings/fretboard-settings';

@Component({
  selector: 'fretty-fretboard-container',
  templateUrl: './fretboard-container.component.html',
  styleUrls: ['./fretboard-container.component.scss'],
  encapsulation: ViewEncapsulation.None, // https://github.com/tailwindlabs/tailwindcss.com/pull/759
})
export class FretboardContainerComponent extends FretboardBaseComponent {
  fretboard$ = this.store.select(SettingsState.fretboard);
  noteLabels$ = this.store.select(SettingsState.noteLabels);
  showFretNumbers$ = this.store.select(SettingsState.showFretNumbers);

  constructor(private readonly store: Store) {
    super();
  }

  settingsChanged(settings: FretboardSettings): void {
    this.store.dispatch(new UpdateFretboardConfig(settings));
  }

  viewBox(fretboard: Fretboard): string {
    return `0 ${this.noteSize * -4} ${this.noteSpacing * (fretboard.config.frets + 1)} ${
      this.noteSize * 4 * fretboard.config.tuning.length
    }`;
  }
}
