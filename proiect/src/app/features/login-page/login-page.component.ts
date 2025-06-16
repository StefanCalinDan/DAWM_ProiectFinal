import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { User } from '../../core/interfaces/user.interface';
import { RegisterFormComponent } from "../register-form/register-form.component";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../core/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent, NzButtonModule, NzSpinModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  showRegister: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService, private notificationService: NzNotificationService, private router: Router) { }
  onLogin(data: User) {

    this.loading = true;
    this.authService.login({ email: data.email, password: data.password }).subscribe({
      next: (response) => {

        this.authService.setToken(response.token);
        if (data.rememberMe)
          localStorage.setItem("userToken", response.token);
        else
          sessionStorage.setItem("userToken", response.token);

        this.notificationService.success("Success", "Login success");
        this.router.navigateByUrl("/");
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error("Error", error?.error?.error || "Login failed");
        this.authService.logout();
        this.loading = false;
      }
    });
  }

  onRegister(data: User) {

    data.email = "eve.holt@reqres.in"
    this.loading = true;
    this.authService.register({ email: data.email, password: data.password }).subscribe({
      next: (response) => {

        this.authService.setToken(response.token);
        if (data.rememberMe)
          localStorage.setItem("userToken", response.token);
        else
          sessionStorage.setItem("userToken", response.token);

        this.notificationService.success("Success", "Login success");
        this.router.navigateByUrl("/");
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error("Error", error?.error?.error || "Login failed");
        this.authService.logout();
        this.loading = false;
      }
    });
  }

  toggleForm() {
    this.showRegister = !this.showRegister;
  }

}
