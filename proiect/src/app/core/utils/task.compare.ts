import { Task } from "../interfaces/task.interface";

export function taskComparatorASC(a: Task, b: Task): number {
  if (a.due_date < b.due_date) return -1;
  if (a.due_date > b.due_date) return 1;

  if (a.priority > b.priority) return -1; 
  if (a.priority < b.priority) return 1;

  return 0;
}

export function taskComparatorDESC(a: Task, b: Task): number {
  if (a.due_date > b.due_date) return -1;
  if (a.due_date < b.due_date) return 1;

  if (a.priority > b.priority) return -1;
  if (a.priority < b.priority) return 1;

  return 0;
}