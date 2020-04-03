import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {DateLogic} from 'src/app/models/DateLogic';
import {AuthService} from '../auth/auth.service';
import { DatePipe } from '@angular/common';

import {BudgetItemModel} from 'src/app/models/BudgetItemModel';
import {FixedBudgetItemModel} from 'src/app/models/FixedBudgetItemModel';
import {FixedGlobalBudgetItemModel} from 'src/app/models/FixedGlobalBudgetItemModel';
import { take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    dateLogic: DateLogic;

    constructor(public firestore: AngularFirestore, public authService: AuthService, public datePipe: DatePipe) {
        this.dateLogic = new DateLogic()
    }

/**************************************************** Create *****************************************************/

    //function to add Data to collection 
   public createFixedCollection(collection: string, name: string, value:number, description: string, startDate: string, badge: string): Promise<void>
   {
    const autoId = this.firestore.createId();
    const lastAddDate = startDate;

    var result = this.firestore.doc(`users/${this.authService.getUserId()}/${collection}/${autoId}`).set({
     autoId,
     name,
     value,
     description,
     startDate,
     lastAddDate,
     badge
    });
    this.createNewFixedCollection(collection,name,value,description,startDate,badge,autoId)
    return result;
    }

    //function to add Data to collection 
   public createNewFixedCollection(collection: string, name: string, value:number, description: string, startDate: string, badge: string, parentId: string): Promise<void> 
   {
    const autoId = this.firestore.createId()
    const month = this.dateLogic.getMonth(startDate)
    const year = this.dateLogic.getYear(startDate)
    const isDeleted = false

    var result = this.firestore.doc(`users/${this.authService.getUserId()}/${year}/${month}/${collection}/${autoId}`).set({
     autoId,
     name,
     value,
     description,
     startDate,
     badge,
     isDeleted,
     parentId
    });
    this.checkForUpdate(collection)
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

/**************************************************** Update *****************************************************/

  //function to add Data to collection 
  public updateFixedCollection(autoId: string, collection: string, name: string, value:number, description: string, startDate: string, badge: string, parentId: string): Promise<void> {
    var result = this.firestore.doc(`users/${this.authService.getUserId()}/${collection}/${autoId}`).update({
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
  public updateVariableCollection(autoId: string, collection: string, name: string, value:number, description: string, date: string): Promise<void> {
   const month = this.dateLogic.getMonth(date)
   const year = this.dateLogic.getYear(date)
   var result = this.firestore.doc(`users/${this.authService.getUserId()}/${year}/${month}/${collection}/${autoId}`).update({
    autoId,
    name,
    value,
    description,
    date
   });
   return result;
 } 

 //function to add Data to collection 
 public updateFixedGlobalCollection(collection: string, name: string, value:number, description: string, startDate: string, badge: string,lastAddDate: string, autoId: string): Promise<void> {

    var result = this.firestore.doc(`users/${this.authService.getUserId()}/${collection}/${autoId}`).update({
    autoId,
     name,
     value,
     description,
     startDate,
     lastAddDate,
     badge  
    });
    return result;
  }
 
/**************************************************** Delete *****************************************************/

    // function to delete an item from the passed collection
    public deleteItem(collection: string, id: string) {
        let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
        const month = this.dateLogic.getMonth(currentDate)
        const year = this.dateLogic.getYear(currentDate)
        this.firestore.doc('users/' + this.authService.getUserId() + '/' + year + '/' + month + '/' +  collection + '/' + id).delete();
    }

    // function to delete an item from the passed collection
    public deleteFixedItem(collection: string, item: FixedBudgetItemModel) {
        let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
        const month = this.dateLogic.getMonth(currentDate)
        const year = this.dateLogic.getYear(currentDate)
        
        this.firestore.doc(`users/${this.authService.getUserId()}/${year}/${month}/${collection}/${item.autoId}`).update({"isDeleted" : "true"})
        this.deleteGlobalFixedItem(collection,item.parentId)
    }

    // function to delete an item from the passed collection
    public deleteGlobalFixedItem(collection: string, id: string) {
        this.firestore.doc('users/' + this.authService.getUserId() + '/' +  collection + '/' + id).delete();
    }

/**************************************************** Read *****************************************************/

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
        this.checkForUpdate(collection)
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

    // function to receive data from the database according to collection, year, month
    getGlobleFixedList(collection: string): AngularFirestoreCollection<FixedGlobalBudgetItemModel> {
        return this.firestore.collection(`users/${this.authService.getUserId()}/${collection}`);
    }


 /**************************************************** Logic function for update *****************************************************/

    checkForUpdate(collection: string) {
        let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
        this.getGlobleFixedList(collection).valueChanges().pipe(take(1)).subscribe((res: FixedGlobalBudgetItemModel[]) => {
            res.forEach((item) => {   
                
                if(item.lastAddDate < currentDate && this.dateLogic.getMonth(item.lastAddDate) != this.dateLogic.getMonth(currentDate))
                {
                    var addDateString = this.datePipe.transform(new Date(item.lastAddDate), 'yyyy-MM-dd')
                    var tempDateString = this.datePipe.transform(new Date(item.lastAddDate), 'yyyy-MM-dd')
                    var addDate = new Date(addDateString)
                    var count =  this.dateLogic.getMonth(currentDate) - this.dateLogic.getMonth(item.lastAddDate)
                    var i = 1;
                    var j = 0;
                    switch(item.badge) { 
                        case "W" : 
                        for(j=0;j<count;j++)
                        {
                            for(i=1;i<=6;i++)
                            {
                                addDate.setDate(addDate.getDate() + 7);
                                addDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                            if(this.dateLogic.getMonth(addDateString) != this.dateLogic.getMonth(tempDateString))
                            {   
                                let newDate = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                                this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                tempDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd');
                            }
                            }
                        
                        }
                        break

                        case "B": 
                        alert("in check 4 count== " + count)
                        for(j=0;j<count;j++)
                        {
                            for(i=1;i<=4;i++)
                            {
                                addDate.setDate(addDate.getDate() + 14);
                                addDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                            if(this.dateLogic.getMonth(addDateString) != this.dateLogic.getMonth(tempDateString))
                            {   
                                let newDate = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                                this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                tempDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd');
                            }
                            }
                        
                        }
                        break

                        case "M":
                        for(j=0;j<count;j++)
                        {
                            
                            addDate.setDate(addDate.getDate() + 32);
                            addDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                            if(this.dateLogic.getMonth(addDateString) != this.dateLogic.getMonth(tempDateString))
                            {   
                                let newDate = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                                this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                tempDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd');
                            }
                        }
                        break

                        default:
                           break;
                     }

                }
            });
        });
    }
    
}

