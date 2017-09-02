import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../service/auth/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        if (this.authenticationService.getUserScope()) {
            // logged in so return true
            return true;
        } else {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            // not logged in so redirect to login page with the return url
        }
    }
}
