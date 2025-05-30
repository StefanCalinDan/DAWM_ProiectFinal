import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { convertToTasks } from '../utils/task-converter';
import tasks from "../data/tasks.json"

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private listOfTasks: Task[] = convertToTasks(tasks); 

  getListOfTasks(): Task[] {
    return this.listOfTasks;
  }

  deleteTaskById(taskId: number) {
    this.listOfTasks = this.listOfTasks.filter(task => task.id !== taskId);
  }
}