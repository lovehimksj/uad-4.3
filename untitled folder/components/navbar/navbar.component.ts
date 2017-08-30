import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserProvider } from '../../infrastructure/providers';
import { AccountService } from '../../services/account.service';
import { CurrentUser } from '../../common/models';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;
    private currentUser: CurrentUser;
    private renderToolbar: boolean;
    @Output() openNotificationsEvent = new EventEmitter<boolean>();

    constructor(
        private userProvider: UserProvider,
        private accountService: AccountService,
        private router: Router) {
    }

    public openNotifications() {
        this.openNotificationsEvent.emit(true);
    }

    public ngOnInit(): void {
        this.router.events.subscribe((event: any): void => {
            this.navigationInterceptor(event);
        });

        this.currentUserSubscription = this.userProvider
            .getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    private navigationInterceptor(event): void {
        if (event instanceof NavigationEnd) {
            this.renderToolbar = this.router.url !== '/signin' && this.router.url !== '/account/create';
        }
    }
}