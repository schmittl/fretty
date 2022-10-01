import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngxs/store';
import {
  RestoreSettings,
  ShowFretNumbers,
  UpdateFretboardConfig,
  UpdateNoteLabels,
} from '../../store/settings/settings.actions';
import { NoteLabels, SettingsState } from '../../store/settings/settings.state';

@Component({
  selector: 'fretty-settings',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  frets = this.store.selectSnapshot(SettingsState.frets);
  noteLabels = [this.store.selectSnapshot(SettingsState.noteLabels)];
  showFretNumbers = this.store.selectSnapshot(SettingsState.showFretNumbers);

  constructor(private readonly dialog: MatDialogRef<SettingsDialogComponent>, private readonly store: Store) {}

  updateFrets(frets: number): void {
    this.store.dispatch(new UpdateFretboardConfig({ frets }));
  }

  updateFretNumbers(event: MatSlideToggleChange): void {
    this.store.dispatch(new ShowFretNumbers(event.checked));
  }

  updateLabels(event: MatButtonToggleChange): void {
    const toggle = event.source;
    if (toggle) {
      const value = event.value as NoteLabels[];
      const group = toggle.buttonToggleGroup;
      if (value.some((item) => item == toggle.value)) {
        group.value = [toggle.value];
        this.store.dispatch(new UpdateNoteLabels(toggle.value));
      } else {
        this.store.dispatch(new UpdateNoteLabels('none'));
      }
    }
  }

  restoreSettings(): void {
    this.store.dispatch(new RestoreSettings());
    this.dialog.close();
  }
}
