import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fretty-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly licenses: Promise<string> | undefined;

  constructor() {
    this.licenses = fetch('3rdpartylicenses.txt')
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error();
      })
      .catch(() => 'Sorry, failed to load the third party licenses :(');
  }
}
