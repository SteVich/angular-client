import {User} from '../auth/user';

export class Group {
  id: number;
  name: string;
  members: number;
  students: User[];
  subjectId: number;
}
