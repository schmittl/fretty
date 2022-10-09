import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToggleFavorite, ToggleShowFavorites } from './scale-search.actions';

interface ScaleSearchStateModel {
  favorites: string[];
  showFavorites: boolean;
}

const defaultState: ScaleSearchStateModel = {
  favorites: ['aeolian', 'minor pentatonic'],
  showFavorites: false,
};

@State<ScaleSearchStateModel>({
  name: 'scale_search',
  defaults: defaultState,
})
@Injectable({
  providedIn: 'root',
})
export class ScaleSearchState {
  @Selector([ScaleSearchState])
  static favorites(state: ScaleSearchStateModel): Set<string> {
    return new Set(state.favorites);
  }

  @Selector([ScaleSearchState])
  static showFavorites(state: ScaleSearchStateModel): boolean {
    return state.showFavorites;
  }

  @Action(ToggleShowFavorites)
  toggleShowFavorites(ctx: StateContext<ScaleSearchStateModel>): void {
    const state = ctx.getState();
    ctx.setState({ ...state, showFavorites: !state.showFavorites });
  }

  @Action(ToggleFavorite)
  toggleFavorite(ctx: StateContext<ScaleSearchStateModel>, action: ToggleFavorite): void {
    const state = ctx.getState();
    const favorites = new Set(state.favorites);
    if (favorites.has(action.scale)) {
      favorites.delete(action.scale);
    } else {
      favorites.add(action.scale);
    }
    ctx.setState({
      ...state,
      favorites: [...favorites],
    });
  }
}
