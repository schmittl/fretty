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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'fretty-settings',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  frets = this.store.selectSnapshot(SettingsState.frets);
  noteLabels = this.store.select(SettingsState.noteLabels).pipe(map((label) => [label]));
  showFretNumbers = this.store.select(SettingsState.showFretNumbers);

  constructor(
    private readonly dialog: MatDialogRef<SettingsDialogComponent>,
    private readonly store: Store,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    const smallDialogSubscription = this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((size) => {
      if (size.matches) {
        dialog.updateSize('100vw', '100vh');
      } else {
        dialog.updateSize('500px', '');
      }
    });
    dialog.afterClosed().subscribe(() => {
      smallDialogSubscription.unsubscribe();
    });
  }

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
