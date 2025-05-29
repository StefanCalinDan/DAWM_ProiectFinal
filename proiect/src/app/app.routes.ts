import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "tasks",
        pathMatch: "full"
    },
    {
        path: "tasks",
        loadComponent: () =>
            import("./features/task-table/task-table.component").then
        (
            (component) => component.TaskTableComponent
        )
    }
];
