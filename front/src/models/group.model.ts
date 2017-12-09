import { User } from './user.model';

export class Group {
    constructor(public _id: string,
                public name: string,
                public access: number,
                public pub: boolean,
                public owner: User | string,
                public description?: string,
                public url?: string,
                public members?: User[],
                public visibility?: boolean) {}
}
