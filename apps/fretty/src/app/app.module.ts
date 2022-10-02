import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FretboardModule } from './fretboard/fretboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from './toolbar/toolbar.module';
import { SettingsModule } from './settings/settings.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from './store/store.module';
import { HotkeysModule } from './hotkeys/hotkeys.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FretboardModule,
    HotkeysModule,
    MatDialogModule,
    SettingsModule,
    StoreModule,
    ToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
