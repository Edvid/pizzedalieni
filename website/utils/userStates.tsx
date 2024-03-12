import { ObjectValues } from './objectValues';

const userStates = {
  LogIn: 'log in',
  SignUp: 'sign up',
  LoggedIn: 'logged in'
} as const;


export type userState = ObjectValues<typeof userStates>;

