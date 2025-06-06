import { Component, OnInit, output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { User } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [NzCheckboxModule,NzFormModule, NzButtonModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  readonly userData = output<User>();

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
      rememberMe: new FormControl('',{})
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userData.emit(this.loginForm.value);
    }
    else{
       Object.values(this.loginForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
    }
  }
}