import { ObjectValues } from './objectValues';

export const userStates = {
  LogIn: 'log in',
  SignUp: 'sign up',
  LoggedIn: 'logged in'
} as const;


export type userState = ObjectValues<typeof userStates>;

