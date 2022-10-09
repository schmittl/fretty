import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'intervals' })
export class IntervalsPipe implements PipeTransform {
  transform(value: string[] | string): string {
    if (Array.isArray(value)) {
      return value.map((v) => this.format(v)).join(' ');
    }
    return this.format(value);
  }

  private format(interval: string): string {
    return interval.replace(/(P|M)/, '');
  }
}
