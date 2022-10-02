import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HotkeysModule } from '@ngneat/hotkeys';
import { NgxsModule } from '@ngxs/store';

import { HotkeysHelpComponent } from './hotkeys-help.component';

describe('HotkeysHelpComponent', () => {
  let component: HotkeysHelpComponent;
  let fixture: ComponentFixture<HotkeysHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotkeysHelpComponent],
      imports: [NgxsModule.forRoot(), MatDialogModule, MatIconModule, HotkeysModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HotkeysHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
