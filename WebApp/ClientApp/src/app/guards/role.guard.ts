import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {MsalService} from "@azure/msal-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: MsalService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoles: string[] = route.data['expectedRole'];

    //if no roles on user exist
    if (!this.authService.instance.getAllAccounts()[0]?.idTokenClaims?.roles) {
      this.router.navigate(['/','unauthorized']);
      return false;
    }

    //if roles on user exists, check if expectedRoles exists
    let userRoles = this.authService.instance.getAllAccounts()[0]?.idTokenClaims?.roles;
    if(userRoles){
      for(let i = 0; i < expectedRoles.length; i++){
        if(userRoles.includes(expectedRoles[i])){
          return true;
        }
      }
    }
    this.router.navigate(['/','unauthorized']);
    return false;
  }
}
