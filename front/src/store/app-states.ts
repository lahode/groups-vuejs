import { User } from '../models/user.model';

export interface UserStateI {
    user: User;
}

export const state: UserStateI = {
    user: null
};
