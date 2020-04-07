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
import { format } from 'url';


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
    this.createNewFixedCollectionPlus(collection,name,value,description,startDate,badge,autoId)
    return result;
    }

    //function to add Data to collection 
   public createNewFixedCollectionPlus(collection: string, name: string, value:number, description: string, startDate: string, badge: string, parentId: string): Promise<void> 
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
    //this.checkForUpdate(collection)
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
        
        this.deleteItem(collection,item.autoId)
        //this.firestore.doc(`users/${this.authService.getUserId()}/${year}/${month}/${collection}/${item.autoId}`).update({"isDeleted" : "true"})
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
                
                if(item.lastAddDate < currentDate)
                {
                    var count = Number(((Date.parse(currentDate)-Date.parse(item.lastAddDate))/86450000).toFixed(0))
                    var addDateString = this.datePipe.transform(new Date(item.lastAddDate + " 20:00:00 GMT-0400"), 'yyyy-MM-dd')
                    var tempDateString = this.datePipe.transform(new Date(item.lastAddDate + " 20:00:00 GMT-0400"), 'yyyy-MM-dd')
                    var addDate = new Date(addDateString + " 20:00:00 GMT-0400")


                    var x = 1;
                    switch(item.badge) { 
                        case "W" :
                        var counter = count/7
                        
                        while (x <= counter) {
                            x = x + 1
                            addDate.setDate(addDate.getDate() + 7);
                            addDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                            if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(addDateString))
                            {
                               
                                let newDate = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                                tempDateString = newDate
                                this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                            }
                        }
                        x = 0
                        break;

                        case "B": 
                        var counter = count/14

                        while (x <= counter) {
                            x = x + 1
                            addDate.setDate(addDate.getDate() + 14);
                            addDateString = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                            if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(addDateString))
                            {
                               
                                let newDate = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                                tempDateString = newDate
                                this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                            }
                        }
                        x = 0
                        break;

                        case "M":
                            
                            var y = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(0,4)
                            var m = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(5,7)
                            var d = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(8,10)
                            if (Number(d) <= (Number(currentDate.substring(8,10))) ){
                                var counter = ((Number(currentDate.substring(0,4))- Number(y))*12) + ((Number(currentDate.substring(5,7))-Number(m)))
                            } else if ((Number(currentDate.substring(8,10))) < Number(d)) {
                                var counter = ((Number(currentDate.substring(0,4))- Number(y))*12) + ((Number(currentDate.substring(5,7))-Number(m))) - 1
                            }
                            var newmonth = Number(m)+ counter
                            var newyear = Number(y)
                            while (newmonth > 12) {
                                newmonth = newmonth - 12
                                newyear = newyear + 1
                            }
                            

                            if (counter > 0) {
                                switch (m){
                                    case "01": 
                                    case "03":
                                    case "05":
                                    case "07":
                                    case "08":
                                    case "10":
                                    case "12":
                                        if (d == "31") {
                                            
                                        }
    
                                        break;
                                }
                            }

                             
                        
                            console.log("counter:"+counter)
                            
                            while (x <= counter) {
                                x = x + 1
                                addDate.setDate(addDate.getDate() + 7);
                                let newDate = this.datePipe.transform(addDate, 'yyyy-MM-dd')
                                this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                            }
                            x = 0
                        break

                        default:
                           break;
                     }

                }
            });
        });
    }
    
}

