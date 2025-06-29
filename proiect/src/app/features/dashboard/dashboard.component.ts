import { Component, computed, signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuComponent } from "../menu/menu.component";
import { NzCardModule } from 'ng-zorro-antd/card';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/interfaces/task.interface';
import { taskComparatorASC, taskComparatorDESC } from '../../core/utils/task.compare';
import { Status } from '../../core/enums/status.enum';
import { DatePipe } from "../../core/pipes/date.pipe";
import { HeroComponent } from "./hero/hero.component";
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NzButtonModule,NzIconModule, NzMenuModule, NzCardModule, MenuComponent, DatePipe, HeroComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  listofTasks?: Task[];

  selectedTask = signal<Task | null | undefined >(null);

  constructor(private taskService: TaskService, private router:Router) {
    this.listofTasks = this.taskService.getListOfTasks();
  }

  upcomingFive = computed(() =>
    this.listofTasks
      ?.filter(task =>
        (task.status === Status.TO_DO || task.status === Status.IN_PROGRESS) &&
      new Date(task.due_date) >= this.today()
      )
      .sort(taskComparatorASC)
      .slice(0, 5) ?? []
  );

today() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
  SelectTask(task:Task):void {
   this.selectedTask.set(task);
   this.scrollToTop();
}

  navigateTo(path: string):void {
    this.router.navigateByUrl(path);
  }

  scrollToTop():void{
    window.scrollTo({
     					 top: 0,
      					behavior: 'smooth'
    				});

  }
}

