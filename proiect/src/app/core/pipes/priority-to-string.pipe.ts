import { Pipe, PipeTransform } from "@angular/core";
import { Priority } from "../enums/priority.enum";

@Pipe({
  name: "PriorityToString",
  standalone: true,
})

export class PriorityToString implements PipeTransform {
    transform(value: Priority): string {
        switch (value) {
            case Priority.LOW:
                return 'Low';
            case Priority.MEDIUM:
                return 'Medium';
            case Priority.HIGH:
                return 'High';
            default:
                return 'Unknown';
        }
    }
}