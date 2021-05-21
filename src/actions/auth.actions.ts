import {createAction, props} from '@ngrx/store';
import {MyStore} from '../interfaces/MyStore';

export const authStatusUpdate = createAction(
  'Auth Status-Update',
  props<MyStore>()
);

export const authLogout = createAction('Auth Logout');
