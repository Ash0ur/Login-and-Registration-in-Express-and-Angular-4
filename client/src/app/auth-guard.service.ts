import { Injectable,OnInit } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private http:HttpClient,private router:Router){}

    canActivate():boolean{
        console.log('AuthGuard Can Activate called');
        if(localStorage.getItem('LoggedIn'))
            return true;
        else    
            return false;
        
    }
 
}