import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, take, tap} from 'rxjs/operators';
import {Temperature} from '../interfaces/Temperature';
import {EMPTY, Observable, Subject} from 'rxjs';
import {MyStore} from '../interfaces/MyStore';


@Injectable()
export class DatabaseEffects {
  updateTemperature$: Observable<Temperature>;
  temperatureDBInstance$: Subject<any>;

  constructor(
    private database: AngularFireDatabase,
    private actions$: Actions) {
    this.temperatureDBInstance$ = new Subject();
    this.initDbEffect();
  }

  authEvent = this.actions$.pipe(
    ofType('Auth Status-Update'),
    filter((authState: MyStore) => {
      return authState.authState;
    }),
    take(1),
    tap((authState: MyStore) => {
      if (authState.authState) {
        this.initDb();
      }
    }),
    catchError(() => EMPTY)
  ).subscribe();

  saveTemperatureEvent = this.actions$.pipe(
    ofType('Temperature Save'),
    tap(() => console.log('I was here!')),
    mergeMap((temperature: Temperature) => {
      return this.temperatureDBInstance$.pipe(
          map((dbInstance) => {
            return dbInstance.set(temperature);
          })
      );
    }),
    catchError((error) => {
      console.error(error);
      return EMPTY;
    })
  ).subscribe();

  private initDbEffect(): void {
    this.updateTemperature$ = createEffect(() => {
      return this.temperatureDBInstance$.pipe(
        mergeMap((dbInstance) => {
          return dbInstance.valueChanges();
        }),
        map((temperature: Temperature) => ({
          type: 'Temperature Read',
          ...temperature
        })),
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
      );
    });
  }

  private initDb(): void {
    this.temperatureDBInstance$.next(
      this.database.object('temperature/randomuid'));
  }
}
