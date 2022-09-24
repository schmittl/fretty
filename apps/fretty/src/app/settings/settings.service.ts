import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from './settings.component';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private readonly dialog: MatDialog) {}

  open(): void {
    this.dialog.open(SettingsComponent, {
      panelClass: 'settings-dialog',
    });
  }
}
