import { Role } from './role.enum';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: Role;
}
