import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire';

import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {authReducer} from '../reducers/auth.reducers';
import {AuthEffects} from '../effects/auth.effects';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {DatabaseEffects} from '../effects/database.effects';
import {temperatureReducer} from '../reducers/database.reducers';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'https://www.google.com',
  privacyPolicyUrl: 'https://www.google.com',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    StoreModule.forRoot({
      authState: authReducer,
      temperatureState: temperatureReducer
    }),
    EffectsModule.forRoot([AuthEffects, DatabaseEffects])
  ],
  providers: [
    {provide: 'AuthInterface', useClass: AngularFireAuth}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
