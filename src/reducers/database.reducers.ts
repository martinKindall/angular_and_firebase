import {Temperature} from '../interfaces/Temperature';
import {Action, createReducer, on} from '@ngrx/store';
import {temperatureUpdate} from '../actions/database.actions';

export const initialTemperatureState: Temperature = {value: 0, created_at: ''};

const myTemperatureReducer = createReducer(
  initialTemperatureState,
  on(temperatureUpdate, (state: Temperature, props: Temperature) => {
    return props;
  })
);

export function temperatureReducer(state: Temperature, action: Action): Temperature {
  return myTemperatureReducer(state, action);
}
