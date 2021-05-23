import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
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
    tap((authState: MyStore) => {
      if (authState.authState) {
        console.log('initiating through auth');
        this.initDb();
      }
    }),
    catchError(() => EMPTY)
  ).subscribe();

  reloadEvent = this.actions$.pipe(
    ofType('Database Init'),
    tap(() => {
      this.initDb();
      console.log('Initiating Database again');
    }),
    catchError(() => EMPTY)
  ).subscribe();

  private initDbEffect(): void {
    this.updateTemperature$ = createEffect(() => {
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
