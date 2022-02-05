import { UserType } from '@app/user/types/user.type';

export type ProfileType = Omit<
  UserType,
  'id' | 'email' | 'password' | 'articles' | 'favorites'
> & { following: boolean };
