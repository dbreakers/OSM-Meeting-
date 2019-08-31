import { Injectable } from '@angular/core';
import { Security } from './security';
//import { SECURITY } from './mock-security';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {CustomURLEncoder} from './urlencoder.component';
import {map, catchError} from 'rxjs/operators';
import { Globals } from './globals';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
};

@Injectable({
  providedIn: 'root',
})

export class LogonService {
  private configUrl = this.globals.proxyURL;
  constructor(private http: HttpClient,
    private globals: Globals) { }
    

update_parents(pobject,evening): Observable<any>
{
    let authURL = this.configUrl + "?osmpath=ext/programme/&action=editEveningParts";
     
    let body = new HttpParams({encoder: new CustomURLEncoder() });
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);
    body = body.set('sectionid', this.globals.mysection);
    body = body.set('eveningid', evening);
    body = body.set('parts',(JSON.stringify(pobject))) 
    return this.http.post(authURL, body, httpOptions).pipe(catchError(error => of(error)))
    
} 

mod_parents(opt,scout,evening,date): Observable<any>
{

    let authURL = this.configUrl + "?osmpath=ext/programme/&action=deleteParentFromEvening";   
    let body = new HttpParams({encoder: new CustomURLEncoder() });
    if (opt==2) {
    let authURL = this.configUrl + "?osmpath=ext/programme/&action=addParentToEvening";  
    body = body.set('date', date);
    
    }   
    
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);
    body = body.set('sectionid', this.globals.mysection);
    body = body.set('eveningid', evening);
    body = body.set('scoutid', scout);
     
    return this.http.post(authURL, body, httpOptions).pipe(catchError(error => of(error)))
  
}

  doLogon(user: string, password: string): Observable<Security> {
    let authURL = this.configUrl + "?osmpath=users.php&action=authorise";
    let body = new HttpParams();
    body = body.set('email', user);
    body = body.set('password', password);
    return this.http.post<Security>(authURL, body, httpOptions).pipe(catchError(error => of(error)))
  }

  getSectionConfig(): Observable<any> {
    let fullURL = this.configUrl + "?osmpath=api.php&action=getSectionConfig";
    let fullURL2 = this.configUrl + "?osmpath=api.php&action=getUserRoles";
    let fullURL3 = this.configUrl + "?osmpath=api.php&action=getTerms";
    let body = new HttpParams();
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);

    return forkJoin(this.http.post(fullURL, body, httpOptions), this.http.post(fullURL2, body, httpOptions), this.http.post(fullURL3, body, httpOptions))
  }


getSectionData(sectionid, term): Observable<any> {
    let fullURL = this.configUrl + "?osmpath=ext/members/flexirecords/&action=getFlexiRecords&sectionid="+sectionid+"&archived=n"; //Flexi
    let fullURL2 = this.configUrl + "?osmpath=ext/members/contact/grid/&action=getMembers"; // Members
    let fullURL3 = this.configUrl + "?osmpath=ext/settings/patrols/&action=get&sectionid="+sectionid; //Patrols
    let fullURL4 = this.configUrl + "?osmpath=ext/events/summary/&action=get&sectionid="+sectionid+"&termid="+term; //Events
    let fullURL5 = this.configUrl + "?osmpath=ext/programme/&action=getProgrammeSummary&sectionid="+sectionid+"&termid="+term; //Programme
    let fullURL6 = this.configUrl + "?osmpath=ext/settings/access/&action=getAPIAccess&sectionid="+sectionid; //Programme
    let body = new HttpParams();
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);
    let body2 = new HttpParams();
    body2 = body2.set('secret', this.globals.secret);
    body2 = body2.set('userid', this.globals.userid);
    body2 = body2.set('section_id', sectionid);
    body2 = body2.set('term_id', term);
    return forkJoin(this.http.post(fullURL, body, httpOptions), this.http.post(fullURL2, body2, httpOptions), this.http.post(fullURL3, body, httpOptions),this.http.post(fullURL4, body, httpOptions),this.http.post(fullURL5, body, httpOptions),this.http.post(fullURL6, body, httpOptions));
  }

getEventAData(event): Observable<any> {
let fullURL = this.configUrl +"?osmpath=ext/events/event/&action=getAttendance&eventid="+event;
fullURL= fullURL+"&sectionid="+this.globals.mysection+"&termid="+this.globals.config[2][this.globals.mysection][this.globals.current_term].termid;
//this.globals.current_term;
 let body = new HttpParams();
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);
 return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of("error")))
}  

getEventsAData(): Observable<any> {
   let singleObservables = this.globals.sectiondata[3].items.map( event => this.getEventAData(event.eventid) )
return forkJoin(singleObservables);
}

//https://www.onlinescoutmanager.co.uk/ext/events/event/?action=getStructureForEvent&sectionid=3320&eventid=23958

getEventData(event): Observable<any> {
let fullURL = this.configUrl +"?osmpath=ext/events/event/&action=getStructureForEvent&eventid="+event;
fullURL= fullURL+"&sectionid="+this.globals.mysection+"&termid="+this.globals.config[2][this.globals.mysection][this.globals.current_term].termid;
 let body = new HttpParams();
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);
 return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
}  

getEventsData(): Observable<any> {
 //  let singleObservables = this.globals.sectiondata[3].items.map( event => this.getEventData(event.eventid) )
   let singleObservables = this.globals.sectiondata[3].items.map( event => this.getEventData(event.eventid))
return forkJoin(singleObservables);
}

//ext/programme/?action=getProgramme&eveningid=4327864&sectionid=3320&termid=349161

getProgData(prog): Observable<any> {
let fullURL = this.configUrl +"?osmpath=ext/programme/&action=getProgramme&eveningid="+prog;
fullURL= fullURL+"&sectionid="+this.globals.mysection+"&termid="+this.globals.config[2][this.globals.mysection][this.globals.current_term].termid;
 let body = new HttpParams();
    body = body.set('secret', this.globals.secret);
    body = body.set('userid', this.globals.userid);
 return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
}  


getProgsData(): Observable<any> {
 let singleObservables = this.globals.sectiondata[4].items.map( prog => this.getProgData(prog.eveningid))
return forkJoin(singleObservables);
}  

}
