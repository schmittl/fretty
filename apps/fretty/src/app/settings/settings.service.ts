import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private readonly dialog: MatDialog) {}

  open(): void {
    this.dialog.open(SettingsDialogComponent, {
      panelClass: 'settings-dialog',
      autoFocus: '#frets-slider',
      maxWidth: '100vw !important',
    });
  }
}
