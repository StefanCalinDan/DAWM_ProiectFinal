import { Status } from "../enums/status.enum"
import { Priority } from "../enums/priority.enum"

export interface Task
{
    id : number
    title: string
    description: string
    due_date: Date
    status: Status
    priority: Priority
}