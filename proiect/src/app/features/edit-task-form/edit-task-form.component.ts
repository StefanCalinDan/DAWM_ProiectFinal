import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import  { Task } from "../../core/interfaces/task.interface"

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.scss'
})
export class EditTaskFormComponent {
  task!: Task;
  taskForm!: FormGroup;

  constructor(private modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.task = this.modalRef.getConfig().nzData?.task;

    this.taskForm = new FormGroup({
      title: new FormControl(this.task.title ?? '', { validators: [Validators.required] }),
      description: new FormControl(this.task.description ?? '', { validators: [Validators.required] }),
      due_date: new FormControl(this.task.due_date ?? '', { validators: [Validators.required] }),
      status: new FormControl(this.task.status ?? '', { validators: [Validators.required] }),
      priority: new FormControl(this.task.priority ?? '', { validators: [Validators.required] }),
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
