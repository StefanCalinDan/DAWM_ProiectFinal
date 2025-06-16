import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedInguard } from './core/guards/loggedin.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "login",
        canActivate: [loggedInguard()],
        loadComponent: () =>
            import("./features/login-page/login-page.component").then
                (
                    (component) => component.LoginPageComponent
                )
    },
    {
        path: "dashboard",
        canActivate: [authGuard()],
        loadComponent: () =>
            import("./features/dashboard/dashboard.component").then
                (
                    (component) => component.DashboardComponent
                )
    },
    {
        path: "tasks",
        canActivate: [authGuard()],
        loadComponent: () =>
            import("./features/task-table/task-table.component").then
                (
                    (component) => component.TaskTableComponent
                )
    }
];
