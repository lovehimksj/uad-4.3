import { Pipe, PipeTransform } from '@angular/core';

import { RelationshipStatus } from '../common/models/relationship-status';

@Pipe({
    name: 'relationshipAction'
})
export class RelationshipActionPipe implements PipeTransform {
    transform(relationshipStatus: RelationshipStatus): string {
        if (relationshipStatus === RelationshipStatus.None) {
            return 'follow';
        }

        if (relationshipStatus === RelationshipStatus.Following) {
            return 'following';
        }

        if (relationshipStatus === RelationshipStatus.Requested) {
            return 'requested';
        }

        return 'Unknown';
    }
}