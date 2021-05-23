import {Component} from '@angular/core';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {MyStore} from '../interfaces/MyStore';
import {authLogout} from '../actions/auth.actions';
import {Temperature} from '../interfaces/Temperature';
import {initDBConnection} from '../actions/database.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated$: Observable<boolean>;
  email$: Observable<string | undefined>;
  temperature$: Observable<Temperature>;

  constructor(private store: Store<{authState: MyStore, temperatureState: Temperature}>) {
    this.isAuthenticated$ = store.select(({authState}) => {
      return authState.authState;
    });
    this.email$ = store.select(({authState}) => {
      return authState.email;
    });
    this.temperature$ = store.select(({temperatureState}) => {
      return temperatureState;
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult): void {
    console.log('Hallo');
    this.store.dispatch(initDBConnection());
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
