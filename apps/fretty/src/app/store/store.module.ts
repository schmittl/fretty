import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { SettingsState } from './settings/settings.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([SettingsState], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false,
      },
    }),
    NgxsStoragePluginModule.forRoot({
      key: SettingsState,
    }),
    MatDialogModule,
  ],
  exports: [],
})
export class StoreModule {}
