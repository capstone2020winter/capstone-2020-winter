import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {BudgetItemModel} from 'src/app/models/BudgetItemModel';
import {DateLogic} from 'src/app/models/DateLogic';
import {FixedBudgetItemModel} from 'src/app/models/FixedBudgetItemModel';
import {AuthService} from '../auth/auth.service';
import { DatePipe } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    dateLogic: DateLogic;

    constructor(public firestore: AngularFirestore, public authService: AuthService, public datePipe: DatePipe) {
        this.dateLogic = new DateLogic()
    }

    //function to add Data to collection 
   public createFixedCollection(collection: string, name: string, value:number, description: string, startDate: string, badge: string): Promise<void> {
    const autoId = this.firestore.createId();
    const month = this.dateLogic.getMonth(startDate)
    const year = this.dateLogic.getYear(startDate)
    var result = this.firestore.doc(`users/${this.authService.getUserId()}/${year}/${month}/${collection}/${autoId}`).set({
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
   const month = this.dateLogic.getMonth(date)
   const year = this.dateLogic.getYear(date)
   var result = this.firestore.doc(`users/${this.authService.getUserId()}/${year}/${month}/${collection}/${autoId}`).set({
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
        let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
        const month = this.dateLogic.getMonth(currentDate)
        const year = this.dateLogic.getYear(currentDate)
        this.firestore.doc('users/' + this.authService.getUserId() + '/' + year + '/' + month + '/' +  collection + '/' + id).delete();
    }

    // function to receive current month data from the database
    getCurrentVariableList(collection: string): AngularFirestoreCollection<BudgetItemModel> {
        let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
        const month = this.dateLogic.getMonth(currentDate)
        const year = this.dateLogic.getYear(currentDate)
        return this.firestore.collection(`users/${this.authService.getUserId()}/${year}/${month}/${collection}`);
    }

    // function to receive current month data from the database
    getCurrentFixedList(collection: string): AngularFirestoreCollection<FixedBudgetItemModel> {
        let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
        const month = this.dateLogic.getMonth(currentDate)
        const year = this.dateLogic.getYear(currentDate)
        return this.firestore.collection(`users/${this.authService.getUserId()}/${year}/${month}/${collection}`);
    }

    // function to receive data from the database according to collection, year, month
    getVariableList(collection: string, year: number, month: number): AngularFirestoreCollection<BudgetItemModel> {
        return this.firestore.collection(`users/${this.authService.getUserId()}/${year}/${month}/${collection}`);
    }

    // function to receive data from the database according to collection, year, month
    getFixedList(collection: string, year: number, month: number): AngularFirestoreCollection<FixedBudgetItemModel> {
        return this.firestore.collection(`users/${this.authService.getUserId()}/${year}/${month}/${collection}`);
    }

    
}

