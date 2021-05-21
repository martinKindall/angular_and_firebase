import {Injectable} from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import {AngularFireAuth} from '@angular/fire/auth';
import {catchError, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private actions$: Actions,
    ) {
  }

  updateAuthState$ = createEffect(() => this.angularFireAuth.authState.pipe(
    map((authState) => ({type: 'Auth Status-Update', state: !!authState})),
    catchError(() => EMPTY)
  ));
}
