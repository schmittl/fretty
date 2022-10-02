import { Injectable } from '@angular/core';
import { defaultConfig, Fretboard, FretboardConfig } from '@fretty/music';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { RestoreSettings, ShowFretNumbers, UpdateFretboardConfig, UpdateNoteLabels } from './settings.actions';

// Note: needs to be serializable to restore from localStorage
export interface SettingsStateModel {
  version: number;
  fretboardConfig: FretboardConfig;
  noteLabels: NoteLabels;
  showFretNumbers: boolean;
}

export type NoteLabels = 'notes' | 'intervals' | 'none';

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
      noteLabels: action.noteLabels,
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
}
