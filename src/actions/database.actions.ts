import {createAction, props} from '@ngrx/store';
import {Temperature} from '../interfaces/Temperature';

export const readTemperatureUpdate = createAction(
  'Temperature Read',
  props<Temperature>()
);

export const saveTemperatureUpdate = createAction(
    'Temperature Save',
    props<Temperature>()
);
