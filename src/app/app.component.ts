import {Component} from '@angular/core';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {MyStore} from '../interfaces/MyStore';
import {authLogout} from '../actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated$: Observable<boolean>;
  email$: Observable<string | undefined>;

  constructor(private store: Store<{authState: MyStore}>) {
    this.isAuthenticated$ = store.select(({authState}) => {
      return authState.authState;
    });
    this.email$ = store.select(({authState}) => {
      return authState.email;
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult): void {
    console.log('Hallo');
  }

  errorCallback(errorData: FirebaseUISignInFailure): void {
    console.log('Einloggen war nicht erfolgreich.');
  }

  uiShownCallback(): void {
    console.log('Ui shown');
  }

  private logout(): void {
    this.store.dispatch(authLogout());
  }
}
