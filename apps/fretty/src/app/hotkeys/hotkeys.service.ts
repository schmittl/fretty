import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Hotkey, HotkeyGroup, HotkeysService as NgHotkeysService } from '@ngneat/hotkeys';
import { Store } from '@ngxs/store';
import { filter, MonoTypeOperatorFunction, Observable, take } from 'rxjs';
import { HotkeysHelpComponent } from './hotkeys-help.component';
import {
  ShowFretNumbers,
  ToggleIntervals,
  ToggleSettingsDialog,
  UpdateNoteLabels,
} from '../store/settings/settings.actions';

@Injectable({
  providedIn: 'root',
})
export class HotkeysService {
  private ref: MatDialogRef<HotkeysHelpComponent> | undefined;
  private disallowedElements = 'MAT-SELECT';

  constructor(private store: Store, private hotkeys: NgHotkeysService, private dialog: MatDialog) {
    this.registerHelpModal();
    this.registerHotkeys();
  }

  getShortcuts(): HotkeyGroup[] {
    return this.hotkeys.getShortcuts();
  }

  private registerHotkeys(): void {
    this.addHotkey({ keys: 'o', description: 'Toggle settings dialog', group: 'Global' }).subscribe(() =>
      this.store.dispatch(new ToggleSettingsDialog())
    );
    this.addHotkey({ keys: 'n', description: 'Toggle fret numbers', group: 'Fretboard' }).subscribe(() =>
      this.store.dispatch(new ShowFretNumbers())
    );
    this.addHotkey({ keys: 'l', description: 'Toggle note labels', group: 'Fretboard' }).subscribe(() =>
      this.store.dispatch(new UpdateNoteLabels())
    );

    for (let i = 0; i < 8; i++) {
      const key = `${i}`;
      this.addHotkey({ keys: key, showInHelpMenu: false }).subscribe(() =>
        this.store.dispatch(new ToggleIntervals(key))
      );
    }
  }

  private addHotkey(options: Hotkey): Observable<KeyboardEvent> {
    return this.hotkeys.addShortcut(options).pipe(this.filterDisallowedTargets());
  }

  private filterDisallowedTargets(): MonoTypeOperatorFunction<KeyboardEvent> {
    return filter((e) => {
      if (e.target instanceof Element) {
        return !this.disallowedElements.includes(e?.target.nodeName);
      }
      return false;
    });
  }

  private registerHelpModal(): void {
    this.hotkeys.registerHelpModal(() => {
      if (this.ref) {
        this.ref.close();
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
