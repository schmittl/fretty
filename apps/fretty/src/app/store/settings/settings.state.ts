import { Injectable } from '@angular/core';
import { defaultKey, defaultScale, Fretboard } from '@fretty/music';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateFretboardConfig } from './settings.actions';

export interface SettingsStateModel {
  fretboard: Fretboard;
}

const defaultState: SettingsStateModel = {
  fretboard: new Fretboard({
    frets: 12,
    scale: defaultScale.name,
    key: defaultKey,
  }),
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

  @Action(UpdateFretboardConfig)
  updateFretboard(ctx: StateContext<SettingsStateModel>, action: UpdateFretboardConfig) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      fretboard: new Fretboard({ ...state.fretboard.config, ...action.config }),
    });
  }
}
