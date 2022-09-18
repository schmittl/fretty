import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FretboardModule } from './fretboard/fretboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FretboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
