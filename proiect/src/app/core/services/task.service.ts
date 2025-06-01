import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { convertToTasks } from '../utils/task-converter';
import tasks from "../data/tasks.json"
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private listOfTasks: Task[] = convertToTasks(tasks);
  tasksChanged = new BehaviorSubject<Task[]>(this.listOfTasks);

  getListOfTasks(): Task[] {
    return this.listOfTasks;
  }
  
  getListSize(): number {
    return this.listOfTasks.length;
  }

  deleteTaskById(taskId: number) {
    this.listOfTasks = this.listOfTasks.filter(task => task.id !== taskId);
    this.tasksChanged.next(this.listOfTasks);
  }

  updateListOfTasks(newTask: Task) {
    this.listOfTasks = [...this.listOfTasks, newTask];
    this.tasksChanged.next(this.listOfTasks);
  }
}