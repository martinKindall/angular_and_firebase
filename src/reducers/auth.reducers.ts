import {Action, createReducer, on} from '@ngrx/store';
import {authStatusUpdate} from '../actions/auth.actions';

export const initialAuthState = false;

const myAuthReducer = createReducer(
  initialAuthState,
  on(authStatusUpdate, (state: boolean, props: {state: boolean}) => {
    return props.state;
  })
);

export function authReducer(state: boolean, action: Action): boolean {
  return myAuthReducer(state, action);
}
