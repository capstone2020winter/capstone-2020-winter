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
   public createFixedExpense(id: string, name: string, value:number, badge:string): Promise<void> {
    console.log("in createFixedExpense firestore")
    // const id = this.firestore.createId();

     var result = this.firestore.doc(`FixedExpense/${id}`).set({
       id,
       name,
       value,
       badge
     });
     return result;
   } 

   //function to add Variable Expense
   //Id is being passed to database now but in future it will be generated automatically
   public createVariableExpense(id: string, name: string, value:number, badge:string): Promise<void> {
    console.log("in createVariableExpense firestore")

     var result = this.firestore.doc(`VariableExpense/${id}`).set({
       id,
       name,
       value,
       badge
     });
     return result;
   } 

   //function to add Income
   //Id is being passed to database now but in future it will be generated automatically
   public createIncome(id: string, name: string, value:number, badge:string): Promise<void> {
    console.log("in createVariableExpense firestore")

     var result = this.firestore.doc(`Income/${id}`).set({
       id,
       name,
       value,
       badge
     });
     return result;
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

