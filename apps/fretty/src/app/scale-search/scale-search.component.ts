import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { defaultScales } from '@fretty/music';
import { Store } from '@ngxs/store';
import { UpdateFretboardConfig } from '../store/settings/settings.actions';

@Component({
  selector: 'fretty-scale-search',
  templateUrl: './scale-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScaleSearchComponent {
  selectedScale = '';
  scales = defaultScales;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialogRef<ScaleSearchComponent>,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    const subcription = this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((size) => {
      if (size.matches) {
        dialog.updateSize('100vw', '100vh');
        dialog.updatePosition({ top: '0px' });
      } else {
        dialog.updateSize('500px', '');
        dialog.updatePosition({ top: '10vw' });
      }
    });
    dialog.afterClosed().subscribe(() => {
      subcription.unsubscribe();
    });
  }

  onSearch(term: string): void {
    this.scales = defaultScales.filter(
      (s) => includesIgnoreCase(s.name, term) || s.aliases.some((alias) => includesIgnoreCase(alias, term))
    );
  }

  selectScale(scale: string): void {
    this.store.dispatch(new UpdateFretboardConfig({ scale }));
    this.dialog.close();
  }
}

const includesIgnoreCase = (a: string, b: string): boolean => a.toLocaleLowerCase().includes(b.toLocaleLowerCase());
