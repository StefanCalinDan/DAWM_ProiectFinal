import { Pipe, PipeTransform } from "@angular/core";
import { Status } from "../enums/status.enum";

@Pipe({
  name: "StatusToString",
  standalone: true,
})

export class StatusToString implements PipeTransform {
    transform(value: Status |undefined | null): string {
        if (value === undefined || value === null) {
      return '';
    }
        switch (value) {
            case Status.TO_DO:
                return 'To do';
            case Status.IN_PROGRESS:
                return 'In progress';
            case Status.COMPLETED:
                return 'Completed';
            default:
                return 'Unknown';
        }
    }
}