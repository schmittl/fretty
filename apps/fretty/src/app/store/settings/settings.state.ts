import { Injectable } from '@angular/core';
import { defaultConfig, Fretboard, FretboardConfig } from '@fretty/music';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import {
  RestoreSettings,
  ShowFretNumbers,
  UpdateFretboardConfig,
  UpdateNoteLabels,
  ToggleIntervals,
} from './settings.actions';

// Note: needs to be serializable to restore from localStorage
export interface SettingsStateModel {
  version: number;
  fretboardConfig: FretboardConfig;
  noteLabels: NoteLabels;
  showFretNumbers: boolean;
  selectedIntervals?: string[];
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
  constructor(private store: Store) {}

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

  @Selector([SettingsState, SettingsState.fretboard])
  static selectedIntervals(state: SettingsStateModel, fretboard: Fretboard): string[] {
    if (state.selectedIntervals == null) {
      return fretboard.scaleIntervals;
    }
    return state.selectedIntervals;
  }

  @Action(UpdateFretboardConfig)
  updateFretboard(ctx: StateContext<SettingsStateModel>, action: UpdateFretboardConfig): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      fretboardConfig: { ...state.fretboardConfig, ...action.config },
      selectedIntervals: undefined,
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

  @Action(ToggleIntervals)
  toggleIntervals(ctx: StateContext<SettingsStateModel>, action: ToggleIntervals): void {
    const state = ctx.getState();
    const fretboard = this.store.selectSnapshot(SettingsState.fretboard);
    const key = action.key;
    if (key === '0') {
      ctx.setState({
        ...state,
        selectedIntervals: [...fretboard.scaleIntervals],
      });
    } else {
      if (fretboard.scaleIntervals.length === state.selectedIntervals?.length) {
        ctx.setState({
          ...state,
          selectedIntervals: fretboard.scaleIntervals.filter((interval) => interval.includes(key)),
        });
      } else {
        const typedIntervals = fretboard.scaleIntervals.filter((interval) => interval.includes(key));
        if (typedIntervals.length > 0 && !typedIntervals.every((e) => state.selectedIntervals?.includes(e))) {
          ctx.setState({
            ...state,
            selectedIntervals: [...(state.selectedIntervals ?? []), ...typedIntervals],
          });
        }
      }
    }
  }

  private nextLabelType(current: NoteLabels): NoteLabels {
    const newIndex = noteLabels.indexOf(current) + 1;
    if (newIndex === noteLabels.length) {
      return noteLabels[0];
    }
    return noteLabels[newIndex];
  }
}
