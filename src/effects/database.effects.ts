import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Temperature} from '../interfaces/Temperature';
import {EMPTY, Observable, Subject} from 'rxjs';


@Injectable()
export class DatabaseEffects {
  updateTemperature$: Observable<Temperature>;
  temperatureDBInstance$: Subject<any>;

  constructor(
    private database: AngularFireDatabase,
    private actions$: Actions) {
    this.temperatureDBInstance$ = new Subject();
    this.initDbEffect();
    this.initDb();
  }

  reloadEvent = this.actions$.pipe(
    ofType('Database Init'),
    tap(() => {
      this.initDb();
      console.log('Initiating Database again');
    }),
    catchError(() => EMPTY)
  ).subscribe();

  private initDbEffect(): void {
    console.log('connecting to DB');
    // this.updateTemperature$ = createEffect(() => {
    //     console.log('creating effect');
    //     return this.temperatureDBInstance$.pipe(
    //     tap(() => console.log('I was called!')),
    //     map((temperature: Temperature) => ({
    //       type: 'Temperature Update',
    //       ...temperature
    //     })),
    //     catchError((error) => {
    //       console.error(error);
    //       return EMPTY;
    //     })
    //   );
    // });
    this.updateTemperature$ = createEffect(() => {
      console.log('creating effect');
      return this.temperatureDBInstance$.pipe(
        tap(() => console.log('I was called!')),
        mergeMap((dbInstance) => {
          return dbInstance.valueChanges();
        }),
        map((temperature: Temperature) => ({
          type: 'Temperature Update',
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
    console.log('creating initDB');
    this.temperatureDBInstance$.next(
      this.database.object('temperature/randomuid'));
  }
}
