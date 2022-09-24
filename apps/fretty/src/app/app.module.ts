import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FretboardModule } from './fretboard/fretboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from './toolbar/toolbar.module';
import { SettingsModule } from './settings/settings.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, FretboardModule, ToolbarModule, SettingsModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
