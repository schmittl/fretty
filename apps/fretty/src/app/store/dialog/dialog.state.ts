import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, State } from '@ngxs/store';
import { AboutComponent } from '../../about/about.component';
import { HotkeysHelpComponent } from '../../hotkeys/hotkeys-help.component';
import { SettingsDialogComponent } from '../../settings/settings-dialog/settings-dialog.component';
import { ToggleAboutDialog, ToggleHotkeysDialog, ToggleSettingsDialog } from './dialog.actions';

@State<unknown>({
  name: 'dialog',
  defaults: {},
})
@Injectable({
  providedIn: 'root',
})
export class DialogState {
  constructor(private readonly dialog: MatDialog, private ngZone: NgZone) {}

  @Action(ToggleSettingsDialog)
  toggleSettingsDialog(): void {
    this.runInZone(() => {
      const settingsRef = this.dialog.getDialogById('settings');
      this.dialog.closeAll();

      if (settingsRef == null) {
        this.dialog.open(SettingsDialogComponent, {
          id: 'settings',
          panelClass: 'fretty-dialog',
          autoFocus: '#frets-slider',
          maxWidth: '100vw !important',
        });
      }
    });
  }

  @Action(ToggleHotkeysDialog)
  toggleHotkeysDialog(): void {
    this.runInZone(() => {
      const hotkeysRef = this.dialog.getDialogById('hotkeys');
      this.dialog.closeAll();

      if (hotkeysRef == null) {
        this.dialog.open(HotkeysHelpComponent, {
          id: 'hotkeys',
          width: '500px',
          maxWidth: '100vw !important',
          panelClass: 'fretty-dialog',
          autoFocus: false,
        });
      }
    });
  }

  @Action(ToggleAboutDialog)
  toggleAboutDialog(): void {
    this.runInZone(() => {
      const hotkeysRef = this.dialog.getDialogById('about');
      this.dialog.closeAll();

      if (hotkeysRef == null) {
        this.dialog.open(AboutComponent, {
          id: 'about',
          width: '500px',
          maxWidth: '100vw !important',
          panelClass: 'fretty-dialog',
          autoFocus: false,
        });
      }
    });
  }

  // ngxs runs all actions outside the angular zone. We need to be in zone e.g. to close dialog via button
  private runInZone(fn: () => void): void {
    this.ngZone.run(() => fn());
  }
}
