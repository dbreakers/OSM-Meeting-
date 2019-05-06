import { Injectable } from '@angular/core';
import { Globals } from './globals';

@Injectable({
  providedIn: 'root',
})

export class DateformatService {
   constructor(
    private globals: Globals) { }

monthnames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
daynames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 smonthnames= ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
 sdaynames = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]
date_format_monthname(date,ls) {
    var d = new Date(date);
    if (ls){
    return this.monthnames[d.getMonth()];
   //return parseInt(d.substring(5,7),10)-1;
    } else {
      return this.smonthnames[d.getMonth()];
    }
  }

getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
  
date_format_nth(d) {
      if(d>3 && d<21) return 'th'; // thanks kennebec
      switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

  
  
date_format_dayname(d,ls) {
  if (ls){
  return  this.daynames[d.getDay()];
  } else
  {
     return  this.sdaynames[d.getDay()];
  }
}

 date_format_date(d,ls) {
   var today = new Date();
   var date = new Date(d);
   var inc_year = false;
   if (d==today) { return "Today"} else
    {
      if (date.getFullYear()!=today.getFullYear()) { inc_year = true;}
      var ss = this.date_format_dayname(date,ls);
      ss = ss + " " +date.getDate();
      ss = ss + this.date_format_nth(date) + " ";
      ss = ss + this.date_format_monthname(date,ls);
      if (inc_year) { ss = ss +" "+date.getFullYear()}
      return ss;
    }
 }    

}