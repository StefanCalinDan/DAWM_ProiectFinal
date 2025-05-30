import { Component, OnInit } from '@angular/core';
import { Task } from "../../core/interfaces/task.interface"
import { TaskService } from '../../core/services/task.service';
import { ColumnService } from '../../core/services/column.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DatePipe } from "../../core/pipes/date.pipe";
import { PriorityToString } from '../../core/pipes/priority-to-string.pipe';
import { StatusToString } from '../../core/pipes/status-to-string.pipe';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    NzTableModule,
    DatePipe,
    PriorityToString,
    StatusToString,
    NzPaginationModule,
    NzIconModule,
    NzModalModule
],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent implements OnInit {
  listOfTasks: Task[] = []
  listOfColumns: any[] = []

  constructor(
    private taskService: TaskService, 
    private columnService: ColumnService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadColumns();
  }

  loadTasks() {
    this.listOfTasks = this.taskService.getListOfTasks();
  }

  loadColumns() {
    this.listOfColumns = this.columnService.getListOfColumns();
  }

  deleteRowFromTable(taskId: number) {
    this.listOfTasks = this.listOfTasks.filter(task => task.id !== taskId);
    this.taskService.deleteTaskById(taskId);
  }

  async openEditTaskModal(task: Task): Promise<void> {
    const { EditTaskFormComponent } = await import('../edit-task-form/edit-task-form.component');

    const modalRef = this.modal.create({
      nzTitle: 'Edit Task',
      nzContent: EditTaskFormComponent,
      nzData: { task },
      nzFooter: null,
    });

    modalRef.afterClose.subscribe((result: Task | undefined) => {
      if (result) {
        const index = this.listOfTasks.findIndex(t => t.id === result.id);

        if (index !== -1) {
          this.listOfTasks[index] = result;
          this.listOfTasks = [...this.listOfTasks];
        }
      }
    });
  }
}
