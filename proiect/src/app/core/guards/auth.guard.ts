import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export function authGuard():CanActivateFn{
    return ()=>{
        const router = inject(Router);
        if(localStorage.getItem("userToken") || sessionStorage.getItem("userToken")){
            return true;
        }
        else
            router.navigateByUrl("/login")
            return false;

        }
}