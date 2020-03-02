import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service';
import { ModalController, NavParams} from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';


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
  sdate: number;
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
              public authService: AuthService) {
    this.pageTitle = navParams.get("pageTitle");
    this.duration = "O";
    switch (this.pageTitle) {
      case 'Fixed Expense':
        this.type = "FE";
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
        this.type = "VE";
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
        this.type = "FI";
        this.isFixed = true;
        this.categoryList = [
          "Part-Time Job",
          "Student Loan",
          "Tax Return",
          "Others"
        ];  
        break;
      case 'Variable Income':
        this.type = "VI";
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
  sendData() {
      const userID = this.authService.getUserId();
      if (userID != null) {
          this.getCollectionValue();
          this.firestoreService.create(userID, this.collectionValue, this.description, this.amount, this.duration)
              .then(
                  () => {
                      this.modalController.dismiss({
                          'dismissed': true
                      });
                  },
                  error => {
                      console.error("Error : " + error);
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

