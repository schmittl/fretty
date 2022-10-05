import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Hotkey, HotkeyGroup, HotkeysService as NgHotkeysService } from '@ngneat/hotkeys';
import { Store } from '@ngxs/store';
import { filter, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { HotkeysHelpComponent } from './hotkeys-help.component';
import { ShowFretNumbers, ToggleIntervals, UpdateNoteLabels } from '../store/settings/settings.actions';
import { ToggleHotkeysDialog, ToggleSettingsDialog } from '../store/dialog/dialog.actions';

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
    const shortcuts = this.hotkeys.getShortcuts();
    const globalShortcuts = shortcuts.find((shortcut) => shortcut.group === 'Global');
    globalShortcuts?.hotkeys.push({
      description: 'Toggle hotkey dialog',
      keys: '?',
    });
    const fretboardShortcuts = shortcuts.find((shortcut) => shortcut.group === 'Fretboard');
    fretboardShortcuts?.hotkeys.push({
      description: 'Toggle notes based on interval',
      keys: '1-7',
    });
    fretboardShortcuts?.hotkeys.push({
      description: 'Restore all notes',
      keys: '0',
    });
    return shortcuts;
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
      this.store.dispatch(new ToggleHotkeysDialog());
    });
  }
}
