import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fretty-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
