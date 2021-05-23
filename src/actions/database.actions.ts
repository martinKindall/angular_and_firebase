import {createAction, props} from '@ngrx/store';
import {Temperature} from '../interfaces/Temperature';

export const temperatureUpdate = createAction(
  'Temperature Update',
  props<Temperature>()
);

export const initDBConnection = createAction('Database Init');
