import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HotkeysHelpComponent } from './hotkeys-help.component';
import { HotkeysModule as NgHotkeysModule } from '@ngneat/hotkeys';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HotkeysService } from './hotkeys.service';

@NgModule({
  declarations: [HotkeysHelpComponent],
  imports: [CommonModule, NgHotkeysModule, MatIconModule, MatDialogModule],
  exports: [],
})
export class HotkeysModule {
  // service needs to be imported somewhere else than help component to work
  constructor(private readonly hotkeysService: HotkeysService) {}
}
