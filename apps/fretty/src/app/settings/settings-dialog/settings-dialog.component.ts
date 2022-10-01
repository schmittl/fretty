import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { UpdateFretboardConfig } from '@store/settings/settings.actions';
import { SettingsState } from '@store/settings/settings.state';

@Component({
  selector: 'fretty-settings',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  frets = this.store.selectSnapshot(SettingsState.frets);

  constructor(private readonly dialog: MatDialogRef<SettingsDialogComponent>, private readonly store: Store) {}

  updateFrets(frets: number): void {
    this.store.dispatch(new UpdateFretboardConfig({ frets }));
  }
}
