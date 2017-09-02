import {Injectable} from '@angular/core';
import {User} from '../../constructor/user';
import {Status} from '../../enum/status';

@Injectable()
export class UserMapper {
    public mapResponseToUser(response: any): User {
        const user = new User();
        user.id = response.id;
        if (response.incommingStatus === 0) {
            user.incommingStatus = Status.INACTIVE;
        }
        return user;
    }
}
