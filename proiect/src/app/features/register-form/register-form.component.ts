import { Component, OnInit, output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { User } from '../../core/interfaces/user.interface';
import { passwordValidator } from '../../core/validators/password.validator';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [NzCheckboxModule,NzFormModule, NzButtonModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm!: FormGroup;

  readonly userData = output<User>();

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, passwordValidator, Validators.minLength(6)],
      }),
      rememberMe: new FormControl('', {})
    });
  }
  onSubmit(): void {

    if (this.registerForm.valid) {
      this.userData.emit(this.registerForm.value);
    }
    else {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }


  }
}
