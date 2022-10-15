import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule],
})
export class AboutModule {}
