import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AngularFireAuth} from '@angular/fire/auth';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EMPTY, from} from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private actions$: Actions,
    ) {
  }

  updateAuthState$ = createEffect(() => this.angularFireAuth.authState.pipe(
    map((authState) => ({
      type: 'Auth Status-Update',
      authState: !!authState,
      email: authState?.email})),
    catchError(() => EMPTY)
  ));

  logout = this.actions$.pipe(
    ofType('Auth Logout'),
    mergeMap(() => from(this.angularFireAuth.signOut().then())),
    catchError(() => EMPTY)
  ).subscribe();
}
