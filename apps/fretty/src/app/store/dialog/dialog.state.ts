import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action, State } from '@ngxs/store';
import { take } from 'rxjs';
import { HotkeysHelpComponent } from '../../hotkeys/hotkeys-help.component';
import { SettingsDialogComponent } from '../../settings/settings-dialog/settings-dialog.component';
import { ToggleHotkeysDialog, ToggleSettingsDialog } from './dialog.actions';

@State<unknown>({
  name: 'dialog',
  defaults: {},
})
@Injectable({
  providedIn: 'root',
})
export class DialogState {
  private settingsRef: MatDialogRef<SettingsDialogComponent> | undefined;
  private hotkeysRef: MatDialogRef<HotkeysHelpComponent> | undefined;

  constructor(private readonly dialog: MatDialog, private ngZone: NgZone) {}

  @Action(ToggleSettingsDialog)
  toggleSettingsDialog(): void {
    // ngxs runs all actions outside the angular zone. We need to be in zone to close dialog via button
    this.ngZone.run(() => {
      this.close(this.hotkeysRef);

      if (this.settingsRef) {
        this.settingsRef.close();
        this.settingsRef = undefined;
      } else {
        this.settingsRef = this.dialog.open(SettingsDialogComponent, {
          panelClass: 'fretty-dialog',
          autoFocus: '#frets-slider',
          maxWidth: '100vw !important',
        });
        this.settingsRef
          .afterClosed()
          .pipe(take(1))
          .subscribe(() => {
            this.settingsRef = undefined;
          });
      }
    });
  }

  @Action(ToggleHotkeysDialog)
  toggleHotkeysDialog(): void {
    this.ngZone.run(() => {
      this.close(this.settingsRef);

      if (this.hotkeysRef) {
        this.hotkeysRef.close();
        this.hotkeysRef = undefined;
      } else {
        this.hotkeysRef = this.dialog.open(HotkeysHelpComponent, {
          width: '500px',
          maxWidth: '100vw !important',
          panelClass: 'fretty-dialog',
          autoFocus: false,
        });
        this.hotkeysRef
          .afterClosed()
          .pipe(take(1))
          .subscribe(() => {
            this.hotkeysRef = undefined;
          });
      }
    });
  }

  private close(ref: MatDialogRef<unknown> | undefined): void {
    if (ref) {
      ref.close();
    }
  }
}
