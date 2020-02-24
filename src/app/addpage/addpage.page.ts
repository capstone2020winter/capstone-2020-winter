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
  collectionValue: string;
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

  getCollectionValue(){
    if(this.type == "FI"){
      this.collectionValue = "FixedIncome"
    } else if(this.type == "VI"){
      this.collectionValue = "VariableIncome"
    } else if(this.type == "FE"){
      this.collectionValue = "FixedExpense"
    } else if(this.type == "VE"){
      this.collectionValue = "VariableExpense"
    }
  }

  //This function will add data to firestore cloud
  sendData(){
      this.getCollectionValue()
      this.firestoreService.create(this.collectionValue,this.description,this.amount,this.duration)
      .then(
        () => {
          this.modalController.dismiss({
            'dismissed': true
          });
        },
        error => {
          console.error("Error : "+error);
        }
      );
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

