import { Injectable } from '@angular/core';
import { Hotkey, HotkeyGroup, HotkeysService as NgHotkeysService } from '@ngneat/hotkeys';
import { Store } from '@ngxs/store';
import { filter, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { ShowFretNumbers, ToggleIntervals, UpdateNoteLabels } from '../store/settings/settings.actions';
import { ToggleHotkeysDialog, ToggleSettingsDialog } from '../store/dialog/dialog.actions';

@Injectable({
  providedIn: 'root',
})
export class HotkeysService {
  private disallowedElements = ['MAT-SELECT'];

  constructor(private store: Store, private hotkeys: NgHotkeysService) {
    this.registerHelpModal();
    this.registerHotkeys();
  }

  getHotkeys(): HotkeyGroup[] {
    const hotkeys = this.hotkeys.getShortcuts();
    const globalHotkeys = hotkeys.find((hotkey) => hotkey.group === 'Global');
    globalHotkeys?.hotkeys.push({
      description: 'Toggle hotkey dialog',
      keys: '?',
    });
    const fretboardHotkeys = hotkeys.find((hotkey) => hotkey.group === 'Fretboard');
    fretboardHotkeys?.hotkeys.push({
      description: 'Toggle notes based on interval',
      keys: '1-7',
    });
    fretboardHotkeys?.hotkeys.push({
      description: 'Restore all notes',
      keys: '0',
    });
    return hotkeys;
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
