import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotkeyGroup, HotkeysService as NgHotkeysService } from '@ngneat/hotkeys';
import { Store } from '@ngxs/store';
import { take } from 'rxjs';
import { HotkeysHelpComponent } from './hotkeys-help.component';
import { ShowFretNumbers, UpdateNoteLabels } from '../store/settings/settings.actions';

@Injectable({
  providedIn: 'root',
})
export class HotkeysService {
  private ref: MatDialogRef<HotkeysHelpComponent, unknown> | undefined;

  constructor(private store: Store, private hotkeys: NgHotkeysService, private dialog: MatDialog) {
    this.registerHelpModal();
    this.registerHotkeys();
  }

  getShortcuts(): HotkeyGroup[] {
    return this.hotkeys.getShortcuts();
  }

  private registerHotkeys(): void {
    this.hotkeys
      .addShortcut({ keys: 'n', description: 'Toggle fret numbers', group: 'Fretboard' })
      .subscribe(() => this.store.dispatch(new ShowFretNumbers()));
    this.hotkeys
      .addShortcut({ keys: 'l', description: 'Toggle note labels', group: 'Fretboard' })
      .subscribe(() => this.store.dispatch(new UpdateNoteLabels()));
  }

  private registerHelpModal(): void {
    this.hotkeys.registerHelpModal(() => {
      if (this.ref) {
        this.ref?.close();
        this.ref = undefined;
      } else {
        this.ref = this.dialog.open(HotkeysHelpComponent, {
          width: '500px',
          maxWidth: '100vw !important',
          panelClass: 'fretty-dialog',
          autoFocus: false,
        });
        this.ref
          .afterClosed()
          .pipe(take(1))
          .subscribe(() => {
            this.ref = undefined;
          });
      }
    });
  }
}
