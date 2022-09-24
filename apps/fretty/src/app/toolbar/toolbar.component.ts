import { Component } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'fretty-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  constructor(private readonly settingsService: SettingsService) {}

  openSettings(): void {
    this.settingsService.open();
  }
}
