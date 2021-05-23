import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {createEffect} from '@ngrx/effects';
import {catchError, map} from 'rxjs/operators';
import {Temperature} from '../interfaces/Temperature';
import {EMPTY} from 'rxjs';


@Injectable()
export class DatabaseEffects {

  constructor(private database: AngularFireDatabase) {
  }

  updateTemperature$ = createEffect(() =>
    this.database.object('temperature/randomuid').valueChanges().pipe(
      map((temperature: Temperature) => ({
        type: 'Temperature Update',
        ...temperature
      })),
      catchError(() => EMPTY)
    ));
}
