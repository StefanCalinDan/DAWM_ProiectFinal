import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "tasks",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () =>
            import("./features/login-page/login-page.component").then
                (
                    (component) => component.LoginPageComponent
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
