import {createAction, props} from '@ngrx/store';

export const authStatusUpdate = createAction(
  'Auth Status-Update',
  props<{state: boolean}>()
);
