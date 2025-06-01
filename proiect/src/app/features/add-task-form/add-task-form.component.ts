import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Task } from "../../core/interfaces/task.interface";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Status } from '../../core/enums/status.enum';
import { Priority } from '../../core/enums/priority.enum';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [
      NzFormModule,
      ReactiveFormsModule,
      NzInputModule,
      NzButtonModule,
      NzSelectModule,
      NzDatePickerModule,
    ],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
})
export class AddTaskFormComponent {
  taskForm!: FormGroup;

  constructor(private taskService: TaskService) {}

  statusOptions = [
      { label: 'To do', value: Status.TO_DO },
      { label: 'In Progress', value: Status.IN_PROGRESS },
      { label: 'Completed', value: Status.COMPLETED }
    ];
  
    priorityOptions = [
      { label: 'Low', value: Priority.LOW },
      { label: 'Medium', value: Priority.MEDIUM },
      { label: 'High', value: Priority.HIGH }
    ];
  
    disablePastDates = (current: Date): boolean => {
      const today = new Date();
  
      today.setHours(0, 0, 0, 0);
      current.setHours(0, 0, 0, 0);
      return current < today;
    };

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required],
      }),
      description: new FormControl('', {
        validators: [Validators.required],
      }),
      due_date: new FormControl('', {
        validators: [Validators.required],
      }),
      status: new FormControl('', {
        validators: [Validators.required],
      }),
      priority: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  submitForm(): void {
    const newTask: Task = {
      id: this.taskService.getListSize() + 1,
      title: this.taskTitle.value,
      description: this.taskDescription.value,
      due_date: this.taskDueDate.value,
      status: this.taskStatus.value,
      priority: this.taskPriority.value
    };

    this.taskService.updateListOfTasks(newTask);
    this.resetForm();
  }

  resetForm(): void {
    this.taskForm.reset();
  }

  get taskTitle(): AbstractControl {
    return this.taskForm.controls["title"];
  }

  get taskDescription(): AbstractControl {
    return this.taskForm.controls["description"];
  }

  get taskDueDate(): AbstractControl {
    return this.taskForm.controls["due_date"];
  }

  get taskStatus(): AbstractControl {
    return this.taskForm.controls["status"];
  }

  get taskPriority(): AbstractControl {
    return this.taskForm.controls["priority"];
  }
}
