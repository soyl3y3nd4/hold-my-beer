export type userRole = 'user' | 'admin';

export interface userDetail {
  avatar: string,
  birth_date: string,
  name: string,
  surname: string,
  role: userRole,
}