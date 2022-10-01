import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@environment/environment';
import { SettingsState } from './settings/settings.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([SettingsState], {
      developmentMode: !environment.production,
    }),
  ],
  exports: [],
})
export class StoreModule {}
