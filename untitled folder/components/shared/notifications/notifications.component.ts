import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UserService } from '../../../services';

import { User, RelationshipAction } from '../../../common/models';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    private incommingRequestsSubscription: Subscription;
    private incommingRequests: User[];
    private isLoading: boolean;

    constructor(
        private userService: UserService) { }

    private getIncommingRequests() {
        this.isLoading = true;
        this.incommingRequestsSubscription = this.userService.getIncommingRequests()
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(incommingRequests => {
                this.incommingRequests = incommingRequests;
            });
    }

    private confirmIncommingRequest(user: User) {
        const indexToRemove = this.incommingRequests.findIndex(e => e.id === user.id);
        this.incommingRequests.splice(indexToRemove, 1);

        this.userService.modifyRelationship(user.id, {
            action: RelationshipAction.Approve
        }).subscribe(userResult => {
        }, error => { });
    }

    private removeIncommingRequest(user: User) {
        const indexToRemove = this.incommingRequests.findIndex(e => e.id === user.id);
        this.incommingRequests.splice(indexToRemove, 1);

        this.userService.modifyRelationship(user.id, {
            action: RelationshipAction.Reject
        }).subscribe(userResult => {
        }, error => { });
    }

    public ngOnInit() {
        this.getIncommingRequests();
    }

    public ngOnDestroy(): void {
        this.incommingRequestsSubscription.unsubscribe();
    }
}