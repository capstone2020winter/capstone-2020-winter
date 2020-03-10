export class DateLogic {
    month: string
    year: string
    count: number
    duration: number
    temp: number = 1

    constructor(){

    }

    getTotalCount(badge: string, date: string): number{
      let firstOccurrenceDate = Number(date);
      let currentDate: Date = new Date()
      let numberOfDaysThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      let duration = numberOfDaysThisMonth.getDate() - firstOccurrenceDate;
      let count = 0;
      switch(badge) { 
         case "W" : 
            count = Math.trunc(duration / 7) + 1;
            return count;
         case "B": 
            count = Math.trunc(duration / 14) + 1;
            return count;
         default:
            break;
      }
    }

    getCount(badge: string, date: string): number {

        this.count = 0
        let currentDate: Date = new Date()
        this.duration = currentDate.getDate() - Number(date)  
        
        switch(badge) { 
            case "W" : {
               if(this.duration>0){
                  this.count = (this.duration/7) + 1
               } else if(this.duration == 0){
                  this.count = 1
               } else if(this.duration<0) {
                  this.count = 0
               }
               this.count = Math.trunc(this.count)
               return this.count
            } 
            case "B": { 
               if(this.duration>0){
                  this.count = (this.duration/15) + 1
               } else if(this.duration == 0){
                  this.count = 1
               } else if(this.duration<0) {
                  this.count = 0
               }
               this.count = Math.trunc(this.count)
               return this.count
            }
            case "M" : { 
               if(Number(date) <= currentDate.getDate()){
                  this.count++
                  return this.count
               } else {
                  return 0
               }
               
             } 
             case "Q": { 
                return this.temp
             }
             case "H" : { 
                return this.temp 
             } 
             case "A": { 
                return this.temp
             }  
            default: { 
               console.log("didn't match any case") 
               return this.temp
            } 
         } 
    }

    getBiWeekly(){

    }

    getMonthly(){

    }

    getQuarterly(){

    }

    getHalfAnnually(){

    }

    getAnnually(){

    }
}