import { DatabaseModel } from '../model';
import { UserModel } from './user';

export const User = new UserModel();

export const all: DatabaseModel<any>[] = [
    User
];