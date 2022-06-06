import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // FUTURE REFERENCE
  //   if (this.storageService.isLoggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login'], {
  //       queryParams: {
  //         return: state.url
  //       }
  //     });
  //   return false;
  // }

  if (this.storageService.isLoggedIn().subscribe(data => data)) {
    return true;
  } else {
    this.router.navigate(['/login'], {
      queryParams: {
        return: state.url
      }
    });
  return false;
}
  
    }}
