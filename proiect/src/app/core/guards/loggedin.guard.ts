import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export function loggedInguard(): CanActivateFn {
    return () => {
        const router = inject(Router);
        if (localStorage.getItem("userToken") || sessionStorage.getItem("userToken")) {
            router.navigateByUrl("/");
            return false;
        }
        else {
            return true;
        }

    }
}