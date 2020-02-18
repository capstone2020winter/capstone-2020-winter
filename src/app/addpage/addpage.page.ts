import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service';
import { ModalController} from '@ionic/angular';


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
  //this value is not used for now
  category:string


  constructor(public firestoreService: FirestoreService, public modalController: ModalController) { 
    
  }

  ngOnInit() {
  }

  FREQUENCY: any = {
    header: 'FREQUENCY',
    message: 'Please select the frequency of income or expenditure.',
    translucent: true
  };

  //This function will add data to firestore cloud
  sendData(){
    //this will add data to Income 
    if(this.type == "I"){
      this.firestoreService.createIncome(this.description,this.amount,this.duration)
      .then(
        () => {
          console.log("in then");
          this.modalController.dismiss({
            'dismissed': true
          });
        },
        error => {
          console.error("in error");
        }
      );
    } else if(this.type == "F"){ //this will add data to Fixed Expense
      this.firestoreService.createFixedExpense(this.description,this.amount,this.duration)
      .then(
        () => {
          console.log("in then");
          this.modalController.dismiss({
            'dismissed': true
          });
        },
        error => {
          console.error("in error");
        }
      );
    } else if(this.type == "V"){ //this will add data to Variable Expense
      this.firestoreService.createVariableExpense(this.description,this.amount,this.duration)
      .then(
        () => {
          console.log("in then");
          this.modalController.dismiss({
            'dismissed': true
          });
        },
        error => {
          console.error("in error");
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
}

