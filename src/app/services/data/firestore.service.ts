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

import * as moment from 'moment';


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
  public updateFixedCollection(autoId: string, collection: string, name: string, value:number, description: string, sdate: string, badge: string, parentId: string): Promise<void> {
    const month = this.dateLogic.getMonth(sdate);
    const year = this.dateLogic.getYear(sdate);
    var result = this.firestore.doc(`users/${this.authService.getUserId()}/${collection}/${parentId}`).update({
        name,
        value,
        description,
        badge
    });
    result = this.firestore.doc(`users/${this.authService.getUserId()}/${year}/${month}/${collection}/${autoId}`).update({
     name,
     value,
     description,
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
        let currentDate = this.datePipe.transform(moment(), 'yyyy-MM-dd')
        const month = this.dateLogic.getMonth(currentDate)
        const year = this.dateLogic.getYear(currentDate)
        return this.firestore.collection(`users/${this.authService.getUserId()}/${year}/${month}/${collection}`);
    }

    // function to receive current month data from the database
    getCurrentFixedList(collection: string): AngularFirestoreCollection<FixedBudgetItemModel> {
        let currentDate = this.datePipe.transform(moment(), 'yyyy-MM-dd')
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
                        x = 1
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
                        x = 1
                        break;

                        case "M":
                            
                            var y = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(0,4)
                            var m = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(5,7)
                            var d = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(8,10)
                            var stringday = ""
                            var stringmonth = ""
                            var stringyear = ""
                            //need to add
                                var addmonth = Number(m)
                                //same year
                                if (currentDate.substring(0,4)==y) {
                                    var monthcounter = Number(currentDate.substring(5,7)) - Number(m)
                                    //different month
                                    if (monthcounter > 0) {  //here means the endmonth, should under 12
                                        if (Number(currentDate.substring(8,10)) >= Number(d)) {
                                            //need to calculate (monthcounter) months
                                            while (x <= monthcounter) {
                                                x = x + 1
                                                addmonth = addmonth + 1
                                                //not add year
                                                if (addmonth <= 12) {
                                                    stringyear = currentDate.substring(0,4)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    console.log("?????"+ this.dateLogic.getDate(tempDateString)+ "??????" + this.dateLogic.getDate(stringyear+"-"+stringmonth+"-"+stringday))
                                                    //if(this.dateLogic.getDate(tempDateString) != this.dateLogic.getDate(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                    console.log("test same year now day > lastday"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                // should not be here, just for reference
                                                // } else if (addmonth > 12){ //over year
                                                //     var yy = 1 
                                                //     var addyear = Number(currentDate.substring(0,4))
                                                //     var yearcounter = addmonth/12
                                                //     while (yy < yearcounter) {
                                                //         yy = yy + 1
                                                //         addyear = addyear + 1
                                                //         addmonth = addmonth -12
                                                //     }
                                                //     stringyear = String(addyear)
                                                //     stringmonth = String(addmonth)
                                                //     stringday = this.dayfunc(addmonth,Number(d))
                                                }
                                            }
                                            x = 1
                                        } else if (Number(currentDate.substring(8,10)) < Number(d)){
                                            //need to calculate (monthcounter - 1) months
                                            //if counter = 1 do nothing
                                            if (monthcounter > 1) {
                                                addmonth = addmonth - 1
                                                while (x <= monthcounter) {
                                                    x = x + 1
                                                    addmonth = addmonth + 1
                                                    //not add year
                                                    if (addmonth <= 12) {
                                                        stringyear = currentDate.substring(0,4)
                                                        stringmonth = this.set0func(addmonth)
                                                        stringday = this.dayfunc(addmonth,Number(d))
                                                        //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                        let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                        this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                        this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                        console.log("test same year now day < lastday"+stringyear+"-"+stringmonth+"-"+stringday)
                                                        //}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else if (Number(currentDate.substring(0,4)) > Number(y)) { //different year 

                                    if (Number(currentDate.substring(8,10)) >= Number(d)) { 
                                        if (Number(currentDate.substring(5,7)) >= Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + (12 * yearcounter)
                                        } else if (Number(currentDate.substring(5,7)) < Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + 12 + (12 * yearcounter)
                                        }
                                    } else if (Number(currentDate.substring(8,10)) < Number(d)) {
                                        if (Number(currentDate.substring(5,7)) >= Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + (12 * yearcounter) - 1
                                        } else if (Number(currentDate.substring(5,7)) < Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + 12 + (12 * yearcounter) - 1
                                        }
                                    }
                                    // 
                                    if (monthcounter > 0) {  
                                            var addyear = Number(y)
                                            //need to calculate (monthcounter) months
                                            while (x <= monthcounter) {
                                                x = x + 1
                                                addmonth = addmonth + 1
                                                //not add year
                                                if (addmonth <= 12) {
                                                    stringyear = String(addyear)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                    console.log("test diff year not over year"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                } else if (addmonth > 12){ //over year
                                                    var yy = 1 
                                                    var yearcounter = addmonth/12
                                                    while (yy < yearcounter) {
                                                        yy = yy + 1
                                                        addyear = addyear + 1
                                                        addmonth = addmonth -12
                                                    }
                                                    stringyear = String(addyear)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                    console.log("test diff year overyear"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                }
                                            }
                                            x = 1
                                    }
                                }
                            
                        break;


                        case "Q":
                            console.log("Q")
                            
                            var y = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(0,4)
                            var m = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(5,7)
                            var d = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(8,10)
                            var stringday = ""
                            var stringmonth = ""
                            var stringyear = ""
                            x = 3
                            //need to add
                                var addmonth = Number(m)
                                //same year
                                if (currentDate.substring(0,4)==y) {
                                    var monthcounter = Number(currentDate.substring(5,7)) - Number(m)
                                    //over 3 month
                                    if (monthcounter >= 3) {  //here means the endmonth, should under 12
                                        if (Number(currentDate.substring(8,10)) >= Number(d)) {
                                            //need to calculate (monthcounter) months
                                            while (x <= monthcounter) {
                                                x = x + 3
                                                addmonth = addmonth + 3
                                                //not add year
                                                if (addmonth <= 12) {
                                                    stringyear = currentDate.substring(0,4)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                    console.log("test same year now day > lastday"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                // should not be here, just for reference
                                                // } else if (addmonth > 12){ //over year
                                                //     var yy = 1 
                                                //     var addyear = Number(currentDate.substring(0,4))
                                                //     var yearcounter = addmonth/12
                                                //     while (yy < yearcounter) {
                                                //         yy = yy + 1
                                                //         addyear = addyear + 1
                                                //         addmonth = addmonth -12
                                                //     }
                                                //     stringyear = String(addyear)
                                                //     stringmonth = String(addmonth)
                                                //     stringday = this.dayfunc(addmonth,Number(d))
                                                }
                                            }
                                            x = 3
                                        } else if (Number(currentDate.substring(8,10)) < Number(d)){
                                            //need to calculate (monthcounter - 1) months
                                            //if counter = 1 do nothing
                                            if (monthcounter >= 3) {
                                                x = 3 + 1
                                                while (x <= monthcounter) {
                                                    x = x + 3
                                                    addmonth = addmonth + 3
                                                    //not add year
                                                    if (addmonth <= 12) {
                                                        stringyear = currentDate.substring(0,4)
                                                        stringmonth = this.set0func(addmonth)
                                                        stringday = this.dayfunc(addmonth,Number(d))
                                                        //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                        let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                        this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                        this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)        
                                                        console.log("test same year now day < lastday"+stringyear+"-"+stringmonth+"-"+stringday)
                                                        //}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else if (Number(currentDate.substring(0,4)) > Number(y)) { //different year 

                                    if (Number(currentDate.substring(8,10)) >= Number(d)) { 
                                        if (Number(currentDate.substring(5,7)) >= Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + (12 * yearcounter)
                                        } else if (Number(currentDate.substring(5,7)) < Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + 12 + (12 * yearcounter)
                                        }
                                    } else if (Number(currentDate.substring(8,10)) < Number(d)) {
                                        if (Number(currentDate.substring(5,7)) >= Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + (12 * yearcounter) - 1
                                        } else if (Number(currentDate.substring(5,7)) < Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + 12 + (12 * yearcounter) - 1
                                        }
                                    }

                                    // 
                                    if (monthcounter >= 3) {  
                                            var addyear = Number(y)
                                            //need to calculate (monthcounter) months
                                            while (x <= monthcounter) {
                                                x = x + 3
                                                addmonth = addmonth + 3
                                                //not add year
                                                if (addmonth <= 12) {
                                                    stringyear = String(addyear)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)    
                                                    console.log("test diff year not over year"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                } else if (addmonth > 12){ //over year
                                                    var yy = 1 
                                                    var yearcounter = addmonth/12
                                                    while (yy < yearcounter) {
                                                        yy = yy + 1
                                                        addyear = addyear + 1
                                                        addmonth = addmonth -12
                                                    }
                                                    stringyear = String(addyear)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                    console.log("test diff year overyear"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                }
                                            }
                                            x = 3
                                    }
                                }
                            
                        break;


                        case "S":
                            console.log("S")
                            
                            var y = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(0,4)
                            var m = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(5,7)
                            var d = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(8,10)
                            var stringday = ""
                            var stringmonth = ""
                            var stringyear = ""
                            x = 6
                            //need to add
                                var addmonth = Number(m)
                                //same year
                                if (currentDate.substring(0,4)==y) {
                                    var monthcounter = Number(currentDate.substring(5,7)) - Number(m)
                                    //over 6 month
                                    if (monthcounter >= 6) {  //here means the endmonth, should under 12
                                        if (Number(currentDate.substring(8,10)) >= Number(d)) {
                                            //need to calculate (monthcounter) months
                                            while (x <= monthcounter) {
                                                x = x + 6
                                                addmonth = addmonth + 6
                                                //not add year
                                                if (addmonth <= 12) {
                                                    stringyear = currentDate.substring(0,4)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                    console.log("test same year now day > lastday"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                // should not be here, just for reference
                                                // } else if (addmonth > 12){ //over year
                                                //     var yy = 1 
                                                //     var addyear = Number(currentDate.substring(0,4))
                                                //     var yearcounter = addmonth/12
                                                //     while (yy < yearcounter) {
                                                //         yy = yy + 1
                                                //         addyear = addyear + 1
                                                //         addmonth = addmonth -12
                                                //     }
                                                //     stringyear = String(addyear)
                                                //     stringmonth = String(addmonth)
                                                //     stringday = this.dayfunc(addmonth,Number(d))
                                                }
                                            }
                                            x = 6
                                        } else if (Number(currentDate.substring(8,10)) < Number(d)){
                                            //need to calculate (monthcounter - 1) months
                                            //if counter = 1 do nothing
                                            if (monthcounter >= 6) {
                                                x = 6 + 1
                                                while (x <= monthcounter) {
                                                    x = x + 6
                                                    addmonth = addmonth + 6
                                                    //not add year
                                                    if (addmonth <= 12) {
                                                        stringyear = currentDate.substring(0,4)
                                                        stringmonth = this.set0func(addmonth)
                                                        stringday = this.dayfunc(addmonth,Number(d))
                                                        //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                        let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                        this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                        this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                        console.log("test same year now day < lastday"+stringyear+"-"+stringmonth+"-"+stringday)
                                                        //}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else if (Number(currentDate.substring(0,4)) > Number(y)) { //different year 

                                    if (Number(currentDate.substring(8,10)) >= Number(d)) { 
                                        if (Number(currentDate.substring(5,7)) >= Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + (12 * yearcounter)
                                        } else if (Number(currentDate.substring(5,7)) < Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + 12 + (12 * yearcounter)
                                        }
                                    } else if (Number(currentDate.substring(8,10)) < Number(d)) {
                                        if (Number(currentDate.substring(5,7)) >= Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + (12 * yearcounter) - 1
                                        } else if (Number(currentDate.substring(5,7)) < Number(m)) {
                                            var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                            var monthcounter = Number(currentDate.substring(5,7)) - Number(m) + 12 + (12 * yearcounter) - 1
                                        }
                                    }

                                    // 
                                    if (monthcounter >= 6) {  
                                            var addyear = Number(y)
                                            //need to calculate (monthcounter) months
                                            while (x <= monthcounter) {
                                                x = x + 6
                                                addmonth = addmonth + 6
                                                //not add year
                                                if (addmonth <= 12) {
                                                    stringyear = String(addyear)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                                    console.log("test diff year not over year"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                } else if (addmonth > 12){ //over year
                                                    var yy = 1 
                                                    var yearcounter = addmonth/12
                                                    while (yy < yearcounter) {
                                                        yy = yy + 1
                                                        addyear = addyear + 1
                                                        addmonth = addmonth -12
                                                    }
                                                    stringyear = String(addyear)
                                                    stringmonth = this.set0func(addmonth)
                                                    stringday = this.dayfunc(addmonth,Number(d))
                                                    //if(this.dateLogic.getMonth(tempDateString) != this.dateLogic.getMonth(stringyear+"-"+stringmonth+"-"+stringday)) {
                                                    let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                                    this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                                    this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)    
                                                    console.log("test diff year overyear"+stringyear+"-"+stringmonth+"-"+stringday)
                                                    //}
                                                }
                                            }
                                            x = 6
                                    }
                                }
                            
                        break;

                        case "A":
                            var y = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(0,4)
                            var m = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(5,7)
                            var d = this.datePipe.transform(addDate, 'yyyy-MM-dd').substring(8,10)
                            var stringday = ""
                            var stringmonth = ""
                            var stringyear = ""
                            x = 12
                            var addmonth = Number(m)
                            //need to add
                            if (Number(currentDate.substring(0,4)) > Number(y)) { //different year 

                                if (Number(currentDate.substring(5,7)) > Number(m)) {
                                    var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                } else if (Number(currentDate.substring(5,7)) < Number(m)) {
                                    var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                } else if (Number(currentDate.substring(5,7)) == Number(m)) {
                                    if (Number(currentDate.substring(8,10)) >= Number(d)) {
                                        var yearcounter = Number(currentDate.substring(0,4)) - Number(y)
                                    } else if (Number(currentDate.substring(8,10)) < Number(d)){
                                        var yearcounter = Number(currentDate.substring(0,4)) - Number(y) - 1
                                    }
                                }
                                
                                if (yearcounter > 0){
                                    var yy = 1
                                    var addyear = Number(y)
                                    while (yy <= yearcounter) {
                                        yy = yy + 1
                                        addyear = addyear + 1
                                        stringyear = String(addyear)
                                        stringmonth = m
                                        stringday = d
                                        let newDate = stringyear+"-"+stringmonth+"-"+stringday
                                        this.createNewFixedCollection(collection,item.name,item.value,item.description,newDate,item.badge,item.autoId)
                                        this.updateFixedGlobalCollection(collection,item.name,item.value,item.description,item.startDate,item.badge,newDate,item.autoId)
                                        console.log("test diff year not over year"+stringyear+"-"+stringmonth+"-"+stringday)
                                    }
                                }
                            }  
                        break;

                        default:
                           break;
                     }

                }
            });
        });
    }

    //set 0 function 
    public set0func(something)
    { 
        return (something < 10 ? '0' : '') + something;
    }
    //day calculate function, deal with 31 30 days in the month
    public dayfunc(targetmonth: Number, startday: Number) 
    {
        if (startday == 31) {
            switch (targetmonth) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return "31";
                case 4:
                case 6:
                case 9:
                case 11:
                    return "30";
                case 2:
                    return "28";
                default:
                    break;
            }
        }else if (startday < 31 && startday > 27) {
            switch (targetmonth) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                case 4:
                case 6:
                case 9:
                case 11:
                    return String(startday);
                case 2:
                    return "28";
                default:
                    break;
            }
        } else if (startday >= 10 && startday <=27) {
            return String(startday)
        } else if (startday < 10) {
            return ("0"+startday)
        }
    }
}

