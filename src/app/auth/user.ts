import {Specialty} from '../admin-create-specialty/specialty';

export class User {
  username: string;
  name: string;
  email: string;
  password: string;
  id: number;
  role: string;
  isActive: boolean;
  isTeacher: boolean;
  course: number;
  specialty: string;
  mark: number;
}
