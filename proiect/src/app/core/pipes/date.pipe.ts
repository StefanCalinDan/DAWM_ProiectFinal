import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DatePipe',
  standalone: true,
})
export class DatePipe implements PipeTransform {
  transform(value: Date | string | undefined): string {
    if (!value)
      return "";
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
