import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!JSON.parse(localStorage.getItem('logado') || 'false')) {
      this.router.navigate(['autenticacao']);
      return false;
    }
    
    return true;

  }

}
