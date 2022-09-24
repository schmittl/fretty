import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FretboardModule } from './fretboard/fretboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FretboardModule, BrowserAnimationsModule, ToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
