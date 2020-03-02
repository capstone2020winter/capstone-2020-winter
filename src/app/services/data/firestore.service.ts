import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {BudgetItemModel} from 'src/app/models/BudgetItemModel';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(public firestore: AngularFirestore) {
    }

    // function to add Data to collection
    public create(userID: string, collection: string, name: string, value: number, badge: string): Promise<void> {
        const autoId = this.firestore.createId();
        console.log(userID);
        var result = this.firestore.doc(`users/${userID}/${collection}/${autoId}`).set({
            autoId,
            name,
            value,
            badge
        });
        return result;
    }

    // function to delete an item from the passed collection
    public deleteItem(userID: string, collection: string, id: string) {
        this.firestore.doc('users/' + userID + collection + '/' + id).delete();
    }

    // function to receive data from the database according to collection
    getList(userID: string, collection: string): AngularFirestoreCollection<BudgetItemModel> {
        return this.firestore.collection(`users/${userID}/${collection}`);
    }

}

