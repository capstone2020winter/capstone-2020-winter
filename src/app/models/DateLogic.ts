
export class DateLogic {
    month: string
    year: string
    count: number
    duration: number
    temp: number = 1

    constructor(){

    }

    getDate(date: string){
      let day = Number(date.substr(8, 2));
      return day;
    }
    getMonth(date: string){
      let month = Number(date.substr(5, 2));
      return month;
      
    }
    getYear(date: string){
      let year = Number(date.substr(0, 4));
      return year;
    }
    
    getTotalCount(badge: string, date: string): number{
      let firstOccurrenceDate = this.getDate(date);
      let currentDate: Date = new Date();
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
        let currentDate: number = new Date().getDate()
        var itemDate: number = this.getDate(date)
        this.duration = currentDate - itemDate
        
        
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
               if(itemDate <= currentDate){
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

    getCountForHistory(badge: string, date: string): number {
      this.count = 0
      var itemDate: number = this.getDate(date)
      this.duration = 30 - itemDate
     
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
               return 1
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
}