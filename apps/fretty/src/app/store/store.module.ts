import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { DialogState } from './dialog/dialog.state';
import { ScaleSearchState } from './scale-search/scale-search.state';
import { SettingsState } from './settings/settings.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([DialogState, ScaleSearchState, SettingsState], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false,
      },
    }),
    NgxsStoragePluginModule.forRoot({
      key: [ScaleSearchState, SettingsState],
    }),
    MatDialogModule,
  ],
  exports: [],
})
export class StoreModule {}
