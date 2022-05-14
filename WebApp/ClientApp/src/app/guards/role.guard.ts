import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {MsalService} from "@azure/msal-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: MsalService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    if (!this.authService.instance.getAllAccounts()[0]?.idTokenClaims?.roles) {
      this.router.navigate(['/','unauthorized']);
      return false;
    } else if (!this.authService.instance.getAllAccounts()[0]?.idTokenClaims?.roles?.includes(expectedRole)) {
      this.router.navigate(['/','unauthorized']);
      return false;
    }

    return true;
  }
}
