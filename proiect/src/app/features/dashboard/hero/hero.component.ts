import { Component, input } from '@angular/core';
import { DatePipe } from '../../../core/pipes/date.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Task } from '../../../core/interfaces/task.interface';
import { StatusToString } from "../../../core/pipes/status-to-string.pipe";
import { PriorityToString } from "../../../core/pipes/priority-to-string.pipe";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzMenuModule, NzCardModule, DatePipe, StatusToString, PriorityToString],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  readonly selectedTask = input<Task| null>();

}
