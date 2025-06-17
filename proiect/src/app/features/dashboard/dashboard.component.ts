import { Component, computed } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuComponent } from "../menu/menu.component";
import { NzCardModule } from 'ng-zorro-antd/card';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/interfaces/task.interface';
import { taskComparatorDESC } from '../../core/utils/task.compare';
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

  constructor(private taskService: TaskService, private router:Router) {
    this.listofTasks = this.taskService.getListOfTasks();
  }

  upcomingFive = computed(() =>
    this.listofTasks
      ?.filter(task =>
        task.status === Status.TO_DO || task.status === Status.IN_PROGRESS
      )
      .sort(taskComparatorDESC)
      .slice(0, 5) ?? []
  );

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  scrollToTop():void{
    window.scrollTo({
     					 top: 0,
      					behavior: 'smooth'
    				});

  }
}

