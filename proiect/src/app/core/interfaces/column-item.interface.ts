import { Task } from "./task.interface"
import {
  NzTableSortFn,
  NzTableSortOrder
} from 'ng-zorro-antd/table';


export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Task> | null;
  sortDirections: NzTableSortOrder[];
}