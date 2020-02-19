import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { BudgetItemModel } from 'src/app/models/BudgetItemModel';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
   constructor(public firestore: AngularFirestore) {
  }

  //function to add Data to Fixed Expense 
  //Id is being passed to database now but in future it will be generated automatically
   public createFixedExpense(name: string, value:number, badge:string): Promise<void> {
     const autoId = this.firestore.createId();

     var result = this.firestore.doc(`FixedExpense/${autoId}`).set({
      autoId,
       name,
       value,
       badge
     });
     return result;
   } 

   //function to add Variable Expense
   //Id is being passed to database now but in future it will be generated automatically
   public createVariableExpense(name: string, value:number, badge:string): Promise<void> {
    const autoId = this.firestore.createId();
     var result = this.firestore.doc(`VariableExpense/${autoId}`).set({
      autoId,
       name,
       value,
       badge
     });
     return result;
   } 

   //function to add Income
   //Id is being passed to database now but in future it will be generated automatically
   public createIncome(name: string, value:number, badge:string): Promise<void> {
    const autoId = this.firestore.createId();
     var result = this.firestore.doc(`Income/${autoId}`).set({
      autoId,
       name,
       value,
       badge
     });
     return result;
   }

    //function to delete an item from the passed collection
   public deleteItem(collection: string, id: string) {
       // console.log(`ITEM ID ${id}`)
       this.firestore.doc(collection + '/' + id).delete();
   }

   //function to receive Fixed Expense
   getFixedExpenseList(): AngularFirestoreCollection<BudgetItemModel> {
      return this.firestore.collection(`FixedExpense`);
    }

  //function to receive Variable Expense
  getVariableExpenseList(): AngularFirestoreCollection<BudgetItemModel> {
    return this.firestore.collection(`VariableExpense`);
  }

 //function to receive Income
  getIncomeList(): AngularFirestoreCollection<BudgetItemModel> {
    return this.firestore.collection(`Income`);
  }

}

