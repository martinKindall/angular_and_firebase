import {Action, createReducer, on} from '@ngrx/store';
import {authLogout, authStatusUpdate} from '../actions/auth.actions';
import {MyStore} from '../interfaces/MyStore';

export const initialAuthState: MyStore = {authState: false, email: undefined};

const myAuthReducer = createReducer(
  initialAuthState,
  on(authStatusUpdate, (state: MyStore, props: MyStore) => {
    return props;
  })
);

export function authReducer(state: MyStore, action: Action): MyStore {
  return myAuthReducer(state, action);
}
