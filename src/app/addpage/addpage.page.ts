import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service';
import { ModalController, NavParams} from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

// Date Picker
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';

import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.page.html',
  styleUrls: ['./addpage.page.scss'],
})
export class AddpagePage implements OnInit {

  amount: number;
  description: string;
  type: string;
  duration: string;
  collectionValue: string;
  sdate: string;
  id: string;
  date: string;
  // this value is not used for now
  category: string;
  // Data passed from the opening page
  pageTitle: string;
  // Page set up properties
  isFixed: boolean;
  categoryList: string[];

  constructor(public firestoreService: FirestoreService,
              public modalController: ModalController,
              navParams: NavParams,
              public authService: AuthService,
              public datePicker: DatePicker,
              public datePipe: DatePipe,
              public platform: Platform,
              public toastController: ToastController) {
    this.pageTitle = navParams.get("pageTitle");
    this.duration = "O";
    this.platform.ready().then(() => {
      if (navParams.get("id") != "" && navParams.get("id") != undefined && navParams.get("id") != null){
        this.sdate = this.datePipe.transform(new Date(navParams.get("sdate")), "yyyy-MM-dd");
      }else{
        this.sdate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
      }
    })
    switch (this.pageTitle) {
      case 'Fixed Expense':
        this.collectionValue = "FixedExpense"
        this.isFixed = true;
        this.categoryList = [
          "Bank Fee",
          "Insurance",
          "Internet",
          "Meal Plan",
          "Membership",
          "Parking",
          "Phone", 
          "Rent",
          "Transportation",
          "Others"
        ];  
        break;
      case 'Variable Expense':
        this.collectionValue = "VariableExpense"
        this.isFixed = false;
        this.categoryList = [
          "Clothing",
          "Credit Interest",
          "Electronics",
          "Entertainment",
          "Food",
          "Gift",
          "Groceries",
          "Medical",
          "Self-Care",
          "Transportation",
          "Tuition Fee",
          "Others"
        ];  
        break;
      case 'Fixed Income':
        this.collectionValue = "FixedIncome"
        this.isFixed = true;
        this.categoryList = [
          "Part-Time Job",
          "Student Loan",
          "Tax Return",
          "Others"
        ];  
        break;
      case 'Variable Income':
        this.collectionValue = "VariableIncome"
        this.isFixed = false;
        this.categoryList = [
          "Family Support",
          "Part-Time Job",
          "Scholarship",
          "Tax Return",
          "Others"
        ];
        break;
      default:
        break;
    }
    if (navParams.get("id") != "" && navParams.get("id") != undefined && navParams.get("id") != null){
      this.id = navParams.get("id");
      this.amount = navParams.get("amount");
      this.duration = navParams.get("frequency");
      this.category = navParams.get("category");
      this.description = navParams.get("description");
      this.date = navParams.get("date");
    }
    else{
      this.id = "";
    }
  }

  ngOnInit() {
  }

  FREQUENCY: any = {
    header: 'FREQUENCY',
    message: 'Please select the frequency of income or expenditure.',
    translucent: true
  };

//This function will add data to firestore cloud
sendData() {
  if (!this.description || this.description == undefined || this.description == null){
    this.description = "";
  }
  if(this.isFixed) {
    //fixed
    this.firestoreService.createFixedCollection(this.collectionValue, this.category, this.amount, this.description, ''+this.sdate+'' , this.duration)
    .then(
      () => {
        this.presentToast("Data Added Successfully")
        this.modalController.dismiss({
          'dismissed': true
        });
      },
      error => {
        console.error("Error : "+error);
      }
    );
  } else {
    //variable
    this.firestoreService.createVariableCollection(this.collectionValue,this.category,this.amount,this.description,this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
    .then(
      () => {
        this.presentToast("Data Added Successfully")
        this.modalController.dismiss({
          'dismissed': true
        });
      },
      error => {
        console.error("Error : "+error);
      }
    );
  }
}

updateData() {
  if (!this.description || this.description == undefined || this.description == null){
    this.description = "";
  }
  if(this.isFixed) {
    //fixed
    this.firestoreService.updateFixedCollection(this.id, this.collectionValue, this.category, this.amount, this.description, ''+this.sdate+'' , this.duration)
    .then(
      () => {
        this.presentToast("Data Updated Successfully")
        this.modalController.dismiss({
          'dismissed': true
        });
      },
      error => {
        console.error("Error : "+error);
      }
    );
  } else {
    //variable
    this.firestoreService.updateVariableCollection(this.id, this.collectionValue,this.category,this.amount,this.description, this.date)
    .then(
      () => {
        this.presentToast("Data Updated Successfully")
        this.modalController.dismiss({
          'dismissed': true
        });
      },
      error => {
        console.error("Error : "+error);
      }
    );
  }
}

    addItemToDataBase() {
        console.log('Add budget item to Data Base');

        return false;
    }

    dismiss() {
      this.modalController.dismiss({
        'dismissed': true
      });
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        position: 'bottom',
        color: 'success',
        duration: 2000
      });
      toast.present();
    }

    pickDate(){
      let currentDate: Date = new Date()
      let lastDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
      let firstDayOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      if (this.platform.is("android")){
        let options = {
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
          minDate: firstDayOfThisMonth.valueOf(),
          maxDate: lastDayOfNextMonth.valueOf()
        }
        this.datePicker.show(options).then((date) =>{
          this.sdate = this.datePipe.transform(date, "yyyy-MM-dd");
        })
      }
      else if (this.platform.is("ios")){
        let options = {
          date: new Date(),
          mode: 'date',
          minDate: firstDayOfThisMonth,
          maxDate: lastDayOfNextMonth
        }
        this.datePicker.show(options).then((date) =>{
          this.sdate = this.datePipe.transform(date, "yyyy-MM-dd");
        })
      }
      else{
        let options = {
          date: new Date(),
          mode: 'date',
          minDate: firstDayOfThisMonth.valueOf(),
          maxDate: lastDayOfNextMonth.valueOf()
        }
        this.datePicker.show(options).then((date) =>{
          this.sdate = this.datePipe.transform(date, "yyyy-MM-dd");
        })
      }
    }
}

