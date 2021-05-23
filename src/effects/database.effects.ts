import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable()
export class DatabaseEffects {

  constructor(private database: AngularFireDatabase) {
    database.object('temperature/randomuid').valueChanges().subscribe((temp) => {
      console.log(temp);
    });
  }
}
