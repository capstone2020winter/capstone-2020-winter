import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.page.html',
  styleUrls: ['./addpage.page.scss'],
})
export class AddpagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  FREQUENCY: any = {
    header: 'FREQUENCY',
    message: 'Please select the frequency of income or expenditure.',
    translucent: true
  };



    addItemToDataBase() {
        console.log('Add budget item to Data Base');

        return false;
    }

}

