import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToggleHotkeysDialog, ToggleSettingsDialog } from '../store/dialog/dialog.actions';

@Component({
  selector: 'fretty-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  constructor(private readonly store: Store) {}

  openSettings(): void {
    this.store.dispatch(new ToggleSettingsDialog());
  }

  openHotkeys(): void {
    this.store.dispatch(new ToggleHotkeysDialog());
  }
}
