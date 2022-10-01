import { Injectable } from '@angular/core';
import { defaultKey, defaultScale, Fretboard } from '@fretty/music';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateFretboardConfig, UpdateNoteLabels } from './settings.actions';

export interface SettingsStateModel {
  fretboard: Fretboard;
  noteLabels: NoteLabels;
}

export type NoteLabels = 'notes' | 'intervals' | 'none';

const defaultState: SettingsStateModel = {
  fretboard: new Fretboard({
    frets: 12,
    scale: defaultScale.name,
    key: defaultKey,
  }),
  noteLabels: 'notes',
};

@State<SettingsStateModel>({
  name: 'settings',
  defaults: defaultState,
})
@Injectable({
  providedIn: 'root',
})
export class SettingsState {
  @Selector()
  static fretboard(state: SettingsStateModel): Fretboard {
    return state.fretboard;
  }

  @Selector()
  static frets(state: SettingsStateModel): number {
    return state.fretboard.config.frets;
  }

  @Selector()
  static noteLabels(state: SettingsStateModel): NoteLabels {
    return state.noteLabels;
  }

  @Action(UpdateFretboardConfig)
  updateFretboard(ctx: StateContext<SettingsStateModel>, action: UpdateFretboardConfig): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      fretboard: new Fretboard({ ...state.fretboard.config, ...action.config }),
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
}
