import { Injectable } from '@angular/core';
import { ColumnItem } from "../interfaces/column-item.interface"
import { Task } from "../interfaces/task.interface"

@Injectable({
  providedIn: 'root'
})

export class ColumnService {
  private listOfColumns: ColumnItem[] = [
    {
        name: 'Title',
        sortOrder: null,
        sortFn: (a: Task, b: Task) => a.title.localeCompare(b.title),
        sortDirections: ['ascend', 'descend', null]
    },
    {
        name: 'Description',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null]
    },
    {
        name: "Due date",
        sortOrder: null,
        sortFn: (a: Task, b: Task) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
        sortDirections: ['ascend', 'descend', null]
    },
    {
        name: "Status",
        sortOrder: null,
        sortFn: (a: Task, b: Task) => a.status - b.status,
        sortDirections: ['ascend', 'descend', null]
    },
    {
        name: "Priority",
        sortOrder: null,
        sortFn: (a: Task, b: Task) => a.priority - b.priority,
        sortDirections: ['ascend', 'descend', null]
    }
  ];

  getListOfColumns(): ColumnItem[] {
    return this.listOfColumns;
  }
}