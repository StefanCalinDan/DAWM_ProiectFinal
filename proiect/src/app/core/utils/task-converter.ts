import { Task } from '../interfaces/task.interface';
import { Status } from '../enums/status.enum';
import { Priority } from '../enums/priority.enum';

function convertToTask(raw: any): Task {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    due_date: new Date(raw.due_date),
    status: raw.status as Status,
    priority: raw.priority as Priority
  };
}

export function convertToTasks(rawList: any[]): Task[] {
  return rawList.map(convertToTask);
}