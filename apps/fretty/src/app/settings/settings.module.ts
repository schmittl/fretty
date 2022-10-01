import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [SettingsDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSliderModule,
  ],
  exports: [],
})
export class SettingsModule {}
