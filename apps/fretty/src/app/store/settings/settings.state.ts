import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { defaultConfig, Fretboard, FretboardConfig } from '@fretty/music';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { take } from 'rxjs';
import { SettingsDialogComponent } from '../../settings/settings-dialog/settings-dialog.component';
import {
  ToggleSettingsDialog,
  RestoreSettings,
  ShowFretNumbers,
  UpdateFretboardConfig,
  UpdateNoteLabels,
} from './settings.actions';

// Note: needs to be serializable to restore from localStorage
export interface SettingsStateModel {
  version: number;
  fretboardConfig: FretboardConfig;
  noteLabels: NoteLabels;
  showFretNumbers: boolean;
}

const noteLabels = ['notes', 'intervals', 'none'] as const;
export type NoteLabels = typeof noteLabels[number];

const defaultState: SettingsStateModel = {
  version: 1,
  fretboardConfig: {
    ...defaultConfig,
    frets: 12,
  },
  noteLabels: 'notes',
  showFretNumbers: false,
};

@State<SettingsStateModel>({
  name: 'settings',
  defaults: defaultState,
})
@Injectable({
  providedIn: 'root',
})
export class SettingsState {
  private settingsDialogRef: MatDialogRef<SettingsDialogComponent, unknown> | undefined;

  constructor(private readonly dialog: MatDialog, private ngZone: NgZone) {}

  @Selector([SettingsState])
  static fretboard(state: SettingsStateModel): Fretboard {
    return new Fretboard(state.fretboardConfig);
  }

  @Selector([SettingsState.fretboard])
  static frets(fretboard: Fretboard): number {
    return fretboard.config.frets;
  }

  @Selector([SettingsState])
  static noteLabels(state: SettingsStateModel): NoteLabels {
    return state.noteLabels;
  }

  @Selector([SettingsState])
  static showFretNumbers(state: SettingsStateModel): boolean {
    return state.showFretNumbers;
  }

  @Action(UpdateFretboardConfig)
  updateFretboard(ctx: StateContext<SettingsStateModel>, action: UpdateFretboardConfig): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      fretboardConfig: { ...state.fretboardConfig, ...action.config },
    });
  }

  @Action(UpdateNoteLabels)
  updateNoteLabels(ctx: StateContext<SettingsStateModel>, action: UpdateNoteLabels): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      noteLabels: action.noteLabels ?? this.nextLabelType(ctx.getState().noteLabels),
    });
  }

  @Action(ShowFretNumbers)
  showFretNumbers(ctx: StateContext<SettingsStateModel>, action: ShowFretNumbers): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      showFretNumbers: action.showFretNumbers ?? !state.showFretNumbers,
    });
  }

  @Action(RestoreSettings)
  restoreSettings(ctx: StateContext<SettingsStateModel>): void {
    ctx.setState({
      ...defaultState,
    });
  }

  @Action(ToggleSettingsDialog)
  toggleSettingsDialog(): void {
    this.ngZone.run(() => {
      if (this.settingsDialogRef) {
        this.settingsDialogRef.close();
        this.settingsDialogRef = undefined;
      } else {
        this.settingsDialogRef = this.dialog.open(SettingsDialogComponent, {
          panelClass: 'fretty-dialog',
          autoFocus: '#frets-slider',
          maxWidth: '100vw !important',
        });
        this.settingsDialogRef
          .afterClosed()
          .pipe(take(1))
          .subscribe(() => {
            this.settingsDialogRef = undefined;
          });
      }
    });
  }

  private nextLabelType(current: NoteLabels): NoteLabels {
    const newIndex = noteLabels.indexOf(current) + 1;
    if (newIndex === noteLabels.length) {
      return noteLabels[0];
    }
    return noteLabels[newIndex];
  }
}
