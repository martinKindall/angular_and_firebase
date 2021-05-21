import {Inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EMPTY, from} from 'rxjs';
import {MyAuthProvider} from '../interfaces/MyAuthProvider';

@Injectable()
export class AuthEffects {

  constructor(
    @Inject('AuthInterface') private authProvider: MyAuthProvider,
    private actions$: Actions,
    ) {
  }

  updateAuthState$ = createEffect(() => this.authProvider.authState.pipe(
    map((authState) => ({
      type: 'Auth Status-Update',
      authState: !!authState,
      email: authState?.email})),
    catchError(() => EMPTY)
  ));

  logout = this.actions$.pipe(
    ofType('Auth Logout'),
    mergeMap(() => from(this.authProvider.signOut().then())),
    catchError(() => EMPTY)
  ).subscribe();
}
