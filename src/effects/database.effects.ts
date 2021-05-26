import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, take, tap} from 'rxjs/operators';
import {Temperature} from '../interfaces/Temperature';
import {EMPTY, Observable, Subject, combineLatest, from} from 'rxjs';
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
    this.initTemperatureSaveSubscription();
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

  private initTemperatureSaveSubscription(): void {
    const tempObservable: Observable<Temperature> = this.actions$.pipe(
     ofType('Temperature Save')
    );
    combineLatest([tempObservable, this.temperatureDBInstance$]).pipe(
        mergeMap((values) => {
          return from(values[1].set(values[0]).then());
        }),
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
    ).subscribe();
  }
}
