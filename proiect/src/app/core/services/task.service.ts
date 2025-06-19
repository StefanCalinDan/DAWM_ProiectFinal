import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { convertToTasks } from '../utils/task-converter';
import tasks from '../data/tasks.json';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  listOfTasks = signal<Task[]>(convertToTasks(tasks));
  closestTask = signal<Task | null>(this.calculateClosestTask());

  getListOfTasks(): Task[] {
    return this.listOfTasks();
  }

  getListSize(): number {
    return this.listOfTasks().length;
  }

  deleteTaskById(taskId: number) {
    const updatedList = this.listOfTasks().filter((task) => task.id !== taskId);
    this.listOfTasks.set(updatedList);
    this.updateClosestTask();
  }

  updateListOfTasks(newTask: Task) {
    this.listOfTasks.update((tasks) => [...tasks, newTask]);
    this.updateClosestTask();
  }

  private calculateClosestTask(referenceDate: Date = new Date()): Task | null {
    const upcomingTasks = this.listOfTasks().filter((task) => {
      if (!task.due_date) return false;
      const taskDate = new Date(task.due_date);
      return taskDate >= referenceDate;
    });

    if (upcomingTasks.length === 0) {
      return null;
    }

    upcomingTasks.sort((a, b) => {
      const aDate = new Date(a.due_date);
      const bDate = new Date(b.due_date);
      return aDate.getTime() - bDate.getTime();
    });

    return upcomingTasks[0];
  }

  private updateClosestTask() {
    const closest = this.calculateClosestTask();
    this.closestTask.set(closest);
  }
}
