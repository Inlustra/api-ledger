import { DatabaseModel } from '../model';
import ModelInstance = waterline.ModelInstance;

export interface User extends ModelInstance {
    firstName: string
    lastName: string
}

export class UserModel extends DatabaseModel<User> {

    model = {
        identity: 'user',
        connection: 'default',
        attributes: {
            firstName: 'string',
            lastName: 'string',
        }
    };

    getByName(string) {
        return this.findOne().where({firstName: string});
    }

}
