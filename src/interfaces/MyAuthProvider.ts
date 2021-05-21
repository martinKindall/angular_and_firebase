import {Observable} from 'rxjs';
import {User} from './User';

export interface MyAuthProvider {
  authState: Observable<User | null>;
  signOut: () => Promise<void>;
}
