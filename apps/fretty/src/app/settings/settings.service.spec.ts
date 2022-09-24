import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MatDialogModule] });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
