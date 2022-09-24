import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, FormsModule, MatDialogModule, MatIconModule],
  exports: [],
})
export class SettingsModule {}
