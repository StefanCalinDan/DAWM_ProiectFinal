import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, throwError, catchError, map } from "rxjs";
import { Router } from "@angular/router";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {

    private userToken: string = "";

    constructor(private httpClient: HttpClient, private router: Router) {
        //get saved user token
        const savedToken = sessionStorage.getItem("userToken");
        if (savedToken) {
            this.userToken = savedToken;
        }
    }

    getToken(): string {
        return this.userToken;
    }
    setToken(token: string): void {
        this.userToken = token;
    }

    login(payload: LoginPayload): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>("https://reqres.in/api/login", payload, { headers: { "x-api-key": "reqres-free-v1" } })
            .pipe(
                tap(response => {

                    this.userToken = response.token;
                    sessionStorage.setItem("userToken", response.token);
                }),
                catchError(error => {
                    return throwError(() => error);
                })
            );
    }

    register(payload: LoginPayload): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>("https://reqres.in/api/register", payload, { headers: { "x-api-key": "reqres-free-v1" } })
            .pipe(
                tap(response => {

                    this.userToken = response.token;
                    sessionStorage.setItem("userToken", response.token);
                }),
                catchError(error => {
                    return throwError(() => error);
                })
            );
    }

    logout() {
        console.log("Logging out...")
        this.userToken = "";
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigateByUrl("/");
    }
}
