import { Component } from '@angular/core';
import { HotkeysService } from './hotkeys.service';

@Component({
  selector: 'fretty-hotkeys-help',
  templateUrl: './hotkeys-help.component.html',
})
export class HotkeysHelpComponent {
  hotkeys = this.hotkeysService.getHotkeys();

  constructor(private hotkeysService: HotkeysService) {}
}
