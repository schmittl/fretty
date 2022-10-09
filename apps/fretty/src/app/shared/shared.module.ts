import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntervalsPipe } from './intervals.pipe';

@NgModule({
  declarations: [IntervalsPipe],
  imports: [CommonModule],
  exports: [IntervalsPipe],
})
export class SharedModule {}
