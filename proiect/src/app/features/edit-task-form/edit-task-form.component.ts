import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Task } from '../../core/interfaces/task.interface';
import { Status } from '../../core/enums/status.enum';
import { Priority } from '../../core/enums/priority.enum';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
  ],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.scss',
})
export class EditTaskFormComponent {
  task!: Task;
  taskForm!: FormGroup;

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

  constructor(private modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.task = this.modalRef.getConfig().nzData?.task;

    this.taskForm = new FormGroup({
      id: new FormControl(this.task.id ?? '', {
        validators: [Validators.required],
      }),
      title: new FormControl(this.task.title ?? '', {
        validators: [Validators.required],
      }),
      description: new FormControl(this.task.description ?? '', {
        validators: [Validators.required],
      }),
      due_date: new FormControl(this.task.due_date ?? '', {
        validators: [Validators.required],
      }),
      status: new FormControl(this.task.status ?? '', {
        validators: [Validators.required],
      }),
      priority: new FormControl(this.task.priority ?? '', {
        validators: [Validators.required],
      }),
    });
  }

  save(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = { ...this.taskForm.value };
      this.modalRef.close(updatedTask);
    }
  }

  cancel(): void {
    this.modalRef.destroy();
  }
}
