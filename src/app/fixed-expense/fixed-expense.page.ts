import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixed-expense',
  templateUrl: './fixed-expense.page.html',
  styleUrls: ['./fixed-expense.page.scss'],
})
export class FixedExpensePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  formataDecimal(e: any, delimeter: string = '.', decimals: number = 2) {
      console.log(e.target.value);
      let a: any = e.target.value.split('');
      let ns: string = '';
      a.forEach((c: any) => {
          if (!isNaN(c)) {
              ns = ns + c;
          }
      });
      ns = parseInt(ns).toString();
      if (ns.length < (decimals + 1)) {
          ns = ('0'.repeat(decimals + 1) + ns);
          ns = ns.slice((decimals + 1) * -1);
      }
      let input = ns.split('');
      let result = '';
      for (let i = 0; i < input.length; i++) {
          if (i == input.length - decimals) {
              result = result + delimeter + input[i];
          } else {
              result = result + input[i];
        }
         }
      e.value = result;
  }
}
