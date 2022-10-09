import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { defaultScales } from '@fretty/music';
import { Store } from '@ngxs/store';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { ToggleFavorite, ToggleShowFavorites } from '../store/scale-search/scale-search.actions';
import { ScaleSearchState } from '../store/scale-search/scale-search.state';
import { UpdateFretboardConfig } from '../store/settings/settings.actions';

@Component({
  selector: 'fretty-scale-search',
  templateUrl: './scale-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScaleSearchComponent {
  selectedScale = '';
  scales = defaultScales;

  showFavorites$ = this.store.select(ScaleSearchState.showFavorites);
  favorites$ = this.store.select(ScaleSearchState.favorites);

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialogRef<ScaleSearchComponent>,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    const subscription = this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((size) => {
      if (size.matches) {
        dialog.updateSize('100vw', '100vh');
        dialog.updatePosition({});
      } else {
        dialog.updateSize('500px', '');
        dialog.updatePosition({ top: '10vh' });
      }
    });
    dialog.afterClosed().subscribe(() => {
      subscription.unsubscribe();
    });

    this.onSearch();
  }

  onSearch(term?: string): void {
    const favorites = this.store.selectSnapshot(ScaleSearchState.favorites);
    const showFavorites = this.store.selectSnapshot(ScaleSearchState.showFavorites);

    this.scales = defaultScales
      .filter((s) => !showFavorites || (showFavorites && favorites.has(s.name)))
      .filter(
        (s) =>
          term == null || includesIgnoreCase(s.name, term) || s.aliases.some((alias) => includesIgnoreCase(alias, term))
      );
  }

  selectScale(scale: string): void {
    this.store.dispatch(new UpdateFretboardConfig({ scale }));
    this.dialog.close();
  }

  toggleShowFavorites(): void {
    this.store.dispatch(new ToggleShowFavorites());

    this.onSearch(this.selectedScale);
  }

  toggleFavorite(event: MouseEvent, scale: string): void {
    event.stopPropagation();
    this.store.dispatch(new ToggleFavorite(scale));
    this.onSearch(this.selectedScale);
  }

  isFavorite$(scale: string): Observable<boolean> {
    return this.favorites$.pipe(
      map((favorite) => favorite.has(scale)),
      distinctUntilChanged()
    );
  }
}

const includesIgnoreCase = (a: string, b: string): boolean => a.toLocaleLowerCase().includes(b.toLocaleLowerCase());
