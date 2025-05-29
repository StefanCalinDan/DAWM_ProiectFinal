import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private listOfTasks: Task[] = [];

  getListOfTasks(): Task[] {
    return this.listOfTasks;
  }
}