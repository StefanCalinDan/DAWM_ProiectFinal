import { Component, OnInit } from '@angular/core';
import { Task } from "../../core/interfaces/task.interface"
import { TaskService } from '../../core/services/task.service';
import { ColumnService } from '../../core/services/column.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    NzTableModule
],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent implements OnInit {
  listOfTasks: Task[] = []
  listOfColumns: any[] = []

  constructor(private taskService: TaskService, private columnService: ColumnService) {}

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
}
