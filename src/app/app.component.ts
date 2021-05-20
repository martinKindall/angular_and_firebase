import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  email: string;
  subscription: Subscription;

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.subscription = this.angularFireAuth.authState.subscribe((response) => {
      this.isAuthenticated = !!response;
      this.email = response?.email;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
    this.angularFireAuth.signOut()
      .then(() => {
        console.log('loged out');
      });
  }
}
