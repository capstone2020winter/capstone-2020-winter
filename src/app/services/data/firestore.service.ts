import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {BudgetItemModel} from 'src/app/models/BudgetItemModel';
import {FixedBudgetItemModel} from 'src/app/models/FixedBudgetItemModel';
import {AuthService} from '../auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(public firestore: AngularFirestore, public authService: AuthService) {
    }

    //function to add Data to collection 
   public createFixedCollection(collection: string, name: string, value:number, description: string, startDate: string, badge: string): Promise<void> {
    const autoId = this.firestore.createId();

    var result = this.firestore.doc(`users/${this.authService.getUserId()}/${collection}/${autoId}`).set({
     autoId,
     name,
     value,
     description,
     startDate,
     badge
    });
    return result;
  } 

  //function to add Data to collection 
  public createVariableCollection(collection: string, name: string, value:number, description: string, date: string): Promise<void> {
   const autoId = this.firestore.createId();

   var result = this.firestore.doc(`users/${this.authService.getUserId()}/${collection}/${autoId}`).set({
    autoId,
    name,
    value,
    description,
    date
   });
   return result;
 } 
 
    // function to delete an item from the passed collection
    public deleteItem(collection: string, id: string) {
        this.firestore.doc('users/' + this.authService.getUserId() + '/' +  collection + '/' + id).delete();
    }

    // function to receive data from the database according to collection
    getVariableList(collection: string): AngularFirestoreCollection<BudgetItemModel> {
        return this.firestore.collection(`users/${this.authService.getUserId()}/${collection}`);
    }

    // function to receive data from the database according to collection
    getFixedList(collection: string): AngularFirestoreCollection<FixedBudgetItemModel> {
        return this.firestore.collection(`users/${this.authService.getUserId()}/${collection}`);
    }

    
}

