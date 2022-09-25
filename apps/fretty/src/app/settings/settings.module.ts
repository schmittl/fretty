import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SettingsDialogComponent],
  imports: [CommonModule, FormsModule, MatDialogModule, MatIconModule],
  exports: [],
})
export class SettingsModule {}
